
/* ═══════════════════════════════════════════════════════
   GLOBAL STATE
   ═══════════════════════════════════════════════════════ */
var curTab='home',cs=1,D={currency:'',rules:'NONE',confirmation:'WITHOUT',formUndertaking:'STBY'},CI={},curRole='',dealRef='',commMode='standard';
var uploadedDocs2={senderPP:null,receiverPP:null,cis:null,stamp:null,bcl:null};
/* ═══════════════════════════════════════════════════════
   LANDING PAGE — LANGUAGE & ROLE EDUCATION
   ═══════════════════════════════════════════════════════ */
var currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.getElementById('lt-en').classList.toggle('act', lang==='en');
  document.getElementById('lt-zh').classList.toggle('act', lang==='zh');
  var en = document.getElementById('lc-en');
  var zh = document.getElementById('lc-zh');
  if(lang === 'en') {
    en.style.display = 'flex';
    zh.style.display = 'none';
  } else {
    en.style.display = 'none';
    zh.style.display = 'flex';
    document.body.classList.add('zh');
  }
  if(lang === 'en') document.body.classList.remove('zh');
}

function selectRole(role) {
  ['principal','mandate','broker','bank'].forEach(function(r) {
    var c = document.getElementById('rc-' + r);
    var p = document.getElementById('ep-' + r);
    if(c) c.classList.toggle('sel', r === role);
    if(p) p.classList.toggle('act', r === role);
  });
  // Scroll to panel
  var panel = document.getElementById('ep-' + role);
  if(panel) setTimeout(function(){ panel.scrollIntoView({behavior:'smooth', block:'nearest'}); }, 100);
}

function selectRoleZh(role) {
  ['principal','mandate','broker','bank'].forEach(function(r) {
    var c = document.getElementById('rc-zh-' + r);
    var p = document.getElementById('ep-zh-' + r);
    if(c) c.classList.toggle('sel', r === role);
    if(p) p.classList.toggle('act', r === role);
  });
  var panel = document.getElementById('ep-zh-' + role);
  if(panel) setTimeout(function(){ panel.scrollIntoView({behavior:'smooth', block:'nearest'}); }, 100);
}

var currentUploadRole = '';
function genUploadLink(role) {
  currentUploadRole = role;
  var modal = document.getElementById('uploadLinkModal');
  modal.style.display = 'flex';
  document.getElementById('ulm-result').style.display = 'none';
  // Show/hide mandate letter row based on role
  var mandateRow = document.getElementById('ulm-mandate-row');
  if(mandateRow) mandateRow.style.display = (role === 'mandate' || role === 'broker') ? 'flex' : 'none';
  var desc = document.getElementById('ulm-desc');
  if(role === 'principal') desc.textContent = 'Generate a one-time link for your Mandate or Broker to upload their documents to DEALEX. You will be notified when they complete it.';
  else if(role === 'mandate') desc.textContent = 'Generate a link for your Principal to upload their Mandate Letter, passport and company documents directly to DEALEX. Without these, you cannot proceed as Mandate.';
  else desc.textContent = 'Generate a link for your Principal or counterparty to upload required documents to DEALEX. No email attachments, no WhatsApp.';
}

function closeUploadModal() {
  document.getElementById('uploadLinkModal').style.display = 'none';
}

function generateLink() {
  var name = document.getElementById('ulm-name').value.trim();
  var email = document.getElementById('ulm-email').value.trim();
  if(!name){ showT('Enter recipient name'); return; }
  if(!email){ showT('Enter recipient email'); return; }
  var ref = 'DLX-' + Math.random().toString(36).substr(2,8).toUpperCase();
  document.getElementById('ulm-link-text').textContent = 'dealex.io/upload/' + ref;
  document.getElementById('ulm-result').style.display = 'block';
  showT('✓ Secure upload link generated');
}

function copyLink() {
  var link = document.getElementById('ulm-link-text').textContent;
  if(navigator.clipboard) {
    navigator.clipboard.writeText('https://' + link).then(function(){ showT('Link copied to clipboard'); });
  } else {
    showT('Link: ' + link);
  }
}


/* ═══════════════════════════════════════════════════════
   DEAL REFERENCE GENERATOR
   ═══════════════════════════════════════════════════════ */
function genDealRef(){
  var d=new Date();
  var yr=d.getFullYear().toString().slice(2);
  var mo=('0'+(d.getMonth()+1)).slice(-2);
  var dd=('0'+d.getDate()).slice(-2);
  var rand=Math.random().toString(36).substring(2,8).toUpperCase();
  dealRef='DX-'+yr+mo+dd+'-'+rand;
  D.dealRef=dealRef;
  /* Update all deal ref displays */
  document.querySelectorAll('.deal-ref-display').forEach(function(el){el.textContent=dealRef});
  return dealRef;
}

/* ═══════════════════════════════════════════════════════
   ROLE-SPECIFIC CHECKLISTS
   ═══════════════════════════════════════════════════════ */
var RoleCL={
  sender:[{l:'Signed DOA — both parties',c:1},{l:'Applicant passport (certified copy)',c:1},{l:'CIS — Corporate Information Statement'},{l:'Certificate of Incorporation'},{l:'Board Resolution authorizing SBLC issuance'},{l:'IMFPA signed — all mandates listed'},{l:'Bank Comfort Letter (BCL) from issuing bank'},{l:'KYC / AML clearance from issuing bank',c:1},{l:'Proof of Funds / Asset Verification'},{l:'MT799 pre-advice sent by issuing bank'},{l:'MT760 transmitted via SWIFT',c:1}],
  receiver:[{l:'Signed DOA — both parties',c:1},{l:'Beneficiary passport (certified copy)',c:1},{l:'CIS — Corporate Information Statement'},{l:'Certificate of Incorporation'},{l:'BCL — Bank Comfort Letter from advising bank',c:1},{l:'MT799 pre-advice received and verified'},{l:'MT760 received and authenticated via SWIFT',c:1},{l:'SWIFT confirmation printout obtained'},{l:'Beneficiary bank officer verbal confirmation'}],
  mandate:[{l:'Authorization letter from appointing party (Sender or Receiver)',c:1},{l:'Confirm which side appointed you',c:1},{l:'If both sides: proof one side is actual account holder'},{l:'IMFPA — fully executed with all parties on your side',c:1},{l:'Commission % agreed and documented in IMFPA'},{l:'Paymaster / escrow agent confirmed',c:1},{l:'VERIFY: Sender has signed DOA',c:1},{l:'VERIFY: Sender passport (certified) on file'},{l:'VERIFY: Sender CIS & Certificate of Incorporation'},{l:'VERIFY: Sender bank coordinates & BCL on file'},{l:'VERIFY: Sender KYC / AML clearance done',c:1},{l:'VERIFY: Receiver has signed DOA',c:1},{l:'VERIFY: Receiver passport (certified) on file'},{l:'VERIFY: Receiver CIS & Certificate of Incorporation'},{l:'VERIFY: Receiver bank coordinates & BCL on file'},{l:'VERIFY: All brokers on correct side (conflict check)',c:1},{l:'All paperwork complete — ready to submit to bank',c:1},{l:'Fee Protection Agreement in place'},{l:'Non-circumvention clause signed by all parties'}],
  broker:[{l:'Signed DOA — both parties',c:1},{l:'Your passport (certified copy)',c:1},{l:'Identify the Mandate who engaged you',c:1},{l:'Confirm Mandate\'s side (Sender or Receiver)',c:1},{l:'Your commission must be on the OPPOSITE side\'s IMFPA',c:1},{l:'Verify you are NOT on the same side as the Mandate you brought the deal to',c:1},{l:'Broker split % agreed with opposite side\'s Mandate'},{l:'IMFPA of the opposite side — your name listed',c:1},{l:'Paymaster / escrow confirmed'},{l:'Non-circumvention clause in place'},{l:'Fee Protection Agreement signed'}]
};

/* ═══════════════════════════════════════════════════════
   ROLE SELECTION
   ═══════════════════════════════════════════════════════ */
function selRole(role){
  curRole=role;D.role=role;
  ['role-','fi-role-'].forEach(function(prefix){
    ['sender','receiver','mandate','broker'].forEach(function(r){
      var el=document.getElementById(prefix+r);
      if(el){el.style.borderColor=r===role?'var(--gold)':'';el.style.background=r===role?'var(--gold-a15)':''}});});
  var labels={sender:'Sender Checklist',receiver:'Receiver Checklist',mandate:'Mandate Checklist',broker:'Broker Checklist'};
  ['roleChecklist','fiRoleChecklist'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display='block'});
  ['roleCLTitle','fiRoleCLTitle'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=labels[role]||'Checklist'});
  /* Reset role checklist items */
  Object.keys(CI).forEach(function(k){if(k.indexOf('rl-')===0)delete CI[k]});
  buildRoleCL();
  /* Commission visibility */
  var showComm=(role==='mandate'||role==='broker');
  ['commissionSection','fiCommissionSection'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display=showComm?'block':'none'});
  /* Show correct commission sub-section */
  ['fiMandateComm'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display=(role==='mandate')?'block':'none'});
  ['brokerOnMandate','fiBrokerOnMandate'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display=role==='broker'?'block':'none'});
  /* Mandate authorization panel */
  var mandateAuth=document.getElementById('mandateAuthPanel');
  if(mandateAuth)mandateAuth.style.display=(role==='mandate')?'block':'none';
  /* Role info boxes */
  var infoMap={
    sender:'<div class="note-box"><div class="wi">📤</div><div class="wt"><strong>Sender (Party A)</strong> — You are the account holder or applicant on the issuing bank side. Your bank will issue the MT760 via SWIFT. You are responsible for the instrument and all charges from the issuing bank.</div></div>',
    receiver:'<div class="note-box"><div class="wi">📥</div><div class="wt"><strong>Receiver (Party B)</strong> — You are the beneficiary. Your advising bank receives and authenticates the MT760 via SWIFT. You must provide your bank coordinates and BCL (Bank Comfort Letter) for verification.</div></div>',
    mandate:'<div class="note-box"><div class="wi">📋</div><div class="wt"><strong>Mandate</strong> — You are legally authorized by either the <strong>Sender</strong> or <strong>Receiver</strong> (or rarely both if one side is the actual account holder). You don\'t need to upload your own credentials — just the authorization letter from your appointing party. Your job is to <strong>make sure both sides have all their paperwork complete</strong> before anything gets submitted to the bank. You hold the IMFPA and earn a commission percentage.</div></div>',
    broker:'<div class="warning-box"><div class="wi">🤝</div><div class="wt"><strong>Broker</strong> — You connect parties to a deal. <strong>Conflict of interest rule:</strong> If a Mandate appoints you and you bring the other side, you <strong>cannot</strong> be on the same side\'s commission as that Mandate. You must be listed on the <strong>opposite side\'s IMFPA</strong>. This protects all parties from fee manipulation.</div></div>'
  };
  ['fiRoleInfo'].forEach(function(id){var el=document.getElementById(id);if(el){el.style.display='block';el.innerHTML=infoMap[role]||''}});
  showT('Role: '+(role.charAt(0).toUpperCase()+role.slice(1))+' selected');
}

/* ═══════════════════════════════════════════════════════
   APPOINTMENT & BROKER SIDE HELPERS (removed - unused)
   ═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   ROLE CHECKLIST BUILDER
   ═══════════════════════════════════════════════════════ */
function buildRoleCL(){
  if(!curRole)return;
  var items=RoleCL[curRole]||[];
  var tot=items.length,dn=0;
  items.forEach(function(_,i){if(CI['rl-'+i])dn++});
  var p=tot?Math.round((dn/tot)*100):0;
  ['roleCLPill','fiRoleCLPill'].forEach(function(id){var el=document.getElementById(id);if(el){el.textContent=p+'%';el.className='pill '+(p>=90?'pg':'po')}});
  var h='';
  items.forEach(function(it,i){
    var k='rl-'+i,done=CI[k];
    h+='<div class="cr'+(done?' dn':'')+'" onclick="tRC('+i+')"><div class="cx">'+(done?'✓':'')+'</div><div style="flex:1"><div style="font-size:10px;font-weight:'+(done?'400':'500')+';color:'+(done?'var(--muted2)':'var(--white)')+';text-decoration:'+(done?'line-through':'none')+'">'+it.l+'</div>'+(it.c&&!done?'<div style="font-size:7px;color:var(--red);font-weight:700;margin-top:2px;letter-spacing:.12em;text-transform:uppercase">REQUIRED</div>':'')+'</div><div style="font-size:8px;color:'+(done?'var(--green)':'var(--muted)')+';font-weight:700">'+(done?'Done':'Pending')+'</div></div>';
  });
  ['roleCLBody','fiRoleCLBody'].forEach(function(id){var el=document.getElementById(id);if(el)el.innerHTML=h});
}
function tRC(i){CI['rl-'+i]=!CI['rl-'+i];buildRoleCL()}

/* ═══════════════════════════════════════════════════════
   AUTH FLOW
   ═══════════════════════════════════════════════════════ */
function showAuth(t){document.getElementById('authSheet').classList.add('open');swAt(t||'login')}
function closeAuth(){document.getElementById('authSheet').classList.remove('open')}
function swAt(t){document.querySelectorAll('.at').forEach(function(e){e.classList.remove('active')});document.querySelectorAll('.ap').forEach(function(e){e.classList.remove('active')});document.getElementById('at'+t.charAt(0).toUpperCase()+t.slice(1)).classList.add('active');document.getElementById('ap'+t.charAt(0).toUpperCase()+t.slice(1)).classList.add('active')}
function doLogin(){var e=document.getElementById('loginEmail').value.trim(),p=document.getElementById('loginPass').value;if(!e){showT('Enter email');return}if(!p){showT('Enter password');return}closeAuth();enterApp()}
function doReg(){var e=document.getElementById('regEmail').value,p=document.getElementById('regPass').value,t=document.getElementById('tc').checked;if(!e||!p){showT('Fill in email and password');return}if(p.length<8){showT('Min 8 characters');return}if(!t){showT('Agree to Terms');return}closeAuth();enterApp()}
function doSocial(){closeAuth();enterApp()}

/* ═══════════════════════════════════════════════════════
   APP ENTRY & NAVIGATION
   ═══════════════════════════════════════════════════════ */
function enterApp(){document.getElementById('landing').classList.add('hidden');document.getElementById('app').style.display='block';navTo('home')}
var tabLabels={home:'HOME',fi:'FINANCIAL INSTRUMENTS',mt760:'MT760 WORKFLOW',templates:'TEMPLATES',experts:'EXPERTS',desk:'DEALEX DESK',wizard:'DEALEX WIZARD',commodity:'COMMODITY DESK'};
function navTo(tab){curTab=tab;document.querySelectorAll('.tab-page').forEach(function(p){p.classList.remove('act')});var pg=document.getElementById('pg-'+tab);if(pg)pg.classList.add('act');document.querySelectorAll('.bn').forEach(function(b){b.classList.remove('act');b.setAttribute('aria-selected','false')});var nm={home:'home',fi:'fi',mt760:'fi',templates:'templates',experts:'experts',desk:'desk',wizard:'home',commodity:'home'};var nb=document.getElementById('nav-'+(nm[tab]||tab));if(nb){nb.classList.add('act');nb.setAttribute('aria-selected','true')}document.getElementById('topLabel').textContent=tabLabels[tab]||'';document.getElementById('bkb').style.display=tab!=='home'?'flex':'none';window.scrollTo({top:0,behavior:'instant'})}
function goBackNav(){var routes={mt760:'fi',fi:'home',desk:'home',templates:'home',experts:'home',wizard:'home',commodity:'home'};navTo(routes[curTab]||'home')}
function openMT760(){if(!dealRef)genDealRef();navTo('mt760');cs=1;rDots();bFlds();uProg();
  for(var i=1;i<=5;i++){var e=document.getElementById('s'+i);if(e)e.classList.toggle('act',i===1)}
  /* Sync Step 1 fields from D (for DOA-extracted data) */
  var syncMap={'df-sblcRef':'sblcRef','df-currency':'currency','df-faceValue':'faceValue','df-issueDate':'issueDate','df-expiryDate':'expiryDate','df-txCode':'txCode','df-jurisdiction':'jurisdiction'};
  for(var elId in syncMap){var el=document.getElementById(elId);if(el&&D[syncMap[elId]]){el.value=D[syncMap[elId]]}}
}
function goS(n){cs=n;for(var i=1;i<=5;i++){var e=document.getElementById('s'+i);if(e)e.classList.toggle('act',i===n)}rDots();window.scrollTo(0,0);if(n===4){bSwift();bChecklist()}if(n===5)bReview();uProg()}
function rDots(){var e=document.getElementById('dots');if(!e)return;var h='';for(var i=1;i<=5;i++){var c=i<cs?'done':i===cs?'active':'idle';h+='<div class="sdo '+c+'">'+(i<cs?'✓':i)+'</div>';if(i<5)h+='<div class="sl'+(i<cs?' done':'')+'"></div>'}e.innerHTML=h}

/* ═══════════════════════════════════════════════════════
   FIELD DEFINITIONS & FORM BUILDER
   ═══════════════════════════════════════════════════════ */
var FD={issA:[{i:'appCompany',l:'Applicant Company',r:1},{i:'appReg',l:'Reg No.'},{i:'appCountry',l:'Country'},{i:'appAddr',l:'Address',w:1},{i:'appRep',l:'Represented By',r:1},{i:'appTitle',l:'Title'},{i:'appPassport',l:'Passport'},{i:'appEmail',l:'Email',w:1}],issB:[{i:'issBankName',l:'Issuing Bank',r:1},{i:'issBankAddr',l:'Bank Address',w:1},{i:'issSwift',l:'SWIFT/BIC (:52A:)',r:1},{i:'issSort',l:'Sort Code'},{i:'issIban',l:'IBAN',r:1},{i:'issAcctNo',l:'Account No.'},{i:'issAcctName',l:'Account Name',w:1},{i:'issOfficer',l:'Bank Officer'},{i:'issOfficerEmail',l:'Officer Email'}],rcvA:[{i:'benCompany',l:'Beneficiary Company',r:1},{i:'benReg',l:'Reg No.'},{i:'benCountry',l:'Country'},{i:'benAddr',l:'Address',w:1},{i:'benRep',l:'Represented By',r:1},{i:'benTitle',l:'Title'},{i:'benPassport',l:'Passport'},{i:'benEmail',l:'Email',w:1}],rcvB:[{i:'rcvBankName',l:'Advising Bank (:56A:)',r:1},{i:'rcvBankAddr',l:'Bank Address',w:1},{i:'rcvSwift',l:'SWIFT/BIC',r:1},{i:'rcvIban',l:'IBAN',r:1},{i:'rcvAcctNo',l:'Account No.'},{i:'rcvAcctName',l:'Account Name',w:1},{i:'rcvOfficer',l:'Bank Officer'},{i:'rcvOfficerEmail',l:'Officer Email'}]};
var RQ=['sblcRef','currency','faceValue','issueDate','txCode','appCompany','appRep','issBankName','issSwift','issIban','benCompany','benRep','rcvBankName','rcvSwift','rcvIban'];
var CL={s:[{l:'DOA/SBLC signed',c:1},{l:'Applicant passport'},{l:'CIS'},{l:'Certificate of Incorporation'},{l:'Board Resolution'},{l:'KYC/AML clearance',c:1},{l:'MT799 pre-advice sent'},{l:'MT760 transmitted',c:1}],r:[{l:'DOA/SBLC signed',c:1},{l:'Beneficiary passport'},{l:'CIS'},{l:'BCL from advising bank',c:1},{l:'MT799 verified'},{l:'MT760 authenticated',c:1}],b:[{l:'IMFPA signed'},{l:'Paymaster confirmed'},{l:'No OFAC/sanctions hits'},{l:'Originals exchanged'}]};
function bFlds(){bSec('fISS',[{t:'Applicant (Party A)',f:FD.issA},{t:'Issuing Bank (:52A:)',f:FD.issB}]);bSec('fRCV',[{t:'Beneficiary (Party B)',f:FD.rcvA},{t:'Advising Bank (:56A:)',f:FD.rcvB}])}
function bSec(cid,secs){var c=document.getElementById(cid),h='';secs.forEach(function(s){h+='<div class="st">'+s.t+'</div>';var i=0;while(i<s.f.length){var f=s.f[i],nx=s.f[i+1];if(f.w||!nx||nx.w){h+=bI(f);i++}else{h+='<div class="fr">'+bI(f)+bI(nx)+'</div>';i+=2}}});c.innerHTML=h}
function bI(f){var v=D[f.i]||'';return'<div class="fg"><label class="fl">'+f.l+(f.r?'<span class="rq">*</span>':'')+'</label><input class="fi" id="df-'+f.i+'" value="'+esc(v)+'" oninput="fc(\''+f.i+'\',this.value)"></div>'}
function esc(s){var d=document.createElement('div');d.appendChild(document.createTextNode(s||''));return d.innerHTML}
function fc(id,v){D[id]=v;uProg()}
function uProg(){var n=0;RQ.forEach(function(id){if(D[id]&&String(D[id]).trim().length>1)n++});var p=Math.round((n/RQ.length)*100),c=p>=90?'var(--green)':'var(--gold)';['pb2','pb3'].forEach(function(b){var e=document.getElementById(b);if(e){e.style.width=p+'%';e.style.background=c;e.setAttribute('aria-valuenow',p)}});['pd2','pd3'].forEach(function(b){var e=document.getElementById(b);if(e){e.textContent=p+'%';e.style.color=p>=50?'var(--gold)':'var(--muted2)'}})}

/* ═══════════════════════════════════════════════════════
   SWIFT MESSAGE & CHECKLIST
   ═══════════════════════════════════════════════════════ */
function swTab(t){document.getElementById('tabSw').classList.toggle('act',t==='sw');document.getElementById('tabCl').classList.toggle('act',t==='cl');document.getElementById('pSw').style.display=t==='sw'?'block':'none';document.getElementById('pCl').style.display=t==='cl'?'block':'none';if(t==='cl')bChecklist()}

/* ═══════════════════════════════════════════════════════
   SWIFT MT760 MESSAGE BUILDER
   ═══════════════════════════════════════════════════════ */
function bSwift(){var d=D,v=function(x){return x||'—'},dt=function(s){if(!s)return'YYMMDD';var p=s.split('-');return p.length===3?(p[0].slice(2)+p[1]+p[2]):'YYMMDD'};var f22d=d.formUndertaking||'STBY',f40c=d.rules||'NONE',f23b=d.expiryDate?'FIXD':'OPEN';var h='<div class="swift-hdr">SWIFT MT 760 — Issue of Demand Guarantee / Standby LC</div>';h+='<span class="lbl" style="color:var(--gold);font-weight:700;font-size:8px;letter-spacing:.2em">── SEQ A ── GENERAL INFO</span>\n\n';h+='<span class="tag">:15A:</span> <span class="lbl">New Sequence</span>\n<span class="tag">:27:</span>  <span class="lbl">Sequence of Total</span>  <span class="val">1/1</span>\n<span class="tag">:22A:</span> <span class="lbl">Purpose of Message</span> <span class="val">ISSU</span>\n<span class="tag">:72Z:</span> <span class="lbl">Sender to Receiver</span> <span class="val">'+v(d.txCode)+'</span>\n\n';h+='<span class="lbl" style="color:var(--gold);font-weight:700;font-size:8px;letter-spacing:.2em">── SEQ B ── UNDERTAKING DETAILS</span>\n\n';h+='<span class="tag">:15B:</span> <span class="lbl">New Sequence</span>\n<span class="tag">:20:</span>  <span class="lbl">Undertaking Number</span> <span class="val">'+v(d.sblcRef)+'</span>\n<span class="tag">:30:</span>  <span class="lbl">Date of Issue</span>      <span class="val">'+dt(d.issueDate)+'</span>\n<span class="tag">:22D:</span> <span class="lbl">Form of Undertaking</span><span class="val">'+f22d+'</span>\n<span class="tag">:40C:</span> <span class="lbl">Applicable Rules</span>   <span class="val">'+f40c+'</span>\n<span class="tag">:23B:</span> <span class="lbl">Expiry Type</span>        <span class="val">'+f23b+'</span>\n';if(d.expiryDate)h+='<span class="tag">:31E:</span> <span class="lbl">Date of Expiry</span>     <span class="val">'+dt(d.expiryDate)+'</span>\n';h+='<span class="tag">:50:</span>  <span class="lbl">Applicant</span>          <span class="val">'+v(d.appCompany)+'</span>\n<span class="tag">:52A:</span> <span class="lbl">Issuer</span>             <span class="val">'+v(d.issSwift)+'</span>\n<span class="tag">:59:</span>  <span class="lbl">Beneficiary</span>        <span class="val">'+v(d.benCompany)+'</span>\n';if(d.rcvSwift)h+='<span class="tag">:56A:</span> <span class="lbl">Advising Bank</span>      <span class="val">'+d.rcvSwift+'</span>\n';h+='<span class="tag">:32B:</span> <span class="lbl">Amount</span>             <span class="val">'+v(d.currency)+v(d.faceValue).replace(/[,\\s]/g,'')+(d.faceValue&&d.faceValue.indexOf(',')===-1?',':'')+'</span>\n<span class="tag">:77U:</span> <span class="lbl">T&C</span>                <span class="val">IRREVOCABLE '+((f22d==='STBY')?'SBLC':'GUARANTEE')+' NO.'+v(d.sblcRef)+'</span>\n';if(d.confirmation&&f22d==='STBY')h+='<span class="tag">:49:</span>  <span class="lbl">Confirmation</span>       <span class="val">'+(d.confirmation||'WITHOUT')+'</span>\n';if(d.jurisdiction)h+='<span class="tag">:44J:</span> <span class="lbl">Governing Law</span>      <span class="val">'+d.jurisdiction+'</span>\n';h+='<span class="tag">:24E:</span> <span class="lbl">Delivery</span>           <span class="val">MESS</span>\n<span class="tag">:24G:</span> <span class="lbl">Delivery To</span>        <span class="val">BENE</span>\n\n<span class="lbl" style="color:var(--muted)">── End of Message ──</span>';document.getElementById('swiftMsg').innerHTML=h}

/* ═══════════════════════════════════════════════════════
   MT760 CHECKLIST BUILDER
   ═══════════════════════════════════════════════════════ */
function bChecklist(){var tot=0,dn=0;['s','r','b'].forEach(function(k){CL[k].forEach(function(_,i){tot++;if(CI[k+'-'+i])dn++})});var p=tot?Math.round((dn/tot)*100):0;var h='<div style="display:flex;justify-content:space-between;margin-bottom:12px"><div style="font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:600">MT760 Checklist</div><div style="font-family:\'JetBrains Mono\',sans-serif;font-size:24px;color:'+(dn===tot?'var(--green)':'var(--gold)')+'">'+p+'%</div></div>';h+='<div class="pb" style="margin-bottom:12px"><div class="pf" style="width:'+p+'%;background:'+(dn===tot?'var(--green)':'var(--gold)')+'"></div></div>';[{k:'s',t:'Issuing Side'},{k:'r',t:'Receiving Side'},{k:'b',t:'Both Parties'}].forEach(function(sec){h+='<div style="font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:700;margin:14px 0 6px;padding-bottom:4px;border-bottom:1px solid var(--border)">'+sec.t+'</div>';CL[sec.k].forEach(function(it,i){var k=sec.k+'-'+i,done=CI[k];h+='<div class="cr'+(done?' dn':'')+'" onclick="tC(\''+k+'\')"><div class="cx">'+(done?'✓':'')+'</div><div style="flex:1"><div style="font-size:10px;font-weight:'+(done?'400':'500')+';color:'+(done?'var(--muted2)':'var(--white)')+';text-decoration:'+(done?'line-through':'none')+'">'+it.l+'</div>'+(it.c&&!done?'<div style="font-size:7px;color:var(--red);font-weight:700;margin-top:2px;letter-spacing:.12em;text-transform:uppercase">CRITICAL</div>':'')+'</div><div style="font-size:8px;color:'+(done?'var(--green)':'var(--muted)')+';font-weight:700">'+(done?'Done':'Pending')+'</div></div>'})});document.getElementById('pCl').innerHTML=h}
function tC(k){CI[k]=!CI[k];bChecklist()}

/* ═══════════════════════════════════════════════════════
   MT760 REVIEW PAGE
   ═══════════════════════════════════════════════════════ */
function bReview(){var d=D;document.getElementById('pRef').textContent=(d.sblcRef||'DRAFT')+' · MT760';document.getElementById('rvIB').textContent=d.issBankName||'—';document.getElementById('rvIS').textContent=d.issSwift||'—';document.getElementById('rvRB').textContent=d.rcvBankName||'—';document.getElementById('rvRS').textContent=d.rcvSwift||'—';var n=0;RQ.forEach(function(id){if(D[id]&&String(D[id]).trim().length>1)n++});var p=Math.round((n/RQ.length)*100);var pl=document.getElementById('rvPl');pl.textContent=p+'%';pl.className='pill '+(p>=90?'pg':'po');var rows=[['Undertaking',d.sblcRef],['TX Code',d.txCode],['Currency',d.currency],['Face Value',d.faceValue],['Issue Date',d.issueDate],['Expiry',d.expiryDate],['Form (:22D:)',d.formUndertaking],['Rules (:40C:)',d.rules],['Applicant',d.appCompany],['Issuer BIC',d.issSwift],['Beneficiary',d.benCompany],['Advising BIC',d.rcvSwift]],h='';rows.forEach(function(r){if(r[1])h+='<div class="info-row"><span class="lk">'+r[0]+'</span><span class="vk">'+r[1]+'</span></div>'});document.getElementById('rvSum').innerHTML=h}

/* ═══════════════════════════════════════════════════════
   MT760 PRINT
   ═══════════════════════════════════════════════════════ */
function printMT760(){var d=D,v=function(x){return x||'—'};var w=openDocWindow();w.document.write('<!DOCTYPE html><html><head><title>MT760</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font:10px/1.6 sans-serif;color:#111;padding:40px 50px}.hdr{text-align:center;border-bottom:2px solid #3B49DF;padding-bottom:16px;margin-bottom:20px}.hdr h1{font-size:22px}.sec{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:#3B49DF;font-weight:700;border-bottom:1px solid #eee;padding:4px 0;margin:16px 0 8px}table{width:100%;border-collapse:collapse;margin-bottom:10px}td{padding:4px 8px;border:1px solid #e5e5e5;font-size:10px}td:first-child{font-weight:600;width:35%;color:#555;background:#fafaf6}.ft{margin-top:28px;text-align:center;font-size:7px;color:#999;border-top:1px solid #eee;padding-top:8px}</style></head><body><div class="hdr"><h1>MT760 — STANDBY LETTER OF CREDIT</h1><p style="font-size:9px;color:#888">SWIFT · Irrevocable · Bank-to-Bank</p><p style="color:#3B49DF;margin-top:4px;font-size:10px">'+v(d.sblcRef)+'</p></div>');function tb(r){var h='<table>';r.forEach(function(x){h+='<tr><td>'+x[0]+'</td><td>'+v(x[1])+'</td></tr>'});return h+'</table>'}w.document.write('<div class="sec">Instrument</div>'+tb([['Undertaking (:20:)',d.sblcRef],['Issue (:30:)',d.issueDate],['Form (:22D:)',d.formUndertaking],['Rules (:40C:)',d.rules],['Expiry (:31E:)',d.expiryDate],['Amount (:32B:)',(d.currency||'')+' '+(d.faceValue||'')]]));w.document.write('<div class="sec">Applicant (:50:)</div>'+tb([['Company',d.appCompany],['Rep',d.appRep]]));w.document.write('<div class="sec">Issuer (:52A:)</div>'+tb([['Bank',d.issBankName],['BIC',d.issSwift],['IBAN',d.issIban],['Account No.',d.issAcctNo]]));w.document.write('<div class="sec">Beneficiary (:59:)</div>'+tb([['Company',d.benCompany],['Rep',d.benRep]]));w.document.write('<div class="sec">Advising (:56A:)</div>'+tb([['Bank',d.rcvBankName],['BIC',d.rcvSwift],['IBAN',d.rcvIban],['Account No.',d.rcvAcctNo]]));w.document.write('<div class="ft">DEALEX · '+new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})+'</div></body></html>');w.document.close();setTimeout(function(){w.print()},500)}

/* ═══════════════════════════════════════════════════════
   GENERATE DOA DOCUMENT
   ═══════════════════════════════════════════════════════ */
