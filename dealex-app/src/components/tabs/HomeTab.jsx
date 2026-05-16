export default function HomeTab() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div class="tab-page act" id="pg-home">

<!-- Hero Banner -->
<div style="padding:0 16px;margin-bottom:20px;margin-top:4px">
<div style="background:linear-gradient(135deg,rgba(59,73,223,.13) 0%,rgba(59,73,223,.03) 100%);border:1px solid var(--border-hi);padding:22px 20px;position:relative;overflow:hidden;border-radius:2px">
<div style="position:absolute;top:0;right:0;width:120px;height:120px;background:radial-gradient(circle,rgba(59,73,223,.15) 0%,transparent 70%);pointer-events:none"></div>
<div style="font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:8px">DEALEX PLATFORM</div>
<div style="font-family:'Inter', sans-serif;font-size:clamp(22px,5.5vw,28px);font-weight:600;color:var(--white);line-height:1.2;margin-bottom:8px">Deals Done <span style="color:var(--gold);font-style:italic">Right.</span></div>
<div style="font-size:10px;color:var(--txt);line-height:1.7;margin-bottom:10px">DEALEX controls deal sequence. We verify documents, protect all parties, and execute SWIFT transmissions — in the right order, every time.</div>
<div style="display:flex;gap:8px;flex-wrap:wrap">
<div style="padding:4px 10px;background:rgba(53,160,101,.15);border:1px solid rgba(53,160,101,.3);font-size:8px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--green)">✓ ISP98</div>
<div style="padding:4px 10px;background:rgba(53,160,101,.15);border:1px solid rgba(53,160,101,.3);font-size:8px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--green)">✓ UCP600</div>
<div style="padding:4px 10px;background:rgba(53,160,101,.15);border:1px solid rgba(53,160,101,.3);font-size:8px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--green)">✓ FATF/AML</div>
<div style="padding:4px 10px;background:rgba(53,160,101,.15);border:1px solid rgba(53,160,101,.3);font-size:8px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--green)">✓ URDG758</div>
</div>
</div>
</div>

<!-- DEAL TYPE DECISION TREE -->
<div style="padding:0 16px;margin-bottom:20px">
<div style="font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:12px">▸ WHAT TYPE OF DEAL DO YOU HAVE?</div>

