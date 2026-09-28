import sqlite3
import json

DB_FILE = "library.db"

def get_db():
    conn = sqlite3.connect(DB_FILE, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    c = conn.cursor()
    
    # Create books table
    c.execute('''
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            t TEXT NOT NULL,
            a TEXT NOT NULL,
            g TEXT NOT NULL,
            pages INTEGER NOT NULL,
            read INTEGER NOT NULL,
            rating INTEGER NOT NULL,
            status TEXT NOT NULL,
            fav BOOLEAN NOT NULL,
            cover_url TEXT,
            file_path TEXT,
            original_filename TEXT,
            file_size INTEGER,
            uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER DEFAULT 1
        )
    ''')
    
    # Check and migrate columns if table existed prior
    c.execute("PRAGMA table_info(books)")
    columns = [row[1] for row in c.fetchall()]
    if "file_path" not in columns:
        c.execute("ALTER TABLE books ADD COLUMN file_path TEXT")
    if "original_filename" not in columns:
        c.execute("ALTER TABLE books ADD COLUMN original_filename TEXT")
    if "file_size" not in columns:
        c.execute("ALTER TABLE books ADD COLUMN file_size INTEGER")
    if "uploaded_at" not in columns:
        c.execute("ALTER TABLE books ADD COLUMN uploaded_at TIMESTAMP")
        c.execute("UPDATE books SET uploaded_at = CURRENT_TIMESTAMP WHERE uploaded_at IS NULL")
    if "user_id" not in columns:
        c.execute("ALTER TABLE books ADD COLUMN user_id INTEGER DEFAULT 1")

    # Create users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            username TEXT NOT NULL
        )
    ''')
    c.execute("SELECT COUNT(*) FROM users")
    if c.fetchone()[0] == 0:
        c.execute("INSERT INTO users (id, email, username) VALUES (1, 'reader@example.com', 'Reader')")
    
    # Create wishlist table
    c.execute('''
        CREATE TABLE IF NOT EXISTS wishlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            t TEXT NOT NULL,
            a TEXT NOT NULL,
            g TEXT NOT NULL,
            cover_url TEXT
        )
    ''')
    
    # Create highlights table
    c.execute('''
        CREATE TABLE IF NOT EXISTS highlights (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            q TEXT NOT NULL,
            b TEXT NOT NULL,
            c TEXT NOT NULL
        )
    ''')
    
    # Create series table
    c.execute('''
        CREATE TABLE IF NOT EXISTS series (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            t TEXT NOT NULL,
            n INTEGER NOT NULL
        )
    ''')
    
    # Check if empty and seed initial data
    c.execute("SELECT COUNT(*) FROM books")
        
    conn.commit()
    conn.close()

def seed_data(conn):
    c = conn.cursor()
    # Books
    books_data = [
        ("The Midnight Library", "Matt Haig", "Fiction", 304, 210, 4, "reading", True),
        ("Educated", "Tara Westover", "Memoir", 334, 334, 5, "completed", True),
        ("Project Hail Mary", "Andy Weir", "Sci-Fi", 496, 120, 5, "reading", False),
        ("Atomic Habits", "James Clear", "Self-Help", 320, 320, 4, "completed", False),
        ("Circe", "Madeline Miller", "Fantasy", 400, 80, 5, "reading", True),
        ("Sapiens", "Yuval Noah Harari", "History", 443, 0, 0, "plan", False),
        ("The Song of Achilles", "Madeline Miller", "Fantasy", 378, 378, 5, "completed", True),
        ("Klara and the Sun", "Kazuo Ishiguro", "Fiction", 303, 40, 0, "reading", False)
    ]
    c.executemany("INSERT INTO books (t, a, g, pages, read, rating, status, fav) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", books_data)
    
    # Wishlist
    wishlist_data = [
        ("Piranesi", "Susanna Clarke", "Fantasy"),
        ("The Overstory", "Richard Powers", "Fiction"),
        ("Pachinko", "Min Jin Lee", "Historical Fiction")
    ]
    c.executemany("INSERT INTO wishlist (t, a, g) VALUES (?, ?, ?)", wishlist_data)
    
    # Highlights
    highlights_data = [
        ("Between life and death there is a library.", "The Midnight Library", "#F2D399"),
        ("You don't have to have a reason to be tired. You don't have to earn rest.", "Educated", "#C9E4DE"),
        ("I thought: this, this is what it means to be alive.", "Circe", "#E2C2C2")
    ]
    c.executemany("INSERT INTO highlights (q, b, c) VALUES (?, ?, ?)", highlights_data)
    
    # Series
    series_data = [
        ("Madeline Miller — Collection", 2),
        ("Favorites Shelf", 4),
        ("Rainy Day Reads", 3)
    ]
    c.executemany("INSERT INTO series (t, n) VALUES (?, ?)", series_data)

if __name__ == "__main__":
    init_db()
