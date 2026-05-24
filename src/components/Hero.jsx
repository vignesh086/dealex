export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-inner">
        <div className="eyebrow">UX / UI Audit · May 2026 · v1</div>
        <h1>
          Dealex feels like the brief.<br />
          <em>It doesn't yet feel like the product.</em>
        </h1>
        <p className="lede">
          The brand DNA is right — disciplined, institutional, sequenced. The execution is leaking
          signal: emoji icons, 8px type, a "no" wall before the value prop, and a sidebar that
          injects HTML strings. This audit covers the top ten issues with quick wins, three redesign
          directions, and code-level fixes you can paste in tomorrow.
        </p>
        <div className="hero-meta">
          <span>Project<strong>dealex.vercel.app</strong></span>
          <span>Stack<strong>React 19 · Vite · 280KB legacy.js</strong></span>
          <span>Audience<strong>SMB issuers ↔ trade-finance pros</strong></span>
          <span>Verdict<strong>Polish, then re-architect</strong></span>
        </div>
      </div>
    </header>
  )
}
