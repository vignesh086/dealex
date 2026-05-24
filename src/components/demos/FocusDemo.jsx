export function FocusBefore() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
      <div className="focusrow">
        <button className="fbtn tiny">🇬🇧 English</button>
        <button className="fbtn tiny">🇨🇳 中文</button>
        <button className="fbtn" style={{ width: 34, height: 34, padding: 0, fontSize: 16 }}>🌙</button>
      </div>
      <div className="fcaption">22px tall · 34px square · no focus ring</div>
    </div>
  )
}

export function FocusAfter() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
      <div className="focusrow">
        <button className="fbtn fat foc">English</button>
        <button className="fbtn fat">中文</button>
        <button className="fbtn fat" aria-label="Toggle theme">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>
      <div className="fcaption">44px min · 2px focus ring · SVG glyph</div>
    </div>
  )
}
