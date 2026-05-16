export default function WizardTab() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div class="tab-page" id="pg-wizard">
<div class="section" style="padding-bottom:0">
<div class="ey">Wizard</div>
<div class="h2">DEALEX <em>WIZARD.</em></div>
<div class="bt">Tell us about your project. We'll tell you how to fund it.</div>
</div>

<div style="padding:0 16px" id="wizardContainer">

<!-- Step indicator -->
<div style="display:flex;align-items:center;gap:4px;margin-bottom:16px" id="wizSteps">
<div class="wiz-dot act" id="wizDot0">1</div><div class="wiz-line"></div>
<div class="wiz-dot" id="wizDot1">2</div><div class="wiz-line"></div>
<div class="wiz-dot" id="wizDot2">3</div><div class="wiz-line"></div>
<div class="wiz-dot" id="wizDot3">4</div><div class="wiz-line"></div>
<div class="wiz-dot" id="wizDot4">5</div>
</div>

<!-- Step 1: What's the project? -->
<div class="wiz-step" id="wizStep0">

<!-- Already have a deal? -->
<div style="text-align:center;margin-bottom:20px;padding:16px;border:1px solid rgba(59,73,223,.25);background:linear-gradient(135deg,rgba(59,73,223,.08) 0%,rgba(59,73,223,.02) 100%)">
<div style="font-family:'Inter', sans-serif;font-size:18px;font-weight:600;color:var(--white);margin-bottom:4px">Already have a deal?</div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:10px">Upload your project document and let DEALEX analyze it, or start building from scratch.</div>

<div style="display:flex;gap:8px;align-items:stretch">
<!-- Upload dropbox -->
<div id="wizDealDropZone" style="flex:1;border:1.5px dashed var(--border-mid);padding:16px;cursor:pointer;background:var(--panel);transition:all .2s;text-align:center" onclick="document.getElementById('wizDealFileInput').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)';this.style.background='rgba(59,73,223,.06)'" ondragleave="this.style.borderColor='var(--border-mid)';this.style.background='var(--panel)'" ondrop="event.preventDefault();this.style.borderColor='';this.style.background='var(--panel)';wizAnalyzeDeals(event.dataTransfer.files)">
<div style="font-size:20px;margin-bottom:4px">📄</div>
<div style="font-size:10px;font-weight:600;color:var(--gold)">Upload Your Deal</div>
<div style="font-size:8px;color:var(--muted2);margin-top:2px">PDF, DOCX, XLSX · Multiple files OK</div>
</div>
<input type="file" id="wizDealFileInput" multiple accept=".pdf,.doc,.docx,.xlsx,.xls,.pptx" style="display:none" onchange="wizAnalyzeDeals(this.files)">

<!-- Or create -->
<div style="flex:1;border:1.5px dashed var(--border);padding:16px;cursor:pointer;background:var(--panel);transition:all .2s;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center" onclick="navTo('desk')" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
<div style="font-size:20px;margin-bottom:4px">✨</div>
<div style="font-size:10px;font-weight:600;color:var(--white)">Create Your Deal</div>
<div style="font-size:8px;color:var(--muted2);margin-top:2px">Start from scratch on Deal Desk</div>
</div>
</div>

<!-- Analysis result (hidden until file uploaded) -->
<div id="wizDealAnalysis" style="display:none;margin-top:12px;text-align:left">
<div style="background:var(--obs);border:1px solid var(--border-mid);padding:12px">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
<div style="font-size:7px;font-weight:700;color:var(--gold);width:36px;height:44px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(59,73,223,.3);flex-shrink:0" id="wizDealFileIcon">PDF</div>
<div style="flex:1;min-width:0">
<div style="font-size:10px;font-weight:600;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis" id="wizDealFileName">—</div>
<div style="font-size:8px;color:var(--gold);margin-top:2px" id="wizDealFileStatus">Analyzing...</div>
</div>
</div>
<div id="wizDealAnalysisBody" style="font-size:9.5px;color:var(--txt);line-height:1.7"></div>
<div style="display:flex;gap:8px;margin-top:10px">
<button class="bg" style="flex:1;padding:14px;font-size:11px;font-weight:700" id="wizDealContinueBtn" onclick="wizDealContinue()">CONTINUE WITH THIS DEAL →</button>
<button class="bgh" onclick="wizDealClear()" style="padding:10px 14px;font-size:7px;flex-shrink:0">CLEAR</button>
</div>
</div>
</div>
</div>