<!-- Decision tree SVG visual -->
<div style="background:var(--panel);border:1px solid var(--border);padding:16px;margin-bottom:12px;overflow:hidden">
<svg viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <!-- Root node -->
  <rect x="110" y="8" width="120" height="32" rx="4" fill="rgba(59,73,223,.15)" stroke="rgba(59,73,223,.5)" stroke-width="1"/>
  <text x="170" y="21" text-anchor="middle" fill="#3B49DF" font-size="8" font-weight="700" font-family="Montserrat,sans-serif" letter-spacing="1">YOUR DEAL</text>
  <text x="170" y="32" text-anchor="middle" fill="#E8E2D8" font-size="7.5" font-family="Montserrat,sans-serif">What are you trying to do?</text>

  <!-- Branch lines from root -->
  <line x1="170" y1="40" x2="170" y2="52" stroke="rgba(59,73,223,.4)" stroke-width="1.5"/>
  <line x1="170" y1="52" x2="75" y2="52" stroke="rgba(59,73,223,.4)" stroke-width="1.5"/>
  <line x1="170" y1="52" x2="265" y2="52" stroke="rgba(59,73,223,.4)" stroke-width="1.5"/>
  <line x1="75" y1="52" x2="75" y2="64" stroke="rgba(59,73,223,.4)" stroke-width="1.5"/>
  <line x1="265" y1="52" x2="265" y2="64" stroke="rgba(59,73,223,.4)" stroke-width="1.5"/>

  <!-- SBLC Branch -->
  <rect x="25" y="64" width="100" height="36" rx="4" fill="rgba(74,139,224,.12)" stroke="rgba(74,139,224,.4)" stroke-width="1"/>
  <text x="75" y="77" text-anchor="middle" fill="#4A8BE0" font-size="7.5" font-weight="700" font-family="Montserrat,sans-serif">PROJECT FUNDING</text>
  <text x="75" y="88" text-anchor="middle" fill="#A89E90" font-size="7" font-family="Montserrat,sans-serif">Raise capital for a project</text>
  <text x="75" y="97" text-anchor="middle" fill="#4A8BE0" font-size="6.5" font-weight="600" font-family="Montserrat,sans-serif">→ SBLC / MT760</text>

  <!-- Commodity Branch -->
  <rect x="215" y="64" width="100" height="36" rx="4" fill="rgba(53,160,101,.12)" stroke="rgba(53,160,101,.4)" stroke-width="1"/>
  <text x="265" y="77" text-anchor="middle" fill="#10B981" font-size="7.5" font-weight="700" font-family="Montserrat,sans-serif">TRADE COMMODITY</text>
  <text x="265" y="88" text-anchor="middle" fill="#A89E90" font-size="7" font-family="Montserrat,sans-serif">Buy or sell goods/materials</text>
  <text x="265" y="97" text-anchor="middle" fill="#10B981" font-size="6.5" font-weight="600" font-family="Montserrat,sans-serif">→ DLC / MT700</text>

  <!-- Down lines -->
  <line x1="75" y1="100" x2="75" y2="118" stroke="rgba(74,139,224,.4)" stroke-width="1.5"/>
  <line x1="265" y1="100" x2="265" y2="118" stroke="rgba(53,160,101,.4)" stroke-width="1.5"/>

  <!-- SBLC sub-nodes -->
  <rect x="10" y="118" width="68" height="28" rx="3" fill="rgba(74,139,224,.08)" stroke="rgba(74,139,224,.25)" stroke-width="1"/>
  <text x="44" y="130" text-anchor="middle" fill="#4A8BE0" font-size="7" font-weight="600" font-family="Montserrat,sans-serif">I have a</text>
  <text x="44" y="140" text-anchor="middle" fill="#4A8BE0" font-size="7" font-weight="600" font-family="Montserrat,sans-serif">RECEIVER</text>

  <rect x="82" y="118" width="68" height="28" rx="3" fill="rgba(74,139,224,.08)" stroke="rgba(74,139,224,.25)" stroke-width="1"/>
  <text x="116" y="130" text-anchor="middle" fill="#4A8BE0" font-size="7" font-weight="600" font-family="Montserrat,sans-serif">Need to</text>
  <text x="116" y="140" text-anchor="middle" fill="#4A8BE0" font-size="7" font-weight="600" font-family="Montserrat,sans-serif">FIND ONE</text>

  <line x1="75" y1="118" x2="44" y2="118" stroke="rgba(74,139,224,.3)" stroke-width="1"/>
  <line x1="75" y1="118" x2="116" y2="118" stroke="rgba(74,139,224,.3)" stroke-width="1"/>

  <!-- Commodity sub-nodes -->
  <rect x="200" y="118" width="64" height="28" rx="3" fill="rgba(53,160,101,.08)" stroke="rgba(53,160,101,.25)" stroke-width="1"/>
  <text x="232" y="130" text-anchor="middle" fill="#10B981" font-size="7" font-weight="600" font-family="Montserrat,sans-serif">I'm a</text>
  <text x="232" y="140" text-anchor="middle" fill="#10B981" font-size="7" font-weight="600" font-family="Montserrat,sans-serif">SELLER</text>

  <rect x="268" y="118" width="64" height="28" rx="3" fill="rgba(53,160,101,.08)" stroke="rgba(53,160,101,.25)" stroke-width="1"/>
  <text x="300" y="130" text-anchor="middle" fill="#10B981" font-size="7" font-weight="600" font-family="Montserrat,sans-serif">I'm a</text>
  <text x="300" y="140" text-anchor="middle" fill="#10B981" font-size="7" font-weight="600" font-family="Montserrat,sans-serif">BUYER</text>

  <line x1="265" y1="118" x2="232" y2="118" stroke="rgba(53,160,101,.3)" stroke-width="1"/>
  <line x1="265" y1="118" x2="300" y2="118" stroke="rgba(53,160,101,.3)" stroke-width="1"/>

  <!-- Both → DEALEX Sequence arrow -->
  <line x1="44" y1="146" x2="44" y2="158" stroke="rgba(59,73,223,.35)" stroke-width="1"/>
  <line x1="116" y1="146" x2="116" y2="158" stroke="rgba(59,73,223,.35)" stroke-width="1"/>
  <line x1="232" y1="146" x2="232" y2="158" stroke="rgba(59,73,223,.35)" stroke-width="1"/>
  <line x1="300" y1="146" x2="300" y2="158" stroke="rgba(59,73,223,.35)" stroke-width="1"/>
  <line x1="44" y1="158" x2="300" y2="158" stroke="rgba(59,73,223,.35)" stroke-width="1"/>
  <line x1="170" y1="158" x2="170" y2="170" stroke="rgba(59,73,223,.5)" stroke-width="1.5"/>

  <!-- DEALEX sequence node -->
  <rect x="80" y="170" width="180" height="32" rx="4" fill="rgba(59,73,223,.18)" stroke="rgba(59,73,223,.7)" stroke-width="1.5"/>
  <text x="170" y="182" text-anchor="middle" fill="#3B49DF" font-size="8" font-weight="700" font-family="Montserrat,sans-serif" letter-spacing="1">DEALEX SEQUENCE</text>
  <text x="170" y="194" text-anchor="middle" fill="#E8E2D8" font-size="7" font-family="Montserrat,sans-serif">NCNDA → KYC → DOA → Term Sheet → SWIFT</text>

  <line x1="170" y1="202" x2="170" y2="214" stroke="rgba(59,73,223,.5)" stroke-width="1.5"/>

  <!-- Deal closed -->
  <rect x="100" y="214" width="140" height="32" rx="4" fill="rgba(53,160,101,.2)" stroke="rgba(53,160,101,.7)" stroke-width="1.5"/>
  <text x="170" y="226" text-anchor="middle" fill="#10B981" font-size="8" font-weight="700" font-family="Montserrat,sans-serif" letter-spacing="1">✓ DEAL CLOSED</text>
  <text x="170" y="238" text-anchor="middle" fill="#E8E2D8" font-size="7" font-family="Montserrat,sans-serif">SWIFT transmitted · Funds released · Paid</text>