function generateDOA(){
  var d=D;
  var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  var ref=dealRef||'DX-DRAFT';
  var v=function(x){return x||'_____________________'};
  /* Use saved signature and initials */
  var sigData=savedSignature||'';
  var initData=savedInitials||'';
  var instType=detectInstrument(JSON.stringify(d));
  var w=openDocWindow();
  if(!w){showT('Pop-up blocked — please allow pop-ups for this site');return}
  w.document.write('<!DOCTYPE html><html><head><title>DEALEX DOA — '+ref+'</title>');
  w.document.write('<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;font-size:10.5px;color:#111;background:#fff;padding:0}.page{max-width:800px;margin:0 auto;padding:40px 50px}.hdr{text-align:center;border-bottom:3px solid #3B49DF;padding-bottom:20px;margin-bottom:24px}.hdr .logo{font-size:28px;font-weight:800;letter-spacing:.3em;font-family:sans-serif;margin-bottom:4px}.hdr .logo span{color:#3B49DF}.hdr .subtitle{font-size:14px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#333;font-family:sans-serif}.hdr .ref{font-family:monospace;font-size:12px;color:#3B49DF;font-weight:700;margin-top:6px}.hdr .date{font-size:9px;color:#888;margin-top:4px}.sec{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#3B49DF;font-weight:700;border-bottom:1px solid #ddd;padding:6px 0;margin:22px 0 10px;font-family:sans-serif}.legal{font-size:10px;line-height:1.85;color:#333;margin-bottom:12px;text-align:justify}.legal strong{color:#111}table{width:100%;border-collapse:collapse;margin-bottom:14px}td,th{padding:6px 10px;border:1px solid #ddd;font-size:10px;text-align:left}th{background:#fafaf6;font-weight:700;color:#555;font-size:8px;letter-spacing:.1em;text-transform:uppercase;font-family:sans-serif}td:first-child{font-weight:600;width:38%;color:#555;background:#fdfcfa}.sig-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:20px 0}.sig-box{border:1px solid #ddd;padding:16px}.sig-box .label{font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:10px;font-family:sans-serif}.sig-line{border-bottom:2px solid #1A3D7C;height:50px;margin-bottom:6px}.sig-field{font-size:9px;color:#666;margin-bottom:6px}.sig-field span{display:inline-block;border-bottom:1px dotted #aaa;min-width:180px;margin-left:4px;color:#111}.footer{text-align:center;border-top:2px solid #3B49DF;padding-top:12px;margin-top:30px;font-size:7.5px;color:#999;font-family:sans-serif}.no-print{margin:20px auto;text-align:center}.no-print button{padding:12px 30px;background:#3B49DF;color:#000;font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;border:none;cursor:pointer;margin:0 6px;font-family:sans-serif}.no-print button.sec-btn{background:transparent;color:#555;border:1px solid #ddd}.sig-img{max-height:50px;max-width:200px}@media print{.no-print{display:none}.page{padding:20px 30px}}</style></head><body>');
  w.document.write('<div class="no-print"><button onclick="window.print()">🖨️ Print DOA</button><button class="sec-btn" onclick="window.close()">✕ Close</button></div>');
  w.document.write('<div class="page">');
  /* Header */
  w.document.write('<div class="hdr"><div class="logo">DEAL<span>EX</span></div><div class="subtitle">Deed of Assignment</div><div class="ref">'+ref+'</div><div class="date">Date: '+today+'</div></div>');
  /* Preamble */
  w.document.write('<div class="sec">1. Preamble</div>');
  w.document.write('<div class="legal">This <strong>Deed of Assignment</strong> ("DOA") is entered into as of <strong>'+today+'</strong> by and between the parties identified below, in connection with the financial instrument described herein. This agreement is governed by the International Chamber of Commerce (ICC) and applicable international trade and banking law.</div>');
  w.document.write('<div class="legal">DEALEX Reference: <strong>'+ref+'</strong></div>');
  /* Party A */
  w.document.write('<div class="sec">2. Party A — Sender / Provider / Applicant</div>');
  w.document.write('<table><tr><td>Full Legal Name</td><td>'+v(d.appCompany)+'</td></tr><tr><td>Represented By</td><td>'+v(d.appRep)+'</td></tr><tr><td>Title / Position</td><td>'+v(d.appTitle)+'</td></tr><tr><td>Passport Number</td><td>'+v(d.appPassport)+'</td></tr><tr><td>Company Registration</td><td>'+v(d.appReg)+'</td></tr><tr><td>Country</td><td>'+v(d.appCountry)+'</td></tr><tr><td>Address</td><td>'+v(d.appAddr)+'</td></tr><tr><td>Email</td><td>'+v(d.appEmail)+'</td></tr></table>');
  /* Party A Bank */
  w.document.write('<div class="sec">3. Party A — Issuing Bank</div>');
  w.document.write('<table><tr><td>Bank Name</td><td>'+v(d.issBankName)+'</td></tr><tr><td>SWIFT / BIC Code</td><td>'+v(d.issSwift)+'</td></tr><tr><td>IBAN</td><td>'+v(d.issIban)+'</td></tr><tr><td>Account No.</td><td>'+v(d.issAcctNo)+'</td></tr><tr><td>Account Name</td><td>'+v(d.issAcctName)+'</td></tr><tr><td>Bank Address</td><td>'+v(d.issBankAddr)+'</td></tr><tr><td>Bank Officer</td><td>'+v(d.issOfficer)+'</td></tr><tr><td>Officer Email</td><td>'+v(d.issOfficerEmail)+'</td></tr></table>');
  /* Party B */
  w.document.write('<div class="sec">4. Party B — Receiver / Beneficiary / Buyer</div>');
  w.document.write('<table><tr><td>Full Legal Name</td><td>'+v(d.benCompany)+'</td></tr><tr><td>Represented By</td><td>'+v(d.benRep)+'</td></tr><tr><td>Title / Position</td><td>'+v(d.benTitle)+'</td></tr><tr><td>Passport Number</td><td>'+v(d.benPassport)+'</td></tr><tr><td>Company Registration</td><td>'+v(d.benReg)+'</td></tr><tr><td>Country</td><td>'+v(d.benCountry)+'</td></tr><tr><td>Address</td><td>'+v(d.benAddr)+'</td></tr><tr><td>Email</td><td>'+v(d.benEmail)+'</td></tr></table>');
  /* Party B Bank */
  w.document.write('<div class="sec">5. Party B — Advising Bank</div>');
  w.document.write('<table><tr><td>Bank Name</td><td>'+v(d.rcvBankName)+'</td></tr><tr><td>SWIFT / BIC Code</td><td>'+v(d.rcvSwift)+'</td></tr><tr><td>IBAN</td><td>'+v(d.rcvIban)+'</td></tr><tr><td>Account No.</td><td>'+v(d.rcvAcctNo)+'</td></tr><tr><td>Account Name</td><td>'+v(d.rcvAcctName)+'</td></tr><tr><td>Bank Address</td><td>'+v(d.rcvBankAddr)+'</td></tr><tr><td>Bank Officer</td><td>'+v(d.rcvOfficer)+'</td></tr><tr><td>Officer Email</td><td>'+v(d.rcvOfficerEmail)+'</td></tr></table>');
  /* Instrument Details */
  w.document.write('<div class="sec">6. Details of Transaction / Instrument</div>');
  w.document.write('<table><tr><td>Instrument Type</td><td>'+(instType||'SBLC / MT760')+'</td></tr><tr><td>Transaction Reference</td><td>'+v(d.txCode||d.sblcRef)+'</td></tr><tr><td>Currency</td><td>'+v(d.currency)+'</td></tr><tr><td>Face Value</td><td>'+v(d.faceValue)+'</td></tr><tr><td>Date of Issue</td><td>'+v(d.issueDate)+'</td></tr><tr><td>Date of Expiry</td><td>'+v(d.expiryDate)+'</td></tr><tr><td>Jurisdiction / Governing Law</td><td>'+v(d.jurisdiction)+'</td></tr></table>');
  /* Mandates */
  var smName=d.senderMandateName||'';
  var rmName=d.receiverMandateName||'';
  var smPP=d.senderMandatePassport||'';
  var rmPP=d.receiverMandatePassport||'';
  w.document.write('<div class="sec">7. Mandates</div>');
  w.document.write('<table><tr><th colspan="2">Sender-Side Mandate</th></tr><tr><td>Name</td><td>'+v(smName)+'</td></tr><tr><td>Passport Number</td><td>'+v(smPP)+'</td></tr></table>');
  w.document.write('<table><tr><th colspan="2">Receiver-Side Mandate</th></tr><tr><td>Name</td><td>'+v(rmName)+'</td></tr><tr><td>Passport Number</td><td>'+v(rmPP)+'</td></tr></table>');
  /* Terms */
  w.document.write('<div class="sec">8. Terms & Conditions</div>');
  w.document.write('<div class="legal">8.1 Party A hereby irrevocably assigns and transfers to Party B, through the banking channel described above, the financial instrument referenced in Section 6.</div>');
  w.document.write('<div class="legal">8.2 Both parties agree that this Deed of Assignment is <strong>irrevocable and unconditional</strong> once executed by both parties and witnessed.</div>');
  w.document.write('<div class="legal">8.3 The instrument shall be transmitted via authenticated SWIFT message from the Issuing Bank (:52A:) to the Advising Bank (:56A:) in accordance with SWIFT Category 7 standards.</div>');
  w.document.write('<div class="legal">8.4 Each party represents and warrants that: (a) they have full legal authority to enter into this agreement; (b) all information provided is true, accurate, and complete; (c) they are not subject to OFAC, EU, or UN sanctions; (d) the transaction is lawful under all applicable jurisdictions.</div>');
  w.document.write('<div class="legal">8.5 This Deed of Assignment shall be governed by the laws of <strong>'+(d.jurisdiction||'England and Wales')+'</strong>. Any disputes arising shall be submitted to binding arbitration under ICC rules.</div>');
  w.document.write('<div class="legal">8.6 Both parties agree to <strong>Non-Circumvention, Non-Disclosure, and Non-Competition</strong> in respect of all parties, bank coordinates, and transaction details disclosed herein.</div>');
  /* Signatures */
  w.document.write('<div class="sec">9. Signatures — Binding Execution</div>');
  w.document.write('<div style="font-size:9px;color:#1A3D7C;font-weight:700;margin-bottom:8px;font-style:italic">All signatures must be in BLUE INK.</div>');
  w.document.write('<div class="legal">By signing below, each party and mandate confirms they have read this Deed of Assignment in its entirety, agree to all terms, and acknowledge this agreement is irrevocable and legally binding upon execution.</div>');
  w.document.write('<div class="sig-grid">');
  w.document.write('<div class="sig-box"><div class="label">Party A — Sender / Provider</div>');
  if(sigData){w.document.write('<div style="margin-bottom:4px"><img class="sig-img" src="'+sigData+'" alt="Signature"></div>')}
  else{w.document.write('<div class="sig-line"></div>')}
  w.document.write('<div class="sig-field">Name: <span>'+v(d.appRep)+'</span></div><div class="sig-field">Title: <span>'+v(d.appTitle)+'</span></div><div class="sig-field">Company: <span>'+v(d.appCompany)+'</span></div><div class="sig-field">Passport: <span>'+v(d.appPassport)+'</span></div><div class="sig-field">Date: <span></span></div><div class="sig-field">Company Stamp / Seal:</div><div style="border:1px dashed #ccc;height:60px;margin-top:4px"></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Party B — Receiver / Beneficiary</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(d.benRep)+'</span></div><div class="sig-field">Title: <span>'+v(d.benTitle)+'</span></div><div class="sig-field">Company: <span>'+v(d.benCompany)+'</span></div><div class="sig-field">Passport: <span>'+v(d.benPassport)+'</span></div><div class="sig-field">Date: <span></span></div><div class="sig-field">Company Stamp / Seal:</div><div style="border:1px dashed #ccc;height:60px;margin-top:4px"></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Sender-Side Mandate</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(smName)+'</span></div><div class="sig-field">Passport: <span>'+v(smPP)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Receiver-Side Mandate</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(rmName)+'</span></div><div class="sig-field">Passport: <span>'+v(rmPP)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('</div>');
  /* Witnesses */
  w.document.write('<div class="sec">10. Witnesses</div>');
  w.document.write('<div class="sig-grid">');
  w.document.write('<div class="sig-box"><div class="label">Witness 1</div><div class="sig-line"></div><div class="sig-field">Name: <span></span></div><div class="sig-field">Passport / ID: <span></span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Witness 2</div><div class="sig-line"></div><div class="sig-field">Name: <span></span></div><div class="sig-field">Passport / ID: <span></span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('</div>');
  /* Appendix — Passport Copies & Certificates of Incorporation */
  var hasAnyDoc=docImageData.senderPP||docImageData.ts_senderPP||docImageData.receiverPP||docImageData.ts_receiverPP||docImageData.cis||docImageData.ts_senderCert||docImageData.ts_receiverCert;
  if(hasAnyDoc){
    w.document.write('<div style="page-break-before:always"></div>');
    w.document.write('<div class="sec">Appendix A — Identity Documents & Certificates</div>');
    w.document.write('<div class="legal">The following certified copies of identity documents and certificates of incorporation are attached to this Deed of Assignment as supporting evidence of the parties\' identities and corporate standing.</div>');
    /* Sender Passport */
    var sPPimg=docImageData.ts_senderPP||docImageData.senderPP;
    if(sPPimg){
      w.document.write('<div style="margin-bottom:16px"><div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:6px;font-family:sans-serif">Party A — Sender Passport Copy</div>');
      w.document.write('<div style="text-align:center;padding:8px;border:1px solid #ddd"><img src="'+sPPimg+'" style="max-width:100%;max-height:280px;object-fit:contain" alt="Sender Passport"></div>');
      w.document.write('<div style="font-size:8px;color:#888;margin-top:4px">'+v(d.appRep)+' · Passport: '+v(d.appPassport)+'</div></div>');
    }
    /* Receiver Passport */
    var rPPimg=docImageData.ts_receiverPP||docImageData.receiverPP;
    if(rPPimg){
      w.document.write('<div style="margin-bottom:16px"><div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:6px;font-family:sans-serif">Party B — Receiver Passport Copy</div>');
      w.document.write('<div style="text-align:center;padding:8px;border:1px solid #ddd"><img src="'+rPPimg+'" style="max-width:100%;max-height:280px;object-fit:contain" alt="Receiver Passport"></div>');
      w.document.write('<div style="font-size:8px;color:#888;margin-top:4px">'+v(d.benRep)+' · Passport: '+v(d.benPassport)+'</div></div>');
    }
    /* Sender Certificate of Incorporation */
    var sCertImg=docImageData.ts_senderCert||docImageData.cis;
    if(sCertImg){
      w.document.write('<div style="margin-bottom:16px"><div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:6px;font-family:sans-serif">Party A — Certificate of Incorporation</div>');
      w.document.write('<div style="text-align:center;padding:8px;border:1px solid #ddd"><img src="'+sCertImg+'" style="max-width:100%;max-height:350px;object-fit:contain" alt="Sender Certificate"></div>');
      w.document.write('<div style="font-size:8px;color:#888;margin-top:4px">'+v(d.appCompany)+' · Reg: '+v(d.appReg)+'</div></div>');
    }
    /* Receiver Certificate of Incorporation */
    var rCertImg=docImageData.ts_receiverCert;
    if(rCertImg){
      w.document.write('<div style="margin-bottom:16px"><div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:6px;font-family:sans-serif">Party B — Certificate of Incorporation</div>');
      w.document.write('<div style="text-align:center;padding:8px;border:1px solid #ddd"><img src="'+rCertImg+'" style="max-width:100%;max-height:350px;object-fit:contain" alt="Receiver Certificate"></div>');
      w.document.write('<div style="font-size:8px;color:#888;margin-top:4px">'+v(d.benCompany)+' · Reg: '+v(d.benReg)+'</div></div>');
    }
    /* Sender Mandate Passport */
    var smPPimg=docImageData.ts_senderMandatePP;
    if(smPPimg){
      w.document.write('<div style="margin-bottom:16px"><div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:6px;font-family:sans-serif">Sender Mandate — Passport Copy</div>');
      w.document.write('<div style="text-align:center;padding:8px;border:1px solid #ddd"><img src="'+smPPimg+'" style="max-width:100%;max-height:280px;object-fit:contain" alt="Sender Mandate Passport"></div>');
      w.document.write('<div style="font-size:8px;color:#888;margin-top:4px">'+v(smName)+'</div></div>');
    }
    /* Receiver Mandate Passport */
    var rmPPimg=docImageData.ts_receiverMandatePP;
    if(rmPPimg){
      w.document.write('<div style="margin-bottom:16px"><div style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:6px;font-family:sans-serif">Receiver Mandate — Passport Copy</div>');
      w.document.write('<div style="text-align:center;padding:8px;border:1px solid #ddd"><img src="'+rmPPimg+'" style="max-width:100%;max-height:280px;object-fit:contain" alt="Receiver Mandate Passport"></div>');
      w.document.write('<div style="font-size:8px;color:#888;margin-top:4px">'+v(rmName)+'</div></div>');
    }
  }
  /* Footer */
  w.document.write('<div class="footer">DEALEX Deed of Assignment · Reference: '+ref+' · Instrument: '+(instType||'SBLC / MT760')+'<br>ICC Publication No. 600 · ICC Publication No. 758<br>© '+new Date().getFullYear()+' DEALEX — All rights reserved.</div>');
  w.document.write('</div></body></html>');
  w.document.close();
  /* Show Term Sheet and Produce IMFPA panels */
  ['termSheetPanel','produceIMFPAPanel','bankPackagePanel','bookingDatePanel','invitePanel'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display='block'});
  initInvitePanel();
  /* Init bank package checklist */
  setTimeout(function(){updateBankPkgChecklist()},100);
  /* Sync split values from main commission section if set */
  var syncPairs=[['splitSender','tsSplitSender'],['splitReceiver','tsSplitReceiver'],['splitSenderMandate','tsSplitSenderMandate'],['splitReceiverMandate','tsSplitReceiverMandate'],['paymaster','tsPaymaster'],['commAmt','tsCommAmt']];
  syncPairs.forEach(function(p){var src=document.getElementById(p[0]);var dst=document.getElementById(p[1]);if(src&&dst&&src.value)dst.value=src.value});
  updateTermSheetSplit();
  populateTermSheetFromDOA();
  showT('✓ DOA generated — '+ref);
}

/* ═══════════════════════════════════════════════════════
   TERM SHEET SYSTEM
   ═══════════════════════════════════════════════════════ */
var tsUploadedDocs={senderPP:null,receiverPP:null,senderCert:null,receiverCert:null,senderMandatePP:null,receiverMandatePP:null};

function populateTermSheetFromDOA(){
  var d=D;
  var hasAny=false;
  /* Passport numbers */
  var sPP=d.appPassport||'';
  var rPP=d.benPassport||'';
  var sReg=d.appReg||'';
  var rReg=d.benReg||'';
  /* Update the extracted docs panel */
  var panel=document.getElementById('tsExtractedDocs');
  if(sPP||rPP||sReg||rReg){
    if(panel)panel.style.display='block';
    hasAny=true;
  }
  /* Fill in extracted values */
  var el;
  el=document.getElementById('tsExtSenderPP');if(el)el.textContent=sPP||'Not found';
  el=document.getElementById('tsExtReceiverPP');if(el)el.textContent=rPP||'Not found';
  el=document.getElementById('tsExtSenderReg');if(el)el.textContent=sReg||'Not found';
  el=document.getElementById('tsExtReceiverReg');if(el)el.textContent=rReg||'Not found';
  /* Update upload zone hints to show "on file from DOA" */
  if(sPP){
    var zone=document.getElementById('tsSenderPP');
    var st=document.getElementById('tsSenderPPStatus');
    if(zone){zone.style.borderColor='rgba(42,128,80,.3)';zone.style.background='var(--green-a)'}
    if(st)st.innerHTML='<span style="color:var(--green);font-weight:600">✓ PP# '+sPP+' on DOA</span> · Upload copy if needed';
  }
  if(rPP){
    var zone=document.getElementById('tsReceiverPP');
    var st=document.getElementById('tsReceiverPPStatus');
    if(zone){zone.style.borderColor='rgba(42,128,80,.3)';zone.style.background='var(--green-a)'}
    if(st)st.innerHTML='<span style="color:var(--green);font-weight:600">✓ PP# '+rPP+' on DOA</span> · Upload copy if needed';
  }
  if(sReg){
    var zone=document.getElementById('tsSenderCert');
    var st=document.getElementById('tsSenderCertStatus');
    if(zone){zone.style.borderColor='rgba(42,128,80,.3)';zone.style.background='var(--green-a)'}
    if(st)st.innerHTML='<span style="color:var(--green);font-weight:600">✓ Reg# '+sReg+' on DOA</span> · Upload cert if needed';
  }
  if(rReg){
    var zone=document.getElementById('tsReceiverCert');
    var st=document.getElementById('tsReceiverCertStatus');
    if(zone){zone.style.borderColor='rgba(42,128,80,.3)';zone.style.background='var(--green-a)'}
    if(st)st.innerHTML='<span style="color:var(--green);font-weight:600">✓ Reg# '+rReg+' on DOA</span> · Upload cert if needed';
  }
  /* Auto-fill booking date officer names from DOA */
  var issOff=d.issOfficer||'';
  var rcvOff=d.rcvOfficer||'';
  var bIss=document.getElementById('bookingIssOfficer');if(bIss&&issOff&&!bIss.value)bIss.value=issOff;
  var bRcv=document.getElementById('bookingRcvOfficer');if(bRcv&&rcvOff&&!bRcv.value)bRcv.value=rcvOff;
  var bIssC=document.getElementById('bookingIssContact');if(bIssC&&d.issOfficerEmail&&!bIssC.value)bIssC.value=d.issOfficerEmail;
  var bRcvC=document.getElementById('bookingRcvContact');if(bRcvC&&d.rcvOfficerEmail&&!bRcvC.value)bRcvC.value=d.rcvOfficerEmail;
}

function updateTermSheetSplit(){
  var s=parseFloat(document.getElementById('tsSplitSender').value)||0;
  var r=parseFloat(document.getElementById('tsSplitReceiver').value)||0;
  var sm=parseFloat(document.getElementById('tsSplitSenderMandate').value)||0;
  var rm=parseFloat(document.getElementById('tsSplitReceiverMandate').value)||0;
  var total=s+r+sm+rm;
  document.getElementById('tsBarSender').style.width=Math.max(s,0)+'%';
  document.getElementById('tsBarSender').textContent=s>3?'S '+s+'%':'';
  document.getElementById('tsBarReceiver').style.width=Math.max(r,0)+'%';
  document.getElementById('tsBarReceiver').textContent=r>3?'R '+r+'%':'';
  document.getElementById('tsBarSM').style.width=Math.max(sm,0)+'%';
  document.getElementById('tsBarSM').textContent=sm>3?'SM '+sm+'%':'';
  document.getElementById('tsBarRM').style.width=Math.max(rm,0)+'%';
  document.getElementById('tsBarRM').textContent=rm>3?'RM '+rm+'%':'';
  var totalEl=document.getElementById('tsSplitTotal');
  totalEl.textContent='TOTAL: '+total+'%';
  totalEl.className='split-total '+(Math.abs(total-100)<0.01?'ok':'err');
  var pill=document.getElementById('termSheetPill');
  if(Math.abs(total-100)<0.01){pill.textContent='100% ✓';pill.className='pill pg'}
  else{pill.textContent=total+'% ✗';pill.className='pill pr'}
  /* Sync to main D state and the fiCommission fields */
  D.splitSender=s;D.splitReceiver=r;D.splitSenderMandate=sm;D.splitReceiverMandate=rm;
  var mainSync=[['splitSender',s],['splitReceiver',r],['splitSenderMandate',sm],['splitReceiverMandate',rm]];
  mainSync.forEach(function(p){var el=document.getElementById(p[0]);if(el)el.value=p[1]});
  updateSplit();
}

function handleTermSheetDoc(type,file,zone){
  if(!file)return;
  tsUploadedDocs[type]=file;
  captureDocImage('ts_'+type,file);
  zone.classList.add('uploaded');
  zone.innerHTML='<div style="font-size:16px;margin-bottom:2px">✓</div><div style="font-size:7px;font-weight:600;color:var(--green)">Uploaded</div><div style="font-size:6px;color:var(--muted2);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%">'+file.name+'</div>';
  showT('✓ '+file.name+' attached to Term Sheet');
}

function generateTermSheet(){
  var d=D;
  var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  var ref=dealRef||'DX-DRAFT';
  var v=function(x){return x||'_____________________'};
  var s=parseFloat(document.getElementById('tsSplitSender').value)||0;
  var r=parseFloat(document.getElementById('tsSplitReceiver').value)||0;
  var sm=parseFloat(document.getElementById('tsSplitSenderMandate').value)||0;
  var rm=parseFloat(document.getElementById('tsSplitReceiverMandate').value)||0;
  var total=s+r+sm+rm;
  var senderMandate=document.getElementById('tsSenderMandate').value||'';
  var receiverMandate=document.getElementById('tsReceiverMandate').value||'';
  var smPP=document.getElementById('tsSenderMandatePPNum').value||d.senderMandatePassport||'';
  var rmPP=document.getElementById('tsReceiverMandatePPNum').value||d.receiverMandatePassport||'';
  var paymaster=document.getElementById('tsPaymaster').value||d.paymaster||'';
  var commAmt=document.getElementById('tsCommAmt').value||d.commAmt||'';
  var w=openDocWindow();
  if(!w){showT('Pop-up blocked — please allow pop-ups');return}
  w.document.write('<!DOCTYPE html><html><head><title>DEALEX Term Sheet — '+ref+'</title>');
  w.document.write('<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;font-size:10.5px;color:#111;background:#fff}.page{max-width:800px;margin:0 auto;padding:40px 50px}.hdr{text-align:center;border-bottom:3px solid #3B49DF;padding-bottom:20px;margin-bottom:24px}.hdr .logo{font-size:28px;font-weight:800;letter-spacing:.3em;font-family:sans-serif}.hdr .logo span{color:#3B49DF}.hdr .subtitle{font-size:14px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#333;font-family:sans-serif}.hdr .ref{font-family:monospace;font-size:12px;color:#3B49DF;font-weight:700;margin-top:6px}.hdr .date{font-size:9px;color:#888;margin-top:4px}.sec{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#3B49DF;font-weight:700;border-bottom:1px solid #ddd;padding:6px 0;margin:22px 0 10px;font-family:sans-serif}.legal{font-size:10px;line-height:1.85;color:#333;margin-bottom:12px;text-align:justify}.legal strong{color:#111}table{width:100%;border-collapse:collapse;margin-bottom:14px}td,th{padding:6px 10px;border:1px solid #ddd;font-size:10px;text-align:left}th{background:#fafaf6;font-weight:700;color:#555;font-size:8px;letter-spacing:.1em;text-transform:uppercase;font-family:sans-serif}td:first-child{font-weight:600;width:38%;color:#555;background:#fdfcfa}.split-table td:nth-child(2){font-family:monospace;color:#3B49DF;font-weight:700;text-align:center;width:15%}.sig-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:20px 0}.sig-box{border:1px solid #ddd;padding:16px}.sig-box .label{font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:10px;font-family:sans-serif}.sig-line{border-bottom:2px solid #1A3D7C;height:50px;margin-bottom:6px}.sig-field{font-size:9px;color:#666;margin-bottom:6px}.sig-field span{display:inline-block;border-bottom:1px dotted #aaa;min-width:180px;margin-left:4px;color:#111}.warning{background:#fff5f5;border:1px solid #e5c0c0;padding:10px 12px;margin:12px 0;font-size:9px;color:#a33;line-height:1.6}.note{background:#f5f9ff;border:1px solid #c0d4e5;padding:10px 12px;margin:12px 0;font-size:9px;color:#336;line-height:1.6}.footer{text-align:center;border-top:2px solid #3B49DF;padding-top:12px;margin-top:30px;font-size:7.5px;color:#999;font-family:sans-serif}.no-print{margin:20px auto;text-align:center}.no-print button{padding:12px 30px;background:#3B49DF;color:#000;font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;border:none;cursor:pointer;margin:0 6px;font-family:sans-serif}.no-print button.sec-btn{background:transparent;color:#555;border:1px solid #ddd}.split-bar{display:flex;height:24px;border:1px solid #ddd;margin:8px 0}.split-seg{display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:700;letter-spacing:.04em;color:#fff}@media print{.no-print{display:none}.page{padding:20px 30px}}</style></head><body>');
  w.document.write('<div class="no-print"><button onclick="window.print()">🖨️ Print Term Sheet</button><button class="sec-btn" onclick="window.close()">✕ Close</button></div>');
  w.document.write('<div class="page">');
  /* Header */
  w.document.write('<div class="hdr"><div class="logo">DEAL<span>EX</span></div><div class="subtitle">Term Sheet</div><div class="ref">'+ref+'</div><div class="date">Date: '+today+'</div></div>');
  /* Preamble */
  w.document.write('<div class="legal">This Term Sheet sets forth the principal terms and commission structure for the transaction referenced below. This document is between <strong>Sender, Receiver, and their respective Mandates only</strong>. Brokers are not party to this Term Sheet and receive separate fee protection agreements with their appointing Mandate.</div>');
  /* Transaction */
  w.document.write('<div class="sec">1. Transaction Summary</div>');
  w.document.write('<table><tr><td>DEALEX Reference</td><td>'+ref+'</td></tr><tr><td>Instrument Type</td><td>'+(d.formUndertaking==='STBY'?'SBLC / MT760':'Demand Guarantee / MT760')+'</td></tr><tr><td>Transaction Reference</td><td>'+v(d.txCode||d.sblcRef)+'</td></tr><tr><td>Currency</td><td>'+v(d.currency)+'</td></tr><tr><td>Face Value</td><td>'+v(d.faceValue)+'</td></tr><tr><td>Jurisdiction</td><td>'+v(d.jurisdiction)+'</td></tr></table>');
  /* Parties */
  w.document.write('<div class="sec">2. Parties</div>');
  w.document.write('<table><tr><th colspan="2">Party A — Sender / Provider</th></tr><tr><td>Company</td><td>'+v(d.appCompany)+'</td></tr><tr><td>Represented By</td><td>'+v(d.appRep)+'</td></tr><tr><td>Passport No.</td><td>'+v(d.appPassport)+'</td></tr><tr><td>Country</td><td>'+v(d.appCountry)+'</td></tr></table>');
  w.document.write('<table><tr><th colspan="2">Party B — Receiver / Beneficiary</th></tr><tr><td>Company</td><td>'+v(d.benCompany)+'</td></tr><tr><td>Represented By</td><td>'+v(d.benRep)+'</td></tr><tr><td>Passport No.</td><td>'+v(d.benPassport)+'</td></tr><tr><td>Country</td><td>'+v(d.benCountry)+'</td></tr></table>');
  /* Mandates */
  w.document.write('<div class="sec">3. Mandates</div>');
  w.document.write('<table><tr><th colspan="2">Sender-Side Mandate</th></tr><tr><td>Name</td><td>'+v(senderMandate)+'</td></tr><tr><td>Passport No.</td><td>'+v(smPP)+'</td></tr></table>');
  w.document.write('<table><tr><th colspan="2">Receiver-Side Mandate</th></tr><tr><td>Name</td><td>'+v(receiverMandate)+'</td></tr><tr><td>Passport No.</td><td>'+v(rmPP)+'</td></tr></table>');
  /* Banking */
  w.document.write('<div class="sec">4. Banking Coordinates</div>');
  w.document.write('<table><tr><th colspan="2">Issuing Bank (Party A)</th></tr><tr><td>Bank</td><td>'+v(d.issBankName)+'</td></tr><tr><td>SWIFT / BIC</td><td>'+v(d.issSwift)+'</td></tr><tr><td>IBAN</td><td>'+v(d.issIban)+'</td></tr><tr><td>Account No.</td><td>'+v(d.issAcctNo)+'</td></tr></table>');
  w.document.write('<table><tr><th colspan="2">Advising Bank (Party B)</th></tr><tr><td>Bank</td><td>'+v(d.rcvBankName)+'</td></tr><tr><td>SWIFT / BIC</td><td>'+v(d.rcvSwift)+'</td></tr><tr><td>IBAN</td><td>'+v(d.rcvIban)+'</td></tr><tr><td>Account No.</td><td>'+v(d.rcvAcctNo)+'</td></tr></table>');
  /* Commission Split */
  w.document.write('<div class="sec">5. Commission Split</div>');
  w.document.write('<div class="legal">The total commission shall be divided as follows. <strong>Total must equal 100%.</strong> Brokers are excluded from this Term Sheet — broker fees are handled via separate IMFPA with their appointing Mandate.</div>');
  w.document.write('<table class="split-table"><tr><th>Party</th><th>%</th><th>Description</th></tr>');
  w.document.write('<tr><td>Sender (Party A)</td><td>'+s+'%</td><td>Sender-side commission</td></tr>');
  w.document.write('<tr><td>Receiver (Party B)</td><td>'+r+'%</td><td>Receiver-side commission</td></tr>');
  w.document.write('<tr><td>Sender Mandate</td><td>'+sm+'%</td><td>'+(senderMandate||'Sender-side mandate fee')+'</td></tr>');
  w.document.write('<tr><td>Receiver Mandate</td><td>'+rm+'%</td><td>'+(receiverMandate||'Receiver-side mandate fee')+'</td></tr>');
  w.document.write('<tr style="background:#fafaf6;font-weight:700"><td><strong>TOTAL</strong></td><td><strong>'+total+'%</strong></td><td></td></tr></table>');
  /* Visual bar */
  w.document.write('<div class="split-bar">');
  w.document.write('<div class="split-seg" style="width:'+s+'%;background:#3B49DF;color:#000">S '+s+'%</div>');
  w.document.write('<div class="split-seg" style="width:'+r+'%;background:#4A8BE0">R '+r+'%</div>');
  w.document.write('<div class="split-seg" style="width:'+sm+'%;background:#2837B8">SM '+sm+'%</div>');
  w.document.write('<div class="split-seg" style="width:'+rm+'%;background:#2a6090">RM '+rm+'%</div>');
  w.document.write('</div>');
  if(Math.abs(total-100)>=0.01){w.document.write('<div class="warning"><strong>Warning:</strong> Commission split totals '+total+'% — must equal exactly 100%.</div>')}
  /* Paymaster */
  w.document.write('<div class="sec">6. Paymaster / Escrow</div>');
  w.document.write('<table><tr><td>Paymaster / Escrow Agent</td><td>'+v(paymaster)+'</td></tr><tr><td>Total Commission Amount</td><td>'+v(commAmt)+'</td></tr></table>');
  w.document.write('<div class="legal">The Paymaster/Escrow Agent is irrevocably instructed to hold and disburse commission funds in accordance with the percentages stated above, within <strong>five (5) banking days</strong> of successful instrument delivery and authentication.</div>');
  /* Documents note */
  w.document.write('<div class="sec">7. Attached Documents</div>');
  var docList=[];
  for(var k in tsUploadedDocs){if(tsUploadedDocs[k])docList.push(tsUploadedDocs[k].name)}
  if(docList.length>0){
    w.document.write('<div class="legal">The following documents have been attached to this Term Sheet on the DEALEX platform:</div><table>');
    docList.forEach(function(n,i){w.document.write('<tr><td>Document '+(i+1)+'</td><td>'+n+'</td></tr>')});
    w.document.write('</table>');
  }else{
    w.document.write('<div class="note">No documents have been uploaded yet. Passports and certificates of incorporation should be attached before finalizing.</div>');
  }
  /* Broker exclusion */
  w.document.write('<div class="sec">8. Broker Exclusion</div>');
  w.document.write('<div class="legal">This Term Sheet is between <strong>Sender, Receiver, and their Mandates only</strong>. Brokers introduced by any Mandate are entitled to fees under a separate Irrevocable Master Fee Protection Agreement (IMFPA) between the broker and the <strong>opposite side\'s Mandate</strong>, per DEALEX conflict-of-interest rules.</div>');
  /* Signatures */
  w.document.write('<div class="sec">9. Acknowledgement</div>');
  w.document.write('<div style="font-size:9px;color:#1A3D7C;font-weight:700;margin-bottom:8px;font-style:italic">All signatures must be in BLUE INK.</div>');
  w.document.write('<div class="sig-grid">');
  w.document.write('<div class="sig-box"><div class="label">Party A — Sender</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(d.appRep)+'</span></div><div class="sig-field">Company: <span>'+v(d.appCompany)+'</span></div><div class="sig-field">Passport: <span>'+v(d.appPassport)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Party B — Receiver</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(d.benRep)+'</span></div><div class="sig-field">Company: <span>'+v(d.benCompany)+'</span></div><div class="sig-field">Passport: <span>'+v(d.benPassport)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Sender-Side Mandate</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(senderMandate)+'</span></div><div class="sig-field">Passport: <span>'+v(smPP)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Receiver-Side Mandate</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(receiverMandate)+'</span></div><div class="sig-field">Passport: <span>'+v(rmPP)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('</div>');
  /* Footer */
  w.document.write('<div class="footer">DEALEX Term Sheet · Reference: '+ref+'<br>Sender · Receiver · Mandates Only — Brokers on Separate IMFPA<br>© '+new Date().getFullYear()+' DEALEX — All rights reserved.</div>');
  w.document.write('</div></body></html>');
  w.document.close();
  showT('✓ Term Sheet generated — '+ref);
}

/* ═══════════════════════════════════════════════════════
   DEALEX DESK
   ═══════════════════════════════════════════════════════ */
var deskRole='';
var deskUploads={pp:null,cert:null};

function deskEntry(role){
  deskRole=role;
  /* Highlight selected entry */
  ['sender','receiver','mandate','project'].forEach(function(r){
    var el=document.getElementById('desk-'+r);
    if(el){
      if(r===role){el.style.borderColor=r==='project'?'var(--green)':'var(--gold)';el.style.background=r==='project'?'rgba(42,128,80,.1)':'var(--gold-a15)'}
      else{el.style.borderColor='';el.style.background=r==='project'?'rgba(42,128,80,.04)':''}
    }
  });
  /* Show correct flow */
  var flows=['deskSenderFlow','deskReceiverFlow','deskMandateFlow','deskProjectFlow'];
  flows.forEach(function(id){var el=document.getElementById(id);if(el)el.style.display='none'});
  var flowMap={sender:'deskSenderFlow',receiver:'deskReceiverFlow',mandate:'deskMandateFlow',project:'deskProjectFlow'};
  var target=document.getElementById(flowMap[role]);
  if(target)target.style.display='block';
  showT('DEALEX Desk — '+(role==='project'?'Project Funding':role.charAt(0).toUpperCase()+role.slice(1)+' entry'));
}

var projIncentives={};
function toggleIncentive(el){
  el.classList.toggle('on');
  var id=el.getAttribute('data-id');
  projIncentives[id]=el.classList.contains('on');
  var count=0;for(var k in projIncentives)if(projIncentives[k])count++;
  var detailsEl=document.getElementById('projIncentiveDetails');
  var summaryEl=document.getElementById('projIncentiveSummary');
  var countEl=document.getElementById('projIncentiveCount');
  var msgEl=document.getElementById('projIncentiveMsg');
  var pillEl=document.getElementById('projIncentivePill');
  if(count>0){
    if(detailsEl)detailsEl.style.display='block';
    if(summaryEl)summaryEl.style.display='block';
    if(countEl)countEl.textContent=count+' incentive'+(count>1?'s':'')+' selected';
    if(pillEl){pillEl.textContent=count+' Active';pillEl.style.background='rgba(42,128,80,.15)';pillEl.style.color='var(--green)';pillEl.style.borderColor='rgba(42,128,80,.3)'}
    if(count>=3&&msgEl)msgEl.textContent='Strong incentive package. This will be featured prominently in your pitch deck and significantly improves your funding prospects.';
    else if(msgEl)msgEl.textContent='Projects with tax incentives are significantly more attractive to funders. These will be highlighted prominently in your pitch deck.';
  }else{
    if(detailsEl)detailsEl.style.display='none';
    if(summaryEl)summaryEl.style.display='none';
    if(pillEl){pillEl.textContent='Deal Catalyst';pillEl.style.background='rgba(59,73,223,.12)';pillEl.style.color='var(--gold)';pillEl.style.borderColor='rgba(59,73,223,.3)'}
  }
}

var projDocs=[];
function handleProjDocs(files){
  if(!files||!files.length)return;
  for(var i=0;i<files.length;i++){
    projDocs.push({name:files[i].name,size:files[i].size,type:files[i].type});
  }
  renderProjDocList();
}
function renderProjDocList(){
  var el=document.getElementById('projDocList');
  var pill=document.getElementById('projDocPill');
  if(!el)return;
  if(projDocs.length===0){el.style.display='none';if(pill)pill.textContent='0 uploaded';return}
  el.style.display='block';
  if(pill){pill.textContent=projDocs.length+' uploaded';pill.className='pill pg'}
  var h='';
  projDocs.forEach(function(doc,i){
    var sz=doc.size>1048576?(doc.size/1048576).toFixed(1)+'MB':(doc.size/1024).toFixed(0)+'KB';
    var ext=doc.name.split('.').pop().toUpperCase();
    h+='<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:var(--obs);border:1px solid var(--border);margin-bottom:4px">';
    h+='<div style="font-size:8px;font-weight:700;color:var(--gold);width:36px;text-align:center">'+ext+'</div>';
    h+='<div style="flex:1;min-width:0"><div style="font-size:10px;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+doc.name+'</div><div style="font-size:8px;color:var(--muted)">'+sz+'</div></div>';
    h+='<div style="font-size:8px;color:var(--muted);cursor:pointer" onclick="projDocs.splice('+i+',1);renderProjDocList()">✕</div>';
    h+='</div>';
  });
  el.innerHTML=h;
}

var projChecks={must:{},should:{},nice:{}};
function toggleProjCheck(el,tier){
  el.classList.toggle('on');
  var isOn=el.classList.contains('on');
  var id=el.getAttribute('data-id');
  projChecks[tier][id]=isOn;
  var box=el.querySelector('.wc-box');
  if(box)box.setAttribute('aria-checked',isOn?'true':'false');
  updateProjScore();
}
function updateProjScore(){
  var mustTotal=5,mustDone=0,shouldTotal=6,shouldDone=0,niceTotal=5,niceDone=0;
  for(var k in projChecks.must)if(projChecks.must[k])mustDone++;
  for(var k in projChecks.should)if(projChecks.should[k])shouldDone++;
  for(var k in projChecks.nice)if(projChecks.nice[k])niceDone++;
  /* Must-haves are 60% of score, should-haves 30%, nice-to-haves 10% */
  var score=Math.round((mustDone/mustTotal)*60+(shouldDone/shouldTotal)*30+(niceDone/niceTotal)*10);
  var scoreEl=document.getElementById('projInvestScore');
  if(scoreEl)scoreEl.style.display='block';
  var numEl=document.getElementById('projScoreNum');
  var barEl=document.getElementById('projScoreBar');
  var lblEl=document.getElementById('projScoreLabel');
  var verdictEl=document.getElementById('projScoreVerdict');
  var pillEl=document.getElementById('minStdPill');
  var color=mustDone>=5?'var(--green)':mustDone>=3?'var(--gold)':'#E06050';
  if(numEl){numEl.textContent=score+'%';numEl.style.color=color}
  if(barEl){barEl.style.width=score+'%';barEl.style.background=color}
  if(lblEl)lblEl.textContent=mustDone+'/'+mustTotal+' must-haves · '+shouldDone+'/'+shouldTotal+' should-haves · '+niceDone+'/'+niceTotal+' nice-to-haves';
  /* Verdict */
  var verdict='';
  if(mustDone<5){
    var missing=[];
    var mustLabels={legal_entity:'Legal entity',land_or_rights:'Land/concession/contract',feasibility:'Feasibility study',kyc_ready:'KYC-ready principals',revenue_path:'Revenue path / exit plan'};
    ['legal_entity','land_or_rights','feasibility','kyc_ready','revenue_path'].forEach(function(id){
      if(!projChecks.must[id])missing.push(mustLabels[id]);
    });
    verdict='<div style="color:#E06050;font-weight:600;margin-bottom:4px">Not investable yet.</div>';
    verdict+='<div style="color:var(--txt)">Missing must-haves: <strong style="color:var(--white)">'+missing.join(', ')+'</strong>. These are non-negotiable — no funder will proceed without them. DEALEX can help you get these in place.</div>';
    if(pillEl){pillEl.textContent='Not Ready';pillEl.className='pill pr'}
  }else if(score<70){
    verdict='<div style="color:var(--gold);font-weight:600;margin-bottom:4px">Minimum standards met — but the deal needs strengthening.</div>';
    verdict+='<div style="color:var(--txt)">All must-haves are in place. You can proceed to the Wizard, but adding more should-haves will get you better terms and faster funding.</div>';
    if(pillEl){pillEl.textContent='Minimum Met';pillEl.className='pill po'}
  }else{
    verdict='<div style="color:var(--green);font-weight:600;margin-bottom:4px">Strong investable position.</div>';
    verdict+='<div style="color:var(--txt)">Your project meets DEALEX standards. You\'re ready to generate a pitch deck and match with funders.</div>';
    if(pillEl){pillEl.textContent='Investable';pillEl.className='pill pg'}
  }
  if(verdictEl)verdictEl.innerHTML=verdict;
  /* Enable/disable wizard button */
  var btn=document.getElementById('projWizardBtn');
  if(btn){
    if(mustDone<5){btn.disabled=true;btn.style.opacity='0.4';btn.title='Complete all must-haves first'}
    else{btn.disabled=false;btn.style.opacity='1';btn.title=''}
  }
}

function deskProjectToWizard(){
  var name=document.getElementById('deskProjName').value.trim();
  var amount=document.getElementById('deskProjAmount').value.trim();
  var currency=document.getElementById('deskProjCurrency').value;
  var country=document.getElementById('deskProjCountry').value;
  var source=document.getElementById('deskProjSource').value;
  if(!name){showT('Tell us what the project is');return}
  if(!amount){showT('Enter an estimated cost');return}
  /* Pre-fill wizard state */
  wizState.projectName=name;
  wizState.amount=amount;
  wizState.currency=currency;
  wizState.country=country;
  wizState.type='infrastructure';
  wizState.typeName='Project Funding — '+name;
  wizState.projectSource=source;
  /* Pre-fill wizard form fields */
  navTo('wizard');
  /* Skip to step 2 (amount) with pre-filled data */
  setTimeout(function(){
    var el;
    el=document.getElementById('wizProjectName');if(el)el.value=name;
    el=document.getElementById('wizCurrency');if(el)el.value=currency;
    el=document.getElementById('wizAmount');if(el)el.value=amount;
    /* Skip step 1, go to step 2 */
    var s0=document.getElementById('wizStep0');if(s0)s0.style.display='none';
    wizState.step=1;
    var s1=document.getElementById('wizStep1');if(s1)s1.style.display='block';
    wizUpdateDots();
    /* Show template notice */
    var notice=document.getElementById('wizTemplateNotice');
    if(notice){notice.style.display='block';document.getElementById('wizTemplateDesc').textContent='Pre-filled from DEALEX Desk. Adjust details as needed.'}
  },100);
  showT('✓ Project info loaded — continuing in Wizard');
}

function handleDeskUpload(type,file,zone){
  if(!file)return;
  deskUploads[type]=file;
  captureDocImage('desk_'+type,file);
  zone.style.borderColor='rgba(42,128,80,.5)';
  zone.style.background='var(--green-a)';
  zone.style.borderStyle='solid';
  zone.innerHTML='<div style="font-size:16px;margin-bottom:2px">✓</div><div style="font-size:7px;font-weight:600;color:var(--green)">Uploaded</div><div style="font-size:6px;color:var(--muted2);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%">'+file.name+'</div>';
  updateDeskProgress();
  showT('✓ '+file.name+' uploaded');
}

function updateDeskProgress(){
  var fields=[
    document.getElementById('deskIssBankName'),
    document.getElementById('deskIssSwift'),
    document.getElementById('deskSenderName'),
    document.getElementById('deskSenderPP'),
    document.getElementById('deskSenderCompany'),
    document.getElementById('deskInstrument'),
    document.getElementById('deskCurrency'),
    document.getElementById('deskFaceValue'),
    document.getElementById('deskCollateral')
  ];
  var filled=0;
  fields.forEach(function(el){if(el&&el.value&&el.value.trim().length>0)filled++});
  var pct=Math.round((filled/fields.length)*100);
  var bar=document.getElementById('deskProgressBar');
  var txt=document.getElementById('deskProgressPct');
  if(bar)bar.style.width=pct+'%';
  if(txt){txt.textContent=pct+'%';txt.style.color=pct>=80?'var(--green)':'var(--gold)'}
  if(bar)bar.style.background=pct>=80?'var(--green)':'var(--gold)';
  /* Update step pills */
  var s1=document.getElementById('deskIssBankName').value&&document.getElementById('deskIssSwift').value;
  var s2=document.getElementById('deskSenderName').value&&document.getElementById('deskSenderPP').value&&document.getElementById('deskSenderCompany').value;
  var s3=document.getElementById('deskInstrument').value&&document.getElementById('deskCurrency').value&&document.getElementById('deskFaceValue').value&&document.getElementById('deskCollateral').value;
  var p1=document.getElementById('deskS1Pill');if(p1){p1.textContent=s1?'✓ Done':'Required';p1.className='pill '+(s1?'pg':'pr')}
  var p2=document.getElementById('deskS2Pill');if(p2){p2.textContent=s2?'✓ Done':'Required';p2.className='pill '+(s2?'pg':'pr')}
  var p3=document.getElementById('deskS3Pill');if(p3){p3.textContent=s3?'✓ Done':'Required';p3.className='pill '+(s3?'pg':'pr')}
  /* Enable NCNDA button when steps 1-3 done */
  var btn=document.getElementById('deskNCNDABtn');
  var p4=document.getElementById('deskS4Pill');
  if(s1&&s2&&s3){
    if(btn)btn.disabled=false;
    if(p4){p4.textContent='Ready';p4.className='pill pg'}
  }else{
    if(btn)btn.disabled=true;
    if(p4){p4.textContent='After Steps 1-3';p4.className='pill po'}
  }
}

function generateDeskNCNDA(){
  /* Populate D with desk data so NCNDA generator can use it */
  D.appRep=document.getElementById('deskSenderName').value||'';
  D.appPassport=document.getElementById('deskSenderPP').value||'';
  D.appCompany=document.getElementById('deskSenderCompany').value||'';
  D.appReg=document.getElementById('deskSenderReg').value||'';
  D.appCountry=document.getElementById('deskSenderCountry').value||'';
  D.issBankName=document.getElementById('deskIssBankName').value||'';
  D.issSwift=document.getElementById('deskIssSwift').value||'';
  D.issBankAddr=document.getElementById('deskIssBankAddr').value||'';
  D.issOfficer=document.getElementById('deskIssOfficer').value||'';
  D.currency=document.getElementById('deskCurrency').value||'';
  D.faceValue=document.getElementById('deskFaceValue').value||'';
  D.formUndertaking=document.getElementById('deskInstrument').value==='SBLC'?'STBY':'STBY';
  if(!dealRef)genDealRef();
  generateNCNDA();
}

/* ═══════════════════════════════════════════════════════
   NCNDA GENERATOR
   ═══════════════════════════════════════════════════════ */
function generateNCNDA(){
  var d=D;
  var ref=dealRef||'DX-DRAFT';
  var ncndaRef='NCNDA-'+ref.replace('DX-','');
  var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  var v=function(x){return x||'_____________________'};
  var senderName=d.appRep||'';
  var senderCompany=d.appCompany||'';
  var senderPP=d.appPassport||'';
  var receiverName=d.benRep||'';
  var receiverCompany=d.benCompany||'';
  var receiverPP=d.benPassport||'';
  var smName=d.senderMandateName||'';
  var smPP=d.senderMandatePassport||'';
  var rmName=d.receiverMandateName||'';
  var rmPP=d.receiverMandatePassport||'';
  var jurisdiction=d.jurisdiction||'England and Wales';
  var instrument=(d.formUndertaking==='STBY'?'SBLC / MT760':'MT760');
  var faceVal=(d.currency?d.currency+' ':'')+(d.faceValue||'');

  var w=openDocWindow();
  if(!w){showT('Pop-up blocked — please allow pop-ups');return}
  w.document.write('<!DOCTYPE html><html><head><title>DEALEX NCNDA — '+ncndaRef+'</title>');
  w.document.write('<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;font-size:10.5px;color:#111;background:#fff}.page{max-width:800px;margin:0 auto;padding:40px 50px}.hdr{text-align:center;border-bottom:3px solid #3B49DF;padding-bottom:20px;margin-bottom:24px}.hdr .logo{font-size:28px;font-weight:800;letter-spacing:.3em;font-family:sans-serif}.hdr .logo span{color:#3B49DF}.hdr .subtitle{font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#333;font-family:sans-serif}.hdr .ref{font-family:monospace;font-size:12px;color:#3B49DF;font-weight:700;margin-top:6px}.hdr .date{font-size:9px;color:#888;margin-top:4px}.sec{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#3B49DF;font-weight:700;border-bottom:1px solid #ddd;padding:6px 0;margin:22px 0 10px;font-family:sans-serif}.legal{font-size:10px;line-height:1.85;color:#333;margin-bottom:10px;text-align:justify}.legal strong{color:#111}table{width:100%;border-collapse:collapse;margin-bottom:14px}td,th{padding:6px 10px;border:1px solid #ddd;font-size:10px;text-align:left}th{background:#fafaf6;font-weight:700;color:#555;font-size:8px;letter-spacing:.1em;text-transform:uppercase;font-family:sans-serif}td:first-child{font-weight:600;width:35%;color:#555;background:#fdfcfa}.sig-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0}.sig-box{border:1px solid #ddd;padding:14px}.sig-box .label{font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:8px;font-family:sans-serif}.sig-line{border-bottom:2px solid #1A3D7C;height:45px;margin-bottom:6px}.sig-field{font-size:9px;color:#666;margin-bottom:5px}.sig-field span{display:inline-block;border-bottom:1px dotted #aaa;min-width:160px;margin-left:4px;color:#111}.footer{text-align:center;border-top:2px solid #3B49DF;padding-top:12px;margin-top:30px;font-size:7.5px;color:#999;font-family:sans-serif}.no-print{margin:20px auto;text-align:center}.no-print button{padding:12px 30px;background:#3B49DF;color:#000;font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;border:none;cursor:pointer;margin:0 6px;font-family:sans-serif}.no-print button.sec-btn{background:transparent;color:#555;border:1px solid #ddd}.blue-note{font-size:9px;color:#1A3D7C;font-weight:700;font-style:italic;margin-bottom:8px}@media print{.no-print{display:none}.page{padding:20px 30px}}</style></head><body>');
  w.document.write('<div class="no-print"><button onclick="window.print()">🖨️ Print NCNDA</button><button class="sec-btn" onclick="window.close()">✕ Close</button></div>');
  w.document.write('<div class="page">');
  /* Header */
  w.document.write('<div class="hdr"><div class="logo">DEAL<span>EX</span></div><div class="subtitle">Non-Circumvention, Non-Disclosure<br>& Working Agreement</div><div class="ref">'+ncndaRef+'</div><div class="date">Date: '+today+'</div></div>');
  /* Preamble */
  w.document.write('<div class="sec">1. Preamble</div>');
  w.document.write('<div class="legal">This <strong>Non-Circumvention, Non-Disclosure & Working Agreement</strong> ("NCNDA") is entered into as of <strong>'+today+'</strong> in connection with DEALEX Reference <strong>'+ref+'</strong>.</div>');
  w.document.write('<div class="legal"><strong>WHEREAS</strong> the undersigned wish to enter into this Agreement to define certain parameters of their future legal obligations and are bound by a duty of confidentiality with respect to their sources, contacts, banking relationships, and transaction details. This duty is in accordance with the <strong>International Chamber of Commerce (ICC)</strong>.</div>');
  w.document.write('<div class="legal"><strong>WHEREAS</strong> the undersigned desire to enter a working business relationship to the mutual and common benefit of the parties hereto, including their affiliates, subsidiaries, stockholders, partners, co-ventures, trading partners, and other associated organizations (hereinafter referred to as <strong>"Affiliates"</strong>).</div>');
  w.document.write('<div class="legal"><strong>NOW THEREFORE</strong> in consideration of the mutual promises, assertions and covenants herein and other good and valuable considerations, the receipt of which is acknowledged hereby, the parties agree as follows:</div>');
  /* Transaction */
  w.document.write('<div class="sec">2. Transaction Details</div>');
  w.document.write('<table><tr><td>DEALEX Reference</td><td>'+ref+'</td></tr><tr><td>NCNDA Reference</td><td>'+ncndaRef+'</td></tr><tr><td>Instrument</td><td>'+instrument+'</td></tr>');
  if(faceVal)w.document.write('<tr><td>Face Value</td><td>'+faceVal+'</td></tr>');
  w.document.write('<tr><td>Jurisdiction</td><td>'+v(jurisdiction)+'</td></tr></table>');
  /* Parties */
  w.document.write('<div class="sec">3. Parties to this Agreement</div>');
  w.document.write('<table><tr><th>Role</th><th>Name / Company</th><th>Passport No.</th></tr>');
  w.document.write('<tr><td>Sender (Party A)</td><td>'+v(senderName)+(senderCompany?' — '+senderCompany:'')+'</td><td>'+v(senderPP)+'</td></tr>');
  w.document.write('<tr><td>Receiver (Party B)</td><td>'+v(receiverName)+(receiverCompany?' — '+receiverCompany:'')+'</td><td>'+v(receiverPP)+'</td></tr>');
  if(smName)w.document.write('<tr><td>Sender Mandate</td><td>'+smName+'</td><td>'+v(smPP)+'</td></tr>');
  if(rmName)w.document.write('<tr><td>Receiver Mandate</td><td>'+rmName+'</td><td>'+v(rmPP)+'</td></tr>');
  w.document.write('</table>');
  /* Non-Circumvention */
  w.document.write('<div class="sec">4. Non-Circumvention</div>');
  w.document.write('<div class="legal">4.1 The parties shall <strong>not</strong> in any manner, directly or indirectly, contact, deal with, or otherwise become involved with any entity, corporation, individual, or bank that has been introduced by or through any other party to this Agreement, without the specific prior <strong>written consent</strong> of that introducing party.</div>');
  w.document.write('<div class="legal">4.2 No party shall solicit or accept business in any manner from sources which were made available through this Agreement without the express written permission of the party who made available the source.</div>');
  w.document.write('<div class="legal">4.3 No party shall attempt to bypass, compete with, avoid, or circumvent any other party for the purpose of avoiding payment of fees, commissions, or any other obligation under this Agreement or any related IMFPA.</div>');
  w.document.write('<div class="legal">4.4 This non-circumvention obligation extends to all <strong>Affiliates</strong> — including subsidiaries, partners, associates, family members, nominees, and any entities directly or indirectly controlled by any party.</div>');
  /* Non-Disclosure */
  w.document.write('<div class="sec">5. Non-Disclosure & Confidentiality</div>');
  w.document.write('<div class="legal">5.1 All parties shall maintain <strong>complete and absolute confidentiality</strong> regarding each other\'s business sources, contacts, banking relationships, transaction structures, pricing, commissions, and all Affiliates.</div>');
  w.document.write('<div class="legal">5.2 No party shall disclose names, addresses, email addresses, telephone numbers, bank coordinates, SWIFT codes, account numbers, passport details, or any other identifying information to any third party not named in this Agreement.</div>');
  w.document.write('<div class="legal">5.3 Each party recognizes that all contacts, sources, banking relationships, and business opportunities disclosed through this Agreement are the <strong>exclusive property</strong> of the party who introduced them.</div>');
  w.document.write('<div class="legal">5.4 This confidentiality obligation survives the termination or expiration of this Agreement and shall remain in force for a minimum of <strong>five (5) years</strong> from the date of last transaction.</div>');
  /* Non-Competition */
  w.document.write('<div class="sec">6. Non-Competition</div>');
  w.document.write('<div class="legal">6.1 No party shall enter into any direct negotiations or transactions with contacts, banks, investors, sources of funds, or other bodies whose names have been revealed by another party to this Agreement.</div>');
  w.document.write('<div class="legal">6.2 No party shall undertake to enter into any business transaction, directly or through Affiliates, with any person, company, or entity introduced through this Agreement for the purpose of circumventing any other party\'s rights or commissions.</div>');
  /* Penalties */
  w.document.write('<div class="sec">7. Penalties for Circumvention</div>');
  w.document.write('<div class="legal">7.1 In the event of circumvention of this Agreement by any party, directly or indirectly, the circumvented party shall be entitled to a <strong>legal monetary penalty equal to the maximum commission or fee they would have realized</strong> from such transaction, plus any and all expenses including but not limited to legal costs.</div>');
  w.document.write('<div class="legal">7.2 Additionally, the circumventing party shall be liable for <strong>liquidated damages equal to 200% (two hundred percent)</strong> of the total commission or fee that was due to the circumvented party.</div>');
  w.document.write('<div class="legal">7.3 The circumvented party may seek injunctive relief, specific performance, and/or damages in any court of competent jurisdiction or through ICC arbitration.</div>');
  /* Duration */
  w.document.write('<div class="sec">8. Duration & Validity</div>');
  w.document.write('<div class="legal">8.1 This Agreement is valid for any and all transactions between the parties herein for the <strong>duration of the referenced transaction</strong>, including all extensions, renewals, rollovers, and subsequent tranches.</div>');
  w.document.write('<div class="legal">8.2 This Agreement shall remain in full force and effect for a minimum period of <strong>two (2) years</strong> from the date of last transaction or activity under this Agreement, whichever is later.</div>');
  w.document.write('<div class="legal">8.3 This Agreement may only be terminated by <strong>unanimous written consent</strong> of all parties named herein.</div>');
  /* Dispute Resolution */
  w.document.write('<div class="sec">9. Dispute Resolution & Governing Law</div>');
  w.document.write('<div class="legal">9.1 Any dispute arising out of or in connection with this Agreement shall be submitted to <strong>binding arbitration</strong> under the rules of the International Chamber of Commerce (ICC), with seat in <strong>'+jurisdiction+'</strong>.</div>');
  w.document.write('<div class="legal">9.2 The prevailing party in any dispute shall be entitled to recover all reasonable legal fees, costs, and expenses from the non-prevailing party.</div>');
  w.document.write('<div class="legal">9.3 This Agreement shall be governed by and construed in accordance with the laws of <strong>'+jurisdiction+'</strong>.</div>');
  w.document.write('<div class="legal">9.4 The signing parties hereby accept such jurisdiction as the exclusive venue for resolution of any disputes.</div>');
  /* Representations */
  w.document.write('<div class="sec">10. Representations & Warranties</div>');
  w.document.write('<div class="legal">10.1 Each party represents and warrants that: (a) they have full legal authority to enter into this Agreement; (b) the information provided is true, accurate, and complete; (c) they are not subject to OFAC, EU, or UN sanctions; (d) they are acting in good faith and for lawful purposes.</div>');
  w.document.write('<div class="legal">10.2 Each party acknowledges having had the opportunity to seek independent legal counsel before signing this Agreement.</div>');
  /* Electronic Signatures */
  w.document.write('<div class="sec">11. Electronic Signatures</div>');
  w.document.write('<div class="legal">11.1 Signatures to this Agreement transmitted electronically shall be deemed original signatures, incorporating U.S. Public Law 106-229 ("Electronic Signatures in Global & National Commerce Act") and the UNCITRAL Model Law on Electronic Signatures (2001).</div>');
  w.document.write('<div class="legal">11.2 This Agreement is subject to the Electronic Commerce Agreement (ECE/TRADE/257, Geneva, May 2000) adopted by the United Nations Centre for Trade Facilitation and Electronic Business (UN/CEFACT).</div>');
  /* Signatures */
  w.document.write('<div class="sec">12. Signatures — Binding Execution</div>');
  w.document.write('<div class="blue-note">All signatures must be in BLUE INK.</div>');
  w.document.write('<div class="legal">By signing below, each party confirms they have read this NCNDA in its entirety, understand and agree to all terms, and acknowledge this Agreement is irrevocable and legally binding upon execution.</div>');
  w.document.write('<div class="sig-grid">');
  w.document.write('<div class="sig-box"><div class="label">Sender (Party A)</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(senderName)+'</span></div><div class="sig-field">Company: <span>'+v(senderCompany)+'</span></div><div class="sig-field">Passport: <span>'+v(senderPP)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Receiver (Party B)</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(receiverName)+'</span></div><div class="sig-field">Company: <span>'+v(receiverCompany)+'</span></div><div class="sig-field">Passport: <span>'+v(receiverPP)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  if(smName||rmName){
    w.document.write('<div class="sig-box"><div class="label">Sender Mandate</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(smName)+'</span></div><div class="sig-field">Passport: <span>'+v(smPP)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
    w.document.write('<div class="sig-box"><div class="label">Receiver Mandate</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(rmName)+'</span></div><div class="sig-field">Passport: <span>'+v(rmPP)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  }
  w.document.write('</div>');
  /* Footer */
  w.document.write('<div class="footer">DEALEX NCNDA · Reference: '+ncndaRef+' · Deal: '+ref+'<br>Sender · Receiver · Mandates Only — Brokers on Separate Agreement<br>International Chamber of Commerce (ICC) · UNCITRAL Model Law on Electronic Signatures<br>© '+new Date().getFullYear()+' DEALEX — All rights reserved.</div>');
  w.document.write('</div></body></html>');
  w.document.close();
  showT('✓ NCNDA generated — '+ncndaRef);
}

/* ═══════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
   ═══════════════════════════════════════════════════════ */
function showT(m){var t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show')},2800)}

/* ═══════════════════════════════════════════════════════
   DOCUMENT WINDOW HELPER (popup fallback for iframes)
   ═══════════════════════════════════════════════════════ */
function openDocWindow(){
  var overlay=document.createElement('div');
  overlay.id='docOverlay';
  overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.95);z-index:99999;display:flex;flex-direction:column;align-items:center';
  var bar=document.createElement('div');
  bar.style.cssText='width:100%;padding:10px 16px;background:#111;display:flex;justify-content:center;gap:12px;flex-shrink:0;border-bottom:1px solid #3B49DF';
  var printBtn=document.createElement('button');
  printBtn.textContent='PRINT';
  printBtn.style.cssText='padding:10px 30px;background:#3B49DF;color:#000;font-weight:800;font-size:11px;border:none;cursor:pointer;letter-spacing:.2em;font-family:Montserrat,sans-serif';
  printBtn.onclick=function(){var f=document.getElementById('docFrame');if(f)f.contentWindow.print()};
  var closeBtn=document.createElement('button');
  closeBtn.textContent='CLOSE';
  closeBtn.style.cssText='padding:10px 30px;background:transparent;color:#999;font-size:11px;border:1px solid #333;cursor:pointer;letter-spacing:.2em;font-family:Montserrat,sans-serif';
  closeBtn.onclick=function(){var o=document.getElementById('docOverlay');if(o)o.parentNode.removeChild(o)};
  bar.appendChild(printBtn);
  bar.appendChild(closeBtn);
  overlay.appendChild(bar);
  var iframe=document.createElement('iframe');
  iframe.id='docFrame';
  iframe.style.cssText='flex:1;width:100%;max-width:900px;border:none;background:#fff;margin:0 auto';
  overlay.appendChild(iframe);
  document.body.appendChild(overlay);
  var doc=iframe.contentDocument||iframe.contentWindow.document;
  return{document:doc,close:function(){doc.close()},print:function(){iframe.contentWindow.print()}};
}

/* ═══════════════════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
   DEALEX WIZARD
   ═══════════════════════════════════════════════════════ */
var wizState={step:0,type:'',typeName:'',projectName:'',currency:'',amount:'',purpose:'',country:'',sponsor:'',sovereign:'',checks:{}};
var wizCheckBase=[
  {id:'feasibility',label:'Feasibility study or business plan',weight:3},
  {id:'govapproval',label:'Government approval or support letter',weight:4},
  {id:'landsite',label:'Land or site secured',weight:3},
  {id:'bankrelation',label:'Existing bank relationship',weight:2},
  {id:'spv',label:'Special Purpose Vehicle (SPV) or company set up',weight:2},
  {id:'passport',label:'Passport and KYC documents ready',weight:1},
  {id:'legal',label:'Legal counsel / law firm engaged',weight:2},
];
var wizCheckByType={
  infrastructure:[
    {id:'eia',label:'Environmental Impact Assessment (EIA) completed',weight:3},
    {id:'masterplan',label:'Master plan or detailed design approved',weight:3},
    {id:'contractor',label:'Contractor or EPC firm identified',weight:2},
    {id:'landsurvey',label:'Land survey and geotechnical report',weight:2},
    {id:'revenue_model',label:'Revenue model or financial projections',weight:3},
    {id:'offtake',label:'Offtake agreement, concession, or PPP contract',weight:3},
    {id:'insurance',label:'Insurance or performance guarantee in place',weight:2},
    {id:'pmo',label:'Project management office (PMO) set up',weight:2},
    {id:'other_funding',label:'Other funding sources partially secured',weight:2},
  ],
  humanitarian:[
    {id:'eia',label:'Environmental & Social Impact Assessment',weight:3},
    {id:'masterplan',label:'Master plan or phased development plan',weight:3},
    {id:'contractor',label:'Contractor or EPC firm identified',weight:2},
    {id:'devbank',label:'Development bank engagement (ADB, AIIB, IsDB, IFC)',weight:3},
    {id:'revenue_model',label:'Revenue model or sustainability plan',weight:3},
    {id:'community',label:'Community consultation or social licence',weight:2},
    {id:'ngo',label:'NGO or multilateral partnership in place',weight:2},
    {id:'offtake',label:'Offtake, concession, or government contract',weight:3},
    {id:'insurance',label:'Insurance or sovereign guarantee',weight:2},
    {id:'pmo',label:'Project management team assembled',weight:2},
    {id:'other_funding',label:'Other funding or grant sources identified',weight:2},
  ],
  realestate:[
    {id:'landtitle',label:'Land title or lease agreement',weight:4},
    {id:'planning',label:'Planning permission or zoning approval',weight:3},
    {id:'architect',label:'Architect and design plans complete',weight:2},
    {id:'contractor',label:'Builder or construction firm contracted',weight:2},
    {id:'presales',label:'Pre-sales or anchor tenants secured',weight:3},
    {id:'valuation',label:'Independent property valuation',weight:2},
    {id:'insurance',label:'Builder\'s risk insurance',weight:1},
    {id:'other_funding',label:'Other funding sources partially secured',weight:2},
  ],
  energy:[
    {id:'eia',label:'Environmental Impact Assessment (EIA)',weight:3},
    {id:'grid',label:'Grid connection study or approval',weight:3},
    {id:'ppa',label:'Power Purchase Agreement (PPA) or feed-in tariff',weight:4},
    {id:'equipment',label:'Equipment supplier identified (turbines, panels)',weight:2},
    {id:'landlease',label:'Land lease or right-of-way agreements',weight:3},
    {id:'contractor',label:'EPC contractor selected',weight:2},
    {id:'insurance',label:'Insurance or performance guarantee',weight:2},
    {id:'revenue_model',label:'Revenue model with generation forecasts',weight:3},
    {id:'other_funding',label:'Other funding or carbon credits identified',weight:2},
  ],
  mining:[
    {id:'license',label:'Mining licence or exploration permit',weight:4},
    {id:'geological',label:'Geological survey or resource estimate (JORC/NI 43-101)',weight:4},
    {id:'eia',label:'Environmental Impact Assessment',weight:3},
    {id:'offtake',label:'Offtake or purchase agreement for output',weight:3},
    {id:'equipment',label:'Mining equipment sourced',weight:1},
    {id:'contractor',label:'Mining contractor or operator identified',weight:2},
    {id:'community',label:'Community agreement or social licence',weight:2},
    {id:'insurance',label:'Mine insurance and rehabilitation bond',weight:2},
    {id:'other_funding',label:'Other funding sources partially secured',weight:2},
  ],
  trade:[
    {id:'contract',label:'Purchase or sale contract signed',weight:4},
    {id:'shipper',label:'Shipping or logistics arranged',weight:2},
    {id:'inspection',label:'SGS or independent inspection arranged',weight:3},
    {id:'insurance',label:'Cargo and marine insurance',weight:2},
    {id:'customs',label:'Import/export licences and customs clearance',weight:3},
    {id:'warehouse',label:'Warehouse or storage confirmed',weight:1},
    {id:'other_funding',label:'Other funding or credit line available',weight:2},
  ],
  agriculture:[
    {id:'landtitle',label:'Land title, lease, or farming rights',weight:3},
    {id:'water',label:'Water rights or irrigation access',weight:3},
    {id:'offtake',label:'Buyer or offtake agreement for produce',weight:3},
    {id:'equipment',label:'Equipment and machinery sourced',weight:1},
    {id:'eia',label:'Environmental assessment or sustainable farming cert',weight:2},
    {id:'coldchain',label:'Cold chain or storage infrastructure',weight:2},
    {id:'insurance',label:'Crop or agricultural insurance',weight:2},
    {id:'other_funding',label:'Other funding, subsidies, or grants identified',weight:2},
  ],
};
var wizCheckItems=[];

function wizBuildChecklist(){
  var type=wizState.type||'other';
  var extra=wizCheckByType[type]||wizCheckByType.infrastructure||[];
  wizCheckItems=wizCheckBase.concat(extra);
}

function wizInitChecklist(){
  wizBuildChecklist();
  var el=document.getElementById('wizChecklist');if(!el)return;
  el.innerHTML='';
  /* Section header showing what type of checklist this is */
  var typeLabel=wizState.typeName||wizState.type||'General';
  var hdr=document.createElement('div');
  hdr.style.cssText='font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px';
  hdr.textContent=typeLabel+' — '+wizCheckItems.length+' items';
  el.appendChild(hdr);
  wizCheckItems.forEach(function(item){
    var div=document.createElement('div');
    div.className='wiz-check'+(wizState.checks[item.id]?' on':'');
    div.innerHTML='<div class="wc-box" role="checkbox" aria-checked="false">✓</div><span>'+item.label+'</span>';
    div.onclick=function(){
      wizState.checks[item.id]=!wizState.checks[item.id];
      div.classList.toggle('on');
    };
    el.appendChild(div);
  });
}

var wizTemplates={
  smart_city:{name:'Smart City / Clean City Development',currency:'USD',amount:'10,000,000,000',purpose:'Integrated smart city: transport, utilities, housing, digital infrastructure, commercial zones',sovereign:'sovereign',phases:'Airport → Power Grid → Water → Housing → Schools → Hospital → Transit → Economic Zone'},
  airport:{name:'International Airport Terminal',currency:'USD',amount:'3,500,000,000',purpose:'New airport terminal with runways, baggage handling, people mover, and cargo facilities',sovereign:'sovereign',phases:'Planning → Runway Construction → Terminal Build → Systems Integration → Operations'},
  rail_network:{name:'Urban Rail Transit Network',currency:'USD',amount:'5,000,000,000',purpose:'Metro/light rail system connecting major urban centres with stations and depot facilities',sovereign:'sovereign',phases:'Route Survey → Tunnel/Viaduct → Stations → Rolling Stock → Testing → Operations'},
  port:{name:'Deep Water Seaport & Free Trade Zone',currency:'USD',amount:'4,000,000,000',purpose:'Container port with berths, cranes, warehousing, customs facilities, and special economic zone',sovereign:'quasi',phases:'Dredging → Berth Construction → Equipment → Warehousing → FTZ Development'},
  hospital:{name:'Regional Hospital Complex',currency:'USD',amount:'800,000,000',purpose:'Teaching hospital with specialist centres, medical school, research labs, and staff housing',sovereign:'quasi',phases:'Design → Foundation → Structure → Medical Equipment → Staffing → Commissioning'},
  housing:{name:'Mass Housing Development',currency:'USD',amount:'2,000,000,000',purpose:'Affordable housing township: 50,000+ units with schools, clinics, parks, and commercial areas',sovereign:'sovereign',phases:'Land Prep → Infrastructure → Phase 1 Units → Community Facilities → Phase 2-3 Units'},
  water:{name:'Water & Sanitation Infrastructure',currency:'USD',amount:'1,500,000,000',purpose:'Water treatment plants, distribution network, sewage system, and desalination facilities',sovereign:'sovereign',phases:'Source Development → Treatment Plant → Distribution Network → Sewage → Testing'},
  education:{name:'Education Campus Network',currency:'USD',amount:'600,000,000',purpose:'University campus with technical colleges, research centres, dormitories, and sports facilities',sovereign:'quasi',phases:'Master Plan → Core Campus → Faculty Buildings → Labs → Student Housing → Landscaping'},
  solar_farm:{name:'Utility-Scale Solar Farm',currency:'USD',amount:'1,200,000,000',purpose:'500MW+ solar generation facility with battery storage and grid connection',sovereign:'private',phases:'Land Lease → Grid Study → Panel Installation → Battery Storage → Grid Connection → Operations'},
  power_grid:{name:'National Power Grid Expansion',currency:'USD',amount:'3,000,000,000',purpose:'High-voltage transmission lines, substations, rural electrification, and smart grid systems',sovereign:'sovereign',phases:'Route Survey → Substations → Transmission Lines → Distribution → Smart Grid → Rural Last-Mile'},
  waste:{name:'Integrated Waste Management System',currency:'USD',amount:'500,000,000',purpose:'Recycling facilities, waste-to-energy plant, landfill remediation, collection fleet',sovereign:'quasi',phases:'Collection System → Sorting Facility → Waste-to-Energy → Landfill Remediation → Monitoring'},
  food_security:{name:'National Food Security Programme',currency:'USD',amount:'2,000,000,000',purpose:'Irrigation systems, cold chain logistics, food processing plants, distribution network',sovereign:'sovereign',phases:'Irrigation → Farm Support → Processing Plants → Cold Chain → Distribution → Markets'},
  new_city:{name:'New City Development (Multi-Phase)',currency:'USD',amount:'25,000,000,000',purpose:'Complete new city: airport, hospital, housing, schools, water, power, transit, economic zone. Phased 10-15 years.',sovereign:'sovereign',phases:'Phase 1: Airport + Power → Phase 2: Water + Housing → Phase 3: Hospital + Schools → Phase 4: Transit + Commercial → Phase 5: Economic Zone + Expansion'},
  disaster_rebuild:{name:'Post-Disaster Infrastructure Rebuild',currency:'USD',amount:'3,000,000,000',purpose:'Emergency reconstruction: bridges, hospitals, housing, utilities, roads. Accelerated 3-5 year timeline.',sovereign:'sovereign',phases:'Emergency Assessment → Critical Infrastructure (Bridges/Roads) → Hospitals → Temporary Housing → Permanent Housing → Utilities Restoration'},
};

var wizDealFiles=[];
function wizAnalyzeDeals(files){
  if(!files||!files.length)return;
  for(var i=0;i<files.length;i++)wizDealFiles.push(files[i]);
  wizRenderDealFiles();
  /* Analyze the latest file (or first DOCX found) */
  var docxFile=null;
  for(var i=0;i<wizDealFiles.length;i++){
    var ext=wizDealFiles[i].name.split('.').pop().toLowerCase();
    if(ext==='docx'||ext==='doc'){docxFile=wizDealFiles[i];break}
  }
  wizAnalyzeDeal(docxFile||wizDealFiles[wizDealFiles.length-1]);
}
function wizRenderDealFiles(){
  var panel=document.getElementById('wizDealAnalysis');if(panel)panel.style.display='block';
  var zone=document.getElementById('wizDealDropZone');
  if(zone){zone.style.borderColor='rgba(42,128,80,.5)';zone.style.borderStyle='solid';zone.style.background='rgba(42,128,80,.04)'}
  /* Build file list */
  var listHtml='<div style="margin-bottom:8px">';
  wizDealFiles.forEach(function(f,i){
    var ext=f.name.split('.').pop().toUpperCase();
    var sz=f.size>1048576?(f.size/1048576).toFixed(1)+'MB':(f.size/1024).toFixed(0)+'KB';
    listHtml+='<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)">';
    listHtml+='<span style="font-size:7px;font-weight:700;color:var(--gold);width:32px;text-align:center;border:1px solid rgba(59,73,223,.3);padding:2px">'+ext+'</span>';
    listHtml+='<span style="flex:1;font-size:9px;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+f.name+'</span>';
    listHtml+='<span style="font-size:8px;color:var(--muted)">'+sz+'</span>';
    listHtml+='<span style="font-size:8px;color:var(--muted);cursor:pointer;padding:2px 6px" onclick="wizRemoveDealFile('+i+')">✕</span>';
    listHtml+='</div>';
  });
  listHtml+='</div>';
  /* Update the file display area */
  var nameEl=document.getElementById('wizDealFileName');
  var iconEl=document.getElementById('wizDealFileIcon');
  if(wizDealFiles.length===1){
    var ext=wizDealFiles[0].name.split('.').pop().toUpperCase();
    var sz=wizDealFiles[0].size>1048576?(wizDealFiles[0].size/1048576).toFixed(1)+'MB':(wizDealFiles[0].size/1024).toFixed(0)+'KB';
    if(nameEl)nameEl.textContent=wizDealFiles[0].name+' ('+sz+')';
    if(iconEl)iconEl.textContent=ext;
  }else{
    if(nameEl)nameEl.innerHTML=wizDealFiles.length+' files uploaded';
    if(iconEl)iconEl.textContent=wizDealFiles.length;
    /* Insert file list before the analysis body */
    var bodyEl=document.getElementById('wizDealAnalysisBody');
    if(bodyEl){var existing=bodyEl.innerHTML;bodyEl.innerHTML=listHtml+existing}
  }
}
function wizRemoveDealFile(idx){
  wizDealFiles.splice(idx,1);
  if(wizDealFiles.length===0){wizDealClear();return}
  /* Re-render */
  document.getElementById('wizDealAnalysisBody').innerHTML='';
  wizRenderDealFiles();
  var docxFile=null;
  for(var i=0;i<wizDealFiles.length;i++){var ext=wizDealFiles[i].name.split('.').pop().toLowerCase();if(ext==='docx'||ext==='doc'){docxFile=wizDealFiles[i];break}}
  wizAnalyzeDeal(docxFile||wizDealFiles[wizDealFiles.length-1]);
}
function wizAnalyzeDeal(file){
  if(!file)return;
  var ext=file.name.split('.').pop().toUpperCase();
  var sz=file.size>1048576?(file.size/1048576).toFixed(1)+'MB':(file.size/1024).toFixed(0)+'KB';
  /* Show analysis panel */
  var panel=document.getElementById('wizDealAnalysis');if(panel)panel.style.display='block';
  document.getElementById('wizDealFileIcon').textContent=ext;
  document.getElementById('wizDealFileName').textContent=file.name+' ('+sz+')';
  document.getElementById('wizDealFileStatus').textContent='Analyzing...';
  document.getElementById('wizDealFileStatus').style.color='var(--gold)';
  /* Update dropzone to show uploaded state */
  var zone=document.getElementById('wizDealDropZone');
  if(zone){zone.style.borderColor='rgba(42,128,80,.5)';zone.style.borderStyle='solid';zone.style.background='rgba(42,128,80,.04)'}
  /* Store the file for later */
  wizState.uploadedDeal=file;
  /* Analyze based on file type — for DOCX use mammoth, for PDF use basic extraction */
  var body=document.getElementById('wizDealAnalysisBody');
  if(ext==='DOCX'||ext==='DOC'){
    var reader=new FileReader();
    reader.onload=function(e){
      if(typeof mammoth!=='undefined'){
        mammoth.extractRawText({arrayBuffer:e.target.result}).then(function(r){
          wizRunAnalysis(r.value,body);
        }).catch(function(){wizRunAnalysis('',body)});
      }else{wizRunAnalysis('',body)}
    };
    reader.readAsArrayBuffer(file);
  }else{
    /* For PDF and other types, do basic analysis based on filename and size */
    wizRunAnalysis('',body);
  }
}

function wizRunAnalysis(text,bodyEl){
  var findings=[];
  var detectedType='';
  var detectedAmount='';
  var detectedCountry='';
  text=text||'';
  var tl=text.toLowerCase();
  /* Detect project type */
  if(tl.indexOf('airport')>-1||tl.indexOf('terminal')>-1||tl.indexOf('runway')>-1){detectedType='infrastructure';findings.push({icon:'✓',text:'Infrastructure project detected (airport/terminal)',color:'var(--green)'})}
  else if(tl.indexOf('hospital')>-1||tl.indexOf('medical')>-1||tl.indexOf('health')>-1){detectedType='humanitarian';findings.push({icon:'✓',text:'Humanitarian project detected (healthcare)',color:'var(--green)'})}
  else if(tl.indexOf('solar')>-1||tl.indexOf('wind')>-1||tl.indexOf('power')>-1||tl.indexOf('energy')>-1){detectedType='energy';findings.push({icon:'✓',text:'Energy project detected',color:'var(--green)'})}
  else if(tl.indexOf('housing')>-1||tl.indexOf('residential')>-1||tl.indexOf('real estate')>-1){detectedType='realestate';findings.push({icon:'✓',text:'Real estate project detected',color:'var(--green)'})}
  else if(tl.indexOf('mining')>-1||tl.indexOf('gold')>-1||tl.indexOf('ore')>-1){detectedType='mining';findings.push({icon:'✓',text:'Mining project detected',color:'var(--green)'})}
  else if(text.length>100){findings.push({icon:'—',text:'Project type not auto-detected — you\'ll select it in the next step',color:'var(--muted2)'})}
  /* Detect amounts */
  var amtMatch=text.match(/(?:USD|EUR|GBP|RM|MYR|SGD)\s*[\d,\.]+\s*(?:billion|million|mil|B|M)/i);
  if(!amtMatch)amtMatch=text.match(/[\d,\.]+\s*(?:billion|million)/i);
  if(amtMatch){detectedAmount=amtMatch[0];findings.push({icon:'✓',text:'Funding amount found: '+detectedAmount,color:'var(--green)'})}
  /* Detect countries */
  var countries=['Malaysia','Singapore','Indonesia','Thailand','Philippines','China','India','UAE','Dubai','Saudi','Nigeria','Kenya','Ghana','Egypt','United Kingdom','United States','Australia'];
  countries.forEach(function(c){if(tl.indexOf(c.toLowerCase())>-1&&!detectedCountry){detectedCountry=c;findings.push({icon:'✓',text:'Project country: '+c,color:'var(--green)'})}});
  /* Detect key documents mentioned */
  if(tl.indexOf('feasibility')>-1)findings.push({icon:'✓',text:'Feasibility study referenced',color:'var(--green)'});
  if(tl.indexOf('government')>-1||tl.indexOf('sovereign')>-1)findings.push({icon:'✓',text:'Government/sovereign backing mentioned',color:'var(--green)'});
  if(tl.indexOf('offtake')>-1||tl.indexOf('concession')>-1||tl.indexOf('ppa')>-1)findings.push({icon:'✓',text:'Revenue agreement detected (offtake/concession/PPA)',color:'var(--green)'});
  if(tl.indexOf('sblc')>-1||tl.indexOf('letter of credit')>-1||tl.indexOf('mt760')>-1)findings.push({icon:'✓',text:'Financial instrument referenced (SBLC/LC)',color:'var(--gold)'});
  /* Check for missing items */
  if(tl.indexOf('feasibility')===-1&&tl.indexOf('business plan')===-1)findings.push({icon:'⚠',text:'No feasibility study or business plan detected — you\'ll need one',color:'#E06050'});
  if(!detectedAmount)findings.push({icon:'⚠',text:'Funding amount not detected — you\'ll enter it manually',color:'var(--gold)'});
  /* If no text extracted */
  if(text.length<50){
    findings=[
      {icon:'📄',text:'Document received — unable to extract text for deep analysis',color:'var(--muted2)'},
      {icon:'→',text:'You\'ll provide project details manually in the next steps',color:'var(--muted2)'},
      {icon:'✓',text:'Your document will be attached to the deal package',color:'var(--green)'},
    ];
  }
  /* Store detected values */
  wizState.analyzedType=detectedType;
  wizState.analyzedAmount=detectedAmount;
  wizState.analyzedCountry=detectedCountry;
  /* Render */
  var h='<div style="font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:6px">DEALEX analysis</div>';
  findings.forEach(function(f){
    h+='<div style="margin:3px 0"><span style="color:'+f.color+';margin-right:6px">'+f.icon+'</span>'+f.text+'</div>';
  });
  bodyEl.innerHTML=h;
  document.getElementById('wizDealFileStatus').textContent='✓ Analysis complete — '+findings.length+' items found';
  document.getElementById('wizDealFileStatus').style.color='var(--green)';
}

function wizDealContinue(){
  /* Pre-fill wizard from analysis if we detected anything */
  if(wizState.analyzedType){
    wizState.type=wizState.analyzedType;
    wizState.typeName=wizState.analyzedType.charAt(0).toUpperCase()+wizState.analyzedType.slice(1);
  }
  /* Skip to step 2 with pre-fills */
  var s0=document.getElementById('wizStep0');if(s0)s0.style.display='none';
  wizState.step=1;
  var s1=document.getElementById('wizStep1');if(s1)s1.style.display='block';
  wizUpdateDots();
  setTimeout(function(){
    if(wizState.analyzedAmount){
      var el=document.getElementById('wizAmount');if(el)el.value=wizState.analyzedAmount}
    if(wizState.analyzedCountry){
      var el=document.getElementById('wizCountry');if(el){for(var i=0;i<el.options.length;i++){if(el.options[i].value===wizState.analyzedCountry){el.selectedIndex=i;break}}}}
    var notice=document.getElementById('wizTemplateNotice');
    if(notice){notice.style.display='block';document.getElementById('wizTemplateDesc').textContent='Pre-filled from your uploaded document. Review and adjust as needed.'}
  },50);
  showT('✓ Deal loaded — review the details');
  window.scrollTo({top:0,behavior:'smooth'});
}

function wizDealClear(){
  document.getElementById('wizDealAnalysis').style.display='none';
  var zone=document.getElementById('wizDealDropZone');
  if(zone){zone.style.borderColor='var(--border-mid)';zone.style.borderStyle='dashed';zone.style.background='var(--panel)'}
  wizDealFiles=[];
  wizState.uploadedDeal=null;
  wizState.analyzedType='';
  wizState.analyzedAmount='';
  wizState.analyzedCountry='';
}

function wizSelectHumanitarian(){
  document.querySelectorAll('#wizStep0 .wiz-opt').forEach(function(o){o.classList.remove('sel')});
  event.currentTarget.classList.add('sel');
  var panel=document.getElementById('wizHumanitarianPanel');
  if(panel)panel.style.display='block';
  window.scrollTo({top:panel.offsetTop-60,behavior:'smooth'});
}

function hideHumanitarian(){
  var panel=document.getElementById('wizHumanitarianPanel');
  if(panel)panel.style.display='none';
  document.querySelectorAll('#wizStep0 .wiz-opt').forEach(function(o){o.classList.remove('sel')});
}

function wizUseTemplate(tplId){
  var tpl=wizTemplates[tplId];
  if(!tpl)return;
  wizState.type='humanitarian';
  wizState.typeName='Humanitarian — '+tpl.name;
  wizState.templateId=tplId;
  wizState.templatePhases=tpl.phases||'';
  /* Pre-fill step 2 fields */
  setTimeout(function(){
    var el;
    el=document.getElementById('wizProjectName');if(el)el.value=tpl.name;
    el=document.getElementById('wizCurrency');if(el)el.value=tpl.currency;
    el=document.getElementById('wizAmount');if(el)el.value=tpl.amount;
    el=document.getElementById('wizPurpose');if(el)el.value=tpl.purpose;
    el=document.getElementById('wizSovereign');if(el&&tpl.sovereign)el.value=tpl.sovereign;
    /* Show template notice */
    var notice=document.getElementById('wizTemplateNotice');
    if(notice){notice.style.display='block';document.getElementById('wizTemplateDesc').textContent='Template: '+tpl.name+'. Pre-filled — adjust for your specific project and country.'}
  },50);
  /* Advance to step 2 */
  var panel=document.getElementById('wizHumanitarianPanel');
  if(panel)panel.style.display='none';
  var cur=document.getElementById('wizStep0');
  if(cur)cur.style.display='none';
  wizState.step=1;
  var nxt=document.getElementById('wizStep1');
  if(nxt)nxt.style.display='block';
  wizUpdateDots();
  window.scrollTo({top:0,behavior:'smooth'});
  showT('✓ Template loaded — '+tpl.name);
}

function wizSelect(step,val,name){
  wizState.type=val;
  wizState.typeName=name;
  document.querySelectorAll('#wizStep0 .wiz-opt').forEach(function(o){o.classList.remove('sel')});
  event.currentTarget.classList.add('sel');
  setTimeout(function(){wizNext()},300);
}

function wizUpdateDots(){
  for(var i=0;i<5;i++){
    var dot=document.getElementById('wizDot'+i);
    if(!dot)continue;
    dot.className='wiz-dot';
    if(i<wizState.step)dot.classList.add('done');
    if(i===wizState.step)dot.classList.add('act');
  }
  var lines=document.querySelectorAll('#wizSteps .wiz-line');
  lines.forEach(function(l,i){l.className='wiz-line'+(i<wizState.step?' done':'')});
}

function wizNext(){
  if(wizState.step===0&&!wizState.type){showT('Pick a project type first');return}
  if(wizState.step===1){
    wizState.projectName=document.getElementById('wizProjectName').value;
    wizState.currency=document.getElementById('wizCurrency').value;
    wizState.amount=document.getElementById('wizAmount').value;
    wizState.purpose=document.getElementById('wizPurpose').value;
    if(!wizState.amount){showT('Enter an approximate amount');return}
  }
  if(wizState.step===2){
    wizState.country=document.getElementById('wizCountry').value;
    wizState.sponsor=document.getElementById('wizSponsor').value;
    wizState.sovereign=document.getElementById('wizSovereign').value;
    if(!wizState.country){showT('Enter the project country');return}
  }
  if(wizState.step===3){
    wizBuildResults();
  }
  var cur=document.getElementById('wizStep'+wizState.step);
  if(cur)cur.style.display='none';
  wizState.step++;
  if(wizState.step===3)wizInitChecklist();
  var nxt=document.getElementById('wizStep'+wizState.step);
  if(nxt)nxt.style.display='block';
  wizUpdateDots();
  window.scrollTo({top:0,behavior:'smooth'});
}

function wizBack(){
  var cur=document.getElementById('wizStep'+wizState.step);
  if(cur)cur.style.display='none';
  wizState.step--;
  var prv=document.getElementById('wizStep'+wizState.step);
  if(prv)prv.style.display='block';
  wizUpdateDots();
}

function wizBuildResults(){
  var el=document.getElementById('wizResults');if(!el)return;
  var amt=parseFloat((wizState.amount||'0').replace(/[^0-9.]/g,''))||0;
  var ccy=wizState.currency||'USD';
  var isSovereign=wizState.sovereign==='sovereign'||wizState.sovereign==='quasi'||wizState.sovereign==='letter';
  var isInfra=wizState.type==='infrastructure'||wizState.type==='energy'||wizState.type==='humanitarian';
  var isHumanitarian=wizState.type==='humanitarian';
  var checkedCount=0;var totalWeight=0;
  wizCheckItems.forEach(function(item){if(wizState.checks[item.id]){checkedCount++;totalWeight+=item.weight}});
  var maxWeight=0;wizCheckItems.forEach(function(item){maxWeight+=item.weight});
  var readiness=maxWeight>0?Math.min(100,Math.round((totalWeight/maxWeight)*100)):0;

  /* Recommend instrument */
  var instrument='SBLC (Standby Letter of Credit)';
  var instrumentDesc='The most common instrument for project funding of this scale. A bank issues a guarantee that can be monetized by the receiving side.';
  if(wizState.type==='trade'){instrument='DLC (Documentary Letter of Credit)';instrumentDesc='For trade finance, a documentary LC is the standard instrument — it directly backs a purchase/sale transaction.'}
  if(amt<1000000){instrument='Bank Guarantee (BG)';instrumentDesc='For smaller amounts, a simple bank guarantee may be more appropriate and faster to arrange than a full SBLC.'}
  if(amt>500000000&&isInfra){instrumentDesc='At this scale, the SBLC will likely need to be structured in tranches matching project phases, with a bridge jurisdiction for cross-border flows.'}

  /* Jurisdiction check */
  var country=(wizState.country||'').toLowerCase();
  var needsBridge=false;var bridgeNote='';
  var closedMarkets=['china','malaysia','india','indonesia','brazil','nigeria','south africa','russia','vietnam','thailand','philippines'];
  closedMarkets.forEach(function(c){if(country.indexOf(c)>-1)needsBridge=true});
  if(needsBridge){
    bridgeNote='Your project country has capital controls (Tier 2 closed market). You will likely need a bridge jurisdiction — typically Singapore, Hong Kong, or Dubai — for the SBLC to be confirmed and monetized before funds flow into the project.';
  }else{
    bridgeNote='Your project country is an open market. Direct SBLC transmission and monetization should be possible without a bridge jurisdiction.';
  }

  /* Risk flags */
  var risks=[];
  if(!isSovereign&&amt>100000000)risks.push({text:'No sovereign backing for a large project — banks will want additional guarantees',level:'amber'});
  if(checkedCount<3)risks.push({text:'Low readiness — you need more documentation before approaching a bank',level:'red'});
  if(needsBridge)risks.push({text:'Cross-border bridge required — adds 3-6% in friction costs',level:'amber'});
  if(!wizState.checks.bankrelation)risks.push({text:'No existing bank relationship — finding an issuing bank will take time',level:'red'});
  if(!wizState.checks.feasibility)risks.push({text:'No feasibility study — most banks require this before considering the deal',level:'amber'});
  if(isSovereign)risks.push({text:'Sovereign backing strengthens the deal significantly',level:'green'});
  if(wizState.checks.govapproval)risks.push({text:'Government approval in hand — this accelerates everything',level:'green'});
  if(checkedCount>=6)risks.push({text:'Good documentation readiness — you can move to deal structuring soon',level:'green'});

  /* Estimated cost */
  var bridgePct=needsBridge?'5-6%':'2-3%';
  var bridgeAmt=needsBridge?Math.round(amt*0.055):Math.round(amt*0.025);
  var fmtAmt=function(n){if(n>=1000000000)return(n/1000000000).toFixed(1)+'B';if(n>=1000000)return(n/1000000).toFixed(0)+'M';return n.toLocaleString()};

  var html='';
  /* Instrument */
  html+='<div class="wiz-result"><div class="wr-label">Recommended instrument</div><div class="wr-value">'+instrument+'</div><div class="wr-desc">'+instrumentDesc+'</div></div>';
  /* Structure */
  html+='<div class="wiz-result"><div class="wr-label">Deal structure</div><div class="wr-value">'+ccy+' '+fmtAmt(amt)+(needsBridge?' — Bridge required':' — Direct')+'</div><div class="wr-desc">'+bridgeNote+'</div></div>';
  /* Cost */
  html+='<div class="wiz-result"><div class="wr-label">Estimated deal costs</div><div class="wr-value">'+bridgePct+' ≈ '+ccy+' '+fmtAmt(bridgeAmt)+'</div><div class="wr-desc">Includes bank confirmation, structuring, FX conversion'+(needsBridge?', and bridge jurisdiction fees':'')+'.</div></div>';
  /* Readiness */
  html+='<div class="wiz-result"><div class="wr-label">Your readiness score</div><div class="wr-value" style="color:'+(readiness>=60?'var(--green)':readiness>=30?'var(--gold)':'#E06050')+'">'+readiness+'%</div>';
  html+='<div class="pb" style="margin:6px 0"><div class="pf" style="width:'+readiness+'%;background:'+(readiness>=60?'var(--green)':readiness>=30?'var(--gold)':'#E06050')+'"></div></div>';
  html+='<div class="wr-desc">'+checkedCount+' of '+wizCheckItems.length+' items checked. '+(readiness>=60?'You\'re in good shape to start.':readiness>=30?'A few more items would strengthen your position.':'You need more preparation before approaching funders.')+'</div></div>';
  /* Risks */
  if(risks.length>0){
    html+='<div class="wiz-result"><div class="wr-label">Risk assessment</div>';
    risks.forEach(function(r){html+='<div style="margin:4px 0"><span class="wiz-risk '+r.level+'">'+(r.level==='green'?'✓':r.level==='amber'?'⚠':'✕')+'</span><span style="font-size:10px;color:var(--txt)">'+r.text+'</span></div>'});
    html+='</div>';
  }
  /* Template phases (if using a humanitarian template) */
  if(wizState.templatePhases){
    html+='<div class="wiz-result" style="border-color:var(--green)"><div class="wr-label">Project phases</div>';
    html+='<div class="wr-desc" style="line-height:2">';
    var phases=wizState.templatePhases.split('→');
    phases.forEach(function(p,i){
      var clr=i===0?'var(--gold)':i<phases.length-1?'var(--txt)':'var(--green)';
      html+='<span style="display:inline-block;margin:2px 4px 2px 0;padding:4px 10px;background:var(--obs);border:1px solid var(--border);font-size:9px;color:'+clr+'">'+(i+1)+'. '+p.trim()+'</span>';
      if(i<phases.length-1)html+='<span style="color:var(--gold);font-size:10px">→</span> ';
    });
    html+='</div>';
    html+='<div style="font-size:9px;color:var(--muted2);margin-top:6px">Each phase can be structured as a separate SBLC tranche with its own DOA and bank package. DEALEX manages the full lifecycle.</div>';
    html+='</div>';
  }
  /* Humanitarian note */
  if(isHumanitarian){
    html+='<div class="wiz-result" style="border-color:var(--green)"><div class="wr-label">Humanitarian project note</div>';
    html+='<div class="wr-desc" style="line-height:1.7">Humanitarian and development projects often qualify for additional support: development bank co-financing (ADB, AIIB, IsDB, IFC), concessional interest rates, blended finance structures, and sovereign guarantee enhancements. DEALEX can structure the SBLC to work alongside these funding sources.</div></div>';
  }
  /* Next steps */
  html+='<div class="wiz-result" style="border-color:var(--gold)"><div class="wr-label">What happens next</div><div class="wr-desc" style="line-height:1.8">';
  html+='<strong style="color:var(--white)">1.</strong> Sign an NCNDA with DEALEX to protect your project details.<br>';
  html+='<strong style="color:var(--white)">2.</strong> DEALEX matches you with a verified sender who can issue the '+instrument+'.<br>';
  html+='<strong style="color:var(--white)">3.</strong> Both sides complete KYC and the deal flows through DEALEX\'s secure workflow.<br>';
  html+='<strong style="color:var(--white)">4.</strong> Instruments are transmitted bank-to-bank via SWIFT. Funds are disbursed to your project.</div></div>';

  el.innerHTML=html;
}

function generateWizardPitchDeck(){
  var repName=document.getElementById('pitchRepName').value.trim();
  var repTitle=document.getElementById('pitchRepTitle').value.trim();
  var repCompany=document.getElementById('pitchRepCompany').value.trim();
  var repEmail=document.getElementById('pitchRepEmail').value.trim();
  var repPhone=document.getElementById('pitchRepPhone').value.trim();
  var repCountry=document.getElementById('pitchRepCountry').value.trim();
  var tagline=document.getElementById('pitchTagline').value.trim();
  var selling=document.getElementById('pitchSelling').value.trim();
  var timeline=document.getElementById('pitchTimeline').value.trim();
  if(!repName){showT('Enter the representative name');return}
  if(!repCompany){showT('Enter the company or organization');return}
  var v=function(x){return x||'—'};
  var s=wizState;
  var ref=dealRef||'DRAFT';
  var amt=s.amount||'—';
  var ccy=s.currency||'USD';
  /* Readiness */
  var checked=0;var total=wizCheckItems.length;
  wizCheckItems.forEach(function(item){if(s.checks[item.id])checked++});
  var readinessPct=total>0?Math.round((checked/total)*100):0;
  /* Sponsor label */
  var sponsorEl=document.getElementById('wizSponsor');
  var sponsorLabel=sponsorEl?sponsorEl.options[sponsorEl.selectedIndex].text:'—';
  var sovereignEl=document.getElementById('wizSovereign');
  var sovereignLabel=sovereignEl?sovereignEl.options[sovereignEl.selectedIndex].text:'—';
  /* Build deck as HTML */
  var w=openDocWindow();
  var d=w.document;
  d.write('<!DOCTYPE html><html><head><title>DEALEX Pitch Deck — '+v(s.projectName)+'</title>');
  d.write('<style>');
  d.write('*{margin:0;padding:0;box-sizing:border-box}');
  d.write('@page{size:landscape;margin:0}');
  d.write('body{font-family:Georgia,serif;color:#111;background:#fff}');
  d.write('.slide{width:100%;min-height:100vh;padding:60px 80px;position:relative;page-break-after:always;display:flex;flex-direction:column;justify-content:center}');
  d.write('.slide:last-child{page-break-after:auto}');
  d.write('.dark{background:#0A0A0A;color:#fff}');
  d.write('.gold{color:#3B49DF}');
  d.write('.green{color:#2A8050}');
  d.write('.muted{color:#888}');
  d.write('.topbar{position:absolute;top:0;left:0;right:0;height:4px;background:#3B49DF}');
  d.write('.footer{position:absolute;bottom:20px;left:80px;right:80px;display:flex;justify-content:space-between;font-size:9px;color:#555;border-top:1px solid #ddd;padding-top:8px}');
  d.write('.dfooter{position:absolute;bottom:20px;left:80px;right:80px;display:flex;justify-content:space-between;font-size:9px;color:#555;border-top:1px solid #333;padding-top:8px}');
  d.write('h1{font-size:48px;font-weight:700;line-height:1.1;margin-bottom:12px}');
  d.write('h2{font-size:32px;font-weight:600;margin-bottom:8px}');
  d.write('h3{font-size:18px;font-weight:600;margin-bottom:6px}');
  d.write('.sub{font-size:14px;color:#888;margin-bottom:20px;letter-spacing:.1em;text-transform:uppercase}');
  d.write('.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0}');
  d.write('.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin:20px 0}');
  d.write('.card{background:#f8f8f5;border:1px solid #e5e5e0;padding:20px}');
  d.write('.dcard{background:#141414;border:1px solid #333;padding:20px}');
  d.write('.stat{font-size:36px;font-weight:700;margin-bottom:4px}');
  d.write('.stlbl{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.06em}');
  d.write('table{width:100%;border-collapse:collapse;margin:12px 0}');
  d.write('td{padding:8px 12px;border:1px solid #e5e5e0;font-size:12px;font-family:Calibri,sans-serif}');
  d.write('td:first-child{font-weight:600;width:35%;background:#fafaf6;color:#555}');
  d.write('.dtd{border-color:#333}td.dtf{background:#1A1A1A;color:#888}');
  d.write('.check{display:inline-block;width:14px;height:14px;border:1.5px solid #ccc;text-align:center;font-size:10px;line-height:14px;margin-right:6px}');
  d.write('.check.on{background:#2A8050;border-color:#2A8050;color:#fff}');
  d.write('.pill{display:inline-block;padding:3px 10px;font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}');
  d.write('.pill.gold{background:rgba(59,73,223,.12);color:#3B49DF;border:1px solid rgba(59,73,223,.3)}');
  d.write('.pill.green{background:rgba(42,128,80,.12);color:#2A8050;border:1px solid rgba(42,128,80,.3)}');
  d.write('.pill.red{background:rgba(208,64,48,.12);color:#D04030;border:1px solid rgba(208,64,48,.3)}');
  d.write('</style></head><body>');

  /* SLIDE 1: Title */
  d.write('<div class="slide dark"><div class="topbar"></div>');
  d.write('<h1 class="gold">'+v(s.projectName)+'</h1>');
  if(tagline)d.write('<p style="font-size:22px;color:#fff;font-style:italic;margin-bottom:16px">'+tagline+'</p>');
  d.write('<p class="sub">'+v(ccy)+' '+v(amt)+' · '+v(s.typeName)+' · '+v(s.country)+'</p>');
  d.write('<p style="font-size:13px;color:#aaa;margin-top:30px">Prepared by <strong style="color:#fff">'+v(repName)+'</strong>'+( repTitle?' · '+repTitle:'')+( repCompany?'<br>'+repCompany:'')+'</p>');
  d.write('<div class="dfooter"><span>CONFIDENTIAL · DEALEX SECURE DEAL PLATFORM</span><span>Ref: '+ref+'</span></div>');
  d.write('</div>');

  /* SLIDE 2: Project Overview */
  d.write('<div class="slide"><div class="topbar"></div>');
  d.write('<h2>Project overview</h2>');
  d.write('<table>');
  d.write('<tr><td>Project name</td><td>'+v(s.projectName)+'</td></tr>');
  d.write('<tr><td>Type</td><td>'+v(s.typeName)+'</td></tr>');
  d.write('<tr><td>Funding required</td><td>'+v(ccy)+' '+v(amt)+'</td></tr>');
  d.write('<tr><td>Purpose</td><td>'+v(s.purpose)+'</td></tr>');
  d.write('<tr><td>Country</td><td>'+v(s.country)+'</td></tr>');
  d.write('<tr><td>Sponsor type</td><td>'+sponsorLabel+'</td></tr>');
  d.write('<tr><td>Government support</td><td>'+sovereignLabel+'</td></tr>');
  if(timeline)d.write('<tr><td>Target completion</td><td>'+timeline+'</td></tr>');
  d.write('<tr><td>Deal reference</td><td>'+ref+'</td></tr>');
  d.write('</table>');
  if(selling)d.write('<div style="background:#f8f8f5;border-left:3px solid #3B49DF;padding:14px;margin-top:16px;font-size:13px;font-family:Calibri,sans-serif;line-height:1.7">'+selling+'</div>');
  d.write('<div class="footer"><span>CONFIDENTIAL</span><span>'+v(repCompany)+'</span></div>');
  d.write('</div>');

  /* SLIDE 3: Funding Structure */
  d.write('<div class="slide"><div class="topbar"></div>');
  d.write('<h2>Recommended funding structure</h2>');
  /* Get instrument recommendation */
  var instAmt=parseFloat((amt||'0').replace(/[^0-9.]/g,''))||0;
  var instrument='SBLC (Standby Letter of Credit)';
  if(s.type==='trade')instrument='DLC (Documentary Letter of Credit)';
  if(instAmt<1000000)instrument='Bank Guarantee (BG)';
  var country=(s.country||'').toLowerCase();
  var needsBridge=false;
  ['china','malaysia','india','indonesia','brazil','nigeria','south africa','russia','vietnam','thailand','philippines'].forEach(function(c){if(country.indexOf(c)>-1)needsBridge=true});
  d.write('<div class="grid3">');
  d.write('<div class="card"><div class="stlbl">Instrument</div><div class="stat" style="font-size:20px;color:#3B49DF">'+instrument+'</div></div>');
  d.write('<div class="card"><div class="stlbl">Structure</div><div class="stat" style="font-size:20px;color:'+(needsBridge?'#D85A30':'#2A8050')+'">'+(needsBridge?'Bridge Required':'Direct')+'</div></div>');
  d.write('<div class="card"><div class="stlbl">Est. deal cost</div><div class="stat" style="font-size:20px">'+(needsBridge?'5-6%':'2-3%')+'</div></div>');
  d.write('</div>');
  if(needsBridge){
    d.write('<div style="background:#FFF8F0;border:1px solid #F0C080;padding:14px;font-size:12px;font-family:Calibri,sans-serif;line-height:1.7"><strong>Bridge jurisdiction required.</strong> '+v(s.country)+' has capital controls (Tier 2 closed market). A Tier 1 open-market intermediary — typically Singapore, Hong Kong, or Dubai — is needed for SBLC confirmation and monetization before funds flow to the project.</div>');
  }
  if(s.templatePhases){
    d.write('<h3 style="margin-top:20px">Project phases</h3>');
    d.write('<div style="font-size:12px;font-family:Calibri,sans-serif;line-height:2">');
    var phases=s.templatePhases.split('→');
    phases.forEach(function(p,i){
      d.write('<span style="display:inline-block;margin:3px;padding:5px 12px;background:#f0f0ec;border:1px solid #ddd;font-size:11px">'+(i+1)+'. '+p.trim()+'</span>');
      if(i<phases.length-1)d.write(' → ');
    });
    d.write('</div>');
    d.write('<p style="font-size:11px;color:#888;margin-top:8px;font-family:Calibri,sans-serif">Each phase structured as a separate SBLC tranche with its own DOA and bank package.</p>');
  }
  d.write('<div class="footer"><span>CONFIDENTIAL</span><span>'+v(repCompany)+'</span></div>');
  d.write('</div>');

  /* SLIDE 4: Readiness Assessment */
  d.write('<div class="slide"><div class="topbar"></div>');
  d.write('<h2>Readiness assessment</h2>');
  d.write('<div class="grid">');
  d.write('<div class="card" style="text-align:center"><div class="stlbl">Readiness score</div><div class="stat" style="color:'+(readinessPct>=60?'#2A8050':readinessPct>=30?'#3B49DF':'#D04030')+'">'+readinessPct+'%</div><div class="stlbl">'+checked+' of '+total+' items confirmed</div></div>');
  d.write('<div class="card" style="text-align:center"><div class="stlbl">Deal reference</div><div class="stat gold" style="font-size:24px">'+ref+'</div><div class="stlbl">DEALEX Platform</div></div>');
  d.write('</div>');
  d.write('<div style="columns:2;gap:20px;margin-top:16px">');
  wizCheckItems.forEach(function(item){
    var on=s.checks[item.id];
    d.write('<div style="font-size:11px;font-family:Calibri,sans-serif;margin-bottom:6px;break-inside:avoid"><span class="check'+(on?' on':'')+'">✓</span>'+item.label+'</div>');
  });
  d.write('</div>');
  d.write('<div class="footer"><span>CONFIDENTIAL</span><span>'+v(repCompany)+'</span></div>');
  d.write('</div>');

  /* SLIDE 5: Deal Representative & Contact */
  d.write('<div class="slide dark"><div class="topbar"></div>');
  d.write('<h2 class="gold">Deal representative</h2>');
  d.write('<div style="margin:24px 0">');
  d.write('<p style="font-size:28px;font-weight:700;color:#fff;margin-bottom:4px">'+v(repName)+'</p>');
  if(repTitle)d.write('<p style="font-size:16px;color:#3B49DF;margin-bottom:4px">'+repTitle+'</p>');
  if(repCompany)d.write('<p style="font-size:14px;color:#aaa;margin-bottom:16px">'+repCompany+'</p>');
  d.write('<table style="max-width:500px">');
  if(repEmail)d.write('<tr><td class="dtd dtf">Email</td><td class="dtd" style="color:#fff">'+repEmail+'</td></tr>');
  if(repPhone)d.write('<tr><td class="dtd dtf">Phone</td><td class="dtd" style="color:#fff">'+repPhone+'</td></tr>');
  if(repCountry)d.write('<tr><td class="dtd dtf">Country</td><td class="dtd" style="color:#fff">'+repCountry+'</td></tr>');
  d.write('<tr><td class="dtd dtf">Deal role</td><td class="dtd" style="color:#fff">'+(s.acctRole==='broker'?'Introducer / Broker':s.acctRole==='mandate'?'Authorized Mandate':s.acctRole==='advisor'?'Deal Advisor':'Project Owner')+'</td></tr>');
  d.write('<tr><td class="dtd dtf">Deal reference</td><td class="dtd" style="color:#3B49DF;font-weight:700">'+ref+'</td></tr>');
  d.write('</table>');
  d.write('</div>');

  /* Next steps */
  d.write('<div style="margin-top:30px">');
  d.write('<h3 style="color:#3B49DF;margin-bottom:12px">Next steps</h3>');
  d.write('<div style="font-size:13px;font-family:Calibri,sans-serif;color:#ccc;line-height:2">');
  d.write('1. Sign NCNDA with DEALEX to protect project details<br>');
  d.write('2. DEALEX matches with a verified sender capable of issuing the '+instrument+'<br>');
  d.write('3. Both sides complete KYC — banking details secured on-platform<br>');
  d.write('4. Instruments transmitted bank-to-bank via SWIFT — funds disbursed to project');
  d.write('</div></div>');

  d.write('<div class="dfooter"><span style="color:#D04030">CONFIDENTIAL · NOT FOR DISTRIBUTION</span><span style="color:#555">Facilitated via DEALEX · dealex.io</span></div>');
  d.write('</div>');

  d.write('</body></html>');
  d.close();
  showT('✓ Pitch deck generated — print or save as PDF');
}

function wizStartDeal(){
  D.currency=wizState.currency||'USD';
  D.faceValue=wizState.amount;
  if(wizState.projectName)D.benCompany=wizState.projectName;
  showT('✓ Wizard complete — starting your deal flow');
  navTo('desk');
}

function wizSaveDeal(){
  var name=document.getElementById('wizAcctName').value.trim();
  var email=document.getElementById('wizAcctEmail').value.trim();
  var role=document.getElementById('wizAcctRole').value;
  var terms=document.getElementById('wizTerms').checked;
  if(!name){showT('Enter your full name');return}
  if(!email||email.indexOf('@')<1){showT('Enter a valid email address');return}
  if(!role){showT('Select your role in this deal');return}
  if(!terms){showT('You must agree to the platform terms');return}
  if(role==='broker'){
    var co=document.getElementById('wizBrokerCompany').value.trim();
    var src=document.getElementById('wizBrokerSource').value;
    if(!co){showT('Enter your brokerage company name');return}
    if(!src){showT('Tell us how you sourced this deal');return}
    wizState.brokerCompany=co;
    wizState.brokerSource=src;
  }
  if(role==='mandate'){
    var auth=document.getElementById('wizMandateAuth').value.trim();
    if(!auth){showT('Enter who authorized you');return}
    wizState.mandateAuth=auth;
  }
  wizState.acctName=name;
  wizState.acctEmail=email;
  wizState.acctRole=role;

  /* Generate deal reference */
  if(!dealRef)genDealRef();
  wizState.dealRef=dealRef;

  /* Build deal package (in production this POSTs to backend) */
  var dealPackage={
    ref:dealRef,
    created:new Date().toISOString(),
    project:{type:wizState.typeName,name:wizState.projectName,country:wizState.country,currency:wizState.currency,amount:wizState.amount,purpose:wizState.purpose,sponsor:wizState.sponsor,sovereign:wizState.sovereign},
    readiness:wizState.checks,
    account:{name:name,email:email,role:role},
    broker:role==='broker'?{company:wizState.brokerCompany,source:wizState.brokerSource}:null,
    mandate:role==='mandate'?{authorizedBy:wizState.mandateAuth}:null,
  };
  console.log('DEAL SAVED:',JSON.stringify(dealPackage,null,2));

  /* Show confirmation */
  document.getElementById('wizAccountGate').style.display='none';
  document.getElementById('wizSaved').style.display='block';
  document.getElementById('wizDealRefDisplay').textContent=dealRef;

  var roleLabel={owner:'project owner',mandate:'authorized mandate',broker:'attached broker',advisor:'deal advisor'}[role]||role;
  var msg='Your deal has been saved and you\'ve been registered as the <strong style="color:var(--gold)">'+roleLabel+'</strong>.';
  if(role==='broker')msg+=' You\'ll be notified at every stage of this deal. If it closes, your commission is protected under the IMFPA.';
  if(role==='mandate')msg+=' You\'ll need to provide your Mandate Authorization Letter in the deal flow.';
  msg+='<br><br>A confirmation has been sent to <strong style="color:var(--white)">'+email+'</strong>.';
  document.getElementById('wizSavedMsg').innerHTML=msg;

  showT('✓ Deal saved — account created');
}

/* Toggle broker/mandate fields based on role selection */
document.addEventListener('DOMContentLoaded',function(){
  var roleSelect=document.getElementById('wizAcctRole');
  if(roleSelect){
    roleSelect.addEventListener('change',function(){
      var v=this.value;
      var bf=document.getElementById('wizBrokerFields');
      var mf=document.getElementById('wizMandateFields');
      if(bf)bf.style.display=v==='broker'?'block':'none';
      if(mf)mf.style.display=v==='mandate'?'block':'none';
    });
  }
});

/* ═══════════════════════════════════════════════════════
   COMMODITY DESK
   ═══════════════════════════════════════════════════════ */
var cmdDocs=[];
function cmdEntry(role){
  ['seller','buyer','broker'].forEach(function(r){
    var el=document.getElementById('cmd-'+r);
    if(el){el.style.borderColor=r===role||( role==='broker'&&r==='seller')?'var(--gold)':'';el.style.background=r===role||(role==='broker'&&r==='seller')?'var(--gold-a15)':''}
  });
  var sf=document.getElementById('cmdSellerFlow');
  var bf=document.getElementById('cmdBuyerFlow');
  if(sf)sf.style.display=(role==='seller'||role==='broker')?'block':'none';
  if(bf)bf.style.display=role==='buyer'?'block':'none';
  showT('Commodity Desk — '+(role==='broker'?'Broker (seller side)':role));
}
function handleCmdDocs(files){
  if(!files)return;
  for(var i=0;i<files.length;i++)cmdDocs.push(files[i]);
  renderCmdDocs();
}
function renderCmdDocs(){
  var el=document.getElementById('cmdDocList');
  var pill=document.getElementById('cmdDocPill');
  if(!el)return;
  if(cmdDocs.length===0){el.innerHTML='';if(pill)pill.textContent='0 files';return}
  if(pill){pill.textContent=cmdDocs.length+' files';pill.className='pill pg'}
  var h='';
  cmdDocs.forEach(function(f,i){
    var ext=f.name.split('.').pop().toUpperCase();
    var sz=f.size>1048576?(f.size/1048576).toFixed(1)+'MB':(f.size/1024).toFixed(0)+'KB';
    h+='<div style="display:flex;align-items:center;gap:8px;padding:5px 8px;background:var(--obs);border:1px solid var(--border);margin-bottom:3px">';
    h+='<span style="font-size:7px;font-weight:700;color:var(--gold);width:32px;text-align:center;border:1px solid rgba(59,73,223,.3);padding:2px">'+ext+'</span>';
    h+='<span style="flex:1;font-size:9px;color:var(--white);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+f.name+'</span>';
    h+='<span style="font-size:8px;color:var(--muted)">'+sz+'</span>';
    h+='<span style="font-size:8px;color:var(--muted);cursor:pointer;padding:2px 6px" onclick="cmdDocs.splice('+i+',1);renderCmdDocs()">✕</span></div>';
  });
  el.innerHTML=h;
}
function updateCmdCheck(){
  var checks=document.querySelectorAll('#cmdSellerFlow .wiz-check.on');
  var total=document.querySelectorAll('#cmdSellerFlow .wiz-check').length;
  var pill=document.getElementById('cmdCheckPill');
  if(pill){
    if(checks.length>=11)      {pill.textContent='Ready';pill.className='pill pg'}
    else if(checks.length>=6)  {pill.textContent=checks.length+'/'+total;pill.className='pill po'}
    else                       {pill.textContent=checks.length+'/'+total;pill.className='pill pr'}
  }
}
function generateCommodityDeck(){
  var type=document.getElementById('cmdType');
  var typeLabel=type?type.options[type.selectedIndex].text:'—';
  var qty=document.getElementById('cmdQty').value||'—';
  var unit=document.getElementById('cmdUnit').value||'MT';
  var grade=document.getElementById('cmdGrade').value||'—';
  var origin=document.getElementById('cmdOrigin').value||'—';
  var location=document.getElementById('cmdLocation').value||'—';
  var price=document.getElementById('cmdPrice').value||'—';
  var ccy=document.getElementById('cmdCurrency').value||'USD';
  var inco=document.getElementById('cmdIncoterms');
  var incoLabel=inco?inco.options[inco.selectedIndex].text:'—';
  var port=document.getElementById('cmdPort').value||'—';
  if(!type||!type.value){showT('Select a commodity type');return}
  if(!qty||qty==='—'){showT('Enter the quantity');return}
  /* Gather payment preferences */
  var payments=[];
  document.querySelectorAll('#cmdSellerFlow [data-pay]').forEach(function(el){
    if(el.classList.contains('on'))payments.push(el.querySelector('strong').textContent);
  });
  var ref=dealRef||'CMD-'+Date.now().toString(36).toUpperCase();
  var totalValue=parseFloat((qty||'0').replace(/[^0-9.]/g,''))*parseFloat((price||'0').replace(/[^0-9.]/g,''));
  var fmtVal=totalValue>0?(ccy+' '+(totalValue>=1000000?(totalValue/1000000).toFixed(2)+'M':totalValue.toLocaleString())):'TBD';
  /* Generate deck */
  var w=openDocWindow();
  var d=w.document;
  d.write('<!DOCTYPE html><html><head><title>Commodity Deal Package — '+typeLabel+'</title>');
  d.write('<style>*{margin:0;padding:0;box-sizing:border-box}@page{margin:40px 50px}body{font-family:Georgia,serif;color:#111;padding:40px 50px}h1{font-size:28px;color:#3B49DF;margin-bottom:4px}h2{font-size:18px;margin:20px 0 8px;color:#333;border-bottom:1px solid #e5e5e0;padding-bottom:4px}.sub{font-size:12px;color:#888;margin-bottom:20px}table{width:100%;border-collapse:collapse;margin:10px 0}td{padding:6px 10px;border:1px solid #e5e5e0;font-size:11px;font-family:Calibri,sans-serif}td:first-child{font-weight:600;width:35%;background:#fafaf6;color:#555}.tag{display:inline-block;padding:3px 8px;font-size:9px;font-weight:700;letter-spacing:.06em;margin:2px}.tag.green{background:#e8f5e0;color:#2a8050;border:1px solid #c0dd97}.tag.gold{background:#faeeda;color:#8a6520;border:1px solid #e8cc7a}.tag.gray{background:#f0f0ec;color:#555;border:1px solid #ddd}.warn{background:#fff8f0;border-left:3px solid #3B49DF;padding:10px 14px;font-size:11px;font-family:Calibri,sans-serif;margin:12px 0;line-height:1.6}.ft{margin-top:28px;text-align:center;font-size:8px;color:#999;border-top:1px solid #eee;padding-top:8px}ul{margin:6px 0 6px 20px;font-size:11px;font-family:Calibri,sans-serif;line-height:1.8}</style></head><body>');
  d.write('<h1>'+typeLabel+' — Seller\'s Deal Package</h1>');
  d.write('<div class="sub">'+qty+' '+unit+' · '+origin+' · '+incoLabel+' · Ref: '+ref+'</div>');
  /* Commodity spec */
  d.write('<h2>Commodity specification</h2>');
  d.write('<table><tr><td>Commodity</td><td>'+typeLabel+'</td></tr>');
  d.write('<tr><td>Quantity</td><td>'+qty+' '+unit+'</td></tr>');
  d.write('<tr><td>Grade / Specification</td><td>'+grade+'</td></tr>');
  d.write('<tr><td>Origin</td><td>'+origin+'</td></tr>');
  d.write('<tr><td>Location / Stockpile</td><td>'+location+'</td></tr>');
  d.write('<tr><td>Incoterms</td><td>'+incoLabel+'</td></tr>');
  d.write('<tr><td>Port of loading</td><td>'+port+'</td></tr>');
  d.write('<tr><td>Price</td><td>'+ccy+' '+price+' per '+unit+'</td></tr>');
  d.write('<tr><td>Total estimated value</td><td><strong>'+fmtVal+'</strong></td></tr>');
  d.write('<tr><td>Inspection body</td><td>CCIC / SGS / Independent lab</td></tr></table>');
  /* Payment terms */
  d.write('<h2>Payment terms (seller\'s preference)</h2>');
  if(payments.length>0){
    d.write('<div style="margin:8px 0">');
    payments.forEach(function(p,i){d.write('<div style="margin:4px 0"><span class="tag '+(i===0?'green':'gold')+'">'+(i===0?'PREFERRED':'ACCEPTED')+'</span> '+p+'</div>')});
    d.write('</div>');
  }else{d.write('<p style="font-size:11px;font-family:Calibri,sans-serif;color:#888">No payment preference selected — to be negotiated.</p>')}
  d.write('<div class="warn"><strong>Payment options explained:</strong><br>TT Wire (MT103) = fastest, direct bank transfer · DLC at Sight (MT700) = bank-guaranteed on document presentation · DLC Deferred = bank-guaranteed, payment in 30-90 days · SBLC-backed = guarantee + wire · D/P Collection = documents through banks, no guarantee</div>');
  /* Documents attached */
  d.write('<h2>Documents on file ('+cmdDocs.length+')</h2>');
  if(cmdDocs.length>0){
    d.write('<ul>');
    cmdDocs.forEach(function(f){d.write('<li>'+f.name+' ('+( f.size>1048576?(f.size/1048576).toFixed(1)+'MB':(f.size/1024).toFixed(0)+'KB')+')</li>')});
    d.write('</ul>');
  }else{d.write('<p style="font-size:11px;font-family:Calibri,sans-serif;color:#888">No documents uploaded yet.</p>')}
  /* What buyer needs to provide */
  d.write('<h2>What the buyer needs to provide</h2>');
  d.write('<ul><li><strong>NCNDA</strong> — signed before any seller details are disclosed</li>');
  d.write('<li><strong>Buyer\'s CIS / KYC</strong> — passport, company registration, proof of address</li>');
  d.write('<li><strong>Buyer\'s bank details</strong> — issuing bank for LC, or sending bank for wire</li>');
  d.write('<li><strong>Bank Comfort Letter (BCL)</strong> — confirms buyer can open LC for the value</li>');
  d.write('<li><strong>Purchase order or LOI</strong> — confirms intent to buy at stated terms</li>');
  d.write('<li><strong>Destination port</strong> — for shipping and insurance quotes</li></ul>');
  /* Deal structure */
  d.write('<h2>Deal structure via DEALEX</h2>');
  d.write('<ul><li><strong>Step 1:</strong> Both sides sign NCNDA on DEALEX</li>');
  d.write('<li><strong>Step 2:</strong> Seller submits CIS/KYC to DEALEX (not to buyer)</li>');
  d.write('<li><strong>Step 3:</strong> Buyer submits CIS/KYC to DEALEX (not to seller)</li>');
  d.write('<li><strong>Step 4:</strong> IMFPA signed — commissions locked for all parties</li>');
  d.write('<li><strong>Step 5:</strong> Buyer\'s bank issues DLC/MT700 to seller\'s bank</li>');
  d.write('<li><strong>Step 6:</strong> Seller ships and presents documents (B/L, COO, CCIC, invoice)</li>');
  d.write('<li><strong>Step 7:</strong> Seller\'s bank claims payment under DLC</li></ul>');
  d.write('<div class="warn"><strong>DEALEX as paymaster:</strong> If selected, commissions are disbursed by DEALEX directly. No party sees anyone else\'s bank details. Broker\'s sources are permanently protected.</div>');
  d.write('<div class="ft">CONFIDENTIAL · DEALEX Commodity Desk · '+new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})+'<br>Ref: '+ref+'</div>');
  d.write('</body></html>');
  d.close();
  showT('✓ Seller deal package generated');
}

function toggleTheme(){
  var isLight=document.body.classList.toggle('light');
  /* Landing page button still uses emoji — update that one only.
     The app topbar button (#themeBtn) uses CSS-based SVG icon swap
     (body.light shows sun, dark shows moon) — no JS manipulation needed. */
  var lbtn=document.getElementById('landingThemeBtn');
  if(lbtn)lbtn.textContent=isLight?'☀️':'🌙';
  try{localStorage.setItem('dealex-theme',isLight?'light':'dark')}catch(e){}
}
/* Restore saved theme on load */
(function(){try{if(localStorage.getItem('dealex-theme')==='light'){document.body.classList.add('light');setTimeout(function(){var lbtn=document.getElementById('landingThemeBtn');if(lbtn)lbtn.textContent='☀️'},0)}}catch(e){}}());

/* ═══════════════════════════════════════════════════════
   DOA UPLOAD & PARSING
   ═══════════════════════════════════════════════════════ */
function handleDOA(file,zone){
  if(!file)return;
  var name=file.name||'',ext=name.split('.').pop().toUpperCase();
  if(ext!=='PDF'&&ext!=='DOCX'&&ext!=='DOC'){showT('Please upload a .docx or .pdf file');return}
  /* Show parsing state on both zones */
  ['doaZone1','doaZone2'].forEach(function(id){
    var z=document.getElementById(id);if(!z)return;
    z.style.borderColor='var(--gold)';z.style.background='var(--gold-a15)';
    z.innerHTML='<div style="font-size:9px;color:var(--gold);font-weight:600;margin-bottom:8px">⚡ Extracting fields from '+name+'...</div><div class="pb"><div class="pf" id="pbar-'+id+'" style="width:0%;background:var(--gold)"></div></div><div id="pstatus-'+id+'" style="font-size:8px;color:var(--muted2);margin-top:6px">Loading parser...</div>';
  });
  var phases=['Reading document...','Extracting text...','Identifying parties...','Mapping fields...','Detecting instrument type...','Running audit...'];
  var phaseIdx=0;
  /* Cycle status messages honestly — no fake percentage */
  var tk=setInterval(function(){
    if(phaseIdx<phases.length-1)phaseIdx++;
    ['pstatus-doaZone1','pstatus-doaZone2'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=phases[phaseIdx]});
    /* Indeterminate animation: pulse bar between 20% and 80% */
    ['pbar-doaZone1','pbar-doaZone2'].forEach(function(id){var el=document.getElementById(id);if(el){var w=el._dir?parseFloat(el.style.width||0)-5:parseFloat(el.style.width||0)+5;if(w>=80)el._dir=true;if(w<=20)el._dir=false;el.style.width=w+'%'}});
  },500);

  doaExtractText(file,function(text){
    clearInterval(tk);
    ['pbar-doaZone1','pbar-doaZone2'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.width='100%'});
    ['pstatus-doaZone1','pstatus-doaZone2'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent='Complete — building audit report...'});
    setTimeout(function(){
      var fields=exFields(text);
      var instType=detectInstrument(text);
      var cnt=0,extracted={},missing=[];
      if(!dealRef)genDealRef();
      for(var k in fields){if(fields[k]&&String(fields[k]).length>1){D[k]=fields[k];cnt++;extracted[k]=fields[k]}}
      /* Build audit */
      var audit=buildAudit(extracted,instType,name,ext,cnt);
      /* Update drop zones */
      ['doaZone1','doaZone2'].forEach(function(id){
        var z=document.getElementById(id);if(!z)return;
        z.style.borderColor='rgba(42,128,80,.5)';z.style.background='var(--green-a)';
        z.innerHTML='<div style="display:flex;align-items:center;gap:12px;text-align:left;width:100%"><div style="font-size:7px;font-weight:700;color:var(--green);width:44px;height:54px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(42,128,80,.4);flex-shrink:0"><span>'+ext+'</span><div style="width:26px;height:1px;background:rgba(42,128,80,.3);margin:3px 0"></div><span style="color:var(--green)">✓</span></div><div style="flex:1;min-width:0"><div style="font-size:10px;font-weight:600;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+name+'</div><div style="font-size:8px;color:var(--green);margin-top:2px">✓ '+cnt+' fields extracted · '+instType+'</div></div><button onclick="event.stopPropagation();resetDOA()" style="flex-shrink:0;padding:6px 12px;font-size:7.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-family:Montserrat,sans-serif;background:transparent;border:1px solid var(--border-mid);color:var(--muted2);cursor:pointer;transition:all .15s" onmouseover="this.style.borderColor=\'var(--gold)\';this.style.color=\'var(--gold)\'" onmouseout="this.style.borderColor=\'\';this.style.color=\'var(--muted2)\'">✕ Clear & Replace</button></div>';
      });
      /* Show audit panel and supporting panels */
      var ap=document.getElementById('doaAuditPanel');
      if(ap){ap.style.display='block';ap.innerHTML=audit}
      /* Show doc uploads, sign, invite, security banner, deal ref banner */
      ['docUploadsPanel','signDOAPanel','securityBanner','dealRefBanner','sigCapturePanel'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display='block'});
      /* Show NCNDA only for Sender, Receiver, Mandate — not Broker */
      if(curRole!=='broker'){var np=document.getElementById('ncndaPanel');if(np)np.style.display='block'}
      /* Show mandate auth panel if mandate role is selected */
      if(curRole==='mandate'){var mp=document.getElementById('mandateAuthPanel');if(mp)mp.style.display='block'}
      showT('✓ '+cnt+' fields extracted — review audit below');
      console.log('DOA Parse:',cnt,'fields.',instType,JSON.parse(JSON.stringify(D)));
    },400);
  });
}

