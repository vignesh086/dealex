export default function CommodityTab() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div class="tab-page" id="pg-commodity">
<div class="section" style="padding-bottom:0">
<div class="ey">Commodity Desk</div>
<div class="h2">COMMODITY <em>CONTRACTS.</em></div>
<div class="bt">Upload your commodity documents. DEALEX builds your deal package.</div>
</div>

<div style="padding:0 16px">

<!-- Role selector -->
<div class="ig" style="grid-template-columns:1fr 1fr;margin-bottom:14px">
<div class="ic" id="cmd-seller" onclick="cmdEntry('seller')" style="border-width:2px"><div class="ii">📤</div><div class="it">I'm selling commodity</div><div class="is">I have product ready to ship</div></div>
<div class="ic" id="cmd-buyer" onclick="cmdEntry('buyer')" style="border-width:2px"><div class="ii">📥</div><div class="it">I'm buying commodity</div><div class="is">I need product sourced</div></div>
<div class="ic" id="cmd-broker" onclick="cmdEntry('broker')" style="border-width:2px;grid-column:1/-1"><div class="ii">🤝</div><div class="it">I'm brokering this deal</div><div class="is">I have one side or both — need to package it</div></div>
</div>

<!-- Seller / Broker flow -->
<div id="cmdSellerFlow" style="display:none">

<!-- Upload commodity docs -->
<div class="card" style="margin-bottom:14px"><div class="ch"><span class="chl">Upload commodity documents</span><span class="pill po" id="cmdDocPill">0 files</span></div><div class="cb">
<div style="font-size:9px;color:var(--muted2);margin-bottom:10px">Drop everything you have — lab reports, CCIC/SGS certificates, assay reports, photos, mining licences. DEALEX reads and extracts the data.</div>
<div style="border:1.5px dashed var(--border-mid);padding:18px;text-align:center;cursor:pointer;background:var(--panel);margin-bottom:10px" onclick="document.getElementById('cmdDocInput').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor='var(--border-mid)'" ondrop="event.preventDefault();this.style.borderColor='';handleCmdDocs(event.dataTransfer.files)">
<div style="font-size:20px;margin-bottom:4px">📁</div>
<div style="font-size:10px;font-weight:600;color:var(--gold)">Drop commodity files here</div>
<div style="font-size:8px;color:var(--muted2)">PDF, DOCX, images · Multiple files OK</div>
</div>
<input type="file" id="cmdDocInput" multiple accept=".pdf,.doc,.docx,.xlsx,.jpg,.jpeg,.png" style="display:none" onchange="handleCmdDocs(this.files)">
<div id="cmdDocList"></div>
</div></div>

<!-- Commodity details -->
<div class="card" style="margin-bottom:14px"><div class="ch"><span class="chl">Commodity details</span></div><div class="cb">
<div class="fr">
<div class="fg"><label class="fl">Commodity type</label><select class="fs" id="cmdType"><option value="">— Select —</option>
<optgroup label="Minerals & Ores"><option value="bauxite">Bauxite</option><option value="iron_ore">Iron Ore</option><option value="copper_ore">Copper Ore</option><option value="manganese">Manganese</option><option value="nickel">Nickel Ore</option><option value="tin">Tin Ore</option><option value="zinc">Zinc Ore</option><option value="coal">Coal</option><option value="limestone">Limestone</option></optgroup>
<optgroup label="Energy"><option value="crude_oil">Crude Oil</option><option value="lng">LNG</option><option value="lpg">LPG</option><option value="diesel">Diesel / Gasoil</option><option value="fuel_oil">Fuel Oil</option></optgroup>
<optgroup label="Metals"><option value="gold_dore">Gold Dore</option><option value="gold_bars">Gold Bars</option><option value="silver">Silver</option><option value="copper_cathode">Copper Cathode</option><option value="aluminum_ingot">Aluminum Ingot</option></optgroup>
<optgroup label="Agriculture"><option value="palm_oil">Palm Oil (CPO/RBD)</option><option value="rice">Rice</option><option value="sugar">Sugar</option><option value="soybean">Soybean</option><option value="corn">Corn</option><option value="wheat">Wheat</option><option value="rubber">Rubber</option><option value="cocoa">Cocoa</option><option value="coffee">Coffee</option></optgroup>
<optgroup label="Other"><option value="cement">Cement</option><option value="urea">Urea / Fertilizer</option><option value="steel">Steel</option><option value="timber">Timber</option><option value="other">Other</option></optgroup>
</select></div>
<div class="fg"><label class="fl">Quantity</label><input class="fi" id="cmdQty" placeholder="e.g. 49,739"></div>
</div>
<div class="fr">
<div class="fg"><label class="fl">Unit</label><select class="fs" id="cmdUnit"><option value="MT">MT (Metric Tons)</option><option value="KG">KG</option><option value="BBL">Barrels</option><option value="LBS">Pounds</option><option value="OZ">Troy Ounces</option><option value="CBM">CBM</option></select></div>
<div class="fg"><label class="fl">Grade / Spec</label><input class="fi" id="cmdGrade" placeholder="e.g. Al₂O₃ 40%+, SiO₂ &lt;6%"></div>
</div>
<div class="fr">
<div class="fg"><label class="fl">Origin country</label><input class="fi" id="cmdOrigin" placeholder="e.g. Malaysia"></div>
<div class="fg"><label class="fl">Location / Stockpile</label><input class="fi" id="cmdLocation" placeholder="e.g. Kuantan, Pahang"></div>
</div>
<div class="fr">
<div class="fg"><label class="fl">Price per unit</label><input class="fi" id="cmdPrice" placeholder="e.g. 52"></div>
<div class="fg"><label class="fl">Currency</label><select class="fs" id="cmdCurrency"><option value="USD">USD</option><option value="EUR">EUR</option><option value="MYR">MYR</option><option value="CNY">CNY</option><option value="GBP">GBP</option></select></div>
</div>
<div class="fg"><label class="fl">Incoterms</label><select class="fs" id="cmdIncoterms"><option value="">— Select —</option><option value="FOB">FOB (Free on Board) — seller loads, buyer ships</option><option value="CIF">CIF (Cost, Insurance, Freight) — seller delivers to port</option><option value="CFR">CFR (Cost & Freight) — seller pays freight, buyer insures</option><option value="EXW">EXW (Ex Works) — buyer collects from stockpile</option><option value="FCA">FCA (Free Carrier) — seller delivers to carrier</option></select></div>
<div class="fg"><label class="fl">Port of loading</label><input class="fi" id="cmdPort" placeholder="e.g. Port of Kuantan"></div>
</div></div>