</svg>
</div>

<!-- Quick-start buttons -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
<div onclick="navTo('desk')" style="background:rgba(74,139,224,.1);border:1px solid rgba(74,139,224,.3);padding:14px;cursor:pointer;transition:all .2s" onmouseover="this.style.borderColor='#4A8BE0'" onmouseout="this.style.borderColor='rgba(74,139,224,.3)'">
<div style="font-size:18px;margin-bottom:6px">🏗️</div>
<div style="font-size:10px;font-weight:700;color:#4A8BE0;margin-bottom:2px">PROJECT FUNDING</div>
<div style="font-size:8px;color:var(--muted2)">SBLC · MT760 · 366 days</div>
<div style="font-size:7.5px;color:var(--muted);margin-top:4px">Soft costs → bankable project</div>
</div>
<div onclick="navTo('commodity')" style="background:rgba(53,160,101,.1);border:1px solid rgba(53,160,101,.3);padding:14px;cursor:pointer;transition:all .2s" onmouseover="this.style.borderColor='var(--green)'" onmouseout="this.style.borderColor='rgba(53,160,101,.3)'">
<div style="font-size:18px;margin-bottom:6px">⛽</div>
<div style="font-size:10px;font-weight:700;color:var(--green);margin-bottom:2px">COMMODITY TRADE</div>
<div style="font-size:8px;color:var(--muted2)">DLC · MT700 · B/L · COO</div>
<div style="font-size:7.5px;color:var(--muted);margin-top:4px">Bauxite · Crude · Gold · Agri</div>
</div>
</div>
</div>

