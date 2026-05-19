// ════════════════════════════════════════════
// 阅读档案 DRPS — Screens
// ════════════════════════════════════════════

const { useState, useMemo } = React;

// ─────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────
function HomeScreen({ nav, layoutVariant }) {
  const u = window.USER;
  const today = new Date(2026, 4, 19); // May 19, 2026
  const dateStr = `${today.getFullYear()}.${String(today.getMonth()+1).padStart(2,'0')}.${String(today.getDate()).padStart(2,'0')}`;
  const dayCn = ['日','一','二','三','四','五','六'][today.getDay()];
  const hour = today.getHours();
  const greet = hour < 11 ? '晨光好' : hour < 14 ? '午安' : hour < 18 ? '午后好' : '晚来风';

  const [statSheet, setStatSheet] = useState(null);
  const openStat = (kind) => setStatSheet(kind);
  const closeStat = () => setStatSheet(null);

  const reading = window.SHELF.reading.map((s) => ({ ...s, book: window.BOOKS.find((b) => b.id === s.bookId) }));

  // Recent reflections — most recent few
  const allRefs = [];
  Object.entries(window.REFLECTIONS).forEach(([bid, list]) => {
    list.forEach((r) => allRefs.push({ ...r, bookId: bid, book: window.BOOKS.find((b) => b.id === bid) }));
  });
  allRefs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const latestRef = allRefs[0];

  // Recommended next read — first wishlist
  const recoBook = window.BOOKS.find((b) => b.id === window.SHELF.wishlist[0]);

  return (
    <div className="dr-screen">
      <Masthead
        left="No. 072"
        center="读 · 迹"
        right={`${dateStr} 周${dayCn}`}
      />

      {/* Hero greeting */}
      <div className="hero">
        <div className="eyebrow">
          <span>Reading Portfolio</span>
          <span className="dash" />
          <span className="cn">立夏 · 第 七十二 天</span>
        </div>
        <div className="name">
          <span className="em">{greet},</span>{u.name}
        </div>
        <div className="pull">
          “一日不读书，胸臆无佳想；一月不读书，耳目失精爽。”
        </div>
      </div>

      {/* Streak ribbon */}
      <div className="streak">
        <div>
          <div className="big num-em">{u.streak}<span className="unit">日</span></div>
          <div className="lbl">连读不辍</div>
          <div className="en">Reading streak</div>
        </div>
        <div className="dots" aria-hidden>
          {window.ACTIVITY_28.slice(-14).map((v, i) => (
            <div key={i} className={`d ${v ? 'on' : ''} ${i === 13 ? 'today' : ''}`} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="s" onClick={() => openStat('finished')} style={{cursor:'pointer'}}>
          <div className="n num-em">{u.finished}<sup>/ {u.goal}</sup></div>
          <div className="l">读完 · 学期</div>
        </div>
        <div className="s" onClick={() => openStat('reading')} style={{cursor:'pointer'}}>
          <div className="n num-em">{u.reading}</div>
          <div className="l">在读</div>
        </div>
        <div className="s" onClick={() => openStat('quotes')} style={{cursor:'pointer'}}>
          <div className="n num-em">{u.quotesCount}</div>
          <div className="l">金句</div>
        </div>
        <div className="s" onClick={() => openStat('reflections')} style={{cursor:'pointer'}}>
          <div className="n num-em">{u.reflectionsCount}</div>
          <div className="l">反思</div>
        </div>
      </div>

      {/* Currently reading */}
      <SectionHead cn="正在读" en="Currently Reading" num={`Ⅰ · ${reading.length} 本`} />
      <div className="scroll-x" style={{ paddingLeft: 22, paddingRight: 22 }}>
        {reading.map((r) => (
          <div key={r.bookId} className="cr-card" onClick={() => nav('book', r.bookId)}>
            <BookCover book={r.book} size="md" />
            <div className="body">
              <div className="form-label">{window.LEVELS.find(l=>l.id===r.book.level).en}</div>
              <div className="cn">{r.book.cn}</div>
              <div className="en">{r.book.en}</div>
              <div style={{flex: 1}} />
              <div className="ch">第 {r.chapter} 章 · {r.book.chapters[r.chapter-1]?.t.split(' · ')[1] || ''}</div>
              <div className="prog-text">{r.progress}%</div>
              <div className="barline"><i style={{ width: `${r.progress}%` }} /></div>
            </div>
          </div>
        ))}
      </div>

      {/* Reading journey preview */}
      <SectionHead cn="阅读旅程" en="Your Reading Path" num="Ⅱ" />
      <div style={{ padding: '0 22px' }}>
        <div
          onClick={() => nav('journey')}
          style={{
            background: 'var(--paper-soft)',
            border: '0.5px solid var(--paper-deep)',
            borderRadius: 'var(--r)',
            padding: '16px 18px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <JourneyPreview />
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 14, paddingTop: 12, borderTop: '0.5px solid var(--paper-deep)',
            gap: 12,
          }}>
            <div style={{minWidth:0, flex:1}}>
              <div style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:13, color:'var(--ink)'}}>
                第 {u.finished + u.reading} 站 · 共 {u.goal} 站
              </div>
              <div style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:11, color:'var(--ink-3)', marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                Tap to walk the path →
              </div>
            </div>
            <div style={{flexShrink:0}}>
              <DotBar value={(u.finished/u.goal)*100} total={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Latest reflection (snippet) */}
      {latestRef && (
        <>
          <SectionHead cn="昨日所思" en="Yesterday's Reflection" num="Ⅲ" />
          <div style={{ padding: '0 22px' }}>
            <div className="quote-card" onClick={() => nav('book', latestRef.bookId)} style={{cursor:'pointer'}}>
              <div className="q">{latestRef.quote || latestRef.thinking}</div>
              <div className="src">
                <span>{latestRef.book.cn} · 第 {latestRef.idx + 1} 节</span>
                <span>{latestRef.date?.slice(5).replace('-','.')}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Recommended next read */}
      {recoBook && (
        <>
          <SectionHead cn="读完这本，试试" en="What to read next" num="Ⅳ" />
          <div style={{ padding: '0 22px 24px' }}>
            <div
              className="dr-card"
              onClick={() => nav('book', recoBook.id)}
              style={{ display: 'flex', gap: 14, cursor: 'pointer' }}
            >
              <BookCover book={recoBook} size="md" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <span className="t-en-up" style={{color:'var(--vermillion)'}}>Recommended</span>
                  <Tag level={recoBook.level}>{window.LEVELS.find(l=>l.id===recoBook.level).cn}</Tag>
                </div>
                <div style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:16, marginTop:6, color:'var(--ink)'}}>
                  {recoBook.cn}
                </div>
                <div style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:12, color:'var(--ink-3)', marginTop:2}}>
                  {recoBook.en}
                </div>
                <div style={{fontFamily:'var(--font-wenkai)', fontSize:12, color:'var(--ink-2)', marginTop:8, lineHeight:1.65, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
                  {recoBook.desc}
                </div>
                <div style={{display:'flex', gap:6, marginTop:10}}>
                  {recoBook.tags.map(t=> <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Stat detail sheet */}
      {statSheet && <StatSheet kind={statSheet} onClose={closeStat} nav={nav} />}
    </div>
  );
}

// Mini journey preview svg for home card
function JourneyPreview() {
  const finished = window.SHELF.finished.length;
  const reading = window.SHELF.reading.length;
  const total = window.USER.goal;
  const pts = [];
  for (let i = 0; i < total; i++) {
    const x = 4 + (i / (total - 1)) * 92;
    const y = 16 + Math.sin(i * 1.3) * 8;
    pts.push({ x, y, state: i < finished ? 'done' : i < finished + reading ? 'current' : 'future' });
  }
  const d = pts.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`).join(' ');
  return (
    <svg viewBox="0 0 100 36" style={{ width: '100%', height: 50 }} preserveAspectRatio="none">
      <path d={d} fill="none" stroke="var(--paper-deep)" strokeWidth="0.5" strokeDasharray="1 1" />
      <path d={d.split('L').slice(0, finished + reading + 1).join('L')} fill="none" stroke="var(--vermillion)" strokeWidth="0.8" strokeLinecap="round" />
      {pts.map((p, i) => (
        p.state === 'done' ? <circle key={i} cx={p.x} cy={p.y} r="1.6" fill="var(--vermillion)" /> :
        p.state === 'current' ? <circle key={i} cx={p.x} cy={p.y} r="2" fill="var(--paper)" stroke="var(--vermillion)" strokeWidth="0.8" /> :
        <circle key={i} cx={p.x} cy={p.y} r="1.2" fill="none" stroke="var(--paper-deep)" strokeWidth="0.5" strokeDasharray="0.6 0.6" />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────
// JOURNEY (full)
// ─────────────────────────────────────────────
function JourneyScreen({ nav }) {
  const u = window.USER;
  return (
    <div className="dr-screen">
      <Masthead left="Chapter Ⅱ" center="阅 读 旅 程" right={`${u.finished}/${u.goal}`} />
      <div style={{padding:'18px 22px 0'}}>
        <div style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:24, color:'var(--ink)', letterSpacing:'-0.005em'}}>
          沿着这条路<br />一本一本地往前走
        </div>
        <div style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:13, color:'var(--ink-3)', marginTop:6}}>
          Every book is a footprint on your path.
        </div>
      </div>

      <JourneyMap onBookOpen={(id) => nav('book', id)} />

      <div style={{padding:'0 22px 24px'}}>
        <div className="dr-card" style={{display:'flex', alignItems:'center', gap:14}}>
          <Stamp ch={`${u.streak}`} size="lg" />
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:14, color:'var(--ink)'}}>
              已连续阅读 {u.streak} 天
            </div>
            <div style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:11, color:'var(--ink-3)', marginTop:2}}>
              Keep going to unlock 〈卅日如一〉
            </div>
          </div>
          <div style={{
            fontFamily:'var(--font-en)', fontSize:11, color:'var(--vermillion)',
            letterSpacing:'0.1em',
          }}>
            +{30 - u.streak} 日
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// BOOKLIST
// ─────────────────────────────────────────────
function BooklistScreen({ nav }) {
  const [active, setActive] = useState('all');
  const onShelf = new Set([
    ...window.SHELF.finished.map(s=>s.bookId),
    ...window.SHELF.reading.map(s=>s.bookId),
    ...window.SHELF.wishlist,
  ]);

  const filtered = active === 'all' ? window.BOOKS : window.BOOKS.filter(b => b.level === active);
  const grouped = window.LEVELS.map(l => ({
    ...l,
    books: filtered.filter(b => b.level === l.id),
  })).filter(g => g.books.length);

  return (
    <div className="dr-screen">
      <Masthead left="Chapter Ⅲ" center="推 荐 书 单" right="30 卷" />
      <div style={{padding:'16px 22px 4px'}}>
        <div style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:22, color:'var(--ink)'}}>
          按级别选你的下一本书
        </div>
        <div style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:12, color:'var(--ink-3)', marginTop:4}}>
          IGCSE Chinese B · Curated reading paths
        </div>
      </div>

      {/* level filter chips */}
      <div className="scroll-x" style={{padding:'14px 22px 4px', gap:8}}>
        <FilterChip on={active==='all'} onClick={()=>setActive('all')} cn="全部" en="All" />
        {window.LEVELS.map(l => (
          <FilterChip key={l.id} on={active===l.id} onClick={()=>setActive(l.id)}
            cn={l.cn} en={l.en} level={l.id} />
        ))}
      </div>

      {grouped.map((g) => (
        <div key={g.id} className="bl-level-row">
          <div className="head">
            <div className="stamp-row">
              <Stamp ch={g.stamp} size="md" muted={false} />
              <div>
                <div className="level-label">{g.cn} <span style={{color:'var(--ink-3)', fontWeight:400, marginLeft:6}}>第 {g.short} 级</span></div>
                <div className="level-en">{g.en} <span style={{color:'var(--ink-4)'}}>· {g.subtitle}</span></div>
              </div>
            </div>
            <div className="level-sub">{g.books.length} BOOKS</div>
          </div>
          <div className="rule" />
          <div>
            {g.books.map((b) => (
              <div key={b.id} className="bl-row" onClick={() => nav('book', b.id)}>
                <BookCover book={b} size="md" />
                <div className="meta">
                  <div className="head-row">
                    <span className="n">№ {String(b.n).padStart(2,'0')}</span>
                    <div style={{flex:1}}>
                      <div className="cn">{b.cn}</div>
                      <div className="en">{b.en}</div>
                    </div>
                  </div>
                  <div className="desc">{b.desc}</div>
                  <div className="tag-row">
                    {b.tags.map(t => <Tag key={t}>{t}</Tag>)}
                    <span style={{flex:1}} />
                    {onShelf.has(b.id)
                      ? <span className="status-pill in-shelf">★ 已收录</span>
                      : <span className="status-pill">+ 加入</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FilterChip({ on, onClick, cn, en, level }) {
  const lvCls = level ? `lv-${level === 'breakthrough' ? 'b' : level.replace('level','')}` : '';
  return (
    <button
      onClick={onClick}
      style={{
        flex:'0 0 auto',
        padding:'6px 12px',
        background: on ? 'var(--ink)' : 'transparent',
        color: on ? 'var(--paper)' : 'var(--ink-2)',
        border: '0.5px solid ' + (on ? 'var(--ink)' : 'var(--paper-deep)'),
        borderRadius: 999,
        fontFamily:'var(--font-serif)',
        fontSize: 12, letterSpacing:'0.04em',
        display:'flex', alignItems:'center', gap:6,
        whiteSpace:'nowrap',
      }}
    >
      <span>{cn}</span>
      <span style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:10, opacity:0.7}}>{en}</span>
    </button>
  );
}

// ─────────────────────────────────────────────
// STAT DETAIL SHEET (bottom sheet)
// ─────────────────────────────────────────────
function StatSheet({ kind, onClose, nav }) {
  const titles = {
    finished:    { cn: '读完的书',  en: 'Finished books',       count: window.SHELF.finished.length },
    reading:     { cn: '正在读',    en: 'Currently reading',    count: window.SHELF.reading.length },
    quotes:      { cn: '金句墙',    en: 'Golden sentences',     count: window.USER.quotesCount },
    reflections: { cn: '反思记录',  en: 'Reflection entries',   count: window.USER.reflectionsCount },
  }[kind];

  // Build content per kind
  let content = null;
  if (kind === 'finished') {
    const items = window.SHELF.finished
      .slice().reverse()
      .map((s) => ({ ...s, book: window.BOOKS.find((b) => b.id === s.bookId) }));
    content = (
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {items.map((it, i) => (
          <div key={i} className="dr-card" style={{display:'flex', gap:14, cursor:'pointer', padding:12}}
               onClick={() => { onClose(); nav('book', it.bookId); }}>
            <BookCover book={it.book} size="md" />
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:6}}>
                <Tag level={it.book.level}>{window.LEVELS.find(l => l.id === it.book.level).cn}</Tag>
                <Stars n={it.stars} />
              </div>
              <div style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:15, color:'var(--ink)', marginTop:6}}>
                {it.book.cn}
              </div>
              <div style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:11, color:'var(--ink-3)', marginTop:2}}>
                {it.book.en}
              </div>
              <div style={{fontFamily:'var(--font-en)', fontSize:11, color:'var(--vermillion)', marginTop:8, letterSpacing:'0.1em'}}>
                ✓ {it.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (kind === 'reading') {
    const items = window.SHELF.reading.map((s) => ({ ...s, book: window.BOOKS.find((b) => b.id === s.bookId) }));
    content = (
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {items.map((it, i) => (
          <div key={i} className="dr-card" style={{display:'flex', gap:14, cursor:'pointer', padding:12}}
               onClick={() => { onClose(); nav('book', it.bookId); }}>
            <BookCover book={it.book} size="md" />
            <div style={{flex:1, minWidth:0}}>
              <Tag level={it.book.level}>{window.LEVELS.find(l => l.id === it.book.level).cn}</Tag>
              <div style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:15, color:'var(--ink)', marginTop:6}}>
                {it.book.cn}
              </div>
              <div style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:11, color:'var(--ink-3)', marginTop:2}}>
                {it.book.en}
              </div>
              <div style={{fontFamily:'var(--font-wenkai)', fontSize:11.5, color:'var(--ink-2)', marginTop:8}}>
                第 {it.chapter} 章 · {it.book.chapters[it.chapter-1]?.t.split(' · ')[1] || it.book.chapters[it.chapter-1]?.t}
              </div>
              <div style={{display:'flex', alignItems:'center', gap:8, marginTop:8}}>
                <div style={{flex:1, height:2, background:'var(--paper-3)', borderRadius:1}}>
                  <div style={{width: `${it.progress}%`, height:'100%', background:'var(--vermillion)'}} />
                </div>
                <span style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:11, color:'var(--vermillion)'}}>{it.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (kind === 'quotes') {
    const quotes = [];
    Object.entries(window.REFLECTIONS).forEach(([bid, list]) => {
      list.forEach((r) => {
        if (r.quote) quotes.push({ ...r, bookId: bid, book: window.BOOKS.find((b) => b.id === bid) });
      });
    });
    content = (
      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        {quotes.length === 0 && (
          <div style={{textAlign:'center', padding:'32px 0', fontFamily:'var(--font-en)', fontStyle:'italic', color:'var(--ink-3)'}}>
            No quotes yet.
          </div>
        )}
        {quotes.map((q, i) => (
          <div key={i} className="quote-card" style={{cursor:'pointer'}}
               onClick={() => { onClose(); nav('book', q.bookId); }}>
            <div className="q">{q.quote}</div>
            <div className="src">
              <span>{q.book.cn}{q.type === 'chapter' ? ` · 第 ${q.idx + 1} 节` : ''}</span>
              <span>{q.date?.slice(5).replace('-','.')}</span>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (kind === 'reflections') {
    const refs = [];
    Object.entries(window.REFLECTIONS).forEach(([bid, list]) => {
      list.forEach((r) => refs.push({ ...r, bookId: bid, book: window.BOOKS.find((b) => b.id === bid) }));
    });
    refs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    content = (
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {refs.map((r, i) => (
          <div key={i} className="dr-card" style={{padding:14, cursor:'pointer'}}
               onClick={() => { onClose(); nav('book', r.bookId); }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
              <div style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:13, color:'var(--ink)'}}>
                {r.book.cn} {r.type === 'chapter' ? `· 第 ${r.idx + 1} 节` : '· 随笔'}
              </div>
              <div style={{fontFamily:'var(--font-en)', fontSize:10, color:'var(--ink-3)', letterSpacing:'0.1em'}}>
                {r.date?.slice(5).replace('-','.')} · {r.mood}
              </div>
            </div>
            {r.quote && (
              <div style={{fontFamily:'var(--font-wenkai)', fontStyle:'italic', fontSize:12.5, color:'var(--ink-2)', marginTop:8, paddingLeft:10, borderLeft:'2px solid var(--vermillion)'}}>
                「{r.quote}」
              </div>
            )}
            {r.thinking && (
              <div style={{fontFamily:'var(--font-wenkai)', fontSize:12.5, color:'var(--ink-2)', marginTop:8, lineHeight:1.7}}>
                {r.thinking}
              </div>
            )}
            {r.stars && <div style={{marginTop:8}}><Stars n={r.stars} /></div>}
          </div>
        ))}
      </div>
    );
  }

  return ReactDOM.createPortal((
    <div className="rf-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="rf-modal" onClick={(e) => e.stopPropagation()} style={{height: '85%'}}>
        <div className="handle" />
        <div className="rf-head">
          <div>
            <div className="src">{titles.en} · {titles.count}</div>
            <div className="ch">{titles.cn}</div>
          </div>
          <button className="close" onClick={onClose}>×</button>
        </div>
        <div className="rf-body" style={{paddingTop:14}}>
          {content}
        </div>
      </div>
    </div>
  ), document.querySelector('.phone-screen') || document.body);
}

// ─────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────
function ProfileScreen({ nav }) {
  const u = window.USER;
  const earned = window.BADGES.filter(b=>b.earned);
  const locked = window.BADGES.filter(b=>!b.earned);

  // All quotes
  const quotes = [];
  Object.entries(window.REFLECTIONS).forEach(([bid, list]) => {
    list.forEach((r) => {
      if (r.quote) quotes.push({ ...r, bookId: bid, book: window.BOOKS.find((b) => b.id === bid) });
    });
  });

  return (
    <div className="dr-screen">
      <Masthead left="Chapter Ⅳ" center="我 的 读 迹" right={u.grade} />
      <div className="pf-head">
        <div className="pf-avatar">{u.name[0]}</div>
        <div className="info">
          <div className="nm">{u.name}</div>
          <div className="en">Reading Portfolio · {u.grade}</div>
          <div className="grade">Joined {u.startedDays} days ago · Y10</div>
        </div>
      </div>

      {/* Big stats */}
      <div style={{padding:'0 22px', marginTop: 6}}>
        <div className="dr-card" style={{padding:'18px 18px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <span style={{fontFamily:'var(--font-serif)', fontWeight:600, fontSize:14, color:'var(--ink)'}}>2026 春季学期</span>
            <span style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:11, color:'var(--ink-3)'}}>Spring 2026</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginTop:14}}>
            <BigStat n={u.finished} of={u.goal} cn="读完" en="Read" />
            <BigStat n={u.pagesRead} cn="页数" en="Pages" />
            <BigStat n={u.streak} cn="连读日" en="Streak" />
          </div>
          <div style={{marginTop:14, paddingTop:12, borderTop:'0.5px dashed var(--paper-deep)'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:6}}>
              <span style={{fontFamily:'var(--font-wenkai)', fontSize:12, color:'var(--ink-3)'}}>学期目标进度</span>
              <span style={{fontFamily:'var(--font-en)', fontSize:11, color:'var(--vermillion)'}}>{Math.round(u.finished/u.goal*100)}%</span>
            </div>
            <DotBar value={u.finished/u.goal*100} total={20} />
          </div>
        </div>
      </div>

      {/* Badges */}
      <SectionHead cn="集印册" en="Badges Collected" num={`${earned.length}/${window.BADGES.length}`} />
      <div className="badges-grid">
        {earned.map(b => (
          <div key={b.id} className="badge">
            <Stamp ch={b.stamp} size="md" />
            <div className="nm">{b.cn}</div>
            <div className="en">{b.en}</div>
          </div>
        ))}
        {locked.slice(0, 4).map(b => (
          <div key={b.id} className="badge locked">
            <Stamp ch={b.stamp} size="md" muted />
            <div className="nm">{b.cn}</div>
            <div className="en">{b.en}</div>
          </div>
        ))}
      </div>

      {/* Quote wall */}
      <SectionHead cn="金句墙" en="Golden Sentences" num={`${quotes.length} 句`} />
      <div className="qw-grid">
        {quotes.slice(0, 4).map((q, i) => (
          <div key={i} className="quote-card">
            <div className="q">{q.quote}</div>
            <div className="src">
              <span>《{q.book.cn.replace(/[《》]/g,'')}》</span>
              <span>{q.date?.slice(5).replace('-','.')}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{padding:'8px 22px 24px', textAlign:'center'}}>
        <div style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:11, color:'var(--ink-4)', letterSpacing:'0.1em'}}>
          — fin. —
        </div>
      </div>
    </div>
  );
}

function BigStat({ n, of, cn, en }) {
  return (
    <div>
      <div style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:28, color:'var(--ink)', lineHeight:1}} className="num-em">
        {n}{of && <sup style={{fontSize:12, fontWeight:400, color:'var(--ink-3)', marginLeft:2}}> / {of}</sup>}
      </div>
      <div style={{fontFamily:'var(--font-wenkai)', fontSize:11, color:'var(--ink-3)', marginTop:4}}>
        {cn} <span style={{fontFamily:'var(--font-en)', fontStyle:'italic', marginLeft:3, opacity:0.7}}>{en}</span>
      </div>
    </div>
  );
}

Object.assign(window, {
  HomeScreen, JourneyScreen, BooklistScreen, ProfileScreen,
});
