from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends, Header, status
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List, Optional
import os
import uuid
import pypdf
import urllib.request
import urllib.parse
import json

from database import get_db, init_db
import models

app = FastAPI(title="Personal Library API")

# Authentication bearer scheme
security = HTTPBearer(auto_error=False)

def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    authorization: Optional[str] = Header(None),
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    token = None
    if credentials:
        token = credentials.credentials
    elif authorization:
        if authorization.lower().startswith("bearer "):
            token = authorization[7:].strip()
        else:
            token = authorization.strip()

    if not token and not x_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    user_id = 1
    if x_user_id and x_user_id.isdigit():
        user_id = int(x_user_id)
    elif token and token.isdigit():
        user_id = int(token)
        
    return {"id": user_id, "email": "reader@example.com"}

def fetch_cover_url(title, author):
    query = f"intitle:{title} inauthor:{author}"
    url = f"https://www.googleapis.com/books/v1/volumes?q={urllib.parse.quote(query)}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            if 'items' in data and len(data['items']) > 0:
                volume_info = data['items'][0].get('volumeInfo', {})
                image_links = volume_info.get('imageLinks', {})
                thumb = image_links.get('thumbnail')
                if thumb:
                    return thumb.replace("http://", "https://")
    except Exception as e:
        print(f"Error fetching cover: {e}")
    return None

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

# Constants
MAX_FILE_SIZE = 25 * 1024 * 1024  # 25 MB
CHUNK_SIZE = 64 * 1024

# --- Books Endpoints ---