/* ═══════════════════════════════════════════════════════
   AUDIT REPORT BUILDER
   ═══════════════════════════════════════════════════════ */
function buildAudit(extracted,instType,fileName,ext,cnt){
  /* ===== SWIFT/BIC Validator ===== */
  function validateSwift(code){
    if(!code||code.length<1)return{valid:false,msg:'Missing',suggestions:[],suggested:''};
    var raw=code;
    code=code.replace(/\s/g,'').replace(/[^A-Za-z0-9]/g,'').toUpperCase();
    if(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(code)){
      var country=code.slice(4,6);
      var knownCountries='US|GB|DE|FR|CH|AE|SG|HK|MY|PH|AU|NZ|CA|IE|ZA|IN|JP|CN|KR|NL|BE|IT|ES|AT|LU|SE|NO|DK|FI|PT|BR|MX|SA|QA|KW|BH|OM|JO|EG|NG|KE|GH|TZ|TH|ID|VN|PK|LK|BD|MM|TW|MO|MU|RW|UG|CM|CI|SN|MA|TN|LB|TR|PL|CZ|HU|RO|BG|HR|RS|UA|RU|GE|KZ|IL'.split('|');
      var countryOk=knownCountries.indexOf(country)!==-1;
      var countryName=({US:'United States',GB:'United Kingdom',DE:'Germany',FR:'France',CH:'Switzerland',AE:'UAE',SG:'Singapore',HK:'Hong Kong',MY:'Malaysia',PH:'Philippines',AU:'Australia',NZ:'New Zealand',CA:'Canada',IE:'Ireland',ZA:'South Africa',IN:'India',JP:'Japan',CN:'China',KR:'South Korea',NL:'Netherlands',BE:'Belgium',IT:'Italy',ES:'Spain',AT:'Austria',LU:'Luxembourg',SE:'Sweden',NO:'Norway',DK:'Denmark',FI:'Finland',PT:'Portugal',BR:'Brazil',MX:'Mexico',SA:'Saudi Arabia',QA:'Qatar',KW:'Kuwait',BH:'Bahrain',OM:'Oman',JO:'Jordan',EG:'Egypt',NG:'Nigeria',KE:'Kenya',GH:'Ghana',TZ:'Tanzania',TH:'Thailand',ID:'Indonesia',TR:'Turkey',PL:'Poland',IL:'Israel'})[country]||'';
      return{valid:true,msg:'Valid format'+(countryName?' · Country: '+countryName:''),country:country,suggested:''};
    }
    /* Invalid — try to build a suggestion */
    var suggestions=[];
    var suggested='';
    var cleaned=code.replace(/[^A-Z0-9]/g,'');
    /* Common issues */
    if(raw!==code)suggestions.push('Remove special characters — only letters and digits');
    if(cleaned.length<8)suggestions.push('Too short — SWIFT/BIC must be 8 or 11 characters (yours: '+cleaned.length+')');
    if(cleaned.length>11)suggestions.push('Too long — SWIFT/BIC must be 8 or 11 characters (yours: '+cleaned.length+')');
    if(cleaned.length>=8&&cleaned.length<=11){
      /* Try to fix: check each part */
      var bankCode=cleaned.slice(0,4);
      var countryCode=cleaned.slice(4,6);
      var locationCode=cleaned.slice(6,8);
      var branchCode=cleaned.length>8?cleaned.slice(8):'';
      var parts=[];
      /* Bank code: must be 4 letters */
      if(!/^[A-Z]{4}$/.test(bankCode)){
        var fixedBank=bankCode.replace(/[0-9]/g,function(d){return({0:'O',1:'I',2:'Z',3:'E',4:'A',5:'S',6:'G',8:'B'})[d]||d});
        suggestions.push('Bank code ('+bankCode+') — first 4 must be letters. Did you mean: '+fixedBank+'?');
        parts.push(fixedBank);
      }else{parts.push(bankCode)}
      /* Country code: must be 2 letters */
      if(!/^[A-Z]{2}$/.test(countryCode)){
        var fixedCC=countryCode.replace(/[0-9]/g,function(d){return({0:'O',1:'I'})[d]||d});
        suggestions.push('Country code ('+countryCode+') — positions 5-6 must be letters (ISO country). Did you mean: '+fixedCC+'?');
        parts.push(fixedCC);
      }else{parts.push(countryCode)}
      /* Location code: 2 alphanumeric */
      parts.push(locationCode);
      /* Branch code: 3 alphanumeric or empty */
      if(branchCode)parts.push(branchCode);
      suggested=parts.join('');
      if(suggested===cleaned)suggested=''; /* no change, can't suggest */
    }
    /* Structure explanation */
    suggestions.push('SWIFT format: BBBB (bank) + CC (country) + LL (location) + XXX (branch, optional)');
    return{valid:false,msg:'Invalid format',suggestions:suggestions,suggested:suggested};
  }

  /* Officer verification state */
  if(!window._officerVerify)window._officerVerify={};

  /* Define what we need for each section */
  var sections=[
  {title:'Instrument Detected',fields:[
    {k:'_inst',l:'Instrument Type',v:instType,status:'info'},
    {k:'sblcRef',l:'Transaction / Ref Code',need:1},
    {k:'faceValue',l:'Face Value / Amount',need:1},
    {k:'currency',l:'Currency',need:1}
  ]},
  {title:'Party A — Sender / Applicant',fields:[
    {k:'appCompany',l:'Company Name',need:1},
    {k:'appRep',l:'Represented By',need:1},
    {k:'appPassport',l:'Passport No.',need:1},
    {k:'appAddr',l:'Company Address'},
    {k:'appCountry',l:'Country'},
    {k:'appTitle',l:'Title / Position'}
  ]},
  {title:'Party A — Issuing Bank',fields:[
    {k:'issBankName',l:'Bank Name',need:1},
    {k:'issSwift',l:'SWIFT / BIC Code',need:1,swiftCheck:1},
    {k:'issIban',l:'IBAN',need:1},
    {k:'issAcctNo',l:'Account No.',verify:'Account numbers cannot be auto-verified — confirm with bank officer'},
    {k:'issBankAddr',l:'Bank Address'},
    {k:'issAcctName',l:'Account Name'},
    {k:'issOfficer',l:'Bank Officer',officer:'issOfficer'},
    {k:'issOfficerEmail',l:'Officer Email'}
  ]},
  {title:'Party B — Receiver / Beneficiary',fields:[
    {k:'benCompany',l:'Company Name',need:1},
    {k:'benRep',l:'Represented By',need:1},
    {k:'benPassport',l:'Passport No.',need:1},
    {k:'benAddr',l:'Company Address'},
    {k:'benCountry',l:'Country'},
    {k:'benTitle',l:'Title / Position'}
  ]},
  {title:'Party B — Advising Bank',fields:[
    {k:'rcvBankName',l:'Bank Name',need:1},
    {k:'rcvSwift',l:'SWIFT / BIC Code',need:1,swiftCheck:1},
    {k:'rcvIban',l:'IBAN',need:1},
    {k:'rcvAcctNo',l:'Account No.',verify:'Account numbers cannot be auto-verified — confirm with bank officer'},
    {k:'rcvBankAddr',l:'Bank Address'},
    {k:'rcvAcctName',l:'Account Name'},
    {k:'rcvOfficer',l:'Bank Officer',officer:'rcvOfficer'},
    {k:'rcvOfficerEmail',l:'Officer Email'}
  ]}
];

  var totalNeed=0,totalHave=0,warnings=[],missingList=[];

  var h='<div class="card"><div class="ch"><span class="chl">DOA Extraction Audit</span><span class="pill po" id="auditPill">Analyzing...</span></div><div class="cb">';
  h+='<div style="font-size:9px;color:var(--muted2);margin-bottom:4px">File: <strong style="color:var(--white)">'+fileName+'</strong> · '+cnt+' fields extracted · Instrument: <strong style="color:var(--gold)">'+instType+'</strong></div>';
  h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding:8px 10px;background:var(--obs);border:1px solid var(--border-mid)"><div style="font-size:7px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600">Deal Ref:</div><div style="font-family:\'Courier Prime\',monospace;font-size:13px;color:var(--gold);font-weight:700;letter-spacing:.04em" class="deal-ref-display">'+dealRef+'</div><div style="margin-left:auto;font-size:7px;color:var(--muted);cursor:pointer;text-decoration:underline" onclick="copyDealRef()">Copy</div></div>';

  sections.forEach(function(sec){
    h+='<div style="font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:700;margin:14px 0 6px;padding-bottom:4px;border-bottom:1px solid var(--border)">'+sec.title+'</div>';
    sec.fields.forEach(function(f){
      if(f.status==='info'){
        h+='<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:9.5px"><span style="color:var(--muted2)">'+f.l+'</span><span style="font-weight:600;color:var(--gold)">'+f.v+'</span></div>';
        return;
      }
      var val=extracted[f.k]||'';
      var has=val.length>1;
      if(f.need)totalNeed++;
      if(f.need&&has)totalHave++;
      if(f.need&&!has)missingList.push(f.l);

      /* === SWIFT/BIC validation === */
      if(f.swiftCheck&&has){
        var sv=validateSwift(val);
        var statusColor=sv.valid?'var(--green)':'var(--red)';
        var statusIcon=sv.valid?'✓':'✗';
        var statusText=sv.valid?'Valid SWIFT Format':'Invalid SWIFT Format';
        var swiftClass=sv.valid?'st-ok':'st-err';
        var swiftTip=sv.valid?'This SWIFT/BIC code has a valid format ('+sv.msg+'). However, you should still verify it directly with the bank to confirm it is the correct code for this account.':'This SWIFT/BIC code does not match the standard 8 or 11 character format. Check the code and correct any errors — your bank will reject an invalid SWIFT code.';
        h+='<div style="display:flex;align-items:flex-start;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:9.5px;gap:8px">';
        h+='<span style="color:var(--muted2);flex-shrink:0;min-width:100px">'+f.l+' <span style="color:var(--red)">*</span></span>';
        h+='<div style="flex:1;min-width:0">';
        h+='<input class="fi" style="font-size:9px;padding:6px 8px;margin-bottom:2px;border-color:'+(sv.valid?'rgba(42,128,80,.5)':'rgba(176,48,48,.4)')+'" value="'+esc(val)+'" oninput="D[\''+f.k+'\']=this.value;updateAuditSwift(this,\''+f.k+'\')">';
        h+='<div class="audit-status '+swiftClass+'">'+statusIcon+' '+statusText+'<div class="tip">'+swiftTip+'</div></div>';
        if(!sv.valid&&sv.suggestions&&sv.suggestions.length>0){
          sv.suggestions.forEach(function(s){
            h+='<div style="font-size:8px;color:var(--red);margin-top:3px;line-height:1.4">💡 '+s+'</div>';
          });
          if(sv.suggested){
            h+='<div style="margin-top:4px;padding:6px 10px;background:rgba(74,139,224,.1);border:1px solid rgba(74,139,224,.3);cursor:pointer;font-size:9px;color:#4A8BE0;font-weight:600" onclick="this.parentNode.querySelector(\'input\').value=\''+sv.suggested+'\';D[\''+f.k+'\']=\''+sv.suggested+'\';updateAuditSwift(this.parentNode.querySelector(\'input\'),\''+f.k+'\')">💡 Did you mean: <span style="font-family:Courier Prime,monospace;font-size:11px;letter-spacing:.08em">'+sv.suggested+'</span>? Click to use</div>';
          }
        }
        if(sv.valid)h+='<div style="font-size:8px;color:var(--green);margin-top:3px">'+sv.msg+' — still verify directly with the bank</div>';
        h+='</div></div>';
        return;
      }
      if(f.swiftCheck&&!has){
        h+='<div style="display:flex;align-items:flex-start;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:9.5px;gap:8px">';
        h+='<span style="color:var(--muted2);flex-shrink:0;min-width:100px">'+f.l+' <span style="color:var(--red)">*</span></span>';
        h+='<div style="flex:1;min-width:0">';
        h+='<input class="fi" style="font-size:9px;padding:6px 8px;margin-bottom:2px;border-color:rgba(176,48,48,.4)" value="" placeholder="e.g. HBUKGB4124C" oninput="D[\''+f.k+'\']=this.value;updateAuditSwift(this,\''+f.k+'\')">';
        h+='<div class="audit-status st-err">✗ Missing<div class="tip">The SWIFT/BIC code for this bank was not found in your DOA. You must enter it manually — this is required for SWIFT transmission. The code is 8 or 11 characters, e.g. HBUKGB4124C.</div></div>';
        h+='</div></div>';
        missingList.push(f.l);
        return;
      }

      /* === Bank Officer with verification tiers === */
      if(f.officer){
        var oState=window._officerVerify[f.officer]||'none';
        var tierColors={none:'var(--muted)',partial:'#D4A017',verified:'var(--green)'};
        var tierLabels={none:'Unverified',partial:'Partial Verification',verified:'✓ Verified'};
        var tierIcons={none:'○',partial:'◐',verified:'●'};
        h+='<div style="display:flex;align-items:flex-start;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:9.5px;gap:8px">';
        h+='<span style="color:var(--muted2);flex-shrink:0;min-width:100px">'+f.l+'</span>';
        h+='<div style="flex:1;min-width:0">';
        h+='<input class="fi" style="font-size:9px;padding:6px 8px;margin-bottom:2px;border-color:'+(has?'rgba(42,128,80,.5)':'var(--border)')+'" value="'+esc(val)+'" oninput="D[\''+f.k+'\']=this.value;updateAuditField(this,\''+f.k+'\',false)">';
        h+='<div style="font-size:7.5px;font-weight:700;color:'+tierColors[oState]+';letter-spacing:.08em;margin-top:1px">'+tierIcons[oState]+' '+tierLabels[oState]+'</div>';
        h+='<div style="font-size:7px;color:var(--muted2);margin-top:3px;line-height:1.4">Bank officers don\'t require verification, but you can upgrade:</div>';
        /* Business card upload */
        h+='<div style="display:flex;gap:6px;margin-top:6px;align-items:stretch">';
        h+='<div class="upload-zone" id="bc-'+f.officer+'" style="flex:1;padding:8px 6px;font-size:7px" onclick="document.getElementById(\'bcFile-'+f.officer+'\').click()" ondragover="event.preventDefault();this.style.borderColor=\'var(--gold)\'" ondragleave="this.style.borderColor=\'\'" ondrop="event.preventDefault();handleOfficerCard(\''+f.officer+'\',event.dataTransfer.files[0],this)">';
        h+='<div style="font-size:14px;margin-bottom:2px">🪪</div>';
        h+='<div style="font-weight:600;color:var(--txt)">Business Card</div>';
        h+='<div style="color:var(--muted2);margin-top:1px">Upload for partial verification</div></div>';
        h+='<input type="file" id="bcFile-'+f.officer+'" accept="image/*,.pdf" style="display:none" onchange="handleOfficerCard(\''+f.officer+'\',this.files[0],document.getElementById(\'bc-'+f.officer+'\'))">';
        /* LinkedIn check */
        h+='<div style="flex:1;border:1px solid var(--border);padding:8px 6px;text-align:center;font-size:7px;cursor:pointer;background:var(--panel);transition:all .15s" onclick="checkOfficerLinkedIn(\''+f.officer+'\',\''+esc(val)+'\')" onmouseover="this.style.borderColor=\'var(--gold)\'" onmouseout="this.style.borderColor=\'var(--border)\'">';
        h+='<div style="font-size:14px;margin-bottom:2px">🔍</div>';
        h+='<div style="font-weight:600;color:var(--txt)">LinkedIn Search</div>';
        h+='<div style="color:var(--muted2);margin-top:1px">Find officer profile</div></div>';
        h+='</div>';
        /* Verification tier legend */
        h+='<div style="display:flex;gap:10px;margin-top:6px;font-size:6.5px;color:var(--muted)">';
        h+='<span>○ Unverified (default)</span>';
        h+='<span style="color:#D4A017">◐ Partial (card uploaded)</span>';
        h+='<span style="color:var(--green)">● Verified (card signed+stamped & LinkedIn)</span>';
        h+='</div>';
        h+='</div></div>';
        return;
      }

      /* === Standard field rendering === */
      var statusColor=has?(f.verify?'#D4A017':'var(--green)'):(f.need?'var(--red)':'var(--muted)');
      var statusIcon=has?(f.verify?'⚠':'✓'):'✗';
      var statusText=has?(f.verify?'Needs Verification':'Extracted'):'Missing';
      var statusClass=has?(f.verify?'st-warn':'st-ok'):(f.need?'st-err':'st-info');
      var tipText=has?(f.verify?'This field was extracted from your DOA but cannot be automatically verified. You must confirm this value independently — e.g. call the bank directly or check official records.':'This field was successfully extracted from your DOA document. Review it to make sure it looks correct.'):(f.need?'This required field could not be found in your DOA. You\'ll need to fill it in manually before proceeding.':'This optional field was not found in your DOA. You can fill it in manually if needed.');
      if(has&&f.verify)warnings.push(f.l+': '+f.verify);
      h+='<div style="display:flex;align-items:flex-start;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:9.5px;gap:8px">';
      h+='<span style="color:var(--muted2);flex-shrink:0;min-width:100px">'+f.l+(f.need?' <span style="color:var(--red)">*</span>':'')+'</span>';
      h+='<div style="flex:1;min-width:0">';
      h+='<input class="fi" style="font-size:9px;padding:6px 8px;margin-bottom:2px;border-color:'+(has?(f.verify?'rgba(212,160,23,.5)':'rgba(42,128,80,.5)'):'rgba(176,48,48,.4)')+'" value="'+esc(val)+'" oninput="D[\''+f.k+'\']=this.value;updateAuditField(this,\''+f.k+'\','+!!f.verify+')">';
      h+='<div class="audit-status '+statusClass+'">'+statusIcon+' '+statusText+'<div class="tip">'+tipText+'</div></div>';
      if(has&&f.verify)h+='<div style="font-size:8px;color:#D4A017;margin-top:3px;line-height:1.4">⚠ '+f.verify+'</div>';
      h+='</div></div>';
    });
  });

  var pct=totalNeed?Math.round((totalHave/totalNeed)*100):0;

  /* Warnings section */
  if(warnings.length>0){
    h+='<div style="font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:#D4A017;font-weight:700;margin:14px 0 6px;padding-bottom:4px;border-bottom:1px solid rgba(212,160,23,.3)">⚠ Verification Required ('+warnings.length+')</div>';
    warnings.forEach(function(w){
      h+='<div style="font-size:9px;color:#D4A017;padding:4px 0;border-bottom:1px solid var(--border);line-height:1.5">⚠ '+w+'</div>';
    });
  }

  /* Missing section */
  if(missingList.length>0){
    h+='<div style="font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--red);font-weight:700;margin:14px 0 6px;padding-bottom:4px;border-bottom:1px solid rgba(176,48,48,.3)">✗ Missing Required Fields ('+missingList.length+')</div>';
    missingList.forEach(function(m){
      h+='<div style="font-size:9px;color:var(--red);padding:4px 0;border-bottom:1px solid var(--border)">✗ '+m+' — <span style="color:var(--muted2)">fill in manually during the workflow</span></div>';
    });
  }

  /* Next steps */
  h+='<div style="font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:700;margin:14px 0 6px;padding-bottom:4px;border-bottom:1px solid var(--border)">→ Next Steps</div>';
  h+='<div style="font-size:9.5px;color:var(--txt);line-height:1.8;padding:4px 0">';
  if(pct>=80)h+='<div style="color:var(--green);font-weight:600;margin-bottom:4px">✓ Good extraction — most required fields found.</div>';
  else h+='<div style="color:var(--gold);font-weight:600;margin-bottom:4px">⚠ Partial extraction — several fields still need to be filled manually.</div>';
  h+='<div>1. Select your <strong>role</strong> above (Sender, Receiver, Mandate, or Broker)</div>';
  h+='<div>2. Select <strong>'+instType+'</strong> below to open the workflow</div>';
  h+='<div>3. <strong style="color:#D4A017">Verify</strong> all bank details independently before submitting</div>';
  if(missingList.length>0)h+='<div>4. Fill in the <strong style="color:var(--red)">'+missingList.length+' missing fields</strong> manually in the workflow</div>';
  h+='</div>';

  h+='</div></div>';

  /* Update pill */
  setTimeout(function(){
    var pill=document.getElementById('auditPill');
    if(pill){pill.textContent=pct+'% Complete';pill.className='pill '+(pct>=80?'pg':pct>=50?'po':'pr')}
  },100);

  return h;
}

