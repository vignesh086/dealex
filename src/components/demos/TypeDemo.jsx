export function TypeBefore() {
  return (
    <div className="demo-row">
      <div className="typecard">
        <div className="tlabel">Document checklist · as shipped</div>
        <div className="h">PASSPORT (CLEAR, VALID, NOT EXPIRED)</div>
        <div className="d">Colour copy, all corners visible. Required for KYC/CIS submission to DEALEX.</div>
        <div className="h" style={{ marginTop: 4 }}>COMPANY REGISTRATION CERTIFICATE</div>
        <div className="d">Certificate of Incorporation or equivalent. Must show your name as director.</div>
      </div>
    </div>
  )
}

export function TypeAfter() {
  return (
    <div className="demo-row">
      <div className="typecard fixed">
        <div className="tlabel">Same content · 14/13.5px</div>
        <div className="h">Passport</div>
        <div className="d">Clear color copy, all corners visible. For KYC and CIS submission to Dealex.</div>
        <div className="h" style={{ marginTop: 6 }}>Company registration certificate</div>
        <div className="d">Certificate of Incorporation, showing you as director or authorized signatory.</div>
      </div>
    </div>
  )
}
