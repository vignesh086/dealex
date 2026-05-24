/* eslint-disable react/no-unknown-property */
// Small mock components used inside each issue card. Each pair = before / after.

// ─────────── #1 Emoji nav ───────────
function EmojiNavBefore(){
  return (
    <div className="demo-row">
      <div className="minisb">
        <div className="item act"><span className="emo">🏠</span>Home</div>
        <div className="item"><span className="emo">🏦</span>Instruments</div>
        <div className="item"><span className="emo">📄</span>Templates</div>
        <div className="item"><span className="emo">💼</span>Desk</div>
        <div className="item"><span className="emo">👨‍💼</span>Experts</div>
      </div>
    </div>
  );
}
function EmojiNavAfter(){
  const Icon = ({d}) => (
    <svg className="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
  );
  return (
    <div className="demo-row">
      <div className="minisb">
        <div className="item act">
          <svg className="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z"/></svg>
          Home
        </div>
        <div className="item">
          <svg className="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-6 9 6v2H3v-2zM5 12v8M19 12v8M9 12v8M15 12v8M3 21h18"/></svg>
          Instruments
        </div>
        <div className="item">
          <svg className="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6"/></svg>
          Templates
        </div>
        <div className="item">
          <svg className="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></svg>
          Desk
        </div>
        <div className="item">
          <svg className="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="3"/><circle cx="17" cy="11" r="2"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5M14.5 18.5c.4-1.8 2-3 4-3s3 1 3.5 2.5"/></svg>
          Experts
        </div>
      </div>
    </div>
  );
}

// ─────────── #2 Type ───────────
function TypeBefore(){
  return (
    <div className="demo-row">
      <div className="typecard">
        <div className="tlabel">Document checklist · as shipped</div>
        <div className="h">PASSPORT (CLEAR, VALID, NOT EXPIRED)</div>
        <div className="d">Colour copy, all corners visible. Required for KYC/CIS submission to DEALEX.</div>
        <div className="h" style={{marginTop:4}}>COMPANY REGISTRATION CERTIFICATE</div>
        <div className="d">Certificate of Incorporation or equivalent. Must show your name as director.</div>
      </div>
    </div>
  );
}
function TypeAfter(){
  return (
    <div className="demo-row">
      <div className="typecard fixed">
        <div className="tlabel">Same content · 14/13.5px</div>
        <div className="h">Passport</div>
        <div className="d">Clear color copy, all corners visible. For KYC and CIS submission to Dealex.</div>
        <div className="h" style={{marginTop:6}}>Company registration certificate</div>
        <div className="d">Certificate of Incorporation, showing you as director or authorized signatory.</div>
      </div>
    </div>
  );
}

// ─────────── #3 Color tokens ───────────
function ColorBefore(){
  return (
    <div className="tok-list">
      <div className="tok"><span className="sw" style={{background:'#3B49DF'}}/><span className="name">--gold</span><span className="val">#3B49DF</span></div>
      <div className="tok"><span className="sw" style={{background:'#C7CBF8'}}/><span className="name">--gold-lt</span><span className="val">#C7CBF8</span></div>
      <div className="tok"><span className="sw" style={{background:'#2837B8'}}/><span className="name">--gold-dk</span><span className="val">#2837B8</span></div>
      <div className="tok"><span className="sw" style={{background:'rgba(59,73,223,.15)'}}/><span className="name">--gold-a15</span><span className="val">rgba(59,73,223,.15)</span></div>
    </div>
  );
}
function ColorAfter(){
  return (
    <div className="tok-list">
      <div className="tok"><span className="sw" style={{background:'#5B6BFF'}}/><span className="name">--accent</span><span className="val">#5B6BFF</span></div>
      <div className="tok"><span className="sw" style={{background:'#C7CBF8'}}/><span className="name">--accent-100</span><span className="val">#C7CBF8</span></div>
      <div className="tok"><span className="sw" style={{background:'#2837B8'}}/><span className="name">--accent-700</span><span className="val">#2837B8</span></div>
      <div className="tok"><span className="sw" style={{background:'rgba(91,107,255,.15)'}}/><span className="name">--accent-soft</span><span className="val">rgba(91,107,255,.15)</span></div>
    </div>
  );
}

// ─────────── #4 Copy ───────────
function CopyBefore(){
  return (
    <div className="copybox bad">
      <div className="ttl">⚠ Dealex ground rules — read before you proceed</div>
      <div className="line"><span className="x">✗</span> No Zoom calls. No WhatsApp negotiations. All communication flows through DEALEX.</div>
      <div className="line"><span className="x">✗</span> No paperwork floating to anyone. Documents go only where they need to go.</div>
      <div className="line"><span className="x">✗</span> No step is skipped. NCNDA → KYC → DOA → IMFPA → SWIFT. Every time.</div>
    </div>
  );
}
function CopyAfter(){
  return (
    <div className="copybox good">
      <div className="ttl">For brokers, mandates &amp; principals</div>
      <div className="lede">Close trade-finance deals on a single audited rail.</div>
      <div className="sub">NCNDA, KYC, DOA, IMFPA, term sheet, bank package, SWIFT — sequenced, signed, and routed for you. No WhatsApp, no email attachments, no chasing.</div>
      <div className="ctas">
        <button className="pri">Start a deal</button>
        <button className="sec">See how it works</button>
      </div>
    </div>
  );
}

