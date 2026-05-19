// ════════════════════════════════════════════
// 阅读档案 DRPS — Onboarding (新手引导)
// 4-step intro, can skip. Shown to first-time visitors.
// ════════════════════════════════════════════

const { useState: useStateOB, useEffect: useEffectOB } = React;

const OB_SEEN_KEY = 'drps_ob_seen_v1';

const OB_STEPS = [
  // 0. Welcome
  {
    eyebrow: 'Reading Portfolio System',
    title: '欢迎来到\n读迹',
    titleEn: 'A reading journey, one book at a time.',
    body: '「读迹」是为 IGCSE 中文二语学习者设计的数位阅读追踪系统。\n它把零散的阅读行为，连成一条可看见、可回望的路。',
    artwork: 'book',
  },
  // 1. 4 modules
  {
    eyebrow: 'How it works',
    title: '四个相扣的环节',
    titleEn: 'A metacognitive loop.',
    body: '从「选书」到「读」到「反思」到「回望」——每一步都被记录下来，\n变成属于你自己的阅读知识与节奏。',
    artwork: 'loop',
  },
  // 2. Journey + Stamps
  {
    eyebrow: 'Visual & Reflective',
    title: '旅程一目了然\n反思温柔贴心',
    titleEn: 'See your path. Save your thoughts.',
    body: '沿着一条横向的路，「选 · 读 · 摘 · 思 · 记」每一步都留下脚印；\n分步反思引导让记录变成一段轻盈的对话，而不是一份作业。',
    artwork: 'journey',
  },
  // 3. Try it
  {
    eyebrow: 'Try the Demo',
    title: '准备好了吗？',
    titleEn: 'Step into the demo, as 雪纯.',
    body: '接下来你将以学生「雪纯」的身份进入档案。\n她已经读完 5 本、正在读 3 本——你可以漫游每一个模块。',
    artwork: 'stamp',
  },
];

