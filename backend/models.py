from pydantic import BaseModel
from typing import Optional

class BookCreate(BaseModel):
    t: str
    a: str
    g: str
    pages: int
    read: int = 0
    rating: int = 0
    status: str = "plan"
    fav: bool = False
    cover_url: Optional[str] = None
    file_path: Optional[str] = None
    original_filename: Optional[str] = None
    file_size: Optional[int] = None
    uploaded_at: Optional[str] = None
    user_id: Optional[int] = 1

class Book(BookCreate):
    id: int

class BookUpdate(BaseModel):
    t: Optional[str] = None
    a: Optional[str] = None
    g: Optional[str] = None
    pages: Optional[int] = None
    read: Optional[int] = None
    rating: Optional[int] = None
    status: Optional[str] = None
    fav: Optional[bool] = None
    cover_url: Optional[str] = None
    file_path: Optional[str] = None
    original_filename: Optional[str] = None
    file_size: Optional[int] = None
    uploaded_at: Optional[str] = None
    user_id: Optional[int] = None

class WishlistCreate(BaseModel):
    t: str
    a: str
    g: str
    cover_url: Optional[str] = None

class WishlistItem(WishlistCreate):
    id: int

class HighlightCreate(BaseModel):
    q: str
    b: str
    c: str

class Highlight(HighlightCreate):
    id: int

class SeriesCreate(BaseModel):
    t: str
    n: int

class Series(SeriesCreate):
    id: int
