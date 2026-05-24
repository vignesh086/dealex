// Direction B — Editorial / type-led
export default function LandingB() {
  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily: 'Inter, sans-serif', color: '#1A1F2E', overflow: 'hidden', background: '#F4F1EA' }}>
      <div style={{ height: 38, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between', borderBottom: '1px solid rgba(26,31,46,.1)' }}>
        <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>
          DEAL<span style={{ color: '#1F35C7' }}>EX</span>
        </div>
        <div style={{ fontSize: 9, color: '#6B7592', letterSpacing: '.14em', fontFamily: 'JetBrains Mono,monospace' }}>EN · 中文 · ☾</div>
      </div>

      <div style={{ padding: '24px 18px 16px' }}>
        <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: '#6B7592', marginBottom: 18 }}>
          · Vol. 01 — The discipline of trade finance
        </div>
        <div style={{ fontSize: 32, fontWeight: 400, lineHeight: 1, letterSpacing: '-.025em', marginBottom: 14, fontStyle: 'italic' }}>
          The deal closes <span style={{ fontStyle: 'normal', fontWeight: 700 }}>because</span> the sequence is kept.
        </div>
        <div style={{ fontSize: 11, color: '#3F4A66', lineHeight: 1.6, marginBottom: 18, maxWidth: 280 }}>
          Dealex is the neutral platform that holds the order of operations — NCNDA, KYC, DOA, IMFPA,
          term sheet, bank package, SWIFT — so every party plays their role exactly once.
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          <button style={{ background: '#1A1F2E', color: '#fff', border: 'none', padding: '10px 16px', fontSize: 11, fontWeight: 600, borderRadius: 0, letterSpacing: '.04em' }}>
            Begin a deal
          </button>
          <button style={{ background: 'transparent', color: '#1A1F2E', border: '1px solid #1A1F2E', padding: '10px 16px', fontSize: 11, fontWeight: 500, borderRadius: 0 }}>
            The playbook
          </button>
        </div>
      </div>

      {/* Numbered chapter */}
      <div style={{ padding: '0 18px', borderTop: '1px solid rgba(26,31,46,.12)', paddingTop: 14 }}>
        {[
          ['I.', 'Identify your role', 'Principal, Mandate, Broker, Bank — each has a different document set and a different protection.'],
          ['II.', 'Assemble the package', 'Dealex routes each document to the right party — and only that party.'],
          ['III.', 'Issue via SWIFT', 'MT760 (SBLC) and MT700 (DLC) drafts ready for your bank to authenticate.'],
        ].map(([num, title, body], i) => (
          <div key={i} style={{ display: 'flex', gap: 14, fontSize: 9.5, color: '#3F4A66', lineHeight: 1.5, marginTop: i > 0 ? 12 : 0 }}>
            <div style={{ fontSize: 26, fontWeight: 300, lineHeight: 1, color: '#1A1F2E', fontFamily: 'JetBrains Mono,monospace' }}>{num}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#1A1F2E', marginBottom: 3, fontSize: 11 }}>{title}</div>
              {body}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 18px', borderTop: '1px solid rgba(26,31,46,.1)', display: 'flex', justifyContent: 'space-between', fontSize: 8.5, color: '#6B7592', fontFamily: 'JetBrains Mono,monospace', letterSpacing: '.1em' }}>
        <span>EST. 2024</span>
        <span>SWIFT · CAT 7 · 2025</span>
      </div>
    </div>
  )
}