// ─────────── #5 CTA ───────────
function CtaBefore(){
  return (
    <div className="heromock">
      <div className="tag">Global deal platform — no Zoom calls.</div>
      <h3>Deals done<br/>the right way.</h3>
      <p>Real procedures. Real compliance. Real protection. We control the sequence — so your deal actually closes.</p>
      <div className="scrollhint">↓ scroll 4 screens to find a button ↓</div>
    </div>
  );
}
function CtaAfter(){
  return (
    <div className="heromock">
      <div className="tag">For brokers, mandates &amp; principals</div>
      <h3>Close trade-finance<br/>deals on one rail.</h3>
      <p>Sequenced NCNDA → KYC → DOA → IMFPA → SWIFT. Audited, routed, paymaster-protected.</p>
      <div className="ctas">
        <button className="pri">Start your first deal</button>
        <button className="sec">How it works</button>
      </div>
    </div>
  );
}

// ─────────── #6 Code ───────────
function CodeBefore(){
  return (
    <pre className="code-small"><span style={{color:'#5A6478'}}>{`// Sidebar.jsx — strings + window.* globals\n`}</span>{`<div dangerouslySetInnerHTML={{ __html: \`\n  <button class="bn act" \n    aria-selected="true"  `}<span style={{color:'#FF5570'}}>{`// always true!`}</span>{`\n    onclick="navTo('home')">\n    <span class="bni">🏠</span> Home\n  </button>\n\`}} />`}</pre>
  );
}
function CodeAfter(){
  return (
    <pre className="code-small"><span style={{color:'#5A6478'}}>{`// Real component — state drives ARIA\n`}</span>{`const [tab, setTab] = useState('home');\nreturn TABS.map(t => (\n  <button key={t.id}\n    className={\`nav-item \${tab===t.id?'on':''}\`}\n    aria-selected={tab===t.id}\n    onClick={() => setTab(t.id)}>\n    <Icon name={t.icon}/> {t.label}\n  </button>\n));`}</pre>
  );
}

// ─────────── #7 Ticker ───────────
function TickerBefore(){
  return (
    <div className="tickermock">
      <span className="gold">GOLD $2,645 <span className="up">▲0.8%</span></span>
      <span>BTC $67,340 <span className="up">▲1.2%</span></span>
      <span>EUR/USD 1.087 <span className="dn">▼0.1%</span></span>
    </div>
  );
}
function TickerAfter(){
  return (
    <div className="tickermock fixed">
      <span className="gold">GOLD $2,645</span>
      <span>BTC $67,340</span>
      <span>EUR/USD 1.087</span>
      <span className="stale">Indicative · updated 4 min ago</span>
    </div>
  );
}

