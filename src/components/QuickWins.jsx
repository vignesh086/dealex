const WINS = [
  {
    time: '~ 30 min',
    title: <>Retire emoji from nav, theme toggle &amp; role cards</>,
    desc: (
      <>
        Drop the <code>Icon.jsx</code> from Patch C. Swap{' '}
        <code>🏠 🏦 📄 💼 👨‍💼 🌙 🏛️ 📜 🤝</code> for the named SVG glyphs. Single biggest
        perceived-quality jump on the list.
      </>
    ),
  },
  {
    time: '~ 20 min',
    title: <>Rename <code>--gold</code> → <code>--accent</code></>,
    desc: (
      <>
        One <code>sed</code> across <code>src/</code>. Removes the cognitive mismatch every new dev
        (and you, six months from now) will hit on day one.
      </>
    ),
  },
  {
    time: '~ 1 hour',
    title: 'Bump every type size below 13px',
    desc: (
      <>
        Set <code>:root {'{'} font-size: 14px {'}'}</code> as the floor, then triage the 7–10px hardcoded values
        in <code>Landing.jsx</code>. Body becomes readable on a phone for the first time.
      </>
    ),
  },
  {
    time: '~ 2 hours',
    title: 'Lead the hero with a CTA + a benefit',
    desc: (
      <>
        Move the "Ground Rules" callout below the role selector. Replace with a primary "Start a deal"
        + secondary "How it works." Re-frame "no Zoom" as "audited, sequenced rail."
      </>
    ),
  },
  {
    time: '~ 30 min',
    title: 'Re-label the ticker as indicative',
    desc: (
      <>
        Either wire a 5-min cached feed, or add <code>· INDICATIVE · 12s ago</code> and pulse a dot.
        Static "live" prices are the single most product-eroding detail on the screen.
      </>
    ),
  },
  {
    time: '~ 1 hour',
    title: <>Add a <code>:focus-visible</code> ring + 44px min tap target</>,
    desc: (
      <>
        Two global rules in <code>global.css</code>. Unlocks keyboard nav and passes the basic
        mobile-a11y sweep. No design decisions required.
      </>
    ),
  },
]

export default function QuickWins() {
  return (
    <section id="quickwins">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="num">06 / Day-one quick wins</div>
            <h2>What to ship by end of week</h2>
          </div>
          <div className="right">
            If you do nothing else from this audit, do these. Each one is under an afternoon's work and
            lifts perceived quality more than its size would suggest.
          </div>
        </div>

        <div className="wins">
          {WINS.map((win, i) => (
            <div key={i}>
              <div className="win-time">{win.time}</div>
              <div className="win-title">{win.title}</div>
              <div className="win-desc">{win.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