<!-- DEALEX SEQUENCE PIPELINE VISUAL -->
<div style="padding:0 16px;margin-bottom:20px">
<div style="font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:12px">▸ HOW EVERY DEAL MOVES</div>
<div style="background:var(--panel);border:1px solid var(--border);padding:14px">
<!-- Step pipeline -->
<div style="display:flex;align-items:center;gap:0;overflow-x:auto;padding-bottom:4px" id="dealPipeline">
<!-- Step 1 -->
<div style="display:flex;flex-direction:column;align-items:center;min-width:56px;gap:4px">
<div style="width:36px;height:36px;border-radius:50%;background:rgba(59,73,223,.2);border:2px solid var(--gold);display:flex;align-items:center;justify-content:center;font-size:14px">📝</div>
<div style="font-size:7px;font-weight:700;color:var(--gold);text-align:center;letter-spacing:.05em">NCNDA</div>
<div style="font-size:6.5px;color:var(--muted);text-align:center">Both sign</div>
</div>
<!-- Connector -->
<div style="flex:1;min-width:12px;height:2px;background:linear-gradient(90deg,var(--gold),rgba(59,73,223,.4));margin-bottom:18px"></div>
<!-- Step 2 -->
<div style="display:flex;flex-direction:column;align-items:center;min-width:56px;gap:4px">
<div style="width:36px;height:36px;border-radius:50%;background:rgba(74,139,224,.15);border:2px solid rgba(74,139,224,.5);display:flex;align-items:center;justify-content:center;font-size:14px">🔐</div>
<div style="font-size:7px;font-weight:700;color:#4A8BE0;text-align:center;letter-spacing:.05em">KYC/CIS</div>
<div style="font-size:6.5px;color:var(--muted);text-align:center">Simultaneous</div>
</div>
<div style="flex:1;min-width:12px;height:2px;background:linear-gradient(90deg,rgba(74,139,224,.4),rgba(59,73,223,.4));margin-bottom:18px"></div>
<!-- Step 3 -->
<div style="display:flex;flex-direction:column;align-items:center;min-width:56px;gap:4px">
<div style="width:36px;height:36px;border-radius:50%;background:rgba(59,73,223,.15);border:2px solid rgba(59,73,223,.4);display:flex;align-items:center;justify-content:center;font-size:14px">📋</div>
<div style="font-size:7px;font-weight:700;color:var(--gold);text-align:center;letter-spacing:.05em">DOA</div>
<div style="font-size:6.5px;color:var(--muted);text-align:center">Auth docs</div>
</div>
<div style="flex:1;min-width:12px;height:2px;background:linear-gradient(90deg,rgba(59,73,223,.4),rgba(59,73,223,.4));margin-bottom:18px"></div>
<!-- Step 4 -->
<div style="display:flex;flex-direction:column;align-items:center;min-width:56px;gap:4px">
<div style="width:36px;height:36px;border-radius:50%;background:rgba(59,73,223,.15);border:2px solid rgba(59,73,223,.4);display:flex;align-items:center;justify-content:center;font-size:14px">📃</div>
<div style="font-size:7px;font-weight:700;color:var(--gold);text-align:center;letter-spacing:.05em">IMFPA</div>
<div style="font-size:6.5px;color:var(--muted);text-align:center">Fee protect</div>
</div>
<div style="flex:1;min-width:12px;height:2px;background:linear-gradient(90deg,rgba(59,73,223,.4),rgba(59,73,223,.4));margin-bottom:18px"></div>
<!-- Step 5 -->
<div style="display:flex;flex-direction:column;align-items:center;min-width:56px;gap:4px">
<div style="width:36px;height:36px;border-radius:50%;background:rgba(59,73,223,.15);border:2px solid rgba(59,73,223,.4);display:flex;align-items:center;justify-content:center;font-size:14px">🏦</div>
<div style="font-size:7px;font-weight:700;color:var(--gold);text-align:center;letter-spacing:.05em">SWIFT</div>
<div style="font-size:6.5px;color:var(--muted);text-align:center">Bank pkg</div>
</div>
<div style="flex:1;min-width:12px;height:2px;background:linear-gradient(90deg,rgba(59,73,223,.4),rgba(53,160,101,.6));margin-bottom:18px"></div>
<!-- Final -->
<div style="display:flex;flex-direction:column;align-items:center;min-width:56px;gap:4px">
<div style="width:36px;height:36px;border-radius:50%;background:rgba(53,160,101,.2);border:2px solid var(--green);display:flex;align-items:center;justify-content:center;font-size:14px">✅</div>
<div style="font-size:7px;font-weight:700;color:var(--green);text-align:center;letter-spacing:.05em">CLOSED</div>
<div style="font-size:6.5px;color:var(--muted);text-align:center">Funds out</div>
</div>
</div>
<div style="margin-top:10px;padding:8px;background:rgba(255,255,255,.02);border-top:1px solid var(--border)">
<div style="font-size:8px;color:var(--muted2);text-align:center">DEALEX controls sequencing — no step is skipped, no party is exposed before the prior step is verified.</div>
</div>
</div>
</div>