<div style="font-family:'Inter', sans-serif;font-size:22px;font-weight:600;color:var(--white);margin-bottom:6px">What kind of <span style="color:var(--gold)">project</span> is this?</div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:14px">Pick the category that best describes what you're trying to build or fund.</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
<div class="wiz-opt" onclick="wizSelect(0,'infrastructure','Infrastructure')">🏗️<br><strong>Infrastructure</strong><br><span>Airport, rail, highway, port, bridge</span></div>
<div class="wiz-opt" onclick="wizSelect(0,'realestate','Real Estate')">🏢<br><strong>Real Estate</strong><br><span>Commercial, residential, mixed-use</span></div>
<div class="wiz-opt" onclick="wizSelect(0,'energy','Energy')">⚡<br><strong>Energy</strong><br><span>Solar, wind, oil & gas, power plant</span></div>
<div class="wiz-opt" onclick="wizSelect(0,'mining','Mining')">⛏️<br><strong>Mining</strong><br><span>Gold, ore, coal, minerals</span></div>
<div class="wiz-opt" onclick="wizSelect(0,'trade','Trade Finance')">🚢<br><strong>Trade Finance</strong><br><span>Import/export, commodity trading</span></div>
<div class="wiz-opt" onclick="wizSelectHumanitarian()" style="border-color:rgba(42,128,80,.3);background:rgba(42,128,80,.04)">🌍<br><strong style="color:var(--green)">Humanitarian</strong><br><span>Clean city, hospital, housing, water</span></div>
<div class="wiz-opt" onclick="wizSelect(0,'agriculture','Agriculture')">🌾<br><strong>Agriculture</strong><br><span>Farming, food processing, irrigation</span></div>
<div class="wiz-opt" onclick="wizSelect(0,'other','Other')">📋<br><strong>Other</strong><br><span>Tech, telecom, defence, etc.</span></div>
</div>

<!-- Humanitarian sub-selector (hidden initially) -->
<div id="wizHumanitarianPanel" style="display:none;margin-top:14px">
<div style="font-family:'Inter', sans-serif;font-size:18px;font-weight:600;color:var(--green);margin-bottom:4px">Humanitarian & development projects</div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:12px">Select a project type below, or use one of our pre-built templates. Templates come with a project structure, budget breakdown, and recommended funding instrument — just customize for your country and scale.</div>

<div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Big-ticket infrastructure</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px">
<div class="wiz-opt" onclick="wizUseTemplate('smart_city')">🏙️<br><strong>Smart City / Clean City</strong><br><span>Full city infrastructure: transport, utilities, housing, digital backbone</span></div>
<div class="wiz-opt" onclick="wizUseTemplate('airport')">✈️<br><strong>Airport Terminal</strong><br><span>New terminal, runway, baggage systems, people mover</span></div>
<div class="wiz-opt" onclick="wizUseTemplate('rail_network')">🚄<br><strong>Rail / Transit Network</strong><br><span>Metro, HSR, light rail, bus rapid transit</span></div>
<div class="wiz-opt" onclick="wizUseTemplate('port')">🚢<br><strong>Seaport / Free Trade Zone</strong><br><span>Container port, logistics hub, special economic zone</span></div>
</div>

