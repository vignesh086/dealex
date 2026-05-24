export default function InstrumentsTab() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div class="tab-page" id="pg-fi"><div class="section" style="padding-bottom:0"><div class="ey">Financial Instruments</div><div class="h2">SWIFT <em>DESK.</em></div><div class="bt" style="margin-bottom:14px">Select your role, upload your DOA, then choose a SWIFT instrument. Each module follows <strong>SWIFT Category 7</strong> (November 2025 Standards).</div></div>
<!-- Instrument comparison visual -->
<div style="padding:0 16px;margin-bottom:16px">
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
<div style="background:rgba(74,139,224,.08);border:1.5px solid rgba(74,139,224,.35);padding:12px">
<div style="font-size:13px;letter-spacing:.16em;font-weight:700;color:#4A8BE0;text-transform:uppercase;margin-bottom:6px">SBLC · MT760</div>
<div style="font-size:11px;font-weight:700;color:var(--white);margin-bottom:6px">Project Funding</div>
<div style="font-size:13px;color:var(--muted2);line-height:1.6;margin-bottom:8px">Issuing bank guarantees payment. 366-day tenor. For soft costs and project capital.</div>
<div style="font-size:11px;color:#4A8BE0">✓ ISP98 / URDG758 &nbsp;·&nbsp; ✓ 366-day tenor</div>
</div>
<div style="background:rgba(53,160,101,.08);border:1.5px solid rgba(53,160,101,.35);padding:12px">
<div style="font-size:13px;letter-spacing:.16em;font-weight:700;color:var(--green);text-transform:uppercase;margin-bottom:6px">DLC · MT700</div>
<div style="font-size:11px;font-weight:700;color:var(--white);margin-bottom:6px">Commodity Trade</div>
<div style="font-size:13px;color:var(--muted2);line-height:1.6;margin-bottom:8px">Documentary credit. B/L + COO + certs trigger payment. UCP600 governed.</div>
<div style="font-size:11px;color:var(--green)">✓ UCP600 &nbsp;·&nbsp; ✓ Sight or Deferred</div>
</div>
</div>
</div>

<!-- Deal Reference Banner -->
<div id="dealRefBanner" style="display:none;padding:0 16px;margin-bottom:14px">
<div style="background:var(--panel2);border:1px solid var(--border-hi);padding:12px 14px;display:flex;align-items:center;justify-content:space-between">
<div><div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:3px">DEALEX Reference Number</div>
<div style="font-family:'JetBrains Mono',monospace;font-size:18px;color:var(--gold);font-weight:700;letter-spacing:.04em" class="deal-ref-display">—</div></div>
<div style="text-align:right"><div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:3px">Status</div>
<span class="pill po" id="dealStatusPill">Draft</span></div>
</div>
<div style="font-size:13px;color:var(--muted2);margin-top:6px;line-height:1.5;padding:0 2px">Share this reference with the other party so they can identify the deal. This number is unique to this transaction and will appear on all generated documents.</div>
</div>

<!-- DOA Drop Box -->
<div style="border:1.5px dashed var(--border-mid);padding:22px 16px;text-align:center;cursor:pointer;background:var(--panel);margin:0 16px 14px;transition:all .2s" id="doaZone1" onclick="document.getElementById('doaFile2').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)';this.style.background='var(--gold-a15)'" ondragleave="this.style.borderColor='';this.style.background='var(--panel)'" ondrop="event.preventDefault();this.style.borderColor='';this.style.background='var(--panel)';handleDOA(event.dataTransfer.files[0],this)">
<div id="doaIcon1" style="font-size:28px;margin-bottom:8px">📄</div>
<div id="doaLabel1" style="font-size:11px;font-weight:600;color:var(--txt);margin-bottom:4px">Have a DOA?</div>
<div id="doaSub1" style="font-size:13px;color:var(--muted2)">Drag & drop your DOA here · .docx or .pdf · or click to browse</div>
<div style="font-size:13px;color:var(--muted);font-style:italic">We'll extract fields automatically — or skip and fill manually</div>
</div>
<input type="file" id="doaFile2" accept=".pdf,.doc,.docx" style="display:none" onchange="handleDOA(this.files[0],document.getElementById('doaZone1'))">

<!-- Role Selector -->
<div style="padding:0 16px 0"><div class="st" style="margin-top:0;border-top:none">Select your role in this transaction</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 16px;margin-bottom:6px">
<div class="ic" id="fi-role-sender" onclick="selRole('sender')" style="padding:14px 10px"><div class="ii" style="font-size:24px;margin-bottom:6px">📤</div><div class="it" style="font-size:13px">Sender</div><div class="is">Issuing bank side · Account holder</div></div>
<div class="ic" id="fi-role-receiver" onclick="selRole('receiver')" style="padding:14px 10px"><div class="ii" style="font-size:24px;margin-bottom:6px">📥</div><div class="it" style="font-size:13px">Receiver</div><div class="is">Receiving bank side · Beneficiary</div></div>
<div class="ic" id="fi-role-mandate" onclick="selRole('mandate')" style="padding:14px 10px"><div class="ii" style="font-size:24px;margin-bottom:6px">📋</div><div class="it" style="font-size:13px">Mandate</div><div class="is">Legally appointed · IMFPA holder</div></div>
<div class="ic" id="fi-role-broker" onclick="selRole('broker')" style="padding:14px 10px"><div class="ii" style="font-size:24px;margin-bottom:6px">🤝</div><div class="it" style="font-size:13px">Broker</div><div class="is">Connects parties · Opposite side IMFPA</div></div>
</div>

<!-- Role info box (appears after selection) -->
<div id="fiRoleInfo" style="display:none;padding:0 16px;margin-bottom:10px"></div>

<!-- Role checklist on FI page -->
<div id="fiRoleChecklist" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl" id="fiRoleCLTitle">Your Checklist</span><span class="pill po" id="fiRoleCLPill">—</span></div>
<div class="cb" id="fiRoleCLBody"></div></div>
</div>

