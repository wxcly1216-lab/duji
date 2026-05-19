// ════════════════════════════════════════════
// 阅读档案 DRPS — Journey Map (横向旅程)
// ════════════════════════════════════════════

function JourneyMap({ onBookOpen }) {
  // Build the linear list of nodes from SHELF.finished + SHELF.reading
  const finished = window.SHELF.finished.map((s, i) => {
    const book = window.BOOKS.find((b) => b.id === s.bookId);
    return { ...s, book, state: 'done', label: `第 ${i + 1} 本`, en: `Book ${i + 1}` };
  });
  const reading = window.SHELF.reading.map((s, i) => {
    const book = window.BOOKS.find((b) => b.id === s.bookId);
    const n = finished.length + i + 1;
    return { ...s, book, state: i === 0 ? 'current' : 'reading', label: `第 ${n} 本`, en: `Book ${n}` };
  });
  const nodes = [...finished, ...reading];
  const future = [
    { label: '下一本', en: 'Next', state: 'future' },
    { label: '远方', en: 'Horizon', state: 'far' },
  ];
  const allNodes = [...nodes, ...future];

  // Layout: zigzag — 4 cols × N rows, snake order
  const COLS = 4;
  const COL_W = 78;
  const ROW_H = 130;
  const PAD_X = 28;
  const PAD_Y = 24;
  const rows = Math.ceil(allNodes.length / COLS);
  const width = PAD_X * 2 + (COLS - 1) * COL_W + 64;
  const height = PAD_Y * 2 + (rows - 1) * ROW_H + 110;

  // Position of node i — snake left→right then right→left
  function posOf(i) {
    const row = Math.floor(i / COLS);
    const colInRow = i % COLS;
    const col = row % 2 === 0 ? colInRow : COLS - 1 - colInRow;
    return {
      x: PAD_X + col * COL_W + 24,
      y: PAD_Y + row * ROW_H + 30,
    };
  }

  // Build a meandering path using cubic curves
  let pathD = '';
  for (let i = 0; i < allNodes.length; i++) {
    const p = posOf(i);
    if (i === 0) {
      pathD += `M ${p.x} ${p.y}`;
    } else {
      const prev = posOf(i - 1);
      // Control points for a natural curve
      const midY = (prev.y + p.y) / 2;
      const sameRow = Math.abs(prev.y - p.y) < 1;
      if (sameRow) {
        const mx = (prev.x + p.x) / 2;
        pathD += ` Q ${mx} ${prev.y - 18}, ${p.x} ${p.y}`;
      } else {
        // horizontal then vertical curve
        pathD += ` C ${prev.x + (p.x - prev.x) * 0.4} ${prev.y}, ${p.x - (p.x - prev.x) * 0.4} ${p.y}, ${p.x} ${p.y}`;
      }
    }
  }

  return (
    <div className="journey-wrap">
      <div className="journey-canvas">
        <div className="grain" />
        <div className="layers" style={{ position: 'relative' }}>
          <svg
            width={width} height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{ display: 'block' }}
          >
            {/* Background grid ornament — small dots */}
            <defs>
              <pattern id="grid-dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="7" cy="7" r="0.5" fill="rgba(112,90,60,0.18)" />
              </pattern>
              <filter id="ink" x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
                <feDisplacementMap in="SourceGraphic" scale="0.6" />
              </filter>
            </defs>
            <rect width={width} height={height} fill="url(#grid-dots)" />

            {/* Path — dashed shadow + solid */}
            <path d={pathD} fill="none" stroke="rgba(112,90,60,0.32)" strokeWidth="0.8" strokeDasharray="3 3" />
            <path d={pathD} fill="none" stroke="var(--vermillion)"
              strokeWidth="1.2" strokeDasharray="0 0" strokeLinecap="round"
              filter="url(#ink)"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 0,
              }}
            />

            {/* Stop dots for future nodes (after current) */}
            {allNodes.map((n, i) => {
              const p = posOf(i);
              if (n.state === 'done') return null;
              if (n.state === 'current') return null;
              return (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5" fill="var(--paper-2)" stroke="var(--paper-deep)" strokeWidth="0.8" strokeDasharray="2 2" />
                </g>
              );
            })}
          </svg>

          {/* Nodes (overlaid as DOM) */}
          {allNodes.map((n, i) => {
            const p = posOf(i);
            const isBook = !!n.book;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: p.x, top: p.y,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'auto',
                }}
              >
                {isBook && n.state === 'done' && (
                  <div
                    onClick={() => onBookOpen(n.book.id)}
                    style={{ cursor: 'pointer', textAlign: 'center', width: 60 }}
                  >
                    <BookCover book={n.book} size="sm" />
                    <div style={{
                      fontFamily: 'var(--font-en)', fontSize: 9, color: 'var(--ink-3)',
                      letterSpacing: '0.1em', marginTop: 6, lineHeight: 1.2,
                    }}>
                      {n.date?.slice(5).replace('-', '.')}
                    </div>
                  </div>
                )}
                {isBook && n.state === 'current' && (
                  <div
                    onClick={() => onBookOpen(n.book.id)}
                    style={{ cursor: 'pointer', textAlign: 'center', width: 64 }}
                  >
                    <div style={{ position: 'relative' }}>
                      <BookCover book={n.book} size="sm" />
                      <div style={{
                        position: 'absolute', top: -6, right: -6,
                        background: 'var(--vermillion)', color: 'var(--paper)',
                        fontFamily: 'var(--font-serif)', fontWeight: 700,
                        fontSize: 9, padding: '2px 5px', borderRadius: 1,
                        letterSpacing: '0.05em',
                      }}>
                        在读
                      </div>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-en)', fontSize: 9, color: 'var(--vermillion)',
                      letterSpacing: '0.1em', marginTop: 6, fontStyle: 'italic',
                    }}>
                      {n.progress}%
                    </div>
                  </div>
                )}
                {isBook && n.state === 'reading' && (
                  <div
                    onClick={() => onBookOpen(n.book.id)}
                    style={{ cursor: 'pointer', textAlign: 'center', width: 60, opacity: 0.7 }}
                  >
                    <BookCover book={n.book} size="sm" />
                    <div style={{ fontFamily: 'var(--font-en)', fontSize: 9, color: 'var(--ink-3)', marginTop: 6 }}>
                      {n.progress}%
                    </div>
                  </div>
                )}
                {!isBook && (
                  <div style={{ textAlign: 'center', width: 64 }}>
                    <div style={{
                      width: 52, height: 74,
                      border: '1px dashed var(--paper-deep)',
                      borderRadius: '1px 3px 3px 1px',
                      background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-serif)', fontSize: 11, color: 'var(--ink-4)',
                      writingMode: 'vertical-rl', textOrientation: 'upright',
                    }}>
                      {n.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-en)', fontStyle: 'italic',
                      fontSize: 9, color: 'var(--ink-4)', marginTop: 6,
                    }}>
                      {n.en}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { JourneyMap });
