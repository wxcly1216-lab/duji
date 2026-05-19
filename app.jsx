// ════════════════════════════════════════════
// 阅读档案 DRPS — App entry
// ════════════════════════════════════════════

const { useState: useStateApp, useEffect: useEffectApp, useRef: useRefApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "vermillion",
  "density": "normal",
  "font": "wenkai",
  "homeVariant": "literary"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Onboarding overlay (shown to first-time visitors)
  const [showOB, setShowOB] = useStateApp(() => shouldShowOnboarding());

  // Navigation state — stack of {screen, bookId?}
  const [stack, setStack] = useStateApp([{ screen: 'home' }]);
  const cur = stack[stack.length - 1];

  // Reflection modal state
  const [reflectCtx, setReflectCtx] = useStateApp(null);
  const [toastMsg, setToastMsg] = useStateApp(null);

  function nav(screen, bookId) {
    if (screen === 'back') {
      if (stack.length > 1) setStack(stack.slice(0, -1));
      return;
    }
    if (screen === 'book') {
      setStack([...stack, { screen: 'book', bookId }]);
      return;
    }
    // top-level tabs replace stack
    setStack([{ screen }]);
  }

  function openReflect(bookId, chapterIdx, mode) {
    setReflectCtx({ bookId, chapterIdx, mode });
  }
  function closeReflect() { setReflectCtx(null); }
  function finishReflect(data) {
    setReflectCtx(null);
    setToastMsg('已保存这一节的反思');
    setTimeout(() => setToastMsg(null), 1800);
  }

  // Top-level tab id (for bottom bar highlight)
  const tabId = (() => {
    if (cur.screen === 'book') {
      // find the parent screen on stack
      const parent = stack.length > 1 ? stack[stack.length - 2].screen : 'home';
      return parent === 'book' ? 'booklist' : parent;
    }
    return cur.screen;
  })();

  let body;
  if (cur.screen === 'home') body = <HomeScreen nav={nav} layoutVariant={tweaks.homeVariant} />;
  else if (cur.screen === 'journey') body = <JourneyScreen nav={nav} />;
  else if (cur.screen === 'booklist') body = <BooklistScreen nav={nav} />;
  else if (cur.screen === 'profile') body = <ProfileScreen nav={nav} />;
  else if (cur.screen === 'book') body = <BookDetailScreen nav={nav} bookId={cur.bookId} onOpenReflect={openReflect} />;

  return (
    <div
      className="dr-app"
      data-palette={tweaks.palette}
      data-density={tweaks.density}
      data-font={tweaks.font}
      data-home-variant={tweaks.homeVariant}
    >
      {body}

      {ReactDOM.createPortal(
        <TabBar current={tabId} onNav={nav} />,
        document.querySelector('.phone-screen') || document.body
      )}

      {reflectCtx && (
        <ReflectionModal
          key={`${reflectCtx.bookId}-${reflectCtx.chapterIdx}-${reflectCtx.mode}`}
          ctx={reflectCtx}
          onClose={closeReflect}
          onDone={finishReflect}
        />
      )}

      <Toast show={!!toastMsg}>{toastMsg}</Toast>

      {showOB && <Onboarding onDone={() => setShowOB(false)} />}

      <TweaksPanel title="Tweaks · 调节">
        <TweakSection label="主色调 / Palette">
          <TweakRadio
            label="印章色"
            value={tweaks.palette}
            options={[
              { value: 'vermillion', label: '朱砂' },
              { value: 'celadon',    label: '苍色' },
              { value: 'indigo',     label: '黛色' },
              { value: 'ochre',      label: '赭石' },
            ]}
            onChange={(v) => setTweak('palette', v)}
          />
        </TweakSection>
        <TweakSection label="字体 / Typography">
          <TweakRadio
            label="正文字体"
            value={tweaks.font}
            options={[
              { value: 'wenkai', label: '文楷' },
              { value: 'songti', label: '宋体' },
              { value: 'sans',   label: '黑体' },
            ]}
            onChange={(v) => setTweak('font', v)}
          />
        </TweakSection>
        <TweakSection label="卡片密度 / Density">
          <TweakRadio
            label="布局"
            value={tweaks.density}
            options={[
              { value: 'compact', label: '紧凑' },
              { value: 'normal',  label: '标准' },
              { value: 'loose',   label: '宽松' },
            ]}
            onChange={(v) => setTweak('density', v)}
          />
        </TweakSection>
        <TweakSection label="首页布局 / Home">
          <TweakRadio
            label="变体"
            value={tweaks.homeVariant}
            options={[
              { value: 'literary',  label: '文学版' },
              { value: 'minimal',   label: '极简版' },
            ]}
            onChange={(v) => setTweak('homeVariant', v)}
          />
        </TweakSection>
        <TweakSection label="演示 / Demo">
          <TweakButton
            label="重看新手引导"
            onClick={() => {
              try { sessionStorage.removeItem('drps_ob_seen_v1'); } catch (e) {}
              setShowOB(true);
            }}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