<!-- Payment terms -->
<div class="card" style="margin-bottom:14px"><div class="ch"><span class="chl">Payment terms</span><span class="pill" style="background:rgba(59,73,223,.12);color:var(--gold);border:1px solid rgba(59,73,223,.3)">Critical</span></div><div class="cb">
<div style="font-size:9.5px;color:var(--txt);line-height:1.7;margin-bottom:12px">Select your preferred payment method. Listed from <strong style="color:var(--green)">most desirable</strong> to least. The buyer will see your preference.</div>

<div style="display:flex;flex-direction:column;gap:6px">
<div class="wiz-check on" onclick="this.classList.toggle('on')" data-pay="tt"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><div><strong style="color:var(--green)">TT Wire Transfer (MT103)</strong><br><span style="font-size:9px;color:var(--muted2)">Fastest, simplest. Direct bank-to-bank wire. Requires trust or advance payment guarantee. Most desirable for seller.</span></div></div>

<div class="wiz-check" onclick="this.classList.toggle('on')" data-pay="dlc_sight"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><div><strong style="color:var(--white)">Irrevocable DLC at Sight (MT700)</strong><br><span style="font-size:9px;color:var(--muted2)">Bank-guaranteed. Paid immediately on compliant document presentation. Gold standard for commodity trade.</span></div></div>

<div class="wiz-check" onclick="this.classList.toggle('on')" data-pay="dlc_deferred"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><div><strong style="color:var(--white)">DLC with deferred payment (30/60/90 days)</strong><br><span style="font-size:9px;color:var(--muted2)">Bank-guaranteed but payment delayed. Buyer gets time to receive and verify goods before paying.</span></div></div>

<div class="wiz-check" onclick="this.classList.toggle('on')" data-pay="sblc_wire"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><div><strong style="color:var(--white)">SBLC-backed wire transfer</strong><br><span style="font-size:9px;color:var(--muted2)">SBLC issued as guarantee, payment by wire. If buyer defaults, seller draws on SBLC.</span></div></div>

<div class="wiz-check" onclick="this.classList.toggle('on')" data-pay="collection"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><div><strong style="color:var(--white)">Documentary Collection (D/P or D/A)</strong><br><span style="font-size:9px;color:var(--muted2)">Documents through banks, but no bank payment guarantee. Lower cost, higher risk.</span></div></div>
</div>
</div></div>

<!-- Seller checklist -->
<div class="card" style="margin-bottom:14px"><div class="ch"><span class="chl">Seller's deal checklist</span><span class="pill pr" id="cmdCheckPill">Incomplete</span></div><div class="cb">
<div style="font-size:9px;color:var(--muted2);margin-bottom:10px">Everything the buyer and their bank need to see. Complete this to generate your deal package.</div>

<div style="font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:#E06050;font-weight:600;margin-bottom:6px">Must have — deal cannot proceed</div>
<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px">
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Commodity inspection certificate</strong> (CCIC, SGS, or equivalent)</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Lab analysis / assay report</strong> with grade confirmation</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Mining licence or export permit</strong></span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Seller company registration</strong> and certificate of incorporation</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Seller KYC / CIS</strong> — passport, proof of address, UBO declaration</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Seller bank details</strong> — receiving bank, SWIFT, account number</span></div>
</div>

<div style="font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:6px">Should have — strengthens position</div>
<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px">
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Stockpile photos or video</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Certificate of Origin (COO)</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Second independent lab report (cross-verification)</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Shipping schedule or vessel nomination</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Previous trade references or completed shipments</span></div>
</div>

<div style="font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:6px">Ready at shipping</div>
<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px">
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Bill of Lading (B/L)</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Commercial invoice</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Packing list / weight certificate</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on');updateCmdCheck()"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Insurance certificate (if CIF)</span></div>
</div>
</div></div>

<!-- Generate -->
<div style="display:flex;gap:8px;margin-bottom:14px">
<button class="bg" style="flex:1;padding:14px" onclick="generateCommodityDeck()">📊 Generate seller's deal package</button>
</div>

<div class="note-box"><div class="wi">🛡️</div><div class="wt"><strong>NCNDA required.</strong> Before any buyer sees this package, both sides sign the NCNDA on DEALEX. The seller's bank details and sources stay protected. The buyer sees only: "✓ Verified Seller — inspected commodity, licensed mine."</div></div>

</div>

<!-- Buyer flow placeholder -->
<div id="cmdBuyerFlow" style="display:none;padding:0 16px">
<div class="card"><div class="cb" style="text-align:center;padding:20px"><div style="font-size:9px;color:var(--muted2)">Buyer flow — enter your requirements and DEALEX matches you with verified sellers.</div></div></div>
</div>

</div>
</div>

<!-- BOTTOM NAV -->
` }} />
  )
}
