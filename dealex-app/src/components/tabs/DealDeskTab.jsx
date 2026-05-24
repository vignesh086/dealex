export default function DealDeskTab() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div class="tab-page" id="pg-desk"><div class="section"><div class="ey">Deal Desk</div><div class="h2">DEALEX <em>DESK.</em></div><div class="bt">You have part of a deal. We help you complete it. Select your position below.</div></div>

<!-- Entry Point Selector -->
<div class="ig" style="grid-template-columns:1fr 1fr">
<div class="ic" id="desk-project" onclick="deskEntry('project')" style="border-width:2px;border-color:rgba(42,128,80,.3);background:rgba(42,128,80,.04);grid-column:1/-1"><div class="ii">🏗️</div><div class="it" style="color:var(--green)">I Need Project Funding</div><div class="is">I have a project, contract, or development — I need capital to build it</div></div>
<div class="ic" id="desk-sender" onclick="deskEntry('sender')" style="border-width:2px"><div class="ii">📤</div><div class="it">I'm a Sender</div><div class="is">I have funds · Need a receiver</div></div>
<div class="ic" id="desk-receiver" onclick="deskEntry('receiver')" style="border-width:2px"><div class="ii">📥</div><div class="it">I'm a Receiver</div><div class="is">I can receive · Need a sender</div></div>
<div class="ic" id="desk-mandate" onclick="deskEntry('mandate')" style="border-width:2px;grid-column:1/-1"><div class="ii">📋</div><div class="it">I'm a Mandate / Broker</div><div class="is">I have one side · Need the other · Or I'm putting a deal together</div></div>
</div>

<!-- Project Funding Seeker Flow -->
<div id="deskProjectFlow" style="display:none;padding:0 16px">

<div style="background:linear-gradient(135deg,rgba(42,128,80,.12) 0%,rgba(59,73,223,.08) 100%);border:1px solid rgba(42,128,80,.3);padding:18px;margin-bottom:14px;position:relative;overflow:hidden">
<div style="position:absolute;top:-10px;right:-5px;font-size:60px;opacity:.06">🏗️</div>
<div style="font-family:'Inter', sans-serif;font-size:20px;font-weight:600;color:var(--white);margin-bottom:6px">You have a <span style="color:var(--green)">project</span>.</div>
<div style="font-size:13px;color:var(--txt);line-height:1.7">You've been awarded a contract, you own a development, or you have a project that needs capital. You don't need to understand financial instruments — DEALEX will figure out the right structure for you.</div>
</div>

<div class="card" style="margin-bottom:14px"><div class="ch"><span class="chl">About your project</span><span class="pill pg">Start here</span></div><div class="cb">
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px">Tell us the basics. This information is confidential until you sign an NCNDA.</div>
<div class="fg"><label class="fl">What is the project?</label><input class="fi" id="deskProjName" placeholder="e.g. Airport terminal, housing development, solar farm"></div>
<div class="fr">
<div class="fg"><label class="fl">Estimated total project cost</label><input class="fi" id="deskProjAmount" placeholder="e.g. 500,000,000"></div>
<div class="fg"><label class="fl">Currency</label><select class="fs" id="deskProjCurrency"><option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="MYR">MYR</option><option value="SGD">SGD</option><option value="AED">AED</option><option value="CNY">CNY</option></select></div>
</div>
<div class="fg"><label class="fl">Country</label><select class="fs" id="deskProjCountry"><option value="">— Select —</option><option value="Malaysia">Malaysia</option><option value="Singapore">Singapore</option><option value="Indonesia">Indonesia</option><option value="Thailand">Thailand</option><option value="Philippines">Philippines</option><option value="Vietnam">Vietnam</option><option value="China">China</option><option value="India">India</option><option value="UAE">UAE</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Qatar">Qatar</option><option value="Nigeria">Nigeria</option><option value="South Africa">South Africa</option><option value="Kenya">Kenya</option><option value="Ghana">Ghana</option><option value="Egypt">Egypt</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="Australia">Australia</option><option value="Other">Other</option></select></div>
<div class="fg"><label class="fl">How did you get this project?</label><select class="fs" id="deskProjSource"><option value="">— How are you involved? —</option><option value="awarded">I was awarded this contract by government/client</option><option value="own_land">I own the land or development rights</option><option value="developer">I'm the developer building this</option><option value="concession">I hold the concession or operating licence</option><option value="partnership">I'm in a partnership or JV for this project</option><option value="advisor">I'm advising the project owner who needs funding</option></select></div>
</div></div>