<!-- Commission Split & IMFPA Section -->
<div id="fiCommissionSection" style="padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Commission Split & IMFPA</span><span class="pill po" id="splitPill">Configure</span></div><div class="cb">
<div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:12px">Define how commissions are divided. <strong style="color:var(--gold)">Total must equal 100%.</strong> Default split is 45/45/5/5. If DEALEX is engaged to facilitate, DEALEX takes all commissions and pays broker fees separately.</div>
<div style="display:flex;gap:1px;background:var(--border);margin-bottom:14px;border:1px solid var(--border)">
<button class="at active" id="modeStd" onclick="setCommMode('standard')" style="flex:1;padding:10px">Standard Split</button>
<button class="at" id="modeDX" onclick="setCommMode('dealex')" style="flex:1;padding:10px">DEALEX Facilitated</button>
</div>
<div id="commStandard">
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Sender Commission %<span class="rq">*</span></label><input class="fi" id="splitSender" type="number" step="0.5" min="0" max="100" value="45" oninput="updateSplit()"></div>
<div class="fg"><label class="fl">Receiver Commission %<span class="rq">*</span></label><input class="fi" id="splitReceiver" type="number" step="0.5" min="0" max="100" value="45" oninput="updateSplit()"></div>
</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Sender Mandate %<span class="rq">*</span></label><input class="fi" id="splitSenderMandate" type="number" step="0.5" min="0" max="100" value="5" oninput="updateSplit()"></div>
<div class="fg"><label class="fl">Receiver Mandate %<span class="rq">*</span></label><input class="fi" id="splitReceiverMandate" type="number" step="0.5" min="0" max="100" value="5" oninput="updateSplit()"></div>
</div>
<div class="split-bar" id="splitBar">
<div class="split-seg" id="barSender" style="width:45%;background:var(--gold);color:var(--obs)">S 45%</div>
<div class="split-seg" id="barReceiver" style="width:45%;background:var(--blue);color:#fff">R 45%</div>
<div class="split-seg" id="barSM" style="width:5%;background:var(--gold-dk);color:#fff">SM 5%</div>
<div class="split-seg" id="barRM" style="width:5%;background:#2a6090;color:#fff">RM 5%</div>
</div>
<div class="split-total" id="splitTotal">TOTAL: 100%</div>
<div class="fg"><label class="fl">IMFPA Reference</label><input class="fi" id="imfpaRef" placeholder="e.g. IMFPA-2025-001" oninput="fc('imfpaRef',this.value)"></div>
<div class="fr">
<div class="fg"><label class="fl">Paymaster / Escrow Agent</label><input class="fi" id="paymaster" placeholder="Paymaster name" oninput="fc('paymaster',this.value)"></div>
<div class="fg"><label class="fl">Commission Amount (total)</label><input class="fi" id="commAmt" placeholder="Auto from face value" oninput="fc('commAmt',this.value)"></div>
</div>
</div>
<div id="commDealex" style="display:none">
<div style="background:linear-gradient(135deg,rgba(59,73,223,.15) 0%,rgba(59,73,223,.04) 100%);border:1px solid var(--border-hi);padding:16px;margin-bottom:14px">
<div style="font-family:'Inter',sans-serif;font-size:22px;color:var(--gold);letter-spacing:.06em;margin-bottom:6px">DEALEX FACILITATED DEAL</div>
<div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:10px">When DEALEX is engaged to facilitate, DEALEX takes all commission proceeds and pays broker fees at the following suggested rates:</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
<div style="background:var(--obs);border:1px solid var(--border);padding:12px;text-align:center"><div style="font-size:13px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px">DEALEX Commission</div><div style="font-family:'Inter',sans-serif;font-size:26px;color:var(--gold)">100%</div><div style="font-size:11px;color:var(--muted2)">All commission proceeds</div></div>
<div style="background:var(--obs);border:1px solid var(--border);padding:12px;text-align:center"><div style="font-size:13px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px">Broker Fees Paid</div><div style="font-family:'Inter',sans-serif;font-size:26px;color:var(--green)">YES</div><div style="font-size:11px;color:var(--muted2)">Per fee schedule below</div></div>
</div></div>
<div class="st">Suggested DEALEX Broker Fee Schedule</div>
<div style="font-size:13px;color:var(--txt);line-height:1.8">
<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)"><span style="color:var(--muted2)">Introducing Broker (brought the deal)</span><span style="color:var(--gold);font-weight:700">0.5% – 1.0%</span></div>
<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)"><span style="color:var(--muted2)">Sub-broker (connected to mandate)</span><span style="color:var(--gold);font-weight:700">0.25% – 0.5%</span></div>
<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)"><span style="color:var(--muted2)">Facilitator Fee (DEALEX desk)</span><span style="color:var(--gold);font-weight:700">2.0% – 5.0%</span></div>
<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)"><span style="color:var(--muted2)">Compliance & Bank Verification</span><span style="color:var(--gold);font-weight:700">Included</span></div>
<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)"><span style="color:var(--muted2)">Legal & IMFPA Drafting</span><span style="color:var(--gold);font-weight:700">Included</span></div>
</div>
<div class="note-box" style="margin-top:12px"><div class="wi">📋</div><div class="wt"><strong>All broker fees are paid from DEALEX's commission</strong> upon successful completion. Fees are negotiable. Contact the DEALEX desk for a custom quote.</div></div>
</div>
<div style="display:flex;gap:8px;margin-top:14px">
<button class="bg" style="flex:2" onclick="openIMFPA()">📜 Generate IMFPA Document</button>
<button class="bgh" style="flex:1" onclick="showT('IMFPA template copied')">📋 Copy Template</button>
</div>
</div></div>
</div>

<!-- DOA Extraction Audit Report (appears after DOA is parsed) -->
<div id="doaAuditPanel" style="display:none;padding:0 16px;margin-bottom:14px"></div>

<!-- Mandate Authorization Letter (appears when Mandate role is selected) -->
<div id="mandateAuthPanel" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Mandate Authorization</span><span class="pill pr" id="mandateAuthPill">Required</span></div><div class="cb">
<div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:12px">As a <strong style="color:var(--gold)">Mandate</strong>, you must present your <strong>official authorization letter</strong> from the party who appointed you (Sender or Receiver) before any deal information can be shared or any documents generated. This letter proves you are legally authorized to act on their behalf.</div>
<div class="fg"><label class="fl">Who Appointed You?<span class="rq">*</span></label><select class="fs" id="mandateAppointedBy" onchange="fc('mandateAppointedBy',this.value)"><option value="">— Select —</option><option value="sender">Sender (Party A)</option><option value="receiver">Receiver (Party B)</option></select></div>
<div class="upload-zone" id="upMandateAuth" onclick="document.getElementById('fileMandateAuth').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleMandateAuth(event.dataTransfer.files[0],this)">
<div style="font-size:28px;margin-bottom:4px">📋</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Upload Authorization Letter</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px">Official letter from appointing party · PDF or image</div>
</div>
<input type="file" id="fileMandateAuth" accept="image/*,.pdf,.doc,.docx" style="display:none" onchange="handleMandateAuth(this.files[0],document.getElementById('upMandateAuth'))">
<div class="warning-box" style="margin-top:10px"><div class="wi">⚠️</div><div class="wt"><strong>No authorization letter = no deal.</strong> Banks, counterparties, and DEALEX require proof that you are legally appointed before any transaction details are disclosed to you or through you.</div></div>
</div></div>
</div>

<!-- NCNDA — MUST be signed FIRST before any deal info is shared -->
<div id="ncndaPanel" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Step 1 — NCNDA</span><span class="pill pr">Sign First</span></div><div class="cb">
<div style="background:linear-gradient(135deg,rgba(59,73,223,.12) 0%,rgba(59,73,223,.04) 100%);border:1px solid var(--border-hi);padding:14px;margin-bottom:12px;position:relative;overflow:hidden">
<div style="position:absolute;top:-10px;right:-5px;font-size:60px;opacity:.06">🛡️</div>
<div style="font-family:'Inter', sans-serif;font-size:18px;font-weight:600;color:var(--white);margin-bottom:6px">Before <span style="color:var(--gold)">anything</span> is shared.</div>
<div style="font-size:13px;color:var(--txt);line-height:1.7">The <strong style="color:var(--gold)">Non-Circumvention, Non-Disclosure & Working Agreement</strong> must be signed by <strong>Sender, Receiver, and Mandates</strong> <strong style="color:var(--red)">before</strong> any deal documents, bank details, or party information is disclosed. Brokers are covered under their own separate agreements with their appointing Mandate.</div>
</div>
<div style="display:flex;gap:8px">
<button class="bg" style="flex:2" onclick="generateNCNDA()">🛡️ Generate NCNDA — Sign First</button>
</div>
<div class="note-box" style="margin-top:12px"><div class="wi">🛡️</div><div class="wt"><strong>NCNDA covers:</strong> Non-circumvention (cannot bypass intermediaries), non-disclosure (all deal info confidential), non-competition, 200% penalty for violations, ICC arbitration, electronic signature validity. Signed by Sender, Receiver, and Mandates only. Valid for transaction duration + 2 years.</div></div>
</div></div>
</div>

