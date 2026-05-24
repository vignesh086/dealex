/* eslint-disable react/no-unknown-property */
// Three landing-direction mockups + redesigned app shell

// ───────────── shared mock frame helpers ─────────────
const dxStyles = {
  wrap: {position:'absolute', inset:0, fontFamily:'Inter, sans-serif', color:'#E6EBF5', overflow:'hidden'},
  topbar: {height:38, borderBottom:'1px solid rgba(148,163,184,.12)', display:'flex', alignItems:'center', padding:'0 14px', justifyContent:'space-between'},
  logo: {fontFamily:'JetBrains Mono,monospace', fontSize:11, fontWeight:700, letterSpacing:'.14em'},
};

// ───────────── Direction A — Calm institutional ─────────────
function LandingA(){
  return (
    <div style={{...dxStyles.wrap, background:'#0B0F1A'}}>
      <div style={{...dxStyles.topbar, background:'#0B0F1A'}}>
        <div style={dxStyles.logo}>DEAL<span style={{color:'#5B6BFF'}}>EX</span></div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <span style={{fontSize:10, color:'#6B7592', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.1em'}}>EN · 中文</span>
          <button style={{width:24,height:24,border:'1px solid rgba(148,163,184,.2)',borderRadius:4,background:'transparent',display:'flex',alignItems:'center',justifyContent:'center',color:'#A8B1C6'}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
        </div>
      </div>
      {/* Hero */}
      <div style={{padding:'28px 18px 18px'}}>
        <div style={{fontSize:9, color:'#6B7592', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.18em', textTransform:'uppercase', marginBottom:14}}>For brokers, mandates &amp; principals</div>
        <div style={{fontSize:24, fontWeight:600, lineHeight:1.1, letterSpacing:'-.015em', marginBottom:10}}>Close trade-finance deals on one audited rail.</div>
        <div style={{fontSize:11, color:'#A8B1C6', lineHeight:1.55, marginBottom:18}}>NCNDA → KYC → DOA → IMFPA → SWIFT. Sequenced, signed, paymaster-protected.</div>
        <div style={{display:'flex', gap:6}}>
          <button style={{background:'#5B6BFF', color:'#fff', border:'none', padding:'9px 14px', fontSize:11, fontWeight:600, borderRadius:4}}>Start a deal →</button>
          <button style={{background:'transparent', color:'#E6EBF5', border:'1px solid rgba(148,163,184,.2)', padding:'9px 14px', fontSize:11, fontWeight:500, borderRadius:4}}>How it works</button>
        </div>
      </div>
      {/* Compact "what happens" */}
      <div style={{padding:'0 18px 18px'}}>
        <div style={{fontSize:9, color:'#6B7592', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.16em', textTransform:'uppercase', marginBottom:10}}>What we sequence</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(148,163,184,.12)', border:'1px solid rgba(148,163,184,.12)', borderRadius:6, overflow:'hidden'}}>
          {['NCNDA','KYC','DOA','IMFPA','Term Sheet','SWIFT'].map((s,i)=>(
            <div key={i} style={{background:'#141C30', padding:'10px 8px', fontSize:9.5, color:'#E6EBF5', fontWeight:500, textAlign:'center'}}>
              <div style={{fontSize:8, color:'#6B7592', fontFamily:'JetBrains Mono,monospace', marginBottom:2}}>0{i+1}</div>
              {s}
            </div>
          ))}
        </div>
      </div>
      {/* Role row */}
      <div style={{padding:'0 18px 18px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:6}}>
          {[['Principal','Owns the deal'],['Mandate','Represents a principal'],['Broker','Holds one or both sides'],['Bank officer','Receives & authenticates']].map(([t,s],i)=>(
            <div key={i} style={{border:'1px solid rgba(148,163,184,.14)', borderRadius:4, padding:'9px 10px', background:'#10172A'}}>
              <div style={{fontSize:11, fontWeight:600, color:'#E6EBF5', marginBottom:2}}>{t}</div>
              <div style={{fontSize:9, color:'#6B7592', lineHeight:1.4}}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer trust */}
      <div style={{position:'absolute', bottom:0, left:0, right:0, padding:'10px 18px', borderTop:'1px solid rgba(148,163,184,.12)', display:'flex', justifyContent:'space-between', fontSize:8.5, color:'#6B7592', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.1em'}}>
        <span>SWIFT CAT 7 · 2025</span>
        <span>AUDIT-LOGGED</span>
      </div>
    </div>
  );
}

// ───────────── Direction B — Editorial / type-led ─────────────
function LandingB(){
  return (
    <div style={{...dxStyles.wrap, background:'#F4F1EA', color:'#1A1F2E'}}>
      <div style={{height:38, display:'flex', alignItems:'center', padding:'0 16px', justifyContent:'space-between', borderBottom:'1px solid rgba(26,31,46,.1)'}}>
        <div style={{fontFamily:'JetBrains Mono,monospace', fontSize:11, fontWeight:700, letterSpacing:'.14em'}}>DEAL<span style={{color:'#1F35C7'}}>EX</span></div>
        <div style={{fontSize:9, color:'#6B7592', letterSpacing:'.14em', fontFamily:'JetBrains Mono,monospace'}}>EN · 中文 · ☾</div>
      </div>
      <div style={{padding:'24px 18px 16px'}}>
        <div style={{fontFamily:'JetBrains Mono,monospace', fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', color:'#6B7592', marginBottom:18}}>· Vol. 01 — The discipline of trade finance</div>
        <div style={{fontSize:32, fontWeight:400, lineHeight:1, letterSpacing:'-.025em', marginBottom:14, fontFamily:'Inter,serif', fontStyle:'italic'}}>The deal closes <span style={{fontStyle:'normal', fontWeight:700}}>because</span> the sequence is kept.</div>
        <div style={{fontSize:11, color:'#3F4A66', lineHeight:1.6, marginBottom:18, maxWidth:280}}>Dealex is the neutral platform that holds the order of operations — NCNDA, KYC, DOA, IMFPA, term sheet, bank package, SWIFT — so every party plays their role exactly once.</div>
        <div style={{display:'flex', gap:6, marginBottom:18}}>
          <button style={{background:'#1A1F2E', color:'#fff', border:'none', padding:'10px 16px', fontSize:11, fontWeight:600, borderRadius:0, letterSpacing:'.04em'}}>Begin a deal</button>
          <button style={{background:'transparent', color:'#1A1F2E', border:'1px solid #1A1F2E', padding:'10px 16px', fontSize:11, fontWeight:500, borderRadius:0}}>The playbook</button>
        </div>
      </div>
      {/* Numbered chapter */}
      <div style={{padding:'0 18px', borderTop:'1px solid rgba(26,31,46,.12)', paddingTop:14}}>
        <div style={{display:'flex', gap:14, fontSize:9.5, color:'#3F4A66', lineHeight:1.5}}>
          <div style={{fontSize:26, fontWeight:300, lineHeight:1, color:'#1A1F2E', fontFamily:'JetBrains Mono,monospace'}}>I.</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700, color:'#1A1F2E', marginBottom:3, fontSize:11}}>Identify your role</div>
            Principal, Mandate, Broker, Bank — each has a different document set and a different protection.
          </div>
        </div>
        <div style={{display:'flex', gap:14, fontSize:9.5, color:'#3F4A66', lineHeight:1.5, marginTop:12}}>
          <div style={{fontSize:26, fontWeight:300, lineHeight:1, color:'#1A1F2E', fontFamily:'JetBrains Mono,monospace'}}>II.</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700, color:'#1A1F2E', marginBottom:3, fontSize:11}}>Assemble the package</div>
            Dealex routes each document to the right party — and only that party.
          </div>
        </div>
        <div style={{display:'flex', gap:14, fontSize:9.5, color:'#3F4A66', lineHeight:1.5, marginTop:12}}>
          <div style={{fontSize:26, fontWeight:300, lineHeight:1, color:'#1A1F2E', fontFamily:'JetBrains Mono,monospace'}}>III.</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700, color:'#1A1F2E', marginBottom:3, fontSize:11}}>Issue via SWIFT</div>
            MT760 (SBLC) and MT700 (DLC) drafts ready for your bank to authenticate.
          </div>
        </div>
      </div>
      <div style={{position:'absolute', bottom:0, left:0, right:0, padding:'10px 18px', borderTop:'1px solid rgba(26,31,46,.1)', display:'flex', justifyContent:'space-between', fontSize:8.5, color:'#6B7592', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.1em'}}>
        <span>EST. 2024</span>
        <span>SWIFT · CAT 7 · 2025</span>
      </div>
    </div>
  );
}

// ───────────── Direction C — Product-first / dashboard preview ─────────────
function LandingC(){
  return (
    <div style={{...dxStyles.wrap, background:'#06090F'}}>
      <div style={{...dxStyles.topbar, background:'#06090F'}}>
        <div style={dxStyles.logo}>DEAL<span style={{color:'#22C58A'}}>EX</span></div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button style={{background:'#22C58A',color:'#06090F',border:'none',padding:'5px 10px',fontSize:9.5,fontWeight:700,borderRadius:3}}>Sign in</button>
        </div>
      </div>
      {/* Split hero */}
      <div style={{padding:'22px 16px 12px'}}>
        <div style={{display:'inline-block', fontSize:9, color:'#22C58A', background:'rgba(34,197,138,.1)', border:'1px solid rgba(34,197,138,.3)', padding:'3px 8px', borderRadius:99, fontFamily:'JetBrains Mono,monospace', letterSpacing:'.1em', marginBottom:14}}>● LIVE · 12 deals routing</div>
        <div style={{fontSize:22, fontWeight:700, lineHeight:1.1, letterSpacing:'-.015em', marginBottom:8}}>The deal desk for SBLC, DLC &amp; SWIFT MT760.</div>
        <div style={{fontSize:11, color:'#A8B1C6', lineHeight:1.5, marginBottom:14}}>One workspace for every party. Real audit trail. Real protection.</div>
        <div style={{display:'flex', gap:6, marginBottom:16}}>
          <button style={{background:'#22C58A',color:'#06090F',border:'none',padding:'9px 14px',fontSize:11,fontWeight:700,borderRadius:4}}>Open a deal →</button>
          <button style={{background:'transparent',color:'#E6EBF5',border:'1px solid rgba(148,163,184,.2)',padding:'9px 14px',fontSize:11,fontWeight:500,borderRadius:4}}>View demo</button>
        </div>
      </div>
      {/* Dashboard preview */}
      <div style={{margin:'0 16px', border:'1px solid rgba(148,163,184,.16)', borderRadius:6, background:'#0B0F1A', overflow:'hidden'}}>
        <div style={{display:'flex', borderBottom:'1px solid rgba(148,163,184,.12)', padding:'6px 10px', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex',gap:10,fontSize:8.5,color:'#A8B1C6',fontFamily:'JetBrains Mono,monospace',letterSpacing:'.08em'}}>
            <span style={{color:'#fff',fontWeight:700}}>DEAL DESK</span>
            <span style={{color:'#6B7592'}}>3 active</span>
          </div>
          <div style={{fontSize:8,color:'#6B7592',fontFamily:'JetBrains Mono,monospace'}}>Q2 2026</div>
        </div>
        {[
          ['DX-1041','SBLC $5M','NCNDA','#5B6BFF','35%'],
          ['DX-1039','MT760 €12M','DOA','#22C58A','62%'],
          ['DX-1037','DLC $2.4M','IMFPA','#F5A623','78%'],
        ].map(([id,title,stage,color,pct],i)=>(
          <div key={i} style={{padding:'8px 10px', borderTop: i?'1px solid rgba(148,163,184,.06)':'none', display:'flex', alignItems:'center', gap:8}}>
            <div style={{fontSize:8.5,fontFamily:'JetBrains Mono,monospace',color:'#6B7592',width:42}}>{id}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:10,fontWeight:600,marginBottom:3}}>{title}</div>
              <div style={{height:3, background:'rgba(148,163,184,.1)', borderRadius:99, overflow:'hidden'}}>
                <div style={{height:'100%',width:pct,background:color,borderRadius:99}}/>
              </div>
            </div>
            <div style={{fontSize:8,fontFamily:'JetBrains Mono,monospace',color,letterSpacing:'.08em',textAlign:'right',width:54}}>{stage}</div>
          </div>
        ))}
      </div>
      {/* Stats row */}
      <div style={{position:'absolute', bottom:14, left:16, right:16, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8}}>
        {[['$284M','routed'],['1,240','deals'],['18 hrs','median cycle']].map(([v,l],i)=>(
          <div key={i} style={{borderLeft:'1px solid rgba(148,163,184,.2)', paddingLeft:8}}>
            <div style={{fontSize:14,fontWeight:700,letterSpacing:'-.01em'}}>{v}</div>
            <div style={{fontSize:8,color:'#6B7592',textTransform:'uppercase',letterSpacing:'.1em',fontFamily:'JetBrains Mono,monospace'}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────── Redesigned App Shell ─────────────
function ShellRedesign(){
  const NavIcon = ({d, on}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on?'#5B6BFF':'#6B7592'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
  );
  return (
    <div style={{...dxStyles.wrap, background:'#0B0F1A', display:'flex', flexDirection:'row'}}>
      {/* Sidebar */}
      <div style={{width:54, borderRight:'1px solid rgba(148,163,184,.12)', display:'flex', flexDirection:'column', padding:'12px 0'}}>
        <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:10,fontWeight:800,letterSpacing:'.04em',textAlign:'center',marginBottom:14}}>
          <div>D</div><div style={{color:'#5B6BFF'}}>X</div>
        </div>
        {[
          {d:'M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z', label:'Home', on:true},
          {d:'M3 10l9-6 9 6v2H3v-2zM5 12v8M19 12v8M9 12v8M15 12v8M3 21h18', label:'Instruments'},
          {d:'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6', label:'Templates'},
          {d:'M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', label:'Desk'},
          {d:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', label:'Experts'},
        ].map((it,i)=>(
          <div key={i} style={{padding:'10px 0', display:'flex', flexDirection:'column', alignItems:'center', gap:4, position:'relative', background:it.on?'rgba(91,107,255,.08)':'transparent'}}>
            {it.on && <div style={{position:'absolute',left:0,top:8,bottom:8,width:2,background:'#5B6BFF',borderRadius:'0 2px 2px 0'}}/>}
            <NavIcon d={it.d} on={it.on}/>
            <div style={{fontSize:8, color:it.on?'#E6EBF5':'#6B7592', fontWeight:600, letterSpacing:'.04em'}}>{it.label}</div>
          </div>
        ))}
      </div>
      {/* Main */}
      <div style={{flex:1, display:'flex', flexDirection:'column'}}>
        {/* Topbar */}
        <div style={{height:42, borderBottom:'1px solid rgba(148,163,184,.12)', display:'flex', alignItems:'center', padding:'0 16px', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <div style={{fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#6B7592', letterSpacing:'.16em', textTransform:'uppercase'}}>Home / Overview</div>
          </div>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <div style={{padding:'4px 8px', border:'1px solid rgba(148,163,184,.16)', borderRadius:4, fontSize:9, color:'#A8B1C6', fontFamily:'JetBrains Mono,monospace'}}>⌘K</div>
            <div style={{width:24,height:24,borderRadius:'50%',background:'linear-gradient(135deg,#5B6BFF,#A78BFA)'}}/>
          </div>
        </div>
        {/* Ticker — fixed */}
        <div style={{height:24, background:'#10172A', borderBottom:'1px solid rgba(148,163,184,.08)', display:'flex', alignItems:'center', padding:'0 14px', gap:14, fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#A8B1C6'}}>
          <span style={{display:'flex',alignItems:'center',gap:4,fontSize:7.5,color:'#22C58A',letterSpacing:'.14em',textTransform:'uppercase'}}>
            <span style={{width:5,height:5,borderRadius:'50%',background:'#22C58A'}}/> Live
          </span>
          <span><span style={{color:'#E8B968'}}>GOLD</span> 2,645 <span style={{color:'#22C58A'}}>▲0.8%</span></span>
          <span>BTC 67,340 <span style={{color:'#22C58A'}}>▲1.2%</span></span>
          <span>EUR/USD 1.087 <span style={{color:'#FF5570'}}>▼0.1%</span></span>
          <span style={{color:'#6B7592'}}>· 12s ago</span>
        </div>
        {/* Content */}
        <div style={{padding:'18px 16px', flex:1}}>
          <div style={{fontSize:18, fontWeight:600, letterSpacing:'-.015em', marginBottom:4}}>Good morning, Vignesh.</div>
          <div style={{fontSize:11, color:'#A8B1C6', marginBottom:18}}>3 active deals · 2 awaiting your signature</div>
          {/* Deal cards */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8}}>
            {[
              {id:'DX-1041', t:'SBLC USD 5M', stage:'NCNDA pending', c:'#5B6BFF'},
              {id:'DX-1039', t:'MT760 EUR 12M', stage:'DOA review', c:'#22C58A'},
              {id:'DX-1037', t:'DLC USD 2.4M', stage:'IMFPA signed', c:'#F5A623'},
              {id:'DX-1029', t:'SBLC GBP 8M', stage:'SWIFT routed', c:'#A78BFA'},
            ].map((d,i)=>(
              <div key={i} style={{border:'1px solid rgba(148,163,184,.14)', borderRadius:6, padding:'10px 12px', background:'#10172A', position:'relative'}}>
                <div style={{position:'absolute',left:0,top:8,bottom:8,width:2,background:d.c,borderRadius:'0 2px 2px 0'}}/>
                <div style={{fontFamily:'JetBrains Mono,monospace', fontSize:8.5, color:'#6B7592', letterSpacing:'.1em', marginBottom:3}}>{d.id}</div>
                <div style={{fontSize:11, fontWeight:600, marginBottom:3}}>{d.t}</div>
                <div style={{fontSize:9, color:d.c}}>{d.stage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LandingA, LandingB, LandingC, ShellRedesign });
