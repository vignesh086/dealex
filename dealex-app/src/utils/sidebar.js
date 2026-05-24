// ═══════════════════════════════════════════════════════
//  DEALEX — Sidebar collapse / expand
// ═══════════════════════════════════════════════════════
(function () {
  const STORAGE_KEY = 'dealex_nav_collapsed';

  function applyCollapsed(collapsed) {
    const nav = document.querySelector('.bnav');
    if (!nav) return;
    const icon = document.getElementById('sidebarToggleIcon');
    const label = document.getElementById('sidebarToggleLabel');

    if (collapsed) {
      nav.classList.add('collapsed');
      if (icon) icon.textContent = '›';
      if (label) label.textContent = 'Expand';
      nav.setAttribute('aria-expanded', 'false');
    } else {
      nav.classList.remove('collapsed');
      if (icon) icon.textContent = '‹';
      if (label) label.textContent = 'Collapse';
      nav.setAttribute('aria-expanded', 'true');
    }
  }

  window.toggleSidebar = function () {
    const nav = document.querySelector('.bnav');
    if (!nav) return;
    const isCollapsed = nav.classList.contains('collapsed');
    const next = !isCollapsed;
    try { localStorage.setItem(STORAGE_KEY, next ? '1' : '0'); } catch (_) {}
    applyCollapsed(next);
  };

  window.initSidebar = function () {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      applyCollapsed(saved === '1');
    } catch (_) {
      applyCollapsed(false);
    }
  };

  // Wait for React to mount the nav, then restore saved state.
  function tryInit() {
    if (document.querySelector('.bnav')) {
      window.initSidebar();
    } else {
      requestAnimationFrame(tryInit);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      requestAnimationFrame(tryInit);
    });
  } else {
    requestAnimationFrame(tryInit);
  }
})();
