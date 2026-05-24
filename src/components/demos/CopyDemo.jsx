export function CopyBefore() {
  return (
    <div className="copybox bad">
      <div className="ttl">⚠ Dealex ground rules — read before you proceed</div>
      <div className="line"><span className="x">✗</span> No Zoom calls. No WhatsApp negotiations. All communication flows through DEALEX.</div>
      <div className="line"><span className="x">✗</span> No paperwork floating to anyone. Documents go only where they need to go.</div>
      <div className="line"><span className="x">✗</span> No step is skipped. NCNDA → KYC → DOA → IMFPA → SWIFT. Every time.</div>
    </div>
  )
}

export function CopyAfter() {
  return (
    <div className="copybox good">
      <div className="ttl">For brokers, mandates &amp; principals</div>
      <div className="lede">Close trade-finance deals on a single audited rail.</div>
      <div className="sub">NCNDA, KYC, DOA, IMFPA, term sheet, bank package, SWIFT — sequenced, signed, and routed for you. No WhatsApp, no email attachments, no chasing.</div>
      <div className="ctas">
        <button className="pri">Start a deal</button>
        <button className="sec">See how it works</button>
      </div>
    </div>
  )
}