function Onboarding({ onDone }) {
  const [step, setStep] = useStateOB(0);
  const [closing, setClosing] = useStateOB(false);
  const cur = OB_STEPS[step];
  const total = OB_STEPS.length;
  const isLast = step === total - 1;

  function next() {
    if (isLast) finish();
    else setStep(step + 1);
  }
  function prev() { if (step > 0) setStep(step - 1); }
  function finish() {
    setClosing(true);
    setTimeout(() => onDone(), 380);
  }

  const portalTarget = document.querySelector('.phone-screen') || document.body;

  return ReactDOM.createPortal((
    <div className={`ob-overlay ${closing ? 'closing' : ''}`}>
      {/* paper grain */}
      <div className="ob-grain" />

      {/* top bar */}
      <div className="ob-top">
        <div className="ob-mark">
          <span style={{fontFamily:'var(--font-en)', fontSize:9, letterSpacing:'0.22em', color:'var(--ink-3)', textTransform:'uppercase'}}>
            DRPS · No. 072
          </span>
        </div>
        <button className="ob-skip" onClick={finish}>
          跳过 <span style={{fontFamily:'var(--font-en)', fontStyle:'italic', opacity:0.7, marginLeft:4}}>Skip</span>
        </button>
      </div>

      {/* artwork area */}
      <div className="ob-art" key={`art-${step}`}>
        <OBArtwork name={cur.artwork} />
      </div>

      {/* content */}
      <div className="ob-content" key={`content-${step}`}>
        <div className="ob-eyebrow">
          <span className="ob-eyebrow-dot" />
          {cur.eyebrow}
        </div>
        <div className="ob-title">{cur.title.split('\n').map((l, i) => <span key={i}>{l}{i < cur.title.split('\n').length - 1 && <br />}</span>)}</div>
        <div className="ob-title-en">— {cur.titleEn}</div>
        <div className="ob-body">{cur.body.split('\n').map((l, i) => <span key={i}>{l}{i < cur.body.split('\n').length - 1 && <br />}</span>)}</div>
      </div>

      {/* footer */}
      <div className="ob-foot">
        <div className="ob-dots">
          {OB_STEPS.map((_, i) => (
            <span key={i} className={`ob-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} />
          ))}
        </div>
        <div className="ob-actions">
          {step > 0 && (
            <button className="btn ghost sm" onClick={prev} style={{color:'var(--ink-2)'}}>
              ‹ 上一页
            </button>
          )}
          <button className="btn vermil" onClick={next}>
            {isLast ? (
              <>开始体验 <span style={{fontFamily:'var(--font-en)', fontStyle:'italic', marginLeft:4, opacity:0.85}}>Begin</span></>
            ) : (
              <>下一页 ›</>
            )}
          </button>
        </div>
      </div>
    </div>
  ), portalTarget);
}

// ── Illustrations (built from typography + geometry, no AI-slop SVGs) ──
function OBArtwork({ name }) {
  switch (name) {
    case 'book': return <OBBookArt />;
    case 'loop': return <OBLoopArt />;
    case 'journey': return <OBJourneyArt />;
    case 'stamp': return <OBStampArt />;
    default: return null;
  }
}

// 1. Open book / spine
function OBBookArt() {
  return (
    <div className="ob-art-inner">
      <svg viewBox="0 0 240 170" width="240" height="170">
        <defs>
          <pattern id="ob-paper" width="3" height="3" patternUnits="userSpaceOnUse">
            <rect width="3" height="3" fill="var(--paper-soft)" />
            <circle cx="1.5" cy="1.5" r="0.3" fill="rgba(60,40,20,0.08)" />
          </pattern>
        </defs>
        {/* dotted grid bg */}
        <g opacity="0.5">
          {[...Array(8)].map((_, i) => [...Array(11)].map((__, j) => (
            <circle key={`${i}-${j}`} cx={20 + j * 20} cy={20 + i * 18} r="0.6" fill="rgba(112,90,60,0.25)" />
          )))}
        </g>
        {/* book spread */}
        <g transform="translate(120 85)">
          {/* left page */}
          <rect x="-72" y="-50" width="70" height="100" fill="url(#ob-paper)" stroke="var(--paper-deep)" strokeWidth="0.5" />
          {/* right page */}
          <rect x="2" y="-50" width="70" height="100" fill="url(#ob-paper)" stroke="var(--paper-deep)" strokeWidth="0.5" />
          {/* spine */}
          <line x1="0" y1="-50" x2="0" y2="50" stroke="var(--ink-3)" strokeWidth="0.8" />
          {/* lines on left page */}
          {[...Array(6)].map((_, i) => (
            <line key={i} x1="-66" y1={-32 + i * 14} x2="-8" y2={-32 + i * 14} stroke="rgba(60,40,20,0.18)" strokeWidth="0.5" />
          ))}
          {/* vertical chinese title on right page */}
          <text x="38" y="-22" fontFamily="var(--font-serif)" fontSize="18" fontWeight="700" fill="var(--ink)" textAnchor="middle">读</text>
          <text x="38" y="0" fontFamily="var(--font-serif)" fontSize="18" fontWeight="700" fill="var(--ink)" textAnchor="middle">迹</text>
          {/* vermillion stamp on right page */}
          <g transform="translate(50 32)">
            <rect x="-9" y="-9" width="18" height="18" fill="var(--vermillion)" />
            <rect x="-7" y="-7" width="14" height="14" fill="none" stroke="var(--paper-soft)" strokeWidth="1" />
            <text x="0" y="3.5" fontFamily="var(--font-serif)" fontSize="10" fontWeight="700" fill="var(--paper-soft)" textAnchor="middle">读</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// 2. Loop — 4 modules connected in circle
function OBLoopArt() {
  const steps = [
    { cn: '计划', en: 'Plan',     stamp: '一' },
    { cn: '监控', en: 'Monitor',  stamp: '二' },
    { cn: '评估', en: 'Reflect',  stamp: '三' },
    { cn: '迭代', en: 'Iterate',  stamp: '四' },
  ];
  return (
    <div className="ob-art-inner">
      <svg viewBox="0 0 260 170" width="260" height="170">
        {/* center label */}
        <text x="130" y="82" fontFamily="var(--font-serif)" fontSize="11" fill="var(--ink-3)" textAnchor="middle" letterSpacing="2">元认知</text>
        <text x="130" y="98" fontFamily="var(--font-en)" fontSize="9" fontStyle="italic" fill="var(--ink-3)" textAnchor="middle">Metacognition</text>
        {/* circle path */}
        <circle cx="130" cy="85" r="58" fill="none" stroke="var(--vermillion)" strokeWidth="0.8" strokeDasharray="3 3" />
        {/* arrow heads */}
        {[0, 90, 180, 270].map((deg, i) => {
          const a = (deg - 45) * Math.PI / 180;
          const x = 130 + Math.cos(a) * 58;
          const y = 85 + Math.sin(a) * 58;
          return <circle key={i} cx={x} cy={y} r="2" fill="var(--vermillion)" />;
        })}
        {/* 4 stamps at cardinal points */}
        {steps.map((s, i) => {
          const a = (i * 90 - 90) * Math.PI / 180;
          const x = 130 + Math.cos(a) * 58;
          const y = 85 + Math.sin(a) * 58;
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect x="-13" y="-13" width="26" height="26" fill="var(--vermillion)" />
              <rect x="-10" y="-10" width="20" height="20" fill="none" stroke="var(--paper-soft)" strokeWidth="1" />
              <text x="0" y="4" fontFamily="var(--font-serif)" fontSize="14" fontWeight="700" fill="var(--paper-soft)" textAnchor="middle">{s.stamp}</text>
              <text x="0" y="26" fontFamily="var(--font-serif)" fontSize="11" fontWeight="600" fill="var(--ink)" textAnchor="middle">{s.cn}</text>
              <text x="0" y="38" fontFamily="var(--font-en)" fontSize="9" fontStyle="italic" fill="var(--ink-3)" textAnchor="middle">{s.en}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// 3. Journey snippet — richer illustrated map
// Shows the metacognitive ACTIONS at each station, not book names.
function OBJourneyArt() {
  // 9 stations: each one is a *verb* — an action in the reading journey
  const stations = [
    { x: 20,  y: 100, kind: 'verb', ch: '选',  en: 'choose', color: 'var(--lv-b)' },
    { x: 50,  y: 72,  kind: 'verb', ch: '读',  en: 'read',   color: 'var(--lv-b)' },
    { x: 80,  y: 100, kind: 'verb', ch: '摘',  en: 'mark',   color: 'var(--lv-b)' },
    { x: 110, y: 70,  kind: 'verb', ch: '思',  en: 'think',  color: 'var(--lv-1)' },
    { x: 142, y: 95,  kind: 'badge', stamp: '七' },        // streak stamp earned
    { x: 174, y: 70,  kind: 'verb', ch: '记',  en: 'record', color: 'var(--lv-1)' },
    { x: 204, y: 100, kind: 'current', ch: '续',  en: 'now', color: 'var(--vermillion)' },
    { x: 234, y: 75,  kind: 'future', ch: '远', en: 'next' },
    { x: 262, y: 100, kind: 'future', ch: '?',  en: '' },
  ];

  // smooth meandering path
  const d = stations.map((p, i) =>
    i === 0
      ? `M ${p.x} ${p.y}`
      : `Q ${(stations[i-1].x + p.x)/2} ${(stations[i-1].y + p.y)/2 - 14}, ${p.x} ${p.y}`
  ).join(' ');

  const currentIdx = stations.findIndex(s => s.kind === 'current');
  const walkedD = stations.slice(0, currentIdx + 1).map((p, i) =>
    i === 0
      ? `M ${p.x} ${p.y}`
      : `Q ${(stations[i-1].x + p.x)/2} ${(stations[i-1].y + p.y)/2 - 14}, ${p.x} ${p.y}`
  ).join(' ');

  return (
    <div className="ob-art-inner">
      <svg viewBox="0 0 280 170" width="280" height="170">
        <defs>
          <pattern id="ob-grid" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="0.55" fill="rgba(112,90,60,0.22)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="280" height="170" fill="url(#ob-grid)" />

        {/* compass rose */}
        <g transform="translate(18 22)">
          <circle cx="0" cy="0" r="8" fill="none" stroke="var(--ink-3)" strokeWidth="0.4" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="var(--ink-3)" strokeWidth="0.4" />
          <line x1="-8" y1="0" x2="8" y2="0" stroke="var(--ink-3)" strokeWidth="0.4" />
          <polygon points="0,-8 -2,-3 2,-3" fill="var(--vermillion)" />
          <text x="0" y="-11" fontFamily="var(--font-en)" fontSize="6" fill="var(--ink-3)" textAnchor="middle">N</text>
        </g>

        {/* map header */}
        <text x="262" y="20" fontFamily="var(--font-en)" fontSize="7" fill="var(--ink-3)" textAnchor="end" letterSpacing="1.5">JOURNEY · MAP</text>

        {/* faint full path */}
        <path d={d} fill="none" stroke="var(--paper-deep)" strokeWidth="0.6" strokeDasharray="1.5 2.5" />
        {/* walked portion */}
        <path d={walkedD} fill="none" stroke="var(--vermillion)" strokeWidth="1.3" strokeLinecap="round" />

        {/* render verb stations */}
        {stations.map((s, i) => {
          if (s.kind === 'verb') {
            return (
              <g key={i} transform={`translate(${s.x} ${s.y})`}>
                {/* circle dot */}
                <circle cx="0" cy="0" r="7" fill="var(--paper-soft)" stroke={s.color} strokeWidth="1" />
                <text x="0" y="3" fontFamily="var(--font-serif)" fontSize="9" fontWeight="700"
                      fill={s.color} textAnchor="middle">{s.ch}</text>
                <text x="0" y="18" fontFamily="var(--font-en)" fontStyle="italic" fontSize="6"
                      fill="var(--ink-3)" textAnchor="middle" letterSpacing="0.3">{s.en}</text>
              </g>
            );
          }
          if (s.kind === 'badge') {
            return (
              <g key={i} transform={`translate(${s.x} ${s.y - 6})`}>
                <line x1="0" y1="6" x2="0" y2="11" stroke="var(--vermillion)" strokeWidth="0.5" strokeDasharray="1 1" />
                <rect x="-6" y="-6" width="12" height="12" fill="var(--vermillion)" />
                <rect x="-4.5" y="-4.5" width="9" height="9" fill="none" stroke="var(--paper-soft)" strokeWidth="0.6" />
                <text x="0" y="2.5" fontFamily="var(--font-serif)" fontSize="7.5" fontWeight="700"
                      fill="var(--paper-soft)" textAnchor="middle">{s.stamp}</text>
                <text x="0" y="-9" fontFamily="var(--font-en)" fontSize="5.5" fill="var(--vermillion)" textAnchor="middle" letterSpacing="1">+ BADGE</text>
              </g>
            );
          }
          if (s.kind === 'current') {
            return (
              <g key={i} transform={`translate(${s.x} ${s.y})`}>
                <circle cx="0" cy="0" r="13" fill="none" stroke="var(--vermillion)" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
                <circle cx="0" cy="0" r="8" fill="var(--vermillion)" stroke="var(--vermillion)" strokeWidth="1" />
                <text x="0" y="3" fontFamily="var(--font-serif)" fontSize="9" fontWeight="700"
                      fill="var(--paper-soft)" textAnchor="middle">{s.ch}</text>
                <g transform="translate(0 -20)">
                  <text x="0" y="0" fontFamily="var(--font-serif)" fontSize="6.5" fontWeight="600"
                        fill="var(--vermillion)" textAnchor="middle" letterSpacing="0.5">你在这里</text>
                  <polygon points="0,3 -2.5,7 2.5,7" fill="var(--vermillion)" />
                </g>
              </g>
            );
          }
          // future
          return (
            <g key={i} transform={`translate(${s.x} ${s.y})`}>
              <circle cx="0" cy="0" r="7" fill="none" stroke="var(--paper-deep)" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
              <text x="0" y="3" fontFamily="var(--font-serif)" fontSize="9"
                    fill="var(--ink-4)" textAnchor="middle">{s.ch}</text>
              {s.en && <text x="0" y="18" fontFamily="var(--font-en)" fontStyle="italic" fontSize="6"
                    fill="var(--ink-4)" textAnchor="middle">{s.en}</text>}
            </g>
          );
        })}

        {/* horizon */}
        <g transform="translate(274 100)">
          <text x="-4" y="14" fontFamily="var(--font-en)" fontStyle="italic" fontSize="6" fill="var(--ink-3)" textAnchor="middle">to be continued…</text>
        </g>

        {/* bottom caption */}
        <text x="140" y="160" fontFamily="var(--font-en)" fontStyle="italic" fontSize="8.5"
              fill="var(--ink-3)" textAnchor="middle">
          choose · read · mark · think · record · continue
        </text>
      </svg>
    </div>
  );
}

// 4. Stamp — large 雪 stamp
function OBStampArt() {
  return (
    <div className="ob-art-inner">
      <svg viewBox="0 0 240 170" width="240" height="170">
        {/* dot bg */}
        <g opacity="0.4">
          {[...Array(8)].map((_, i) => [...Array(11)].map((__, j) => (
            <circle key={`${i}-${j}`} cx={20 + j * 20} cy={18 + i * 18} r="0.6" fill="rgba(112,90,60,0.25)" />
          )))}
        </g>
        {/* big avatar stamp */}
        <g transform="translate(80 85)">
          <circle cx="0" cy="0" r="38" fill="var(--ink)" />
          <text x="0" y="14" fontFamily="var(--font-serif)" fontSize="44" fontWeight="700" fill="var(--paper-soft)" textAnchor="middle">雪</text>
        </g>
        {/* meta lines */}
        <g transform="translate(140 60)">
          <text x="0" y="0" fontFamily="var(--font-en)" fontSize="9" fontStyle="italic" fill="var(--ink-3)" letterSpacing="2">DEMO STUDENT</text>
          <text x="0" y="20" fontFamily="var(--font-serif)" fontSize="20" fontWeight="700" fill="var(--ink)">雪 纯</text>
          <text x="0" y="36" fontFamily="var(--font-en)" fontSize="10" fontStyle="italic" fill="var(--ink-3)">IGCSE 0523 · Y10</text>
          {/* mini stats */}
          <g transform="translate(0 52)">
            <text x="0" y="0" fontFamily="var(--font-serif)" fontSize="11" fontWeight="700" fill="var(--ink)">5</text>
            <text x="14" y="0" fontFamily="var(--font-wenkai)" fontSize="9" fill="var(--ink-3)">读完</text>
            <text x="40" y="0" fontFamily="var(--font-serif)" fontSize="11" fontWeight="700" fill="var(--ink)">3</text>
            <text x="54" y="0" fontFamily="var(--font-wenkai)" fontSize="9" fill="var(--ink-3)">在读</text>
          </g>
          {/* stamps row */}
          <g transform="translate(0 70)">
            {['初','七','旬','句'].map((s, i) => (
              <g key={i} transform={`translate(${i * 22} 0)`}>
                <rect x="0" y="0" width="18" height="18" fill="var(--vermillion)" />
                <rect x="1.5" y="1.5" width="15" height="15" fill="none" stroke="var(--paper-soft)" strokeWidth="0.8" />
                <text x="9" y="13" fontFamily="var(--font-serif)" fontSize="11" fontWeight="700" fill="var(--paper-soft)" textAnchor="middle">{s}</text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

function shouldShowOnboarding() {
  // For demo/interview use: always show on fresh page load.
  // The "Skip" button still dismisses it for the current session,
  // but a refresh will bring it back so each interviewee sees it.
  return true;
}

Object.assign(window, { Onboarding, shouldShowOnboarding });
