import sqlite3
import os

DB_FILE = "library.db"

def migrate():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    # Check existing columns
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
        
    conn.commit()
    conn.close()
    print("Migration completed.")

if __name__ == "__main__":
    migrate()
