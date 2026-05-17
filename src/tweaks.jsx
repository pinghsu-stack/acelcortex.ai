// tweaks.jsx — Tweaks panel (colors, headline, theme, font)

const ACCENTS = [
  // Acel Cortex brand green — first slot so it's the default if no preference is stored
  { key: 'cortex', name: 'Cortex',  value: '#10846C', ink: '#0A5E4D', softOpacity: 0.10, dark: '#4FB89C', darkInk: '#4FB89C' },
  { key: 'emerald',name: 'Emerald', value: '#10846C', ink: '#0A5A49', softOpacity: 0.08, dark: '#3FB89A', darkInk: '#7FD4BE' },
  { key: 'cyan',   name: 'Cyan',    value: '#2BA3C7', ink: '#0B5770', softOpacity: 0.08, dark: '#4FBEE0', darkInk: '#8DD4EB' },
  { key: 'cobalt', name: 'Cobalt',  value: '#3560E0', ink: '#1E3BA5', softOpacity: 0.08, dark: '#6A8FF5', darkInk: '#A7BEFF' },
  { key: 'amber',  name: 'Amber',   value: '#C78A2B', ink: '#8A5F1C', softOpacity: 0.10, dark: '#E5B063', darkInk: '#F0C88F' },
  { key: 'violet', name: 'Violet',  value: '#6D4AC9', ink: '#46308C', softOpacity: 0.08, dark: '#9378E4', darkInk: '#B8A4F0' },
];

const FONT_PAIRS = [
  { key: 'inter-instrument', name: 'Inter + Instrument', sans: "'Inter', sans-serif", serif: "'Instrument Serif', Georgia, serif" },
  { key: 'geist-newsreader', name: 'Geist + Newsreader', sans: "'Geist', sans-serif", serif: "'Newsreader', Georgia, serif" },
  { key: 'ibm-fraunces', name: 'IBM Plex + Fraunces', sans: "'IBM Plex Sans', sans-serif", serif: "'Fraunces', Georgia, serif" },
];

function applyAccent(accent, theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.style.setProperty('--accent', accent.dark);
    root.style.setProperty('--accent-ink', accent.darkInk);
    root.style.setProperty('--accent-soft', hexToRgba(accent.dark, 0.12));
  } else {
    root.style.setProperty('--accent', accent.value);
    root.style.setProperty('--accent-ink', accent.ink);
    root.style.setProperty('--accent-soft', hexToRgba(accent.value, accent.softOpacity));
  }
}

function hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

function applyFont(pair) {
  document.documentElement.style.setProperty('--font-sans', pair.sans + ', system-ui, sans-serif');
  document.documentElement.style.setProperty('--font-serif', pair.serif);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function TweaksPanel({ state, setState, editMode }) {
  // Always apply on mount / state change
  React.useEffect(() => {
    const accent = ACCENTS.find(a => a.key === state.accent) || ACCENTS[0];
    const font = FONT_PAIRS.find(f => f.key === state.font) || FONT_PAIRS[0];
    applyTheme(state.theme);
    // Apply accent AFTER theme so the right variant is used
    requestAnimationFrame(() => applyAccent(accent, state.theme));
    applyFont(font);
  }, [state.accent, state.theme, state.font]);

  if (!editMode) return null;

  const update = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*'); } catch {}
  };

  return (
    <div className="tweaks">
      <div className="tweaks-head">
        <h4>Tweaks</h4>
        <span className="small">Live</span>
      </div>

      <div className="tweak-group">
        <label>Accent</label>
        <div className="swatches">
          {ACCENTS.map(a => (
            <button
              key={a.key}
              className={`swatch ${state.accent === a.key ? 'active' : ''}`}
              style={{background: a.value}}
              onClick={() => update({ accent: a.key })}
              title={a.name}
            />
          ))}
        </div>
      </div>

      <div className="tweak-group">
        <label>Theme</label>
        <div className="seg">
          <button className={state.theme === 'light' ? 'active' : ''} onClick={() => update({ theme: 'light' })}>Light</button>
          <button className={state.theme === 'dark' ? 'active' : ''} onClick={() => update({ theme: 'dark' })}>Dark</button>
        </div>
      </div>

      <div className="tweak-group">
        <label>Hero headline</label>
        <div className="seg">
          <button className={state.headline === 0 ? 'active' : ''} onClick={() => update({ headline: 0 })}>Visionary</button>
          <button className={state.headline === 1 ? 'active' : ''} onClick={() => update({ headline: 1 })}>ROI</button>
          <button className={state.headline === 2 ? 'active' : ''} onClick={() => update({ headline: 2 })}>Growth</button>
        </div>
      </div>

      <div className="tweak-group">
        <label>Typography</label>
        <div className="seg" style={{flexDirection: 'column', gap: 3}}>
          {FONT_PAIRS.map(p => (
            <button
              key={p.key}
              className={state.font === p.key ? 'active' : ''}
              onClick={() => update({ font: p.key })}
              style={{justifyContent: 'flex-start', textAlign: 'left', padding: '8px 10px'}}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-group">
        <label>Calculator defaults</label>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <TweakNumber label="Units" value={state.calcUnits} onChange={v => update({ calcUnits: v })} min={25} max={1500} step={25}/>
          <TweakNumber label="Staff" value={state.calcStaff} onChange={v => update({ calcStaff: v })} min={1} max={20} step={1}/>
        </div>
      </div>
    </div>
  );
}

function TweakNumber({ label, value, onChange, min, max, step }) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
      <span style={{fontSize: 12, color: 'var(--ink-3)', flex: 1}}>{label}</span>
      <button
        style={{
          width: 22, height: 22, border: '1px solid var(--line)', borderRadius: 5,
          background: 'var(--bg)', color: 'var(--ink-2)', lineHeight: 1,
          fontSize: 14, padding: 0,
        }}
        onClick={() => onChange(Math.max(min, value - step))}
      >–</button>
      <span className="mono" style={{fontSize: 12, minWidth: 44, textAlign: 'center', color: 'var(--ink)'}}>{value}</span>
      <button
        style={{
          width: 22, height: 22, border: '1px solid var(--line)', borderRadius: 5,
          background: 'var(--bg)', color: 'var(--ink-2)', lineHeight: 1,
          fontSize: 14, padding: 0,
        }}
        onClick={() => onChange(Math.min(max, value + step))}
      >+</button>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
window.FONT_PAIRS = FONT_PAIRS;
window.ACCENTS = ACCENTS;