/* ═══════════════════════════════════════════════════════
   TEXT EXTRACTION (mammoth.js + pdf.js)
   ═══════════════════════════════════════════════════════ */
function doaExtractText(file,cb){
  var isDocx=/\.docx?$/i.test(file.name);
  if(isDocx){
    if(typeof mammoth==='undefined'){showT('mammoth.js not loaded — check connection');cb('');return}
    var r=new FileReader();
    r.onload=function(e){
      mammoth.extractRawText({arrayBuffer:e.target.result}).then(function(res){cb(res.value||'')}).catch(function(err){console.error('mammoth error:',err);cb('')})
    };
    r.readAsArrayBuffer(file);
  } else {
    var lib=window['pdfjs-dist/build/pdf'];
    if(!lib){showT('pdf.js not loaded — check connection');cb('');return}
    lib.GlobalWorkerOptions.workerSrc='';
    var r2=new FileReader();
    r2.onload=function(e){
      lib.getDocument({data:new Uint8Array(e.target.result),verbosity:0}).promise.then(function(pdf){
        var pages=[],tot=Math.min(pdf.numPages,15);
        if(tot===0){cb('');return}
        var done=0;
        for(var p=1;p<=tot;p++){(function(pg){
            pdf.getPage(pg).then(function(page){
              page.getTextContent().then(function(ct){
                var result='',lastX=-1,lastY=-1,lastW=0;
                ct.items.forEach(function(item){
                  if(!item.str)return;
                  var x=item.transform?item.transform[4]:0,y=item.transform?item.transform[5]:0,fs=item.transform?Math.abs(item.transform[0]):12;
                  if(lastY!==-1){if(Math.abs(y-lastY)>fs*0.5)result+='\n';else if(x-(lastX+lastW)>fs*0.3)result+=' '}
                  result+=item.str;lastX=x;lastY=y;lastW=item.width||item.str.length*(fs*0.5);
                });
                pages[pg-1]=result;done++;
                if(done>=tot)cb(pages.join('\n'));
              })});})(p)}
      }).catch(function(err){console.error('pdf.js error:',err);cb('')});
    };
    r2.readAsArrayBuffer(file);
  }
}

