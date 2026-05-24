export default function Nav() {
  function handleClick(e, id) {
    const el = document.getElementById(id)
    if (el) {
      e.preventDefault()
      window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' })
    }
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo">DEAL<span className="ex">EX</span> · AUDIT</div>
        <div className="nav-links">
          <a href="#summary" onClick={e => handleClick(e, 'summary')}>Summary</a>
          <a href="#issues" onClick={e => handleClick(e, 'issues')}>Top 10</a>
          <a href="#redesigns" onClick={e => handleClick(e, 'redesigns')}>Redesigns</a>
          <a href="#code" onClick={e => handleClick(e, 'code')}>Code fixes</a>
          <a href="#quickwins" onClick={e => handleClick(e, 'quickwins')}>Quick wins</a>
        </div>
      </div>
    </nav>
  )
}
