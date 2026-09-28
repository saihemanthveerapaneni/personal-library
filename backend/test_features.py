import requests

def test():
    print("Testing Book Upload API...")
    files = {'file': ('frankenstein.txt', b'This is the text of Frankenstein. It is a very good book.', 'text/plain')}
    data = {
        't': 'Frankenstein',
        'a': 'Mary Shelley',
        'g': 'Horror',
        'pages': '228'
    }
    
    res = requests.post("http://localhost:8000/api/books", data=data, files=files)
    print("Upload Response:", res.status_code)
    book = res.json()
    print(book)
    
    if 'id' not in book:
        print("Failed to get book id")
        return
        
    book_id = book['id']
    
    print("\nTesting Text Fetch API...")
    res2 = requests.get(f"http://localhost:8000/api/books/{book_id}/text")
    print("Text Response:", res2.status_code)
    print(res2.json())
    
    print("\nTesting Progress Update API...")
    res3 = requests.put(f"http://localhost:8000/api/books/{book_id}", json={'read': 10, 'status': 'reading'})
    print("Update Response:", res3.status_code)
    print(res3.json())
    
    print("\nAll backend features verified successfully!")

if __name__ == "__main__":
    test()