/* ═══════════════════════════════════════════════════════
   DOA IMAGE EXTRACTION & CLASSIFICATION
   ═══════════════════════════════════════════════════════ */
var doaExtractedImages=[];

/* ═══════════════════════════════════════════════════════
   INSTRUMENT TYPE DETECTION
   ═══════════════════════════════════════════════════════ */
function detectInstrument(T){
  var t=T.toLowerCase();
  if(t.indexOf('sblc')!==-1||t.indexOf('mt760')!==-1||t.indexOf('mt 760')!==-1||t.indexOf('standby letter of credit')!==-1||t.indexOf('demand guarantee')!==-1)return'SBLC / MT760';
  if(t.indexOf('mt103')!==-1||t.indexOf('mt 103')!==-1||t.indexOf('wire transfer')!==-1||t.indexOf('single customer credit transfer')!==-1)return'MT103 Wire Transfer';
  if(t.indexOf('dlc')!==-1||t.indexOf('mt700')!==-1||t.indexOf('mt 700')!==-1||t.indexOf('documentary credit')!==-1||t.indexOf('letter of credit')!==-1)return'DLC / MT700';
  if(t.indexOf('mt799')!==-1||t.indexOf('mt 799')!==-1||t.indexOf('pre-advice')!==-1||t.indexOf('preadvice')!==-1)return'MT799 Pre-Advice';
  if(t.indexOf('ledger to ledger')!==-1||t.indexOf('ledger-to-ledger')!==-1)return'Ledger to Ledger';
  if(t.indexOf('gold')!==-1&&t.indexOf('commodity')!==-1)return'Gold / Commodity';
  /* Default: check for common DOA markers */
  if(t.indexOf('deed of assignment')!==-1||t.indexOf('irrevocable')!==-1)return'SBLC / MT760';
  return'SBLC / MT760';
}

