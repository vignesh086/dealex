export default function Summary() {
  return (
    <section id="summary">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="num">01 / TL;DR</div>
            <h2>Where Dealex stands today</h2>
          </div>
          <div className="right">
            Scored across the four dimensions a trade-finance app gets judged on. Higher is better.
            Brand &amp; positioning are strong — execution, accessibility, and code health drag the
            average down.
          </div>
        </div>

        <div className="tldr">
          <div>
            <div className="label">Brand &amp; positioning</div>
            <div className="val">B+</div>
            <div className="desc">Distinct voice, real subject-matter depth. The "sequenced rail" pitch is clear and defensible.</div>
            <div className="score">
              <i className="on" /><i className="on" /><i className="on" /><i className="on" />
              <i className="on" /><i className="on" /><i className="on" /><i /><i /><i />
            </div>
          </div>
          <div>
            <div className="label">Visual execution</div>
            <div className="val">C–</div>
            <div className="desc">Emoji icons, mis-named tokens, 7–10px type, CSS-drawn diagrams. Reads as prototype, not platform.</div>
            <div className="score">
              <i className="bad" /><i className="bad" /><i className="bad" /><i className="bad" />
              <i /><i /><i /><i /><i /><i />
            </div>
          </div>
          <div>
            <div className="label">Accessibility</div>
            <div className="val">D</div>
            <div className="desc">Type far below WCAG minimums, no focus rings, tap targets under 44px, gendered emoji in nav.</div>
            <div className="score">
              <i className="bad" /><i className="bad" /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
          <div>
            <div className="label">Code health</div>
            <div className="val">C</div>
            <div className="desc">
              <code>dangerouslySetInnerHTML</code> + <code>window.*</code> globals across most
              components. React in name only.
            </div>
            <div className="score">
              <i className="bad" /><i className="bad" /><i className="bad" /><i />
              <i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