<!-- PROJECT DOCUMENT DROPBOX -->
<div class="card" style="margin-bottom:14px"><div class="ch"><span class="chl">Upload your project documents</span><span class="pill po" id="projDocPill">0 uploaded</span></div><div class="cb">
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px">Upload everything you have. Funders want to see real documentation — not just an idea. The more you upload, the stronger your position.</div>

<div style="border:1.5px dashed var(--border-mid);padding:18px;text-align:center;cursor:pointer;background:var(--panel);margin-bottom:12px;transition:all .2s" onclick="document.getElementById('projDocInput').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''" ondrop="event.preventDefault();this.style.borderColor='';handleProjDocs(event.dataTransfer.files)">
<div style="font-size:24px;margin-bottom:6px">📁</div>
<div style="font-size:11px;font-weight:600;color:var(--txt)">Drop project files here</div>
<div style="font-size:13px;color:var(--muted2)">PDF, DOCX, XLSX, images · Multiple files OK · Or click to browse</div>
</div>
<input type="file" id="projDocInput" multiple accept=".pdf,.doc,.docx,.xlsx,.xls,.jpg,.jpeg,.png,.pptx" style="display:none" onchange="handleProjDocs(this.files)">
<div id="projDocList" style="display:none;margin-bottom:12px"></div>
</div></div>

<!-- MINIMUM STANDARDS / INVESTABILITY CHECKLIST -->
<div class="card" style="margin-bottom:14px"><div class="ch"><span class="chl">Minimum investability standards</span><span class="pill pr" id="minStdPill">Not Ready</span></div><div class="cb">

<div style="background:rgba(208,64,48,.08);border:1px solid rgba(208,64,48,.2);padding:12px;margin-bottom:14px">
<div style="font-size:13px;color:#E06050;font-weight:600;margin-bottom:4px">⚠ Reality check</div>
<div style="font-size:13px;color:var(--txt);line-height:1.7">Banks lend against assets — not ideas. An SBLC provides funding for <strong style="color:var(--gold)">366 days</strong>. After that, you need to refinance or repay from project revenue. DEALEX Desk specializes in <strong style="color:var(--gold)">soft costs</strong> — the initial capital to get your project to a point where it becomes investable for long-term financing. We cannot raise money for just an idea. You must meet these minimum standards.</div>
</div>

<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#E06050;font-weight:600;margin-bottom:8px">Must have — deal cannot proceed without these</div>
<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:14px" id="projMustHave">
<div class="wiz-check" onclick="toggleProjCheck(this,'must')" data-id="legal_entity"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Legal entity exists</strong> — registered company, SPV, or statutory body that can receive funds</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'must')" data-id="land_or_rights"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Land, concession, or contract secured</strong> — something tangible that proves this project is real</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'must')" data-id="feasibility"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Feasibility study or business plan</strong> — a document that shows this project can work financially</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'must')" data-id="kyc_ready"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>KYC-ready principals</strong> — passport, company registration, proof of address for key people</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'must')" data-id="revenue_path"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Clear revenue path or exit</strong> — how does the SBLC get repaid within 366 days? Refinance plan, offtake, concession income, or asset sale</span></div>
</div>