// ─────────── #8 Diagram ───────────
function DiagramBefore(){
  // crude CSS rendition of the current diagram
  return (
    <div className="diagmock">
      <div className="row2">
        <div className="box a">PRINCIPAL A</div>
        <div className="box b">PRINCIPAL B</div>
      </div>
      <svg width="220" height="50" viewBox="0 0 220 50" style={{margin:'-4px 0'}}>
        <line x1="55" y1="0" x2="55" y2="20" stroke="#8B95B0" strokeDasharray="3 3" opacity=".5"/>
        <line x1="165" y1="0" x2="165" y2="20" stroke="#8B95B0" strokeDasharray="3 3" opacity=".5"/>
        <path d="M55 30 Q 55 50 110 50 T 165 30" stroke="#8B95B0" strokeDasharray="3 3" fill="none" opacity=".4"/>
      </svg>
      <div className="box broker">BROKER</div>
      <div className="box platform" style={{marginTop:8}}>DEALEX — NEUTRAL PLATFORM</div>
      <div style={{fontSize:10,color:'var(--ink-3)',marginTop:8,fontFamily:'JetBrains Mono,monospace'}}>Skewed pseudo-elements, lines don't meet boxes</div>
    </div>
  );
}
function DiagramAfter(){
  return (
    <div className="diagmock">
      <svg width="320" height="220" viewBox="0 0 320 220" style={{maxWidth:'100%'}}>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#6B7592"/>
          </marker>
        </defs>
        {/* Row 1 — principals */}
        <g>
          <rect x="20" y="10" width="120" height="36" rx="6" fill="rgba(125,211,252,.08)" stroke="rgba(125,211,252,.5)"/>
          <text x="80" y="33" textAnchor="middle" fill="#7DD3FC" fontSize="11" fontWeight="700" fontFamily="Inter">PRINCIPAL A</text>
          <rect x="180" y="10" width="120" height="36" rx="6" fill="rgba(134,239,172,.08)" stroke="rgba(134,239,172,.5)"/>
          <text x="240" y="33" textAnchor="middle" fill="#86EFAC" fontSize="11" fontWeight="700" fontFamily="Inter">PRINCIPAL B</text>
        </g>
        {/* connectors to mandates */}
        <line x1="80" y1="46" x2="80" y2="78" stroke="#6B7592" strokeDasharray="3 3" markerEnd="url(#arr)"/>
        <line x1="240" y1="46" x2="240" y2="78" stroke="#6B7592" strokeDasharray="3 3" markerEnd="url(#arr)"/>
        {/* Row 2 — mandates */}
        <g>
          <rect x="20" y="82" width="120" height="30" rx="6" fill="rgba(125,211,252,.04)" stroke="rgba(125,211,252,.3)"/>
          <text x="80" y="102" textAnchor="middle" fill="#7DD3FC" fontSize="10" fontWeight="600" fontFamily="Inter">MANDATE A</text>
          <rect x="180" y="82" width="120" height="30" rx="6" fill="rgba(134,239,172,.04)" stroke="rgba(134,239,172,.3)"/>
          <text x="240" y="102" textAnchor="middle" fill="#86EFAC" fontSize="10" fontWeight="600" fontFamily="Inter">MANDATE B</text>
        </g>
        {/* converge to broker */}
        <path d="M80 112 Q 80 130 160 130" stroke="#6B7592" strokeDasharray="3 3" fill="none"/>
        <path d="M240 112 Q 240 130 160 130" stroke="#6B7592" strokeDasharray="3 3" fill="none" markerEnd="url(#arr)"/>
        {/* Row 3 — broker */}
        <rect x="100" y="132" width="120" height="30" rx="6" fill="rgba(167,139,250,.08)" stroke="rgba(167,139,250,.5)"/>
        <text x="160" y="152" textAnchor="middle" fill="#A78BFA" fontSize="10" fontWeight="700" fontFamily="Inter">BROKER</text>
        <line x1="160" y1="162" x2="160" y2="180" stroke="#6B7592" strokeDasharray="3 3" markerEnd="url(#arr)"/>
        {/* Row 4 — platform */}
        <rect x="40" y="182" width="240" height="32" rx="6" fill="rgba(91,107,255,.14)" stroke="#5B6BFF" strokeWidth="1.5"/>
        <text x="160" y="203" textAnchor="middle" fill="#5B6BFF" fontSize="11" fontWeight="800" fontFamily="Inter" letterSpacing="1.5">DEALEX · NEUTRAL PLATFORM</text>
      </svg>
    </div>
  );
}

// ─────────── #9 Letter-spacing ───────────
function SpacingBefore(){
  return (
    <div className="lscompare">
      <div className="lbl-bad">SELECT YOUR ROLE TO SEE WHAT YOU NEED</div>
      <div className="lbl-bad">MUST HAVE — DEAL CANNOT START</div>
      <div className="lbl-bad">SHOULD HAVE — STRENGTHENS YOUR POSITION</div>
      <div className="lbl-bad">YOUR IMFPA RIGHTS</div>
      <div className="lbl-bad">WHAT YOU NEED TO OPEN A DEAL</div>
      <div style={{fontSize:11,color:'var(--ink-3)',marginTop:6,fontFamily:'JetBrains Mono,monospace'}}>every section header looks the same</div>
    </div>
  );
}
function SpacingAfter(){
  return (
    <div className="lscompare">
      <div className="lbl-ok">Select your role</div>
      <div><span className="lbl-meta">Required</span><div className="lbl-ok">Deal cannot start without these</div></div>
      <div><span className="lbl-meta">Recommended</span><div className="lbl-ok">Strengthens your position</div></div>
      <div className="lbl-ok">Your IMFPA rights</div>
      <div style={{fontSize:11,color:'var(--ink-3)',marginTop:6,fontFamily:'JetBrains Mono,monospace'}}>weight + meta-label do the work</div>
    </div>
  );
}

// ─────────── #10 Focus ───────────
function FocusBefore(){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:14,alignItems:'center'}}>
      <div className="focusrow">
        <button className="fbtn tiny">🇬🇧 English</button>
        <button className="fbtn tiny">🇨🇳 中文</button>
        <button className="fbtn" style={{width:34,height:34,padding:0,fontSize:16}}>🌙</button>
      </div>
      <div className="fcaption">22px tall · 34px square · no focus ring</div>
    </div>
  );
}
function FocusAfter(){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:14,alignItems:'center'}}>
      <div className="focusrow">
        <button className="fbtn fat foc">English</button>
        <button className="fbtn fat">中文</button>
        <button className="fbtn fat" aria-label="Toggle theme">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
      </div>
      <div className="fcaption">44px min · 2px focus ring · SVG glyph</div>
    </div>
  );
}

// Make all demo components globally available
Object.assign(window, {
  EmojiNavBefore, EmojiNavAfter,
  TypeBefore, TypeAfter,
  ColorBefore, ColorAfter,
  CopyBefore, CopyAfter,
  CtaBefore, CtaAfter,
  CodeBefore, CodeAfter,
  TickerBefore, TickerAfter,
  DiagramBefore, DiagramAfter,
  SpacingBefore, SpacingAfter,
  FocusBefore, FocusAfter,
});
