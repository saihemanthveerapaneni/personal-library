import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import HTMLFlipBook from "react-pageflip";
import "./BookReader.css";

/* ---------- layout constants (must match BookReader.css) ---------- */
const PAD_X = 32;    // left/right padding inside a page
const PAD_TOP = 36;  // top padding inside a page
const FOOTER = 28;   // height of the page-number strip at the bottom
const SAFETY = 6;    // px of slack so text never touches the footer

/* ---------- responsive page size ---------- */
function computePageSize() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const singlePage = vw < 800; // phones/tablets portrait show one page at a time
  const maxW = singlePage ? vw - 24 : Math.min(480, (vw - 80) / 2);
  let w = Math.max(260, Math.floor(maxW));
  let h = Math.floor(w * 1.4);
  const maxH = vh - 150; // leave room for the controls
  if (h > maxH) {
    h = Math.max(380, Math.floor(maxH));
    w = Math.floor(h / 1.4);
  }
  return { w, h };
}

function usePageSize() {
  const [size, setSize] = useState(computePageSize);
  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setSize(computePageSize()), 250); // debounce
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return size;
}

/* ---------- text -> pages ----------
   Fills each page with as many words as fit, by measuring real rendered
   height in a hidden element that has the exact same font/width as a page.
   Binary search keeps it fast even for long books. */
function normalise(text) {
  return text
    .replace(/\r\n/g, "\n")
    // PDFs/TXT often hard-wrap lines: join single line breaks, keep blank lines
    .replace(/(?<!\n)\n(?!\n)/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function paginate(rawText, pageW, pageH) {
  const tokens = normalise(rawText).split(/(\s+)/); // keeps spaces/newlines as tokens
  const probe = document.createElement("div");
  probe.className = "page-text probe";
  probe.lang = "en";
  probe.style.width = `${pageW - PAD_X * 2}px`;
  document.body.appendChild(probe);

  const maxHeight = pageH - PAD_TOP - FOOTER - SAFETY;
  const pages = [];
  let i = 0;

  while (i < tokens.length) {
    while (i < tokens.length && /^\s+$/.test(tokens[i])) i++; // no blank lines at page top
    if (i >= tokens.length) break;

    let lo = 1;
    let hi = Math.min(tokens.length - i, 1500);
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      probe.textContent = tokens.slice(i, i + mid).join("");
      if (probe.scrollHeight <= maxHeight) lo = mid;
      else hi = mid - 1;
    }
    pages.push(tokens.slice(i, i + lo).join("").trimEnd());
    i += lo;
  }

  document.body.removeChild(probe);
  return pages;
}

/* ---------- page components (react-pageflip needs forwardRef) ---------- */
const Cover = React.forwardRef(({ title, author, back }, ref) => (
  <div className={`page cover ${back ? "back" : "front"}`} ref={ref} data-density="hard">
    {!back && (
      <>
        <h1 className="cover-title">{title}</h1>
        <p className="cover-author">{author}</p>
      </>
    )}
  </div>
));

const Page = React.forwardRef(({ children, number, side }, ref) => (
  <div className={`page ${side}`} ref={ref}>
    <div className="page-text" lang="en">
      {children}
    </div>
    <div className="page-num">{number}</div>
  </div>
));

/* ---------- main component ---------- */
export default function BookReader({
  title = "Untitled",
  author = "",
  text = "",
  startPercent = 0,
  onProgress,
  onClose, // added onClose prop
}) {
  const { w, h } = usePageSize();
  const bookRef = useRef(null);
  const [pages, setPages] = useState(null); // null = still preparing
  const [current, setCurrent] = useState(0);

  // (Re)paginate when the text or page size changes
  useEffect(() => {
    let cancelled = false;
    setPages(null);
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      // setTimeout lets the "Preparing book…" message paint first
      setTimeout(() => {
        if (!cancelled) setPages(paginate(text, w, h));
      }, 0);
    });
    return () => {
      cancelled = true;
    };
  }, [text, w, h]);

  // Cover + content + back cover; content count must be even so the back cover sits alone
  const content = useMemo(() => {
    if (!pages) return null;
    const p = [...pages];
    if (p.length % 2 === 1) p.push("");
    return p;
  }, [pages]);

  const totalLeaves = content ? content.length + 2 : 0;
  const startPage = content
    ? Math.min(totalLeaves - 1, Math.max(0, Math.round(startPercent * (totalLeaves - 1))))
    : 0;

  const handleFlip = useCallback(
    (e) => {
      setCurrent(e.data);
      onProgress?.({
        page: e.data,
        total: totalLeaves,
        percent: totalLeaves > 1 ? e.data / (totalLeaves - 1) : 0,
      });
    },
    [onProgress, totalLeaves]
  );

  const next = () => bookRef.current?.pageFlip().flipNext();
  const prev = () => bookRef.current?.pageFlip().flipPrev();

  // Arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!content) return <div className="reader-status">Preparing book…</div>;

  return (
    <div className="reader">
      <div style={{ alignSelf: 'flex-start', marginLeft: '24px' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', fontSize: '16px' }}>← Back</button>
      </div>
      <HTMLFlipBook
        key={`${w}x${h}-${content.length}`} // remount cleanly after a re-pagination
        ref={bookRef}
        className="book"
        width={w}
        height={h}
        size="fixed"
        showCover
        drawShadow
        maxShadowOpacity={0.5}
        flippingTime={900}
        usePortrait
        startPage={startPage}
        mobileScrollSupport={false}
        onFlip={handleFlip}
      >
        <Cover title={title} author={author} />
        {content.map((chunk, i) => (
          // leaf 0 is the cover, so content page i is leaf i+1 (odd = left page)
          <Page key={i} number={i + 1} side={(i + 1) % 2 === 1 ? "left" : "right"}>
            {chunk}
          </Page>
        ))}
        <Cover back />
      </HTMLFlipBook>

      <div className="reader-controls">
        <button type="button" onClick={prev} disabled={current === 0}>
          Previous page
        </button>
        <span>
          {current === 0 ? "Cover" : `Page ${Math.min(current, content.length)} of ${content.length}`}
        </span>
        <button type="button" onClick={next} disabled={current >= totalLeaves - 1}>
          Turn page
        </button>
      </div>
    </div>
  );
}