<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Should have — strengthens your position significantly</div>
<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:14px" id="projShouldHave">
<div class="wiz-check" onclick="toggleProjCheck(this,'should')" data-id="gov_support"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Government support letter or approval</strong> — sovereign backing makes everything easier</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'should')" data-id="bank_relationship"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Existing bank relationship</strong> — a bank that knows you and can receive instruments</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'should')" data-id="cost_breakdown"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Detailed cost breakdown</strong> — not just a total number, but where every dollar goes</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'should')" data-id="contractor"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Contractor or EPC firm identified</strong> — someone who will actually build this</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'should')" data-id="timeline"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Project timeline with milestones</strong> — when does each phase start and finish</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'should')" data-id="env_assessment"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Environmental or social impact assessment</strong> — required for most infrastructure</span></div>
</div>

<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:8px">Nice to have — makes the deal close faster</div>
<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:14px" id="projNiceHave">
<div class="wiz-check" onclick="toggleProjCheck(this,'nice')" data-id="insurance"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Insurance or performance guarantee arranged</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'nice')" data-id="co_investors"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Co-investors or co-funders partially committed</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'nice')" data-id="legal_opinion"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Legal opinion on the project structure</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'nice')" data-id="valuation"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Independent valuation or appraisal</span></div>
<div class="wiz-check" onclick="toggleProjCheck(this,'nice')" data-id="pmo"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Project management team assembled</span></div>
</div>

<!-- Investability Score -->
<div id="projInvestScore" style="display:none;background:var(--obs);border:1px solid var(--border-mid);padding:14px;margin-top:10px">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
<div style="font-family:'Inter',sans-serif;font-size:36px" id="projScoreNum">0%</div>
<div style="flex:1">
<div class="pb"><div class="pf" id="projScoreBar" style="width:0%;transition:width .4s"></div></div>
<div style="font-size:13px;color:var(--muted2);margin-top:4px" id="projScoreLabel">Complete the checklist above</div>
</div>
</div>
<div id="projScoreVerdict" style="font-size:13px;line-height:1.7"></div>
</div>

</div></div>

<!-- PROJECT INCENTIVES -->
<div class="card" style="margin-bottom:14px"><div class="ch"><span class="chl">Project incentives & tax advantages</span><span class="pill" id="projIncentivePill" style="background:rgba(59,73,223,.12);color:var(--gold);border:1px solid rgba(59,73,223,.3)">Deal Catalyst</span></div><div class="cb">

<div style="background:linear-gradient(135deg,rgba(59,73,223,.1) 0%,rgba(42,128,80,.06) 100%);border:1px solid rgba(59,73,223,.25);padding:14px;margin-bottom:14px">
<div style="font-family:'Inter', sans-serif;font-size:16px;font-weight:600;color:var(--white);margin-bottom:4px">This could be the reason you <span style="color:var(--gold)">get funded</span>.</div>
<div style="font-size:13px;color:var(--txt);line-height:1.7">Tax incentives, opportunity zones, and special economic designations can dramatically improve returns for funders. A project in an opportunity zone with a 10-year tax holiday on profits changes the deal economics completely. Check everything that applies to your project.</div>
</div>

<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Tax & profit incentives</div>
<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px">
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="opp_zone"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Opportunity Zone / Tax-Exempt Zone</strong> — profits from the project are tax-exempt for a designated period</span></div>
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="tax_holiday"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Tax holiday</strong> — corporate tax exemption for 5, 10, or 15+ years</span></div>
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="capital_gains"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Capital gains exemption</strong> — no tax on asset appreciation or sale proceeds</span></div>
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="repatriation"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Profit repatriation allowed</strong> — foreign investors can take profits home without restriction</span></div>
</div>

<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Trade & operational incentives</div>
<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px">
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="ftz"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Free Trade Zone (FTZ) / Special Economic Zone (SEZ)</strong> — reduced customs, import/export benefits</span></div>
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="duty_free"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Duty-free import on equipment & materials</strong> — no import tax on project-related goods</span></div>
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="foreign_ownership"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>100% foreign ownership permitted</strong> — no local partner requirement</span></div>
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="expedited"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Expedited permits & approvals</strong> — fast-track regulatory processing</span></div>
</div>

