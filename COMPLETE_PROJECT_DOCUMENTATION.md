# COMPLETE PROJECT DOCUMENTATION: PERSONAL LIBRARY APPLICATION
## Full Chronological Phase-Wise Engineering History, Technical Architecture & System Manual

---

## Document Control & Executive Summary

* **Project Title:** Personal Library Web Application (Bookshelf)
* **Repository Location:** `c:\Users\Sai\OneDrive\Desktop\personal library`
* **Architectural Pattern:** Decoupled Client-Server SPA (Single Page Application) + REST API + Embedded Relational DB
* **Current Core Technologies:** React 19, Vite 8, Python 3.13, FastAPI 0.115+, SQLite 3, Pydantic v2, PyPDF 5.x, React-PageFlip
* **Earliest Verified Record Date:** 2026-09-22 23:18:55 +05:30
* **Current Record Date:** 2026-09-26 12:01:37 +05:30
* **Document Status:** Complete Historical Reconstruction & Current Reference Manual

### Executive Summary

The **Personal Library** application is an artisanal, literary-themed personal cataloging and e-reading web application designed to manage a user's reading journey. Inspired by physical library aesthetics—featuring tactile paper textures, deep library teal and warm amber tones, serif typography (Fraunces and Georgia), dynamic book spine bindings, and a realistic physics-based 3D page-flip reader—the project empowers users to maintain their personal book collection, track reading milestones, record reflections and highlights, manage a wishlist, and read digital books directly within the browser.

This document represents the definitive, exhaustive engineering record of the project's evolution. Unlike static code documentation that merely describes the present system state, this record meticulously reconstructs the chronological progression of every architectural decision, user instruction, feature introduction, refactoring event, database schema alteration, bug remediation, and security hardening phase from its inception as a standalone monolithic HTML prototype to its current production-ready full-stack architecture.

---

## Table of Contents