<div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Healthcare & social</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px">
<div class="wiz-opt" onclick="wizUseTemplate('hospital')">🏥<br><strong>Hospital Complex</strong><br><span>Teaching hospital, medical city, specialist centres</span></div>
<div class="wiz-opt" onclick="wizUseTemplate('housing')">🏘️<br><strong>Mass Housing</strong><br><span>Affordable housing, social housing, township development</span></div>
<div class="wiz-opt" onclick="wizUseTemplate('water')">💧<br><strong>Water & Sanitation</strong><br><span>Water treatment, desalination, sewage, clean water access</span></div>
<div class="wiz-opt" onclick="wizUseTemplate('education')">🎓<br><strong>Education Campus</strong><br><span>University, technical college, school network</span></div>
</div>

<div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Energy & environment</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px">
<div class="wiz-opt" onclick="wizUseTemplate('solar_farm')">☀️<br><strong>Solar / Wind Farm</strong><br><span>Utility-scale renewable energy generation</span></div>
<div class="wiz-opt" onclick="wizUseTemplate('power_grid')">⚡<br><strong>National Power Grid</strong><br><span>Transmission lines, substations, rural electrification</span></div>
<div class="wiz-opt" onclick="wizUseTemplate('waste')">♻️<br><strong>Waste Management</strong><br><span>Recycling, waste-to-energy, landfill remediation</span></div>
<div class="wiz-opt" onclick="wizUseTemplate('food_security')">🌾<br><strong>Food Security</strong><br><span>Irrigation, cold chain, processing plants, distribution</span></div>
</div>

<div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Multi-phase mega-projects</div>
<div style="display:grid;grid-template-columns:1fr;gap:6px;margin-bottom:12px">
<div class="wiz-opt" onclick="wizUseTemplate('new_city')" style="text-align:left;padding:14px">
<strong style="font-size:13px">🌍 New City Development</strong><br>
<span style="line-height:1.7">The full package: airport → hospital → housing → schools → water → power → transit → economic zone. Phased over 5-15 years. Typically USD 5-50 billion. Requires sovereign backing. DEALEX structures each phase as a separate tranche with its own instrument.</span>
</div>
<div class="wiz-opt" onclick="wizUseTemplate('disaster_rebuild')" style="text-align:left;padding:14px">
<strong style="font-size:13px">🔄 Post-Disaster Rebuild</strong><br>
<span style="line-height:1.7">Emergency infrastructure reconstruction: hospitals, bridges, housing, utilities. Accelerated timeline. Often backed by international development agencies. DEALEX can structure bridge financing while government grants are processed.</span>
</div>
</div>

<div style="font-size:9px;color:var(--muted);margin-top:6px;text-align:center">Don't see your project? Pick the closest match — we'll customize in the next steps.</div>
<div style="display:flex;gap:8px;margin-top:12px">
<button class="bgh" onclick="hideHumanitarian()">← Back to categories</button>
<button class="bg" style="flex:1" onclick="wizSelect(0,'humanitarian','Humanitarian')">Skip templates — I'll describe my own →</button>
</div>
</div>
</div>

<!-- Step 2: How much? -->
<div class="wiz-step" id="wizStep1" style="display:none">
<div style="font-family:'Inter', sans-serif;font-size:22px;font-weight:600;color:var(--white);margin-bottom:6px">How much <span style="color:var(--gold)">funding</span> do you need?</div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:14px">Approximate is fine. We need a rough idea of the scale.</div>
<!-- Template notice (shown when using a template) -->
<div id="wizTemplateNotice" style="display:none;background:rgba(42,128,80,.08);border:1px solid rgba(42,128,80,.25);padding:12px;margin-bottom:12px">
<div style="font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:var(--green);font-weight:600;margin-bottom:4px">Template loaded</div>
<div style="font-size:10px;color:var(--txt)" id="wizTemplateDesc">Pre-filled from template. Adjust the numbers and details for your specific project.</div>
</div>
<div class="fg"><label class="fl">Project Name</label><input class="fi" id="wizProjectName" placeholder="e.g. KLIA Terminal 3"></div>
<div class="fr">
<div class="fg"><label class="fl">Currency</label><select class="fs" id="wizCurrency"><option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="MYR">MYR</option><option value="SGD">SGD</option><option value="AED">AED</option><option value="CNY">CNY</option></select></div>
<div class="fg"><label class="fl">Amount Needed</label><input class="fi" id="wizAmount" placeholder="e.g. 500,000,000"></div>
</div>
<div class="fg"><label class="fl">What is the funding for?</label><input class="fi" id="wizPurpose" placeholder="e.g. Construction of new airport terminal"></div>
<div style="display:flex;gap:8px;margin-top:14px">
<button class="bgh" onclick="wizBack()">← Back</button>
<button class="bg" style="flex:1" onclick="wizNext()">Next →</button>
</div>
</div>