<div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Government & financial support</div>
<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px">
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="gov_grant"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Government grant or subsidy</strong> — direct financial contribution from the government</span></div>
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="sovereign_guarantee"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Sovereign guarantee</strong> — government guarantees the project's debt obligations</span></div>
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="concessional_loan"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Concessional loan available</strong> — below-market interest rates from development banks</span></div>
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="land_grant"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Free or discounted land</strong> — government-provided land at below market value</span></div>
<div class="wiz-check" onclick="toggleIncentive(this)" data-id="infrastructure"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span><strong>Government-funded supporting infrastructure</strong> — roads, utilities, connections built by government</span></div>
</div>

<!-- Incentive details -->
<div id="projIncentiveDetails" style="display:none;margin-top:10px">
<div class="fg"><label class="fl">Describe the key incentive (for the pitch deck)</label><textarea class="fi" id="projIncentiveDesc" rows="3" style="resize:vertical;min-height:60px" placeholder="e.g. Located in Malaysia's KLIA Aeropolis Special Economic Zone — 10-year corporate tax holiday, 100% foreign ownership, duty-free equipment imports, expedited permits under MIDA investment framework."></textarea></div>
<div class="fr">
<div class="fg"><label class="fl">Incentive duration</label><input class="fi" id="projIncentiveDuration" placeholder="e.g. 10 years, or 15 years from COD"></div>
<div class="fg"><label class="fl">Governing authority / legislation</label><input class="fi" id="projIncentiveAuth" placeholder="e.g. MIDA, BOI, BKPM, Opportunity Zone Act"></div>
</div>
</div>

<div id="projIncentiveSummary" style="display:none;background:rgba(42,128,80,.08);border:1px solid rgba(42,128,80,.25);padding:12px;margin-top:10px">
<div style="font-size:13px;color:var(--green);font-weight:600;margin-bottom:4px" id="projIncentiveCount">0 incentives selected</div>
<div style="font-size:13px;color:var(--txt);line-height:1.6" id="projIncentiveMsg">Projects with tax incentives are significantly more attractive to funders. These will be highlighted prominently in your pitch deck.</div>
</div>

</div></div>

<!-- SOFT COSTS FOCUS -->
<div class="card" style="margin-bottom:14px"><div class="ch"><span class="chl">What DEALEX funds</span><span class="pill" style="background:rgba(59,73,223,.12);color:var(--gold);border:1px solid rgba(59,73,223,.3)">Soft Costs</span></div><div class="cb">
<div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:12px">DEALEX Desk specializes in <strong style="color:var(--gold)">soft costs</strong> — the initial capital that gets your project to a bankable, investable stage. SBLC funding is for <strong style="color:var(--gold)">366 days</strong>. The goal is to use that year to complete enough work that long-term financing (project bonds, bank loans, equity) becomes available.</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
<div style="background:rgba(42,128,80,.06);border:1px solid rgba(42,128,80,.2);padding:10px">
<div style="font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--green);font-weight:600;margin-bottom:4px">✓ What we fund</div>
<div style="font-size:13px;color:var(--txt);line-height:1.8">Detailed design & engineering<br>Land preparation & surveys<br>Permits & regulatory approvals<br>Environmental assessments<br>Legal & structuring fees<br>Project management setup<br>Initial procurement deposits<br>Working capital for Phase 1</div>
</div>
<div style="background:rgba(208,64,48,.06);border:1px solid rgba(208,64,48,.2);padding:10px">
<div style="font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#E06050;font-weight:600;margin-bottom:4px">✕ What we don't fund</div>
<div style="font-size:13px;color:var(--txt);line-height:1.8">Pure ideas with no documentation<br>Projects with no legal entity<br>Speculative investments<br>Personal expenses or salaries<br>Debt repayment or refinancing<br>Projects in sanctioned countries<br>Deals with no exit or repayment plan<br>Anything without KYC-ready principals</div>
</div>
</div>
<div style="font-size:13px;color:var(--muted);font-style:italic;text-align:center">After 366 days, the project must either refinance through conventional banking or generate enough revenue to repay. DEALEX helps structure the exit before the instrument is issued.</div>
</div></div>