<!-- PATH OF LEAST RESISTANCE - PAYMENT RANKING -->
<div style="padding:0 16px;margin-bottom:20px">
<div style="font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:12px">▸ PAYMENT PATH — MOST TO LEAST DESIRABLE</div>
<div style="background:var(--panel);border:1px solid var(--border);padding:14px">
<div style="display:flex;flex-direction:column;gap:6px">
<!-- TT Wire -->
<div style="display:flex;align-items:center;gap:10px">
<div style="width:20px;height:20px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#000;flex-shrink:0">1</div>
<div style="flex:1">
<div style="height:28px;background:linear-gradient(90deg,rgba(53,160,101,.35),rgba(53,160,101,.1));border:1px solid rgba(53,160,101,.4);border-radius:2px;display:flex;align-items:center;padding:0 10px;position:relative;overflow:hidden">
<div style="position:absolute;left:0;top:0;bottom:0;width:100%;background:linear-gradient(90deg,rgba(53,160,101,.2),transparent)"></div>
<span style="font-size:9px;font-weight:700;color:var(--green);z-index:1">TT Wire (MT103)</span>
<span style="font-size:7.5px;color:var(--muted2);margin-left:8px;z-index:1">Fastest · Direct bank-to-bank · Best for seller</span>
</div>
</div>
</div>
<!-- DLC at Sight -->
<div style="display:flex;align-items:center;gap:10px">
<div style="width:20px;height:20px;border-radius:50%;background:rgba(59,73,223,.9);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#000;flex-shrink:0">2</div>
<div style="flex:1">
<div style="height:28px;background:linear-gradient(90deg,rgba(59,73,223,.25),rgba(59,73,223,.08));border:1px solid rgba(59,73,223,.35);border-radius:2px;display:flex;align-items:center;padding:0 10px">
<span style="font-size:9px;font-weight:700;color:var(--gold)">DLC at Sight (MT700)</span>
<span style="font-size:7.5px;color:var(--muted2);margin-left:8px">Bank-guaranteed · Gold standard for trade</span>
</div>
</div>
</div>
<!-- DLC Deferred -->
<div style="display:flex;align-items:center;gap:10px">
<div style="width:20px;height:20px;border-radius:50%;background:rgba(59,73,223,.6);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#000;flex-shrink:0">3</div>
<div style="flex:1">
<div style="height:28px;background:linear-gradient(90deg,rgba(59,73,223,.15),rgba(59,73,223,.04));border:1px solid rgba(59,73,223,.2);border-radius:2px;display:flex;align-items:center;padding:0 10px">
<span style="font-size:9px;font-weight:600;color:var(--txt)">DLC Deferred (30/60/90d)</span>
<span style="font-size:7.5px;color:var(--muted2);margin-left:8px">Guaranteed · Buyer gets delivery time</span>
</div>
</div>
</div>
<!-- SBLC backed -->
<div style="display:flex;align-items:center;gap:10px">
<div style="width:20px;height:20px;border-radius:50%;background:rgba(59,73,223,.4);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#000;flex-shrink:0">4</div>
<div style="flex:1">
<div style="height:28px;background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:2px;display:flex;align-items:center;padding:0 10px">
<span style="font-size:9px;color:var(--muted2)">SBLC-backed Wire</span>
<span style="font-size:7.5px;color:var(--muted);margin-left:8px">Draw on SBLC if buyer defaults</span>
</div>
</div>
</div>
<!-- Collection -->
<div style="display:flex;align-items:center;gap:10px">
<div style="width:20px;height:20px;border-radius:50%;background:rgba(208,64,64,.5);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;flex-shrink:0">5</div>
<div style="flex:1">
<div style="height:28px;background:rgba(208,64,64,.05);border:1px solid rgba(208,64,64,.2);border-radius:2px;display:flex;align-items:center;padding:0 10px">
<span style="font-size:9px;color:var(--red)">Documentary Collection</span>
<span style="font-size:7.5px;color:var(--muted);margin-left:8px">No bank guarantee · Higher risk</span>
</div>
</div>
</div>
</div>
</div>
</div>