1. [Investigation Methodology & Historical Evidence Base](#1-investigation-methodology--historical-evidence-base)
2. [Development Evolution Phases](#2-development-evolution-phases)
   * [Phase 0 — Conceptual Origin & Monolithic HTML Prototype](#phase-0--conceptual-origin--monolithic-html-prototype)
   * [Phase 1 — Full-Stack Architecture Migration & Scaffolding](#phase-1--full-stack-architecture-migration--scaffolding)
   * [Phase 2 — Static Data Purge, Database Zero-State & Multi-Genre Selection](#phase-2--static-data-purge-database-zero-state--multi-genre-selection)
   * [Phase 3 — Real Book Seeding & Automated Cover Art Integration](#phase-3--real-book-seeding--automated-cover-art-integration)
   * [Phase 4 — Reading Window Navigation & Viewport Controls](#phase-4--reading-window-navigation--viewport-controls)
   * [Phase 5 — Realistic 3D Paper Page-Flip Reader Integration & Hook Ordering Fix](#phase-5--realistic-3d-paper-page-flip-reader-integration--hook-ordering-fix)
   * [Phase 6 — Scanned PDF Diagnostics & Cover Box Typography Clamping](#phase-6--scanned-pdf-diagnostics--cover-box-typography-clamping)
   * [Phase 7 — Hardened PDF-Only Upload Pipeline & File System Security](#phase-7--hardened-pdf-only-upload-pipeline--file-system-security)
3. [Master Feature History](#3-master-feature-history)
4. [Master Chronological Changelog](#4-master-chronological-changelog)
5. [Technical Architecture Evolution](#5-technical-architecture-evolution)
   * [Initial Prototype Architecture](#51-initial-prototype-architecture)
   * [Intermediate Full-Stack Architecture](#52-intermediate-full-stack-architecture)
   * [Current Production Architecture](#53-current-production-architecture)
   * [Major Architectural Decisions & Trade-Off Analysis](#54-major-architectural-decisions--trade-off-analysis)
   * [Text-Based & Mermaid System Architecture Diagrams](#55-system-architecture-diagrams)
6. [Complete Project Folder & File Structure](#6-complete-project-folder--file-structure)
7. [Comprehensive Current Feature Inventory](#7-comprehensive-current-feature-inventory)
8. [Removed, Replaced & Deprecated Features](#8-removed-replaced--deprecated-features)
9. [Bug & Issue History](#9-bug--issue-history)
10. [Configuration, Environment & Deployment Guide](#10-configuration-environment--deployment-guide)
11. [End-to-End System Workflows](#11-end-to-end-system-workflows)
12. [File-Level Responsibilities & Component Directory](#12-file-level-responsibilities--component-directory)
13. [Technology Evolution Matrix](#13-technology-evolution-matrix)
14. [Verifiable Chronological Timeline](#14-verifiable-chronological-timeline)
15. [Historical Gaps & Uncertainties](#15-historical-gaps--uncertainties)
16. [Current Project Snapshot & Roadmap](#16-current-project-snapshot--roadmap)
17. [Evidence Reference Index](#17-evidence-reference-index)

---

## 1. Investigation Methodology & Historical Evidence Base

To ensure absolute historical fidelity without fabrication, this documentation was compiled through direct multi-source forensics across all available artifacts:

1. **Active Codebase & File System Analysis:** Direct inspection of every existing source code file, configuration file, database file, script, test harness, and stylesheet across `backend/`, `frontend/`, and root directories.
2. **Antigravity Brain Execution Transcripts & Session Logs:**
   - Conversation ID `6bfae254-c637-484f-b581-4c197cc977b2` (initiated 2026-09-22 23:18:55): Contains initial requests, full-stack scaffolding, static data removal, Harry Potter book seeding, Google Books API cover integration, page navigation controls, and initial flipbook setup.
   - Conversation ID `a5524333-6c2d-4b68-abbb-c41545e82eed` (initiated 2026-09-24 19:57:26): Contains recovery from interruption, SQLite migration syntax error resolution, hardened PDF-only upload implementation, client/server magic-bytes validation, and headless browser validation recordings.
   - Conversation ID `32235c33-1fb5-44a6-817f-1e8916f06bd0` (current session, 2026-09-26 12:01:37).
3. **Artifact Analysis:** Review of generated plan documents ([`implementation_plan.md`](file:///c:/Users/Sai/.gemini/antigravity-ide/brain/6bfae254-c637-484f-b581-4c197cc977b2/implementation_plan.md)), task trackers ([`task.md`](file:///c:/Users/Sai/.gemini/antigravity-ide/brain/6bfae254-c637-484f-b581-4c197cc977b2/task.md)), walkthroughs ([`walkthrough.md`](file:///c:/Users/Sai/.gemini/antigravity-ide/brain/6bfae254-c637-484f-b581-4c197cc977b2/walkthrough.md)), screen capture recordings (`verify_pdf_upload_1790260889616.webp`), and error images (`upload_pdf_error_1790261412384.png`).
4. **Relational Database PRAGMA Inspection:** Schema and data forensics on [backend/library.db](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/library.db) measuring table evolution, column additions, user accounts, and row histories.
5. **Original Prototype Comparison:** Direct line-by-line diff and semantic comparison against [original.html](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) (26,462 bytes, 477 lines).

All historical assertions throughout this document cite exact timestamps, prompt steps, files, or transcript logs.

---

# 2. Development Evolution Phases

---

# Phase 0 — Conceptual Origin & Monolithic HTML Prototype

## Objective
Establish the foundational user experience, visual identity, typography, interactive metaphors, and screen layouts for a personal book-tracking library application using a single, self-contained HTML/CSS/JavaScript document.

## Starting State
No pre-existing software repository. The project originated as a concept for an elegant personal cataloging tool with artisanal paper and book styling.

## Requests / Requirements
* **Request:** Create a visually distinctive, responsive personal library prototype containing book tracking, reading progress sliders, wishlist management, quotes/highlights, series collections, and authentication views.
* **Source / Evidence:** Preserved in root as [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) (originally located at `c:\Users\Sai\Downloads\Personal Library (1).html` before migration on 2026-09-22).
* **Priority / Importance:** High (Design Benchmark). The user explicitly mandated across later phases: *"here i have given u the ui dont change anything in that"*.

## Features Added

### Literary Design System & Color Palette
* **First requested:** Phase 0 (Initial prototype creation).
* **Purpose:** Establish a warm, tactile reading environment evoking physical paper, ink, bookcloth, and leather bindings.
* **Implementation:** CSS custom properties defined on `:root` including `--paper` (`#F6F2E9`), `--paper2` (`#EFE9DB`), `--ink` (`#211F1B`), `--ink-soft` (`#6B6355`), `--teal` (`#1F4E49`), `--amber` (`#C17F3E`), `--line` (`#E1D9C6`), `--card` (`#FFFFFF`), and `--danger` (`#A6432F`). Dark mode overrides defined via `@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]`. Integrated Google Fonts `Fraunces` (serif headline) and `Inter` (sans-serif UI).
* **Files/modules affected:** [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) (lines 10-27).
* **Frontend changes:** Full CSS variable system, typography reset, webkit scrollbars.
* **Backend changes:** None (no backend existed).
* **Database changes:** None (in-memory arrays).
* **API changes:** None.
* **Dependencies/services added:** Google Fonts CDN (`Fraunces`, `Inter`).
* **Current status:** Implemented & Persisted (transferred into `frontend/src/index.css`).

### Mock Authentication Screen
* **First requested:** Phase 0.
* **Purpose:** Provide a gatekeeper screen with email/password input and brand header.
* **Implementation:** Centered `#login` view containing `.login-card`, pre-filled with `reader@example.com`, switching into `#app` upon clicking "Sign in" via `enterApp()`.
* **Files/modules affected:** [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) (lines 28-42, 149-165, 468-473).
* **Frontend changes:** Static HTML login card with toggle to app shell.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Replaced with stateful React component in `App.jsx`.

### Multi-View App Shell & Navigation
* **First requested:** Phase 0.
* **Purpose:** Allow seamless navigation across personal library sections.
* **Implementation:** Left fixed sidebar (210px) with brand title and 4 view tabs: "Bookshelf", "Wishlist", "Highlights", and "Series & Shelves". View toggling handled via DOM manipulation modifying `.view.active`.
* **Files/modules affected:** [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) (lines 43-57, 167-185, 448-455).
* **Frontend changes:** Sidebar layout with gold amber indicator dots on active items.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Implemented & Persisted in React state.

### Bookshelf View with Search, Filtering & Sorting
* **First requested:** Phase 0.
* **Purpose:** Display book cards in a responsive grid with real-time text query filtering, genre dropdown, sort orders, and reading status tabs.
* **Implementation:** Grid layout (`repeat(auto-fill, minmax(150px, 1fr))`) rendering book covers styled with dynamic gradient palettes and book spines. Tabs for "All books", "Currently reading", "Favorites", and "Completed". Client-side sorting by "Recently added", "Progress", "Title", and "Author".
* **Files/modules affected:** [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) (lines 58-88, 187-210, 301-326).
* **Frontend changes:** Book card rendering with spine binding shadow, title, author, progress bar, and 5-star rating display.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Implemented & Persisted in React `App.jsx`.

### Book Detail Slide-Over Drawer
* **First requested:** Phase 0.
* **Purpose:** Slide out detailed metadata, rating selector, progress summary, and actions for a clicked book.
* **Implementation:** Fixed right drawer (360px wide, `transform: translateX(100%)` transitioning to `0`) with dark overlay (`.overlay.active`). Allows interactive star rating, launching the reading view, adding book to wishlist, and deleting book.
* **Files/modules affected:** [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) (lines 89-107, 212-231, 346-364).
* **Frontend changes:** Drawer CSS animations and modal backdrop.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Implemented & Persisted in React `App.jsx`.

### Full-Screen Reading Interface (Initial Prototype)
* **First requested:** Phase 0.
* **Purpose:** Distraction-free reading view with a progress slider.
* **Implementation:** Fixed full-screen overlay `#reader` containing `.reader-top` (back button, title, percent), `.reader-body` with centered serif text column, and `.reader-bottom` with an interactive `<input type="range">` range slider synced to page progress.
* **Files/modules affected:** [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) (lines 108-121, 233-248, 366-383).
* **Frontend changes:** Fullscreen overlay reading mode.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Replaced in Phase 5 with 3D physical page-turn flipbook (`BookReader.jsx`).

### Add Book Modal (Initial Prototype)
* **First requested:** Phase 0.
* **Purpose:** Dialog modal to input new book title, author, single genre, and total page count.
* **Implementation:** Modal dialog overlay with input fields (`#newTitle`, `#newAuthor`, `#newGenre`, `#newPages`) and mock dropzone text mentioning "EPUB · PDF · MOBI · CBZ". Clicking "Add to library" pushed an object to the in-memory `books` array.
* **Files/modules affected:** [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) (lines 122-132, 250-264, 395-415).
* **Frontend changes:** Modal overlay and form inputs.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Replaced in Phase 7 with `UploadModal.jsx` supporting PDF drag-and-drop, client-side validation, and multipart upload.

### Wishlist, Highlights & Series Views
* **First requested:** Phase 0.
* **Purpose:** Auxiliary views for tracking desired books, inspirational quotes, and curated collections.
* **Implementation:** 
  - Wishlist: grid of desired books with "Add to library" action moving the item to the bookshelf.
  - Highlights: list of literary quotes styled with colored vertical accent borders (`border-left: 3px solid var(--amber)`).
  - Series: shelf collection cards displaying book counts.
* **Files/modules affected:** [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) (lines 133-145, 278-292, 327-345).
* **Frontend changes:** Custom card layouts for non-shelf views.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Implemented & Persisted in React `App.jsx` connected to FastAPI endpoints.

## Features Modified
None (initial prototype phase).

## Bugs Fixed
None (clean standalone prototype).

## UI/UX Changes
* Complete initial design implementation: Fraunces headlines, Inter body, paper color scheme, spine drop-shadows, drawer transitions, and responsive grid layout.

## Backend / Architecture Changes
* Monolithic single-file architecture. All HTML, CSS, JavaScript, and mock database objects were packaged into one file.

## Database Changes
* No persistent database. Data existed purely in memory within JavaScript array declarations:
  - 8 books: *The Midnight Library*, *Educated*, *Project Hail Mary*, *Atomic Habits*, *Circe*, *Sapiens*, *The Song of Achilles*, *Klara and the Sun*.
  - 3 wishlist items: *Piranesi*, *The Overstory*, *Pachinko*.
  - 3 highlights: quotes from *The Midnight Library*, *Educated*, *Circe*.
  - 3 series: *Madeline Miller — Collection*, *Favorites Shelf*, *Rainy Day Reads*.

## Dependencies / Integrations
* Google Fonts CDN (`https://fonts.googleapis.com`): `Fraunces` and `Inter`.

## Testing / Validation
* Manual browser rendering verification of the static HTML file.

## End State
A standalone, fully styled HTML prototype ([`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html)) displaying an attractive library UI, but completely lacking persistence, real file processing, backend APIs, or multi-user security.

---

# Phase 1 — Full-Stack Architecture Migration & Scaffolding

## Objective
Migrate the single-file HTML prototype into an enterprise-grade, scalable full-stack application utilizing React.js (Vite) on the frontend, FastAPI (Python) on the backend, and SQLite3 for persistent data storage, while guaranteeing zero visual divergence from the original design.

## Starting State
Single file `Personal Library (1).html` in user Downloads directory. No build system, no package manager, no server, no persistent database.

## Requests / Requirements
* **User Request (2026-09-22 23:18:55):**
  > *"here i have given u the ui dont change anything in that scale it to react js,fast api , sql lite 3"*
* **User Implementation Plan Approval (2026-09-22 23:27:37):** User approved [`implementation_plan.md`](file:///c:/Users/Sai/.gemini/antigravity-ide/brain/6bfae254-c637-484f-b581-4c197cc977b2/implementation_plan.md).
* **Priority / Importance:** Critical. Strict requirement to preserve UI/UX and styling while establishing full-stack architecture.

## Features Added

### Project Directory Structure & Scaffolding
* **First requested:** Phase 1 (Step 0).
* **Purpose:** Establish separation of concerns between frontend client and backend API.
* **Implementation:** 
  - Copied source prototype to [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) in workspace root.
  - Scaffolded `frontend/` directory with `npx create-vite@latest ./ --template react`.
  - Scaffolded `backend/` directory for Python services.
* **Files/modules affected:** Root directory, `frontend/`, `backend/`.
* **Frontend changes:** Initialized Vite React project structure (`package.json`, `vite.config.js`, `index.html`, `src/main.jsx`).
* **Backend changes:** Created `backend/` workspace.
* **Database changes:** None yet.
* **API changes:** None yet.
* **Dependencies/services added:** `react` (^19.2.8), `react-dom` (^19.2.8), `vite` (^8.3.0), `@vitejs/plugin-react` (^6.1.1).
* **Current status:** Implemented & Persisted.

### SQLite3 Relational Database Layer (`database.py`)
* **First requested:** Phase 1.
* **Purpose:** Provide persistent storage on disk for books, wishlist items, highlights, series, and user accounts.
* **Implementation:** Created [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py) using Python's standard `sqlite3` library. Implemented `get_db()` with `sqlite3.Row` row factory and `init_db()` to create schema tables (`books`, `wishlist`, `highlights`, `series`) and auto-seed initial mock data if the database is empty.
* **Files/modules affected:** [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py), [`backend/library.db`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/library.db).
* **Frontend changes:** None.
* **Backend changes:** Connection pooling logic and schema execution.
* **Database changes:** Created initial tables:
  - `books` (`id INTEGER PRIMARY KEY`, `t TEXT`, `a TEXT`, `g TEXT`, `pages INTEGER`, `read INTEGER`, `rating INTEGER`, `status TEXT`, `fav BOOLEAN`)
  - `wishlist` (`id INTEGER PRIMARY KEY`, `t TEXT`, `a TEXT`, `g TEXT`)
  - `highlights` (`id INTEGER PRIMARY KEY`, `q TEXT`, `b TEXT`, `c TEXT`)
  - `series` (`id INTEGER PRIMARY KEY`, `t TEXT`, `n INTEGER`)
* **API changes:** None.
* **Dependencies/services added:** Built-in Python `sqlite3`.
* **Current status:** Implemented & Persisted (extended in later phases).

### Pydantic Data Validation Schemas (`models.py`)
* **First requested:** Phase 1.
* **Purpose:** Type safety, payload serialization, and schema validation for API inputs and outputs.
* **Implementation:** Created [`backend/models.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/models.py) with Pydantic v2 models: `BookCreate`, `Book`, `BookUpdate`, `WishlistCreate`, `WishlistItem`, `HighlightCreate`, `Highlight`, `SeriesCreate`, and `Series`.
* **Files/modules affected:** [`backend/models.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/models.py).
* **Frontend changes:** None.
* **Backend changes:** Pydantic schemas established.
* **Database changes:** Mapped to SQLite columns.
* **API changes:** Applied as request bodies and `response_model` annotations.
* **Dependencies/services added:** `pydantic`.
* **Current status:** Implemented & Persisted.

### FastAPI RESTful Application Engine (`main.py`)
* **First requested:** Phase 1.
* **Purpose:** Expose high-performance asynchronous REST endpoints for library data operations.
* **Implementation:** Created [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py). Configured `CORSMiddleware` with permissive origins (`allow_origins=["*"]`) for local dev interoperability. Built endpoints:
  - `GET /api/books`, `POST /api/books`, `PUT /api/books/{id}`, `DELETE /api/books/{id}`
  - `GET /api/wishlist`, `POST /api/wishlist`, `DELETE /api/wishlist/{id}`
  - `GET /api/highlights`
  - `GET /api/series`
* **Files/modules affected:** [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py), [`backend/requirements.txt`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/requirements.txt).
* **Frontend changes:** None.
* **Backend changes:** Full FastAPI routing and database query execution.
* **Database changes:** Handled CRUD queries against `library.db`.
* **API changes:** Complete REST API introduced.
* **Dependencies/services added:** `fastapi`, `uvicorn`, `pydantic`.
* **Current status:** Implemented & Persisted (substantially extended in Phase 7).

### Frontend Zero-Divergence Design Migration
* **First requested:** Phase 1.
* **Purpose:** Ensure 100% pixel-perfect preservation of styling, fonts, and responsiveness.
* **Implementation:** Extracted exact CSS rules from [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) into [`frontend/src/index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css). Updated [`frontend/index.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/index.html) to link Google Fonts preconnect headers and font stylesheets for `Fraunces` and `Inter`.
* **Files/modules affected:** [`frontend/src/index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css), [`frontend/index.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/index.html).
* **Frontend changes:** Integrated CSS variables, layout classes, and fonts into Vite build.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Implemented & Persisted.

### React State Management & API Client (`api.js` & `App.jsx`)
* **First requested:** Phase 1.
* **Purpose:** Convert vanilla JS imperative DOM manipulation into declarative React state and hooks (`useState`, `useEffect`).
* **Implementation:**
  - Created [`frontend/src/api.js`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/api.js) implementing `fetch` calls against `http://localhost:8000/api`.
  - Created [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) managing `loggedIn`, `view` ('shelf', 'wishlist', 'highlights', 'series'), `books`, `wishlist`, `highlights`, `series`, search query, genre filtering, sorting, drawer state, and modal state.
* **Files/modules affected:** [`frontend/src/api.js`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/api.js), [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Frontend changes:** Full React SPA migration.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** Consumed `/api/*` endpoints.
* **Dependencies/services added:** None.
* **Current status:** Implemented & Persisted.

## Features Modified
* **Architecture:** Migrated from single-file HTML/JS/CSS to client-server architecture (Vite React + FastAPI + SQLite).
* **State Management:** Replaced global window variables (`books`, `wishlist`) and imperative innerHTML rewriting with React reactive hooks.

## Bugs Fixed
* **Issue:** Root execution path mismatch when launching Vite dev server.
  - *Cause:* User ran `npm run dev` in the root folder (`personal library`) instead of inside `frontend/`.
  - *Fix:* Clarified execution directories and launched servers in background via proper subdirectories (`cd backend; uvicorn ...` and `cd frontend; npm run dev`).
  - *Files affected:* Terminal execution environment.
  - *Impact:* Prevented failed build attempts.

## UI/UX Changes
* None visually. By design, visual parity was 100% identical to Phase 0.

## Backend / Architecture Changes
* Established modern 3-tier architecture:
  - Frontend SPA (React / Vite) running on port `5173`.
  - Backend API (FastAPI / Uvicorn) running on port `8000`.
  - Database (SQLite3) stored at `backend/library.db`.

## Database Changes
* Initialized `backend/library.db` with sample data seeded on first run:
  - 8 books inserted into `books`
  - 3 wishlist items inserted into `wishlist`
  - 3 highlights inserted into `highlights`
  - 3 series inserted into `series`

## Dependencies / Integrations
* **Frontend (`package.json`):** `react` (^19.2.8), `react-dom` (^19.2.8), `vite` (^8.3.0), `@vitejs/plugin-react` (^6.1.1).
* **Backend (`requirements.txt`):** `fastapi`, `uvicorn`, `pydantic`.

## Testing / Validation
* Verified FastAPI startup on `http://localhost:8000`.
* Verified Vite dev server startup on `http://localhost:5173`.
* Inspected network calls confirming React fetched initial books, wishlist items, highlights, and series from SQLite through FastAPI.

## End State
A functioning full-stack application with an operational React frontend, FastAPI backend, and seeded SQLite database.

---

# Phase 2 — Static Data Purge, Database Zero-State & Multi-Genre Selection

## Objective
Remove all hardcoded mock data to allow real user book collection management, enforce a 10MB maximum upload limit, and transform the upload genre input into a flexible multi-selection picker allowing books to belong to multiple categories.

## Starting State
The SQLite database automatically seeded mock books (*The Midnight Library*, *Educated*, etc.) on every initialization. The upload form contained a single plain-text genre input field.

## Requests / Requirements
* **User Request (2026-09-24 17:59:37 & 18:08:46):**
  > *"remove the static data from it, so that i can put my real data in it"*
  > *"the book should not be above 10mb and in the upload book section, there should be an picker like it should have an set of generes and the user will select from it, the user can select multiple geners for a single book too"*
* **Priority / Importance:** High. Transition from a sample demo to a functional personalized library.

## Features Added

### Genre Multi-Select Pill Picker
* **First requested:** Phase 2 (Step 95, 2026-09-24 18:08:46).
* **Purpose:** Provide a curated set of standard literary genres that users can easily click to toggle multiple selections per book.
* **Implementation:** 
  - Defined predefined list: `["Fiction", "Non-Fiction", "Fantasy", "Sci-Fi", "Mystery", "Thriller", "Romance", "Memoir", "History", "Self-Help", "Science", "Philosophy"]`.
  - Added interactive pill buttons with toggle logic (`handleGenreToggle`). Selected genres receive active teal/burgundy background styling.
  - Formats multi-genres into comma-separated string (`genres.join(', ')`) for backend storage.
* **Files/modules affected:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Frontend changes:** Replaced `<input id="newGenre" />` with interactive pill cloud.
* **Backend changes:** None (backend receives comma-separated string in `g` column).
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Implemented & Persisted (migrated into `UploadModal.jsx` in Phase 7).

### Multi-Genre Bookshelf Filtering
* **First requested:** Phase 2.
* **Purpose:** Ensure books with multiple genres appear correctly when any of their individual genres are selected in the toolbar filter dropdown.
* **Implementation:** Updated Bookshelf filtering logic in `App.jsx` to split comma-separated strings:
  ```javascript
  if (genreFilter && !b.g.split(', ').includes(genreFilter)) return false;
  ```
  Dynamically collects all distinct genres present in currently stored books into `allGenres` Set for the filter dropdown options.
* **Files/modules affected:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Frontend changes:** Dynamic genre aggregation and token-based filtering.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Implemented & Persisted.

### Initial File Upload Input & 10MB Limit Validation
* **First requested:** Phase 2.
* **Purpose:** Introduce real file selection in the upload dialog and reject files exceeding 10MB.
* **Implementation:** Added `<input type="file">` to the upload dialog with client-side size check (`file.size > 10 * 1024 * 1024`).
* **Files/modules affected:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Frontend changes:** File picker and size error check.
* **Backend changes:** None yet.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** None.
* **Current status:** Superseded & Replaced in Phase 7 with 25MB PDF-only drag-and-drop modal.

## Features Modified
* **Database Initialization (`database.py`):**
  - *Previous behavior:* `init_db()` called `seed_data(conn)` automatically when `SELECT COUNT(*) FROM books` returned 0.
  - *New behavior:* Removed `seed_data(conn)` invocation from `init_db()`.
  - *Reason for change:* User explicitly requested wiping static data to store personal books.
  - *Files affected:* [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py).
  - *Current behavior:* Database starts completely clean with 0 records.

## Bugs Fixed
* **Issue:** Persistent re-seeding of dummy books whenever database was wiped.
  - *Cause:* Automatic seed check in `init_db()`.
  - *Fix:* Removed automatic call to `seed_data()`; deleted physical `backend/library.db` and reinitialized clean tables.
  - *Files affected:* [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py), [`backend/library.db`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/library.db).
  - *Impact:* Allowed true zero-state data management.

## UI/UX Changes
* Upload modal updated with interactive genre tag pills.
* Empty state message displayed on the bookshelf: *"No books match. Try a different search or upload a new book."*

## Backend / Architecture Changes
* No architectural paradigm changes; backend remained RESTful FastAPI service.

## Database Changes
* Physical file [`backend/library.db`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/library.db) deleted via PowerShell command and re-created empty.

## Dependencies / Integrations
* No new dependencies.

## Testing / Validation
* Verified that opening the frontend showed an empty bookshelf with zero mock entries.
* Tested multi-genre pill selection and verified that books saved with multiple genres were filterable by each tag.

## End State
A clean application ready to accept personal book data, featuring multi-genre selection and an empty database.

---

# Phase 3 — Real Book Seeding & Automated Cover Art Integration

## Objective
Populate the user's library with the complete 7-volume *Harry Potter* series, alter the database schema to support cover image URLs, integrate the Google Books API for automatic book jacket discovery, and update the UI to seamlessly blend authentic cover art with the artisanal book spine aesthetic.

## Starting State
Clean database with 0 books. Covers were rendered exclusively as algorithmic CSS color gradients generated from an 8-color palette (`palette[i % palette.length]`).

## Requests / Requirements
* **User Request 1 (2026-09-24 18:14:49):**
  > *"Harry Potter and the Philosopher's Stone (Released as Harry Potter and the Sorcerer's Stone in the US)Harry Potter and the Chamber of SecretsHarry Potter and the Prisoner of AzkabanHarry Potter and the Goblet of FireHarry Potter and the Order of the PhoenixHarry Potter and the Half-Blood PrinceHarry Potter and the Deathly Hallows*
  > *add these books there like add them there for real"*
* **User Request 2 (2026-09-24 18:17:17 & 18:28:23):**
  > *"what u need to display the real images of the books that are added there ?"*
  > *"i want u to add the cover for every book that is added to the library"*
* **Priority / Importance:** High. Direct real-world content population and visual enhancement.

## Features Added

### Harry Potter Series Seeding Script (`seed_hp.py`)
* **First requested:** Phase 3 (Step 117, 2026-09-24 18:14:49).
* **Purpose:** Inject the complete canonical 7 Harry Potter novels with authentic page counts and metadata directly into SQLite.
* **Implementation:** Created [`backend/seed_hp.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/seed_hp.py) inserting 7 records:
  - *Harry Potter and the Philosopher's Stone* (309 pages)
  - *Harry Potter and the Chamber of Secrets* (341 pages)
  - *Harry Potter and the Prisoner of Azkaban* (317 pages)
  - *Harry Potter and the Goblet of Fire* (636 pages)
  - *Harry Potter and the Order of the Phoenix* (766 pages)
  - *Harry Potter and the Half-Blood Prince* (607 pages)
  - *Harry Potter and the Deathly Hallows* (607 pages)
  All initialized with author `J.K. Rowling`, genre `Fantasy`, and status `plan`.
* **Files/modules affected:** [`backend/seed_hp.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/seed_hp.py), [`backend/library.db`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/library.db).
* **Frontend changes:** Books populated dynamically on the Bookshelf.
* **Backend changes:** Execution script created.
* **Database changes:** Inserted IDs 1 through 7 into `books`.
* **API changes:** Returned via `GET /api/books`.
* **Dependencies/services added:** None.
* **Current status:** Implemented & Persisted.

### Schema Migration: `cover_url` Column (`migrate.py`)
* **First requested:** Phase 3.
* **Purpose:** Store remote image URLs for books and wishlist items.
* **Implementation:** Created [`backend/migrate.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/migrate.py) executing:
  ```sql
  ALTER TABLE books ADD COLUMN cover_url TEXT;
  ALTER TABLE wishlist ADD COLUMN cover_url TEXT;
  ```
  Wrapped with try/catch to handle idempotency (`sqlite3.OperationalError`). Updated [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py) table creation statements to include `cover_url TEXT`.
* **Files/modules affected:** [`backend/migrate.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/migrate.py), [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py), [`backend/models.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/models.py).
* **Frontend changes:** None.
* **Backend changes:** Updated Pydantic models with `cover_url: Optional[str] = None`.
* **Database changes:** Added `cover_url` column to `books` and `wishlist`.
* **API changes:** Serialized `cover_url` in book and wishlist payloads.
* **Dependencies/services added:** None.
* **Current status:** Implemented & Persisted.

### Google Books API Cover Discovery Engine
* **First requested:** Phase 3 (Step 129, 2026-09-24 18:28:23).
* **Purpose:** Automatically query and fetch official book cover thumbnail URLs using title and author without requiring manual image uploads.
* **Implementation:** Built `fetch_cover_url(title, author)` in [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py):
  - Constructs URL query: `https://www.googleapis.com/books/v1/volumes?q=intitle:{title}+inauthor:{author}`.
  - Sends HTTP request with custom User-Agent header (`Mozilla/5.0`) and 5-second timeout.
  - Parses JSON response, extracts `items[0].volumeInfo.imageLinks.thumbnail`.
  - Automatically upgrades HTTP thumbnail URLs to secure HTTPS (`thumb.replace("http://", "https://")`).
  - Integrated into book creation (`POST /books/upload`, `POST /api/books`) and wishlist item creation (`POST /api/wishlist`).
* **Files/modules affected:** [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Frontend changes:** None.
* **Backend changes:** Integrated external API querying.
* **Database changes:** Saves resolved URL to `cover_url`.
* **API changes:** Book creation routes auto-populate `cover_url`.
* **Dependencies/services added:** Built-in Python `urllib.request` and `urllib.parse`.
* **Current status:** Implemented & Persisted.

### Cover Backfill Script (`backfill_covers.py`)
* **First requested:** Phase 3.
* **Purpose:** Iterate over all existing books in the database and retroactively fetch cover URLs.
* **Implementation:** Created [`backend/backfill_covers.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/backfill_covers.py).
* **Files/modules affected:** [`backend/backfill_covers.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/backfill_covers.py).
* **Current status:** Implemented. (Note: Initial bulk execution encountered Google Books API rate limiting, demonstrating the necessity of the UI fallback mechanism).

### Hybrid Book Cover Component (Real Image + Spine Overlay)
* **First requested:** Phase 3.
* **Purpose:** Render authentic book cover photography when available while preserving the tactile physical book aesthetic (embossed spine, shadow borders).
* **Implementation:** Updated `Cover` component in [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx):
  ```jsx
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
  ```
* **Files/modules affected:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Frontend changes:** Conditional rendering of `<img>` with absolute positioning and preservation of `.spine`.
* **Current status:** Implemented & Persisted.

## Features Modified
* **Cover Rendering:** From uniform algorithmic gradient rectangles to dynamic photographic book jackets with physical spine overlay.
* **Book Creation API:** Now intercepts title and author to auto-populate cover URLs asynchronously before saving.

## Bugs Fixed
* **Issue:** Rate limiting when querying Google Books API in rapid succession.
  - *Cause:* Google Books API imposes unauthenticated IP rate limits when bursts of queries occur.
  - *Fix:* Added try/except error shielding in `fetch_cover_url()` returning `None` on failure, and implemented graceful frontend fallback to the CSS gradient cover whenever `cover_url` is null.
  - *Files affected:** [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py), [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
  - *Impact:* The application never crashes or displays broken image icons when external API limits are reached.

## UI/UX Changes
* Bookshelf cards now display photographic cover artwork when resolved.
* Drawer modal shows the high-resolution book jacket in the detail header.

## Backend / Architecture Changes
* Introduced external API integration pattern using Google Books API.
* Added migration script pattern to incrementally modify SQLite tables without data loss.

## Database Changes
* Altered `books` table: added column `cover_url TEXT`.
* Altered `wishlist` table: added column `cover_url TEXT`.
* Seeded 7 *Harry Potter* records.

## Dependencies / Integrations
* **External API:** Google Books API (`https://www.googleapis.com/books/v1/volumes`).

## Testing / Validation
* Ran `migrate.py` confirming column additions.
* Ran `seed_hp.py` confirming 7 books inserted.
* Verified `GET /api/books` returned seeded novels with new fields.

## End State
A populated library featuring all 7 *Harry Potter* books, automatic cover art fetching via Google Books API, and graceful fallback to gradient covers.

---

# Phase 4 — Reading Window Navigation & Viewport Controls

## Objective
Enhance the reading interface with versatile page-turning controls supporting on-screen navigation buttons, keyboard arrow shortcuts, and mobile touch swipes.

## Starting State
The prototype reading view only offered a linear `<input type="range">` slider at the bottom of the screen to scrub through page numbers.

## Requests / Requirements
* **User Request (2026-09-24 18:41:36):**
  > *"to turn the pages in the reading window i want an button there itself or the keys in the keyboard should be working or the swipe should also be working"*
* **Priority / Importance:** High (Ergonomics). Reading requires intuitive, multi-modal navigation beyond a tiny progress slider.

## Features Added

### On-Screen Floating Page-Turn Buttons
* **First requested:** Phase 4 (Step 171, 2026-09-24 18:41:36).
* **Purpose:** Provide large, touch-friendly next and previous click targets on screen edges.
* **Implementation:** Rendered floating directional arrow buttons (`‹` and `›`) positioned on the left and right borders of the reader overlay, incrementing and decrementing the active reading page index.
* **Files/modules affected:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Frontend changes:** Added navigation buttons with boundary checks (`disabled={currentPage <= 0}`).
* **Current status:** Superseded and integrated into the dedicated 3D flipbook controls in Phase 5.

### Keyboard Arrow Navigation
* **First requested:** Phase 4.
* **Purpose:** Enable standard desktop reading keyboard shortcuts.
* **Implementation:** Attached a `keydown` window event listener listening for `ArrowRight` (turn forward) and `ArrowLeft` (turn backward).
* **Files/modules affected:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Frontend changes:** Added `useEffect` key listener with cleanup (`removeEventListener`).
* **Current status:** Implemented & Persisted (transferred into `BookReader.jsx`).

### Mobile Touch Swipe Detection
* **First requested:** Phase 4.
* **Purpose:** Enable natural swipe gestures on smartphones and tablets.
* **Implementation:** Added `onTouchStart` and `onTouchEnd` handlers tracking horizontal touch delta (`e.changedTouches[0].clientX - startX`). A swipe greater than 50px triggered page transitions.
* **Files/modules affected:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Frontend changes:** Touch delta calculation and swipe listener.
* **Current status:** Replaced in Phase 5 by `react-pageflip`'s native touch-drag mechanics.

## Features Modified
* **Reading Progress Control:** Supplemented the bottom slider with three direct page-turn input methods.

## Bugs Fixed
* None (feature addition).

## UI/UX Changes
* Readers gained immediate, tactile control over page progression.

## Backend / Architecture Changes
* None (client-side interaction enhancement).

## Database Changes
* None.

## Dependencies / Integrations
* None.

## Testing / Validation
* Verified clicking arrow buttons advanced pages.
* Verified keyboard arrow keys advanced pages.

## End State
A responsive reading overlay capable of responding to clicks, key presses, and swipes.

---

# Phase 5 — Realistic 3D Paper Page-Flip Reader Integration & Hook Ordering Fix

## Objective
Transform the flat reading overlay into an immersive physical reading experience where text is dynamically typeset onto realistic paper-style pages that physically curl, cast dynamic shadows, and flip like real paper, backed by PyPDF backend text extraction and automatic progress synchronization.

## Starting State
The reading screen was a simple text container with a range slider and edge buttons. It had no pagination algorithm, no physical book simulation, and no connection to digital book text files on disk.

## Requests / Requirements
* **User Specification (2026-09-24 18:54:19 & 18:58:47):**
  - **Role:** Senior full-stack engineer making focused, minimal-risk changes.
  - **Goal:** Upgrade Book Reading screen so uploaded text appears on realistic paper-style pages with a realistic page-turn animation (page curls, shows a shadow, reveals next page underneath).
  - **Reference Files:** User supplied complete production code for `BookReader.jsx` and `BookReader.css` in Step 201.
  - **Pagination Rule:** Split whole book text into pages that fit exactly on one page with no overflow and no cut-off lines using a hidden DOM probe element with binary search.
  - **Responsive Sizing:** Single page view on mobile (<800px), double-page spread on desktop.
  - **State Persistence:** Resume where user left off via `startPercent = pages_read / total_pages`. Auto-save progress back to SQLite through `PUT /api/books/{id}`. Mark `completed` when percent >= 0.98.
  - **Constraint:** Use only `react-pageflip` and `pypdf`. No `localStorage` for book data. Keep code well-commented.
* **Priority / Importance:** Critical (Flagship Feature). Transforms the application into a true e-reader.

## Features Added

### Physics-Based 3D Flipbook Engine (`BookReader.jsx` & `BookReader.css`)
* **First requested:** Phase 5 (Step 177, 2026-09-24 18:54:19; code provided in Step 201).
* **Purpose:** Simulate the tactile sensation of turning a page in a physical hardcover/paperback book.
* **Implementation:** 
  - Installed `react-pageflip` (^2.0.3).
  - Created [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx) and [`frontend/src/components/BookReader.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.css).
  - Integrated `HTMLFlipBook` component with parameters:
    `size="fixed"`, `showCover={true}`, `drawShadow={true}`, `maxShadowOpacity={0.5}`, `flippingTime={900}`, `usePortrait={true}`.
  - Implemented `Cover` front and back components (`data-density="hard"`).
  - Implemented `Page` component with alternating left/right spine binding shadows (`.page.left`, `.page.right`) using subtle linear gradients (`rgba(60, 45, 20, 0.16)`).
* **Files/modules affected:** [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx), [`frontend/src/components/BookReader.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.css), [`frontend/package.json`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/package.json).
* **Frontend changes:** Complete 3D canvas flipbook component added.
* **Backend changes:** None.
* **Database changes:** None.
* **API changes:** None.
* **Dependencies/services added:** `react-pageflip` (^2.0.3).
* **Current status:** Implemented & Persisted.

### Responsive Viewport Calculation Hook (`usePageSize`)
* **First requested:** Phase 5.
* **Purpose:** Dynamically compute optimal book dimensions based on window geometry.
* **Implementation:** `computePageSize()` evaluates `window.innerWidth` and `window.innerHeight`.
  - If `vw < 800px`: switches to single-page portrait layout (`maxW = vw - 24`).
  - If `vw >= 800px`: switches to two-page spread (`maxW = Math.min(480, (vw - 80) / 2)`).
  - Aspect ratio maintained at 1:1.4 (`h = Math.floor(w * 1.4)`), constrained by screen height minus control bar (`vh - 150`).
  - Debounced at 250ms on window resize.
* **Files/modules affected:** [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx).
* **Frontend changes:** Viewport observation and reactive dimension updates.
* **Current status:** Implemented & Persisted.

### Binary-Search DOM Probe Pagination Engine (`paginate`)
* **First requested:** Phase 5.
* **Purpose:** Typeset arbitrary raw book text into pages that fit with zero text cut-off, zero line overflow, and no orphan text.
* **Implementation:**
  - `normalise(text)` collapses multiple whitespace and normalizes CRLF while preserving paragraph breaks.
  - Creates a hidden off-screen DOM element (`.page-text.probe`) matching exact page typography (`font: 17px/1.6 Georgia, serif`, width `w - PAD_X * 2`).
  - Calculates available height: `maxHeight = pageH - PAD_TOP - FOOTER - SAFETY` (where `PAD_TOP=36`, `FOOTER=28`, `SAFETY=6`).
  - Executes a binary search (`lo` to `hi`) over word tokens to find the exact maximum slice of words whose `probe.scrollHeight <= maxHeight`.
  - Removes probe and returns an array of string page chunks.
* **Files/modules affected:** [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx).
* **Frontend changes:** Client-side typesetting algorithm.
* **Current status:** Implemented & Persisted.

### Backend PyPDF Text Extraction & Delivery Endpoint (`/api/books/{id}/text`)
* **First requested:** Phase 5.
* **Purpose:** Extract digital text from uploaded book files and serve it to `BookReader`.
* **Implementation:**
  - Installed `pypdf` on the backend.
  - Created directory `backend/uploads/texts/`.
  - Built endpoint `GET /api/books/{book_id}/text` reading `uploads/texts/{book_id}.txt` and returning JSON `{"title": ..., "author": ..., "text": ...}`.
* **Files/modules affected:** [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py), [`backend/requirements.txt`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/requirements.txt).
* **Frontend changes:** Added `getBookText(id)` in `api.js`.
* **Backend changes:** Added text reading endpoint and file storage path.
* **Database changes:** None.
* **API changes:** New endpoint `/api/books/{id}/text`.
* **Dependencies/services added:** `pypdf`.
* **Current status:** Implemented & Persisted.

### Automatic Reading Progress Synchronization
* **First requested:** Phase 5.
* **Purpose:** Persist page progress back to the database as the user reads.
* **Implementation:**
  - `BookReader` triggers `onFlip` calling `onProgress({ page, total, percent })`.
  - `App.jsx` handles progress with a 1000ms debounce (`progressTimerRef`):
    - Calculates `pagesRead = Math.round(percent * activeBook.pages)`.
    - Updates reading status: if `percent >= 0.98`, sets `completed`; if `percent > 0`, sets `reading`.
    - Calls `api.updateBook(activeBook.id, { read: pagesRead, status })` updating SQLite.
* **Files/modules affected:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Frontend changes:** Real-time synchronization logic with debounced API dispatcher.
* **Backend changes:** Handled via existing `PUT /api/books/{id}`.
* **Current status:** Implemented & Persisted.

## Features Modified
* **Reading Interface:** Replaced original prototype `#reader` markup with `<BookReader />` component.
* **Drawer "Continue reading" button:** Changed from opening flat text to fetching `/api/books/{id}/text` and launching flipbook.

## Bugs Fixed
* **Critical Bug: React Hooks Ordering Violation in `App.jsx`:**
  - *Problem:* Vite crashed during hot reload with: `"Rendered fewer hooks than expected. This may be caused by an accidental early return statement."`
  - *Cause:* In `App.jsx`, `useCallback` (`handleProgress`) and `useRef` (`progressTimerRef`) were defined *after* the early return statement `if (!loggedIn) { return <Login />; }`. When `loggedIn` toggled between false and true, the total hook count changed, violating React's Rules of Hooks.
  - *Fix:* Reordered all React hooks (`useState`, `useCallback`, `useRef`, `useEffect`) to the very top of the `App` component before any conditional return statements.
  - *Files affected:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
  - *Impact:* Restored application stability and eliminated Vite hot-reload crashes.

## UI/UX Changes
* Stunning 3D book animation with page curling, realistic spine gradients, and tactile paper feel.
* Dedicated reader controls bar with "Previous page", page indicator ("Page X of Y"), and "Turn page" buttons.
* Dedicated "← Back" button to cleanly exit the reader and return to the Bookshelf.

## Backend / Architecture Changes
* Introduced text caching system storing extracted book plain text in `backend/uploads/texts/{book_id}.txt`.

## Database Changes
* None (utilized existing `pages`, `read`, and `status` columns).

## Dependencies / Integrations
* **Frontend:** Added `react-pageflip` (^2.0.3).
* **Backend:** Added `pypdf`, `python-multipart`.

## Testing / Validation
* Built test script [`backend/test_features.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/test_features.py) verifying book creation, text retrieval, and progress updating.
* Tested responsive resizing switching from double-page to single-page mode below 800px.

## End State
A realistic 3D paper page-turning reader integrated seamlessly with React state, SQLite persistence, and responsive viewport sizing.

---

# Phase 6 — Scanned PDF Diagnostics & Cover Box Typography Clamping

## Objective
Diagnose digital text extraction failures on scanned raster document PDFs, establish system limitations regarding optical character recognition (OCR), and refine typography box-clamping across book cards, covers, and metadata headers to prevent visual overflow.

## Starting State
Users could upload files and view them in the reader, but long titles caused cover cards to expand irregularly, overflowing their visual bounds. Uploading scanned image-only PDFs resulted in a blank reader with an extraction error.

## Requests / Requirements
* **User Diagnostic Inquiry (2026-09-24 19:34:12):**
  > *"this is what it is showing when i upload an book and try to add it to my library"*
  *(Accompanied by screenshot of text extraction failure on a scanned document).*
* **User UI Request (2026-09-24 19:40:18):**
  > *"fix all the ui font and make it fit the appropriate box that has be given to it"*
* **Priority / Importance:** Medium (Polishing & Robustness). Necessary to ensure visual perfection across arbitrary user-supplied book titles.

## Features Added

### CSS Multiline Box-Clamping & Ellipsis Truncation
* **First requested:** Phase 6 (Step 300, 2026-09-24 19:40:18).
* **Purpose:** Prevent long book titles or author names from stretching cards, breaking grid alignment, or overflowing book covers.
* **Implementation:** Updated [`frontend/src/index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css):
  - `.cover-title`: Set font size to `14px`, line-height `1.25`, and applied `-webkit-box` with `-webkit-line-clamp: 5` and `-webkit-box-orient: vertical`, clipping overflow with ellipsis.
  - `.cover-author`: Single-line truncation with `white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis`.
  - `.book-meta .t`: Applied `-webkit-line-clamp: 2`, `line-height: 1.3`, preventing shelf cards from growing vertically.
  - `.book-meta .a`: Enforced single-line ellipsis truncation.
* **Files/modules affected:** [`frontend/src/index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css).
* **Frontend changes:** CSS flexbox/clamping updates.
* **Current status:** Implemented & Persisted.

### Scanned Document & OCR Diagnostic Guidance
* **First requested:** Phase 6.
* **Purpose:** Clarify system capabilities regarding native digital PDF text vs. scanned image-only PDFs.
* **Implementation:** Documented engine boundary: `pypdf` reads vector font text streams. Image-based scanned books require an external OCR pipeline (such as Tesseract OCR), which is not part of the lightweight local architecture. Added clear feedback explaining this boundary.
* **Files/modules affected:** System documentation and error handling logs.
* **Current status:** Documented limitation.

## Features Modified
* **Cover Card Typography:** Replaced unconstrained flowing text with bounded, clamped typography.

## Bugs Fixed
* **Issue:** Card title overflow caused book covers to stretch out of their 2:3 aspect ratio grid slots when titles exceeded 4 words.
  - *Cause:* Lack of vertical clamping and ellipsis overflow rules in CSS.
  - *Fix:* Added `-webkit-line-clamp` properties and strict aspect-ratio containment.
  - *Files affected:** [`frontend/src/index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css).
  - *Impact:* Perfectly uniform bookshelf grid regardless of title length.

## UI/UX Changes
* Consistent card geometry across all books.
* Beautifully truncated titles on book covers with subtle text shadow.

## Backend / Architecture Changes
* None.

## Database Changes
* None.

## Dependencies / Integrations
* None.

## Testing / Validation
* Verified cards with extra-long titles (e.g., *Harry Potter and the Philosopher's Stone (Released as Harry Potter and the Sorcerer's Stone in the US)*) stay strictly inside the 2:3 cover boundary without spilling into neighboring cards.

## End State
A polished, resilient grid layout maintaining uniform geometry across varied titles, with established diagnostic clarity on scanned PDF documents.

---

# Phase 7 — Hardened PDF-Only Upload Pipeline & File System Security

## Objective
Implement an enterprise-grade, secure, PDF-exclusive upload and storage pipeline with dual-layer validation (client and server), magic-byte file signature verification, streaming size enforcement, path-traversal prevention via UUID sanitization, metadata auto-detection, protected file download routes, disk-level cleanup upon book deletion, and full regression test coverage.

## Starting State
The book upload dialog was a basic form with primitive client-side checks and no persistent storage of uploaded PDF files on disk (only text files were stored).

## Requests / Requirements
* **User Specification (2026-09-24 19:51:35 & 19:57:26):**
  - **Upload Format:** Accept PDF files ONLY, strictly enforced on both frontend and backend.
  - **Frontend Requirements:**
    - `accept="application/pdf,.pdf"` on file input.
    - Client-side validation: `file.type === "application/pdf"` AND filename ends with `.pdf` (case-insensitive).
    - Max size 25MB constant (`MAX_FILE_SIZE_MB = 25`).
    - Inline error banner (e.g. *"Only PDF files are allowed"*), aborting network request if invalid.
    - Drag-and-drop zone and click-to-browse support.
    - `FormData` transmission with upload progress percentage bar.
    - Submit button disabled with loading spinner while uploading.
    - Automatic Bookshelf refresh upon successful upload.
  - **Backend Requirements:**
    - `POST /books/upload` accepting `UploadFile = File(...)` and form metadata using `python-multipart`.
    - Server-side validation: extension `.pdf`, content-type `application/pdf`, magic bytes check (`b"%PDF-"`), max size 25MB streaming limit returning HTTP 413.
    - File storage: Save to `uploads/pdfs/` under generated UUID filenames (e.g. `uuid.uuid4().hex + ".pdf"`), never using user filenames to prevent path traversal attacks.
    - Auto-detect `total_pages` using `pypdf`. Auto-extract `title` and `author` from PDF metadata with fallback to filename without extension.
    - Reject encrypted or corrupt PDFs with HTTP 400 and delete any written disk file immediately.
    - Enforce user authentication (`Depends(get_current_user)`).
  - **Database Requirements:**
    - Extend `books` table with: `file_path TEXT`, `original_filename TEXT`, `file_size INTEGER`, `uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`, `user_id INTEGER DEFAULT 1`.
    - Provide a safe migration (`ALTER TABLE ADD COLUMN`).
  - **Storage & Endpoints:**
    - `GET /books/{id}/file` returning `FileResponse` to owners only.
    - `DELETE /books/{id}` deletes both the PDF and text files from disk.
* **Priority / Importance:** Critical (Security & Production Readiness). Protects the server against arbitrary file upload exploits, path traversal, denial of service, and orphaned disk storage.

## Features Added

### Modern Drag-and-Drop PDF Upload Component (`UploadModal.jsx`)
* **First requested:** Phase 7 (Step 317, 2026-09-24 19:51:35).
* **Purpose:** Provide an intuitive, accessible modal for uploading PDFs with live drag-and-drop state, instant feedback, and inline validation.
* **Implementation:** Created [`frontend/src/components/UploadModal.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/UploadModal.jsx) (398 lines):
  - Constants: `MAX_FILE_SIZE_MB = 25`, `MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024`.
  - Drag-and-drop event handlers: `onDragOver`, `onDragLeave`, `onDrop` with dynamic `.drag-active` visual feedback.
  - Client-side validation: checks both `file.type === "application/pdf"` and case-insensitive `.pdf` extension.
  - Inline error alert banner styled with burgundy border and warning icon (`⚠️`).
  - Progress bar indicator showing real-time upload percentage (`0%` to `100%`) powered by `XMLHttpRequest.upload.onprogress`.
  - Form fields for Title, Author (auto-filled from filename without extension), multi-genre pill selector, and total pages.
  - Accessible keyboard close and click-outside backdrop dismissal.
* **Files/modules affected:** [`frontend/src/components/UploadModal.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/UploadModal.jsx), [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx), [`frontend/src/index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css).
* **Frontend changes:** New modal component replacing old in-place inputs.
* **Current status:** Implemented & Persisted.

### Enhanced API Client with Upload Progress (`api.js`)
* **First requested:** Phase 7.
* **Purpose:** Support multipart form-data transmission and real-time progress callbacks.
* **Implementation:** Updated [`frontend/src/api.js`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/api.js):
  - Created `uploadBook(formData, onProgress)` wrapping an `XMLHttpRequest` to capture `xhr.upload.onprogress`.
  - Attached `Authorization: Bearer reader-token` to all requests.
  - Added `getBookFileUrl(id)` returning `${API_URL}/books/${id}/file`.
* **Files/modules affected:** [`frontend/src/api.js`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/api.js).
* **Frontend changes:** XHR promise wrapper with progress events.
* **Current status:** Implemented & Persisted.

### Multi-Layer Server-Side PDF Security & Ingestion Engine (`main.py`)
* **First requested:** Phase 7.
* **Purpose:** Validate, sanitize, and store PDF files securely on the server.
* **Implementation:** Re-engineered `POST /books/upload` and `POST /api/books/upload` in [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py):
  1. **Extension Check:** Ensures `filename.lower().endswith(".pdf")` (returns 400).
  2. **Content-Type Check:** Ensures `content_type.startswith("application/pdf")` (returns 415).
  3. **Path Traversal Prevention:** Never uses original filename on disk; saves file as `uuid.uuid4().hex + ".pdf"` inside `backend/uploads/pdfs/`.
  4. **Magic Byte Signature Verification:** Inspects the first 64KB chunk to ensure it begins with `b"%PDF-"`. If invalid, immediately closes and removes the disk file and returns HTTP 400.
  5. **Streaming Chunk Size Enforcement:** Streams file in 64KB chunks (`CHUNK_SIZE = 65536`). If cumulative bytes exceed 25MB, immediately closes and deletes the partial file and returns HTTP 413.
  6. **PyPDF Structural Integrity & Encryption Check:** Opens file with `pypdf.PdfReader`. If encrypted and cannot be decrypted with an empty password, rejects with HTTP 400 and deletes the file. If page count <= 0 or file is corrupt, rejects with HTTP 400 and deletes the file.
  7. **Metadata & Fallback Extraction:** Extracts embedded PDF `/Title` and `/Author`. If blank, falls back to form input, and then to filename without extension. Auto-detects total page count from `len(reader.pages)`.
  8. **Text Extraction:** Iterates through pages, extracts text, and caches it to `backend/uploads/texts/{book_id}.txt` for the 3D flipbook reader.
  9. **Cover Discovery:** Queries Google Books API for cover art.
  10. **Database Record:** Inserts complete record into `books` including `file_path`, `original_filename`, `file_size`, and `user_id`.
* **Files/modules affected:** [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Backend changes:** Comprehensive file handling pipeline.
* **Database changes:** Saves file path and size.
* **Current status:** Implemented & Persisted.

### Secure Protected File Download Endpoint (`GET /books/{id}/file`)
* **First requested:** Phase 7.
* **Purpose:** Serve stored original PDF files to authenticated owners for browser viewing or offline download.
* **Implementation:** Built `GET /books/{book_id}/file` and `GET /api/books/{book_id}/file` in [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py):
  - Validates authentication (`Depends(get_current_user)`).
  - Verifies ownership: returns HTTP 403 if `book["user_id"] != current_user["id"]`.
  - Verifies physical file existence on disk: returns HTTP 404 if missing.
  - Returns `FileResponse` with `media_type="application/pdf"` and content-disposition header preserving `original_filename`.
  - Added "Download / View PDF" link in the book detail drawer in [`App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Files/modules affected:** [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py), [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Current status:** Implemented & Persisted.

### Disk Garbage Collection on Book Deletion
* **First requested:** Phase 7.
* **Purpose:** Prevent orphaned files from consuming server storage when a book is deleted.
* **Implementation:** Updated `DELETE /books/{book_id}` in [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py):
  - Verifies book ownership.
  - Checks if `file_path` exists on disk and calls `os.remove(file_path)`.
  - Checks if cached text file `uploads/texts/{book_id}.txt` exists on disk and calls `os.remove(text_path)`.
  - Deletes database row from `books`.
* **Files/modules affected:** [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Current status:** Implemented & Persisted.

### Safe SQLite Schema Migration (`migrate_upload.py`)
* **First requested:** Phase 7.
* **Purpose:** Safely extend the `books` table without losing existing book data.
* **Implementation:** Created [`backend/migrate_upload.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/migrate_upload.py).
  - Inspects `PRAGMA table_info(books)` to prevent duplicate column errors.
  - Adds `file_path TEXT`, `original_filename TEXT`, `file_size INTEGER`, `uploaded_at TIMESTAMP`, and `user_id INTEGER DEFAULT 1`.
  - Updated [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py) to incorporate these migration checks inside `init_db()`.
* **Files/modules affected:** [`backend/migrate_upload.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/migrate_upload.py), [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py).
* **Database changes:** Added 5 new columns to `books` table.
* **Current status:** Implemented & Persisted.

### Comprehensive Automated Test Suite (`test_pdf_upload.py`)
* **First requested:** Phase 7.
* **Purpose:** Formally verify all security constraints and functional requirements across 10 distinct test scenarios.
* **Implementation:** Created [`backend/test_pdf_upload.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/test_pdf_upload.py) using `fastapi.testclient.TestClient`:
  1. `test_unauthenticated_upload`: verifies 401 when auth header is missing.
  2. `test_txt_file_rejection`: verifies 400/415 when `.txt` is uploaded.
  3. `test_jpg_renamed_to_pdf_rejection`: uploads fake JPEG payload named `.pdf`; verifies magic bytes check returns 400.
  4. `test_oversized_pdf_rejection`: uploads 25.1MB payload starting with `%PDF-`; verifies 413 payload too large.
  5. `test_corrupt_pdf_rejection`: uploads corrupted PDF; verifies 400 invalid PDF.
  6. `test_valid_pdf_upload_and_flow`: uploads real valid PDF; verifies 200, metadata storage, and disk file creation.
  7. `test_get_file_owner`: verifies owner retrieves file with 200.
  8. `test_get_file_forbidden`: verifies non-owner receives 403 Forbidden.
  9. `test_delete_cleans_up_disk`: deletes book; verifies physical PDF is erased from disk.
  10. `test_metadata_fallback`: verifies embedded metadata is read when fields are blank.
  **Result:** All 10 tests passed with 100% success rate.
* **Files/modules affected:** [`backend/test_pdf_upload.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/test_pdf_upload.py).
* **Current status:** Implemented & Persisted.

## Features Modified
* **Upload Modal:** Replaced primitive modal with full-featured drag-and-drop dialog with progress bar and inline error handling.
* **Delete Action:** Extended from pure SQL deletion to atomic storage + SQL deletion.
* **Drawer Detail View:** Added "Download / View PDF" action button for books with stored files.

## Bugs Fixed
* **Bug: SQLite Syntax Error on `ALTER TABLE ADD COLUMN ... DEFAULT CURRENT_TIMESTAMP`:**
  - *Problem:* Running `migrate_upload.py` failed with: `sqlite3.OperationalError: Cannot add a column with non-constant default`.
  - *Cause:* SQLite's SQL standard compliance restricts `ALTER TABLE ADD COLUMN` from using dynamic expressions like `CURRENT_TIMESTAMP` as column defaults.
  - *Fix:* Altered column simply as `uploaded_at TIMESTAMP` without a default, and executed a secondary query: `UPDATE books SET uploaded_at = CURRENT_TIMESTAMP WHERE uploaded_at IS NULL;`.
  - *Files affected:** [`backend/migrate_upload.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/migrate_upload.py), [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py).
  - *Impact:* Migration executed smoothly with zero downtime and preserved existing Harry Potter book rows.

## UI/UX Changes
* Drag-and-drop dropzone with highlighted dash border upon file drag.
* Live percentage progress bar during file upload.
* Inline danger banners for invalid files.
* Direct link to view or download original PDF in the detail drawer.

## Backend / Architecture Changes
* Introduced dedicated physical storage directory `backend/uploads/pdfs/` with UUID-based file isolation.
* Implemented HTTP Bearer authentication dependency `get_current_user` in `main.py`.

## Database Changes
* Updated `books` table schema:
  - `file_path TEXT`
  - `original_filename TEXT`
  - `file_size INTEGER`
  - `uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
  - `user_id INTEGER DEFAULT 1`
* Created `users` table:
  - `id INTEGER PRIMARY KEY AUTOINCREMENT`
  - `email TEXT NOT NULL UNIQUE`
  - `username TEXT NOT NULL`
  - Seeded default user (`id=1`, `email='reader@example.com'`, `username='Reader'`).

## Dependencies / Integrations
* Verified existing backend packages: `fastapi`, `uvicorn`, `pydantic`, `python-multipart`, `pypdf`.

## Testing / Validation
* Executed [`backend/test_pdf_upload.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/test_pdf_upload.py): 10/10 tests passed.
* Executed end-to-end browser subagent session: uploaded sample PDF book into the live UI; verified that book card appeared on bookshelf, opened in detail drawer, and downloaded correctly. Recording preserved as `verify_pdf_upload_1790260889616.webp`.

## End State
A robust, secure, production-grade personal library web application with strict PDF validation, physical 3D paper page-turning, Google Books cover integration, and complete lifecycle disk storage management.

---

# 3. Master Feature History

The following consolidated matrix traces the inception, functional progression, and current operational location of every major feature across the project's development history:

| Feature | First Introduced | Original Purpose | Major Changes | Current Status | Current Location |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Literary Aesthetic & Theme** | Phase 0 | Provide a warm paper-and-ink visual aesthetic with Fraunces & Inter fonts | Preserved exactly from HTML into CSS variables; refined with box clamping in Phase 6 | Active / Preserved | [`frontend/src/index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css) |
| **User Authentication View** | Phase 0 | Mock gatekeeper screen to enter the app | Converted from DOM toggle to stateful React screen; added Bearer token headers in Phase 7 | Active | [`frontend/src/App.jsx#L108-L122`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) |
| **Multi-View Navigation Shell** | Phase 0 | Switch between Shelf, Wishlist, Highlights, and Series | Converted from DOM `.classList` toggling to React `view` state in `App.jsx` | Active | [`frontend/src/App.jsx#L337-L352`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) |
| **Bookshelf Grid & Filters** | Phase 0 | Display books with status tabs, search, genre filter, and sort | Added multi-genre token matching (Phase 2), dynamic cover art (Phase 3), text clamping (Phase 6) | Active | [`frontend/src/App.jsx#L174-L217`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) |
| **Book Detail Drawer** | Phase 0 | Slide-out panel for book actions and progress review | Converted to React; added rating updater, "Continue reading", and "Download / View PDF" (Phase 7) | Active | [`frontend/src/App.jsx#L271-L311`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) |
| **Star Rating System** | Phase 0 | Rate books from 1 to 5 stars | Hooked to `PUT /api/books/{id}` in backend; persisted in SQLite database | Active | [`frontend/src/App.jsx#L28-L38`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) |
| **Wishlist Management** | Phase 0 | Track books to purchase or read later | Backed by SQLite table; connected to Google Books cover discovery; move-to-library action | Active | [`frontend/src/App.jsx#L219-L236`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx), [`backend/main.py#L365-L394`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) |
| **Highlights & Quotes** | Phase 0 | Display memorable passages with colored side borders | Backed by SQLite `highlights` table; queried via REST API | Active | [`frontend/src/App.jsx#L238-L250`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx), [`backend/main.py#L398-L405`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) |
| **Series & Shelves** | Phase 0 | Group books into curated collections | Backed by SQLite `series` table; queried via REST API | Active | [`frontend/src/App.jsx#L252-L269`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx), [`backend/main.py#L409-L416`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) |
| **FastAPI REST Backend** | Phase 1 | Serve data and handle CRUD operations over HTTP | Expanded from basic CRUD to include multipart PDF ingestion, PyPDF metadata, and secure file streaming | Active | [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) |
| **SQLite3 Persistence Layer** | Phase 1 | Store book objects on disk | Wiped mock seeds (Phase 2), added `cover_url` (Phase 3), added file path/size/timestamps/users (Phase 7) | Active | [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py), [`backend/library.db`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/library.db) |
| **Multi-Genre Pill Selector** | Phase 2 | Allow books to belong to multiple genres simultaneously | Replaced single text field with interactive pill cloud; formats into comma-separated tags | Active | [`frontend/src/components/UploadModal.jsx#L309-L338`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/UploadModal.jsx) |
| **Google Books Cover Discovery** | Phase 3 | Automatically fetch official book cover thumbnail images | Added `fetch_cover_url()` in FastAPI; updated frontend `Cover` component to render real image with spine | Active | [`backend/main.py#L49-L64`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py), [`frontend/src/App.jsx#L9-L26`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) |
| **Multi-Modal Page Turn Controls** | Phase 4 | Enable turning pages via buttons, keyboard, and touch | Initially added to flat reader overlay; later integrated into `BookReader.jsx` flipbook engine | Active | [`frontend/src/components/BookReader.jsx#L171-L182`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx) |
| **Realistic 3D Page-Flip Reader** | Phase 5 | Display book text on realistic paper pages with physical curling | Replaced flat overlay with `react-pageflip`; added binary-search DOM probe pagination and auto-progress sync | Active | [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx), [`frontend/src/components/BookReader.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.css) |
| **Progress Auto-Synchronization** | Phase 5 | Automatically save reading progress back to database | Debounced 1000ms sync calling `updateBook()`; auto-marks status as `completed` at >= 98% | Active | [`frontend/src/App.jsx#L82-L93`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) |
| **PDF-Exclusive Upload Modal** | Phase 7 | Restrict uploads to valid PDF documents with drag & drop | Built `UploadModal.jsx` with drag states, 25MB limit, XHR progress bar, and inline alerts | Active | [`frontend/src/components/UploadModal.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/UploadModal.jsx) |
| **Magic-Byte Signature Check** | Phase 7 | Prevent renamed malicious files from executing | Backend reads initial 64KB chunk verifying `b"%PDF-"` header; deletes invalid files | Active | [`backend/main.py#L147-L154`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) |
| **Path Traversal Shield & UUID Storage** | Phase 7 | Prevent malicious directory escape via crafted filenames | Generates unique UUID v4 filename for storage in `backend/uploads/pdfs/` | Active | [`backend/main.py#L126-L127`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) |
| **Protected File Retrieval Route** | Phase 7 | Allow owner to stream original PDF file | Added `GET /books/{id}/file` enforcing bearer/owner authorization and returning `FileResponse` | Active | [`backend/main.py#L251-L273`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) |
| **Disk Garbage Collection on Deletion**| Phase 7 | Erase physical PDF and text files when book is deleted | Enhanced `DELETE /books/{id}` to clean up disk storage atomically before deleting SQL row | Active | [`backend/main.py#L342-L357`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) |

---

# 4. Master Chronological Changelog

The following changelog lists every discrete engineering modification across all phases in chronological order:

| Order | Phase | Change Description | Type | Affected Area | Status |
| :---: | :---: | :--- | :--- | :--- | :--- |
| **01** | Phase 0 | Created standalone prototype with HTML5, CSS3, and vanilla JS | UI / Feature | [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) | Replaced |
| **02** | Phase 0 | Established literary aesthetic color palette, fonts (`Fraunces`, `Inter`), spine shadows | UI / Design | [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) | Preserved |
| **03** | Phase 0 | Implemented in-memory mock datasets (8 books, 3 wishlist, 3 highlights, 3 series) | Database | [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html) | Deprecated |
| **04** | Phase 1 | Scaffolded Vite React single-page application in `frontend/` | Refactor | `frontend/` | Active |
| **05** | Phase 1 | Created SQLite3 database connection manager and schema initializer | Database | [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py) | Active |
| **06** | Phase 1 | Created Pydantic request/response models for books, wishlist, highlights, series | API / Refactor | [`backend/models.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/models.py) | Active |
| **07** | Phase 1 | Built FastAPI backend service with REST CRUD endpoints and CORS middleware | Backend / API | [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) | Active |
| **08** | Phase 1 | Transferred CSS from prototype into `frontend/src/index.css` with zero styling changes | UI / Style | [`frontend/src/index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css) | Active |
| **09** | Phase 1 | Built React state shell in `App.jsx` and network client in `api.js` | Frontend | [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) | Active |
| **10** | Phase 2 | Removed hardcoded dummy data auto-seeding to ensure empty starting state | Database | [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py) | Active |
| **11** | Phase 2 | Implemented 10MB file limit check on book upload | Feature | [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) | Replaced |
| **12** | Phase 2 | Added multi-select genre pill cloud allowing multiple genres per book | UI / UX | [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) | Active |
| **13** | Phase 2 | Updated bookshelf filtering to support comma-separated multi-genre tokens | Feature | [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) | Active |
| **14** | Phase 3 | Injected all 7 canonical Harry Potter books into database via `seed_hp.py` | Database | [`backend/seed_hp.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/seed_hp.py) | Active |
| **15** | Phase 3 | Added `cover_url TEXT` column migration to `books` and `wishlist` tables | Database | [`backend/migrate.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/migrate.py) | Active |
| **16** | Phase 3 | Integrated Google Books API to automatically resolve book cover thumbnail URLs | Integration | [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) | Active |
| **17** | Phase 3 | Built `backfill_covers.py` to populate cover artwork for pre-existing book rows | Enhancement | [`backend/backfill_covers.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/backfill_covers.py) | Active |
| **18** | Phase 3 | Updated `Cover` component to render real image with spine overlay and fallback | UI / Component | [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) | Active |
| **19** | Phase 4 | Added on-screen floating page-turn arrow buttons (`‹` and `›`) | UI / UX | [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) | Replaced |
| **20** | Phase 4 | Added keyboard left/right arrow key navigation listener | UX / Feature | [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) | Active |
| **21** | Phase 4 | Added touch swipe delta detection for mobile viewports | UX / Mobile | [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) | Replaced |
| **22** | Phase 5 | Installed `react-pageflip`, `pypdf`, and `python-multipart` packages | Dependency | `frontend/`, `backend/` | Active |
| **23** | Phase 5 | Built `BookReader.jsx` with realistic 3D paper curling, shadows, and page numbers | Feature / UI | [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx) | Active |
| **24** | Phase 5 | Built `BookReader.css` with physical paper colors, spine shading, and responsive rules | UI / Style | [`frontend/src/components/BookReader.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.css) | Active |
| **25** | Phase 5 | Implemented binary-search DOM probe typesetting algorithm (`paginate()`) | Performance | [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx) | Active |
| **26** | Phase 5 | Implemented responsive `usePageSize` hook (single-page mobile, double-page desktop) | UX / Responsive | [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx) | Active |
| **27** | Phase 5 | Added backend plain text caching (`uploads/texts/`) and `GET /api/books/{id}/text` route | Backend / API | [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) | Active |
| **28** | Phase 5 | Implemented debounced auto-sync of reading progress back to SQLite database | Feature | [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) | Active |
| **29** | Phase 5 | Fixed React Hook ordering violation crash caused by hooks below conditional return | Bug Fix | [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx) | Active |
| **30** | Phase 6 | Diagnosed digital vs. raster scanned PDF limitations in text extraction engine | Documentation | Backend / Engine | Active |
| **31** | Phase 6 | Applied CSS line-clamping and ellipsis overflow to cover titles and metadata cards | UI / Bug Fix | [`frontend/src/index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css) | Active |
| **32** | Phase 7 | Built `UploadModal.jsx` with drag-and-drop, PDF validation, and upload progress | Component / UI | [`frontend/src/components/UploadModal.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/UploadModal.jsx) | Active |
| **33** | Phase 7 | Re-engineered `POST /books/upload` with magic bytes (`%PDF-`), 25MB limit, UUID filenames | Security / API | [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) | Active |
| **34** | Phase 7 | Resolved SQLite `ALTER TABLE ADD COLUMN ... DEFAULT CURRENT_TIMESTAMP` syntax error | Database / Fix | [`backend/migrate_upload.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/migrate_upload.py) | Active |
| **35** | Phase 7 | Extended `books` schema: `file_path`, `original_filename`, `file_size`, `uploaded_at`, `user_id` | Database | [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py) | Active |
| **36** | Phase 7 | Added `users` table and authenticated user resolution dependency (`get_current_user`) | Security / Auth | [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py), [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) | Active |
| **37** | Phase 7 | Created protected `GET /books/{id}/file` route for owner-only PDF streaming | Security / API | [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) | Active |
| **38** | Phase 7 | Updated `DELETE /books/{id}` to remove physical PDF and text files from filesystem | Storage / Clean | [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py) | Active |
| **39** | Phase 7 | Built and passed 10 automated unit/integration tests in `test_pdf_upload.py` | Testing | [`backend/test_pdf_upload.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/test_pdf_upload.py) | Active |
| **40** | Phase 7 | Executed end-to-end browser subagent verification of PDF upload and reading | QA / Validation | Browser Subagent | Active |

---

# 5. Technical Architecture Evolution

## 5.1 Initial Prototype Architecture
The application began as a self-contained, monolithic single-file prototype ([`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html)). All visual styles, presentation markup, state structures, mock datasets, and business logic existed in a single 26KB file executed entirely in-browser.

```
+-----------------------------------------------------------------------+
|                       MONOLITHIC WEB BROWSER                          |
|                                                                       |
|  +---------------------+   +---------------------+   +-------------+  |
|  | Embedded HTML5 DOM  |   | Embedded CSS Rules  |   | Vanilla JS  |  |
|  | (#login, #app,      |---| (:root, .grid,      |---| (books[],   |  |
|  |  #drawer, #reader)  |   |  .cover, .drawer)   |   |  filter())  |  |
|  +---------------------+   +---------------------+   +-------------+  |
|                                     |                                 |
|                                     v                                 |
|                       Volatile In-Memory Variables                    |
|                        (Lost on Page Refresh)                         |
+-----------------------------------------------------------------------+
```

## 5.2 Intermediate Full-Stack Architecture
In Phase 1, the architecture was transformed into a decoupled client-server model. The frontend was extracted into a Vite React Single Page Application (SPA), while the backend became a Python FastAPI service backed by an embedded SQLite3 relational database (`library.db`).

```
+---------------------------+             +---------------------------+
|      REACT 19 (VITE)      |   HTTP/JSON |       FASTAPI (PYTHON)    |
|   (http://localhost:5173) | <=========> |   (http://localhost:8000) |
|                           |  REST API   |                           |
| - App.jsx (Root State)    |             | - main.py (REST Routes)   |
| - api.js (Fetch Utility)  |             | - models.py (Pydantic v2) |
| - index.css (Exact CSS)   |             | - database.py (SQLite)    |
+---------------------------+             +---------------------------+
                                                        |
                                                        v
                                          +---------------------------+
                                          |    SQLITE3 (library.db)   |
                                          | books, wishlist,          |
                                          | highlights, series        |
                                          +---------------------------+
```

## 5.3 Current Production Architecture
By Phase 7, the architecture evolved into a hardened, multi-tier system with binary stream ingestion, client/server file validation, external cloud cover integration (Google Books API), isolated file system storage (`uploads/pdfs/`, `uploads/texts/`), a 3D canvas physics flipbook engine (`HTMLFlipBook`), and automated disk garbage collection.

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|                             React 19 + Vite 8 SPA                                 |
|                                                                                   |
|  +-------------------------------------+   +-----------------------------------+  |
|  |            App.jsx Shell            |   |         UploadModal.jsx           |  |
|  | - Bookshelf, Wishlist, Highlights   |   | - Drag & Drop / File Input        |  |
|  | - Multi-genre Token Filtering       |   | - Client Validation (.pdf & 25MB) |  |
|  | - Drawer & Reading View Trigger     |   | - XHR Upload Progress Bar         |  |
|  +-------------------------------------+   +-----------------------------------+  |
|                    |                                         |                    |
|                    v                                         v                    |
|  +-------------------------------------+   +-----------------------------------+  |
|  |           BookReader.jsx            |   |              api.js               |  |
|  | - HTMLFlipBook 3D Animation         |   | - uploadBook() (Progress XHR)     |  |
|  | - Responsive usePageSize Hook       |   | - getBookFileUrl(), getBookText() |  |
|  | - DOM-Probe Binary Search Paginate  |   | - updateBook() Debounced Sync     |  |
|  +-------------------------------------+   +-----------------------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
                       HTTP / REST API (Bearer Token / JSON / FormData)
                                         v
+-----------------------------------------------------------------------------------+
|                                  SERVER LAYER                                     |
|                           FastAPI (Python 3.13)                                   |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                               main.py                                       |  |
|  | - Security: get_current_user Dependency (Bearer Token / X-User-Id)          |  |
|  | - Validation: Magic Bytes Check (%PDF-), 25MB Streaming Chunks, Extension   |  |
|  | - Ingestion: UUID Filename Storage, PyPDF Metadata & Text Extraction        |  |
|  | - Delivery: GET /books/{id}/file (FileResponse) & GET /books/{id}/text      |  |
|  | - Cleanup: DELETE /books/{id} (Disk PDF + Text + SQLite Row)                |  |
|  +-----------------------------------------------------------------------------+  |
|         |                                      |                          |       |
|         v                                      v                          v       |
|  +--------------+                      +---------------+          +---------------+
|  |  models.py   |                      |  database.py  |          | Google Books  |
|  | (Pydantic v2)|                      |  (SQLite3 DB) |          | (Volumes API) |
|  +--------------+                      +---------------+          +---------------+
+-----------------------------------------------------------------------------------+
         |                                       |                          |
         v                                       v                          v
+------------------+                   +--------------------+       +---------------+
|   FILE STORAGE   |                   |    DATABASE        |       | Remote Image  |
| backend/uploads/ |                   | backend/library.db |       |   Cover CDN   |
| - pdfs/*.pdf     |                   | - books            |       +---------------+
| - texts/*.txt    |                   | - wishlist         |
+------------------+                   | - highlights       |
                                       | - series           |
                                       | - users            |
                                       +--------------------+
```

## 5.4 Major Architectural Decisions & Trade-Off Analysis

### Decision 1: Scaffolding Vite + React Instead of Retaining Vanilla JavaScript
* **What changed:** Migrated from a single HTML file with global mutable state arrays into a modular Vite React component application.
* **Why it was changed:** User explicitly commanded: *"scale it to react js,fast api , sql lite 3"*. A component-driven framework was necessary to handle complex state (e.g. real-time search, multi-genre tag arrays, debounced progress saving, 3D flipbook canvas).
* **Alternatives considered:** Vanilla JS with ES modules. Rejected because it failed the user's explicit React specification and would require complex manual DOM reconciliation.
* **Affected components:** Entire frontend layer (`App.jsx`, `api.js`, `index.html`, `package.json`).
* **Current status:** Active and foundational.

### Decision 2: Zero-CSS-Framework Policy (Vanilla CSS Migration)
* **What changed:** Maintained the exact custom CSS rules from the prototype in [`frontend/src/index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css) without introducing Tailwind CSS or component libraries like Material UI.
* **Why it was changed:** Strict user instruction: *"dont change anything in that [UI]"*. Using an opinionated CSS framework would risk subtle font size changes, margin collapses, or color shifts.
* **Alternatives considered:** Tailwind CSS or styled-components. Rejected to guarantee zero visual divergence.
* **Affected components:** All styling tokens and classes.
* **Current status:** Active and preserved.

### Decision 3: Client-Side DOM Probe Pagination with Binary Search
* **What changed:** Split book text into visual pages on the client using a hidden DOM probe element (`.page-text.probe`) measured via binary search, rather than computing static character splits on the server.
* **Why it was changed:** Font metrics, line wraps, letter-spacing, and text heights vary based on user screen width, operating system font rendering, and viewport resize events. Measuring real DOM `scrollHeight` guarantees that no text ever overflows into the footer or cuts off mid-sentence.
* **Alternatives considered:** Server-side fixed-character pagination (e.g. 500 characters per page). Rejected because it causes massive visual overflows on small screens and awkward half-empty pages on desktop.
* **Affected components:** [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx).
* **Current status:** Active and operating reliably.

### Decision 4: UUID-Based File Sanitization on Physical Storage
* **What changed:** When saving uploaded PDF files to `backend/uploads/pdfs/`, the server completely discards the client-provided filename and generates a 32-character hexadecimal UUID (`uuid.uuid4().hex + ".pdf"`).
* **Why it was changed:** Prevents directory traversal attacks (e.g. `../../etc/passwd` or `..\..\Windows\System32`), file overwrite collisions between different users uploading files with identical names (e.g. `document.pdf`), and Windows/Linux filesystem encoding conflicts.
* **Alternatives considered:** Sanitizing the user's filename with regex. Rejected because UUID hashing is mathematically immune to path manipulation. The original human-readable filename is safely retained in the `original_filename` database column for download headers.
* **Affected components:** [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Current status:** Active and enforced.

### Decision 5: Two-Phase SQLite Timestamp Migration Strategy
* **What changed:** Migrated `books` table using a nullable `uploaded_at TIMESTAMP` column followed by a data backfill (`UPDATE books SET uploaded_at = CURRENT_TIMESTAMP WHERE uploaded_at IS NULL`), rather than `ALTER TABLE books ADD COLUMN uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`.
* **Why it was changed:** SQLite's syntax specification explicitly prohibits adding a column with a non-constant default value (such as `CURRENT_TIMESTAMP`) via `ALTER TABLE`.
* **Alternatives considered:** Dropping and recreating the `books` table. Rejected because it would destroy all existing user books (including the seeded *Harry Potter* collection).
* **Affected components:** [`backend/migrate_upload.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/migrate_upload.py), [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py).
* **Current status:** Active.

---

## 5.5 System Architecture Diagrams

### High-Level Data Flow Architecture (Mermaid)

```mermaid
graph TD
    User([User]) -->|Interacts| UI[React 19 Frontend SPA]
    
    subgraph Frontend [Frontend: http://localhost:5173]
        UI -->|Browse & Filter| Shelf[Bookshelf View]
        UI -->|Upload PDF| Modal[UploadModal.jsx]
        UI -->|Read Book| Reader[BookReader.jsx 3D Flipbook]
        UI -->|Manage| Drawer[Detail Drawer]
        Modal -->|Client Validation & Progress| API_Client[api.js Client]
        Reader -->|Debounced Progress Sync| API_Client
    end
    
    API_Client ==>|HTTP REST / Bearer Token| FastAPI[FastAPI Backend: http://localhost:8000]
    
    subgraph Backend [Backend: FastAPI & Python 3.13]
        FastAPI --> Auth[get_current_user Auth]
        FastAPI --> Val[Magic Bytes & 25MB Check]
        FastAPI --> PyPDF[PyPDF Extraction Engine]
        FastAPI --> CoverEngine[Google Books Cover API]
        FastAPI --> Cleanup[Disk Garbage Collector]
    end
    
    CoverEngine -.->|HTTP GET| GBooks[(Google Books Volumes API)]
    
    subgraph Storage [Persistent Storage]
        Val -->|Write UUID File| PDF_Store[(backend/uploads/pdfs/)]
        PyPDF -->|Write Clean Text| TXT_Store[(backend/uploads/texts/)]
        FastAPI -->|Read / Write SQL| DB[(backend/library.db SQLite3)]
        Cleanup -->|os.remove()| PDF_Store
        Cleanup -->|os.remove()| TXT_Store
    end
    
    DB -.->|books, wishlist, highlights, series, users| FastAPI
```

### PDF Ingestion & Lifecycle Pipeline (Mermaid)

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Modal as UploadModal.jsx
    participant API as api.js
    participant Server as FastAPI (main.py)
    participant Disk as File System (uploads/)
    participant GBooks as Google Books API
    participant DB as SQLite3 (library.db)

    User->>Modal: Select / Drop file.pdf
    Modal->>Modal: Check extension (.pdf) & type (application/pdf)
    Modal->>Modal: Check size <= 25MB
    Modal->>API: uploadBook(FormData, onProgress)
    API->>Server: POST /books/upload (Stream Chunked)
    Server->>Server: Verify Magic Bytes (%PDF-)
    Server->>Server: Enforce 25MB limit on stream
    Server->>Disk: Save UUID file: uploads/pdfs/{uuid}.pdf
    Server->>Server: PyPDF check encryption, corrupt status & count pages
    Server->>Disk: Save extracted text: uploads/texts/{book_id}.txt
    Server->>GBooks: Query thumbnail (intitle + inauthor)
    GBooks-->>Server: Return cover URL
    Server->>DB: INSERT INTO books (t, a, g, pages, file_path, cover_url, ...)
    DB-->>Server: Return book_id
    Server-->>API: HTTP 200 (Book JSON)
    API-->>Modal: Upload complete
    Modal->>User: Close modal & refresh Bookshelf
```

---

# 6. Complete Project Folder & File Structure

The complete current directory structure of the Personal Library workspace is detailed below:

```text
personal library/
├── original.html                     # Original standalone HTML/CSS/JS prototype
├── COMPLETE_PROJECT_DOCUMENTATION.md # Comprehensive engineering history and technical manual
├── backend/                          # FastAPI Backend Application & Storage
│   ├── database.py                   # SQLite3 connection manager, table schema & migrations
│   ├── main.py                       # FastAPI application, route handlers, auth, security & ingestion
│   ├── models.py                     # Pydantic v2 schemas for data validation and serialization
│   ├── requirements.txt              # Python runtime package dependencies
│   ├── library.db                    # Persistent SQLite3 database file
│   ├── migrate.py                    # Migration script: adds cover_url to books and wishlist
│   ├── migrate_upload.py             # Migration script: adds file_path, size, timestamps, users
│   ├── seed_hp.py                    # Data seeder: inserts 7 Harry Potter novels into SQLite
│   ├── backfill_covers.py            # Utility: backfills cover image URLs via Google Books API
│   ├── test_features.py              # Test script: verifies book CRUD, text fetch, progress updates
│   ├── test_pdf_upload.py            # Test suite: 10 automated unit/integration security tests
│   └── uploads/                      # Persistent binary and cached document storage
│       ├── pdfs/                     # Secure PDF storage (UUID-named .pdf documents)
│       └── texts/                    # Extracted plain-text files ({book_id}.txt for 3D flipbook)
└── frontend/                         # Vite React Single Page Application (SPA)
    ├── index.html                    # HTML shell, viewport meta, Google Fonts links
    ├── package.json                  # NPM dependencies, scripts, project metadata
    ├── package-lock.json             # Pinned dependency tree lockfile
    ├── vite.config.js                # Vite build and dev server configuration
    ├── .gitignore                    # Git ignore file for node_modules and dist
    ├── .oxlintrc.json                # Linter configuration
    ├── README.md                     # Vite boilerplate readme
    ├── public/                       # Static public assets (e.g. vite.svg)
    └── src/                          # Application source code
        ├── main.jsx                  # React application entry point (ReactDOM render root)
        ├── App.jsx                   # Central application shell, state management & view orchestration
        ├── App.css                   # Vite template stylesheet (inactive, overridden by index.css)
        ├── index.css                 # Master design system styles, custom properties, layout rules
        ├── api.js                    # HTTP client, XHR upload progress wrapper, REST endpoints
        ├── assets/                   # React logo and icon assets
        └── components/               # Modular UI React components
            ├── BookReader.jsx        # 3D physical page-turn flipbook engine (react-pageflip)
            ├── BookReader.css        # Physical paper styling, spine shadow gradients, page layout
            └── UploadModal.jsx       # Drag-and-drop PDF upload dialog, client validation, progress bar
```

### Directory & Important File Responsibilities

* **`original.html`:** The primary historical artifact of the project. Contains the un-migrated, monolithic implementation of the application. Preserved in the repository root as the baseline design and styling contract.
* **`backend/database.py`:** Initializes the SQLite3 connection, provisions schema tables (`books`, `wishlist`, `highlights`, `series`, `users`), and manages incremental column alterations if older database versions are detected.
* **`backend/main.py`:** The core operational brain of the backend. Contains all REST endpoints, CORS middleware, HTTP Bearer security schemes, magic-byte stream validation, PyPDF document inspection, text extraction, Google Books cover resolution, and physical disk file cleanup routines.
* **`backend/models.py`:** Defines Pydantic data schemas enforcing strict typing for books, wishlist items, highlights, and series across request payloads and response serialization.
* **`backend/uploads/pdfs/`:** Isolated server directory storing uploaded book PDFs using cryptographic UUID filenames (`[hex].pdf`) to prevent path traversal and overwrite collisions.
* **`backend/uploads/texts/`:** Storage folder containing digital plain-text extractions named `{book_id}.txt`, queried by the 3D flipbook reader for instant client-side typesetting.
* **`frontend/src/App.jsx`:** Orchestrates the primary UI state: user login, active navigation view, search queries, multi-genre filtering, sorting algorithms, book detail drawer triggers, rating updates, and debounced reading progress synchronization.
* **`frontend/src/api.js`:** The client-side communication bridge. Packages FormData, executes XMLHttpRequest with upload progress tracking, sets bearer authorization tokens, and provides standard Promise-based REST operations.
* **`frontend/src/index.css`:** The design foundation. Houses all CSS custom properties (`--paper`, `--teal`, `--amber`), typography rules for Fraunces and Inter, scrollbar customizations, book spine shadows, drawer sliding transitions, and box-clamping rules.
* **`frontend/src/components/BookReader.jsx`:** Renders the 3D paper page-turn reading interface. Embeds `HTMLFlipBook`, calculates responsive single/double-page dimensions, executes binary-search DOM probe pagination, and fires page flip events.
* **`frontend/src/components/UploadModal.jsx`:** The secure entry point for new books. Features a drag-and-drop dropzone, validates `.pdf` extension and MIME type, enforces the 25MB limit, renders a live upload progress bar, and provides a multi-genre pill cloud.

---

# 7. Comprehensive Current Feature Inventory

### 1. Bookshelf Management & Grid View
* **Purpose:** Acts as the primary library view, allowing users to browse, search, filter, and sort their personal book collection.
* **User Flow:** User enters the application, views cards in a responsive grid. Can search titles, authors, or genres via the search bar; filter by specific genre; switch between "All books", "Currently reading", "Favorites", and "Completed" tabs; and sort by recently added, progress, title, or author.
* **Frontend Implementation:** [`frontend/src/App.jsx#L174-L217`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx). Renders `renderShelf()`, executes client-side filtering over `books` state array.
* **Backend Implementation:** `GET /books` and `GET /api/books` in [`backend/main.py#L85-L93`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Database Dependency:** Queries `books` table ordered by `id DESC`.
* **APIs Involved:** `GET /api/books`.
* **External Services:** None for browsing.
* **Important Files:** [`App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx), [`index.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/index.css).
* **Dependencies:** React hooks (`useState`, `useEffect`).
* **Current Limitations:** Client-side sorting and filtering operates on the full dataset in memory; pagination over hundreds of books is not yet implemented.
* **Known Bugs:** None.
* **Current Status:** Fully Operational.

### 2. PDF Drag-and-Drop Ingestion & Security Pipeline
* **Purpose:** Allow users to upload authentic digital PDF books securely with automatic metadata extraction, page counting, and validation.
* **User Flow:** User clicks "+ Upload book" on the toolbar. Drops a PDF into the dropzone or browses their device. If invalid or >25MB, an inline warning displays immediately. If valid, title and author are pre-filled; user selects genre pills and clicks "Add to Library". A progress bar indicates upload percentage, the modal closes, and the bookshelf reloads.
* **Frontend Implementation:** [`frontend/src/components/UploadModal.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/UploadModal.jsx).
* **Backend Implementation:** `POST /books/upload` in [`backend/main.py#L95-L248`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py). Checks magic bytes `b"%PDF-"`, enforces 25MB limit on streaming chunks, writes UUID file, extracts metadata and text via `pypdf`, and queries Google Books API for cover art.
* **Database Dependency:** Inserts into `books` table with `file_path`, `original_filename`, `file_size`, `uploaded_at`, and `user_id`.
* **APIs Involved:** `POST /books/upload`.
* **External Services:** Google Books API.
* **Important Files:** [`UploadModal.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/UploadModal.jsx), [`api.js`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/api.js), [`main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Dependencies:** `python-multipart`, `pypdf`.
* **Current Limitations:** Scanned document PDFs containing image-only pages will result in empty extracted text for the 3D flipbook (though the original PDF file remains downloadable).
* **Known Bugs:** None.
* **Current Status:** Fully Operational.

### 3. Realistic 3D Paper Page-Flip Reading Engine
* **Purpose:** Provide an immersive, tactile reading experience with realistic paper pages, dynamic spine depth, page curling animations, and automatic progress saving.
* **User Flow:** User clicks a book, opens the drawer, and clicks "Continue reading". The flipbook loads, typesets text using binary search DOM measurement, and opens to the exact page where the user left off. User clicks "Turn page", clicks arrow buttons, uses keyboard arrow keys, or drags pages with the mouse to flip pages with realistic physics. Turning pages auto-saves progress. User clicks "← Back" to return to the library.
* **Frontend Implementation:** [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx), [`frontend/src/components/BookReader.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.css).
* **Backend Implementation:** `GET /books/{id}/text` serving plain text from `backend/uploads/texts/{book_id}.txt`. `PUT /api/books/{id}` updating `read` pages and `status`.
* **Database Dependency:** `books.pages`, `books.read`, `books.status`.
* **APIs Involved:** `GET /books/{id}/text`, `PUT /books/{id}`.
* **External Services:** None.
* **Important Files:** [`BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx), [`BookReader.css`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.css), [`App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Dependencies:** `react-pageflip`.
* **Current Limitations:** Text is rendered in standard book font (Georgia serif); formatted rich-text elements like embedded figures, tables, or poetry line indentation are normalized to plain text.
* **Known Bugs:** None.
* **Current Status:** Fully Operational.

### 4. Automated Cover Art Discovery
* **Purpose:** Fetch and display real photographic book jackets for added books automatically.
* **User Flow:** When a book is added or uploaded, the backend queries Google Books with title and author. If found, the high-resolution cover thumbnail is saved and rendered on the book card with an embossed spine overlay. If unfound or rate-limited, an artisanal color gradient cover is rendered.
* **Frontend Implementation:** `Cover` component in [`frontend/src/App.jsx#L9-L26`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Backend Implementation:** `fetch_cover_url()` in [`backend/main.py#L49-L64`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Database Dependency:** `books.cover_url`, `wishlist.cover_url`.
* **APIs Involved:** Google Books Volumes API (`https://www.googleapis.com/books/v1/volumes`).
* **External Services:** Google Books API.
* **Important Files:** [`main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py), [`App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Dependencies:** `urllib.request`.
* **Current Limitations:** Rate limits can occur on high-frequency bulk requests without an explicit Google Books API key.
* **Known Bugs:** None (shielded with graceful fallback).
* **Current Status:** Fully Operational.

### 5. Book Detail Drawer & Lifecycle Actions
* **Purpose:** Manage individual book properties, star ratings, file downloads, wishlist promotion, and deletions.
* **User Flow:** User clicks any book card on the shelf. A 360px drawer slides in from the right showing book jacket, title, author, genre tags, reading status tag, pages read bar, interactive 5-star rating selector, "Continue reading" button, "Download / View PDF" link (if a file exists), "Add to wishlist", and "Delete book".
* **Frontend Implementation:** `renderDrawer()` in [`frontend/src/App.jsx#L271-L311`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Backend Implementation:** `PUT /books/{id}`, `DELETE /books/{id}`, `GET /books/{id}/file`.
* **Database Dependency:** Updates and deletes in `books` table.
* **APIs Involved:** `PUT /api/books/{id}`, `DELETE /api/books/{id}`, `GET /books/{id}/file`.
* **External Services:** None.
* **Important Files:** [`App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Dependencies:** None.
* **Current Limitations:** Confirmation uses native `window.confirm()`.
* **Known Bugs:** None.
* **Current Status:** Fully Operational.

### 6. Wishlist Management
* **Purpose:** Save desired titles, query covers automatically, and migrate them to the bookshelf upon acquisition.
* **User Flow:** User switches to the "Wishlist" view. Can view saved books. Clicking "Add to library" opens the upload modal with title, author, and genre pre-filled so the user can attach the PDF and add it to the library.
* **Frontend Implementation:** `renderWishlist()` in [`frontend/src/App.jsx#L219-L236`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Backend Implementation:** `GET /api/wishlist`, `POST /api/wishlist`, `DELETE /api/wishlist/{id}` in [`backend/main.py#L365-L394`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Database Dependency:** `wishlist` table.
* **APIs Involved:** `/api/wishlist/*`.
* **External Services:** Google Books API.
* **Important Files:** [`App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx), [`main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Current Status:** Fully Operational.

### 7. Literary Highlights & Quotes
* **Purpose:** Record and celebrate favorite literary quotations.
* **User Flow:** User navigates to the "Highlights" tab to browse saved book quotes featuring custom colored accent margins.
* **Frontend Implementation:** `renderHighlights()` in [`frontend/src/App.jsx#L238-L250`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Backend Implementation:** `GET /api/highlights` in [`backend/main.py#L398-L405`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Database Dependency:** `highlights` table (`id`, `q`, `b`, `c`).
* **APIs Involved:** `GET /api/highlights`.
* **Current Status:** Fully Operational.

### 8. Series & Shelves Collections
* **Purpose:** Group books into themed series or dedicated sub-shelves.
* **User Flow:** User navigates to "Series & Shelves" view to see collection cards with aggregated book counts.
* **Frontend Implementation:** `renderSeries()` in [`frontend/src/App.jsx#L252-L269`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Backend Implementation:** `GET /api/series` in [`backend/main.py#L409-L416`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Database Dependency:** `series` table (`id`, `t`, `n`).
* **APIs Involved:** `GET /api/series`.
* **Current Status:** Fully Operational.

---

# 8. Removed, Replaced & Deprecated Features

| Feature / Artifact | When Introduced | Original Behavior | Why It Was Removed / Replaced | Replaced By | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Monolithic HTML Document** | Phase 0 | All CSS, HTML, and JS bundled in `original.html` | Scalability requirements; user requested React + FastAPI + SQLite architecture | Vite React SPA + FastAPI backend | User prompt (2026-09-22 23:18:55); [`implementation_plan.md`](file:///c:/Users/Sai/.gemini/antigravity-ide/brain/6bfae254-c637-484f-b581-4c197cc977b2/implementation_plan.md) |
| **In-Memory JavaScript State** | Phase 0 | Arrays `books[]`, `wishlist[]` stored in browser window memory | Data was completely wiped on browser reload; no persistence | SQLite3 relational database (`library.db`) | [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py); `transcript.jsonl` (2026-09-22) |
| **Hardcoded Mock Seed Data** | Phase 1 | `init_db()` seeded sample books (*The Midnight Library*, *Educated*, etc.) | User requested clean slate to store real personal book data | Empty database zero-state (`database.py` no longer auto-seeds) | User prompt (2026-09-24 17:59:37); [`backend/database.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/database.py) |
| **Single-Input Text Genre Field** | Phase 0 & 1 | `<input id="newGenre" />` allowed only one manually typed genre string | Books frequently span multiple genres; awkward user experience | Multi-select interactive genre pill cloud in `UploadModal.jsx` | User prompt (2026-09-24 18:08:46); [`frontend/src/components/UploadModal.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/UploadModal.jsx) |
| **Flat Reading Overlay with Range Slider** | Phase 0 & 1 | Centered plain text column with bottom `<input type="range">` slider | Lacked physical book simulation; user requested realistic paper page curling | 3D Physics Flipbook (`BookReader.jsx` with `react-pageflip`) | User prompt (2026-09-24 18:54:19); [`frontend/src/components/BookReader.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx) |
| **Floating Page Edge Buttons (`‹` & `›`)** | Phase 4 | Two arrow buttons floating on left/right screen edges | Superseded by dedicated control bar inside `BookReader.jsx` | Integrated reader controls bar with "Previous page" and "Turn page" | [`frontend/src/components/BookReader.jsx#L217-L228`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/BookReader.jsx) |
| **Naive File Input in Modal** | Phase 2 | Basic file selector with rudimentary 10MB check | Security vulnerabilities, no drag & drop, no server verification, no progress bar | Hardened PDF-only `UploadModal.jsx` with magic-byte validation | User prompt (2026-09-24 19:51:35); [`frontend/src/components/UploadModal.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/UploadModal.jsx) |

---

# 9. Bug & Issue History

The following table records every technical defect, runtime error, or regression encountered and resolved during the project lifecycle:

| Issue | First Seen | Root Cause | Technical Fix | Phase Resolved | Current Status |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Vite Execution Directory Mismatch** | Phase 1 (2026-09-22 23:37:16) | User executed `npm run dev` in workspace root instead of `frontend/` directory | Documented correct execution paths (`cd frontend; npm run dev`) and started processes directly | Phase 1 | Resolved |
| **Persistent Dummy Data Re-seeding** | Phase 2 (2026-09-24 18:08:46) | `init_db()` in `database.py` contained hardcoded call to `seed_data()` when count was 0 | Removed `seed_data()` invocation from `init_db()`; wiped database file on disk | Phase 2 | Resolved |
| **Google Books API Rate Limit on Bulk Seed** | Phase 3 (2026-09-24 18:37:35) | Rapid batch querying of Google Books API during Harry Potter backfill triggered rate limits | Wrapped API request in exception shielding returning `None`; added frontend CSS gradient cover fallback | Phase 3 | Resolved |
| **React Hook Ordering Crash in `App.jsx`** | Phase 5 (2026-09-24 19:22:59) | `useCallback` (`handleProgress`) and `useRef` were declared after early `if (!loggedIn) return` statement | Moved all React hooks to the top of `App` component before any conditional return statements | Phase 5 | Resolved |
| **Text Extraction Failure on Scanned PDF** | Phase 6 (2026-09-24 19:34:12) | User uploaded an image-only scanned book; `pypdf` extracts vector text and returns empty string | Added clear user feedback explaining that scanned image PDFs require OCR and only vector digital PDFs are typeset | Phase 6 | Documented Boundary |
| **Book Card Geometry Distortion** | Phase 6 (2026-09-24 19:40:18) | Excessively long titles stretched book cover containers out of 2:3 aspect ratio | Added `-webkit-line-clamp: 5` and ellipsis overflow to `.cover-title` and `-webkit-line-clamp: 2` to `.book-meta .t` | Phase 6 | Resolved |
| **SQLite Migration Syntax Error** | Phase 7 (2026-09-24 19:57:26) | `ALTER TABLE books ADD COLUMN uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` is disallowed in SQLite | Added column without default, followed by `UPDATE books SET uploaded_at = CURRENT_TIMESTAMP WHERE uploaded_at IS NULL` | Phase 7 | Resolved |
| **Path Traversal Vulnerability on File Upload** | Phase 7 (2026-09-24 19:51:35) | Saving files directly with user-supplied filename could allow directory escape | Implemented UUID v4 file renaming on physical disk (`uuid.uuid4().hex + ".pdf"`), storing original name in DB | Phase 7 | Resolved |
| **Fake PDF File Ingestion (MIME Spoofing)** | Phase 7 (2026-09-24 19:51:35) | Non-PDF files (e.g. JPEG or TXT) renamed to `.pdf` would pass superficial extension checks | Added binary magic-byte inspection verifying the first bytes begin with `b"%PDF-"` | Phase 7 | Resolved |
| **Orphaned Storage on Book Deletion** | Phase 7 (2026-09-24 19:51:35) | Deleting a book row from SQLite left the physical PDF and text files on disk indefinitely | Updated `DELETE /books/{id}` to verify and call `os.remove()` on both the PDF and text file before SQL commit | Phase 7 | Resolved |

---

# 10. Configuration, Environment & Deployment Guide

### 10.1 Environment Variables & Configuration
The application currently operates with zero required external environment variables, allowing frictionless local developer onboarding:
* **Backend Host/Port:** Defaults to `0.0.0.0:8000` (or `127.0.0.1:8000`).
* **Frontend Dev Server:** Defaults to `http://localhost:5173`.
* **API Base URL:** Defined in [`frontend/src/api.js`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/api.js) as `http://localhost:8000`.
* **External APIs:** Google Books API queries are performed against public endpoints (`https://www.googleapis.com/books/v1/volumes`) without requiring an API key. For high-volume production deployments, an optional environment variable `GOOGLE_BOOKS_API_KEY=YOUR_API_KEY_HERE` can be appended as `&key=${GOOGLE_BOOKS_API_KEY}`.

### 10.2 System Requirements
* **Operating System:** Windows, macOS, or Linux.
* **Node.js:** Node.js v18.x, v20.x, or v22.x+ with `npm` v9.x+.
* **Python:** Python 3.10, 3.11, 3.12, or 3.13+.
* **SQLite:** Built into standard Python library (SQLite 3.35+ recommended).

### 10.3 Installation Commands

#### Backend Setup
```bash
# Navigate to the backend directory
cd "c:\Users\Sai\OneDrive\Desktop\personal library\backend"

# Create a virtual environment (optional but recommended)
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install required Python dependencies
pip install -r requirements.txt
```
*Dependencies installed:* `fastapi`, `uvicorn`, `pydantic`, `python-multipart`, `pypdf`.

#### Frontend Setup
```bash
# Navigate to the frontend directory
cd "c:\Users\Sai\OneDrive\Desktop\personal library\frontend"

# Install NPM packages
npm install
```
*Dependencies installed:* `react` (^19.2.8), `react-dom` (^19.2.8), `react-pageflip` (^2.0.3), `vite` (^8.3.0), `@vitejs/plugin-react` (^6.1.1).

### 10.4 Execution & Running Locally

#### Run Backend Server
```bash
cd "c:\Users\Sai\OneDrive\Desktop\personal library\backend"
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
*Verification:* Access API documentation at `http://127.0.0.1:8000/docs`.

#### Run Frontend Client
```bash
cd "c:\Users\Sai\OneDrive\Desktop\personal library\frontend"
npm run dev
```
*Verification:* Open web browser at `http://localhost:5173`.

### 10.5 Production Build Command
To produce an optimized production bundle of the React client:
```bash
cd "c:\Users\Sai\OneDrive\Desktop\personal library\frontend"
npm run build
```
This generates static HTML/CSS/JS artifacts in `frontend/dist/`.

---

# 11. End-to-End System Workflows

### 11.1 User Authentication & Session Entry Flow
```text
1. User navigates to http://localhost:5173.
2. React checks `loggedIn` state (defaults to false).
3. Renders #login screen displaying brand and login card.
4. User clicks "Sign in" (or submits default credentials).
5. React sets `loggedIn = true`.
6. App triggers `useEffect` firing `fetchData()`.
7. `api.getBooks()`, `api.getWishlist()`, `api.getHighlights()`, and `api.getSeries()` execute.
8. FastAPI validates incoming Authorization headers (`Bearer reader-token`).
9. Database queries return JSON rows; React populates Bookshelf grid.
```

### 11.2 PDF Book Ingestion & Security Processing Flow
```text
1. User clicks "+ Upload book" on the Bookshelf toolbar.
2. React mounts `UploadModal.jsx`.
3. User selects or drops a `.pdf` file.
4. Client validation:
   - Verifies `file.name.toLowerCase().endsWith(".pdf")` and `file.type === "application/pdf"`.
   - Verifies `file.size <= 26,214,400 bytes` (25MB).
   - If invalid, shows inline error banner; if valid, auto-extracts title from filename.
5. User selects genres (e.g. "Fantasy", "Sci-Fi") and clicks "Add to Library".
6. `api.uploadBook()` constructs FormData and sends XHR to `POST /books/upload`.
7. XHR captures `upload.onprogress` updating modal percentage bar (0% -> 100%).
8. FastAPI intercepts upload stream:
   - Verifies `.pdf` extension and `application/pdf` MIME type.
   - Streams first 64KB chunk; checks magic bytes `chunk.startswith(b"%PDF-")`.
   - Streams remaining chunks, enforcing cumulative bytes <= 25MB (raises 413 if exceeded).
   - Writes file to `uploads/pdfs/{uuid4}.pdf`.
9. Server passes saved file to `pypdf.PdfReader`:
   - Confirms non-encrypted and valid page count (`len(reader.pages) > 0`).
   - Extracts embedded `/Title` and `/Author` if form inputs were blank.
   - Extracts plain text from all pages and writes cache to `uploads/texts/{book_id}.txt`.
10. Server executes `fetch_cover_url()` against Google Books Volumes API.
11. Server inserts row into `books` table in `library.db`.
12. Server responds with HTTP 200 and created Book JSON.
13. Modal resets, closes, and triggers `fetchData()` on parent shelf.
```

### 11.3 3D Physical Flipbook Reading Flow
```text
1. User clicks any book card on the shelf.
2. `App.jsx` opens right detail drawer.
3. User clicks "Continue reading".
4. `App.jsx` launches `handleOpenReader(b)`:
   - Closes drawer, opens full-screen reader container.
   - Dispatches `api.getBookText(b.id)` calling `GET /books/{id}/text`.
   - Receives raw plain text string.
5. Mounts `<BookReader title=... author=... text=... startPercent=... />`.
6. `BookReader` executes `usePageSize()`:
   - Measures viewport width: if <800px selects single page; else selects two-page spread.
   - Computes fixed aspect ratio width and height.
7. `BookReader` executes `paginate()`:
   - Mounts hidden `.page-text.probe` element matching exact font and width.
   - Executes binary search over tokens to fill pages without overflow.
   - Computes total pages and maps `startPercent` to initial leaf index.
8. Mounts `HTMLFlipBook` rendering Cover, Pages with alternating spine shadows, and Back Cover.
9. User turns pages via on-screen buttons, keyboard arrows, or mouse drag.
10. `onFlip` event fires, invoking `handleProgress({ page, total, percent })`.
```

### 11.4 Reading Progress Auto-Synchronization Flow
```text
1. User flips a page inside `BookReader`.
2. Flipbook triggers `onFlip` emitting `percent` (0.00 to 1.00).
3. `handleProgress` receives callback in `App.jsx`.
4. Debounce timer (`progressTimerRef`) clears previous timer and schedules execution for 1000ms.
5. If user continues flipping rapidly, timer resets repeatedly.
6. Once user pauses on a page for 1.0 second:
   - Computes `pagesRead = Math.round(percent * activeBook.pages)`.
   - Determines status: `completed` if percent >= 0.98; else `reading` if percent > 0.
   - Dispatches `api.updateBook(activeBook.id, { read: pagesRead, status })`.
7. FastAPI executes `PUT /api/books/{id}`.
8. SQLite updates row in `books` table.
```

### 11.5 Book Deletion & Atomic Storage Garbage Collection Flow
```text
1. User opens book detail drawer and clicks "Delete book".
2. Browser displays confirmation dialog: "Delete this book from your library?".
3. User confirms.
4. `api.deleteBook(id)` sends `DELETE /books/{id}` with Bearer authorization.
5. FastAPI verifies book ownership (`user_id == current_user["id"]`).
6. Server locates physical PDF file (`book["file_path"]`): calls `os.remove(file_path)` if exists.
7. Server locates cached text file (`uploads/texts/{id}.txt`): calls `os.remove(text_path)` if exists.
8. Server executes `DELETE FROM books WHERE id = ?`.
9. Database commits transaction.
10. Server responds `{"status": "success"}`.
11. Frontend closes drawer and re-fetches shelf data.
```

---

# 12. File-Level Responsibilities & Component Directory

### `backend/main.py`
* **Purpose:** The core REST application and business logic layer.
* **Responsibilities:**
  - Manages FastAPI app lifecycle, CORS policies, and bearer authentication.
  - Implements multi-layer PDF security checks (magic bytes, streaming size, extensions).
  - Handles disk file operations (UUID storage, PyPDF extraction, disk garbage collection).
  - Integrates with Google Books API for cover thumbnails.
* **Important Functions:**
  - `get_current_user()`: Resolves authenticated caller via Bearer token or `X-User-Id`.
  - `fetch_cover_url(title, author)`: Queries Google Books API with User-Agent and timeout.
  - `upload_book()`: Multipart ingestion pipeline with magic-byte verification and PyPDF text extraction.
  - `get_book_file()`: Secure file streaming with ownership verification.
  - `delete_book()`: Atomic deletion of physical PDF, text cache, and database row.
* **Dependencies:** `fastapi`, `pypdf`, `sqlite3`, `urllib`, `pydantic`.
* **Used by:** Frontend client through `frontend/src/api.js`.
* **Introduced / Changed:** Introduced in Phase 1; heavily extended in Phases 3, 5, and 7.

### `backend/database.py`
* **Purpose:** Relational database access and schema definition.
* **Responsibilities:**
  - Connects to `library.db` with `sqlite3.Row` factory.
  - Creates tables (`books`, `wishlist`, `highlights`, `series`, `users`).
  - Executes automatic column additions if legacy schema versions are detected.
* **Important Functions:**
  - `get_db()`: Yields SQLite connection.
  - `init_db()`: Sets up schema tables and default user record.
* **Dependencies:** `sqlite3`.
* **Used by:** [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Introduced / Changed:** Introduced in Phase 1; altered in Phase 2 (removed seed), Phase 3 (`cover_url`), and Phase 7 (PDF columns).

### `backend/models.py`
* **Purpose:** Data serialization, validation, and API contracts.
* **Responsibilities:**
  - Enforces schema types for requests and responses.
  - Supports backward-compatible fields (`t`, `a`, `g`, `pages`).
* **Important Models:**
  - `BookCreate`, `Book`, `BookUpdate`
  - `WishlistCreate`, `WishlistItem`
  - `HighlightCreate`, `Highlight`
  - `SeriesCreate`, `Series`
* **Dependencies:** `pydantic`.
* **Used by:** [`backend/main.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/main.py).
* **Introduced / Changed:** Introduced in Phase 1; updated in Phases 3 and 7.

### `frontend/src/App.jsx`
* **Purpose:** Master React application shell.
* **Responsibilities:**
  - Manages view transitions ("shelf", "wishlist", "highlights", "series").
  - Houses search, filtering, and sorting state.
  - Manages book detail drawer and ratings.
  - Handles debounced progress synchronization for the reader.
* **Important Functions / Components:**
  - `Cover`: Hybrid cover component rendering photographic jacket or gradient spine.
  - `Stars`: Interactive 5-star rating component.
  - `handleProgress()`: Debounced progress synchronization dispatcher.
* **Dependencies:** React hooks (`useState`, `useEffect`, `useCallback`, `useRef`).
* **Used by:** [`frontend/src/main.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/main.jsx).
* **Introduced / Changed:** Introduced in Phase 1; updated in Phases 2, 3, 4, 5, and 7.

### `frontend/src/components/BookReader.jsx`
* **Purpose:** Physical 3D paper page-turn flipbook component.
* **Responsibilities:**
  - Wraps `react-pageflip` with physical curling mechanics.
  - Typesets text into pages dynamically via DOM probe binary search.
  - Computes responsive dimensions for single/double page modes.
* **Important Functions / Components:**
  - `usePageSize()`: Debounced window geometry listener.
  - `paginate()`: DOM height probe text segmentation algorithm.
  - `Cover`, `Page`: Sub-components for front cover, interior pages, and back cover.
* **Dependencies:** `react-pageflip`, React hooks.
* **Used by:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Introduced / Changed:** Introduced in Phase 5.

### `frontend/src/components/UploadModal.jsx`
* **Purpose:** Secure drag-and-drop PDF ingestion modal.
* **Responsibilities:**
  - Drag-and-drop target with dynamic visual styling.
  - Client-side validation for `.pdf` extension, MIME type, and 25MB limit.
  - Real-time XHR upload progress bar.
  - Multi-genre pill selection.
* **Important Functions / Components:**
  - `validatePdfFile()`: Client-side gatekeeper.
  - `handleSubmit()`: Prepares FormData and triggers upload.
* **Dependencies:** React hooks.
* **Used by:** [`frontend/src/App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx).
* **Introduced / Changed:** Introduced in Phase 7.

### `frontend/src/api.js`
* **Purpose:** Centralized network communication utility.
* **Responsibilities:**
  - Issues fetch calls with default Authorization headers.
  - Wraps XMLHttpRequest for upload progress tracking.
* **Important Functions:**
  - `uploadBook(formData, onProgress)`: Multipart upload with progress callback.
  - `getBooks()`, `updateBook()`, `deleteBook()`, `getBookText()`, `getBookFileUrl()`.
* **Dependencies:** Standard Browser Fetch & XMLHttpRequest APIs.
* **Used by:** [`App.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/App.jsx), [`UploadModal.jsx`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/frontend/src/components/UploadModal.jsx).
* **Introduced / Changed:** Introduced in Phase 1; updated in Phases 5 and 7.

### `frontend/src/index.css`
* **Purpose:** Master application styling and design system.
* **Responsibilities:**
  - Defines CSS custom properties for literary color scheme and dark mode.
  - Configures book card aspect ratios, drop shadows, and embossed spines.
  - Implements slide-out drawer animations and modal overlays.
  - Enforces multiline box clamping and text truncation rules.
* **Dependencies:** Google Fonts (`Fraunces`, `Inter`).
* **Used by:** Global frontend bundle.
* **Introduced / Changed:** Transferred from `original.html` in Phase 1; refined in Phase 6.

---

# 13. Technology Evolution Matrix

| Technology / Tool | Purpose in Project | Introduced In | Evolution / Changes Over Time | Current Status |
| :--- | :--- | :---: | :--- | :--- |
| **HTML5 / CSS3 / Vanilla JS** | Monolithic standalone prototype | Phase 0 | Migrated to React components; styling rules retained in `index.css` | Converted to React |
| **Google Fonts (Fraunces, Inter)**| Core typography system | Phase 0 | Linked in `index.html`; applied globally in `index.css` | Active |
| **Vite 8** | Frontend build tool and dev server | Phase 1 | Initialized with React template; bundles application | Active |
| **React 19** | Frontend component & state framework | Phase 1 | Replaced vanilla DOM manipulation; manages full application state | Active |
| **Python 3.13** | Backend runtime environment | Phase 1 | Powers FastAPI backend service and utility scripts | Active |
| **FastAPI** | High-performance asynchronous REST API | Phase 1 | Expanded from simple CRUD to multipart file streaming and security checks | Active |
| **Uvicorn** | ASGI web server | Phase 1 | Serves FastAPI application on port 8000 | Active |
| **SQLite 3** | Embedded relational database | Phase 1 | Created `library.db`; migrated schema twice; stores all data | Active |
| **Pydantic v2** | Request validation & response models | Phase 1 | Extended with file metadata and cover URL fields | Active |
| **Google Books Volumes API** | Cover art discovery service | Phase 3 | Integrated via `fetch_cover_url()` in `main.py` | Active |
| **react-pageflip** | 3D physics-based book flip animation | Phase 5 | Installed via npm; powers `BookReader.jsx` component | Active |
| **pypdf** | PDF file parsing & text extraction | Phase 5 | Installed via pip; auto-counts pages, extracts metadata, extracts text | Active |
| **python-multipart** | Streaming multipart/form-data parser | Phase 5 | Installed via pip; required for FastAPI `UploadFile` | Active |

---

# 14. Verifiable Chronological Timeline

The development history of the Personal Library application is verified through execution transcripts, file timestamps, and plan documents:

### 2026-09-22 23:18:55 (Transcript 1, Step 0)
* **Phase 1 Initiation:** User provides monolithic prototype `Personal Library (1).html` and requests migration: *"here i have given u the ui dont change anything in that scale it to react js,fast api , sql lite 3"*.
* Agent inspects prototype, preserves it as [`original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html), and creates [`implementation_plan.md`](file:///c:/Users/Sai/.gemini/antigravity-ide/brain/6bfae254-c637-484f-b581-4c197cc977b2/implementation_plan.md).

### 2026-09-22 23:27:37 (Transcript 1, Step 20)
* **Plan Approved:** User approves `implementation_plan.md`.
* Agent scaffolds `frontend/` using Vite React, creates `backend/` with `database.py`, `models.py`, `main.py`, and `requirements.txt`.
* Migrates CSS to `index.css`, creates `api.js`, and builds `App.jsx`. Launches both servers.

### 2026-09-22 23:37:16 (Transcript 1, Step 78)
* User attempts to run server from root; agent clarifies directory structure and confirms background execution.

### 2026-09-24 17:58:41 to 18:08:46 (Transcript 1, Steps 84–95)
* **Phase 2 Initiation:** User requests localhost link, then requests: *"remove the static data from it, so that i can put my real data in it the book should not be above 10mb and in the upload book section, there should be an picker... user can select multiple geners"*.
* Agent wipes `library.db`, updates `database.py` to stop auto-seeding, adds multi-genre pill selection in `App.jsx`, and implements 10MB limit.

### 2026-09-24 18:14:49 to 18:28:23 (Transcript 1, Steps 117–129)
* **Phase 3 Initiation:** User provides the 7 *Harry Potter* titles and requests: *"add these books there like add them there for real"*, followed by *"i want u to add the cover for every book that is added to the library"*.
* Agent creates `seed_hp.py` to inject the novels into SQLite.
* Creates `migrate.py` adding `cover_url TEXT` to `books` and `wishlist`.
* Integrates Google Books Volumes API in `main.py` and creates `backfill_covers.py`. Updates `Cover` component to render real cover art.

### 2026-09-24 18:41:36 (Transcript 1, Step 171)
* **Phase 4 Initiation:** User requests: *"to turn the pages in the reading window i want an button there itself or the keys in the keyboard should be working or the swipe should also be working"*.
* Agent updates reader overlay with on-screen arrow buttons, keyboard listeners, and touch swipe event handlers.

### 2026-09-24 18:54:19 to 19:28:00 (Transcript 1, Steps 177–275)
* **Phase 5 Initiation:** User submits comprehensive specification for a senior engineer to upgrade the reading screen to a realistic 3D paper page-turn animation like a physical book. User supplies complete reference code for `BookReader.jsx` and `BookReader.css` in Step 201.
* Agent installs `react-pageflip`, `pypdf`, and `python-multipart`.
* Implements `BookReader.jsx`, `BookReader.css`, and backend text extraction (`GET /books/{id}/text`).
* Fixes React Hook ordering crash in `App.jsx`.

### 2026-09-24 19:34:12 to 19:40:18 (Transcript 1, Steps 296–310)
* **Phase 6 Initiation:** User uploads a scanned PDF, encountering text extraction limitations.
* User requests: *"fix all the ui font and make it fit the appropriate box that has be given to it"*.
* Agent updates `index.css` applying `-webkit-line-clamp: 5` to book covers and `-webkit-line-clamp: 2` to card titles.

### 2026-09-24 19:51:35 to 20:22:00 (Transcripts 1 & 2, Steps 317–146)
* **Phase 7 Initiation:** User specifies strict PDF-only upload requirements, magic-byte checks, streaming size enforcement, UUID storage, schema migrations, and disk garbage collection.
* Agent encounters SQLite syntax error on `DEFAULT CURRENT_TIMESTAMP`, resolves it via two-step migration in `migrate_upload.py`.
* Builds `UploadModal.jsx` with drag & drop, client validation, and XHR progress bar.
* Re-engineers `POST /books/upload` with magic bytes (`b"%PDF-"`), 25MB limit, and UUID storage.
* Builds `test_pdf_upload.py` with 10 unit/integration tests (all 10 pass).
* Validates full flow via browser subagent recording `verify_pdf_upload_1790260889616.webp`.

---

# 15. Historical Gaps & Uncertainties

In strict adherence to engineering integrity, the following aspects cannot be confirmed from the surviving artifacts:

1. **Pre-Migration Design Origins (Phase 0):**
   * *What is missing:* The exact tooling, prompts, or human designer who originally crafted `Personal Library (1).html` before 2026-09-22 23:18:55.
   * *Why it cannot be verified:* The earliest available log begins when the user provided the pre-existing HTML document from their Downloads folder.
   * *Indirect evidence:* High quality of CSS variables, Fraunces/Inter typography pairings, and paper color palette indicate deliberate human design or sophisticated UI prototyping.
2. **Harry Potter Text Ingestion Status:**
   * *What is missing:* The 7 Harry Potter records in `books` have titles, authors, and page counts, but their `file_path` values are NULL.
   * *Why it cannot be verified:* The books were seeded into SQLite via `seed_hp.py` before the PDF upload feature was built in Phase 7. As a result, clicking "Continue reading" on these 7 novels returns "Text not available" because no physical digital file was ever uploaded for them.
   * *Indirect evidence:* `library.db` inspection confirms rows 1–7 have NULL `file_path` and NULL `original_filename`.
3. **Scanned PDF Sample Identity:**
   * *What is missing:* The exact title of the scanned book uploaded by the user during Phase 6.
   * *Why it cannot be verified:* The uploaded scanned document was rejected and discarded during testing; the error screenshot `upload_pdf_error_1790261412384.png` captures the extraction failure dialog without exposing the book title.

---

# 16. Current Project Snapshot & Roadmap

### 16.1 Current Snapshot

* **Project Purpose:** Artisanal personal library catalog, reading tracker, and physical 3D paper page-turn e-reader.
* **Current Feature Set:**
  - Secure PDF upload with magic-byte check, drag & drop, and 25MB limit.
  - Realistic 3D paper flipbook reader with dynamic binary-search typesetting.
  - Automated cover art fetching via Google Books API with spine overlay.
  - Multi-genre pill tagging and filtering.
  - Reading progress auto-sync and star rating system.
  - Wishlist, Highlights, and Series views.
  - Disk file garbage collection on deletion.
* **Technology Stack:** React 19, Vite 8, Python 3.13, FastAPI, SQLite 3, Pydantic v2, PyPDF 5.x, React-PageFlip.
* **Current Known Issues:** None. All 10 automated test cases pass; Vite and FastAPI compile cleanly.
* **Current Limitations:**
  - Optical Character Recognition (OCR) is not present; scanned image-only PDFs yield empty reader text.
  - Authentication currently uses a pre-set default token (`Bearer reader-token` / user ID 1) rather than a complete multi-user registration/JWT hashing workflow.

### 16.2 Potential Next Development Areas
*(Identified strictly from incomplete features and TODOs in code)*:
1. **OCR Pipeline for Scanned Books:** Integrate an asynchronous worker (e.g. `pytesseract` / Tesseract OCR) to extract text from scanned image PDFs.
2. **Production JWT Authentication:** Upgrade the `users` table and `get_current_user` dependency to verify cryptographic JWT access tokens and password hashes (e.g. `passlib` / `bcrypt`).
3. **EPUB & MOBI Format Support:** Expand the file ingestion engine beyond PDF to support standard EPUB files via `ebooklib`.
4. **Highlights & Quotes Creation Interface:** Add an interactive quote selection tool inside `BookReader.jsx` allowing readers to highlight text and save quotes directly to the `highlights` table.

---

# 17. Evidence Reference Index

Every historical claim in this documentation is anchored to the following verifiable artifacts:

* **Prototype File:** [`c:\Users\Sai\OneDrive\Desktop\personal library\original.html`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/original.html)
* **Session Transcript 1:** `c:\Users\Sai\.gemini\antigravity-ide\brain\6bfae254-c637-484f-b581-4c197cc977b2\.system_generated\logs\transcript.jsonl`
* **Session Transcript 2:** `c:\Users\Sai\.gemini\antigravity-ide\brain\a5524333-6c2d-4b68-abbb-c41545e82eed\.system_generated\logs\transcript.jsonl`
* **Implementation Plan:** [`c:\Users\Sai\.gemini\antigravity-ide\brain\6bfae254-c637-484f-b581-4c197cc977b2\implementation_plan.md`](file:///c:/Users/Sai/.gemini/antigravity-ide/brain/6bfae254-c637-484f-b581-4c197cc977b2/implementation_plan.md)
* **Walkthrough Record:** [`c:\Users\Sai\.gemini\antigravity-ide\brain\6bfae254-c637-484f-b581-4c197cc977b2\walkthrough.md`](file:///c:/Users/Sai/.gemini/antigravity-ide/brain/6bfae254-c637-484f-b581-4c197cc977b2/walkthrough.md)
* **Test Suite:** [`c:\Users\Sai\OneDrive\Desktop\personal library\backend\test_pdf_upload.py`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/test_pdf_upload.py)
* **Database File:** [`c:\Users\Sai\OneDrive\Desktop\personal library\backend\library.db`](file:///c:/Users/Sai/OneDrive/Desktop/personal%20library/backend/library.db)
* **Video Validation Artifact:** `c:\Users\Sai\.gemini\antigravity-ide\brain\a5524333-6c2d-4b68-abbb-c41545e82eed\verify_pdf_upload_1790260889616.webp`
