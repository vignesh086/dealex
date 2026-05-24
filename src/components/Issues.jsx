import { ISSUES } from '../data/issues.jsx'

function IssueCard({ issue }) {
  const sevLabel = issue.sev === 'hi' ? 'High' : issue.sev === 'md' ? 'Medium' : 'Low'

  return (
    <div className="issue">
      <div className="issue-side">
        <div className="issue-head">
          <div className="issue-num">{String(issue.n).padStart(2, '0')}</div>
          <div>
            <div className="issue-title">{issue.title}</div>
            <div className="issue-tags">
              <span className={`tag sev-${issue.sev}`}>{sevLabel}</span>
              {issue.tags.map((t, i) => (
                <span key={i} className={`tag ${t === 'Quick win' ? 'win' : ''}`}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="issue-body">{issue.body}</div>
      </div>

      <div className="issue-side">
        <div className="issue-demo" style={{ marginBottom: 14 }}>
          <div className="demo-label">As shipped</div>
          <div className="demo-content">{issue.before}</div>
        </div>
        <div className="issue-demo">
          <div className="demo-label after">Recommended</div>
          <div className="demo-content">{issue.after}</div>
        </div>
      </div>
    </div>
  )
}

export default function Issues() {
  return (
    <section id="issues">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="num">02 / Top 10 issues</div>
            <h2>Ten things to fix, in priority order</h2>
          </div>
          <div className="right">
            Ranked by impact on user trust × effort to fix. Most are quick wins — none requires a
            redesign. Each card shows the current state on the left and a proposed fix on the right.
          </div>
        </div>

        <div>
          {ISSUES.map(issue => (
            <IssueCard key={issue.n} issue={issue} />
          ))}
        </div>
      </div>
    </section>
  )
}
