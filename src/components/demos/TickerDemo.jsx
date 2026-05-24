export function TickerBefore() {
  return (
    <div className="tickermock">
      <span className="gold">GOLD $2,645 <span className="up">▲0.8%</span></span>
      <span>BTC $67,340 <span className="up">▲1.2%</span></span>
      <span>EUR/USD 1.087 <span className="dn">▼0.1%</span></span>
    </div>
  )
}

export function TickerAfter() {
  return (
    <div className="tickermock fixed">
      <span className="gold">GOLD $2,645</span>
      <span>BTC $67,340</span>
      <span>EUR/USD 1.087</span>
      <span className="stale">Indicative · updated 4 min ago</span>
    </div>
  )
}
