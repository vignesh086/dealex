export default function MT760Tab() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div class="tab-page" id="pg-mt760"><div class="sd" id="dots"></div>
<div class="ss act" id="s1"><div class="section" style="padding-bottom:0"><div class="ey">Step 1 — Role & Instrument Setup</div><div class="h2">DEFINE THE <em>SBLC.</em></div><div class="bt" style="margin-bottom:14px">Select your role, upload an existing DOA if you have one, then configure the SBLC parameters per <strong>SWIFT MT 760</strong> (Category 7, Part 3, Nov 2025).</div></div>

<!-- DOA Drop Box -->
<div style="border:1.5px dashed var(--border-mid);padding:22px 16px;text-align:center;cursor:pointer;background:var(--panel);margin:0 16px 14px;transition:all .2s" id="doaZone2" onclick="document.getElementById('doaFile').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)';this.style.background='var(--gold-a15)'" ondragleave="this.style.borderColor='';this.style.background='var(--panel)'" ondrop="event.preventDefault();this.style.borderColor='';this.style.background='var(--panel)';handleDOA(event.dataTransfer.files[0],this)">
<div id="doaIcon2" style="font-size:28px;margin-bottom:8px">📄</div>
<div id="doaLabel2" style="font-size:11px;font-weight:600;color:var(--txt);margin-bottom:4px">Have a DOA?</div>
<div id="doaSub2" style="font-size:13px;color:var(--muted2);margin-bottom:3px">Drag & drop your DOA here · .docx or .pdf · or click to browse</div>
<div style="font-size:13px;color:var(--muted);font-style:italic">We'll extract fields automatically — or skip and fill manually</div>
</div>
<input type="file" id="doaFile" accept=".pdf,.doc,.docx" style="display:none" onchange="handleDOA(this.files[0],document.getElementById('doaZone2'))">

<!-- Role Selector -->
<div style="padding:0 16px 0"><div class="st" style="margin-top:0;border-top:none">Select your role in this transaction</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;padding:0 16px;margin-bottom:14px">
<div class="ic" id="role-sender" onclick="selRole('sender')" style="padding:14px 8px"><div class="ii" style="font-size:24px;margin-bottom:6px">📤</div><div class="it" style="font-size:13px">Sender</div><div class="is">Issuing bank side</div></div>
<div class="ic" id="role-receiver" onclick="selRole('receiver')" style="padding:14px 8px"><div class="ii" style="font-size:24px;margin-bottom:6px">📥</div><div class="it" style="font-size:13px">Receiver</div><div class="is">Receiving bank side</div></div>
<div class="ic" id="role-mandate" onclick="selRole('mandate')" style="padding:14px 8px"><div class="ii" style="font-size:24px;margin-bottom:6px">📋</div><div class="it" style="font-size:13px">Mandate</div><div class="is">IMFPA · Commission</div></div>
<div class="ic" id="role-broker" onclick="selRole('broker')" style="padding:14px 8px"><div class="ii" style="font-size:24px;margin-bottom:6px">🤝</div><div class="it" style="font-size:13px">Broker</div><div class="is">On Mandate's IMFPA</div></div>
</div>

<!-- Role-specific checklist (appears after role selection) -->
<div id="roleChecklist" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl" id="roleCLTitle">Your Checklist</span><span class="pill po" id="roleCLPill">—</span></div>
<div class="cb" id="roleCLBody"></div></div>
</div>

<!-- Mandate/Broker Commission Section (appears for mandate/broker roles) -->
<div id="commissionSection" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Commission & IMFPA</span></div><div class="cb">
<div class="fg"><label class="fl">IMFPA Reference</label><input class="fi" id="df-imfpaRef" placeholder="e.g. IMFPA-2025-001" oninput="fc('imfpaRef',this.value)"></div>
<div class="fr">
<div class="fg"><label class="fl">Commission %</label><input class="fi" id="df-commPct" placeholder="e.g. 2%" oninput="fc('commPct',this.value)"></div>
<div class="fg"><label class="fl">Commission Amount</label><input class="fi" id="df-commAmt" placeholder="Auto-calculated" oninput="fc('commAmt',this.value)"></div>
</div>
<div class="fg"><label class="fl">Paymaster Name</label><input class="fi" id="df-paymaster" placeholder="Paymaster / escrow agent" oninput="fc('paymaster',this.value)"></div>
<div id="brokerOnMandate" style="display:none">
<div class="st">Broker Position on Mandate's IMFPA</div>
<div class="fg"><label class="fl">Mandate Name (your principal)</label><input class="fi" id="df-mandateName" placeholder="Mandate who listed you" oninput="fc('mandateName',this.value)"></div>
<div class="fr">
<div class="fg"><label class="fl">Broker Split %</label><input class="fi" id="df-brokerSplit" placeholder="e.g. 0.5%" oninput="fc('brokerSplit',this.value)"></div>
<div class="fg"><label class="fl">Mandate Split %</label><input class="fi" id="df-mandateSplit" placeholder="e.g. 1.5%" oninput="fc('mandateSplit',this.value)"></div>
</div>
</div>
</div></div>
</div>