@app.get("/books", response_model=List[models.Book])
@app.get("/api/books", response_model=List[models.Book])
def get_books():
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM books ORDER BY id DESC")
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/books/upload", response_model=models.Book)
@app.post("/api/books/upload", response_model=models.Book)
@app.post("/api/books", response_model=models.Book)
async def upload_book(
    file: UploadFile = File(...),
    title: Optional[str] = Form(None),
    author: Optional[str] = Form(None),
    genre: Optional[str] = Form(None),
    total_pages: Optional[int] = Form(None),
    # Also support t, a, g, pages for backward compatibility
    t: Optional[str] = Form(None),
    a: Optional[str] = Form(None),
    g: Optional[str] = Form(None),
    pages: Optional[int] = Form(None),
    current_user: dict = Depends(get_current_user)
):
    orig_filename = file.filename or ""

    # 1. Extension must be .pdf (case-insensitive)
    if not orig_filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # 2. Content-type must be application/pdf
    content_type = (file.content_type or "").lower()
    if not content_type.startswith("application/pdf"):
        raise HTTPException(status_code=415, detail="Only PDF files are allowed")

    upload_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "uploads", "pdfs"))
    os.makedirs(upload_dir, exist_ok=True)

    # Save under generated UUID filename to prevent path traversal
    saved_filename = f"{uuid.uuid4().hex}.pdf"
    saved_file_path = os.path.join(upload_dir, saved_filename)

    total_bytes_read = 0
    first_chunk = True

    # 3 & 4. Read first bytes for magic check and enforce max 25MB size while streaming
    try:
        with open(saved_file_path, "wb") as f_out:
            while True:
                chunk = await file.read(CHUNK_SIZE)
                if not chunk:
                    break

                total_bytes_read += len(chunk)
                if total_bytes_read > MAX_FILE_SIZE:
                    f_out.close()
                    if os.path.exists(saved_file_path):
                        os.remove(saved_file_path)
                    raise HTTPException(status_code=413, detail="File size exceeds maximum allowed size of 25MB")

                if first_chunk:
                    if not chunk.startswith(b"%PDF-"):
                        f_out.close()
                        if os.path.exists(saved_file_path):
                            os.remove(saved_file_path)
                        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
                    first_chunk = False

                f_out.write(chunk)

        if total_bytes_read == 0:
            if os.path.exists(saved_file_path):
                os.remove(saved_file_path)
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    except HTTPException:
        raise
    except Exception as e:
        if os.path.exists(saved_file_path):
            os.remove(saved_file_path)
        raise HTTPException(status_code=500, detail=f"File upload error: {str(e)}")

    # 5. Use pypdf to read PDF, auto-fill total_pages, check corruption/encryption
    extracted_pages = 0
    extracted_text = ""
    meta_title = None
    meta_author = None

    try:
        reader = pypdf.PdfReader(saved_file_path)
        if reader.is_encrypted:
            try:
                if not reader.decrypt(""):
                    if os.path.exists(saved_file_path):
                        os.remove(saved_file_path)
                    raise HTTPException(status_code=400, detail="Encrypted PDF files are not supported")
            except Exception:
                if os.path.exists(saved_file_path):
                    os.remove(saved_file_path)
                raise HTTPException(status_code=400, detail="Encrypted PDF files are not supported")

        extracted_pages = len(reader.pages)
        if extracted_pages <= 0:
            if os.path.exists(saved_file_path):
                os.remove(saved_file_path)
            raise HTTPException(status_code=400, detail="Corrupt or invalid PDF file (0 pages found)")

        if reader.metadata:
            meta_title = reader.metadata.title
            meta_author = reader.metadata.author

        for p in reader.pages:
            t_txt = p.extract_text()
            if t_txt:
                extracted_text += t_txt + "\n\n"

    except HTTPException:
        raise
    except Exception as e:
        if os.path.exists(saved_file_path):
            os.remove(saved_file_path)
        raise HTTPException(status_code=400, detail=f"Invalid or corrupt PDF file: {str(e)}")

    # Title & author fallback: form field -> PDF metadata -> filename without extension
    clean_title = (title or t or "").strip()
    clean_author = (author or a or "").strip()
    clean_genre = (genre or g or "").strip()
    user_pages = total_pages or pages

    base_name = os.path.splitext(orig_filename)[0].strip() or "Untitled Book"

    final_title = clean_title or (meta_title.strip() if meta_title and meta_title.strip() else "") or base_name
    final_author = clean_author or (meta_author.strip() if meta_author and meta_author.strip() else "") or "Unknown Author"
    final_genre = clean_genre or "General"
    final_pages = int(user_pages) if (user_pages and int(user_pages) > 0) else extracted_pages

    cover_url = fetch_cover_url(final_title, final_author)

    conn = get_db()
    c = conn.cursor()
    c.execute(
        """
        INSERT INTO books (t, a, g, pages, read, rating, status, fav, cover_url, file_path, original_filename, file_size, user_id)
        VALUES (?, ?, ?, ?, 0, 0, 'plan', 0, ?, ?, ?, ?, ?)
        """,
        (final_title, final_author, final_genre, final_pages, cover_url, saved_file_path, orig_filename, total_bytes_read, current_user["id"])
    )
    conn.commit()
    book_id = c.lastrowid

    c.execute("SELECT * FROM books WHERE id = ?", (book_id,))
    new_book_row = dict(c.fetchone())
    conn.close()

    # Save extracted text for flipbook reading
    if extracted_text.strip():
        text_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "uploads", "texts"))
        os.makedirs(text_dir, exist_ok=True)
        with open(os.path.join(text_dir, f"{book_id}.txt"), "w", encoding="utf-8") as f_text:
            f_text.write(extracted_text)

    return new_book_row