<!-- Signature Capture — sign once, applied to all documents -->
<div id="sigCapturePanel" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Your Signature & Initials</span><span class="pill pr" id="sigCapturePill">Required</span></div><div class="cb">
<div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:12px">Sign once here. Your signature and initials will be applied to <strong style="color:var(--gold)">every document</strong> — NCNDA, DOA, Term Sheet, IMFPA, and Bank Package. All signatures in <strong style="color:#1A3D7C">blue ink</strong>.</div>

<!-- Full Signature -->
<div style="background:var(--obs);border:1px solid var(--border-mid);padding:16px;margin-bottom:12px">
<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Full Signature <span style="color:#4A8BE0;font-style:italic;letter-spacing:.06em">(Blue Ink)</span></div>
<canvas id="sigCanvas" width="600" height="140" style="width:100%;height:90px;background:rgba(255,255,255,.03);border:1px solid var(--border);cursor:crosshair;touch-action:none"></canvas>
<div style="display:flex;gap:8px;margin-top:8px">
<button class="bgh" style="flex:1;padding:8px;font-size:13px" onclick="clearSig()">Clear</button>
<button class="bg" style="flex:1;padding:8px;font-size:13px" onclick="saveSig()">✓ Save Signature</button>
</div>
</div>

<!-- Initials -->
<div style="background:var(--obs);border:1px solid var(--border-mid);padding:14px;margin-bottom:12px">
<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:10px">Initials <span style="color:#4A8BE0;font-style:italic;letter-spacing:.06em">(Blue Ink)</span></div>
<div style="display:flex;gap:12px;align-items:stretch">
<!-- Auto-generated option -->
<div id="autoInitialsBox" style="flex:1;text-align:center;padding:10px;border:1px solid var(--border);cursor:pointer;transition:all .15s" onclick="useAutoInitials()" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor=savedInitials&&typeof savedInitials==='string'&&savedInitials.indexOf('data:')!==0?'rgba(42,128,80,.5)':'var(--border)'">
<div style="font-size:11px;color:var(--muted);margin-bottom:4px">FROM YOUR NAME</div>
<div id="autoInitialsDisplay" style="font-family:Georgia,serif;font-size:20px;font-weight:700;color:#1A3D7C;letter-spacing:.06em">—</div>
<div style="font-size:11px;color:var(--muted2);margin-top:4px">Click to use</div>
</div>
<!-- Draw custom option -->
<div style="flex:1;text-align:center">
<div style="font-size:11px;color:var(--muted);margin-bottom:4px">OR DRAW YOUR OWN</div>
<canvas id="initialsCanvas" width="160" height="70" style="width:100%;height:50px;background:rgba(255,255,255,.03);border:1px solid var(--border);cursor:crosshair;touch-action:none;display:block"></canvas>
<div style="display:flex;gap:4px;margin-top:4px">
<button class="bgh" style="flex:1;padding:4px;font-size:11px" onclick="clearInitials()">Clear</button>
<button class="bg" style="flex:1;padding:4px;font-size:11px" onclick="saveInitials()">✓ Save</button>
</div>
</div>
</div>
</div>

<!-- Status -->
<div id="sigStatus" style="display:none;background:var(--green-a);border:1px solid rgba(42,128,80,.35);padding:10px 14px">
<div style="display:flex;align-items:center;gap:14px">
<div style="flex-shrink:0"><div style="font-size:11px;color:var(--muted);margin-bottom:2px">SIGNATURE</div><img id="sigPreview" style="max-height:30px;max-width:140px;border:1px solid var(--border)" src="" alt=""></div>
<div style="flex-shrink:0"><div style="font-size:11px;color:var(--muted);margin-bottom:2px">INITIALS</div><div id="initialsPreview" style="font-family:Georgia,serif;font-size:18px;font-weight:700;color:#1A3D7C"></div></div>
<div style="flex:1;text-align:right;font-size:11px;color:var(--green);font-weight:600">✓ Applied to all documents</div>
</div>
</div>

</div></div>
</div>

<!-- Document Uploads with Passport Drop Boxes -->
<div id="docUploadsPanel" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Document Uploads</span><span class="pill po" id="docsPill">0 / 5</span></div><div class="cb">
<div style="font-size:13px;color:var(--muted2);margin-bottom:12px">Upload all required documents. Passports must be certified copies. All documents are encrypted and stored securely on-platform.</div>
<div class="st" style="margin-top:0;border-top:none">Passport Copies (Required)</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
<div class="upload-zone" id="upSenderPP" onclick="document.getElementById('fileSenderPP').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleDocUpload2('senderPP',event.dataTransfer.files[0],this)">
<div style="font-size:28px;margin-bottom:4px">🪪</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Sender Passport</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px">Certified copy · Click or drag</div>
</div>
<div class="upload-zone" id="upReceiverPP" onclick="document.getElementById('fileReceiverPP').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleDocUpload2('receiverPP',event.dataTransfer.files[0],this)">
<div style="font-size:28px;margin-bottom:4px">🪪</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Receiver Passport</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px">Certified copy · Click or drag</div>
</div>
</div>
<input type="file" id="fileSenderPP" accept="image/*,.pdf" style="display:none" onchange="handleDocUpload2('senderPP',this.files[0],document.getElementById('upSenderPP'))">
<input type="file" id="fileReceiverPP" accept="image/*,.pdf" style="display:none" onchange="handleDocUpload2('receiverPP',this.files[0],document.getElementById('upReceiverPP'))">
<div class="st">Corporate & Supporting Documents</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">
<div class="upload-zone" id="upCIS" onclick="document.getElementById('fileCIS').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleDocUpload2('cis',event.dataTransfer.files[0],this)">
<div style="font-size:22px;margin-bottom:4px">🏢</div>
<div style="font-size:11px;font-weight:600;color:var(--txt)">CIS / Cert of Inc.</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px">Corporate docs</div>
</div>
<div class="upload-zone" id="upStamp" onclick="document.getElementById('fileStamp2').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleDocUpload2('stamp',event.dataTransfer.files[0],this)">
<div style="font-size:22px;margin-bottom:4px">🔏</div>
<div style="font-size:11px;font-weight:600;color:var(--txt)">Company Stamp</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px">Seal / Chop image</div>
</div>
<div class="upload-zone" id="upBCL" onclick="document.getElementById('fileBCL').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleDocUpload2('bcl',event.dataTransfer.files[0],this)">
<div style="font-size:22px;margin-bottom:4px">🏛️</div>
<div style="font-size:11px;font-weight:600;color:var(--txt)">BCL</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px">Bank Comfort Letter</div>
</div>
</div>
<input type="file" id="fileCIS" accept="image/*,.pdf,.doc,.docx" style="display:none" onchange="handleDocUpload2('cis',this.files[0],document.getElementById('upCIS'))">
<input type="file" id="fileStamp2" accept="image/*,.png,.jpg,.jpeg" style="display:none" onchange="handleDocUpload2('stamp',this.files[0],document.getElementById('upStamp'))">
<input type="file" id="fileBCL" accept="image/*,.pdf,.doc,.docx" style="display:none" onchange="handleDocUpload2('bcl',this.files[0],document.getElementById('upBCL'))">
</div></div>
</div>

<!-- Sign & Generate DOA (appears after fields are filled) -->
<div id="signDOAPanel" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Generate DOA</span></div><div class="cb">
<div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:12px">All fields complete. Your signature and initials have been captured above. Generate the DOA with all party details, bank coordinates, and document images.</div>
<!-- Show saved signature preview -->
<div id="doaSigPreview" style="display:none;background:var(--obs);border:1px solid var(--border-mid);padding:12px;margin-bottom:12px;text-align:center">
<div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--green);font-weight:600;margin-bottom:6px">✓ Your Signature</div>
<img id="doaSigImg" style="max-height:40px;border:1px solid var(--border)" src="" alt="Signature">
</div>
<div style="display:flex;gap:8px">
<button class="bg" style="flex:2" onclick="generateDOA()">📜 Generate & Print DOA</button>
</div>
</div></div>
</div>

