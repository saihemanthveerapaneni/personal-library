import io
import os
import pypdf
from fastapi.testclient import TestClient
from main import app, get_db

client = TestClient(app)

def create_valid_pdf_bytes(title="Test PDF Book", author="Test Author", text="This is a test PDF content."):
    writer = pypdf.PdfWriter()
    writer.add_blank_page(width=200, height=200)
    # Add metadata
    writer.add_metadata({
        "/Title": title,
        "/Author": author
    })
    buf = io.BytesIO()
    writer.write(buf)
    return buf.getvalue()

def test_unauthenticated_upload():
    print("\n--- Test 1: Unauthenticated Upload (Should return 401) ---")
    pdf_bytes = create_valid_pdf_bytes()
    files = {"file": ("test.pdf", pdf_bytes, "application/pdf")}
    data = {"title": "No Auth Book"}
    res = client.post("/books/upload", files=files, data=data)
    print(f"Status: {res.status_code}, Response: {res.json()}")
    assert res.status_code == 401, f"Expected 401, got {res.status_code}"
    print("PASS: Unauthenticated upload rejected with 401.")

def test_txt_file_rejection():
    print("\n--- Test 2: .txt File Upload (Should reject with 400/415) ---")
    headers = {"Authorization": "Bearer reader-token"}
    files = {"file": ("sample.txt", b"Hello world text file", "text/plain")}
    res = client.post("/books/upload", files=files, data={"title": "Text File Book"}, headers=headers)
    print(f"Status: {res.status_code}, Response: {res.json()}")
    assert res.status_code in (400, 415), f"Expected 400 or 415, got {res.status_code}"
    assert res.json().get("detail") == "Only PDF files are allowed"
    print("PASS: .txt file rejected.")

def test_jpg_renamed_to_pdf_rejection():
    print("\n--- Test 3: .jpg Renamed to .pdf (Should fail magic-bytes check with 400) ---")
    headers = {"Authorization": "Bearer reader-token"}
    # JPEG magic bytes: FF D8 FF
    fake_pdf = b"\xFF\xD8\xFF\xE0\x00\x10JFIF" + b"A" * 500
    files = {"file": ("fake_image.pdf", fake_pdf, "application/pdf")}
    res = client.post("/books/upload", files=files, data={"title": "Fake PDF"}, headers=headers)
    print(f"Status: {res.status_code}, Response: {res.json()}")
    assert res.status_code == 400, f"Expected 400, got {res.status_code}"
    assert res.json().get("detail") == "Only PDF files are allowed"
    print("PASS: Fake PDF with invalid magic bytes rejected.")

def test_oversized_pdf_rejection():
    print("\n--- Test 4: Oversized File (>25MB) (Should return 413) ---")
    headers = {"Authorization": "Bearer reader-token"}
    # Construct a payload starting with %PDF- but exceeding 25MB (25MB + 1KB)
    large_pdf = b"%PDF-1.4\n" + (b"X" * (25 * 1024 * 1024 + 1024))
    files = {"file": ("oversized.pdf", large_pdf, "application/pdf")}
    res = client.post("/books/upload", files=files, data={"title": "Huge PDF"}, headers=headers)
    print(f"Status: {res.status_code}, Response: {res.json()}")
    assert res.status_code == 413, f"Expected 413, got {res.status_code}"
    print("PASS: Oversized file rejected with 413.")

def test_corrupt_pdf_rejection():
    print("\n--- Test 5: Corrupt PDF (Should return 400) ---")
    headers = {"Authorization": "Bearer reader-token"}
    # Starts with %PDF- so passes magic check, but corrupted structure
    corrupt_pdf = b"%PDF-1.4\nCorrupt junk data that is not a valid PDF document at all %%EOF"
    files = {"file": ("corrupt.pdf", corrupt_pdf, "application/pdf")}
    res = client.post("/books/upload", files=files, data={"title": "Corrupt Book"}, headers=headers)
    print(f"Status: {res.status_code}, Response: {res.json()}")
    assert res.status_code == 400, f"Expected 400, got {res.status_code}"
    print("PASS: Corrupt PDF rejected with 400.")

