export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        Audit prepared for the{' '}
        <a href="https://dealex.vercel.app/" target="_blank" rel="noopener">Dealex</a> codebase ·
        Source explored on{' '}
        <code style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--ink-2)' }}>claude/replicate-html-file-2V2Aa</code> ·
        Top 10 fixes ship in &lt; 2 days.
      </div>
    </footer>
  )
}