<!-- Term Sheet (appears after DOA is generated — Sender, Receiver, Mandates only, no brokers) -->
<div id="termSheetPanel" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Term Sheet</span><span class="pill po" id="termSheetPill">Configure</span></div><div class="cb">
<div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:12px">Define the commission split between <strong style="color:var(--gold)">Sender, Receiver, and Mandates</strong>. Attach passports and business certificates. <strong style="color:var(--muted2)">Brokers are not listed here</strong> — brokers receive a separate IMFPA with their appointing Mandate.</div>

<!-- Commission Split -->
<div class="st" style="margin-top:0;border-top:none">Commission Split</div>
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px">Total must equal <strong style="color:var(--gold)">100%</strong>. Default: 45 / 45 / 5 / 5.</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Sender Commission %<span class="rq">*</span></label><input class="fi" id="tsSplitSender" type="number" step="0.5" min="0" max="100" value="45" oninput="updateTermSheetSplit()"></div>
<div class="fg"><label class="fl">Receiver Commission %<span class="rq">*</span></label><input class="fi" id="tsSplitReceiver" type="number" step="0.5" min="0" max="100" value="45" oninput="updateTermSheetSplit()"></div>
</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Sender Mandate %<span class="rq">*</span></label><input class="fi" id="tsSplitSenderMandate" type="number" step="0.5" min="0" max="100" value="5" oninput="updateTermSheetSplit()"></div>
<div class="fg"><label class="fl">Receiver Mandate %<span class="rq">*</span></label><input class="fi" id="tsSplitReceiverMandate" type="number" step="0.5" min="0" max="100" value="5" oninput="updateTermSheetSplit()"></div>
</div>
<div class="split-bar" id="tsSplitBar">
<div class="split-seg" id="tsBarSender" style="width:45%;background:var(--gold);color:var(--obs)">S 45%</div>
<div class="split-seg" id="tsBarReceiver" style="width:45%;background:var(--blue);color:#fff">R 45%</div>
<div class="split-seg" id="tsBarSM" style="width:5%;background:var(--gold-dk);color:#fff">SM 5%</div>
<div class="split-seg" id="tsBarRM" style="width:5%;background:#2a6090;color:#fff">RM 5%</div>
</div>
<div class="split-total" id="tsSplitTotal">TOTAL: 100%</div>

<!-- Paymaster & Mandate Info -->
<div class="st">Paymaster & Mandate Details</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Paymaster / Escrow Agent<span class="rq">*</span></label><input class="fi" id="tsPaymaster" placeholder="Paymaster name or firm" oninput="fc('paymaster',this.value)"></div>
<div class="fg"><label class="fl">Commission Amount (total)</label><input class="fi" id="tsCommAmt" placeholder="Auto from face value" oninput="fc('commAmt',this.value)"></div>
</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Sender Mandate Name</label><input class="fi" id="tsSenderMandate" placeholder="Sender-side mandate" oninput="fc('senderMandateName',this.value)"></div>
<div class="fg"><label class="fl">Sender Mandate Passport No.</label><input class="fi" id="tsSenderMandatePPNum" placeholder="Passport number" oninput="fc('senderMandatePassport',this.value)"></div>
</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Receiver Mandate Name</label><input class="fi" id="tsReceiverMandate" placeholder="Receiver-side mandate" oninput="fc('receiverMandateName',this.value)"></div>
<div class="fg"><label class="fl">Receiver Mandate Passport No.</label><input class="fi" id="tsReceiverMandatePPNum" placeholder="Passport number" oninput="fc('receiverMandatePassport',this.value)"></div>
</div>

<!-- Passports & Certificates -->
<div class="st">Passports & Business Certificates</div>
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px">If these details were found in your DOA, they're shown below automatically. You can still upload certified copies for the official record.</div>

<!-- Auto-populated from DOA -->
<div id="tsExtractedDocs" style="display:none;margin-bottom:12px">
<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--green);font-weight:600;margin-bottom:8px">✓ Extracted from DOA</div>
<div style="background:var(--green-a);border:1px solid rgba(42,128,80,.3);padding:10px 12px;margin-bottom:8px">
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:13px">
<div><span style="color:var(--muted2)">Sender Passport:</span> <strong id="tsExtSenderPP" style="color:var(--white)">—</strong></div>
<div><span style="color:var(--muted2)">Receiver Passport:</span> <strong id="tsExtReceiverPP" style="color:var(--white)">—</strong></div>
<div><span style="color:var(--muted2)">Sender Company Reg:</span> <strong id="tsExtSenderReg" style="color:var(--white)">—</strong></div>
<div><span style="color:var(--muted2)">Receiver Company Reg:</span> <strong id="tsExtReceiverReg" style="color:var(--white)">—</strong></div>
</div>
</div>
<div style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:8px">These were found in your DOA and will appear on all generated documents. Upload certified copies below if your counterparty or bank requires them on file.</div>
</div>

<!-- Upload zones (still available for certified copies) -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
<div class="upload-zone" id="tsSenderPP" onclick="document.getElementById('tsFileSenderPP').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleTermSheetDoc('senderPP',event.dataTransfer.files[0],this)">
<div style="font-size:22px;margin-bottom:3px">🪪</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Sender Passport</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px" id="tsSenderPPStatus">Certified copy · Click or drag</div>
</div>
<div class="upload-zone" id="tsReceiverPP" onclick="document.getElementById('tsFileReceiverPP').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleTermSheetDoc('receiverPP',event.dataTransfer.files[0],this)">
<div style="font-size:22px;margin-bottom:3px">🪪</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Receiver Passport</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px" id="tsReceiverPPStatus">Certified copy · Click or drag</div>
</div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
<div class="upload-zone" id="tsSenderCert" onclick="document.getElementById('tsFileSenderCert').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleTermSheetDoc('senderCert',event.dataTransfer.files[0],this)">
<div style="font-size:22px;margin-bottom:3px">🏢</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Sender Certificate</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px" id="tsSenderCertStatus">Cert of Inc. / CIS</div>
</div>
<div class="upload-zone" id="tsReceiverCert" onclick="document.getElementById('tsFileReceiverCert').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleTermSheetDoc('receiverCert',event.dataTransfer.files[0],this)">
<div style="font-size:22px;margin-bottom:3px">🏢</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Receiver Certificate</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px" id="tsReceiverCertStatus">Cert of Inc. / CIS</div>
</div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
<div class="upload-zone" id="tsSenderMandatePP" onclick="document.getElementById('tsFileSMPP').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleTermSheetDoc('senderMandatePP',event.dataTransfer.files[0],this)">
<div style="font-size:22px;margin-bottom:3px">📋</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Sender Mandate Passport</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px">If applicable</div>
</div>
<div class="upload-zone" id="tsReceiverMandatePP" onclick="document.getElementById('tsFileRMPP').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleTermSheetDoc('receiverMandatePP',event.dataTransfer.files[0],this)">
<div style="font-size:22px;margin-bottom:3px">📋</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Receiver Mandate Passport</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px">If applicable</div>
</div>
</div>
<input type="file" id="tsFileSenderPP" accept="image/*,.pdf" style="display:none" onchange="handleTermSheetDoc('senderPP',this.files[0],document.getElementById('tsSenderPP'))">
<input type="file" id="tsFileReceiverPP" accept="image/*,.pdf" style="display:none" onchange="handleTermSheetDoc('receiverPP',this.files[0],document.getElementById('tsReceiverPP'))">
<input type="file" id="tsFileSenderCert" accept="image/*,.pdf,.doc,.docx" style="display:none" onchange="handleTermSheetDoc('senderCert',this.files[0],document.getElementById('tsSenderCert'))">
<input type="file" id="tsFileReceiverCert" accept="image/*,.pdf,.doc,.docx" style="display:none" onchange="handleTermSheetDoc('receiverCert',this.files[0],document.getElementById('tsReceiverCert'))">
<input type="file" id="tsFileSMPP" accept="image/*,.pdf" style="display:none" onchange="handleTermSheetDoc('senderMandatePP',this.files[0],document.getElementById('tsSenderMandatePP'))">
<input type="file" id="tsFileRMPP" accept="image/*,.pdf" style="display:none" onchange="handleTermSheetDoc('receiverMandatePP',this.files[0],document.getElementById('tsReceiverMandatePP'))">

