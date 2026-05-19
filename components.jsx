// ════════════════════════════════════════════
// 阅读档案 DRPS — Shared components
// ════════════════════════════════════════════

// ── Book cover (vertical Chinese title) ──────────────────────
function BookCover({ book, size = 'md', onClick, style = {} }) {
  const palette = window.COVER_PALETTES[book.level] || ['#7A8C5C'];
  const color = palette[book.cover % palette.length];
  const sizeCls = { lg: 'bc-lg', md: 'bc-md', sm: 'bc-sm' }[size] || 'bc-md';
  const lvShort = window.LEVELS.find((l) => l.id === book.level)?.short || '';

  // Show series initials at bottom
  const initials = (book.en || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 5);

  return (
    <div
      className={`book-cover ${sizeCls}`}
      style={{ background: color, flex: '0 0 auto', ...style }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <span className="bc-level">{lvShort}</span>
      <div className="bc-title">
        {book.cn
          .replace(/[《》「」]/g, '')
          .replace(/（.*?）/g, '')
          .replace(/[？！。，、：；·~]/g, '')
          .slice(0, 8)}
      </div>
      <div className="bc-foot">{initials}</div>
    </div>
  );
}

// ── Vermillion stamp / 印章 ──────────────────────
function Stamp({ ch, size = 'md', muted = false }) {
  const cls = `stamp ${size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : ''} ${muted ? 'muted' : ''}`;
  return <span className={cls}>{ch}</span>;
}

// ── Section header (ornament) ──────────────────────
function SectionHead({ cn, en, num }) {
  return (
    <div className="dr-sec-head">
      <div className="cn">{cn}</div>
      <div className="en">{en}</div>
      <div className="rule" />
      {num && <div className="num">{num}</div>}
    </div>
  );
}

// ── Page masthead ──────────────────────
function Masthead({ left, center, right }) {
  return (
    <div className="dr-masthead">
      <div className="mh-l">{left}</div>
      <div className="mh-c">{center}</div>
      <div className="mh-r">{right}</div>
    </div>
  );
}

// ── Tag chip ──────────────────────
function Tag({ children, level, solid }) {
  const lvCls = level ? `lv-${level === 'breakthrough' ? 'b' : level.replace('level', '')}` : '';
  return <span className={`tag ${lvCls} ${solid ? 'solid' : ''}`}>{children}</span>;
}

// ── Bottom tab bar ──────────────────────
function TabBar({ current, onNav }) {
  const tabs = [
    { id: 'home',     cn: '主页',   en: 'Home',    icon: 'home' },
    { id: 'journey',  cn: '阅读旅程', en: 'Journey', icon: 'path' },
    { id: 'booklist', cn: '书单',   en: 'Books',   icon: 'list' },
    { id: 'profile',  cn: '我的',   en: 'Self',    icon: 'self' },
  ];
  return (
    <nav className="dr-tabbar">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`tab ${current === t.id ? 'active' : ''}`}
          onClick={() => onNav(t.id)}
        >
          <TabIcon name={t.icon} active={current === t.id} />
          <span className="cn">{t.cn}</span>
          <span className="en">{t.en}</span>
        </button>
      ))}
    </nav>
  );
}

function TabIcon({ name, active }) {
  const stroke = active ? 'var(--vermillion)' : 'var(--ink-3)';
  const sw = 1.2;
  switch (name) {
    case 'home':
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw}>
          <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z" />
        </svg>
      );
    case 'path':
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw}>
          <path d="M3 18c3 0 3-12 6-12s3 12 6 12 3-9 6-9" />
          <circle cx="3" cy="18" r="1.3" fill={stroke} />
          <circle cx="21" cy="9" r="1.3" fill={stroke} />
        </svg>
      );
    case 'list':
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw}>
          <rect x="4" y="3" width="5" height="18" rx="0.5" />
          <rect x="10" y="5" width="5" height="16" rx="0.5" />
          <rect x="16" y="2" width="4" height="19" rx="0.5" />
        </svg>
      );
    case 'self':
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw}>
          <circle cx="12" cy="9" r="3.5" />
          <path d="M5 20c1-4 4-6 7-6s6 2 7 6" />
        </svg>
      );
    default:
      return null;
  }
}

// ── Dotted progress (book-page style) ──────────────────────
function DotBar({ value, total = 10 }) {
  const filled = Math.round((value / 100) * total);
  return (
    <div className="dotbar">
      {[...Array(total)].map((_, i) => (
        <span key={i} className={`d ${i < filled ? 'on' : ''}`} />
      ))}
    </div>
  );
}

// ── Star rating ──────────────────────
function Stars({ n = 0, total = 5 }) {
  return (
    <span style={{ color: 'var(--vermillion)', letterSpacing: '1px', fontSize: 11 }}>
      {[...Array(total)].map((_, i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0.25 }}>★</span>
      ))}
    </span>
  );
}

// ── Toast ──────────────────────
function Toast({ children, show }) {
  return (
    <div
      style={{
        position: 'absolute', bottom: 90, left: '50%', transform: 'translateX(-50%)',
        background: 'var(--ink)', color: 'var(--paper)',
        padding: '10px 18px', borderRadius: 'var(--r)',
        fontFamily: 'var(--font-serif)', fontSize: 13, letterSpacing: '0.05em',
        opacity: show ? 1 : 0, transition: 'opacity .25s',
        pointerEvents: 'none', zIndex: 300, whiteSpace: 'nowrap',
      }}
    >
      {children}
    </div>
  );
}

Object.assign(window, { BookCover, Stamp, SectionHead, Masthead, Tag, TabBar, DotBar, Stars, Toast });
