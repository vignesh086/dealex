export default function CodePatches() {
  const sidebarCode = `import { useEffect, useState } from 'react'
import { Icon } from './Icon.jsx'

const TABS = [
  { id: 'home',      label: 'Home',        icon: 'home' },
  { id: 'fi',        label: 'Instruments', icon: 'bank' },
  { id: 'templates', label: 'Templates',   icon: 'doc'  },
  { id: 'desk',      label: 'Desk',        icon: 'desk' },
  { id: 'experts',   label: 'Experts',     icon: 'team' },
]

export default function Sidebar({ active, onNavigate, collapsed, onToggle }) {
  return (
    <nav className={\`sidebar \${collapsed ? 'is-collapsed' : ''}\`} aria-label="Primary">
      <button className="sidebar-toggle" onClick={onToggle}
              aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}>
        <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} />
      </button>

      <ul role="tablist">
        {TABS.map(t => (
          <li key={t.id}>
            <button
              role="tab"
              aria-selected={active === t.id}
              aria-controls={\`panel-\${t.id}\`}
              className={\`nav-item \${active === t.id ? 'is-active' : ''}\`}
              onClick={() => onNavigate(t.id)}>
              <Icon name={t.icon} />
              <span className="nav-label">{t.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}`

  const tokensCode = `:root {
  /* Brand */
  --accent:       #5B6BFF;
  --accent-50:    #EEF0FF;
  --accent-100:   #C7CBF8;
  --accent-500:   #5B6BFF;
  --accent-700:   #2837B8;
  --accent-soft:  rgba(91,107,255,.14);
  --accent-line:  rgba(91,107,255,.35);

  /* Surfaces (dark) */
  --bg:        #0B0F1A;
  --panel:     #141C30;
  --panel-2:   #1A2440;
  --line:      rgba(148,163,184,.12);
  --line-2:    rgba(148,163,184,.20);

  /* Text */
  --ink:    #E6EBF5;
  --ink-2:  #A8B1C6;
  --ink-3:  #6B7592;

  /* Status */
  --good: #22C58A;
  --warn: #F5A623;
  --bad:  #FF5570;

  /* Type scale — minimum 13px in product, 14px on landing */
  --t-xs:  13px;
  --t-sm:  14px;
  --t-md:  16px;
  --t-lg:  20px;
  --t-xl:  28px;
  --t-2xl: 40px;
}

/* Then: sed -i 's/--gold/--accent/g' src/**/*.{jsx,css} */`

  const iconCode = `// Icon.jsx — 1.6 stroke, 24px viewBox, currentColor-aware
const PATHS = {
  home:  'M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z',
  bank:  'M3 10l9-6 9 6v2H3v-2zM5 12v8M19 12v8M9 12v8M15 12v8M3 21h18',
  doc:   'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6',
  desk:  'M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18',
  team:  'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' +
         'M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  moon:  'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  sun:   'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2' +
         'M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
  // …add the rest as you migrate
}

export function Icon({ name, size = 18, className = '', strokeWidth = 1.6 }) {
  const d = PATHS[name]
  if (!d) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={strokeWidth}
         strokeLinecap="round" strokeLinejoin="round"
         className={\`icon \${className}\`} aria-hidden="true">
      <path d={d} />
    </svg>
  )
}`

  const patchHeaderStyle = {
    padding: '18px 24px',
    borderBottom: '1px solid var(--line)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'var(--panel)',
  }

  const labelStyle = {
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: 10,
    letterSpacing: '.16em',
    textTransform: 'uppercase',
    color: 'var(--ink-3)',
    marginBottom: 4,
  }

  const cardStyle = {
    border: '1px solid var(--line)',
    borderRadius: 14,
    overflow: 'hidden',
  }

  return (
    <section id="code">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="num">05 / Code patches</div>
            <h2>Drop-in fixes for the most-flagged code smells</h2>
          </div>
          <div className="right">
            These aren't a refactor — they're cut/paste replacements for the three files that touch
            every screen. Once these land, the rest of the audit becomes ordinary CSS work.
          </div>
        </div>

        <div style={{ display: 'grid', gap: 24 }}>

          {/* Patch A — Sidebar */}
          <div style={cardStyle}>
            <div style={patchHeaderStyle}>
              <div>
                <div style={labelStyle}>Patch A</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>
                  Real <code style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, background: 'var(--bg-2)', padding: '2px 8px', borderRadius: 4, color: 'var(--accent)' }}>Sidebar.jsx</code>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: "'JetBrains Mono',monospace" }}>
                replaces dangerouslySetInnerHTML
              </div>
            </div>
            <pre className="code">{sidebarCode}</pre>
          </div>

          {/* Patch B — Tokens */}
          <div style={cardStyle}>
            <div style={patchHeaderStyle}>
              <div>
                <div style={labelStyle}>Patch B</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>
                  Rename tokens · <code style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, background: 'var(--bg-2)', padding: '2px 8px', borderRadius: 4, color: 'var(--accent)' }}>global.css</code>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: "'JetBrains Mono',monospace" }}>
                find/replace, no logic change
              </div>
            </div>
            <pre className="code">{tokensCode}</pre>
          </div>

          {/* Patch C — Icon component */}
          <div style={cardStyle}>
            <div style={patchHeaderStyle}>
              <div>
                <div style={labelStyle}>Patch C</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>
                  Single <code style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, background: 'var(--bg-2)', padding: '2px 8px', borderRadius: 4, color: 'var(--accent)' }}>Icon.jsx</code> for all glyphs
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: "'JetBrains Mono',monospace" }}>
                retires every emoji
              </div>
            </div>
            <pre className="code">{iconCode}</pre>
          </div>

        </div>
      </div>
    </section>
  )
}
