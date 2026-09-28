import sqlite3

def migrate():
    conn = sqlite3.connect('library.db')
    c = conn.cursor()
    try:
        c.execute("ALTER TABLE books ADD COLUMN cover_url TEXT")
    except sqlite3.OperationalError:
        print("Column cover_url already exists in books")
        
    try:
        c.execute("ALTER TABLE wishlist ADD COLUMN cover_url TEXT")
    except sqlite3.OperationalError:
        print("Column cover_url already exists in wishlist")
        
    conn.commit()
    conn.close()
    print("Migration successful")

if __name__ == "__main__":
    migrate()
