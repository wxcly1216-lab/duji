// ════════════════════════════════════════════
// 阅读档案 DRPS — Book Detail + Reflection Modal
// ════════════════════════════════════════════

const { useState: useStateBD, useEffect: useEffectBD } = React;

// ─────────────────────────────────────────────
// BOOK DETAIL
// ─────────────────────────────────────────────
function BookDetailScreen({ nav, bookId, onOpenReflect }) {
  const book = window.BOOKS.find(b => b.id === bookId);
  if (!book) return null;
  const level = window.LEVELS.find(l => l.id === book.level);

  // figure out shelf state
  const finishedEntry = window.SHELF.finished.find(s => s.bookId === bookId);
  const readingEntry = window.SHELF.reading.find(s => s.bookId === bookId);
  const onWishlist = window.SHELF.wishlist.includes(bookId);

  const reflections = window.REFLECTIONS[bookId] || [];
  const refByChapter = {};
  reflections.forEach(r => {
    if (r.type === 'chapter') refByChapter[r.idx] = r;
  });
  const studentReflections = reflections.filter(r => r.type === 'student');

  const currentChapter = readingEntry?.chapter || (finishedEntry ? book.chapters.length : 0);

  // status pill
  const statusLabel = finishedEntry ? '已读完' : readingEntry ? `在读 · ${readingEntry.progress}%` : onWishlist ? '想读' : '未开始';
  const statusColor = finishedEntry ? 'var(--sage)' : readingEntry ? 'var(--vermillion)' : onWishlist ? 'var(--gold)' : 'var(--ink-3)';

  return (
    <div className="dr-screen">
      <Masthead left={<button onClick={() => nav('back')} style={{color:'var(--ink-2)', fontFamily:'var(--font-serif)', fontSize:11, letterSpacing:'0.1em'}}>‹ 返回</button>}
        center={`№ ${String(book.n).padStart(2,'0')}`}
        right={level.short} />

      {/* Hero */}
      <div className="bd-hero">
        <BookCover book={book} size="lg" />
        <div className="meta">
          <div className="label-row">
            <Tag level={book.level}>{level.cn}</Tag>
            <span style={{fontFamily:'var(--font-en)', fontSize:10, color: statusColor, letterSpacing:'0.12em', textTransform:'uppercase'}}>● {statusLabel}</span>
          </div>
          <div className="cn">{book.cn}</div>
          <div className="en">{book.en}</div>
          <div className="series">{book.series} · {book.form}</div>
        </div>
      </div>

      <div className="bd-tags">
        {book.tags.map(t => <Tag key={t}>{t}</Tag>)}
        <Tag>{book.form}</Tag>
        <Tag>{book.mood}</Tag>
      </div>

      <div className="bd-desc">{book.desc}</div>

      {/* progress + actions */}
      <div style={{padding:'14px 22px 0'}}>
        <div className="dr-card" style={{display:'flex', alignItems:'center', gap:14, padding:'14px 16px'}}>
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--font-en)', fontSize:10, color:'var(--ink-3)', letterSpacing:'0.18em', textTransform:'uppercase'}}>Progress</div>
            <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:2}}>
              <span style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:22, color:'var(--ink)'}} className="num-em">
                {readingEntry ? readingEntry.progress : finishedEntry ? 100 : 0}<span style={{fontSize:13, fontWeight:400, color:'var(--ink-3)', marginLeft:2}}>%</span>
              </span>
              <span style={{fontFamily:'var(--font-wenkai)', fontSize:12, color:'var(--ink-3)'}}>
                · 第 {currentChapter} / {book.chapters.length} 章
              </span>
            </div>
            <div style={{marginTop:8}}>
              <DotBar value={readingEntry ? readingEntry.progress : finishedEntry ? 100 : 0} total={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Chapter list (reading journey within book) */}
      <SectionHead cn="章节路线" en="Chapter Checkpoints" num={`${book.chapters.length} 章`} />
      <div className="ch-list">
        {book.chapters.map((c, idx) => {
          const ref = refByChapter[idx];
          const done = idx < currentChapter || (finishedEntry && idx <= currentChapter);
          const isCurrent = idx === currentChapter - 1 && readingEntry;
          return (
            <div key={idx} className={`ch-item ${done ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
              <div className="num">
                <span>{String(idx + 1).padStart(2,'0')}</span>
                <div className="dot" />
                {idx < book.chapters.length - 1 && (
                  <div style={{
                    position:'absolute', left:'50%', top: 28, bottom: -14,
                    width: 1, background: 'var(--paper-deep)',
                    transform:'translateX(-50%)',
                  }} />
                )}
              </div>
              <div className="body">
                <div className="ct">{c.t}</div>
                <div className="ce">{c.e}</div>

                {ref ? (
                  <div className="preview" onClick={() => onOpenReflect(bookId, idx, 'view')}>
                    {ref.quote && <div className="q">「{ref.quote}」</div>}
                    {!ref.quote && ref.understanding && (
                      <div>{ref.understanding}</div>
                    )}
                    <div className="meta-row">
                      <span>{ref.date?.slice(5).replace('-','.')}</span>
                      <span>·</span>
                      <span>{ref.mood}</span>
                      {ref.stars && <span style={{marginLeft:'auto'}}><Stars n={ref.stars} /></span>}
                    </div>
                  </div>
                ) : isCurrent ? (
                  <button className="add-cta" onClick={() => onOpenReflect(bookId, idx, 'new')}>
                    ＋ 记录这一章的想法 <span style={{fontFamily:'var(--font-en)', fontStyle:'italic', color:'var(--ink-3)', marginLeft:4}}>Add reflection</span>
                  </button>
                ) : done ? (
                  <button className="add-cta" style={{color:'var(--ink-3)'}} onClick={() => onOpenReflect(bookId, idx, 'new')}>
                    ＋ 补一段反思
                  </button>
                ) : (
                  <div style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:11, color:'var(--ink-4)', marginTop:4}}>
                    Not yet
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* student-added free moments */}
        {studentReflections.length > 0 && (
          <>
            <div style={{margin:'18px 0 10px', borderTop:'0.5px dashed var(--paper-deep)', paddingTop:14}}>
              <div style={{fontFamily:'var(--font-en)', fontSize:10, color:'var(--gold)', letterSpacing:'0.2em', textTransform:'uppercase'}}>
                ✦ Free Moments · 你的随笔
              </div>
            </div>
            {studentReflections.map((r, i) => (
              <div key={i} className="ch-item">
                <div className="num">
                  <div className="dot" style={{background:'var(--gold)', border:'1.5px dashed var(--gold)'}} />
                </div>
                <div className="body">
                  <div className="ct">{r.label}</div>
                  <div className="preview" style={{borderLeftColor:'var(--gold)'}}>
                    {r.quote && <div className="q">{r.quote}</div>}
                    {r.thinking && <div>{r.thinking}</div>}
                    <div className="meta-row">
                      <span>{r.date?.slice(5).replace('-','.')}</span>
                      <span>·</span>
                      <span>{r.mood}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div style={{padding:'18px 22px 24px'}}>
        <button className="btn vermil" style={{width:'100%'}}
          onClick={() => onOpenReflect(bookId, currentChapter - 1, 'new')}
        >
          继续阅读 · 记录第 {Math.min(currentChapter, book.chapters.length)} 章
        </button>
        <div style={{display:'flex', gap:10, marginTop:10}}>
          <button className="btn outline sm" style={{flex:1}}>＋ 自由记录</button>
          <button className="btn ghost sm" style={{flex:1}}>移到「想读」</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// REFLECTION MODAL (step-by-step)
// ─────────────────────────────────────────────
function ReflectionModal({ ctx, onClose, onDone }) {
  const { bookId, chapterIdx, mode } = ctx;
  const book = window.BOOKS.find(b => b.id === bookId);
  const chapter = book?.chapters[chapterIdx];
  const existing = (window.REFLECTIONS[bookId] || []).find(r => r.idx === chapterIdx && r.type === 'chapter');

  const steps = window.REFLECT_STEPS;
  const [step, setStep] = useStateBD(0);
  const [data, setData] = useStateBD(() => {
    if (mode === 'view' && existing) {
      return {
        quote: existing.quote || '',
        understanding: existing.understanding || '',
        thinking: existing.thinking || '',
        feeling: existing.mood || '',
      };
    }
    return { quote: '', understanding: '', thinking: '', feeling: '' };
  });
  const [done, setDone] = useStateBD(false);

  if (!book) return null;

  const cur = steps[step];
  const isLast = step === steps.length - 1;

  function next() {
    if (isLast) {
      setDone(true);
      setTimeout(() => { onDone(data); }, 1300);
    } else setStep(step + 1);
  }
  function prev() { if (step > 0) setStep(step - 1); }
  function skip() {
    if (isLast) { setDone(true); setTimeout(() => onDone(data), 1300); }
    else setStep(step + 1);
  }

  return (
    <div className="rf-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="rf-modal" onClick={(e) => e.stopPropagation()}>
        <div className="handle" />
        <div className="rf-head">
          <div>
            <div className="src">{book.cn} · {book.en}</div>
            <div className="ch">{chapter?.t || '随笔'}</div>
          </div>
          <button className="close" onClick={onClose}>×</button>
        </div>
        <div className="rf-progress">
          {steps.map((s, i) => (
            <div key={i} className={`seg ${i < step ? 'done' : i === step ? 'active' : ''}`} />
          ))}
        </div>

        {!done ? (
          <>
            <div className="rf-body">
              <div className="step-num">第 {String(step+1).padStart(2,'0')} 步 · {cur.title}</div>
              <div className="step-title">{cur.title}</div>
              <div className="step-en">— {cur.en}</div>
              <div className="step-q">{cur.q}</div>
              {cur.hint && <div className="step-hint">{cur.hint}</div>}

              {cur.type === 'input' && (
                <input
                  className="rf-input"
                  placeholder="例：地球老师很严肃，可是火星老师笑起来眼睛会变成两道弯弯的光。"
                  value={data[cur.key]}
                  onChange={(e) => setData({...data, [cur.key]: e.target.value})}
                />
              )}
              {cur.type === 'textarea' && (
                <textarea
                  className="rf-textarea"
                  placeholder="用中文写下你的想法，两三句就好……"
                  value={data[cur.key]}
                  onChange={(e) => setData({...data, [cur.key]: e.target.value})}
                />
              )}
              {cur.type === 'mood' && (
                <div className="rf-mood-row">
                  {window.MOODS.map((m) => (
                    <button
                      key={m.emoji}
                      className={`rf-mood-btn ${data.feeling === m.emoji ? 'selected' : ''}`}
                      onClick={() => setData({...data, feeling: m.emoji})}
                    >
                      <span className="em">{m.emoji}</span>
                      <span className="lb">{m.cn}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="rf-foot">
              <div className="ct">第 {step+1} / {steps.length} 步</div>
              <div className="acts">
                {cur.optional && (
                  <button className="btn ghost sm" onClick={skip}>跳过</button>
                )}
                {step > 0 && (
                  <button className="btn outline sm" onClick={prev}>‹ 上一步</button>
                )}
                <button className="btn primary sm" onClick={next}>
                  {isLast ? '完成 ✓' : '下一步 ›'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{padding:'48px 22px 60px', textAlign:'center'}}>
            <div style={{display:'flex', justifyContent:'center', marginBottom:18}}>
              <Stamp ch="存" size="lg" />
            </div>
            <div style={{fontFamily:'var(--font-serif)', fontWeight:700, fontSize:22, color:'var(--ink)'}}>
              这一节，存好了
            </div>
            <div style={{fontFamily:'var(--font-en)', fontStyle:'italic', fontSize:14, color:'var(--ink-3)', marginTop:6}}>
              Your reflection is saved.
            </div>
            <div style={{marginTop:24, fontFamily:'var(--font-wenkai)', fontSize:13, color:'var(--ink-2)', lineHeight:1.7}}>
              你已经为这本书留下 {(window.REFLECTIONS[bookId]?.length || 0) + 1} 条记录。
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { BookDetailScreen, ReflectionModal });
