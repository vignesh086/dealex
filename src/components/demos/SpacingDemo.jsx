export function SpacingBefore() {
  return (
    <div className="lscompare">
      <div className="lbl-bad">SELECT YOUR ROLE TO SEE WHAT YOU NEED</div>
      <div className="lbl-bad">MUST HAVE — DEAL CANNOT START</div>
      <div className="lbl-bad">SHOULD HAVE — STRENGTHENS YOUR POSITION</div>
      <div className="lbl-bad">YOUR IMFPA RIGHTS</div>
      <div className="lbl-bad">WHAT YOU NEED TO OPEN A DEAL</div>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6, fontFamily: 'JetBrains Mono,monospace' }}>
        every section header looks the same
      </div>
    </div>
  )
}

export function SpacingAfter() {
  return (
    <div className="lscompare">
      <div className="lbl-ok">Select your role</div>
      <div>
        <span className="lbl-meta">Required</span>
        <div className="lbl-ok">Deal cannot start without these</div>
      </div>
      <div>
        <span className="lbl-meta">Recommended</span>
        <div className="lbl-ok">Strengthens your position</div>
      </div>
      <div className="lbl-ok">Your IMFPA rights</div>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6, fontFamily: 'JetBrains Mono,monospace' }}>
        weight + meta-label do the work
      </div>
    </div>
  )
}