<div style="padding:0 16px"><div class="note-box"><div class="wi">📋</div><div class="wt"><strong>MT760</strong> fields: :15A:, :20:, :22A:, :22D:, :30:, :32B:, :40C:, :50:, :52A:, :59:, :77U:. <strong>Irrevocable</strong> once transmitted.</div></div>
<div class="st" style="margin-top:0;border-top:none">SBLC Parameters</div>
<div class="fg"><label class="fl">Undertaking Number (:20:)<span class="rq">*</span></label><input class="fi" id="df-sblcRef" placeholder="e.g. SBLC-2025-001" oninput="fc('sblcRef',this.value)"></div>
<div class="fr"><div class="fg"><label class="fl">Currency<span class="rq">*</span></label><select class="fs" id="df-currency" onchange="fc('currency',this.value)"><option value="">—</option><option value="EUR">EUR</option><option value="USD">USD</option><option value="GBP">GBP</option><option value="SGD">SGD</option><option value="AED">AED</option><option value="CHF">CHF</option></select></div><div class="fg"><label class="fl">Face Value<span class="rq">*</span></label><input class="fi" id="df-faceValue" placeholder="100000000," oninput="fc('faceValue',this.value)"></div></div>
<div class="fr"><div class="fg"><label class="fl">Date of Issue (:30:)<span class="rq">*</span></label><input class="fi" type="date" id="df-issueDate" oninput="fc('issueDate',this.value)"></div><div class="fg"><label class="fl">Date of Expiry (:31E:)</label><input class="fi" type="date" id="df-expiryDate" oninput="fc('expiryDate',this.value)"></div></div>
<div class="fg"><label class="fl">Form of Undertaking (:22D:)<span class="rq">*</span></label><select class="fs" onchange="fc('formUndertaking',this.value)"><option value="STBY">STBY — Standby Letter of Credit</option><option value="DGAR">DGAR — Demand Guarantee</option></select></div>
<div class="fg"><label class="fl">Applicable Rules (:40C:)<span class="rq">*</span></label><select class="fs" onchange="fc('rules',this.value)"><option value="NONE">NONE</option><option value="ISPR">ISPR — ISP</option><option value="URDG">URDG — Demand Guarantees</option><option value="UCPR">UCPR — UCP</option><option value="OTHR">OTHR</option></select></div>
<div class="fg"><label class="fl">Confirmation (:49:)</label><select class="fs" onchange="fc('confirmation',this.value)"><option value="WITHOUT">WITHOUT</option><option value="CONFIRM">CONFIRM</option><option value="MAY ADD">MAY ADD</option></select></div>
<div class="st">Transaction Details</div>
<div class="fg"><label class="fl">Transaction Code<span class="rq">*</span></label><input class="fi" id="df-txCode" placeholder="DEALEX/MT760/2025-001" oninput="fc('txCode',this.value)"></div>
<div class="fg"><label class="fl">Jurisdiction (:44J:)</label><input class="fi" id="df-jurisdiction" placeholder="e.g. GB" oninput="fc('jurisdiction',this.value)"></div>
</div><div class="br"><button class="bg" onclick="goS(2)">Issuing Bank →</button></div></div>
<div class="ss" id="s2"><div class="section" style="padding-bottom:0"><div class="ey">Step 2 — Issuing Bank</div><div class="h2">SENDER <em>BANK.</em></div><div style="display:flex;align-items:center;gap:8px;margin:10px 0"><span id="pd2" style="font-family:'Inter',sans-serif;font-size:22px;color:var(--muted2)">0%</span><div class="pb" style="flex:1"><div class="pf" id="pb2" style="width:0%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div></div></div><div style="padding:0 16px" id="fISS"></div><div class="br"><button class="bg" style="flex:2" onclick="goS(3)">Receiving Bank →</button><button class="bgh" style="flex:1" onclick="goS(1)">← Back</button></div></div>
<div class="ss" id="s3"><div class="section" style="padding-bottom:0"><div class="ey">Step 3 — Advising Bank</div><div class="h2">BENEFICIARY <em>BANK.</em></div><div style="display:flex;align-items:center;gap:8px;margin:10px 0"><span id="pd3" style="font-family:'Inter',sans-serif;font-size:22px;color:var(--muted2)">0%</span><div class="pb" style="flex:1"><div class="pf" id="pb3" style="width:0%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div></div></div><div style="padding:0 16px" id="fRCV"></div><div class="br"><button class="bg" style="flex:2" onclick="goS(4)">SWIFT Preview →</button><button class="bgh" style="flex:1" onclick="goS(2)">← Back</button></div></div>
<div class="ss" id="s4"><div class="section" style="padding-bottom:0"><div class="ey">Step 4 — SWIFT & Checklist</div><div class="h2">MT760 <em>PREVIEW.</em></div></div>
<div class="ts2"><button class="tb act" id="tabSw" onclick="swTab('sw')">SWIFT MT760</button><button class="tb" id="tabCl" onclick="swTab('cl')">Checklist</button></div>
<div id="pSw" style="padding:12px 16px"><div class="card"><div class="ch"><span class="chl">MT760 Draft</span><span class="pill pbl">Draft</span><button class="swift-copy-btn" onclick="copySwiftMsg()" style="margin-left:auto" title="Copy MT760 message">📋 Copy</button></div><div class="cb" style="padding:0"><div class="swift-block" id="swiftMsg"></div></div></div><div class="warning-box"><div class="wi">⚠️</div><div class="wt"><strong>Draft only.</strong> Actual MT760 transmitted bank-to-bank via SWIFT.</div></div></div>
<div id="pCl" style="display:none;padding:12px 16px"></div>
<div class="br"><button class="bg" style="flex:2" onclick="goS(5)">Generate Report →</button><button class="bgh" style="flex:1" onclick="goS(3)">← Back</button></div></div>
<div class="ss" id="s5"><div class="section" style="padding-bottom:0"><div class="ey">Step 5 — Review</div><div class="h2">YOUR <em>MT760.</em></div></div>
<div style="padding:0 16px;margin-bottom:14px"><div class="card"><div class="ch"><span class="chl">Print-Ready</span><span class="pill pg">Ready</span></div><div class="cb" style="text-align:center"><div style="font-size:36px;margin-bottom:8px">🏦</div><div style="font-family:'Inter', sans-serif;font-size:18px;color:var(--white);margin-bottom:4px">MT760 — SBLC</div><div id="pRef" style="font-size:13px;color:var(--muted2);margin-bottom:12px">—</div><div style="display:flex;gap:8px"><button class="bg" style="flex:2" onclick="printMT760()">🖨️ Print / Save PDF</button><button class="bgh" style="flex:1" onclick="goS(4)">← Edit</button></div></div></div></div>
<div style="padding:0 16px;display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px"><div class="card"><div class="cb" style="text-align:center"><div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:4px">Issuer (:52A:)</div><div id="rvIB" style="font-size:11px;font-weight:600;color:var(--white)">—</div><div id="rvIS" style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--gold);margin-top:4px">—</div></div></div><div class="card"><div class="cb" style="text-align:center"><div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:4px">Advising (:56A:)</div><div id="rvRB" style="font-size:11px;font-weight:600;color:var(--white)">—</div><div id="rvRS" style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--gold);margin-top:4px">—</div></div></div></div>
<div style="padding:0 16px;margin-bottom:20px"><div class="card"><div class="ch"><span class="chl">Summary</span><span class="pill po" id="rvPl">0%</span></div><div class="cb" id="rvSum"></div></div></div>
<div class="br"><button class="bgh" style="flex:1" onclick="goS(4)">← Edit</button><button class="bgh" style="flex:1" onclick="navTo('fi')">↺ Instruments</button></div></div>
</div>
<!-- TEMPLATES -->
` }} />
  )
}