<!-- KYC Shield -->
<div style="padding:0 16px;margin-bottom:20px">
<div style="background:var(--panel);border:1px solid var(--border);padding:14px;display:flex;gap:14px;align-items:flex-start">
<div style="flex-shrink:0">
<div style="width:44px;height:44px;background:rgba(53,160,101,.15);border:1px solid rgba(53,160,101,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px">🔒</div>
</div>
<div style="flex:1">
<div style="font-size:10px;font-weight:700;color:var(--white);margin-bottom:4px">KYC / CIS — Protected on DEALEX</div>
<div style="font-size:8.5px;color:var(--muted2);line-height:1.7;margin-bottom:6px">Your CIS goes to the <strong style="color:var(--white)">platform only</strong> — never to the other party. Counterparty sees only:</div>
<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(53,160,101,.12);border:1px solid rgba(53,160,101,.35);padding:5px 12px;border-radius:2px">
<span style="color:var(--green);font-weight:700;font-size:12px">✓</span>
<span style="font-size:9px;font-weight:700;color:var(--green)">KYC VERIFIED</span>
</div>
</div>
</div>
</div>
</div>

<!-- Quick nav cards -->
<div style="padding:0 16px;margin-bottom:20px">
<div style="font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:12px">▸ NAVIGATE</div>
<div class="ig">
<div class="ic" onclick="navTo('fi')"><div class="ii">🏦</div><div class="it">Financial Instruments</div><div class="is">SBLC · MT760 · MT103 · DLC</div></div>
<div class="ic" onclick="navTo('desk')"><div class="ii">💼</div><div class="it">DEALEX Desk</div><div class="is">Find a Receiver · Sender · Match</div></div>
<div class="ic" onclick="navTo('templates')"><div class="ii">📄</div><div class="it">Templates</div><div class="is">DOA · NCNDA · IMFPA · BCL</div></div>
<div class="ic" onclick="navTo('commodity')"><div class="ii">⛽</div><div class="it">Commodity Contracts</div><div class="is">Ore · Crude · Gas · Agri</div></div>
<div class="ic" onclick="navTo('wizard')"><div class="ii">✨</div><div class="it">DEALEX Wizard</div><div class="is">Don't know where to start?</div></div>
</div>
</div>

<!-- Live Deals -->
<div style="padding:0 16px;margin-bottom:20px"><div class="card"><div class="ch"><span class="chl">Live Deals</span><span class="pill po">3 Active</span></div><div class="cb"><div style="display:flex;justify-content:space-between;border-bottom:1px solid var(--border);padding:6px 0;font-size:10px"><span style="color:var(--white);font-weight:500">SBLC — EUR 100M</span><span class="pill pg">In Progress</span></div><div style="display:flex;justify-content:space-between;border-bottom:1px solid var(--border);padding:6px 0;font-size:10px"><span style="color:var(--white);font-weight:500">Bauxite 49,739 MT — Kuantan</span><span class="pill po">Pending KYC</span></div><div style="display:flex;justify-content:space-between;padding:6px 0;font-size:10px"><span style="color:var(--white);font-weight:500">MT103 Wire — USD 5M</span><span class="pill pr">Review</span></div></div></div></div>

<!-- DEALEX Wizard CTA -->
<div style="padding:0 16px;margin-bottom:80px">
<div onclick="navTo('wizard')" style="background:linear-gradient(135deg,rgba(42,128,80,.15) 0%,rgba(59,73,223,.1) 100%);border:1px solid rgba(42,128,80,.3);padding:18px;cursor:pointer;position:relative;overflow:hidden;transition:border-color .2s" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='rgba(42,128,80,.3)'">
<div style="font-family:'Inter', sans-serif;font-size:clamp(16px,4vw,22px);font-weight:600;color:var(--white);line-height:1.2;margin-bottom:6px">Have a project but don't know <span style="color:var(--gold)">how to fund it?</span></div>
<div style="font-size:9.5px;color:var(--txt);line-height:1.6;margin-bottom:10px">The DEALEX Wizard walks you through it. No jargon. Tell us about your project and we'll show you exactly what you need.</div>
<div style="display:inline-block;padding:8px 20px;background:var(--gold);color:var(--obs);font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;font-family:Montserrat,sans-serif">Start the Wizard →</div>
</div>
</div>


<!-- FINANCIAL INSTRUMENTS -->
` }} />
  )
}