<!-- Step 3: Where is this project? -->
<div class="wiz-step" id="wizStep2" style="display:none">
<div style="font-family:'Inter', sans-serif;font-size:22px;font-weight:600;color:var(--white);margin-bottom:6px">Where is this <span style="color:var(--gold)">project</span> located?</div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:14px">The country determines what regulatory path the funding takes — some countries have capital controls that affect how instruments are transmitted.</div>
<div class="fg"><label class="fl">Project Country</label><select class="fs" id="wizCountry">
<option value="">— Select country —</option>
<optgroup label="Southeast Asia">
<option value="Malaysia">Malaysia</option><option value="Singapore">Singapore</option><option value="Indonesia">Indonesia</option><option value="Thailand">Thailand</option><option value="Philippines">Philippines</option><option value="Vietnam">Vietnam</option><option value="Myanmar">Myanmar</option><option value="Cambodia">Cambodia</option><option value="Laos">Laos</option><option value="Brunei">Brunei</option><option value="Timor-Leste">Timor-Leste</option>
</optgroup>
<optgroup label="East Asia">
<option value="China">China</option><option value="Japan">Japan</option><option value="South Korea">South Korea</option><option value="Taiwan">Taiwan</option><option value="Hong Kong">Hong Kong</option><option value="Mongolia">Mongolia</option>
</optgroup>
<optgroup label="South Asia">
<option value="India">India</option><option value="Pakistan">Pakistan</option><option value="Bangladesh">Bangladesh</option><option value="Sri Lanka">Sri Lanka</option><option value="Nepal">Nepal</option><option value="Maldives">Maldives</option><option value="Bhutan">Bhutan</option><option value="Afghanistan">Afghanistan</option>
</optgroup>
<optgroup label="Middle East">
<option value="United Arab Emirates">United Arab Emirates</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Qatar">Qatar</option><option value="Kuwait">Kuwait</option><option value="Bahrain">Bahrain</option><option value="Oman">Oman</option><option value="Jordan">Jordan</option><option value="Lebanon">Lebanon</option><option value="Iraq">Iraq</option><option value="Iran">Iran</option><option value="Yemen">Yemen</option><option value="Syria">Syria</option><option value="Israel">Israel</option><option value="Palestine">Palestine</option>
</optgroup>
<optgroup label="Africa">
<option value="Nigeria">Nigeria</option><option value="South Africa">South Africa</option><option value="Kenya">Kenya</option><option value="Ghana">Ghana</option><option value="Ethiopia">Ethiopia</option><option value="Tanzania">Tanzania</option><option value="Uganda">Uganda</option><option value="Rwanda">Rwanda</option><option value="Morocco">Morocco</option><option value="Egypt">Egypt</option><option value="Algeria">Algeria</option><option value="Tunisia">Tunisia</option><option value="Libya">Libya</option><option value="Senegal">Senegal</option><option value="Ivory Coast">Ivory Coast</option><option value="Cameroon">Cameroon</option><option value="DR Congo">DR Congo</option><option value="Angola">Angola</option><option value="Mozambique">Mozambique</option><option value="Zimbabwe">Zimbabwe</option><option value="Zambia">Zambia</option><option value="Botswana">Botswana</option><option value="Namibia">Namibia</option><option value="Mauritius">Mauritius</option><option value="Madagascar">Madagascar</option><option value="Sudan">Sudan</option><option value="Somalia">Somalia</option><option value="Mali">Mali</option><option value="Burkina Faso">Burkina Faso</option><option value="Niger">Niger</option><option value="Chad">Chad</option><option value="Sierra Leone">Sierra Leone</option><option value="Liberia">Liberia</option><option value="Gabon">Gabon</option><option value="Congo">Congo</option><option value="Togo">Togo</option><option value="Benin">Benin</option><option value="Malawi">Malawi</option><option value="Eritrea">Eritrea</option><option value="Guinea">Guinea</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Djibouti">Djibouti</option><option value="Central African Republic">Central African Republic</option><option value="South Sudan">South Sudan</option><option value="Eswatini">Eswatini</option><option value="Lesotho">Lesotho</option><option value="Comoros">Comoros</option><option value="Cape Verde">Cape Verde</option><option value="Seychelles">Seychelles</option><option value="Gambia">Gambia</option><option value="Guinea-Bissau">Guinea-Bissau</option><option value="Mauritania">Mauritania</option><option value="Sao Tome and Principe">Sao Tome and Principe</option>
</optgroup>
<optgroup label="Europe">
<option value="United Kingdom">United Kingdom</option><option value="Germany">Germany</option><option value="France">France</option><option value="Italy">Italy</option><option value="Spain">Spain</option><option value="Netherlands">Netherlands</option><option value="Belgium">Belgium</option><option value="Switzerland">Switzerland</option><option value="Austria">Austria</option><option value="Sweden">Sweden</option><option value="Norway">Norway</option><option value="Denmark">Denmark</option><option value="Finland">Finland</option><option value="Ireland">Ireland</option><option value="Portugal">Portugal</option><option value="Greece">Greece</option><option value="Poland">Poland</option><option value="Czech Republic">Czech Republic</option><option value="Romania">Romania</option><option value="Hungary">Hungary</option><option value="Turkey">Turkey</option><option value="Ukraine">Ukraine</option><option value="Russia">Russia</option><option value="Serbia">Serbia</option><option value="Croatia">Croatia</option><option value="Bulgaria">Bulgaria</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Lithuania">Lithuania</option><option value="Latvia">Latvia</option><option value="Estonia">Estonia</option><option value="Luxembourg">Luxembourg</option><option value="Malta">Malta</option><option value="Cyprus">Cyprus</option><option value="Iceland">Iceland</option><option value="Albania">Albania</option><option value="North Macedonia">North Macedonia</option><option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option><option value="Montenegro">Montenegro</option><option value="Moldova">Moldova</option><option value="Belarus">Belarus</option><option value="Georgia">Georgia</option><option value="Armenia">Armenia</option><option value="Azerbaijan">Azerbaijan</option><option value="Kosovo">Kosovo</option><option value="Monaco">Monaco</option><option value="Liechtenstein">Liechtenstein</option><option value="Andorra">Andorra</option><option value="San Marino">San Marino</option>
</optgroup>
<optgroup label="Americas">
<option value="United States">United States</option><option value="Canada">Canada</option><option value="Mexico">Mexico</option><option value="Brazil">Brazil</option><option value="Argentina">Argentina</option><option value="Colombia">Colombia</option><option value="Chile">Chile</option><option value="Peru">Peru</option><option value="Venezuela">Venezuela</option><option value="Ecuador">Ecuador</option><option value="Bolivia">Bolivia</option><option value="Paraguay">Paraguay</option><option value="Uruguay">Uruguay</option><option value="Guyana">Guyana</option><option value="Suriname">Suriname</option><option value="Panama">Panama</option><option value="Costa Rica">Costa Rica</option><option value="Guatemala">Guatemala</option><option value="Honduras">Honduras</option><option value="El Salvador">El Salvador</option><option value="Nicaragua">Nicaragua</option><option value="Dominican Republic">Dominican Republic</option><option value="Cuba">Cuba</option><option value="Haiti">Haiti</option><option value="Jamaica">Jamaica</option><option value="Trinidad and Tobago">Trinidad and Tobago</option><option value="Bahamas">Bahamas</option><option value="Barbados">Barbados</option><option value="Belize">Belize</option>
</optgroup>
<optgroup label="Central Asia & Oceania">
<option value="Kazakhstan">Kazakhstan</option><option value="Uzbekistan">Uzbekistan</option><option value="Turkmenistan">Turkmenistan</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Tajikistan">Tajikistan</option><option value="Australia">Australia</option><option value="New Zealand">New Zealand</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Fiji">Fiji</option><option value="Samoa">Samoa</option><option value="Tonga">Tonga</option><option value="Vanuatu">Vanuatu</option><option value="Solomon Islands">Solomon Islands</option>
</optgroup>
</select></div>

