import sqlite3
import urllib.request
import urllib.parse
import json

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

def update_existing():
    conn = sqlite3.connect('library.db')
    c = conn.cursor()
    c.execute("SELECT id, t, a FROM books WHERE cover_url IS NULL")
    books = c.fetchall()
    
    for book_id, title, author in books:
        print(f"Fetching cover for {title}...")
        url = fetch_cover_url(title, author)
        if url:
            c.execute("UPDATE books SET cover_url = ? WHERE id = ?", (url, book_id))
            print(f"  -> Found: {url}")
        else:
            print("  -> Not found")
            
    conn.commit()
    conn.close()

if __name__ == "__main__":
    update_existing()