/* ═══════════════════════════════════════════════════════
   DOA FIELD EXTRACTION ENGINE
   ═══════════════════════════════════════════════════════ */
function exFields(T){
  T=T||'';
  var labels='REPRESENTED BY|TITLE|NATIONALITY|PASSPORT NUMBER|PASSPORT NO|DATE OF ISSUE|DATE OF EXPIRY|DATE OF EXPIRE|PLACE OF ISSUE|DATE OF BIRTH|COMPANY NAME|COMPANY REG|COMPANY ADDRESS|BANK NAME|BANK ADDRESS|SWIFT CODE|SORT CODE|IBAN|ACCOUNT NAME|ACCOUNT NUMBER|BANK ACCOUNT NO|BANK OFFICER|BANK OFFICER E-MAIL|BANK TELEPHONE|BANK PHONE|BANK FAX|BANK E-MAIL|BANKER EMAIL|POSITION|CEO|DIRECTOR|INSTRUMENT|FIRST TRANCHE|SECOND TRANCHE|TOTAL FACE VALUE|DISTRIBUTION|HEREINAFTER|NOTE|IN TRANCHES';
  var stopPat='(?=\\s*(?:'+labels.replace(/\|/g,'|')+')[:\\s\\t]|$)';

  function grab(src,lbl){
    if(!src)return '';
    /* Labels that should NEVER be accepted as values */
    var labelWords=/^(?:BANK\s+NAME|BANK\s+ADDRESS|SWIFT\s+CODE|SWIFT\s*\/\s*BIC|BIC\s+CODE|IBAN|ACCOUNT\s+(?:NAME|NUMBER|NO)|BANK\s+OFFICER|OFFICER\s+(?:NAME|EMAIL|E-MAIL)|BANK\s+TELEPHONE|BANK\s+(?:OFFICER\s+)?E-?MAIL|COMPANY\s+(?:NAME|ADDRESS|REGISTRATION)|PASSPORT\s+(?:NO|NUMBER)|TITLE\s*\/?\s*POSITION|REPRESENTED\s+BY|FULL\s+LEGAL\s+NAME|PLACE\s+OF\s+ISSUE|COUNTRY)[:\s]*$/i;
    var pats=[
    new RegExp(lbl+'[\\s\\t]*[:\\.]+[\\s\\t]*([^\\n]{2,150})','i'),
    new RegExp(lbl+'[:\\s\\t]*\\n\\s*([^\\n]{2,150})','i'),
    new RegExp(lbl+'[\\t]+([^\\n\\t]{2,150})','i'),
    new RegExp(lbl+'[\\s\\t]+([A-Z][A-Z0-9\\s\\.\\,\\/\\-\\(\\)@\\+]{2,80}?)'+stopPat,'i')
  ];
    for(var p=0;p<pats.length;p++){var m=src.match(pats[p]);if(m&&m[1]){var v=m[1].replace(/\t/g,' ').replace(/\s+/g,' ').trim();if(v.length>1&&!/^X{3,}/.test(v)&&!/^[X\s]+$/.test(v)&&v!=='N/A'&&!labelWords.test(v))return v}}
    return '';
  }

  /* === Extract Party blocks using multiple patterns === */
  /* Pattern 1: Party A/B (Sender/Receiver) */
  var pAm=T.match(/Party[\s\-]*A[\s\S]{0,80}(?:Sender|Investor|Provider)([\s\S]{0,4000}?)(?:Hereinafter|Party[\s\-]*B|BANKING\s+INFORMATION)/i);
  var pA=pAm?pAm[1]:'';
  /* Pattern 2: FOR AND ON BEHALF OF PROVIDER/SELLER */
  var provM=T.match(/FOR AND ON BEHALF OF\s+(?:PROVIDER|SELLER)[:\s]*([\s\S]{0,2000}?)(?=FOR AND ON BEHALF OF|BANKING\s+INFORMATION|APPENDIX|CLIENT\s+INFORMATION)/i);
  var provBlock=provM?provM[1]:'';
  /* Pattern 3: FOR AND ON BEHALF OF BUYER/BENEFICIARY */
  var buyM=T.match(/FOR AND ON BEHALF OF\s+(?:BUYER|Beneficiary)[:\s]*([\s\S]{0,2000}?)(?=FOR AND ON BEHALF OF|BANKING\s+INFORMATION|APPENDIX|CLIENT\s+INFORMATION|EDT\s)/i);
  var buyBlock=buyM?buyM[1]:'';
  /* Pattern 4: Party B / Receiver / Developer */
  var pBm=T.match(/Party[\s\-]*B[\s\S]{0,80}(?:Receiver|Developer|Buyer|Beneficiary)([\s\S]{0,4000}?)(?:Hereinafter|DETAILS\s+OF\s+TRANSACTION|PROCEDURES|WHEREAS|BANKING\s+INFORMATION)/i);
  var pB=pBm?pBm[1]:'';

  /* === Extract BANKING blocks from Appendices === */
  /* SENDER banking block from Appendix (Provider's bank) */
  var senderBankM=T.match(/SENDER[:\s]*\n\s*SWIFT\s+CODE[:\s]*([\s\S]{0,1500}?)(?=RECEIVER[:\s]*\n|$)/i);
  var senderBank=senderBankM?senderBankM[0]:'';
  /* RECEIVER banking block from Appendix (Buyer's bank) */
  var receiverBankM=T.match(/RECEIVER[:\s]*\n\s*SWIFT\s+CODE[:\s]*([\s\S]{0,1500}?)(?=REFERENCE\s+TRANSACTION|WE,|FOR AND ON BEHALF|$)/i);
  var receiverBank=receiverBankM?receiverBankM[0]:'';
  /* Provider's Banking Coordinates section */
  var provBankCoordM=T.match(/PROVIDER.S\s+BANKING\s+COORDINATES([\s\S]{0,2000}?)(?=BUYER.S\s+BANKING|IMPROPER\s+RELEASE)/i);
  var provBankCoord=provBankCoordM?provBankCoordM[1]:'';
  /* Buyer's Banking Coordinates section */
  var buyBankCoordM=T.match(/BUYER.S\s+BANKING\s+COORDINATES([\s\S]{0,2000}?)(?=IMPROPER\s+RELEASE|ASSIGNMENT|$)/i);
  var buyBankCoord=buyBankCoordM?buyBankCoordM[1]:'';

  /* === NEW: Provider Bank Co-ordinates block (BANK\tHSBC style tables) === */
  var provBankCoordTblM=T.match(/PROVIDER\s+BANK\s+CO-?ORDINATES[\s\S]{0,100}?(?:MT760|MT\s*760)([\s\S]{0,1500}?)(?=PROVIDER.S\s+BANK\s+CO-?ORDINATE\s+TO\s+RECEIVE|RECEIVER\s+BANK|NOTE:|$)/i);
  var provBankCoordTbl=provBankCoordTblM?provBankCoordTblM[1]:'';
  /* Also try: "PROVIDER'S BANK CO-ORDINATE TO RECEIVE" (second provider bank for fees) */
  var provBankFeeM=T.match(/PROVIDER.S\s+BANK\s+CO-?ORDINATE\s+TO\s+RECEIVE([\s\S]{0,1500}?)(?=NOTE:|RECEIVER\s+BANK|$)/i);
  var provBankFee=provBankFeeM?provBankFeeM[1]:'';
  /* Receiver Bank Co-ordinates block — multiple format patterns */
  var rcvBankCoordTblM=T.match(/RECEIVER\s+BANK\s+CO-?ORDINATES?[\s\S]{0,120}?(?:MT799|MT760|SBLC|MT\s*799|MT\s*760)([\s\S]{0,1500}?)(?=RECEIVER\s+BANK\s+CO-?ORDINATE\s+TO\s+PAYMENT|IN\s+CONSIDERATION|PROVIDER|NOTE:|$)/i);
  var rcvBankCoordTbl=rcvBankCoordTblM?rcvBankCoordTblM[1]:'';
  /* Also try: "RECEIVER BANK CO-ORDINATE TO PAYMENT" or "TO RECEIVE" variant for MT103 */
  if(!rcvBankCoordTbl){
    var rcvBankCoordTblM2=T.match(/RECEIVER\s+BANK\s+CO-?ORDINATE[S]?\s+TO\s+(?:PAYMENT|RECEIVE)[\s\S]{0,80}?(?:MT103|MT\s*103)([\s\S]{0,1500}?)(?=PROVIDER|IN\s+CONSIDERATION|NOTE:|$)/i);
    if(rcvBankCoordTblM2)rcvBankCoordTbl=rcvBankCoordTblM2[1];
  }

  /* === NEW: "THE PROVIDER\tCompanyName" and "THE RECEIVER\tCompanyName" table blocks === */
  var theProvM=T.match(/THE\s+PROVIDER[\t\s]+([^\n]{2,150})([\s\S]{0,2000}?)(?=THE\s+RECEIVER|INSTRUMENT\t|$)/i);
  var theProvBlock=theProvM?(theProvM[0]):'';
  var theRcvM=T.match(/THE\s+RECEIVER[\t\s]+([^\n]{2,150})([\s\S]{0,2000}?)(?=INSTRUMENT\t|ISSUING\s+BANK|TOTAL\s+FACE|$)/i);
  var theRcvBlock=theRcvM?(theRcvM[0]):'';

  /* === NEW: Bare "BANK\t" extractor for table-format DOAs === */
  function grabBareBank(src){
    if(!src)return '';
    /* Try: BANK followed by tab/spaces then a value */
    var m=src.match(/(?:^|\n)\s*BANK[\t\s]+([A-Z][A-Z0-9\s\.\,\(\)\-]+?)(?=\n|$)/i);
    return m?m[1].replace(/\s+/g,' ').trim():'';
  }
  function grabBareAddr(src){
    if(!src)return '';
    var m=src.match(/(?:^|\n)\s*ADDRESS[\t\s]+([^\n]{5,200})/i);
    return m?m[1].replace(/\s+/g,' ').trim():'';
  }
  function grabBankIban(src){
    if(!src)return '';
    var m=src.match(/BANK\s+IBAN[\t\s:]+([A-Z0-9]{10,40})/i);
    return m?m[1].trim():'';
  }

  /* === Also grab from the "I, Mr. NAME" intro block === */
  var introM=T.match(/I,\s+(Mr\.|Mrs\.|Ms\.)?\s*([A-Z][A-Z\s\.]+),\s*(CEO|DIRECTOR|EXECUTIVE DIRECTOR|COO|CFO|MANAGING DIRECTOR)[,\s]+(?:WITH\s+)?PASSPORT\s+NO\.\s*([A-Z0-9]+)/i);

  /* === Table-extracted banking blocks === */
  /* Mammoth outputs table cells as sequential text. Look for bank detail clusters */
  /* Provider/Issuing bank: look for first BANK NAME or bare BANK with SWIFT CODE nearby */
  var bankClusterA='',bankClusterB='';
  /* Find all BANK NAME occurrences and grab surrounding context */
  var bankMatches=[];
  var bankRe=/(?:BANK\s+NAME|^BANK)[\t:\s]*\n?\s*([^\n]{2,100})/gim;
  var bm;
  while((bm=bankRe.exec(T))!==null){if(bm[1].trim().length>2&&!/^X{3,}/.test(bm[1].trim())&&!/^(?:OFFICER|ADDRESS|IBAN|TELEPHONE|FAX|E-?MAIL|ACCOUNT)/i.test(bm[1].trim()))bankMatches.push({pos:bm.index,name:bm[1].trim(),ctx:T.substring(bm.index,Math.min(bm.index+600,T.length))})}
  /* First bank with data = Provider/Issuing, second = Buyer/Receiving */
  if(bankMatches.length>=1)bankClusterA=bankMatches[0].ctx;
  if(bankMatches.length>=2)bankClusterB=bankMatches[1].ctx;
  /* If we have a CIS (Client Information Sheet) for buyer, use that for banking too */
  var cisBuyerM=T.match(/CLIENT\s+INFORMATION\s+SHEET\s+BUYER([\s\S]{0,4000}?)(?=CLIENT\s+INFORMATION|LETTER\s+OF\s+ACCEPTANCE|CONDITIONS|$)/i);
  var cisBuyer=cisBuyerM?cisBuyerM[1]:'';

  /* === Table-structured party blocks === */
  /* Mammoth outputs table cells as LABEL\nVALUE\n. Find COMPANY NAME blocks */
  var compBlocks=[];
  var compRe=/COMPANY\s+NAME[:\s]*\n([^\n]{2,150})/gi;
  var cm;while((cm=compRe.exec(T))!==null){if(cm[1].trim().length>2&&!/^X{3,}/.test(cm[1].trim())){
      var blockEnd=Math.min(cm.index+1500,T.length);
      compBlocks.push(T.substring(cm.index,blockEnd));
    }}
  var tableBlockA=compBlocks.length>=1?compBlocks[0]:'';
  var tableBlockB=compBlocks.length>=2?compBlocks[1]:'';

  /* Combine sources for Provider (sender) side */
  var srcA=[pA,provBlock,senderBank,provBankCoord,provBankCoordTbl,provBankFee,bankClusterA,tableBlockA,theProvBlock].join('\n');
  /* Combine sources for Buyer (receiver) side */
  var srcB=[pB,buyBlock,receiverBank,buyBankCoord,rcvBankCoordTbl,bankClusterB,cisBuyer,tableBlockB,theRcvBlock].join('\n');

  function gA(l){return grab(srcA,l)||grab(tableBlockA,l)||grab(pA,l)||grab(provBlock,l)||grab(senderBank,l)||grab(bankClusterA,l)}
  function gB(l){return grab(srcB,l)||grab(tableBlockB,l)||grab(pB,l)||grab(buyBlock,l)||grab(receiverBank,l)||grab(bankClusterB,l)||grab(cisBuyer,l)}
  function gT(l){return grab(T,l)}

  /* Transaction code */
  var txM=T.match(/Transaction\s+(?:Code|No\.?|NUMBER)\s*[:\s]*([A-Z0-9\/\-\.]{6,80})/i)||T.match(/SBLC[\-][A-Z0-9\-]{6,60}/i);
  var txCode=txM?(txM[1]||txM[0]).trim():'';
  if(!txCode){var txM2=T.match(/(SBLC-[A-Z0-9\-]{6,60})/i);txCode=txM2?txM2[1]:''}

  /* Company names — try table blocks first, then other patterns */
  var provCompany=grab(tableBlockA,'COMPANY\\s+NAME')||gA('COMPANY\\s+NAME')||'';
  if(!provCompany){var pcm=T.match(/FOR AND ON BEHALF OF\s+(?:PROVIDER|SELLER)[/\w\s]*[:\s]*\n\s*([A-Z][A-Z0-9\s\(\)\.\/]+(?:LTD|LIMITED|LLC|INC|CORP|PLC|PTY)[^\n]*)/i);provCompany=pcm?pcm[1].trim():''}
  if(!provCompany&&theProvM)provCompany=theProvM[1].trim();
  if(!provCompany||/X{3,}/.test(provCompany))provCompany='';
  var buyCompany=grab(tableBlockB,'COMPANY\\s+NAME')||gB('COMPANY\\s+NAME')||'';
  if(!buyCompany){var bcm=T.match(/FOR AND ON BEHALF OF\s+(?:BUYER|Beneficiary)[/\w\s]*[:\s]*\n\s*([A-Z][A-Z0-9\s\(\)\.\/]+(?:LTD|LIMITED|LLC|INC|CORP|PLC|PTY)[^\n]*)/i);buyCompany=bcm?bcm[1].trim():''}
  if(!buyCompany){var bcm2=T.match(/REPRESENTING[:\s]+([A-Z][A-Z0-9\s\(\)\.\/]+(?:LTD|LIMITED|LLC|INC|CORP|PLC|PTY)[^\n]*)/i);buyCompany=bcm2?bcm2[1].trim():''}
  if(!buyCompany&&theRcvM)buyCompany=theRcvM[1].trim();

  /* Representative names — table blocks first */
  var provRep=grab(tableBlockA,'REPRESENTED\\s+BY')||grab(tableBlockA,'NAME')||gA('REPRESENTED\\s+BY')||gA('NAME')||'';
  if(/X{3,}/.test(provRep))provRep='';
  if(/^Mr\.?\s*X{3,}/i.test(provRep))provRep='';
  var buyRep=grab(tableBlockB,'REPRESENTED\\s+BY')||grab(tableBlockB,'NAME')||gB('REPRESENTED\\s+BY')||gB('NAME')||'';
  if(!provRep&&introM)provRep=((introM[1]||'')+' '+introM[2]).trim();
  if(!buyRep){var brm=T.match(/I,\s+(MR\.?\s+[A-Z][A-Z\s\.]+?)(?:\s+REPRESENTING|\s+AUTHORISED|\s+AS\s+DIRECTOR)/i);if(brm)buyRep=brm[1].trim()}

  /* Country/Nationality — table blocks first */
  var provCountry=grab(tableBlockA,'NATIONALITY')||grab(tableBlockA,'COUNTRY\\s+OF\\s+ISSUE')||gA('NATIONALITY')||gA('PLACE\\s+OF\\s+ISSUE')||'';
  if(/X{3,}/.test(provCountry))provCountry='';

  /* Passports — filter XXXXXXXX */
  var provPP=grab(tableBlockA,'PASSPORT\\s+NUMBER')||grab(tableBlockA,'PASSPORT\\s+NO\\.?')||gA('PASSPORT\\s+NO\\.?')||gA('PASSPORT\\s+NUMBER')||gA('PASSPORT\\s+#')||grab(theProvBlock,'PASSPORT\\s+NO\\.?')||'';
  if(/X{3,}/.test(provPP))provPP='';
  var buyPP=grab(tableBlockB,'PASSPORT\\s+NUMBER')||grab(tableBlockB,'PASSPORT\\s+NO\\.?')||gB('PASSPORT\\s+NO\\.?')||gB('PASSPORT\\s+NUMBER')||gB('PASSPORT\\s+#')||grab(theRcvBlock,'PASSPORT\\s+NO\\.?')||'';
  if(!provPP&&introM&&!/X{3,}/.test(introM[4]))provPP=introM[4];

  /* Titles — filter XXXXXXXX */
  var provTitle=grab(tableBlockA,'TITLE')||gA('TITLE')||gA('POSITION')||'';
  if(/X{3,}/.test(provTitle))provTitle='';
  var buyTitle=grab(tableBlockB,'TITLE')||gB('TITLE')||gB('POSITION')||'';
  if(!provTitle&&introM)provTitle=introM[3];

  /* Address — table blocks first */
  var provAddr=grab(tableBlockA,'COMPANY\\s+ADDRESS')||gA('(?:COMPANY\\s+)?ADDRESS')||gA('OFFICE\\s+ADDRESS')||'';
  if(/BANK\s+OFFICER/i.test(provAddr))provAddr='';
  var buyAddr=grab(tableBlockB,'COMPANY\\s+ADDRESS')||gB('(?:COMPANY\\s+)?ADDRESS')||gB('OFFICE\\s+ADDRESS')||(function(){var m=T.match(/REPRESENTING[:\s]+[A-Z][^\n]+AND\s+ADDRESS[:\s]+([^\n\.]+)/i);return m?m[1].trim():''}())||'';

  /* Reg number */
  var provReg=grab(tableBlockA,'REGISTRATION\\s+NO\\.?')||gA('COMPANY\\s+REG\\.?\\s*NO\\.?')||gA('REGISTRATION')||grab(theProvBlock,'COMPANY\\s+REG\\s+NO')||'';
  var buyReg=grab(tableBlockB,'REGISTRATION\\s+NO\\.?')||gB('COMPANY\\s+REG\\.?\\s*NO\\.?')||gB('REGISTRATION')||grab(theRcvBlock,'COMPANY\\s+REG\\s+NO')||'';

  /* Currency + amount — "500 Million Euros", "$250,000,000.00", "EUR/USD" */
  var currency='',faceValue='';
  var amtM1=T.match(/(\d[\d,\.]*)\s*(Million|Billion)\s*(Eur(?:o|os)?|USD|GBP|CHF)/i);
  if(amtM1){faceValue=amtM1[1]+' '+amtM1[2];currency=amtM1[3].replace(/o[s]?$/i,'').toUpperCase()}
  if(!faceValue){var amtM2=T.match(/[€\$]\s*([\d,\.]+)/);if(amtM2)faceValue=amtM2[1]}
  if(!faceValue){var amtM3=T.match(/(?:FACE\s+)?AMOUNT\s+OF\s+[€\$]?\s*([\d,\.]+)/i);if(amtM3)faceValue=amtM3[1]}
  if(!currency){currency=/EURO|EUR\b/i.test(T.slice(0,8000))?'EUR':/\bUSD\b/i.test(T.slice(0,8000))?'USD':''}

  return{
    appCompany:provCompany,
    appReg:provReg,
    appCountry:provCountry,
    appAddr:provAddr,
    appRep:provRep,
    appTitle:provTitle,
    appPassport:provPP,
    appEmail:gA('E-?MAIL')||grab(tableBlockA,'E-?MAIL')||'',
    issBankName:grab(provBankCoordTbl,'BANK\\s+NAME')||grab(senderBank,'BANK\\s+NAME')||grab(provBankCoord,'BANK\\s+NAME')||grab(bankClusterA,'BANK\\s+NAME')||grabBareBank(provBankCoordTbl)||grabBareBank(provBankFee)||gA('BANK\\s+NAME')||gA('ISSUING\\s+BANK'),
    issBankAddr:grab(provBankCoordTbl,'ADDRESS')||grabBareAddr(provBankCoordTbl)||grab(senderBank,'BANK\\s+ADDRESS')||grab(provBankCoord,'BANK\\s+ADDRESS')||grab(bankClusterA,'BANK\\s+ADDRESS')||grabBareAddr(bankClusterA)||gA('BANK\\s+ADDRESS'),
    issSwift:grab(provBankCoordTbl,'SWIFT\\s+CODE')||grab(senderBank,'SWIFT\\s+CODE')||grab(provBankCoord,'SWIFT\\s+CODE')||grab(bankClusterA,'SWIFT\\s+CODE')||gA('SWIFT\\s+CODE'),
    issSort:gA('SORT\\s+CODE'),
    issIban:grabBankIban(provBankCoordTbl)||grab(provBankCoordTbl,'BANK\\s+IBAN')||grab(provBankCoordTbl,'IBAN')||grab(senderBank,'IBAN')||grab(bankClusterA,'IBAN')||gA('BANK\\s+IBAN')||gA('IBAN'),
    issAcctNo:grab(provBankCoordTbl,'ACCOUNT\\s+NUMBER')||grab(senderBank,'ACCOUNT\\s+NUMBER')||grab(bankClusterA,'ACCOUNT\\s+NUMBER')||gA('ACCOUNT\\s+NUMBER')||gA('BANK\\s+ACCOUNT\\s+NO'),
    issAcctName:grab(provBankCoordTbl,'ACCOUNT\\s+NAME')||grab(senderBank,'ACCOUNT\\s+NAME')||grab(bankClusterA,'ACCOUNT\\s+NAME')||gA('ACCOUNT\\s+NAME'),
    issOfficer:grab(provBankCoordTbl,'BANK\\s+OFFICER')||grab(senderBank,'BANK\\s+OFFICER')||grab(bankClusterA,'BANK\\s+OFFICER')||grab(bankClusterA,'BANK\\s+OFFICIER')||gA('BANK\\s+OFFICER'),
    issOfficerEmail:grab(provBankCoordTbl,'BANK\\s+OFFICER\\s+E-?MAIL')||grab(senderBank,'BANK\\s+OFFICER\\s+E-?MAIL')||grab(bankClusterA,'BANK\\s+(?:OFFICER\\s+)?E-?MAIL')||grab(bankClusterA,'BANKIER?\\s+E-?MAIL')||gA('OFFICER\\s+E-?MAIL'),
    benCompany:buyCompany,
    benReg:buyReg,
    benCountry:grab(tableBlockB,'NATIONALITY')||grab(tableBlockB,'ISSUING\\s+COUNTRY')||gB('NATIONALITY')||gB('PLACE\\s+OF\\s+ISSUE')||'',
    benAddr:buyAddr,
    benRep:buyRep,
    benTitle:buyTitle,
    benPassport:buyPP,
    benEmail:gB('E-?MAIL')||'',
    rcvBankName:grab(rcvBankCoordTbl,'BANK\\s+NAME')||grabBareBank(rcvBankCoordTbl)||grab(receiverBank,'BANK\\s+NAME')||grab(buyBankCoord,'BANK\\s+NAME')||grab(bankClusterB,'BANK\\s+NAME')||grabBareBank(bankClusterB)||grab(cisBuyer,'BANK\\s+NAME')||gB('BANK\\s+NAME'),
    rcvBankAddr:grab(rcvBankCoordTbl,'ADDRESS')||grabBareAddr(rcvBankCoordTbl)||grab(receiverBank,'BANK\\s+ADDRESS')||grab(buyBankCoord,'BANK\\s+ADDRESS')||grab(bankClusterB,'BANK\\s+ADDRESS')||grabBareAddr(bankClusterB)||grab(cisBuyer,'BANK\\s+ADDRESS')||gB('BANK\\s+ADDRESS')||gB('ADDRESS'),
    rcvSwift:grab(rcvBankCoordTbl,'SWIFT\\s+CODE')||grab(receiverBank,'SWIFT\\s+CODE')||grab(buyBankCoord,'SWIFT\\s+CODE')||grab(bankClusterB,'SWIFT\\s+CODE')||grab(cisBuyer,'SWIFT\\s+CODE')||gB('SWIFT\\s+CODE'),
    rcvIban:grab(rcvBankCoordTbl,'IBAN')||grab(receiverBank,'IBAN')||grab(bankClusterB,'IBAN')||grab(cisBuyer,'IBAN\\s+NUMBER')||gB('IBAN'),
    rcvAcctNo:grab(rcvBankCoordTbl,'ACCOUNT\\s+NUMBER')||grab(receiverBank,'ACCOUNT\\s+NUMBER')||grab(bankClusterB,'ACCOUNT\\s+NUMBER')||grab(cisBuyer,'ACCOUNT\\s+NO')||gB('ACCOUNT\\s+NUMBER')||gB('BANK\\s+ACCOUNT\\s+NO'),
    rcvAcctName:grab(rcvBankCoordTbl,'ACCOUNT\\s+NAME')||grab(receiverBank,'ACCOUNT\\s+NAME')||grab(bankClusterB,'ACCOUNT\\s+NAME')||grab(cisBuyer,'ACCOUNT\\s+NAME')||gB('ACCOUNT\\s+NAME'),
    rcvOfficer:grab(rcvBankCoordTbl,'BANK\\s+OFFICER')||grab(receiverBank,'BANK\\s+OFFICER')||grab(bankClusterB,'BANK\\s+OFFICER')||grab(bankClusterB,'BANK\\s+OFFICIER')||grab(cisBuyer,'BANK\\s+OFFICER\\s+NAME')||gB('BANK\\s+OFFICER'),
    rcvOfficerEmail:grab(rcvBankCoordTbl,'BANK\\s+(?:OFFICER\\s+)?E-?MAIL')||grab(receiverBank,'BANK\\s+(?:OFFICER\\s+)?E-?MAIL')||grab(bankClusterB,'BANK\\s+(?:OFFICER\\s+)?E-?MAIL')||grab(bankClusterB,'BANK\\s+OFFICIER\\s+E-?MAIL')||grab(cisBuyer,'BANK\\s+(?:OFFICER\\s+)?E-?MAIL')||grab(cisBuyer,'BANK\\s+EMAIL\\s+ADDRESS')||gB('OFFICER\\s+E-?MAIL'),
    sblcRef:txCode,
    txCode:txCode,
    faceValue:faceValue,
    currency:currency,
    jurisdiction:(function(){var m=T.match(/laws\s+of\s+(?:the\s+)?([A-Za-z\s]{2,30})[\.\,]/i);return m?m[1].trim():''})()
  };
}

