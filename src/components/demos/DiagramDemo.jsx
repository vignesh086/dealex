export function DiagramBefore() {
  return (
    <div className="diagmock">
      <div className="row2">
        <div className="box a">PRINCIPAL A</div>
        <div className="box b">PRINCIPAL B</div>
      </div>
      <svg width="220" height="50" viewBox="0 0 220 50" style={{ margin: '-4px 0' }}>
        <line x1="55" y1="0" x2="55" y2="20" stroke="#8B95B0" strokeDasharray="3 3" opacity=".5" />
        <line x1="165" y1="0" x2="165" y2="20" stroke="#8B95B0" strokeDasharray="3 3" opacity=".5" />
        <path d="M55 30 Q 55 50 110 50 T 165 30" stroke="#8B95B0" strokeDasharray="3 3" fill="none" opacity=".4" />
      </svg>
      <div className="box broker">BROKER</div>
      <div className="box platform" style={{ marginTop: 8 }}>DEALEX — NEUTRAL PLATFORM</div>
      <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 8, fontFamily: 'JetBrains Mono,monospace' }}>
        Skewed pseudo-elements, lines don't meet boxes
      </div>
    </div>
  )
}

export function DiagramAfter() {
  return (
    <div className="diagmock">
      <svg width="320" height="220" viewBox="0 0 320 220" style={{ maxWidth: '100%' }}>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#6B7592" />
          </marker>
        </defs>
        {/* Row 1 — principals */}
        <rect x="20" y="10" width="120" height="36" rx="6" fill="rgba(125,211,252,.08)" stroke="rgba(125,211,252,.5)" />
        <text x="80" y="33" textAnchor="middle" fill="#7DD3FC" fontSize="11" fontWeight="700" fontFamily="Inter">PRINCIPAL A</text>
        <rect x="180" y="10" width="120" height="36" rx="6" fill="rgba(134,239,172,.08)" stroke="rgba(134,239,172,.5)" />
        <text x="240" y="33" textAnchor="middle" fill="#86EFAC" fontSize="11" fontWeight="700" fontFamily="Inter">PRINCIPAL B</text>
        {/* connectors to mandates */}
        <line x1="80" y1="46" x2="80" y2="78" stroke="#6B7592" strokeDasharray="3 3" markerEnd="url(#arr)" />
        <line x1="240" y1="46" x2="240" y2="78" stroke="#6B7592" strokeDasharray="3 3" markerEnd="url(#arr)" />
        {/* Row 2 — mandates */}
        <rect x="20" y="82" width="120" height="30" rx="6" fill="rgba(125,211,252,.04)" stroke="rgba(125,211,252,.3)" />
        <text x="80" y="102" textAnchor="middle" fill="#7DD3FC" fontSize="10" fontWeight="600" fontFamily="Inter">MANDATE A</text>
        <rect x="180" y="82" width="120" height="30" rx="6" fill="rgba(134,239,172,.04)" stroke="rgba(134,239,172,.3)" />
        <text x="240" y="102" textAnchor="middle" fill="#86EFAC" fontSize="10" fontWeight="600" fontFamily="Inter">MANDATE B</text>
        {/* converge to broker */}
        <path d="M80 112 Q 80 130 160 130" stroke="#6B7592" strokeDasharray="3 3" fill="none" />
        <path d="M240 112 Q 240 130 160 130" stroke="#6B7592" strokeDasharray="3 3" fill="none" markerEnd="url(#arr)" />
        {/* Row 3 — broker */}
        <rect x="100" y="132" width="120" height="30" rx="6" fill="rgba(167,139,250,.08)" stroke="rgba(167,139,250,.5)" />
        <text x="160" y="152" textAnchor="middle" fill="#A78BFA" fontSize="10" fontWeight="700" fontFamily="Inter">BROKER</text>
        <line x1="160" y1="162" x2="160" y2="180" stroke="#6B7592" strokeDasharray="3 3" markerEnd="url(#arr)" />
        {/* Row 4 — platform */}
        <rect x="40" y="182" width="240" height="32" rx="6" fill="rgba(91,107,255,.14)" stroke="#5B6BFF" strokeWidth="1.5" />
        <text x="160" y="203" textAnchor="middle" fill="#5B6BFF" fontSize="11" fontWeight="800" fontFamily="Inter" letterSpacing="1.5">DEALEX · NEUTRAL PLATFORM</text>
      </svg>
    </div>
  )
}
