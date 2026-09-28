import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as api from './api';
import './index.css';
import BookReader from './components/BookReader';
import UploadModal from './components/UploadModal';

const palette = ["#1F4E49","#8A3B3B","#3E5C8A","#8A6B2E","#5C3E8A","#2E6B5C","#8A4B2E","#4A5C2E"];

const Cover = ({ book, index }) => {
  const c = palette[index % palette.length];
  if (book && book.cover_url) {
    return (
      <div className="cover" style={{ padding: 0 }}>
        <img src={book.cover_url} alt={book.t} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
        <div className="spine"></div>
      </div>
    );
  }
  return (
    <div className="cover" style={{ background: `linear-gradient(160deg, ${c}, ${c}CC)` }}>
      <div className="spine"></div>
      <div className="cover-title">{book ? book.t : ''}</div>
      <div className="cover-author">{book ? book.a : ''}</div>
    </div>
  );
};

const Stars = ({ n, onRate }) => {
  return (
    <div className="stars" style={{ cursor: onRate ? 'pointer' : 'default', fontSize: onRate ? '18px' : '11px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} onClick={onRate ? () => onRate(star) : undefined}>
          {star <= n ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [view, setView] = useState('shelf'); // shelf, wishlist, highlights, series
  
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [series, setSeries] = useState([]);

  // Shelf state
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [shelfTab, setShelfTab] = useState('all');

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeBook, setActiveBook] = useState(null);

  // Reader state
  const [readerOpen, setReaderOpen] = useState(false);
  const [bookText, setBookText] = useState("");
  
  const handleOpenReader = async (b) => {
    setActiveBook(b);
    setBookText("");
    setReaderOpen(true);
    setDrawerOpen(false);
    try {
      const data = await api.getBookText(b.id);
      setBookText(data.text);
    } catch (e) {
      setBookText("Error loading text.");
    }
  };

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadInitialData, setUploadInitialData] = useState({});

  const progressTimerRef = useRef(null);

  const handleProgress = useCallback(({ percent }) => {
    if (!activeBook) return;
    const pagesRead = Math.round(percent * activeBook.pages);
    let status = activeBook.status;
    if (percent >= 0.98) status = 'completed';
    else if (percent > 0 && status !== 'completed') status = 'reading';
    
    if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
    progressTimerRef.current = setTimeout(() => {
      api.updateBook(activeBook.id, { read: pagesRead, status }).then(() => fetchData());
    }, 1000);
  }, [activeBook]);

  useEffect(() => {
    if (loggedIn) {
      fetchData();
    }
  }, [loggedIn]);

  const fetchData = async () => {
    setBooks(await api.getBooks());
    setWishlist(await api.getWishlist());
    setHighlights(await api.getHighlights());
    setSeries(await api.getSeries());
  };

  if (!loggedIn) {
    return (
      <div id="login">
        <div className="login-card">
          <div className="brand">Bookshelf<small>YOUR PERSONAL LIBRARY</small></div>
          <div className="login-form">
            <div className="field"><label>Email</label><input type="email" defaultValue="reader@example.com" /></div>
            <div className="field"><label>Password</label><input type="password" defaultValue="••••••••" /></div>
            <button className="btn-primary" onClick={() => setLoggedIn(true)}>Sign in</button>
          </div>
          <div className="switch-mode">New here? <a href="#">Create an account</a></div>
        </div>
      </div>
    );
  }


  const handleDeleteBook = async (id) => {
    if (!window.confirm("Delete this book from your library?")) return;
    await api.deleteBook(id);
    setDrawerOpen(false);
    fetchData();
  };

  const handleRateBook = async (id, n) => {
    await api.updateBook(id, { rating: n });
    setActiveBook(prev => ({ ...prev, rating: n }));
    fetchData();
  };

  const handleAddToWishlist = async (book) => {
    if (wishlist.some(w => w.t === book.t && w.a === book.a)) { alert('Already on your wishlist.'); return; }
    await api.createWishlist({ t: book.t, a: book.a, g: book.g });
    setDrawerOpen(false);
    fetchData();
  };

  const handleMoveFromWishlist = (w) => {
    setUploadInitialData({ title: w.t, author: w.a, genre: [w.g] });
    setModalOpen(true);
  };

  const allGenres = new Set();
  books.forEach(b => {
    if (b.g) b.g.split(', ').forEach(g => allGenres.add(g));
  });
  const genres = [...allGenres];

  let filteredBooks = books.filter(b => {
    if (shelfTab === "reading" && b.status !== "reading") return false;
    if (shelfTab === "favorites" && !b.fav) return false;
    if (shelfTab === "completed" && b.status !== "completed") return false;
    if (genreFilter && !b.g.split(', ').includes(genreFilter)) return false;
    if (searchQuery && !(b.t.toLowerCase().includes(searchQuery) || b.a.toLowerCase().includes(searchQuery) || b.g.toLowerCase().includes(searchQuery))) return false;
    return true;
  });

  if (sortBy === "progress") {
    filteredBooks.sort((a, b) => (b.read / b.pages) - (a.read / a.pages));
  } else if (sortBy === "title") {
    filteredBooks.sort((a, b) => a.t.localeCompare(b.t));
  } else if (sortBy === "author") {
    filteredBooks.sort((a, b) => a.a.localeCompare(b.a));
  }
  // recent is default by id implicitly

  const renderShelf = () => (
    <div className={`view ${view === 'shelf' ? 'active' : ''}`} id="view-shelf">
      <div className="toolbar">
        <h1>Bookshelf</h1>
        <div className="search-wrap">
          <input placeholder="Search title, author or genre…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <select className="select" value={genreFilter} onChange={e => setGenreFilter(e.target.value)}>
          <option value="">All genres</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select className="select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="recent">Sort: Recently added</option>
          <option value="progress">Sort: Progress</option>
          <option value="title">Sort: Title</option>
          <option value="author">Sort: Author</option>
        </select>
        <button className="btn-add" onClick={() => setModalOpen(true)}>+ Upload book</button>
      </div>
      <div className="tabs">
        <button className={`tab ${shelfTab === 'all' ? 'active' : ''}`} onClick={() => setShelfTab('all')}>All books</button>
        <button className={`tab ${shelfTab === 'reading' ? 'active' : ''}`} onClick={() => setShelfTab('reading')}>Currently reading</button>
        <button className={`tab ${shelfTab === 'favorites' ? 'active' : ''}`} onClick={() => setShelfTab('favorites')}>Favorites</button>
        <button className={`tab ${shelfTab === 'completed' ? 'active' : ''}`} onClick={() => setShelfTab('completed')}>Completed</button>
      </div>
      <div className="grid">
        {filteredBooks.length === 0 ? <div className="empty">No books match. Try a different search or upload a new book.</div> :
          filteredBooks.map((b, i) => {
            const pct = Math.round(b.read / b.pages * 100);
            return (
              <div key={b.id} className="book" onClick={() => { setActiveBook(b); setDrawerOpen(true); }}>
                <Cover book={b} index={books.indexOf(b)} />
                <div className="book-meta">
                  <div className="t">{b.t}</div>
                  <div className="a">{b.a}</div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }}></div></div>
                  <Stars n={b.rating} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className={`view ${view === 'wishlist' ? 'active' : ''}`} id="view-wishlist">
      <div className="toolbar"><h1>Wishlist</h1></div>
      <div className="grid">
        {wishlist.length === 0 ? <div className="empty">Your wishlist is empty.</div> :
          wishlist.map((w, i) => (
            <div key={w.id} className="book">
              <Cover book={w} index={i + 3} />
              <div className="book-meta">
                <div className="t">{w.t}</div>
                <div className="a">{w.a}</div>
                <button className="wishlist-btn" onClick={() => handleMoveFromWishlist(w)}>Add to library</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const renderHighlights = () => (
    <div className={`view ${view === 'highlights' ? 'active' : ''}`} id="view-highlights">
      <div className="toolbar"><h1>Highlights</h1></div>
      <div>
        {highlights.map(h => (
          <div key={h.id} className="hl-item">
            <div className="hl-quote" style={{ borderColor: h.c }}>"{h.q}"</div>
            <div className="hl-meta">from {h.b}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSeries = () => (
    <div className={`view ${view === 'series' ? 'active' : ''}`} id="view-series">
      <div className="toolbar"><h1>Series &amp; Shelves</h1></div>
      <div className="grid">
        {series.map((s, i) => (
          <div key={s.id} className="book">
            <div className="cover" style={{ background: `linear-gradient(160deg, ${palette[i % palette.length]}, ${palette[i % palette.length]}AA)`, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div className="cover-title" style={{ fontSize: '14px' }}>{s.t}</div>
            </div>
            <div className="book-meta">
              <div className="t">{s.t}</div>
              <div className="a">{s.n} books</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDrawer = () => {
    if (!activeBook) return null;
    const b = activeBook;
    const pct = Math.round(b.read / b.pages * 100);
    return (
      <>
        <div className={`overlay ${drawerOpen ? 'active' : ''}`} onClick={() => setDrawerOpen(false)}></div>
        <div className={`drawer ${drawerOpen ? 'active' : ''}`}>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
          <div id="drawerContent">
            <Cover book={b} index={books.findIndex(x => x.id === b.id)} />
            <h2>{b.t}</h2><div className="a">{b.a}</div>
            <div className="tag-row">
              <span className="tag">{b.g}</span>
              <span className="tag">{b.status === 'reading' ? 'Currently reading' : b.status === 'completed' ? 'Completed' : 'Plan to read'}</span>
            </div>
            <div className="drawer-progress-label"><span>{b.read} of {b.pages} pages</span><span>{pct}%</span></div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }}></div></div>
            <p className="desc">Your rating</p>
            <Stars n={b.rating} onRate={(n) => handleRateBook(b.id, n)} />
            <div className="drawer-actions">
              <button className="btn-block primary" onClick={() => handleOpenReader(b)}>Continue reading</button>
              {b.file_path && (
                <a 
                  href={api.getBookFileUrl(b.id)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-block ghost" 
                  style={{ textAlign: 'center', textDecoration: 'none', display: 'block', boxSizing: 'border-box' }}
                >
                  Download / View PDF
                </a>
              )}
              <button className="btn-block ghost" onClick={() => handleAddToWishlist(b)}>Add to wishlist</button>
              <button className="btn-block danger" onClick={() => handleDeleteBook(b.id)}>Delete book</button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleCloseReader = () => {
    if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
    setReaderOpen(false);
    fetchData(); // get latest status
  };

  const renderReader = () => {
    if (!activeBook || !readerOpen) return null;
    return (
      <div style={{ position: 'fixed', inset: 0, backgroundColor: '#f8f4ea', zIndex: 100, overflow: 'auto' }}>
        <BookReader 
           title={activeBook.t}
           author={activeBook.a}
           text={bookText}
           startPercent={activeBook.pages > 0 ? activeBook.read / activeBook.pages : 0}
           onProgress={handleProgress}
           onClose={handleCloseReader}
        />
      </div>
    );
  };


  return (
    <div id="app" className="active">
      <div className="sidebar">
        <div className="brand">Bookshelf</div>
        <button className={`nav-item ${view === 'shelf' ? 'active' : ''}`} onClick={() => setView('shelf')}><span className="dot"></span>Bookshelf</button>
        <button className={`nav-item ${view === 'wishlist' ? 'active' : ''}`} onClick={() => setView('wishlist')}><span className="dot"></span>Wishlist</button>
        <button className={`nav-item ${view === 'highlights' ? 'active' : ''}`} onClick={() => setView('highlights')}><span className="dot"></span>Highlights</button>
        <button className={`nav-item ${view === 'series' ? 'active' : ''}`} onClick={() => setView('series')}><span className="dot"></span>Series &amp; Shelves</button>
        <div className="sidebar-foot">Signed in as reader@example.com<br /><span onClick={() => setLoggedIn(false)}>Sign out</span></div>
      </div>

      <div className="main">
        {renderShelf()}
        {renderWishlist()}
        {renderHighlights()}
        {renderSeries()}
      </div>

      {renderDrawer()}
      {renderReader()}
      <UploadModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); setUploadInitialData({}); }} 
        onUploadSuccess={fetchData} 
        initialData={uploadInitialData} 
      />
    </div>
  );
}

export default App;