/* ═══════════════════════════════════════════════════════
   DOA RESET
   ═══════════════════════════════════════════════════════ */
function resetDOA(){
  ['doaZone1','doaZone2'].forEach(function(id){
    var z=document.getElementById(id);if(!z)return;
    z.style.borderColor='';z.style.background='var(--panel)';
    z.innerHTML='<div style="font-size:28px;margin-bottom:8px">📄</div><div style="font-size:11px;font-weight:600;color:var(--txt);margin-bottom:4px">Have a DOA?</div><div style="font-size:8.5px;color:var(--muted2)">Drag & drop your DOA here · .docx or .pdf · or click to browse</div><div style="font-size:8px;color:var(--muted);font-style:italic">We\'ll extract fields automatically — or skip and fill manually</div>';
  });
  ['doaFile','doaFile2'].forEach(function(id){var el=document.getElementById(id);if(el)el.value=''});
  var ap=document.getElementById('doaAuditPanel');if(ap){ap.style.display='none';ap.innerHTML=''}
  /* Hide supporting panels */
  ['docUploadsPanel','signDOAPanel','invitePanel','securityBanner','dealRefBanner','ncndaPanel','mandateAuthPanel','sigCapturePanel'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display='none'});
  /* Clear extracted data fields but keep role/split config */
  var keep={currency:1,rules:1,confirmation:1,formUndertaking:1,role:1,splitSender:1,splitReceiver:1,splitSenderMandate:1,splitReceiverMandate:1,imfpaRef:1,paymaster:1,commAmt:1};
  var newD={};for(var k in D){if(keep[k])newD[k]=D[k]}
  D=newD;
  D.currency=D.currency||'';
  D.rules=D.rules||'NONE';
  D.confirmation=D.confirmation||'WITHOUT';
  D.formUndertaking=D.formUndertaking||'STBY';
  dealRef='';D.dealRef='';
  document.querySelectorAll('.deal-ref-display').forEach(function(el){el.textContent='—'});
  showT('DOA cleared — ready for a new upload');
}

/* ═══════════════════════════════════════════════════════
   AUDIT FIELD LIVE UPDATES
   ═══════════════════════════════════════════════════════ */
function updateAuditField(input,key,needsVerify){
  var val=input.value.trim();
  D[key]=val;
  var st=input.nextElementSibling;
  if(!st||!st.classList.contains('audit-status'))return;
  if(val.length>1){
    input.style.borderColor=needsVerify?'rgba(212,160,23,.5)':'rgba(42,128,80,.5)';
    st.className='audit-status '+(needsVerify?'st-warn':'st-ok');
    st.innerHTML=(needsVerify?'⚠ Needs Verification':'✓ Extracted')+'<div class="tip">'+(needsVerify?'This field needs independent verification. Confirm with the bank or official records directly.':'This field looks good. Review to make sure the value is correct.')+'</div>';
  }else{
    input.style.borderColor='rgba(176,48,48,.4)';
    st.className='audit-status st-err';
    st.innerHTML='✗ Missing<div class="tip">This field is empty. Fill it in manually to continue.</div>';
  }
}

/* ═══════════════════════════════════════════════════════
   SWIFT/BIC LIVE VALIDATION
   ═══════════════════════════════════════════════════════ */
function updateAuditSwift(input,key){
  var val=input.value.replace(/\s/g,'').toUpperCase();
  D[key]=val;
  input.value=val;
  var st=input.nextElementSibling;
  if(!st)return;
  /* Clear old suggestions below */
  var parent=input.parentElement;
  var oldSugs=parent.querySelectorAll('.swift-sug');
  oldSugs.forEach(function(s){s.remove()});

  if(val.length<1){
    input.style.borderColor='rgba(176,48,48,.4)';
    st.className='audit-status st-err';
    st.innerHTML='✗ Missing<div class="tip">The SWIFT/BIC code is required for SWIFT transmission. Enter the 8 or 11 character code, e.g. HBUKGB4124C.</div>';
    return;
  }
  var valid=/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(val);
  if(valid){
    input.style.borderColor='rgba(42,128,80,.5)';
    st.className='audit-status st-ok';
    st.innerHTML='✓ Valid SWIFT · Country: '+val.slice(4,6)+'<div class="tip">This SWIFT/BIC code has a valid format. Country detected: '+val.slice(4,6)+'. You should still verify it directly with the bank.</div>';
    var note=document.createElement('div');
    note.className='swift-sug';
    note.style.cssText='font-size:8px;color:var(--green);margin-top:3px';
    note.textContent='Format valid — still verify directly with the bank';
    st.parentElement.insertBefore(note,st.nextSibling);
  }else{
    input.style.borderColor='rgba(176,48,48,.4)';
    st.className='audit-status st-err';
    st.innerHTML='✗ Invalid Format<div class="tip">This SWIFT/BIC code does not match the standard format. It must be exactly 8 or 11 characters: 4 letters (bank) + 2 letters (country) + 2 alphanumeric (location) + optional 3 alphanumeric (branch).</div>';
    var suggestions=[];
    if(val.length<8)suggestions.push('Must be 8 or 11 characters (currently '+val.length+')');
    if(val.length>11)suggestions.push('Too long — max 11 characters (currently '+val.length+')');
    if(/[^A-Z0-9]/.test(val))suggestions.push('Remove special characters');
    if(val.length>=4&&!/^[A-Z]{4}/.test(val.slice(0,4)))suggestions.push('First 4 chars must be letters (bank code)');
    if(val.length>=6&&!/^[A-Z]{2}$/.test(val.slice(4,6)))suggestions.push('Chars 5-6 must be letters (country code, e.g. GB, US, AE)');
    suggestions.forEach(function(s){
      var el=document.createElement('div');
      el.className='swift-sug';
      el.style.cssText='font-size:8px;color:var(--red);margin-top:3px;line-height:1.4';
      el.textContent='💡 '+s;
      parent.appendChild(el);
    });
  }
}

/* ═══════════════════════════════════════════════════════
   BANK OFFICER VERIFICATION
   ═══════════════════════════════════════════════════════ */
function handleOfficerCard(officerId,file,zone){
  if(!file)return;
  if(!window._officerVerify)window._officerVerify={};
  window._officerVerify[officerId]='partial';
  zone.classList.add('uploaded');
  zone.style.borderStyle='solid';
  zone.innerHTML='<div style="font-size:14px;margin-bottom:2px">✓</div><div style="font-weight:600;color:#D4A017">Card Uploaded</div><div style="color:var(--muted2);margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%">'+file.name+'</div>';
  /* Update tier display */
  var tierEl=document.getElementById('bc-'+officerId);
  if(tierEl){
    var parentDiv=tierEl.closest('div[style*="border-bottom"]');
    if(parentDiv){
      var tierLabels=parentDiv.querySelectorAll('div[style*="font-size:7.5px"]');
      tierLabels.forEach(function(el){
        if(el.textContent.indexOf('Unverified')!==-1||el.textContent.indexOf('Partial')!==-1||el.textContent.indexOf('Verified')!==-1){
          el.style.color='#D4A017';el.textContent='◐ Partial Verification — business card on file';
        }
      });
    }
  }
  checkOfficerFullVerify(officerId);
  showT('🪪 Business card uploaded — partial verification for '+officerId.replace('Officer',''));
}

/* ═══════════════════════════════════════════════════════
   OFFICER LINKEDIN SEARCH
   ═══════════════════════════════════════════════════════ */
function checkOfficerLinkedIn(officerId,name){
  if(!name||name.length<2){showT('Enter officer name first');return}
  var bankName='';
  if(officerId==='issOfficer')bankName=D.issBankName||'';
  if(officerId==='rcvOfficer')bankName=D.rcvBankName||'';
  var q=encodeURIComponent(name+(bankName?' '+bankName:''));
  window.open('https://www.linkedin.com/search/results/people/?keywords='+q,'_blank');
  if(!window._officerVerify)window._officerVerify={};
  if(!window._officerVerify[officerId+'_linkedin'])window._officerVerify[officerId+'_linkedin']=true;
  checkOfficerFullVerify(officerId);
  showT('🔍 LinkedIn search opened for '+name);
}

/* ═══════════════════════════════════════════════════════
   OFFICER FULL VERIFICATION CHECK
   ═══════════════════════════════════════════════════════ */
function checkOfficerFullVerify(officerId){
  if(!window._officerVerify)return;
  var hasCard=(window._officerVerify[officerId]==='partial'||window._officerVerify[officerId]==='verified');
  var hasLinkedIn=!!window._officerVerify[officerId+'_linkedin'];
  if(hasCard&&hasLinkedIn){
    window._officerVerify[officerId]='verified';
    /* Update UI if possible */
    var tierEl=document.getElementById('bc-'+officerId);
    if(tierEl){
      var parentDiv=tierEl.closest('div[style*="border-bottom"]');
      if(parentDiv){
        var tierLabels=parentDiv.querySelectorAll('div[style*="font-size:7.5px"]');
        tierLabels.forEach(function(el){
          if(el.textContent.indexOf('Partial')!==-1||el.textContent.indexOf('Unverified')!==-1||el.textContent.indexOf('Verified')!==-1){
            el.style.color='var(--green)';el.textContent='● Verified — business card + LinkedIn confirmed';
          }
        });
      }
    }
    showT('✓ Officer '+officerId.replace('Officer','')+' — VERIFIED (card + LinkedIn)');
  }
}

/* ===== Commission Split System ===== */
var commMode='standard';

/* ═══════════════════════════════════════════════════════
   COMMISSION SPLIT SYSTEM
   ═══════════════════════════════════════════════════════ */
function setCommMode(mode){
  commMode=mode;
  document.getElementById('modeStd').classList.toggle('active',mode==='standard');
  document.getElementById('modeDX').classList.toggle('active',mode==='dealex');
  document.getElementById('commStandard').style.display=mode==='standard'?'block':'none';
  document.getElementById('commDealex').style.display=mode==='dealex'?'block':'none';
  var pill=document.getElementById('splitPill');
  if(mode==='dealex'){pill.textContent='DEALEX';pill.className='pill pg'}
  else{updateSplit()}
}
function updateSplit(){
  var s=parseFloat(document.getElementById('splitSender').value)||0;
  var r=parseFloat(document.getElementById('splitReceiver').value)||0;
  var sm=parseFloat(document.getElementById('splitSenderMandate').value)||0;
  var rm=parseFloat(document.getElementById('splitReceiverMandate').value)||0;
  var total=s+r+sm+rm;
  document.getElementById('barSender').style.width=Math.max(s,0)+'%';
  document.getElementById('barSender').textContent=s>3?'S '+s+'%':'';
  document.getElementById('barReceiver').style.width=Math.max(r,0)+'%';
  document.getElementById('barReceiver').textContent=r>3?'R '+r+'%':'';
  document.getElementById('barSM').style.width=Math.max(sm,0)+'%';
  document.getElementById('barSM').textContent=sm>3?'SM '+sm+'%':'';
  document.getElementById('barRM').style.width=Math.max(rm,0)+'%';
  document.getElementById('barRM').textContent=rm>3?'RM '+rm+'%':'';
  var totalEl=document.getElementById('splitTotal');
  totalEl.textContent='TOTAL: '+total+'%';
  totalEl.className='split-total '+(Math.abs(total-100)<0.01?'ok':'err');
  var pill=document.getElementById('splitPill');
  if(Math.abs(total-100)<0.01){pill.textContent='100% ✓';pill.className='pill pg'}
  else{pill.textContent=total+'% ✗';pill.className='pill pr'}
  D.splitSender=s;D.splitReceiver=r;D.splitSenderMandate=sm;D.splitReceiverMandate=rm;
}

/* ═══════════════════════════════════════════════════════
   DOCUMENT UPLOAD HANDLER
   ═══════════════════════════════════════════════════════ */
/* Base64 image store for embedding in generated documents */
var docImageData={};
var mandateAuthFile=null;

function handleMandateAuth(file,zone){
  if(!file)return;
  mandateAuthFile=file;
  captureDocImage('mandateAuth',file);
  zone.style.borderColor='rgba(42,128,80,.5)';
  zone.style.background='var(--green-a)';
  zone.style.borderStyle='solid';
  zone.innerHTML='<div style="font-size:18px;margin-bottom:2px">✓</div><div style="font-size:8px;font-weight:600;color:var(--green)">Authorization Letter Uploaded</div><div style="font-size:6.5px;color:var(--muted2);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%">'+file.name+'</div>';
  var pill=document.getElementById('mandateAuthPill');
  if(pill){pill.textContent='✓ Uploaded';pill.className='pill pg'}
  showT('✓ Mandate authorization letter uploaded');
}

function captureDocImage(key,file){
  if(!file)return;
  var isImage=/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file.name);
  if(!isImage)return;
  var reader=new FileReader();
  reader.onload=function(e){docImageData[key]=e.target.result};
  reader.readAsDataURL(file);
}

function handleDocUpload2(type,file,zone){
  if(!file)return;
  uploadedDocs2[type]=file;
  captureDocImage(type,file);
  zone.classList.add('uploaded');
  zone.innerHTML='<div style="font-size:18px;margin-bottom:2px">✓</div><div style="font-size:7.5px;font-weight:600;color:var(--green)">Uploaded</div><div style="font-size:6.5px;color:var(--muted2);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%">'+file.name+'</div>';
  var cnt=0;for(var k in uploadedDocs2)if(uploadedDocs2[k])cnt++;
  var pill=document.getElementById('docsPill');if(pill){pill.textContent=cnt+' / 5';pill.className='pill '+(cnt>=5?'pg':cnt>=3?'po':'pr')}
  showT('✓ '+file.name+' uploaded');
}

/* ═══════════════════════════════════════════════════════
   IMFPA DOCUMENT GENERATOR
   ═══════════════════════════════════════════════════════ */
function openIMFPA(){
  var d=D;
  var s=parseFloat(document.getElementById('splitSender').value)||45;
  var r=parseFloat(document.getElementById('splitReceiver').value)||45;
  var sm=parseFloat(document.getElementById('splitSenderMandate').value)||5;
  var rm=parseFloat(document.getElementById('splitReceiverMandate').value)||5;
  var ref=d.imfpaRef||'IMFPA-'+((dealRef||'DX-DRAFT').replace('DX-',''));
  var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  var v=function(x){return x||'_____________________'};
  var smName=d.senderMandateName||'';
  var rmName=d.receiverMandateName||'';
  var smPP=d.senderMandatePassport||'';
  var rmPP=d.receiverMandatePassport||'';
  var w=openDocWindow();
  w.document.write('<!DOCTYPE html><html><head><title>DEALEX IMFPA — '+ref+'</title>');
  w.document.write('<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;font-size:10px;color:#111;background:#fff;padding:0}.page{max-width:800px;margin:0 auto;padding:40px 50px}.hdr{text-align:center;border-bottom:3px solid #3B49DF;padding-bottom:20px;margin-bottom:24px}.hdr .logo{font-size:28px;font-weight:800;letter-spacing:.3em;margin-bottom:4px}.hdr .logo span{color:#3B49DF}.hdr .subtitle{font-size:14px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#333}.hdr .ref{font-family:monospace;font-size:12px;color:#3B49DF;font-weight:700}.hdr .date{font-size:9px;color:#888;margin-top:4px}.sec{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#3B49DF;font-weight:700;border-bottom:1px solid #ddd;padding:6px 0;margin:20px 0 10px}.legal{font-size:9.5px;line-height:1.8;color:#333;margin-bottom:12px;text-align:justify}.legal strong{color:#111}table{width:100%;border-collapse:collapse;margin-bottom:16px}td,th{padding:6px 10px;border:1px solid #ddd;font-size:9.5px;text-align:left}th{background:#fafaf6;font-weight:700;color:#555;font-size:8px;letter-spacing:.1em;text-transform:uppercase}td:first-child{font-weight:600;width:35%;color:#555;background:#fdfcfa}.split-table td:nth-child(2){font-family:monospace;color:#3B49DF;font-weight:700;text-align:center;width:15%}.sig-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:20px 0}.sig-box{border:1px solid #ddd;padding:16px}.sig-box .label{font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:10px}.sig-line{border-bottom:2px solid #1A3D7C;height:50px;margin-bottom:6px}.sig-field{font-size:8.5px;color:#666;margin-bottom:8px}.sig-field span{display:inline-block;border-bottom:1px dotted #aaa;min-width:180px;margin-left:4px;color:#111}.initial-box{display:inline-block;width:30px;height:24px;border:1px solid #1A3D7C;margin:0 4px;vertical-align:middle}.warning{background:#fff5f5;border:1px solid #e5c0c0;padding:10px 12px;margin:12px 0;font-size:9px;color:#a33;line-height:1.6}.footer{text-align:center;border-top:2px solid #3B49DF;padding-top:12px;margin-top:30px;font-size:7.5px;color:#999}.no-print{margin:20px auto;text-align:center}.no-print button{padding:12px 30px;background:#3B49DF;color:#000;font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;border:none;cursor:pointer;margin:0 6px}.no-print button.sec-btn{background:transparent;color:#555;border:1px solid #ddd}@media print{.no-print{display:none}.page{padding:20px 30px}}</style></head><body>');
  w.document.write('<div class="no-print"><button onclick="window.print()">🖨️ Print IMFPA</button><button class="sec-btn" onclick="window.close()">✕ Close</button></div>');
  w.document.write('<div class="page">');
  w.document.write('<div class="hdr"><div class="logo">DEAL<span>EX</span></div><div class="subtitle">Irrevocable Master Fee Protection Agreement</div><div class="ref">'+ref+'</div><div class="date">Date: '+today+'</div></div>');
  w.document.write('<div class="sec">1. Preamble & Parties</div>');
  w.document.write('<div class="legal">This <strong>Irrevocable Master Fee Protection Agreement</strong> ("IMFPA") is entered into as of <strong>'+today+'</strong> by and between the following parties in connection with Deal Reference <strong>'+(dealRef||'[DEAL REF]')+'</strong>, governed by the International Chamber of Commerce (ICC) and applicable international trade law.</div>');
  w.document.write('<table><tr><th colspan="2">Party A — Sender / Provider / Applicant</th></tr><tr><td>Full Legal Name</td><td>'+v(d.appCompany)+'</td></tr><tr><td>Represented By</td><td>'+v(d.appRep)+'</td></tr><tr><td>Title / Position</td><td>'+v(d.appTitle)+'</td></tr><tr><td>Passport Number</td><td>'+v(d.appPassport)+'</td></tr><tr><td>Company Registration</td><td>'+v(d.appReg)+'</td></tr><tr><td>Address</td><td>'+v(d.appAddr)+'</td></tr><tr><td>Email</td><td>'+v(d.appEmail)+'</td></tr></table>');
  w.document.write('<table><tr><th colspan="2">Party B — Receiver / Beneficiary / Buyer</th></tr><tr><td>Full Legal Name</td><td>'+v(d.benCompany)+'</td></tr><tr><td>Represented By</td><td>'+v(d.benRep)+'</td></tr><tr><td>Title / Position</td><td>'+v(d.benTitle)+'</td></tr><tr><td>Passport Number</td><td>'+v(d.benPassport)+'</td></tr><tr><td>Company Registration</td><td>'+v(d.benReg)+'</td></tr><tr><td>Address</td><td>'+v(d.benAddr)+'</td></tr><tr><td>Email</td><td>'+v(d.benEmail)+'</td></tr></table>');
  w.document.write('<div class="sec">2. Transaction Details</div>');
  w.document.write('<table><tr><td>Instrument Type</td><td>'+(d.formUndertaking==='STBY'?'SBLC / MT760':'Demand Guarantee / MT760')+'</td></tr><tr><td>Transaction Reference</td><td>'+v(d.txCode)+'</td></tr><tr><td>DEALEX Reference</td><td>'+v(dealRef)+'</td></tr><tr><td>Currency</td><td>'+v(d.currency)+'</td></tr><tr><td>Face Value</td><td>'+v(d.faceValue)+'</td></tr><tr><td>Issuing Bank (Party A)</td><td>'+v(d.issBankName)+' — SWIFT: '+v(d.issSwift)+'</td></tr><tr><td>Advising Bank (Party B)</td><td>'+v(d.rcvBankName)+' — SWIFT: '+v(d.rcvSwift)+'</td></tr></table>');
  w.document.write('<div class="sec">3. Commission Split & Fee Structure</div>');
  w.document.write('<div class="legal">The total commission payable shall be divided as follows. <strong>The total allocation must equal 100%.</strong></div>');
  if(commMode==='dealex'){
    w.document.write('<div class="warning"><strong>DEALEX FACILITATED DEAL:</strong> DEALEX takes 100% of all commission proceeds and pays broker fees per the DEALEX Fee Schedule.</div>');
    w.document.write('<table class="split-table"><tr><th>Party</th><th>%</th><th>Description</th></tr><tr><td>DEALEX Platform</td><td>100%</td><td>All commission proceeds — broker fees paid separately by DEALEX</td></tr></table>');
  }else{
    w.document.write('<table class="split-table"><tr><th>Party</th><th>%</th><th>Description</th></tr><tr><td>Sender (Party A)</td><td>'+s+'%</td><td>Sender-side commission</td></tr><tr><td>Receiver (Party B)</td><td>'+r+'%</td><td>Receiver-side commission</td></tr><tr><td>Sender Mandate</td><td>'+sm+'%</td><td>Sender-side mandate fee</td></tr><tr><td>Receiver Mandate</td><td>'+rm+'%</td><td>Receiver-side mandate fee</td></tr><tr style="background:#fafaf6;font-weight:700"><td><strong>TOTAL</strong></td><td><strong>'+(s+r+sm+rm)+'%</strong></td><td></td></tr></table>');
  }
  w.document.write('<table><tr><td>Paymaster / Escrow Agent</td><td>'+v(d.paymaster)+'</td></tr><tr><td>Commission Amount</td><td>'+v(d.commAmt)+'</td></tr><tr><td>IMFPA Reference</td><td>'+ref+'</td></tr></table>');
  w.document.write('<div class="sec">4. Irrevocability & Binding Terms</div>');
  w.document.write('<div class="legal">4.1 This IMFPA is <strong>irrevocable and unconditional</strong> and shall remain in full force for the duration of the transaction, including extensions, renewals, rollovers, or subsequent tranches.</div>');
  w.document.write('<div class="legal">4.2 Commission percentages in Section 3 are <strong>non-negotiable once signed</strong> and shall be paid upon successful completion of the transaction.</div>');
  w.document.write('<div class="legal">4.3 Payment shall be made through the Paymaster/Escrow Agent within <strong>five (5) banking days</strong> of successful instrument delivery and authentication.</div>');
  w.document.write('<div class="sec">5. Non-Circumvention & Non-Disclosure</div>');
  w.document.write('<div class="legal">5.1 All parties agree to <strong>Non-Circumvention, Non-Disclosure, and Non-Competition</strong> per ICC Publication No. 600 (UCP 600) and ICC Publication No. 758 (URDG 758).</div>');
  w.document.write('<div class="legal">5.2 No party shall circumvent, avoid, bypass, or attempt to circumvent this Agreement to deny fees or commissions due.</div>');
  w.document.write('<div class="legal">5.3 Violation of non-circumvention shall result in liability for the <strong>full commission plus liquidated damages equal to 200%</strong> of the commission due.</div>');
  w.document.write('<div class="legal">5.4 All parties agree to maintain <strong>strict confidentiality</strong> regarding terms, pricing, banking coordinates, and identities.</div>');
  w.document.write('<div class="sec">6. Dispute Resolution & Governing Law</div>');
  w.document.write('<div class="legal">6.1 Disputes shall be submitted to <strong>binding arbitration</strong> under ICC rules, with seat in <strong>'+(d.jurisdiction||'London, United Kingdom')+'</strong>.</div>');
  w.document.write('<div class="legal">6.2 The prevailing party shall recover reasonable legal fees from the non-prevailing party.</div>');
  w.document.write('<div class="legal">6.3 This Agreement shall be governed by the laws of <strong>'+(d.jurisdiction||'England and Wales')+'</strong>.</div>');
  w.document.write('<div class="sec">7. Fee Protection & Anti-Manipulation</div>');
  w.document.write('<div class="legal">7.1 This IMFPA constitutes a <strong>Fee Protection Agreement</strong> and cannot be amended without unanimous written consent.</div>');
  w.document.write('<div class="legal">7.2 The Paymaster/Escrow Agent is <strong>irrevocably instructed</strong> not to release funds until all parties confirm satisfaction of obligations.</div>');
  w.document.write('<div class="legal">7.3 <strong>Conflict of Interest:</strong> Any broker introduced by a Mandate on one side must be listed on the opposite side\'s IMFPA. Violation renders the offending party\'s claim void.</div>');
  w.document.write('<div class="sec">8. Representations & Warranties</div>');
  w.document.write('<div class="legal">8.1 Each party represents: (a) full legal authority to enter this Agreement; (b) the transaction is lawful; (c) not subject to OFAC, EU, or UN sanctions; (d) all information provided is true and complete.</div>');
  w.document.write('<div class="legal">8.2 Each party acknowledges having had opportunity to seek independent legal counsel.</div>');
  w.document.write('<div class="sec">9. Initials — Acknowledgement of Terms</div>');
  var clauses=['Irrevocability & Binding Terms (Section 4)','Non-Circumvention & Non-Disclosure (Section 5)','Dispute Resolution & Governing Law (Section 6)','Fee Protection & Anti-Manipulation (Section 7)','Representations & Warranties (Section 8)','Commission Split as stated in Section 3'];
  w.document.write('<table><tr><th style="width:50%">Clause</th><th style="width:25%">Party A Initials</th><th style="width:25%">Party B Initials</th></tr>');
  clauses.forEach(function(c){w.document.write('<tr><td style="font-size:9px">'+c+'</td><td style="text-align:center"><div class="initial-box"></div></td><td style="text-align:center"><div class="initial-box"></div></td></tr>')});
  w.document.write('</table>');
  w.document.write('<div class="sec">10. Signatures — Binding Execution</div>');
  w.document.write('<div style="font-size:9px;color:#1A3D7C;font-weight:700;margin-bottom:8px;font-style:italic">All signatures must be in BLUE INK.</div>');
  w.document.write('<div class="legal">By signing below, each party confirms they have read this IMFPA in its entirety, agree to all terms, and acknowledge this agreement is irrevocable and legally binding.</div>');
  w.document.write('<div class="sig-grid">');
  w.document.write('<div class="sig-box"><div class="label">Party A — Sender / Provider</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(d.appRep)+'</span></div><div class="sig-field">Title: <span>'+v(d.appTitle)+'</span></div><div class="sig-field">Company: <span>'+v(d.appCompany)+'</span></div><div class="sig-field">Passport: <span>'+v(d.appPassport)+'</span></div><div class="sig-field">Date: <span></span></div><div class="sig-field">Company Stamp / Seal:</div><div style="border:1px dashed #ccc;height:60px;margin-top:4px"></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Party B — Receiver / Beneficiary</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(d.benRep)+'</span></div><div class="sig-field">Title: <span>'+v(d.benTitle)+'</span></div><div class="sig-field">Company: <span>'+v(d.benCompany)+'</span></div><div class="sig-field">Passport: <span>'+v(d.benPassport)+'</span></div><div class="sig-field">Date: <span></span></div><div class="sig-field">Company Stamp / Seal:</div><div style="border:1px dashed #ccc;height:60px;margin-top:4px"></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Sender Mandate</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(smName)+'</span></div><div class="sig-field">Passport: <span>'+v(smPP)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Receiver Mandate</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(rmName)+'</span></div><div class="sig-field">Passport: <span>'+v(rmPP)+'</span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('</div>');
  w.document.write('<div class="sec">Witnesses</div><div class="sig-grid">');
  w.document.write('<div class="sig-box"><div class="label">Witness 1</div><div class="sig-line"></div><div class="sig-field">Name: <span></span></div><div class="sig-field">Passport/ID: <span></span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Witness 2</div><div class="sig-line"></div><div class="sig-field">Name: <span></span></div><div class="sig-field">Passport/ID: <span></span></div><div class="sig-field">Date: <span></span></div></div>');
  w.document.write('</div>');
  w.document.write('<div class="sec">Paymaster / Escrow Agent Acknowledgement</div>');
  w.document.write('<div class="sig-grid"><div class="sig-box" style="grid-column:1/-1"><div class="label">Paymaster / Escrow Agent</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(d.paymaster)+'</span></div><div class="sig-field">Company: <span></span></div><div class="sig-field">License / Reg: <span></span></div><div class="sig-field">Date: <span></span></div><div class="sig-field">Company Stamp / Seal:</div><div style="border:1px dashed #ccc;height:60px;margin-top:4px"></div></div></div>');
  w.document.write('<div class="footer">DEALEX IMFPA · Reference: '+ref+' · Deal: '+(dealRef||'DRAFT')+'<br>ICC Publication No. 600 · ICC Publication No. 758<br>© '+new Date().getFullYear()+' DEALEX — All rights reserved.</div>');
  w.document.write('</div></body></html>');
  w.document.close();
}

/* ═══════════════════════════════════════════════════════
   LEGACY DOCUMENT UPLOAD
   ═══════════════════════════════════════════════════════ */
var uploadedDocs={passport:null,corp:null,stamp:null};
function handleDocUpload(type,file,zone){
  if(!file)return;
  var name=file.name,ext=name.split('.').pop().toUpperCase();
  uploadedDocs[type]=file;
  zone.style.borderColor='rgba(42,128,80,.5)';zone.style.background='var(--green-a)';
  var icons={passport:'🪪',corp:'🏢',stamp:'🔏'};
  zone.innerHTML='<div style="font-size:18px;margin-bottom:2px">'+icons[type]+'</div><div style="font-size:7.5px;font-weight:600;color:var(--green)">✓ Uploaded</div><div style="font-size:6.5px;color:var(--muted2);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%">'+name+'</div>';
  var cnt=0;for(var k in uploadedDocs)if(uploadedDocs[k])cnt++;
  var pill=document.getElementById('docsPill');if(pill){pill.textContent=cnt+' / 3';pill.className='pill '+(cnt>=3?'pg':'po')}
  showT('✓ '+name+' uploaded');
}

/* ═══════════════════════════════════════════════════════
   SIGNATURE CANVAS
   ═══════════════════════════════════════════════════════ */
var sigDrawing=false;
var savedSignature=null; /* base64 PNG of full signature */
var savedInitials=null;  /* base64 PNG or text initials */
var savedInitialsText=''; /* text version e.g. "MJW" */
var initialsDrawing=false;

function initSigCanvas(){
  var c=document.getElementById('sigCanvas');if(!c)return;
  if(c._inited)return;c._inited=true;
  var ctx=c.getContext('2d');
  function getPos(e){var r=c.getBoundingClientRect();var t=e.touches?e.touches[0]:e;return{x:(t.clientX-r.left)*(c.width/r.width),y:(t.clientY-r.top)*(c.height/r.height)}}
  c.addEventListener('mousedown',function(e){sigDrawing=true;var p=getPos(e);ctx.beginPath();ctx.moveTo(p.x,p.y)});
  c.addEventListener('mousemove',function(e){if(!sigDrawing)return;var p=getPos(e);ctx.lineTo(p.x,p.y);ctx.strokeStyle='#1A3D7C';ctx.lineWidth=2;ctx.lineCap='round';ctx.stroke()});
  c.addEventListener('mouseup',function(){sigDrawing=false});
  c.addEventListener('mouseleave',function(){sigDrawing=false});
  c.addEventListener('touchstart',function(e){e.preventDefault();sigDrawing=true;var p=getPos(e);ctx.beginPath();ctx.moveTo(p.x,p.y)},{passive:false});
  c.addEventListener('touchmove',function(e){e.preventDefault();if(!sigDrawing)return;var p=getPos(e);ctx.lineTo(p.x,p.y);ctx.strokeStyle='#1A3D7C';ctx.lineWidth=2;ctx.lineCap='round';ctx.stroke()},{passive:false});
  c.addEventListener('touchend',function(){sigDrawing=false});
  /* Auto-generate initials from name */
  updateAutoInitials();
}

function initInitialsCanvas(){
  var c=document.getElementById('initialsCanvas');if(!c)return;
  if(c._inited)return;c._inited=true;
  var ctx=c.getContext('2d');
  function getPos(e){var r=c.getBoundingClientRect();var t=e.touches?e.touches[0]:e;return{x:(t.clientX-r.left)*(c.width/r.width),y:(t.clientY-r.top)*(c.height/r.height)}}
  c.addEventListener('mousedown',function(e){initialsDrawing=true;var p=getPos(e);ctx.beginPath();ctx.moveTo(p.x,p.y)});
  c.addEventListener('mousemove',function(e){if(!initialsDrawing)return;var p=getPos(e);ctx.lineTo(p.x,p.y);ctx.strokeStyle='#1A3D7C';ctx.lineWidth=2;ctx.lineCap='round';ctx.stroke()});
  c.addEventListener('mouseup',function(){initialsDrawing=false});
  c.addEventListener('mouseleave',function(){initialsDrawing=false});
  c.addEventListener('touchstart',function(e){e.preventDefault();initialsDrawing=true;var p=getPos(e);ctx.beginPath();ctx.moveTo(p.x,p.y)},{passive:false});
  c.addEventListener('touchmove',function(e){e.preventDefault();if(!initialsDrawing)return;var p=getPos(e);ctx.lineTo(p.x,p.y);ctx.strokeStyle='#1A3D7C';ctx.lineWidth=2;ctx.lineCap='round';ctx.stroke()},{passive:false});
  c.addEventListener('touchend',function(){initialsDrawing=false});
}

function clearSig(){
  var c=document.getElementById('sigCanvas');
  if(c){var ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height)}
  savedSignature=null;
  updateSigStatus();
  showT('Signature cleared');
}

function clearInitials(){
  var c=document.getElementById('initialsCanvas');
  if(c){var ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height)}
  showT('Initials cleared');
}