<div style="display:flex;gap:8px;margin-top:14px">
<button class="bg" style="flex:2" onclick="generateTermSheet()">📄 Generate Term Sheet</button>
</div>

<!-- Broker Note -->
<div class="warning-box" style="margin-top:12px"><div class="wi">🤝</div><div class="wt"><strong>Brokers are not on this Term Sheet.</strong> Brokers receive a separate IMFPA with their appointing Mandate. Use the "Produce IMFPA" button below after generating the Term Sheet.</div></div>

</div></div>
</div>

<!-- Produce IMFPA (appears after Term Sheet — separate document for commission protection) -->
<div id="produceIMFPAPanel" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Produce IMFPA</span><span class="pill pbl">Next Step</span></div><div class="cb">
<div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:12px">Generate the <strong style="color:var(--gold)">Irrevocable Master Fee Protection Agreement</strong>. This document protects commission splits for all parties — Sender, Receiver, and Mandates. Brokers who were introduced by a Mandate are listed on the <strong>opposite side's IMFPA</strong> per conflict-of-interest rules.</div>
<div class="fg"><label class="fl">IMFPA Reference</label><input class="fi" id="tsImfpaRef" placeholder="e.g. IMFPA-2025-001" oninput="fc('imfpaRef',this.value)"></div>
<div style="display:flex;gap:8px;margin-top:8px">
<button class="bg" style="flex:2" onclick="openIMFPA()">📜 Produce IMFPA</button>
<button class="bgh" style="flex:1" onclick="showT('IMFPA template copied')">📋 Copy Template</button>
</div>
<div class="note-box" style="margin-top:12px"><div class="wi">📋</div><div class="wt"><strong>IMFPA covers:</strong> Commission percentages from the Term Sheet, paymaster instructions, non-circumvention, non-disclosure, dispute resolution (ICC), and binding signatures for all parties. Brokers on separate IMFPA with their legal Mandate.</div></div>
</div></div>
</div>

<!-- ═══════════════════════════════════════════════════════
     BANK SUBMISSION PACKAGE
     ═══════════════════════════════════════════════════════ -->
<div id="bankPackagePanel" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Bank Submission Package</span><span class="pill pr" id="bankPkgPill">Not Ready</span></div><div class="cb">
<div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:12px">This is what the <strong style="color:var(--gold)">Sender walks into the bank with</strong>. Without a clean, bank-grade issuance package backed by real funds and a real banking relationship, the deal was never real to begin with.</div>

<div class="warning-box" style="margin-bottom:14px"><div class="wi">⚠️</div><div class="wt"><strong>Reality check:</strong> If you cannot submit the items below to your bank without hesitation, the deal is not ready. Do not proceed until every item is resolved.</div></div>

<!-- 1. CIL Fields -->
<div class="st" style="margin-top:0;border-top:none">1. Client Instruction Letter (CIL)</div>
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px;line-height:1.6">The CIL instructs your bank to issue the instrument and prepare it for SWIFT transmission. This is the document that <strong style="color:var(--gold)">activates the bank</strong>. Without it, nothing moves.</div>
<div class="fg"><label class="fl">Instrument Type<span class="rq">*</span></label><select class="fs" id="cilInstType" onchange="fc('cilInstType',this.value)"><option value="SBLC">SBLC — Standby Letter of Credit</option><option value="DLC">DLC — Documentary Letter of Credit</option><option value="BG">BG — Bank Guarantee</option></select></div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Currency & Amount<span class="rq">*</span></label><input class="fi" id="cilAmount" placeholder="e.g. EUR 500,000,000" oninput="fc('cilAmount',this.value)"></div>
<div class="fg"><label class="fl">Tenor / Validity<span class="rq">*</span></label><input class="fi" id="cilTenor" placeholder="e.g. 1 year + 1 day" oninput="fc('cilTenor',this.value)"></div>
</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Governing Rules<span class="rq">*</span></label><select class="fs" id="cilRules" onchange="fc('cilRules',this.value)"><option value="ISP98">ISP98 — International Standby Practices</option><option value="UCP600">UCP600 — Uniform Customs & Practice</option><option value="URDG758">URDG758 — Demand Guarantees</option></select></div>
<div class="fg"><label class="fl">Delivery Method<span class="rq">*</span></label><select class="fs" id="cilDelivery" onchange="fc('cilDelivery',this.value)"><option value="MT760">SWIFT MT760</option><option value="MT700">SWIFT MT700</option><option value="MT710">SWIFT MT710</option></select></div>
</div>

<!-- 2. Collateral -->
<div class="st">2. Collateral Instruction</div>
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px;line-height:1.6">No block = no issuance. The bank will not issue without confirmed collateral.</div>
<div class="fg"><label class="fl">Collateral Type<span class="rq">*</span></label><select class="fs" id="cilCollateral" onchange="fc('cilCollateral',this.value);updateBankPkgChecklist()"><option value="">— Select —</option><option value="cash">Cash-Backed (funds in account)</option><option value="earmarked">Earmarked Funds (verified)</option><option value="asset">Asset-Backed (property / securities)</option><option value="credit">Credit Line / Facility</option></select></div>
<div class="fg"><label class="fl">Collateral Details</label><input class="fi" id="cilCollateralDetail" placeholder="Account number, asset description, or facility reference" oninput="fc('cilCollateralDetail',this.value)"></div>

<!-- 3. Fee Authorization -->
<div class="st">3. Fee Payment Authorization</div>
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px;line-height:1.6">Sender agrees to pay all bank issuance fees. Typically 0.5% – 2% of face value depending on banking relationship.</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Estimated Issuance Fee</label><input class="fi" id="cilIssuanceFee" placeholder="e.g. 1.5% or EUR 750,000" oninput="fc('cilIssuanceFee',this.value)"></div>
<div class="fg"><label class="fl">SWIFT Transmission Fee</label><input class="fi" id="cilSwiftFee" placeholder="e.g. USD 250" oninput="fc('cilSwiftFee',this.value)"></div>
</div>

