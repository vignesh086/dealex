export default function Sidebar() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `
      <div class="bnav" id="mainSidebar" role="tablist" aria-expanded="true">

        <!-- Collapse / expand toggle (desktop only) -->
        <button
          class="nav-toggle-btn"
          onclick="toggleSidebar()"
          title="Toggle navigation"
          aria-label="Toggle navigation panel"
        >
          <span id="sidebarToggleIcon" class="nav-toggle-icon" aria-hidden="true">‹</span>
          <span id="sidebarToggleLabel" class="nav-toggle-label">Collapse</span>
        </button>

        <button class="bn act" id="nav-home" role="tab" aria-selected="true" aria-label="Home" title="Home" onclick="navTo('home')">
          <span class="bni" aria-hidden="true">🏠</span>
          <span class="bn-label">Home</span>
        </button>

        <button class="bn" id="nav-fi" role="tab" aria-selected="false" aria-label="Financial Instruments" title="Financial Instruments" onclick="navTo('fi')">
          <span class="bni" aria-hidden="true">🏦</span>
          <span class="bn-label">Instruments</span>
        </button>

        <button class="bn" id="nav-templates" role="tab" aria-selected="false" aria-label="Templates" title="Templates" onclick="navTo('templates')">
          <span class="bni" aria-hidden="true">📄</span>
          <span class="bn-label">Templates</span>
        </button>

        <button class="bn" id="nav-desk" role="tab" aria-selected="false" aria-label="Deal Desk" title="Deal Desk" onclick="navTo('desk')">
          <span class="bni" aria-hidden="true">💼</span>
          <span class="bn-label">Desk</span>
        </button>

        <button class="bn" id="nav-experts" role="tab" aria-selected="false" aria-label="Experts" title="Experts" onclick="navTo('experts')">
          <span class="bni" aria-hidden="true">👨‍💼</span>
          <span class="bn-label">Experts</span>
        </button>

      </div>
    ` }} />
  )
}