<div class="card" style="margin-bottom:14px"><div class="ch"><span class="chl">What do you need?</span></div><div class="cb">
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px">We'll match you with the right funding structure. Check all that apply.</div>
<div style="display:flex;flex-direction:column;gap:6px" id="deskProjNeeds">
<div class="wiz-check" onclick="this.classList.toggle('on')"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Soft costs — design, permits, surveys, legal, project setup</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on')"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Phase 1 construction or development capital</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on')"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Bank guarantee or SBLC to secure the contract</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on')"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Performance bond or advance payment guarantee</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on')"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>Bridge financing while waiting for other funds</span></div>
<div class="wiz-check" onclick="this.classList.toggle('on')"><div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>I'm not sure — I just need funding to get started</span></div>
</div>
</div></div>

<div style="display:flex;gap:8px;margin-bottom:14px">
<button class="bg" style="flex:1;padding:14px" onclick="deskProjectToWizard()" id="projWizardBtn">✨ Analyze My Project with DEALEX Wizard</button>
</div>

<div class="note-box"><div class="wi">💡</div><div class="wt"><strong>What happens next:</strong> The DEALEX Wizard will analyze your project, check your readiness, recommend the right instrument, estimate costs, and generate a professional pitch deck for your funder team. You don't need to know anything about SBLC, MT760, or SWIFT — we handle that.</div></div>

</div>

<!-- Sender Entry Flow -->
<div id="deskSenderFlow" style="display:none;padding:0 16px">

<div style="background:linear-gradient(135deg,rgba(59,73,223,.12) 0%,rgba(59,73,223,.04) 100%);border:1px solid var(--border-hi);padding:18px;margin-bottom:14px;position:relative;overflow:hidden">
<div style="position:absolute;top:-10px;right:-5px;font-size:60px;opacity:.06">📤</div>
<div style="font-family:'Inter', sans-serif;font-size:20px;font-weight:600;color:var(--white);margin-bottom:6px">You have the <span style="color:var(--gold)">funds</span>.</div>
<div style="font-size:13px;color:var(--txt);line-height:1.7">You're the account holder or applicant on the issuing bank side. Your bank will issue the instrument. Before DEALEX can match you with a verified receiver, we need to confirm you're real.</div>
</div>

<!-- Step 1: Prove you have a bank -->
<div class="card"><div class="ch"><span class="chl">1. Your Bank Relationship</span><span class="pill pr" id="deskS1Pill">Required</span></div><div class="cb">
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px">This proves you have a real issuing bank that can transmit a SWIFT MT760. No bank = no deal.</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Issuing Bank Name<span class="rq">*</span></label><input class="fi" id="deskIssBankName" placeholder="e.g. HSBC Holdings PLC" oninput="updateDeskProgress()"></div>
<div class="fg"><label class="fl">SWIFT / BIC Code<span class="rq">*</span></label><input class="fi" id="deskIssSwift" placeholder="e.g. HBUKGB4124C" oninput="updateDeskProgress()"></div>
</div>
<div class="fg"><label class="fl">Bank Address</label><input class="fi" id="deskIssBankAddr" placeholder="Branch address"></div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Bank Officer Name</label><input class="fi" id="deskIssOfficer" placeholder="Your relationship manager"></div>
<div class="fg"><label class="fl">Officer Email / Phone</label><input class="fi" id="deskIssOfficerContact" placeholder="Direct contact"></div>
</div>
</div></div>

