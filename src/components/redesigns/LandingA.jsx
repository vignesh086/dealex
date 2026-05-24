// Direction A — Calm institutional
const dxStyles = {
  wrap: { position: 'absolute', inset: 0, fontFamily: 'Inter, sans-serif', color: '#E6EBF5', overflow: 'hidden' },
  topbar: { height: 38, borderBottom: '1px solid rgba(148,163,184,.12)', display: 'flex', alignItems: 'center', padding: '0 14px', justifyContent: 'space-between' },
  logo: { fontFamily: 'JetBrains Mono,monospace', fontSize: 11, fontWeight: 700, letterSpacing: '.14em' },
}

export default function LandingA() {
  return (
    <div style={{ ...dxStyles.wrap, background: '#0B0F1A' }}>
      <div style={{ ...dxStyles.topbar, background: '#0B0F1A' }}>
        <div style={dxStyles.logo}>DEAL<span style={{ color: '#5B6BFF' }}>EX</span></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: '#6B7592', fontFamily: 'JetBrains Mono,monospace', letterSpacing: '.1em' }}>EN · 中文</span>
          <button style={{ width: 24, height: 24, border: '1px solid rgba(148,163,184,.2)', borderRadius: 4, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A8B1C6' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '28px 18px 18px' }}>
        <div style={{ fontSize: 9, color: '#6B7592', fontFamily: 'JetBrains Mono,monospace', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 14 }}>
          For brokers, mandates &amp; principals
        </div>
        <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.015em', marginBottom: 10 }}>
          Close trade-finance deals on one audited rail.
        </div>
        <div style={{ fontSize: 11, color: '#A8B1C6', lineHeight: 1.55, marginBottom: 18 }}>
          NCNDA → KYC → DOA → IMFPA → SWIFT. Sequenced, signed, paymaster-protected.
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ background: '#5B6BFF', color: '#fff', border: 'none', padding: '9px 14px', fontSize: 11, fontWeight: 600, borderRadius: 4 }}>
            Start a deal →
          </button>
          <button style={{ background: 'transparent', color: '#E6EBF5', border: '1px solid rgba(148,163,184,.2)', padding: '9px 14px', fontSize: 11, fontWeight: 500, borderRadius: 4 }}>
            How it works
          </button>
        </div>
      </div>

      {/* Compact "what happens" */}
      <div style={{ padding: '0 18px 18px' }}>
        <div style={{ fontSize: 9, color: '#6B7592', fontFamily: 'JetBrains Mono,monospace', letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 10 }}>
          What we sequence
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(148,163,184,.12)', border: '1px solid rgba(148,163,184,.12)', borderRadius: 6, overflow: 'hidden' }}>
          {['NCNDA', 'KYC', 'DOA', 'IMFPA', 'Term Sheet', 'SWIFT'].map((s, i) => (
            <div key={i} style={{ background: '#141C30', padding: '10px 8px', fontSize: 9.5, color: '#E6EBF5', fontWeight: 500, textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#6B7592', fontFamily: 'JetBrains Mono,monospace', marginBottom: 2 }}>0{i + 1}</div>
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Role row */}
      <div style={{ padding: '0 18px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6 }}>
          {[
            ['Principal', 'Owns the deal'],
            ['Mandate', 'Represents a principal'],
            ['Broker', 'Holds one or both sides'],
            ['Bank officer', 'Receives & authenticates'],
          ].map(([t, s], i) => (
            <div key={i} style={{ border: '1px solid rgba(148,163,184,.14)', borderRadius: 4, padding: '9px 10px', background: '#10172A' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#E6EBF5', marginBottom: 2 }}>{t}</div>
              <div style={{ fontSize: 9, color: '#6B7592', lineHeight: 1.4 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer trust */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 18px', borderTop: '1px solid rgba(148,163,184,.12)', display: 'flex', justifyContent: 'space-between', fontSize: 8.5, color: '#6B7592', fontFamily: 'JetBrains Mono,monospace', letterSpacing: '.1em' }}>
        <span>SWIFT CAT 7 · 2025</span>
        <span>AUDIT-LOGGED</span>
      </div>
    </div>
  )
}