<div class="fg"><label class="fl">Project sponsor type</label><select class="fs" id="wizSponsor">
<option value="">— Who is driving this project? —</option>
<optgroup label="Government / Public Sector">
<option value="government">National government ministry or department</option>
<option value="state_gov">State or provincial government</option>
<option value="municipal">Municipal or city government</option>
<option value="royal">Royal family or monarchy office</option>
<option value="military">Military or defence authority</option>
</optgroup>
<optgroup label="Quasi-Government">
<option value="soe">State-owned enterprise (SOE)</option>
<option value="gic">Government investment corporation</option>
<option value="statutory">Statutory body or public authority</option>
<option value="devbank">Development bank or development finance institution</option>
</optgroup>
<optgroup label="Private Sector">
<option value="corporation">Private corporation or conglomerate</option>
<option value="startup">Startup or new company</option>
<option value="family_office">Family office or HNWI</option>
<option value="fund">Investment fund or private equity</option>
<option value="jv">Joint venture (private + government)</option>
<option value="ngo">NGO or non-profit organization</option>
<option value="consortium">Consortium of multiple parties</option>
</optgroup>
</select></div>

<div class="fg"><label class="fl">Does this project have government support?</label>
<div style="font-size:9px;color:var(--muted);margin:-4px 0 8px;line-height:1.6">This affects what instruments banks will accept and whether development banks (ADB, AIIB, IFC) can co-finance. Projects with government backing typically get better terms and faster approvals.</div>
<select class="fs" id="wizSovereign">
<option value="">— Select level of government support —</option>
<option value="sovereign">Full sovereign backing — government guarantee or direct funding commitment</option>
<option value="quasi">Partial support — government land, approvals, tax incentives, or PPP framework</option>
<option value="letter">Letter of support — no financial commitment, but government endorses the project</option>
<option value="private">No government involvement — purely private sector project</option>
</select></div>
<div style="display:flex;gap:8px;margin-top:14px">
<button class="bgh" onclick="wizBack()">← Back</button>
<button class="bg" style="flex:1" onclick="wizNext()">Next →</button>
</div>
</div>

