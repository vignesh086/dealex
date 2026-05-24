// Redesigned App Shell
const NavIcon = ({ d, on }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke={on ? '#5B6BFF' : '#6B7592'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const NAV_ITEMS = [
  { d: 'M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z', label: 'Home', on: true },
  { d: 'M3 10l9-6 9 6v2H3v-2zM5 12v8M19 12v8M9 12v8M15 12v8M3 21h18', label: 'Instruments' },
  { d: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6', label: 'Templates' },
  { d: 'M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', label: 'Desk' },
  { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', label: 'Experts' },
]

const DEAL_CARDS = [
  { id: 'DX-1041', t: 'SBLC USD 5M', stage: 'NCNDA pending', c: '#5B6BFF' },
  { id: 'DX-1039', t: 'MT760 EUR 12M', stage: 'DOA review', c: '#22C58A' },
  { id: 'DX-1037', t: 'DLC USD 2.4M', stage: 'IMFPA signed', c: '#F5A623' },
  { id: 'DX-1029', t: 'SBLC GBP 8M', stage: 'SWIFT routed', c: '#A78BFA' },
]

export default function ShellRedesign() {
  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily: 'Inter, sans-serif', color: '#E6EBF5', overflow: 'hidden', background: '#0B0F1A', display: 'flex', flexDirection: 'row' }}>
      {/* Sidebar */}
      <div style={{ width: 54, borderRight: '1px solid rgba(148,163,184,.12)', display: 'flex', flexDirection: 'column', padding: '12px 0' }}>
        <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, fontWeight: 800, letterSpacing: '.04em', textAlign: 'center', marginBottom: 14 }}>
          <div>D</div>
          <div style={{ color: '#5B6BFF' }}>X</div>
        </div>
        {NAV_ITEMS.map((it, i) => (
          <div key={i} style={{ padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative', background: it.on ? 'rgba(91,107,255,.08)' : 'transparent' }}>
            {it.on && (
              <div style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 2, background: '#5B6BFF', borderRadius: '0 2px 2px 0' }} />
            )}
            <NavIcon d={it.d} on={it.on} />
            <div style={{ fontSize: 8, color: it.on ? '#E6EBF5' : '#6B7592', fontWeight: 600, letterSpacing: '.04em' }}>{it.label}</div>
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <div style={{ height: 42, borderBottom: '1px solid rgba(148,163,184,.12)', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#6B7592', letterSpacing: '.16em', textTransform: 'uppercase' }}>
              Home / Overview
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ padding: '4px 8px', border: '1px solid rgba(148,163,184,.16)', borderRadius: 4, fontSize: 9, color: '#A8B1C6', fontFamily: 'JetBrains Mono,monospace' }}>⌘K</div>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#5B6BFF,#A78BFA)' }} />
          </div>
        </div>

        {/* Ticker */}
        <div style={{ height: 24, background: '#10172A', borderBottom: '1px solid rgba(148,163,184,.08)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 14, fontFamily: 'JetBrains Mono,monospace', fontSize: 9, color: '#A8B1C6' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 7.5, color: '#22C58A', letterSpacing: '.14em', textTransform: 'uppercase' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C58A', display: 'inline-block' }} /> Live
          </span>
          <span><span style={{ color: '#E8B968' }}>GOLD</span> 2,645 <span style={{ color: '#22C58A' }}>▲0.8%</span></span>
          <span>BTC 67,340 <span style={{ color: '#22C58A' }}>▲1.2%</span></span>
          <span>EUR/USD 1.087 <span style={{ color: '#FF5570' }}>▼0.1%</span></span>
          <span style={{ color: '#6B7592' }}>· 12s ago</span>
        </div>

        {/* Content */}
        <div style={{ padding: '18px 16px', flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-.015em', marginBottom: 4 }}>Good morning, Vignesh.</div>
          <div style={{ fontSize: 11, color: '#A8B1C6', marginBottom: 18 }}>3 active deals · 2 awaiting your signature</div>

          {/* Deal cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
            {DEAL_CARDS.map((d, i) => (
              <div key={i} style={{ border: '1px solid rgba(148,163,184,.14)', borderRadius: 6, padding: '10px 12px', background: '#10172A', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 2, background: d.c, borderRadius: '0 2px 2px 0' }} />
                <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 8.5, color: '#6B7592', letterSpacing: '.1em', marginBottom: 3 }}>{d.id}</div>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 3 }}>{d.t}</div>
                <div style={{ fontSize: 9, color: d.c }}>{d.stage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