<!-- Step 2: Your Identity -->
<div class="card"><div class="ch"><span class="chl">2. Your Identity (KYC)</span><span class="pill pr" id="deskS2Pill">Required</span></div><div class="cb">
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px">We verify you are who you say you are. This information is never shared with the other side until NCNDA is signed.</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Full Name<span class="rq">*</span></label><input class="fi" id="deskSenderName" placeholder="As on passport" oninput="updateDeskProgress()"></div>
<div class="fg"><label class="fl">Passport Number<span class="rq">*</span></label><input class="fi" id="deskSenderPP" placeholder="Passport number" oninput="updateDeskProgress()"></div>
</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Company Name<span class="rq">*</span></label><input class="fi" id="deskSenderCompany" placeholder="Legal entity name" oninput="updateDeskProgress()"></div>
<div class="fg"><label class="fl">Company Registration</label><input class="fi" id="deskSenderReg" placeholder="Reg number"></div>
</div>
<div class="fg"><label class="fl">Country</label><input class="fi" id="deskSenderCountry" placeholder="Country of incorporation"></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
<div class="upload-zone" id="deskSenderPPUpload" onclick="document.getElementById('deskFilePP').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''">
<div style="font-size:22px;margin-bottom:3px">🪪</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Passport Copy</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px">Certified · Click to upload</div>
</div>
<div class="upload-zone" id="deskSenderCertUpload" onclick="document.getElementById('deskFileCert').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor=''">
<div style="font-size:22px;margin-bottom:3px">🏢</div>
<div style="font-size:13px;font-weight:600;color:var(--txt)">Certificate of Inc.</div>
<div style="font-size:11px;color:var(--muted2);margin-top:2px">Company docs · Click to upload</div>
</div>
</div>
<input type="file" id="deskFilePP" accept="image/*,.pdf" style="display:none" onchange="handleDeskUpload('pp',this.files[0],document.getElementById('deskSenderPPUpload'))">
<input type="file" id="deskFileCert" accept="image/*,.pdf,.doc,.docx" style="display:none" onchange="handleDeskUpload('cert',this.files[0],document.getElementById('deskSenderCertUpload'))">
</div></div>

<!-- Step 3: The Instrument -->
<div class="card"><div class="ch"><span class="chl">3. What You Want to Issue</span><span class="pill pr" id="deskS3Pill">Required</span></div><div class="cb">
<div style="font-size:13px;color:var(--muted2);margin-bottom:10px">What instrument, how much, and how is it backed?</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Instrument Type<span class="rq">*</span></label><select class="fs" id="deskInstrument" onchange="updateDeskProgress()"><option value="">— Select —</option><option value="SBLC">SBLC (Standby Letter of Credit)</option><option value="DLC">DLC (Documentary Letter of Credit)</option><option value="BG">BG (Bank Guarantee)</option><option value="MT103">MT103 (Wire Transfer)</option></select></div>
<div class="fg"><label class="fl">Currency<span class="rq">*</span></label><select class="fs" id="deskCurrency" onchange="updateDeskProgress()"><option value="">— Select —</option><option value="EUR">EUR</option><option value="USD">USD</option><option value="GBP">GBP</option><option value="CHF">CHF</option><option value="SGD">SGD</option><option value="AED">AED</option></select></div>
</div>
<div class="fr" style="margin-bottom:6px">
<div class="fg"><label class="fl">Face Value<span class="rq">*</span></label><input class="fi" id="deskFaceValue" placeholder="e.g. 100,000,000" oninput="updateDeskProgress()"></div>
<div class="fg"><label class="fl">Tenor / Validity</label><input class="fi" id="deskTenor" placeholder="e.g. 1 year + 1 day"></div>
</div>
<div class="fg"><label class="fl">Collateral / Backing<span class="rq">*</span></label><select class="fs" id="deskCollateral" onchange="updateDeskProgress()"><option value="">— How is this backed? —</option><option value="cash">Cash-backed (funds in account)</option><option value="asset">Asset-backed (property, securities, etc.)</option><option value="credit">Credit line with bank</option><option value="blocked">Funds already blocked/earmarked</option></select></div>
<div class="fg"><label class="fl">Additional Details</label><input class="fi" id="deskNotes" placeholder="Any specifics about the instrument or deal structure"></div>
</div></div>