<!-- Step 4: What do you have already? -->
<div class="wiz-step" id="wizStep3" style="display:none">
<div style="font-family:'Inter', sans-serif;font-size:22px;font-weight:600;color:var(--white);margin-bottom:6px">What do you <span style="color:var(--gold)">already have</span>?</div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:14px">Check everything that applies. The more you have, the faster this moves.</div>
<div id="wizChecklist" style="display:flex;flex-direction:column;gap:6px">
</div>
<div style="display:flex;gap:8px;margin-top:14px">
<button class="bgh" onclick="wizBack()">← Back</button>
<button class="bg" style="flex:1" onclick="wizNext()">See My Results →</button>
</div>
</div>

<!-- Step 5: Results / Recommendation -->
<div class="wiz-step" id="wizStep4" style="display:none">
<div style="font-family:'Inter', sans-serif;font-size:22px;font-weight:600;color:var(--white);margin-bottom:6px">Your <span style="color:var(--gold)">funding roadmap</span></div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:14px">Based on what you told us, here's what DEALEX recommends.</div>
<div id="wizResults"></div>

<!-- Account Gate / Save -->
<div id="wizAccountGate" style="background:linear-gradient(135deg,rgba(59,73,223,.12) 0%,rgba(59,73,223,.04) 100%);border:1px solid var(--border-hi);padding:16px;margin-top:14px">
<div style="font-family:'Inter', sans-serif;font-size:18px;font-weight:600;color:var(--white);margin-bottom:6px">Save this deal & get matched</div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:12px">Create a free DEALEX account to save your deal, track its progress, and get matched with verified funders. Your deal stays private until you're ready.</div>
<div class="fg"><label class="fl">Your Full Name</label><input class="fi" id="wizAcctName" placeholder="As on your passport"></div>
<div class="fr">
<div class="fg"><label class="fl">Email</label><input class="fi" id="wizAcctEmail" type="email" placeholder="you@company.com"></div>
<div class="fg"><label class="fl">Phone</label><input class="fi" id="wizAcctPhone" placeholder="+60 12 345 6789"></div>
</div>
<div class="fg"><label class="fl">Your Role in This Deal</label><select class="fs" id="wizAcctRole">
<option value="">— How are you involved? —</option>
<option value="owner">I own this project</option>
<option value="mandate">I'm a mandate / authorized representative</option>
<option value="broker">I'm a broker / introducer putting this together</option>
<option value="advisor">I'm an advisor / consultant</option>
</select></div>