def test_valid_pdf_upload_and_flow():
    print("\n--- Test 6: Valid PDF Upload, File Download & Deletion Flow ---")
    headers = {"Authorization": "Bearer reader-token"}
    pdf_bytes = create_valid_pdf_bytes(title="My PDF Masterpiece", author="Ada Lovelace")
    files = {"file": ("adabook.pdf", pdf_bytes, "application/pdf")}
    data = {
        "title": "My PDF Masterpiece",
        "author": "Ada Lovelace",
        "genre": "Computer Science",
        "total_pages": "1"
    }
    
    res = client.post("/books/upload", files=files, data=data, headers=headers)
    print(f"Upload Status: {res.status_code}, Book: {res.json()}")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    book = res.json()
    book_id = book["id"]
    file_path = book["file_path"]
    assert os.path.exists(file_path), "Saved PDF file must exist on disk"
    assert book["t"] == "My PDF Masterpiece"
    assert book["a"] == "Ada Lovelace"
    assert book["pages"] == 1
    print("PASS: Valid PDF uploaded successfully and saved to disk.")

    # Test file retrieval (Owner)
    print("\n--- Test 7: GET /books/{id}/file by Owner (200) ---")
    file_res = client.get(f"/books/{book_id}/file", headers=headers)
    assert file_res.status_code == 200, f"Expected 200, got {file_res.status_code}"
    assert file_res.headers["content-type"] == "application/pdf"
    assert file_res.content == pdf_bytes
    print("PASS: Owner successfully retrieved PDF file.")

    # Test file retrieval (Forbidden user)
    print("\n--- Test 8: GET /books/{id}/file by Different User (403) ---")
    other_user_headers = {"X-User-Id": "999"}
    forbidden_res = client.get(f"/books/{book_id}/file", headers=other_user_headers)
    assert forbidden_res.status_code == 403, f"Expected 403, got {forbidden_res.status_code}"
    print("PASS: Non-owner rejected with 403.")

    # Test delete cleans up file on disk
    print("\n--- Test 9: DELETE /books/{id} Cleans up PDF on Disk ---")
    del_res = client.delete(f"/books/{book_id}", headers=headers)
    assert del_res.status_code == 200, f"Expected 200, got {del_res.status_code}"
    assert not os.path.exists(file_path), "File must be deleted from disk when book is deleted"
    print("PASS: Book and PDF file successfully deleted from disk.")

def test_metadata_fallback():
    print("\n--- Test 10: Metadata Fallback when Title/Author Not Provided ---")
    headers = {"Authorization": "Bearer reader-token"}
    pdf_bytes = create_valid_pdf_bytes(title="Embedded Metadata Title", author="Embedded Author")
    files = {"file": ("my_cool_filename.pdf", pdf_bytes, "application/pdf")}
    # Empty title and author
    data = {}
    res = client.post("/books/upload", files=files, data=data, headers=headers)
    assert res.status_code == 200
    book = res.json()
    print(f"Resulting Title: {book['t']}, Author: {book['a']}")
    assert book["t"] == "Embedded Metadata Title"
    assert book["a"] == "Embedded Author"
    
    # Cleanup
    client.delete(f"/books/{book['id']}", headers=headers)
    print("PASS: Metadata fallback correctly read from PDF.")

if __name__ == "__main__":
    test_unauthenticated_upload()
    test_txt_file_rejection()
    test_jpg_renamed_to_pdf_rejection()
    test_oversized_pdf_rejection()
    test_corrupt_pdf_rejection()
    test_valid_pdf_upload_and_flow()
    test_metadata_fallback()
    print("\n=============================================")
    print(" ALL 10 TESTS COMPLETED AND PASSED PERFECTLY!")
    print("=============================================\n")