<!-- Step 4: NCNDA with DEALEX -->
<div class="card"><div class="ch"><span class="chl">4. Sign NCNDA with DEALEX</span><span class="pill po" id="deskS4Pill">After Steps 1-3</span></div><div class="cb">
<div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:10px">Before DEALEX can share your information with any potential receiver or begin matching, you must sign an NCNDA with DEALEX. This protects your identity, bank details, and deal structure.</div>
<button class="bg" id="deskNCNDABtn" onclick="generateDeskNCNDA()" disabled>🛡️ Generate NCNDA with DEALEX</button>
<div style="font-size:13px;color:var(--muted);margin-top:6px;text-align:center">Complete Steps 1-3 first to enable this button.</div>
</div></div>

<!-- Progress -->
<div style="margin:14px 0">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span id="deskProgressPct" style="font-family:'Inter',sans-serif;font-size:24px;color:var(--muted2)">0%</span><div class="pb" style="flex:1"><div class="pf" id="deskProgressBar" style="width:0%;background:var(--gold)" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div></div>
<div style="font-size:13px;color:var(--muted);text-align:center">Complete all required fields. Once verified, you'll enter the DEALEX matching pool.</div>
</div>

<!-- What happens next -->
<div class="card"><div class="ch"><span class="chl">What Happens Next</span></div><div class="cb">
<div style="font-size:13px;color:var(--txt);line-height:1.8">
<div style="margin-bottom:6px"><strong style="color:var(--gold)">1.</strong> DEALEX independently verifies your bank relationship and KYC</div>
<div style="margin-bottom:6px"><strong style="color:var(--gold)">2.</strong> You enter the verified sender pool</div>
<div style="margin-bottom:6px"><strong style="color:var(--gold)">3.</strong> DEALEX matches you with a verified receiver who has a BCL from a real advising bank</div>
<div style="margin-bottom:6px"><strong style="color:var(--gold)">4.</strong> Both sides sign NCNDA with each other</div>
<div style="margin-bottom:6px"><strong style="color:var(--gold)">5.</strong> Normal deal flow begins: DOA → Term Sheet → IMFPA → Bank Package</div>
</div>
</div></div>

<div class="warning-box" style="margin-top:14px;margin-bottom:20px"><div class="wi">💀</div><div class="wt"><strong>Reality check:</strong> If you cannot walk into your bank tomorrow and instruct them to issue this instrument — you are not a real sender. Do not waste anyone's time. DEALEX verifies everything.</div></div>
</div>

<!-- Receiver Entry Flow (placeholder) -->
<div id="deskReceiverFlow" style="display:none;padding:0 16px">
<div class="card"><div class="cb" style="text-align:center;padding:30px"><div style="font-size:36px;margin-bottom:10px">📥</div><div style="font-size:11px;color:var(--white);font-weight:600">Receiver Entry</div><div style="font-size:13px;color:var(--muted2);margin-top:4px">Coming next — I can receive/monetize, find me a sender</div></div></div>
</div>

<!-- Mandate Entry Flow (placeholder) -->
<div id="deskMandateFlow" style="display:none;padding:0 16px">
<div class="card"><div class="cb" style="text-align:center;padding:30px"><div style="font-size:36px;margin-bottom:10px">📋</div><div style="font-size:11px;color:var(--white);font-weight:600">Mandate Entry</div><div style="font-size:13px;color:var(--muted2);margin-top:4px">Coming next — I have one side, need the other</div></div></div>
</div>

</div>
<!-- DEALEX WIZARD -->
` }} />
  )
}