<!-- Broker-specific fields (shown when role=broker) -->
<div id="wizBrokerFields" style="display:none;margin-top:10px;padding:12px;background:rgba(59,73,223,.06);border:1px solid rgba(59,73,223,.2)">
<div style="font-size:9px;color:var(--gold);font-weight:600;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px">Broker attachment</div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:8px">As a broker, you'll be permanently attached to this deal as an introducer. If the deal closes, you'll be notified and your commission is protected under the IMFPA.</div>
<div class="fg"><label class="fl">Company / Brokerage Name</label><input class="fi" id="wizBrokerCompany" placeholder="Your company name"></div>
<div class="fg"><label class="fl">How did you source this deal?</label><select class="fs" id="wizBrokerSource">
<option value="">— Select —</option>
<option value="direct">Direct relationship with project owner</option>
<option value="referral">Referred by another party</option>
<option value="mandate_chain">Part of a mandate chain</option>
<option value="found">Found the opportunity independently</option>
</select></div>
<div style="font-size:8px;color:var(--muted);margin-top:6px;font-style:italic">By attaching to this deal, you agree to DEALEX platform terms. Your identity is verified before any commissions are assigned. You will be notified of deal status changes.</div>
</div>

<!-- Mandate-specific fields -->
<div id="wizMandateFields" style="display:none;margin-top:10px;padding:12px;background:rgba(127,119,221,.06);border:1px solid rgba(127,119,221,.2)">
<div style="font-size:9px;color:var(--purple,#7F77DD);font-weight:600;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px">Mandate authorization</div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:8px">As a mandate, you represent the project owner. You'll need to provide authorization documentation.</div>
<div class="fg"><label class="fl">Who authorized you?</label><input class="fi" id="wizMandateAuth" placeholder="Name of principal / project owner"></div>
</div>

<div style="font-size:9px;color:var(--muted);margin:10px 0 12px">
<label style="display:flex;align-items:center;gap:8px;cursor:pointer">
<input type="checkbox" id="wizTerms" style="width:14px;height:14px;accent-color:var(--gold)">
I agree to DEALEX platform terms and understand my deal data is stored securely.
</label>
</div>