@app.get("/books/{book_id}/file")
@app.get("/api/books/{book_id}/file")
def get_book_file(book_id: int, current_user: dict = Depends(get_current_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM books WHERE id = ?", (book_id,))
    row = c.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Book not found")

    book = dict(row)
    if book.get("user_id") and book["user_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="Forbidden: You do not own this book")

    file_path = book.get("file_path")
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="PDF file not found on disk")

    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        filename=book.get("original_filename") or f"{book.get('t', 'book')}.pdf"
    )

@app.get("/books/{book_id}/text")
@app.get("/api/books/{book_id}/text")
def get_book_text(book_id: int):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT t, a FROM books WHERE id = ?", (book_id,))
    row = c.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Book not found")

    try:
        with open(f"uploads/texts/{book_id}.txt", "r", encoding="utf-8") as f:
            text = f.read()
    except FileNotFoundError:
        text = "Text not available."

    return {"title": row['t'], "author": row['a'], "text": text}

@app.put("/books/{book_id}", response_model=models.Book)
@app.put("/api/books/{book_id}", response_model=models.Book)
def update_book(book_id: int, book: models.BookUpdate):
    conn = get_db()
    c = conn.cursor()

    c.execute("SELECT * FROM books WHERE id = ?", (book_id,))
    existing = c.fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Book not found")

    existing_dict = dict(existing)
    update_data = book.dict(exclude_unset=True)
    for key, value in update_data.items():
        existing_dict[key] = value

    c.execute(
        """
        UPDATE books 
        SET t=?, a=?, g=?, pages=?, read=?, rating=?, status=?, fav=?, cover_url=?, file_path=?, original_filename=?, file_size=?, user_id=?
        WHERE id=?
        """,
        (existing_dict['t'], existing_dict['a'], existing_dict['g'], existing_dict['pages'],
         existing_dict['read'], existing_dict['rating'], existing_dict['status'], existing_dict['fav'], 
         existing_dict['cover_url'], existing_dict.get('file_path'), existing_dict.get('original_filename'), 
         existing_dict.get('file_size'), existing_dict.get('user_id'), book_id)
    )
    conn.commit()
    conn.close()
    return existing_dict

@app.delete("/books/{book_id}")
@app.delete("/api/books/{book_id}")
def delete_book(book_id: int, current_user: dict = Depends(get_current_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM books WHERE id = ?", (book_id,))
    row = c.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Book not found")

    book = dict(row)
    if book.get("user_id") and book["user_id"] != current_user["id"]:
        conn.close()
        raise HTTPException(status_code=403, detail="Forbidden: You do not own this book")

    # Delete PDF file if exists
    file_path = book.get("file_path")
    if file_path and os.path.exists(file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Error removing PDF file {file_path}: {e}")

    # Delete text file if exists
    text_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "uploads", "texts", f"{book_id}.txt"))
    if os.path.exists(text_path):
        try:
            os.remove(text_path)
        except Exception as e:
            print(f"Error removing text file {text_path}: {e}")

    c.execute("DELETE FROM books WHERE id = ?", (book_id,))
    conn.commit()
    conn.close()
    return {"status": "success"}

# --- Wishlist Endpoints ---

@app.get("/api/wishlist", response_model=List[models.WishlistItem])
def get_wishlist():
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM wishlist")
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/api/wishlist", response_model=models.WishlistItem)
def create_wishlist_item(item: models.WishlistCreate):
    if not item.cover_url:
        item.cover_url = fetch_cover_url(item.t, item.a)

    conn = get_db()
    c = conn.cursor()
    c.execute("INSERT INTO wishlist (t, a, g, cover_url) VALUES (?, ?, ?, ?)", (item.t, item.a, item.g, item.cover_url))
    conn.commit()
    item_id = c.lastrowid
    conn.close()
    return {**item.dict(), "id": item_id}

@app.delete("/api/wishlist/{item_id}")
def delete_wishlist_item(item_id: int):
    conn = get_db()
    c = conn.cursor()
    c.execute("DELETE FROM wishlist WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    return {"status": "success"}

# --- Highlights Endpoints ---

@app.get("/api/highlights", response_model=List[models.Highlight])
def get_highlights():
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM highlights")
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# --- Series Endpoints ---

@app.get("/api/series", response_model=List[models.Series])
def get_series():
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM series")
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
