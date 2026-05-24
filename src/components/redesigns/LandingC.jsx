// Direction C — Product-first / dashboard preview
const dxStyles = {
  topbar: { height: 38, borderBottom: '1px solid rgba(148,163,184,.12)', display: 'flex', alignItems: 'center', padding: '0 14px', justifyContent: 'space-between' },
  logo: { fontFamily: 'JetBrains Mono,monospace', fontSize: 11, fontWeight: 700, letterSpacing: '.14em' },
}

export default function LandingC() {
  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily: 'Inter, sans-serif', color: '#E6EBF5', overflow: 'hidden', background: '#06090F' }}>
      <div style={{ ...dxStyles.topbar, background: '#06090F' }}>
        <div style={dxStyles.logo}>DEAL<span style={{ color: '#22C58A' }}>EX</span></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button style={{ background: '#22C58A', color: '#06090F', border: 'none', padding: '5px 10px', fontSize: 9.5, fontWeight: 700, borderRadius: 3 }}>Sign in</button>
        </div>
      </div>

      {/* Split hero */}
      <div style={{ padding: '22px 16px 12px' }}>
        <div style={{ display: 'inline-block', fontSize: 9, color: '#22C58A', background: 'rgba(34,197,138,.1)', border: '1px solid rgba(34,197,138,.3)', padding: '3px 8px', borderRadius: 99, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '.1em', marginBottom: 14 }}>
          ● LIVE · 12 deals routing
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.015em', marginBottom: 8 }}>
          The deal desk for SBLC, DLC &amp; SWIFT MT760.
        </div>
        <div style={{ fontSize: 11, color: '#A8B1C6', lineHeight: 1.5, marginBottom: 14 }}>
          One workspace for every party. Real audit trail. Real protection.
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          <button style={{ background: '#22C58A', color: '#06090F', border: 'none', padding: '9px 14px', fontSize: 11, fontWeight: 700, borderRadius: 4 }}>Open a deal →</button>
          <button style={{ background: 'transparent', color: '#E6EBF5', border: '1px solid rgba(148,163,184,.2)', padding: '9px 14px', fontSize: 11, fontWeight: 500, borderRadius: 4 }}>View demo</button>
        </div>
      </div>

      {/* Dashboard preview */}
      <div style={{ margin: '0 16px', border: '1px solid rgba(148,163,184,.16)', borderRadius: 6, background: '#0B0F1A', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(148,163,184,.12)', padding: '6px 10px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 10, fontSize: 8.5, color: '#A8B1C6', fontFamily: 'JetBrains Mono,monospace', letterSpacing: '.08em' }}>
            <span style={{ color: '#fff', fontWeight: 700 }}>DEAL DESK</span>
            <span style={{ color: '#6B7592' }}>3 active</span>
          </div>
          <div style={{ fontSize: 8, color: '#6B7592', fontFamily: 'JetBrains Mono,monospace' }}>Q2 2026</div>
        </div>
        {[
          ['DX-1041', 'SBLC $5M', 'NCNDA', '#5B6BFF', '35%'],
          ['DX-1039', 'MT760 €12M', 'DOA', '#22C58A', '62%'],
          ['DX-1037', 'DLC $2.4M', 'IMFPA', '#F5A623', '78%'],
        ].map(([id, title, stage, color, pct], i) => (
          <div key={i} style={{ padding: '8px 10px', borderTop: i ? '1px solid rgba(148,163,184,.06)' : 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 8.5, fontFamily: 'JetBrains Mono,monospace', color: '#6B7592', width: 42 }}>{id}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 3 }}>{title}</div>
              <div style={{ height: 3, background: 'rgba(148,163,184,.1)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: pct, background: color, borderRadius: 99 }} />
              </div>
            </div>
            <div style={{ fontSize: 8, fontFamily: 'JetBrains Mono,monospace', color, letterSpacing: '.08em', textAlign: 'right', width: 54 }}>{stage}</div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
        {[['$284M', 'routed'], ['1,240', 'deals'], ['18 hrs', 'median cycle']].map(([v, l], i) => (
          <div key={i} style={{ borderLeft: '1px solid rgba(148,163,184,.2)', paddingLeft: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-.01em' }}>{v}</div>
            <div style={{ fontSize: 8, color: '#6B7592', textTransform: 'uppercase', letterSpacing: '.1em', fontFamily: 'JetBrains Mono,monospace' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
