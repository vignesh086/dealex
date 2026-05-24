export function CodeBefore() {
  return (
    <pre className="code-small">
      <span style={{ color: '#5A6478' }}>{'// Sidebar.jsx — strings + window.* globals\n'}</span>
      {'<div dangerouslySetInnerHTML={{ __html: `\n  <button class="bn act" \n    aria-selected="true"  '}
      <span style={{ color: '#FF5570' }}>{'// always true!'}</span>
      {'\n    onclick="navTo(\'home\')">\n    <span class="bni">🏠</span> Home\n  </button>\n`}} />'}
    </pre>
  )
}

export function CodeAfter() {
  return (
    <pre className="code-small">
      <span style={{ color: '#5A6478' }}>{'// Real component — state drives ARIA\n'}</span>
      {'const [tab, setTab] = useState(\'home\');\nreturn TABS.map(t => (\n  <button key={t.id}\n    className={`nav-item ${tab===t.id?\'on\':\'\'}`}\n    aria-selected={tab===t.id}\n    onClick={() => setTab(t.id)}>\n    <Icon name={t.icon}/> {t.label}\n  </button>\n));'}
    </pre>
  )
}
