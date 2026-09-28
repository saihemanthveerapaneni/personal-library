import sqlite3

books = [
    ("Harry Potter and the Philosopher's Stone (Released as Harry Potter and the Sorcerer's Stone in the US)", "J.K. Rowling", "Fantasy", 309, 0, 0, "plan", False),
    ("Harry Potter and the Chamber of Secrets", "J.K. Rowling", "Fantasy", 341, 0, 0, "plan", False),
    ("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling", "Fantasy", 317, 0, 0, "plan", False),
    ("Harry Potter and the Goblet of Fire", "J.K. Rowling", "Fantasy", 636, 0, 0, "plan", False),
    ("Harry Potter and the Order of the Phoenix", "J.K. Rowling", "Fantasy", 766, 0, 0, "plan", False),
    ("Harry Potter and the Half-Blood Prince", "J.K. Rowling", "Fantasy", 607, 0, 0, "plan", False),
    ("Harry Potter and the Deathly Hallows", "J.K. Rowling", "Fantasy", 607, 0, 0, "plan", False)
]

conn = sqlite3.connect('library.db')
c = conn.cursor()
c.executemany("INSERT INTO books (t, a, g, pages, read, rating, status, fav) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", books)
conn.commit()
conn.close()
print("Harry Potter books inserted successfully.")