<!-- 4. KYC / Source of Funds -->
<div class="st">4. KYC & Source of Funds</div>
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px;line-height:1.6">Even if the sender is an existing client, the bank will re-verify for large instruments. Upload supporting evidence.</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">
<div class="upload-zone" id="upSOF" onclick="document.getElementById('fileSOF').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleBankPkgDoc('sof',event.dataTransfer.files[0],this)">
<div style="font-size:18px;margin-bottom:3px">💰</div>
<div style="font-size:11px;font-weight:600;color:var(--txt)">Source of Funds</div>
<div style="font-size:6px;color:var(--muted2);margin-top:2px">Bank statement / proof</div>
</div>
<div class="upload-zone" id="upUBO" onclick="document.getElementById('fileUBO').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleBankPkgDoc('ubo',event.dataTransfer.files[0],this)">
<div style="font-size:18px;margin-bottom:3px">👤</div>
<div style="font-size:11px;font-weight:600;color:var(--txt)">UBO Declaration</div>
<div style="font-size:6px;color:var(--muted2);margin-top:2px">Ultimate Beneficial Owner</div>
</div>
<div class="upload-zone" id="upBalance" onclick="document.getElementById('fileBalance').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();handleBankPkgDoc('balance',event.dataTransfer.files[0],this)">
<div style="font-size:18px;margin-bottom:3px">📊</div>
<div style="font-size:11px;font-weight:600;color:var(--txt)">Balance Sheet</div>
<div style="font-size:6px;color:var(--muted2);margin-top:2px">Or collateral proof</div>
</div>
</div>
<input type="file" id="fileSOF" accept="image/*,.pdf,.doc,.docx" style="display:none" onchange="handleBankPkgDoc('sof',this.files[0],document.getElementById('upSOF'))">
<input type="file" id="fileUBO" accept="image/*,.pdf,.doc,.docx" style="display:none" onchange="handleBankPkgDoc('ubo',this.files[0],document.getElementById('upUBO'))">
<input type="file" id="fileBalance" accept="image/*,.pdf,.doc,.docx" style="display:none" onchange="handleBankPkgDoc('balance',this.files[0],document.getElementById('upBalance'))">

<!-- 5. Compliance Declarations -->
<div class="st">5. Compliance Declarations</div>
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px;line-height:1.6">If anything flags, compliance will freeze the file instantly. Confirm all declarations truthfully.</div>
<div id="complianceChecks">
<div class="cr" onclick="toggleCompCheck(0)"><div class="cx" id="compCx0"></div><div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--white)">Non-Sanctioned Parties — Neither party appears on OFAC, EU, or UN sanctions lists</div></div></div>
<div class="cr" onclick="toggleCompCheck(1)"><div class="cx" id="compCx1"></div><div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--white)">Non-Prohibited Use — Funds and instrument not used for prohibited purposes</div></div></div>
<div class="cr" onclick="toggleCompCheck(2)"><div class="cx" id="compCx2"></div><div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--white)">AML / CFT Compliance — Transaction complies with Anti-Money Laundering and Counter-Terrorism Financing regulations</div></div></div>
<div class="cr" onclick="toggleCompCheck(3)"><div class="cx" id="compCx3"></div><div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--white)">No Fraud Declaration — No intent to defraud, misrepresent, or engage in circular trading</div></div></div>
<div class="cr" onclick="toggleCompCheck(4)"><div class="cx" id="compCx4"></div><div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--white)">Not a Monetization Structure — Instrument is not for immediate discount, monetization, or credit-line leveraging</div></div></div>
</div>

<!-- 6. Readiness Checklist -->
<div class="st">6. Bank Package Readiness</div>
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px;line-height:1.6">Every item below must be ✓ before you walk into your bank. This is the reality check.</div>
<div id="bankPkgChecklist"></div>
<div style="display:flex;align-items:center;gap:8px;margin:12px 0"><span id="bankPkgPct" style="font-family:'Inter',sans-serif;font-size:24px;color:var(--muted2)">0%</span><div class="pb" style="flex:1"><div class="pf" id="bankPkgBar" style="width:0%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div></div>

<!-- Where Deals Fail Warning -->
<div class="warning-box" style="margin-top:8px"><div class="wi">💀</div><div class="wt"><strong>Where deals fail:</strong> Sender cannot prove funds. Draft wording is amateur or broker-written. No real relationship with issuing bank. Receiver bank not responsive or not SWIFT-capable. Compliance flags structure as circular or monetization risk. <strong style="color:var(--red)">If any of the above apply — stop. Fix it before proceeding.</strong></div></div>

<!-- Generate Buttons -->
<div style="display:flex;gap:8px;margin-top:14px">
<button class="bg" style="flex:2" onclick="generateCIL()">🏦 Generate CIL / Issuance Mandate</button>
</div>
<div style="display:flex;gap:8px;margin-top:8px">
<button class="bgh" style="flex:1" onclick="generateBankPackage()">📦 Full Bank Package (All Documents)</button>
<button class="bgh" style="flex:1" onclick="generateComplianceLetter()">📋 Compliance Letter</button>
</div>

</div></div>
</div>

<!-- Booking Date — banker-to-banker coordination before SWIFT transmission -->
<div id="bookingDatePanel" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Booking Date</span><span class="pill pr" id="bookingPill">Not Set</span></div><div class="cb">
<div style="background:linear-gradient(135deg,rgba(59,73,223,.12) 0%,rgba(74,139,224,.08) 100%);border:1px solid var(--border-hi);padding:14px;margin-bottom:14px;position:relative;overflow:hidden">
<div style="position:absolute;top:-10px;right:-5px;font-size:60px;opacity:.06">📅</div>
<div style="font-family:'Inter', sans-serif;font-size:18px;font-weight:600;color:var(--white);margin-bottom:6px">The banks need a <span style="color:var(--gold)">date</span>.</div>
<div style="font-size:13px;color:var(--txt);line-height:1.7">Before the MT760 is transmitted, the <strong>issuing bank officer</strong> and the <strong>advising bank officer</strong> must agree on a specific date and time for the SWIFT transmission. Both banks must be ready to send and receive on the booked date. No booking = no transmission.</div>
</div>

<!-- Booking Details -->
<div class="st" style="margin-top:0;border-top:none">Transmission Date & Time</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Booking Date<span class="rq">*</span></label><input class="fi" type="date" id="bookingDate" oninput="updateBookingStatus()"></div>
<div class="fg"><label class="fl">Booking Time (Bank Hours)<span class="rq">*</span></label><input class="fi" type="time" id="bookingTime" oninput="updateBookingStatus()"></div>
</div>
<div class="fg"><label class="fl">Time Zone</label><select class="fs" id="bookingTimezone" onchange="updateBookingStatus()"><option value="GMT">GMT / UTC</option><option value="CET">CET (Central European)</option><option value="GST">GST (Gulf Standard — Dubai)</option><option value="SGT">SGT (Singapore)</option><option value="HKT">HKT (Hong Kong)</option><option value="EST">EST (US Eastern)</option><option value="PST">PST (US Pacific)</option></select></div>

<!-- Issuing Bank Officer Confirmation -->
<div class="st">Issuing Bank Officer (Sender Side)</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Officer Name<span class="rq">*</span></label><input class="fi" id="bookingIssOfficer" placeholder="Issuing bank officer" oninput="updateBookingStatus()"></div>
<div class="fg"><label class="fl">Officer Phone / Email</label><input class="fi" id="bookingIssContact" placeholder="Direct line or email"></div>
</div>
<div class="cr" id="bookingIssConfirm" onclick="toggleBookingCheck('iss')">
<div class="cx" id="bookingIssCheck"></div>
<div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--white)">Issuing bank officer confirms ready to transmit on booking date</div><div style="font-size:11px;color:var(--red);font-weight:700;margin-top:2px;letter-spacing:.12em;text-transform:uppercase">REQUIRED</div></div>
</div>