<div style="display:flex;gap:8px">
<button class="bgh" onclick="wizBack()">← Back</button>
<button class="bg" style="flex:1" onclick="wizSaveDeal()">Save Deal & Create Account</button>
</div>
</div>

<!-- Post-save confirmation (hidden initially) -->
<div id="wizSaved" style="display:none;margin-top:14px">
<div style="background:rgba(42,128,80,.1);border:1px solid rgba(42,128,80,.3);padding:16px;text-align:center">
<div style="font-size:32px;margin-bottom:6px">✓</div>
<div style="font-family:'Inter', sans-serif;font-size:20px;font-weight:600;color:var(--green);margin-bottom:4px">Deal Saved</div>
<div style="font-size:10px;color:var(--txt);margin-bottom:8px" id="wizSavedMsg"></div>
<div style="font-size:9px;color:var(--muted)">Deal Reference: <strong style="color:var(--gold)" id="wizDealRefDisplay"></strong></div>
</div>

<!-- Pitch Deck Generator -->
<div style="background:linear-gradient(135deg,rgba(59,73,223,.12) 0%,rgba(59,73,223,.04) 100%);border:1px solid var(--border-hi);padding:16px;margin-top:14px">
<div style="font-family:'Inter', sans-serif;font-size:20px;font-weight:600;color:var(--white);margin-bottom:4px">Generate your <span style="color:var(--gold)">pitch deck</span></div>
<div style="font-size:10px;color:var(--muted2);margin-bottom:14px">Create a professional funding presentation to hand to your funder team. Fill in who's representing this deal.</div>

<div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">Deal representative</div>
<div class="fr">
<div class="fg"><label class="fl">Representative Name</label><input class="fi" id="pitchRepName" placeholder="Full name of deal representative"></div>
<div class="fg"><label class="fl">Title / Position</label><input class="fi" id="pitchRepTitle" placeholder="e.g. Project Director, Managing Partner"></div>
</div>
<div class="fr">
<div class="fg"><label class="fl">Company / Organization</label><input class="fi" id="pitchRepCompany" placeholder="Company or entity name"></div>
<div class="fg"><label class="fl">Email</label><input class="fi" id="pitchRepEmail" placeholder="Contact email"></div>
</div>
<div class="fr">
<div class="fg"><label class="fl">Phone</label><input class="fi" id="pitchRepPhone" placeholder="+60 12 345 6789"></div>
<div class="fg"><label class="fl">Country</label><input class="fi" id="pitchRepCountry" placeholder="Representative's country"></div>
</div>

<div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin:14px 0 8px">Additional details for the deck</div>
<div class="fg"><label class="fl">One-line project tagline</label><input class="fi" id="pitchTagline" placeholder="e.g. The world, connected. / Building tomorrow's infrastructure today."></div>
<div class="fg"><label class="fl">Key selling point (why should a funder care?)</label><textarea class="fi" id="pitchSelling" rows="3" style="resize:vertical;min-height:60px" placeholder="e.g. Sovereign-backed infrastructure with 70M+ annual passengers generating guaranteed revenue streams. Land allocated. Master plan approved."></textarea></div>
<div class="fg"><label class="fl">Target completion date</label><input class="fi" id="pitchTimeline" type="text" placeholder="e.g. 2032, or 48 months from funding"></div>

<div style="display:flex;gap:8px;margin-top:14px">
<button class="bg" style="flex:1;padding:14px" onclick="generateWizardPitchDeck()">📊 Generate Pitch Deck</button>
</div>
<div style="font-size:8px;color:var(--muted);margin-top:8px;text-align:center">Creates a professional .pptx presentation with your project details, funding structure, readiness assessment, and contact information. Opens as a printable document.</div>
</div>

<div style="display:flex;gap:8px;margin-top:12px">
<button class="bg" style="flex:1" onclick="wizStartDeal()">Continue to Deal Flow →</button>
</div>
</div>

</div>

</div>
</div>

<!-- COMMODITY DESK -->
` }} />
  )
}
