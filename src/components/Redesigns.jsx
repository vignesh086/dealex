import LandingA from './redesigns/LandingA.jsx'
import LandingB from './redesigns/LandingB.jsx'
import LandingC from './redesigns/LandingC.jsx'
import ShellRedesign from './redesigns/ShellRedesign.jsx'

export function RedesignsSection() {
  return (
    <section id="redesigns">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="num">03 / Direction exploration</div>
            <h2>Three landing directions, same brand DNA</h2>
          </div>
          <div className="right">
            You asked for options. Each direction keeps your "sequenced, audited rail" positioning,
            but pulls a different lever — calm, editorial, or product-first. Pick one (or remix), then
            we apply the same logic to every other screen.
          </div>
        </div>

        <div className="canvas-row">
          <div className="mock-card">
            <div className="mock-head">
              <div className="mock-name">A. Calm institutional</div>
              <div className="mock-tag">A · Default</div>
            </div>
            <div className="mock-frame"><LandingA /></div>
            <div className="mock-notes">
              <strong>Bet · Trust through restraint</strong>
              Slate + indigo. Sentence-case headlines. Numbered sequence chips up front. Subtle SWIFT
              footnote. The "Bloomberg if it cared about typography" play.
            </div>
          </div>

          <div className="mock-card">
            <div className="mock-head">
              <div className="mock-name">B. Editorial discipline</div>
              <div className="mock-tag">B · Bold</div>
            </div>
            <div className="mock-frame"><LandingB /></div>
            <div className="mock-notes">
              <strong>Bet · Trust through authorship</strong>
              Newsprint cream. Italic / roman type-pair. Numbered roman chapters. Reads as a body of
              practice, not a SaaS dash. High-end advisory vibe.
            </div>
          </div>

          <div className="mock-card">
            <div className="mock-head">
              <div className="mock-name">C. Product-first</div>
              <div className="mock-tag">C · Tactical</div>
            </div>
            <div className="mock-frame"><LandingC /></div>
            <div className="mock-notes">
              <strong>Bet · Trust through proof</strong>
              Live deal counter, live deal list visible from the marketing page. Numbers up front:
              $284M routed · 1,240 deals · 18hr median. Converts skeptics.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ShellSection() {
  return (
    <section id="shell">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="num">04 / App shell</div>
            <h2>The post-login shell, cleaned up</h2>
          </div>
          <div className="right">
            SVG nav icons, real auth state, a ticker that admits when it's stale, and a topbar that
            tells the user where they are. Sidebar drops to 54px collapsed — most apps in this space
            sit at 60–72px.
          </div>
        </div>

        <div className="mock-card" style={{ maxWidth: 980, margin: '0 auto' }}>
          <div className="mock-head">
            <div className="mock-name">App shell · post-login</div>
            <div className="mock-tag">SVG icons · scoped state · live ticker</div>
          </div>
          <div className="mock-frame" style={{ aspectRatio: '16/9' }}>
            <ShellRedesign />
          </div>
          <div className="mock-notes">
            <strong>Changes from current</strong>
            Sidebar uses SVG glyphs + an active-rail accent · topbar shows breadcrumb + ⌘K search ·
            ticker labels itself "Live · 12s ago" with a real dot pulse · home tab leads with a
            personalised greeting and four deal cards keyed by stage colour.
          </div>
        </div>
      </div>
    </section>
  )
}
