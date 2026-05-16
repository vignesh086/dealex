import Sidebar from './Sidebar.jsx'
import HomeTab from './tabs/HomeTab.jsx'
import InstrumentsTab from './tabs/InstrumentsTab.jsx'
import MT760Tab from './tabs/MT760Tab.jsx'
import TemplatesTab from './tabs/TemplatesTab.jsx'
import ExpertsTab from './tabs/ExpertsTab.jsx'
import DealDeskTab from './tabs/DealDeskTab.jsx'
import WizardTab from './tabs/WizardTab.jsx'
import CommodityTab from './tabs/CommodityTab.jsx'

export default function AppShell() {
  return (
    <div id="app" style={{ display: 'none' }}>
      <div className="app-shell">
        {/* Sidebar — sticky on desktop, bottom nav on mobile */}
        <Sidebar />

        {/* Main content area */}
        <div className="app-main">
          {/* Topbar */}
          <div className="topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button className="tback" id="bkb" onClick={() => window.goBackNav()} style={{ display: 'none' }}>‹</button>
              <div className="tlogo" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '16px', letterSpacing: '.10em' }} onClick={() => window.navTo('home')}>
                <span style={{ color: 'var(--white)' }}>DEAL</span><span style={{ color: 'var(--gold)' }}>EX</span>
                <div className="dot"></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div id="topLabel" style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: '600' }}>HOME</div>
              <button className="theme-toggle" id="themeBtn" onClick={() => window.toggleTheme()} title="Toggle light/dark mode">🌙</button>
            </div>
          </div>

          {/* Ticker */}
          <div className="ticker">
            <div className="ticker-inner">
              <span className="tgold">GOLD $2,645 <span className="tg">▲0.8%</span></span>
              <span>BTC $67,340 <span className="tg">▲1.2%</span></span>
              <span>EUR/USD 1.087 <span className="tr">▼0.1%</span></span>
              <span className="tgold">SBLC MT760 Active</span>
              <span>CRUDE $78.45 <span className="tr">▼0.3%</span></span>
              <span className="tgold">GOLD $2,645 <span className="tg">▲0.8%</span></span>
              <span>BTC $67,340 <span className="tg">▲1.2%</span></span>
              <span>EUR/USD 1.087 <span className="tr">▼0.1%</span></span>
              <span className="tgold">SBLC MT760 Active</span>
              <span>CRUDE $78.45 <span className="tr">▼0.3%</span></span>
            </div>
          </div>

          {/* Tab pages */}
          <HomeTab />
          <InstrumentsTab />
          <MT760Tab />
          <TemplatesTab />
          <ExpertsTab />
          <DealDeskTab />
          <WizardTab />
          <CommodityTab />
        </div>
      </div>
    </div>
  )
}
