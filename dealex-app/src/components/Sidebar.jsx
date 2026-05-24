import Icon from './Icon.jsx'

const NAV_ITEMS = [
  { id: 'home',      label: 'Home',        icon: 'home',      page: 'home',      ariaLabel: 'Home' },
  { id: 'fi',        label: 'Instruments', icon: 'bank',      page: 'fi',        ariaLabel: 'Financial Instruments' },
  { id: 'templates', label: 'Templates',   icon: 'document',  page: 'templates', ariaLabel: 'Templates' },
  { id: 'desk',      label: 'Desk',        icon: 'briefcase', page: 'desk',      ariaLabel: 'Deal Desk' },
  { id: 'experts',   label: 'Experts',     icon: 'people',    page: 'experts',   ariaLabel: 'Experts' },
]

export default function Sidebar() {
  return (
    <nav className="bnav" id="mainSidebar" role="tablist" aria-label="Main navigation" aria-expanded="true">

      {/* Collapse / expand toggle — desktop only */}
      <button
        className="nav-toggle-btn"
        onClick={() => window.toggleSidebar?.()}
        title="Toggle navigation"
        aria-label="Toggle navigation panel"
      >
        <span id="sidebarToggleIcon" className="nav-toggle-icon" aria-hidden="true">‹</span>
        <span id="sidebarToggleLabel" className="nav-toggle-label">Collapse</span>
      </button>

      {NAV_ITEMS.map(({ id, label, icon, page, ariaLabel }, index) => (
        <button
          key={id}
          className={`bn${index === 0 ? ' act' : ''}`}
          id={`nav-${id}`}
          role="tab"
          aria-selected={index === 0}
          aria-label={ariaLabel}
          title={ariaLabel}
          onClick={() => window.navTo?.(page)}
        >
          <span className="bni" aria-hidden="true">
            <Icon name={icon} size={20} />
          </span>
          <span className="bn-label">{label}</span>
        </button>
      ))}
    </nav>
  )
}