function updateAutoInitials(){
  var name=D.appRep||D.benRep||'';
  var parts=name.replace(/MR\.?\s*/i,'').replace(/MRS\.?\s*/i,'').replace(/MS\.?\s*/i,'').replace(/DR\.?\s*/i,'').trim().split(/\s+/);
  var initials='';
  parts.forEach(function(p){if(p.length>0)initials+=p.charAt(0).toUpperCase()});
  savedInitialsText=initials;
  var el=document.getElementById('autoInitialsDisplay');
  if(el)el.textContent=initials||'—';
}

function useAutoInitials(){
  updateAutoInitials();
  if(!savedInitialsText){showT('No name found — enter name in DOA first');return}
  savedInitials=savedInitialsText;
  updateSigStatus();
  showT('✓ Initials set: '+savedInitialsText);
}

function saveSig(){
  var c=document.getElementById('sigCanvas');if(!c)return;
  var ctx=c.getContext('2d');
  var pixels=ctx.getImageData(0,0,c.width,c.height).data;
  var hasSig=false;
  for(var i=3;i<pixels.length;i+=4){if(pixels[i]>0){hasSig=true;break}}
  if(!hasSig){showT('Draw your signature first');return}
  savedSignature=c.toDataURL('image/png');
  updateSigStatus();
  showT('✓ Signature saved');
}

function saveInitials(){
  var c=document.getElementById('initialsCanvas');if(!c)return;
  var ctx=c.getContext('2d');
  var pixels=ctx.getImageData(0,0,c.width,c.height).data;
  var hasDrawn=false;
  for(var i=3;i<pixels.length;i+=4){if(pixels[i]>0){hasDrawn=true;break}}
  if(!hasDrawn){showT('Draw your initials first');return}
  savedInitials=c.toDataURL('image/png');
  updateSigStatus();
  showT('✓ Custom initials saved');
}

function updateSigStatus(){
  var status=document.getElementById('sigStatus');
  var pill=document.getElementById('sigCapturePill');
  var preview=document.getElementById('sigPreview');
  var initPrev=document.getElementById('initialsPreview');
  var doaPreview=document.getElementById('doaSigPreview');
  var doaImg=document.getElementById('doaSigImg');
  var hasSig=!!savedSignature;
  var hasInit=!!savedInitials;
  if(status)status.style.display=(hasSig||hasInit)?'block':'none';
  if(preview&&savedSignature)preview.src=savedSignature;
  if(initPrev){
    if(savedInitials&&savedInitials.indexOf('data:')===0){
      initPrev.innerHTML='<img src="'+savedInitials+'" style="max-height:30px;border:1px solid var(--border)">';
    }else if(savedInitials){
      initPrev.textContent=savedInitials;
    }
  }
  if(pill){
    if(hasSig&&hasInit){pill.textContent='✓ Done';pill.className='pill pg'}
    else if(hasSig||hasInit){pill.textContent='Partial';pill.className='pill po'}
    else{pill.textContent='Required';pill.className='pill pr'}
  }
  /* Update DOA generate panel preview */
  if(doaPreview)doaPreview.style.display=hasSig?'block':'none';
  if(doaImg&&savedSignature)doaImg.src=savedSignature;
}

/* Init canvases when sigCapturePanel becomes visible — use simple interval check instead of MutationObserver */
var sigInitInterval=setInterval(function(){
  var p=document.getElementById('sigCapturePanel');
  if(p&&p.style.display!=='none'&&p.offsetParent!==null){
    clearInterval(sigInitInterval);
    initSigCanvas();
    initInitialsCanvas();
    updateAutoInitials();
  }
},500);

/* ═══════════════════════════════════════════════════════
   BANK SUBMISSION PACKAGE
   ═══════════════════════════════════════════════════════ */
var bankPkgDocs={sof:null,ubo:null,balance:null};
var compChecks=[false,false,false,false,false];

function handleBankPkgDoc(type,file,zone){
  if(!file)return;
  bankPkgDocs[type]=file;
  zone.classList.add('uploaded');
  zone.innerHTML='<div style="font-size:14px;margin-bottom:2px">✓</div><div style="font-size:7px;font-weight:600;color:var(--green)">Uploaded</div><div style="font-size:5.5px;color:var(--muted2);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%">'+file.name+'</div>';
  updateBankPkgChecklist();
  showT('✓ '+file.name+' attached');
}

function toggleCompCheck(i){
  compChecks[i]=!compChecks[i];
  var cx=document.getElementById('compCx'+i);
  var row=cx.parentElement;
  if(compChecks[i]){cx.textContent='✓';cx.style.background='var(--green)';cx.style.borderColor='var(--green)';cx.style.color='#fff';row.classList.add('dn')}
  else{cx.textContent='';cx.style.background='';cx.style.borderColor='';cx.style.color='';row.classList.remove('dn')}
  updateBankPkgChecklist();
}

function updateBankPkgChecklist(){
  var d=D;
  var items=[
    {l:'Signed DOA on file',ok:!!dealRef},
    {l:'Beneficiary details complete (receiver)',ok:!!(d.benCompany&&d.benRep)},
    {l:'Receiver bank SWIFT/BIC verified',ok:!!(d.rcvSwift&&d.rcvSwift.length>=8)},
    {l:'Amount & currency confirmed',ok:!!(d.faceValue&&d.currency)},
    {l:'Instrument type selected',ok:!!document.getElementById('cilInstType').value},
    {l:'Tenor / validity period set',ok:!!(document.getElementById('cilTenor').value)},
    {l:'Governing rules selected',ok:!!document.getElementById('cilRules').value},
    {l:'Collateral type confirmed',ok:!!document.getElementById('cilCollateral').value},
    {l:'Source of Funds uploaded',ok:!!bankPkgDocs.sof},
    {l:'UBO declaration uploaded',ok:!!bankPkgDocs.ubo},
    {l:'IMFPA executed (commission protection)',ok:!!(d.imfpaRef||d.paymaster)},
    {l:'All 5 compliance declarations confirmed',ok:compChecks.every(function(c){return c})},
    {l:'Issuing bank relationship confirmed',ok:!!(d.issBankName&&d.issSwift)},
    {l:'Bank officer contact on file',ok:!!(d.issOfficer)}
  ];
  var done=0;
  var h='';
  items.forEach(function(it,i){
    if(it.ok)done++;
    h+='<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border);font-size:9.5px">';
    h+='<span style="font-size:12px;flex-shrink:0">'+(it.ok?'✅':'❌')+'</span>';
    h+='<span style="color:'+(it.ok?'var(--muted2)':'var(--white)')+';'+(it.ok?'text-decoration:line-through':'font-weight:500')+'">'+it.l+'</span>';
    h+='</div>';
  });
  var el=document.getElementById('bankPkgChecklist');
  if(el)el.innerHTML=h;
  var pct=Math.round((done/items.length)*100);
  var pctEl=document.getElementById('bankPkgPct');
  var barEl=document.getElementById('bankPkgBar');
  var pillEl=document.getElementById('bankPkgPill');
  if(pctEl){pctEl.textContent=pct+'%';pctEl.style.color=pct>=90?'var(--green)':pct>=50?'var(--gold)':'var(--muted2)'}
  if(barEl){barEl.style.width=pct+'%';barEl.style.background=pct>=90?'var(--green)':'var(--gold)';barEl.setAttribute('aria-valuenow',pct)}
  if(pillEl){
    if(pct>=100){pillEl.textContent='Ready';pillEl.className='pill pg'}
    else if(pct>=70){pillEl.textContent=pct+'%';pillEl.className='pill po'}
    else{pillEl.textContent=pct+'%';pillEl.className='pill pr'}
  }
}

function generateCIL(){
  var d=D;
  var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  var ref=dealRef||'DX-DRAFT';
  var v=function(x){return x||'_____________________'};
  var instType=document.getElementById('cilInstType').value||'SBLC';
  var instNames={SBLC:'Standby Letter of Credit',DLC:'Documentary Letter of Credit',BG:'Bank Guarantee'};
  var tenor=document.getElementById('cilTenor').value||'';
  var rules=document.getElementById('cilRules').value||'ISP98';
  var delivery=document.getElementById('cilDelivery').value||'MT760';
  var collateral=document.getElementById('cilCollateral').value||'';
  var collNames={cash:'Cash-Backed (funds in account)',earmarked:'Earmarked Funds',asset:'Asset-Backed',credit:'Credit Line / Facility'};
  var collDetail=document.getElementById('cilCollateralDetail').value||'';
  var issuanceFee=document.getElementById('cilIssuanceFee').value||'';
  var swiftFee=document.getElementById('cilSwiftFee').value||'';
  var w=openDocWindow();
  if(!w){showT('Pop-up blocked');return}
  w.document.write('<!DOCTYPE html><html><head><title>Client Instruction Letter — '+ref+'</title>');
  w.document.write('<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;font-size:11px;color:#111;background:#fff}.page{max-width:800px;margin:0 auto;padding:40px 50px}.hdr{text-align:center;border-bottom:3px solid #3B49DF;padding-bottom:20px;margin-bottom:24px}.hdr .logo{font-size:28px;font-weight:800;letter-spacing:.3em;font-family:sans-serif}.hdr .logo span{color:#3B49DF}.hdr .subtitle{font-size:13px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#333;font-family:sans-serif}.hdr .ref{font-family:monospace;font-size:12px;color:#3B49DF;font-weight:700;margin-top:6px}.hdr .date{font-size:9px;color:#888;margin-top:4px}.sec{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#3B49DF;font-weight:700;border-bottom:1px solid #ddd;padding:6px 0;margin:22px 0 10px;font-family:sans-serif}.legal{font-size:10.5px;line-height:1.9;color:#333;margin-bottom:14px;text-align:justify}.legal strong{color:#111}table{width:100%;border-collapse:collapse;margin-bottom:14px}td{padding:6px 10px;border:1px solid #ddd;font-size:10.5px}td:first-child{font-weight:600;width:38%;color:#555;background:#fdfcfa}.sig-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:20px 0}.sig-box{border:1px solid #ddd;padding:16px}.sig-box .label{font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:10px;font-family:sans-serif}.sig-line{border-bottom:2px solid #1A3D7C;height:50px;margin-bottom:6px}.sig-field{font-size:9px;color:#666;margin-bottom:6px}.sig-field span{display:inline-block;border-bottom:1px dotted #aaa;min-width:180px;margin-left:4px;color:#111}.footer{text-align:center;border-top:2px solid #3B49DF;padding-top:12px;margin-top:30px;font-size:7.5px;color:#999;font-family:sans-serif}.no-print{margin:20px auto;text-align:center}.no-print button{padding:12px 30px;background:#3B49DF;color:#000;font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;border:none;cursor:pointer;margin:0 6px;font-family:sans-serif}.no-print button.sec-btn{background:transparent;color:#555;border:1px solid #ddd}.stamp-box{border:1px dashed #ccc;height:70px;margin-top:6px}@media print{.no-print{display:none}.page{padding:20px 30px}}</style></head><body>');
  w.document.write('<div class="no-print"><button onclick="window.print()">🖨️ Print CIL</button><button class="sec-btn" onclick="window.close()">✕ Close</button></div>');
  w.document.write('<div class="page">');
  /* Header */
  w.document.write('<div class="hdr"><div class="logo">DEAL<span>EX</span></div><div class="subtitle">Client Instruction Letter / Issuance Mandate</div><div class="ref">'+ref+'</div><div class="date">'+today+'</div></div>');
  /* Addressee */
  w.document.write('<div class="sec">To: Issuing Bank</div>');
  w.document.write('<table><tr><td>Bank Name</td><td>'+v(d.issBankName)+'</td></tr><tr><td>SWIFT / BIC</td><td>'+v(d.issSwift)+'</td></tr><tr><td>Bank Address</td><td>'+v(d.issBankAddr)+'</td></tr><tr><td>Attention: Bank Officer</td><td>'+v(d.issOfficer)+'</td></tr><tr><td>Officer Email</td><td>'+v(d.issOfficerEmail)+'</td></tr></table>');
  /* From */
  w.document.write('<div class="sec">From: Applicant / Sender</div>');
  w.document.write('<table><tr><td>Company</td><td>'+v(d.appCompany)+'</td></tr><tr><td>Represented By</td><td>'+v(d.appRep)+'</td></tr><tr><td>Title</td><td>'+v(d.appTitle)+'</td></tr><tr><td>Account Name</td><td>'+v(d.issAcctName)+'</td></tr><tr><td>IBAN</td><td>'+v(d.issIban)+'</td></tr><tr><td>Account No.</td><td>'+v(d.issAcctNo)+'</td></tr></table>');
  /* Instruction */
  w.document.write('<div class="sec">Instruction</div>');
  w.document.write('<div class="legal">I/We, <strong>'+v(d.appCompany)+'</strong>, represented by <strong>'+v(d.appRep)+'</strong>, hereby irrevocably instruct you to issue the following financial instrument and transmit it via authenticated SWIFT message to the Advising Bank specified below:</div>');
  /* Instrument Details */
  w.document.write('<div class="sec">Instrument Details</div>');
  w.document.write('<table><tr><td>Instrument Type</td><td>'+instType+' — '+(instNames[instType]||instType)+'</td></tr><tr><td>Currency & Amount</td><td>'+v(d.currency)+' '+v(d.faceValue)+'</td></tr><tr><td>Tenor / Validity</td><td>'+v(tenor)+'</td></tr><tr><td>Governing Rules</td><td>'+rules+'</td></tr><tr><td>Delivery Method</td><td>SWIFT '+delivery+'</td></tr><tr><td>Transaction Reference</td><td>'+v(d.txCode||d.sblcRef)+'</td></tr><tr><td>DEALEX Reference</td><td>'+ref+'</td></tr></table>');
  /* Beneficiary */
  w.document.write('<div class="sec">Beneficiary (Receiver)</div>');
  w.document.write('<table><tr><td>Beneficiary Company</td><td>'+v(d.benCompany)+'</td></tr><tr><td>Represented By</td><td>'+v(d.benRep)+'</td></tr><tr><td>Passport No.</td><td>'+v(d.benPassport)+'</td></tr></table>');
  /* Advising Bank */
  w.document.write('<div class="sec">Advising Bank (Receiver\'s Bank)</div>');
  w.document.write('<table><tr><td>Bank Name</td><td>'+v(d.rcvBankName)+'</td></tr><tr><td>SWIFT / BIC</td><td>'+v(d.rcvSwift)+'</td></tr><tr><td>IBAN</td><td>'+v(d.rcvIban)+'</td></tr><tr><td>Account No.</td><td>'+v(d.rcvAcctNo)+'</td></tr><tr><td>Bank Address</td><td>'+v(d.rcvBankAddr)+'</td></tr><tr><td>Bank Officer</td><td>'+v(d.rcvOfficer)+'</td></tr></table>');
  /* Collateral */
  w.document.write('<div class="sec">Collateral Instruction</div>');
  w.document.write('<div class="legal">I/We hereby authorize the bank to block, hold, or create a lien on the following collateral to secure the issuance of the above instrument:</div>');
  w.document.write('<table><tr><td>Collateral Type</td><td>'+(collNames[collateral]||'Not specified')+'</td></tr><tr><td>Details</td><td>'+v(collDetail)+'</td></tr></table>');
  /* Fees */
  w.document.write('<div class="sec">Fee Authorization</div>');
  w.document.write('<div class="legal">I/We agree to pay all fees associated with the issuance and transmission of this instrument, including but not limited to:</div>');
  w.document.write('<table><tr><td>Issuance Fee</td><td>'+v(issuanceFee)+'</td></tr><tr><td>SWIFT Transmission Fee</td><td>'+v(swiftFee)+'</td></tr><tr><td>Legal / Compliance Fees</td><td>Per bank schedule</td></tr></table>');
  /* Compliance */
  w.document.write('<div class="sec">Compliance Declarations</div>');
  w.document.write('<div class="legal">The undersigned hereby declares and warrants that:</div>');
  w.document.write('<div class="legal">a) Neither party to this transaction appears on OFAC, EU, or UN sanctions lists.<br>b) Funds and instruments are not being used for prohibited purposes.<br>c) This transaction complies with all applicable AML/CFT regulations.<br>d) There is no intent to defraud, misrepresent, or engage in circular trading.<br>e) This instrument is not intended for immediate discount, monetization, or credit-line leveraging.</div>');
  /* Signatures */
  w.document.write('<div class="sec">Authorization & Signature</div>');
  w.document.write('<div class="legal">By signing below, I/We authorize the bank to proceed with issuance of the above instrument upon completion of internal review and compliance verification.</div>');
  w.document.write('<div class="sig-grid">');
  w.document.write('<div class="sig-box"><div class="label">Applicant / Sender</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(d.appRep)+'</span></div><div class="sig-field">Title: <span>'+v(d.appTitle)+'</span></div><div class="sig-field">Company: <span>'+v(d.appCompany)+'</span></div><div class="sig-field">Date: <span></span></div><div class="sig-field">Company Stamp / Seal:</div><div class="stamp-box"></div></div>');
  w.document.write('<div class="sig-box"><div class="label">Bank Officer Acknowledgement</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(d.issOfficer)+'</span></div><div class="sig-field">Title: <span></span></div><div class="sig-field">Bank: <span>'+v(d.issBankName)+'</span></div><div class="sig-field">Date Received: <span></span></div><div class="sig-field">Bank Stamp:</div><div class="stamp-box"></div></div>');
  w.document.write('</div>');
  /* Footer */
  w.document.write('<div class="footer">DEALEX Client Instruction Letter · '+ref+'<br>This document is presented to the issuing bank as a formal instruction to issue the specified instrument.<br>© '+new Date().getFullYear()+' DEALEX</div>');
  w.document.write('</div></body></html>');
  w.document.close();
  showT('✓ CIL generated — '+ref);
}

function generateComplianceLetter(){
  var d=D;var ref=dealRef||'DX-DRAFT';
  var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  var v=function(x){return x||'_____________________'};
  var w=openDocWindow();
  if(!w){showT('Pop-up blocked');return}
  w.document.write('<!DOCTYPE html><html><head><title>Compliance Declaration — '+ref+'</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;font-size:11px;color:#111;background:#fff}.page{max-width:800px;margin:0 auto;padding:40px 50px}.hdr{text-align:center;border-bottom:3px solid #3B49DF;padding-bottom:16px;margin-bottom:20px}.hdr .logo{font-size:24px;font-weight:800;letter-spacing:.3em;font-family:sans-serif}.hdr .logo span{color:#3B49DF}.sec{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#3B49DF;font-weight:700;border-bottom:1px solid #ddd;padding:6px 0;margin:18px 0 10px;font-family:sans-serif}.legal{font-size:10.5px;line-height:1.9;color:#333;margin-bottom:12px;text-align:justify}.legal strong{color:#111}table{width:100%;border-collapse:collapse;margin-bottom:14px}td{padding:6px 10px;border:1px solid #ddd;font-size:10.5px}td:first-child{font-weight:600;width:38%;color:#555;background:#fdfcfa}.sig-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:20px 0}.sig-box{border:1px solid #ddd;padding:16px}.sig-box .label{font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#3B49DF;font-weight:700;margin-bottom:10px;font-family:sans-serif}.sig-line{border-bottom:2px solid #1A3D7C;height:50px;margin-bottom:6px}.sig-field{font-size:9px;color:#666;margin-bottom:6px}.sig-field span{display:inline-block;border-bottom:1px dotted #aaa;min-width:160px;margin-left:4px;color:#111}.footer{text-align:center;border-top:2px solid #3B49DF;padding-top:10px;margin-top:24px;font-size:7.5px;color:#999;font-family:sans-serif}.no-print{margin:16px auto;text-align:center}.no-print button{padding:10px 24px;background:#3B49DF;color:#000;font-size:9px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;border:none;cursor:pointer;margin:0 4px;font-family:sans-serif}.no-print button.sec-btn{background:transparent;color:#555;border:1px solid #ddd}@media print{.no-print{display:none}}</style></head><body>');
  w.document.write('<div class="no-print"><button onclick="window.print()">🖨️ Print</button><button class="sec-btn" onclick="window.close()">✕ Close</button></div>');
  w.document.write('<div class="page"><div class="hdr"><div class="logo">DEAL<span>EX</span></div><div style="font-size:13px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#333;font-family:sans-serif;margin-top:4px">Compliance Declaration</div><div style="font-family:monospace;font-size:11px;color:#3B49DF;font-weight:700;margin-top:6px">'+ref+'</div><div style="font-size:9px;color:#888;margin-top:4px">'+today+'</div></div>');
  w.document.write('<div class="legal">In connection with DEALEX Reference <strong>'+ref+'</strong>, the undersigned party hereby makes the following declarations and warranties:</div>');
  w.document.write('<div class="sec">Declarations</div>');
  var decls=['Neither party to this transaction appears on OFAC (Office of Foreign Assets Control), European Union, or United Nations sanctions lists, nor are they owned or controlled by sanctioned persons or entities.','The funds, instruments, and transaction described herein are not being used for any prohibited purpose under applicable law, including but not limited to the financing of terrorism, proliferation of weapons of mass destruction, or any activity prohibited under international law.','This transaction fully complies with all applicable Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) regulations in all relevant jurisdictions.','There is no intent to defraud, misrepresent material facts, or engage in circular trading, round-tripping, or any form of fictitious transaction.','The financial instrument described herein is not intended for immediate discount, monetization, hypothecation, or credit-line leveraging, and represents a genuine commercial or financial obligation.'];
  decls.forEach(function(d,i){w.document.write('<div class="legal"><strong>'+(i+1)+'.</strong> '+d+'</div>')});
  w.document.write('<div class="sec">Parties</div>');
  w.document.write('<table><tr><td>Sender / Applicant</td><td>'+v(d.appCompany)+' — '+v(d.appRep)+'</td></tr><tr><td>Receiver / Beneficiary</td><td>'+v(d.benCompany)+' — '+v(d.benRep)+'</td></tr></table>');
  w.document.write('<div class="sec">Signatures</div>');
  w.document.write('<div class="sig-grid"><div class="sig-box"><div class="label">Party A — Sender</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(d.appRep)+'</span></div><div class="sig-field">Company: <span>'+v(d.appCompany)+'</span></div><div class="sig-field">Date: <span></span></div></div><div class="sig-box"><div class="label">Party B — Receiver</div><div class="sig-line"></div><div class="sig-field">Name: <span>'+v(d.benRep)+'</span></div><div class="sig-field">Company: <span>'+v(d.benCompany)+'</span></div><div class="sig-field">Date: <span></span></div></div></div>');
  w.document.write('<div class="footer">DEALEX Compliance Declaration · '+ref+'<br>© '+new Date().getFullYear()+' DEALEX</div></div></body></html>');
  w.document.close();
  showT('✓ Compliance letter generated');
}

function generateBankPackage(){
  generateCIL();
  setTimeout(function(){generateComplianceLetter()},500);
  showT('📦 Bank package: CIL + Compliance letter generated');
}

/* ═══════════════════════════════════════════════════════
   BOOKING DATE
   ═══════════════════════════════════════════════════════ */
var bookingChecks={iss:false,rcv:false};

function toggleBookingCheck(side){
  bookingChecks[side]=!bookingChecks[side];
  var el=document.getElementById('booking'+(side==='iss'?'Iss':'Rcv')+'Confirm');
  var cx=document.getElementById('booking'+(side==='iss'?'Iss':'Rcv')+'Check');
  if(el)el.className='cr'+(bookingChecks[side]?' dn':'');
  if(cx)cx.innerHTML=bookingChecks[side]?'✓':'';
  updateBookingStatus();
}

function updateBookingStatus(){
  var date=document.getElementById('bookingDate').value||'';
  var time=document.getElementById('bookingTime').value||'';
  var tz=document.getElementById('bookingTimezone').value||'GMT';
  var issOfficer=document.getElementById('bookingIssOfficer').value||'';
  var rcvOfficer=document.getElementById('bookingRcvOfficer').value||'';
  var issConfirm=bookingChecks.iss;
  var rcvConfirm=bookingChecks.rcv;
  var allDone=date&&time&&issOfficer&&rcvOfficer&&issConfirm&&rcvConfirm;
  var pill=document.getElementById('bookingPill');
  var summary=document.getElementById('bookingSummary');
  if(allDone){
    if(pill){pill.textContent='✓ Booked';pill.className='pill pg'}
    if(summary){
      summary.style.display='block';
      var dateObj=new Date(date+'T00:00:00');
      var formatted=dateObj.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
      document.getElementById('bookingSummaryDate').textContent=formatted;
      document.getElementById('bookingSummaryTime').textContent=time+' '+tz;
      document.getElementById('bookingSummaryIss').textContent=issOfficer;
      document.getElementById('bookingSummaryRcv').textContent=rcvOfficer;
    }
    /* Store in D for document generation */
    D.bookingDate=date;
    D.bookingTime=time;
    D.bookingTimezone=tz;
    D.bookingIssOfficer=issOfficer;
    D.bookingRcvOfficer=rcvOfficer;
  }else{
    var partial=date||time||issOfficer||rcvOfficer;
    if(pill){pill.textContent=partial?'In Progress':'Not Set';pill.className='pill '+(partial?'po':'pr')}
    if(summary)summary.style.display='none';
  }
}

/* ═══════════════════════════════════════════════════════
   INVITE & SHARING FUNCTIONS
   ═══════════════════════════════════════════════════════ */
function buildInviteMessage(){
  var ref=dealRef||'DRAFT';
  var d=D;
  var customMsg=document.getElementById('inviteMsg').value.trim();
  var instrument=d.formUndertaking==='STBY'?'SBLC / MT760':'MT760';
  var faceVal=(d.currency?d.currency+' ':'')+(d.faceValue||'TBD');
  var senderName=d.appRep||d.appCompany||'';
  var receiverName=d.benRep||d.benCompany||'';
  var msg='';
  msg+='DEALEX — SECURE DEAL INVITATION\n';
  msg+='════════════════════════════════════\n\n';
  msg+='You have been invited to participate in a transaction on DEALEX.\n\n';
  msg+='DEAL REFERENCE:  '+ref+'\n';
  msg+='INSTRUMENT:      '+instrument+'\n';
  msg+='FACE VALUE:      '+faceVal+'\n';
  if(senderName)msg+='SENDER:          '+senderName+'\n';
  if(receiverName)msg+='RECEIVER:        '+receiverName+'\n';
  msg+='\n';
  if(customMsg){
    msg+='MESSAGE FROM SENDER:\n';
    msg+='"'+customMsg+'"\n\n';
  }
  msg+='────────────────────────────────────\n';
  msg+='GET STARTED:\n\n';
  msg+='1. Register your free account:\n';
  msg+='   https://app.dealex.io/register\n\n';
  msg+='2. Enter Deal Reference: '+ref+'\n\n';
  msg+='3. Prepare your documents:\n';
  msg+='   • Certified passport copy\n';
  msg+='   • Certificate of Incorporation / CIS\n';
  msg+='   • Bank Comfort Letter (BCL)\n';
  msg+='   • Company stamp / seal\n\n';
  msg+='4. Your bank coordinates (SWIFT, IBAN, bank officer)\n\n';
  msg+='────────────────────────────────────\n';
  msg+='SECURITY NOTICE:\n\n';
  msg+='• Your documents are NEVER shared with the other party\n';
  msg+='• Each side only sees their own data\n';
  msg+='• All documents are verified independently\n';
  msg+='• Bank officer details are confirmed directly with the bank\n\n';
  msg+='────────────────────────────────────\n';
  msg+='Register now: https://app.dealex.io/register\n';
  msg+='DEALEX · Secure Deal Platform\n';
  msg+='Reference: '+ref+'\n';
  msg+='© '+new Date().getFullYear()+' DEALEX\n';
  return msg;
}

/* removed: buildInviteSubject */

function showInviteResult(){
  var body=document.getElementById('invitePreviewBody');
  var result=document.getElementById('inviteResult');
  var linkBox=document.getElementById('inviteLinkBox');
  if(body)body.textContent=buildInviteMessage();
  if(result)result.style.display='block';
  if(linkBox)linkBox.style.display='block';
}

function buildShortEmailBody(){
  var ref=dealRef||'DRAFT';
  var d=D;
  var senderName=d.appRep||d.appCompany||'';
  var msg='Deal ref: '+ref+'\n';
  if(senderName)msg+='From: '+senderName+'\n';
  msg+='\nRegister: https://app.dealex.io/register\n';
  msg+='Enter ref: '+ref+'\n';
  return msg;
}

/* ═══════════════════════════════════════════════════════
   PAYMASTER & BROKER INVITE
   ═══════════════════════════════════════════════════════ */
function selectPaymaster(type,el){
  document.querySelectorAll('#paymasterOptions .wiz-check').forEach(function(c){c.classList.remove('on')});
  el.classList.add('on');
  D.paymasterType=type;
  var extField=document.getElementById('externalPmField');
  var notice=document.getElementById('bankingProtectionNotice');
  if(type==='dealex'){
    if(extField)extField.style.display='none';
    if(notice)notice.style.display='block';
    D.paymaster='DEALEX Platform (Secure Paymaster)';
    /* Auto-fill paymaster fields */
    var tspm=document.getElementById('tsPaymaster');if(tspm)tspm.value='DEALEX Platform';
    var dfpm=document.getElementById('df-paymaster');if(dfpm)dfpm.value='DEALEX Platform';
  }else{
    if(extField)extField.style.display='block';
    if(notice)notice.style.display='none';
    D.paymaster='';
  }
}

function initInvitePanel(){
  /* Show broker invite section if role is broker or mandate */
  var bSec=document.getElementById('brokerInviteSection');
  var sSec=document.getElementById('standardInviteSection');
  if(!bSec||!sSec)return;
  if(curRole==='broker'||curRole==='mandate'){
    bSec.style.display='block';
    sSec.style.display='none';
  }else{
    bSec.style.display='none';
    sSec.style.display='block';
  }
}

function sendSideInvite(side){
  var emailId=side==='sender'?'inviteSenderEmail':'inviteReceiverEmail';
  var statusId=side==='sender'?'senderInviteStatus':'receiverInviteStatus';
  var email=document.getElementById(emailId).value.trim();
  if(!email||email.indexOf('@')===-1){showT('Enter a valid email for the '+side);return}
  var ref=dealRef||'DRAFT';
  var roleName=side==='sender'?'Sender (Issuing Side)':'Receiver (Beneficiary Side)';
  var subj='DEALEX Deal Invitation — '+ref+' — '+roleName;
  var body='You have been invited to join a deal on DEALEX.\n\n';
  body+='Deal Reference: '+ref+'\n';
  body+='Your Role: '+roleName+'\n';
  body+='Invited By: '+(D.appRep||D.benRep||wizState.acctName||'Deal Introducer')+'\n\n';
  body+='What happens next:\n';
  body+='1. Register at https://app.dealex.io/register\n';
  body+='2. Sign the NCNDA (your details stay private until signed)\n';
  body+='3. Complete your KYC and banking details on-platform\n';
  if(D.paymasterType==='dealex'){
    body+='4. DEALEX is the paymaster — your banking info is never shared with other parties\n';
  }
  body+='\nThis deal is facilitated via DEALEX Secure Deal Platform.\n';
  body+='Reference: '+ref;
  var url='mailto:'+email+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  window.location.href=url;
  /* Update status pill */
  var pill=document.getElementById(statusId);
  if(pill){pill.textContent='Sent';pill.className='pill pg'}
  showT('✓ Invite sent to '+side+' — '+email);
  /* Log for backend */
  console.log('INVITE SENT:',{side:side,email:email,ref:ref,paymaster:D.paymasterType||'not set',role:curRole});
}

function sendInvite(){
  var email=document.getElementById('inviteEmail').value.trim();
  if(!email||email.indexOf('@')===-1){showT('Please enter a valid email address');return}
  showInviteResult();
  var ref=dealRef||'DRAFT';
  var d=D;
  var senderName=d.appRep||'';
  /* Ultra-minimal mailto — absolute bare minimum */
  var subj='DEALEX Invite - '+ref;
  var body='Deal: '+ref+'\nFrom: '+(senderName||'Sender')+'\n\nRegister: https://app.dealex.io/register\nRef: '+ref;
  var url='mailto:'+email+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  /* Method 1: direct location (most reliable for mailto) */
  window.location.href=url;
  showT('Email app opening for '+email);
}

function copyEmailLink(){
  var email=document.getElementById('inviteEmail').value.trim()||'';
  var ref=dealRef||'DRAFT';
  var subj='DEALEX Deal Invitation - '+ref;
  var body=buildShortEmailBody();
  var mailto='mailto:'+encodeURIComponent(email)+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  if(navigator.clipboard){
    navigator.clipboard.writeText(mailto).then(function(){
      showT('Email link copied — paste in browser address bar');
    }).catch(function(){showT('Could not copy')});
  }else{showT('Could not copy')}
}

function copyInviteMessage(){
  var msg=buildInviteMessage();
  showInviteResult();
  if(navigator.clipboard){
    navigator.clipboard.writeText(msg).then(function(){
      showT('Invite copied — paste into WhatsApp, Telegram, email, or any messenger');
    }).catch(function(){
      fallbackCopy(msg);
    });
  }else{
    fallbackCopy(msg);
  }
}

function fallbackCopy(text){
  var ta=document.createElement('textarea');
  ta.value=text;
  ta.style.cssText='position:fixed;left:-9999px';
  document.body.appendChild(ta);
  ta.select();
  try{document.execCommand('copy');showT('Invite message copied')}
  catch(e){showT('Could not copy — select text from preview and copy manually')}
  document.body.removeChild(ta);
}

function copyDealRef(){
  if(!dealRef){showT('No deal reference yet');return}
  if(navigator.clipboard){navigator.clipboard.writeText(dealRef).then(function(){showT('📋 Deal ref copied: '+dealRef)})}else{showT('Deal ref: '+dealRef)}
}

updateSplit();

/* ═══════════════════════════════════════════════════════
   ARIA CHECKBOX — delegated event listener for wiz-check
   ═══════════════════════════════════════════════════════ */
document.addEventListener('click',function(e){
  var el=e.target.closest('.wiz-check');
  if(!el)return;
  /* Wait a tick so classList.toggle has already run */
  setTimeout(function(){
    var box=el.querySelector('.wc-box');
    if(box)box.setAttribute('aria-checked',el.classList.contains('on')?'true':'false');
  },0);
},true);

/* ═══════════════════════════════════════════════════════
   IN-APP DOCUMENT VIEWER
   ═══════════════════════════════════════════════════════ */
function openDocViewer(title,htmlContent){
  var viewer=document.getElementById('doc-viewer');
  var titleEl=document.getElementById('doc-viewer-title');
  var body=document.getElementById('doc-viewer-body');
  if(!viewer||!body)return;
  titleEl.textContent=title||'Document';
  body.innerHTML=htmlContent||'';
  viewer.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeDocViewer(){
  var viewer=document.getElementById('doc-viewer');
  if(viewer)viewer.classList.remove('open');
  document.body.style.overflow='';
}
function printDocViewer(){
  var body=document.getElementById('doc-viewer-body');
  if(!body)return;
  var win=window.open('','_blank','width=900,height=700');
  win.document.write('<!DOCTYPE html><html><head><title>Print</title><style>body{font-family:Georgia,serif;font-size:11px;color:#111;padding:40px 50px}@media print{}</style></head><body>');
  win.document.write(body.innerHTML);
  win.document.write('</body></html>');
  win.document.close();
  setTimeout(function(){win.print()},400);
}
function copyDocViewer(){
  var body=document.getElementById('doc-viewer-body');
  if(!body)return;
  var text=body.innerText||body.textContent||'';
  if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(function(){showT('Document text copied')}).catch(function(){showT('Could not copy')});
  }else{showT('Could not copy')}
}

/* ═══════════════════════════════════════════════════════
   SWIFT MT760 COPY BUTTON
   ═══════════════════════════════════════════════════════ */
function copySwiftMsg(){
  var el=document.getElementById('swiftMsg');
  if(!el)return;
  var text=el.innerText||el.textContent||'';
  if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(function(){showT('MT760 message copied')}).catch(function(){showT('Could not copy')});
  }else{showT('Could not copy')}
}