<!-- Advising Bank Officer Confirmation -->
<div class="st">Advising Bank Officer (Receiver Side)</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Officer Name<span class="rq">*</span></label><input class="fi" id="bookingRcvOfficer" placeholder="Advising bank officer" oninput="updateBookingStatus()"></div>
<div class="fg"><label class="fl">Officer Phone / Email</label><input class="fi" id="bookingRcvContact" placeholder="Direct line or email"></div>
</div>
<div class="cr" id="bookingRcvConfirm" onclick="toggleBookingCheck('rcv')">
<div class="cx" id="bookingRcvCheck"></div>
<div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--white)">Advising bank officer confirms ready to receive on booking date</div><div style="font-size:11px;color:var(--red);font-weight:700;margin-top:2px;letter-spacing:.12em;text-transform:uppercase">REQUIRED</div></div>
</div>

<!-- Booking Summary -->
<div id="bookingSummary" style="display:none;margin-top:14px;background:var(--green-a);border:1px solid rgba(42,128,80,.35);padding:14px;text-align:center">
<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--green);font-weight:600;margin-bottom:6px">✓ BOOKING CONFIRMED</div>
<div id="bookingSummaryDate" style="font-family:'Inter',sans-serif;font-size:28px;color:var(--green);letter-spacing:.04em">—</div>
<div id="bookingSummaryTime" style="font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--txt);margin-top:2px">—</div>
<div style="display:flex;justify-content:center;gap:20px;margin-top:10px;font-size:13px">
<div><span style="color:var(--muted2)">Issuing Officer:</span> <strong id="bookingSummaryIss" style="color:var(--white)">—</strong></div>
<div><span style="color:var(--muted2)">Advising Officer:</span> <strong id="bookingSummaryRcv" style="color:var(--white)">—</strong></div>
</div>
</div>

<div class="warning-box" style="margin-top:12px"><div class="wi">⚠️</div><div class="wt"><strong>Both bank officers must independently confirm</strong> they are ready on the booking date. If either side is not ready, the booking must be rescheduled. Do not proceed without verbal or written confirmation from both officers.</div></div>

</div></div>
</div>

<!-- Invite Other Party — LAST step, after all paperwork is complete -->
<div id="invitePanel" style="display:none;padding:0 16px;margin-bottom:14px">
<div class="card"><div class="ch"><span class="chl">Invite Other Party</span><span class="pill pbl">Final Step</span></div><div class="cb">
<div style="background:linear-gradient(135deg,rgba(42,128,80,.12) 0%,rgba(59,73,223,.08) 100%);border:1px solid var(--border-hi);padding:14px;margin-bottom:12px;position:relative;overflow:hidden">
<div style="position:absolute;top:-10px;right:-5px;font-size:60px;opacity:.06">✅</div>
<div style="font-family:'Inter', sans-serif;font-size:18px;font-weight:600;color:var(--white);margin-bottom:6px">Your side is <span style="color:var(--green)">ready</span>.</div>
<div style="font-size:13px;color:var(--txt);line-height:1.7">NCNDA signed. DOA generated. Term Sheet configured. IMFPA produced. Bank package prepared. Now invite the other party to complete their side.</div>
</div>

<!-- DEALEX as Paymaster -->
<div style="background:rgba(59,73,223,.06);border:1px solid rgba(59,73,223,.25);padding:14px;margin-bottom:12px">
<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Paymaster selection</div>
<div style="display:flex;flex-direction:column;gap:6px" id="paymasterOptions">
<div class="wiz-check" onclick="selectPaymaster('dealex',this)" id="pmDealex">
<div class="wc-box" role="checkbox" aria-checked="false">✓</div>
<div><strong style="color:var(--white);font-size:11px">DEALEX as Paymaster</strong><br><span style="font-size:13px;color:var(--muted2)">Banking details stay on-platform. Commissions disbursed by DEALEX. Nobody sees anyone else's bank info.</span></div>
</div>
<div class="wiz-check" onclick="selectPaymaster('external',this)" id="pmExternal">
<div class="wc-box" role="checkbox" aria-checked="false">✓</div>
<div><strong style="color:var(--white);font-size:11px">External paymaster</strong><br><span style="font-size:13px;color:var(--muted2)">Use your own paymaster or escrow agent. Banking details shared as per IMFPA terms.</span></div>
</div>
</div>
<div id="externalPmField" style="display:none;margin-top:8px">
<div class="fg"><label class="fl">External Paymaster Name</label><input class="fi" id="externalPmName" placeholder="Paymaster / escrow agent name" oninput="fc('paymaster',this.value)"></div>
</div>
</div>

<!-- Banking protection notice -->
<div id="bankingProtectionNotice" style="display:none;background:rgba(42,128,80,.08);border:1px solid rgba(42,128,80,.25);padding:12px;margin-bottom:12px">
<div style="font-size:13px;color:var(--green);font-weight:600;margin-bottom:4px">🔒 Banking details protected by DEALEX</div>
<div style="font-size:13px;color:var(--txt);line-height:1.7">When DEALEX is paymaster, sender and receiver banking details are stored on-platform only. No broker, mandate, or counterparty can see the other side's bank coordinates. Commissions are calculated per the IMFPA and disbursed directly by DEALEX to each party's account.</div>
</div>

<!-- Deal Reference -->
<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding:8px 10px;background:var(--obs);border:1px solid var(--border-mid)"><div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600">Deal Reference:</div><div style="font-family:'JetBrains Mono',monospace;font-size:15px;color:var(--gold);font-weight:700;letter-spacing:.04em" class="deal-ref-display">—</div><div style="margin-left:auto;font-size:11px;color:var(--muted);cursor:pointer;text-decoration:underline" onclick="copyDealRef()">Copy Ref</div></div>

<!-- Broker: Invite BOTH sides separately -->
<div id="brokerInviteSection" style="display:none">
<div style="font-size:13px;color:var(--gold);font-weight:600;letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px">You're a broker — invite both sides</div>

<!-- Invite Sender -->
<div style="background:var(--obs);border:1px solid var(--border);padding:12px;margin-bottom:8px">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
<span style="font-size:18px">📤</span>
<div><strong style="color:var(--white);font-size:11px">Invite Sender</strong><br><span style="font-size:13px;color:var(--muted2)">The party who will issue the SBLC / instrument</span></div>
<span class="pill po" id="senderInviteStatus" style="margin-left:auto">Not Sent</span>
</div>
<div class="fg"><label class="fl">Sender's Email</label><input class="fi" id="inviteSenderEmail" type="email" placeholder="sender@company.com"></div>
<button class="bg" style="width:100%" onclick="sendSideInvite('sender')">📧 Invite Sender</button>
</div>

<!-- Invite Receiver -->
<div style="background:var(--obs);border:1px solid var(--border);padding:12px;margin-bottom:8px">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
<span style="font-size:18px">📥</span>
<div><strong style="color:var(--white);font-size:11px">Invite Receiver</strong><br><span style="font-size:13px;color:var(--muted2)">The party who will receive and monetize the instrument</span></div>
<span class="pill po" id="receiverInviteStatus" style="margin-left:auto">Not Sent</span>
</div>
<div class="fg"><label class="fl">Receiver's Email</label><input class="fi" id="inviteReceiverEmail" type="email" placeholder="receiver@company.com"></div>
<button class="bg" style="width:100%" onclick="sendSideInvite('receiver')">📧 Invite Receiver</button>
</div>

<div class="note-box"><div class="wi">🛡️</div><div class="wt"><strong>Each side signs the NCNDA first</strong> before any deal details are shared. Sender and receiver never see each other's banking info. You're permanently attached to this deal as the introducer — if it closes, your commission is protected under the IMFPA.</div></div>
</div>

