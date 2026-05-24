const NavSvg = ({ d }) => (
  <svg className="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

export function EmojiNavBefore() {
  return (
    <div className="demo-row">
      <div className="minisb">
        <div className="item act"><span className="emo">🏠</span>Home</div>
        <div className="item"><span className="emo">🏦</span>Instruments</div>
        <div className="item"><span className="emo">📄</span>Templates</div>
        <div className="item"><span className="emo">💼</span>Desk</div>
        <div className="item"><span className="emo">👨‍💼</span>Experts</div>
      </div>
    </div>
  )
}

export function EmojiNavAfter() {
  return (
    <div className="demo-row">
      <div className="minisb">
        <div className="item act">
          <NavSvg d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" />
          Home
        </div>
        <div className="item">
          <NavSvg d="M3 10l9-6 9 6v2H3v-2zM5 12v8M19 12v8M9 12v8M15 12v8M3 21h18" />
          Instruments
        </div>
        <div className="item">
          <NavSvg d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6" />
          Templates
        </div>
        <div className="item">
          <NavSvg d="M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
          Desk
        </div>
        <div className="item">
          <svg className="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="9" r="3" />
            <circle cx="17" cy="11" r="2" />
            <path d="M3 19c0-3 3-5 6-5s6 2 6 5M14.5 18.5c.4-1.8 2-3 4-3s3 1 3.5 2.5" />
          </svg>
          Experts
        </div>
      </div>
    </div>
  )
}