<!-- Non-broker: Single invite (existing flow) -->
<div id="standardInviteSection">
<div class="fg"><label class="fl">Other Party's Email</label><input class="fi" id="inviteEmail" type="email" placeholder="counterparty@company.com" onkeydown="if(event.key==='Enter')sendInvite()"></div>
<div class="fg"><label class="fl">Message (optional)</label><input class="fi" id="inviteMsg" value="Your Dealex Desk deal is waiting" placeholder="Your Dealex Desk deal is waiting"></div>
<div style="display:flex;gap:8px">
<button class="bg" style="flex:1" onclick="sendInvite()">📧 Open Email App</button>
<button class="bgh" style="flex:1" onclick="copyInviteMessage()">📋 Copy Full Message</button>
</div>
</div>

<div id="inviteResult" style="display:none;margin-top:12px">
<div id="inviteLinkBox" style="display:none;background:var(--green-a);border:1px solid rgba(42,128,80,.35);padding:12px;margin-bottom:10px">
<div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--green);font-weight:600;margin-bottom:6px">✓ Invite Ready</div>
<div style="font-size:13px;color:var(--txt);line-height:1.6;margin-bottom:8px">If your email app didn't open, copy the message below and send it manually.</div>
<div style="display:flex;gap:6px">
<button class="bgh" style="flex:1;padding:8px;font-size:13px" onclick="copyInviteMessage()">📋 Copy Full Invite</button>
<button class="bgh" style="flex:1;padding:8px;font-size:13px" onclick="copyEmailLink()">🔗 Copy Email Link</button>
</div>
</div>
<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:6px">Preview</div>
<div id="invitePreviewBody" style="background:var(--obs);border:1px solid var(--border);padding:12px;font-size:13px;color:var(--txt);line-height:1.7;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;max-height:200px;overflow-y:auto"></div>
</div>
<div style="font-size:13px;color:var(--muted);margin-top:8px;line-height:1.6;text-align:center">📧 Opens your email client · 📋 Copies the full invite to paste anywhere</div>
</div></div>
</div>

<div id="securityBanner" style="display:none;padding:0 16px;margin-bottom:14px">

<!-- KYC/CIS Legal Requirement -->
<div style="background:linear-gradient(135deg,rgba(208,64,48,.08) 0%,rgba(59,73,223,.06) 100%);border:1px solid rgba(208,64,48,.25);padding:16px;margin-bottom:10px">
<div style="font-family:'Inter', sans-serif;font-size:18px;font-weight:600;color:var(--white);margin-bottom:6px">🔒 Why we need your <span style="color:var(--gold)">CIS & KYC</span></div>
<div style="font-size:13px;color:var(--txt);line-height:1.8;margin-bottom:10px">This is <strong style="color:#E06050">not optional</strong>. Under international Anti-Money Laundering (AML) regulations and the Financial Action Task Force (FATF) standards adopted by every banking jurisdiction worldwide, <strong style="color:var(--white)">banks are legally required to verify the identity of all parties</strong> before processing any financial instrument — including SBLCs, bank guarantees, and letters of credit.</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
<div style="background:var(--obs);border:1px solid var(--border);padding:10px">
<div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:6px">What the law requires</div>
<div style="font-size:13px;color:var(--txt);line-height:1.8">
ISP98 / UCP600 / URDG758 (ICC rules)<br>
FATF — AML/KYC global standards<br>
Bank Secrecy Act (US)<br>
EU Anti-Money Laundering Directives<br>
Country-specific: SAFE, BNM, MAS, FCA
</div>
</div>
<div style="background:var(--obs);border:1px solid var(--border);padding:10px">
<div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:6px">What banks will reject without</div>
<div style="font-size:13px;color:var(--txt);line-height:1.8">
No passport / ID = no deal<br>
No company registration = no deal<br>
No proof of address = no deal<br>
No source of funds = no deal<br>
OFAC/sanctions hit = no deal
</div>
</div>
</div>

<div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:6px">Standard CIS / KYC package</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:10px">
<div style="font-size:13px;color:var(--txt);padding:5px 8px;background:var(--obs);border:1px solid var(--border)">✓ Passport copy (certified)</div>
<div style="font-size:13px;color:var(--txt);padding:5px 8px;background:var(--obs);border:1px solid var(--border)">✓ Certificate of Incorporation</div>
<div style="font-size:13px;color:var(--txt);padding:5px 8px;background:var(--obs);border:1px solid var(--border)">✓ Company registration certificate</div>
<div style="font-size:13px;color:var(--txt);padding:5px 8px;background:var(--obs);border:1px solid var(--border)">✓ Proof of address (utility bill / bank statement)</div>
<div style="font-size:13px;color:var(--txt);padding:5px 8px;background:var(--obs);border:1px solid var(--border)">✓ Bank reference letter / BCL</div>
<div style="font-size:13px;color:var(--txt);padding:5px 8px;background:var(--obs);border:1px solid var(--border)">✓ Financial statements (audited if available)</div>
<div style="font-size:13px;color:var(--txt);padding:5px 8px;background:var(--obs);border:1px solid var(--border)">✓ Ultimate Beneficial Owner (UBO) declaration</div>
<div style="font-size:13px;color:var(--txt);padding:5px 8px;background:var(--obs);border:1px solid var(--border)">✓ Source of funds declaration</div>
</div>

<div style="background:rgba(42,128,80,.08);border:1px solid rgba(42,128,80,.25);padding:10px">
<div style="font-size:13px;color:var(--green);font-weight:600;margin-bottom:4px">🛡️ How DEALEX protects you</div>
<div style="font-size:13px;color:var(--txt);line-height:1.7">Your CIS/KYC documents are submitted to <strong style="color:var(--white)">DEALEX only</strong> — never to the other party, never to brokers, never to mandates. The counterparty sees only a verification badge: <strong style="color:var(--green)">"✓ KYC Verified"</strong>. Your passport number, bank account, and company details remain confidential. When the deal reaches bank submission, DEALEX presents your CIS directly to the bank — not through any intermediary. <strong style="color:var(--gold)">Your sources stay yours.</strong></div>
</div>
</div>

<!-- Secure Deal Room -->
<div style="background:var(--panel);border:1px solid var(--border);padding:14px;display:flex;gap:12px;align-items:flex-start">
<div style="font-size:28px;flex-shrink:0">🛡️</div>
<div>
<div style="font-size:13px;font-weight:700;color:var(--white);margin-bottom:4px">DEALEX Secure Deal Room</div>
<div style="font-size:13px;color:var(--muted2);line-height:1.7">All documents are encrypted and stored on-platform. No paperwork is shared via messaging apps. Each party only sees their own data until both sides are verified and the deal is ready for bank submission. Bank officer details are independently verified — never from the DOA itself.</div>
</div>
</div>
</div>

<!-- Instrument Selector -->
<div style="padding:0 16px 0"><div class="st">Select your SWIFT instrument</div></div>
<div class="ig"><div class="ic" onclick="openMT760()"><div class="ii">🏦</div><div class="it">MT760 — SBLC</div><div class="is">Demand Guarantee / Standby LC</div></div><div class="ic lk"><div class="ii">💸</div><div class="it">MT103 — Wire</div><div class="is">Coming Soon</div></div><div class="ic lk"><div class="ii">📜</div><div class="it">MT700 — DLC</div><div class="is">Coming Soon</div></div><div class="ic lk"><div class="ii">📡</div><div class="it">MT799 — Free Format</div><div class="is">Coming Soon</div></div></div>
<div style="padding:0 16px"><div class="note-box"><div class="wi">📋</div><div class="wt"><strong>MT760</strong> is live. Other instrument modules coming soon. All workflows follow SWIFT Category 7 Part 3 standards.</div></div></div></div>
<!-- MT760 -->
` }} />
  )
}
