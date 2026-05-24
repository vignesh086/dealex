export default function Landing() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!-- LANDING -->
<div id="landing">

<!-- ═══ LANGUAGE + STYLES ═══ -->
<style>
/* Lang tabs */
.lang-bar{display:flex;background:var(--panel2);border-bottom:1px solid var(--border);padding:0}
.lang-tab{flex:1;padding:11px 0;font-size:13px;letter-spacing:.2em;text-transform:uppercase;font-weight:700;font-family:'Inter',sans-serif;background:none;border:none;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;transition:all .18s}
.lang-tab.act{color:var(--gold);border-bottom-color:var(--gold);background:rgba(59,73,223,.04)}
/* Role cards */
.role-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}
.role-card{background:var(--panel);border:1.5px solid var(--border);padding:14px 12px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden}
.role-card:hover{border-color:rgba(59,73,223,.4);background:rgba(59,73,223,.03)}
.role-card.sel{border-color:var(--gold);background:rgba(59,73,223,.07)}
.role-card.sel::after{content:'✓';position:absolute;top:6px;right:8px;font-size:11px;color:var(--gold);font-weight:700}
.role-icon{font-size:22px;margin-bottom:6px}
.role-name{font-size:13px;font-weight:700;color:var(--white);margin-bottom:3px;line-height:1.2}
.role-sub{font-size:13px;color:var(--muted2);line-height:1.5}
/* Education panels */
.edu-panel{display:none;animation:fadeUp .3s ease}
.edu-panel.act{display:block}
/* Doc requirement items */
.doc-req{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1px solid var(--border);margin-bottom:6px;background:var(--panel)}
.doc-req.must{border-left:3px solid var(--red)}
.doc-req.should{border-left:3px solid var(--gold)}
.doc-req.ready{border-left:3px solid var(--green)}
.doc-req-icon{font-size:16px;flex-shrink:0;margin-top:1px}
.doc-req-body{}
.doc-req-label{font-size:13px;font-weight:600;color:var(--white);margin-bottom:2px}
.doc-req-desc{font-size:13px;color:var(--muted2);line-height:1.5}
.doc-missing{display:inline-block;padding:2px 7px;background:rgba(208,64,64,.12);border:1px solid rgba(208,64,64,.3);font-size:11px;font-weight:700;letter-spacing:.1em;color:var(--red);text-transform:uppercase;margin-top:4px}
/* Upload link box */
.link-gen-box{background:rgba(74,139,224,.08);border:1px solid rgba(74,139,224,.3);padding:14px;margin-top:10px}
/* Party structure */
.party-row{display:flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid var(--border);margin-bottom:5px;background:var(--panel)}
.party-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
/* Successful closers */
.closer-card{display:flex;align-items:center;gap:10px;padding:9px 12px;border:1px solid rgba(53,160,101,.25);background:rgba(53,160,101,.05);margin-bottom:5px}
/* ZH font override */
body.zh .role-name,.zh .edu-panel,.zh .doc-req-label,.zh .doc-req-desc,.zh .lang-tab{font-family:'Noto Sans SC',sans-serif}
/* Landing scroll */
#landing{position:fixed;inset:0;background:var(--obs);z-index:1000;display:flex;flex-direction:column;overflow-y:auto}
#landing.hidden{display:none}
/* Step number badge */
.step-num{width:22px;height:22px;border-radius:50%;background:var(--gold);color:var(--obs);font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Inter',sans-serif}
.step-num.done{background:var(--green)}
/* Info callout */
.info-callout{background:rgba(59,73,223,.06);border:1px solid rgba(59,73,223,.25);padding:12px 14px;margin-bottom:10px}
.info-callout.red{background:rgba(208,64,64,.06);border-color:rgba(208,64,64,.3)}
.info-callout.green{background:rgba(53,160,101,.06);border-color:rgba(53,160,101,.3)}
</style>

<!-- Header -->
<div class="lh" style="flex-shrink:0">
  <div class="ll" style="font-family:'JetBrains Mono',monospace;font-size:18px;letter-spacing:.10em"><span style="color:var(--txt)">DEAL</span><span style="color:var(--gold)">EX</span><div class="dot"></div></div>
  <div style="display:flex;align-items:center;gap:8px">
    <button class="theme-toggle" id="landingThemeBtn" onclick="toggleTheme()" title="Toggle light/dark mode">🌙</button>
  </div>
</div>

<!-- Language tabs -->
<div class="lang-bar" style="flex-shrink:0">
  <button class="lang-tab act" id="lt-en" onclick="setLang('en')">🇬🇧 &nbsp;English</button>
  <button class="lang-tab" id="lt-zh" onclick="setLang('zh')">🇨🇳 &nbsp;中文</button>
</div>

<!-- ══════════ ENGLISH CONTENT ══════════ -->
<div id="lc-en" style="flex:1;display:flex;flex-direction:column;overflow-y:auto">

  <!-- Hero -->
  <div class="lhero" style="flex:none;min-height:auto;padding:22px 20px 24px">
    <div class="lgrid"></div><div class="lglow"></div>
    <div style="position:relative;z-index:1">
      <div class="lpre">Global Deal Platform — Audited Rail. Every Step.</div>
      <div class="lh1" style="font-size:clamp(36px,10vw,58px)">DEALS DONE<span class="q2" style="font-size:clamp(24px,7vw,42px)">THE RIGHT WAY.</span></div>
      <div class="ltag">Real procedures. Real compliance. Real protection.<br><strong>We control the sequence — so your deal actually closes.</strong></div>
      <!-- Primary CTA — visible immediately, no scroll required -->
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:20px">
        <button onclick="showAuth('create')" style="padding:15px 28px;background:var(--gold);color:var(--obs);font-family:'Inter',sans-serif;font-size:13px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;border:none;cursor:pointer;min-height:44px">Start a Deal →</button>
        <button onclick="document.getElementById('role-select-en').scrollIntoView({behavior:'smooth'})" style="padding:15px 24px;background:transparent;color:var(--muted2);font-family:'Inter',sans-serif;font-size:13px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(212,204,192,.2);cursor:pointer;min-height:44px">Select your role ↓</button>
      </div>
    </div>
  </div>

  <!-- Deal Structure -->
  <div style="padding:0 16px;margin-bottom:16px">
    <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:10px">▸ EVERY DEAL HAS A FIXED STRUCTURE</div>
    <div style="background:var(--panel);border:1px solid var(--border);padding:14px">
      <!-- Party hierarchy SVG -->
      <!-- Party structure diagram — pure HTML/CSS -->
      <style>
        .pd-row{display:flex;gap:8px;justify-content:center;margin-bottom:0}
        .pd-box{flex:1;border:1.5px solid;padding:9px 8px;text-align:center;max-width:160px}
        .pd-box-title{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;line-height:1.3;margin-bottom:2px}
        .pd-box-sub{font-size:11px;color:var(--muted2);line-height:1.4}
        .pd-connector{display:flex;justify-content:center;align-items:stretch;gap:8px;height:18px;margin:0}
        .pd-vline{width:1.5px;background:rgba(59,73,223,.3);margin:0 auto;flex:none}
        .pd-vline-blue{background:rgba(74,139,224,.35)}
        .pd-vline-green{background:rgba(53,160,101,.35)}
        .pd-spacer{flex:1}
        .pd-diag{display:flex;justify-content:space-between;height:28px;position:relative;margin:0}
        .pd-diag::before,.pd-diag::after{content:'';position:absolute;top:0;height:100%;width:40%;border-top:1.5px dashed rgba(59,73,223,.3)}
        .pd-diag::before{left:22%;transform-origin:top left;transform:skewX(-45deg) scaleX(.7)}
        .pd-diag::after{right:22%;transform-origin:top right;transform:skewX(45deg) scaleX(.7)}
      </style>
      <div style="display:flex;flex-direction:column;gap:0;margin-bottom:10px">

        <!-- Row 1: Principals -->
        <div class="pd-row">
          <div class="pd-box" style="border-color:rgba(74,139,224,.5);background:rgba(74,139,224,.1)">
            <div class="pd-box-title" style="color:#4A8BE0">PRINCIPAL A<br><span style="font-size:11px;opacity:.8">(SENDER)</span></div>
            <div class="pd-box-sub">Applicant · Issuing Bank</div>
          </div>
          <div class="pd-box" style="border-color:rgba(53,160,101,.5);background:rgba(53,160,101,.1)">
            <div class="pd-box-title" style="color:#10B981">PRINCIPAL B<br><span style="font-size:11px;opacity:.8">(RECEIVER)</span></div>
            <div class="pd-box-sub">Beneficiary · Advising Bank</div>
          </div>
        </div>

        <!-- Connectors down to mandates -->
        <div style="display:flex;gap:8px;height:14px">
          <div style="flex:1;display:flex;justify-content:center"><div style="width:1.5px;height:100%;background:rgba(74,139,224,.35);border-left:1.5px dashed rgba(74,139,224,.4)"></div></div>
          <div style="flex:1;display:flex;justify-content:center"><div style="width:1.5px;height:100%;border-left:1.5px dashed rgba(53,160,101,.4)"></div></div>
        </div>

        <!-- Row 2: Mandates -->
        <div class="pd-row">
          <div class="pd-box" style="border-color:rgba(74,139,224,.3);background:rgba(74,139,224,.05)">
            <div class="pd-box-title" style="color:#4A8BE0;font-size:13px">MANDATE A</div>
            <div class="pd-box-sub">Assigned by Principal A</div>
          </div>
          <div class="pd-box" style="border-color:rgba(53,160,101,.3);background:rgba(53,160,101,.05)">
            <div class="pd-box-title" style="color:#10B981;font-size:13px">MANDATE B</div>
            <div class="pd-box-sub">Assigned by Principal B</div>
          </div>
        </div>

        <!-- Converge lines to broker -->
        <div style="display:flex;height:20px;position:relative;align-items:flex-end">
          <div style="flex:1;height:50%;border-right:1.5px dashed rgba(59,73,223,.35);border-bottom:1.5px dashed rgba(59,73,223,.35)"></div>
          <div style="flex:1;height:50%;border-left:1.5px dashed rgba(59,73,223,.35);border-bottom:1.5px dashed rgba(59,73,223,.35)"></div>
        </div>

        <!-- Row 3: Broker -->
        <div class="pd-row">
          <div class="pd-box" style="border-color:rgba(59,73,223,.55);background:rgba(59,73,223,.1);max-width:100%;flex:none;width:60%;margin:0 auto">
            <div class="pd-box-title" style="color:var(--gold)">BROKER</div>
            <div class="pd-box-sub">Protected by IMFPA · DEALEX paymaster</div>
          </div>
        </div>

        <!-- Line to DEALEX -->
        <div style="display:flex;justify-content:center;height:14px">
          <div style="width:1.5px;height:100%;background:rgba(59,73,223,.5)"></div>
        </div>

        <!-- Row 4: DEALEX -->
        <div class="pd-row">
          <div class="pd-box" style="border-color:rgba(59,73,223,.75);border-width:2px;background:rgba(59,73,223,.15);max-width:100%;flex:none;width:80%;margin:0 auto">
            <div class="pd-box-title" style="color:var(--gold);font-size:13px;letter-spacing:.12em">DEALEX — NEUTRAL PLATFORM</div>
            <div class="pd-box-sub">Controls sequence · Verifies docs · Routes paperwork</div>
          </div>
        </div>

      </div>

      <div style="font-size:13px;color:var(--muted2);line-height:1.7;border-top:1px solid var(--border);padding-top:8px">
        <strong style="color:var(--gold)">Max 2 Principals · Max 2 Mandates</strong> per deal. Mandates may have their own IMFPA — but this does NOT appear in the DOA. The DOA reflects Principals and Brokers only.
      </div>
    </div>
  </div>

  <!-- Role Selector — WHO ARE YOU? -->
  <div id="role-select-en" style="padding:0 16px;margin-bottom:16px">
    <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:10px">▸ SELECT YOUR ROLE TO SEE WHAT YOU NEED</div>
    <div class="role-grid">
      <div class="role-card" id="rc-principal" onclick="selectRole('principal')">
        <div class="role-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg></div>
        <div class="role-name">Principal</div>
        <div class="role-sub">You own the deal. Sender or Receiver side.</div>
      </div>
      <div class="role-card" id="rc-mandate" onclick="selectRole('mandate')">
        <div class="role-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div>
        <div class="role-name">Mandate</div>
        <div class="role-sub">Assigned by a Principal to represent them.</div>
      </div>
      <div class="role-card" id="rc-broker" onclick="selectRole('broker')">
        <div class="role-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg></div>
        <div class="role-name">Broker</div>
        <div class="role-sub">You have one side of the deal or both.</div>
      </div>
      <div class="role-card" id="rc-bank" onclick="selectRole('bank')">
        <div class="role-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/></svg></div>
        <div class="role-name">Bank Officer</div>
        <div class="role-sub">Issuing or advising bank representative.</div>
      </div>
    </div>

    <!-- ── PRINCIPAL education panel ── -->
    <div class="edu-panel" id="ep-principal">
      <div class="info-callout green" style="margin-bottom:10px">
        <div style="font-size:13px;font-weight:700;color:var(--green);margin-bottom:4px">You are a Principal — you initiate and own the deal.</div>
        <div style="font-size:13px;color:var(--txt);line-height:1.7">As the deal owner, you sign the DOA directly. You may appoint up to 1 Mandate to represent you. Your CIS and KYC go to DEALEX only — not to the other side.</div>
      </div>
      <div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--red);font-weight:700;margin-bottom:6px">MUST HAVE — deal cannot start</div>
      <div class="doc-req must"><div class="doc-req-icon">🪪</div><div class="doc-req-body"><div class="doc-req-label">Passport (clear, valid, not expired)</div><div class="doc-req-desc">Colour copy, all corners visible. Required for KYC/CIS submission to DEALEX.</div></div></div>
      <div class="doc-req must"><div class="doc-req-icon">🏢</div><div class="doc-req-body"><div class="doc-req-label">Company Registration Certificate</div><div class="doc-req-desc">Certificate of Incorporation or equivalent. Must show your name as director/authorised signatory.</div></div></div>
      <div class="doc-req must"><div class="doc-req-icon">🏦</div><div class="doc-req-body"><div class="doc-req-label">Bank Details (SWIFT/BIC + Account)</div><div class="doc-req-desc">Official bank letterhead preferred. Required for DOA and for SWIFT instrument routing.</div></div></div>
      <div class="doc-req must"><div class="doc-req-icon">✍️</div><div class="doc-req-body"><div class="doc-req-label">Authorisation to sign on behalf of company</div><div class="doc-req-desc">Board resolution or POA if you are not the sole director.</div></div></div>
      <div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:700;margin:10px 0 6px">SHOULD HAVE — strengthens your position</div>
      <div class="doc-req should"><div class="doc-req-icon">📄</div><div class="doc-req-body"><div class="doc-req-label">Proof of Address (utility bill or bank statement)</div><div class="doc-req-desc">Dated within 3 months. Required for full AML compliance.</div></div></div>
      <div class="doc-req should"><div class="doc-req-icon">📊</div><div class="doc-req-body"><div class="doc-req-label">Project Summary or Commodity Specification</div><div class="doc-req-desc">Brief overview of the deal — what is being funded or traded. Helps DEALEX route correctly.</div></div></div>
      <div class="link-gen-box" style="margin-top:12px">
        <div style="font-size:13px;font-weight:700;color:#4A8BE0;margin-bottom:6px">📎 Send a secure upload link to your Mandate or Broker</div>
        <div style="font-size:13px;color:var(--muted2);line-height:1.5;margin-bottom:8px">Your Mandate or Broker can collect documents on your behalf. Generate a one-time secure link — they upload, you approve, DEALEX verifies. They never see your CIS.</div>
        <button class="bg" style="padding:10px" onclick="genUploadLink('principal')">Generate Upload Link for My Mandate / Broker</button>
      </div>
      <button class="bg" style="margin-top:10px" onclick="showAuth('create')">Start as Principal → Create Account</button>
    </div>

    <!-- ── MANDATE education panel ── -->
    <div class="edu-panel" id="ep-mandate">
      <div class="info-callout" style="margin-bottom:10px">
        <div style="font-size:13px;font-weight:700;color:var(--gold);margin-bottom:4px">You are a Mandate — you need proof of authority.</div>
        <div style="font-size:13px;color:var(--txt);line-height:1.7">A Mandate must be formally appointed by a Principal. Without a Mandate Letter from your Principal, you cannot represent them on DEALEX. This is not optional — it is how banks and counterparties verify authority.</div>
      </div>
      <div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--red);font-weight:700;margin-bottom:6px">MUST HAVE — without these, deal cannot proceed</div>
      <div class="doc-req must"><div class="doc-req-icon">📜</div><div class="doc-req-body"><div class="doc-req-label">Mandate Letter from your Principal <span class="doc-missing">CRITICAL</span></div><div class="doc-req-desc">Signed by the Principal, naming you specifically. Must state scope of authority, deal reference, and expiry. <strong style="color:var(--white)">No Mandate Letter = no deal role.</strong></div></div></div>
      <div class="doc-req must"><div class="doc-req-icon">🪪</div><div class="doc-req-body"><div class="doc-req-label">Your own Passport</div><div class="doc-req-desc">You are a party — your identity must be verified by DEALEX regardless of your role.</div></div></div>
      <div class="doc-req must"><div class="doc-req-icon">🪪</div><div class="doc-req-body"><div class="doc-req-label">Principal's Passport & Company Docs</div><div class="doc-req-desc">You must be able to submit these on behalf of the Principal, or the Principal must upload directly via DEALEX link.</div></div></div>

      <div class="info-callout red" style="margin:10px 0">
        <div style="font-size:13px;font-weight:700;color:var(--red);margin-bottom:4px">❌ Don't have a Mandate Letter?</div>
        <div style="font-size:13px;color:var(--txt);line-height:1.7">You cannot proceed as Mandate without it. Options:<br>
        <strong style="color:var(--white)">1.</strong> Ask your Principal to sign a Mandate Letter — DEALEX can generate the template.<br>
        <strong style="color:var(--white)">2.</strong> Send your Principal a secure DEALEX upload link so they can submit it directly.<br>
        <strong style="color:var(--white)">3.</strong> If you cannot reach your Principal, you may proceed as a <strong style="color:var(--gold)">Broker</strong> instead — with different protections.
        </div>
      </div>

      <div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:6px">YOUR IMFPA RIGHTS</div>
      <div class="info-callout" style="margin-bottom:10px">
        <div style="font-size:13px;color:var(--txt);line-height:1.7">As a Mandate, you may negotiate your own IMFPA with your Principal separately. <strong style="color:var(--white)">DEALEX does not include Mandate IMFPAs in the DOA</strong> — the DOA only reflects Principals and Brokers. Your IMFPA is a private arrangement protected by NCNDA.</div>
      </div>

      <div class="link-gen-box">
        <div style="font-size:13px;font-weight:700;color:#4A8BE0;margin-bottom:6px">📎 Send upload link to your Principal</div>
        <div style="font-size:13px;color:var(--muted2);line-height:1.5;margin-bottom:8px">Your Principal can upload their Mandate Letter, passport, and company docs directly to DEALEX. You assemble the deal package — they retain full control of what they share.</div>
        <button class="bg" style="padding:10px" onclick="genUploadLink('mandate')">Generate Upload Link for My Principal</button>
      </div>
      <button class="bg" style="margin-top:10px" onclick="showAuth('create')">Start as Mandate → Create Account</button>
    </div>

    <!-- ── BROKER education panel ── -->
    <div class="edu-panel" id="ep-broker">
      <div class="info-callout green" style="margin-bottom:10px">
        <div style="font-size:13px;font-weight:700;color:var(--green);margin-bottom:4px">You are a Broker — DEALEX protects your position.</div>
        <div style="font-size:13px;color:var(--txt);line-height:1.7">You may have one side of a deal (Sender or Receiver) or both. DEALEX acts as paymaster — your commission is protected by IMFPA from the start. You are never cut out.</div>
      </div>

      <div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:6px">WHAT YOU NEED TO OPEN A DEAL</div>
      <div class="doc-req must"><div class="doc-req-icon">🪪</div><div class="doc-req-body"><div class="doc-req-label">Your own Passport + KYC</div><div class="doc-req-desc">DEALEX verifies all parties. Your CIS is never shared with counterparty.</div></div></div>
      <div class="doc-req must"><div class="doc-req-icon">📋</div><div class="doc-req-body"><div class="doc-req-label">Confirmation of what side(s) you represent</div><div class="doc-req-desc">Do you have a Sender? A Receiver? Both? DEALEX will route accordingly.</div></div></div>
      <div class="doc-req should"><div class="doc-req-icon">📜</div><div class="doc-req-body"><div class="doc-req-label">NCNDA signed by any sub-broker or party you brought in</div><div class="doc-req-desc">Protects your network before you disclose deal details to DEALEX or counterparty.</div></div></div>

      <!-- Broker checklist: what you need to collect from Principal -->
      <div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:700;margin:10px 0 6px">WHAT YOUR PRINCIPAL MUST PROVIDE</div>
      <div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:8px">If you are acting on behalf of a Principal, these are the items that must come from them — not you. Use the upload link to collect them without exposing your deal structure.</div>
      <div class="doc-req must"><div class="doc-req-icon">🪪</div><div class="doc-req-body"><div class="doc-req-label">Principal's Passport</div><div class="doc-req-desc">Required for KYC. You cannot submit this without their authorisation.</div></div></div>
      <div class="doc-req must"><div class="doc-req-icon">🏢</div><div class="doc-req-body"><div class="doc-req-label">Company Registration + Bank Details</div><div class="doc-req-desc">For DOA. Goes to DEALEX — not to counterparty.</div></div></div>
      <div class="doc-req must"><div class="doc-req-icon">📜</div><div class="doc-req-body"><div class="doc-req-label">Mandate Letter (if you are acting as Mandate)</div><div class="doc-req-desc">Signed by Principal naming you. Without this you are a Broker — not a Mandate.</div></div></div>

      <div class="link-gen-box">
        <div style="font-size:13px;font-weight:700;color:#4A8BE0;margin-bottom:6px">📎 Send upload link to your Principal or counterparty</div>
        <div style="font-size:13px;color:var(--muted2);line-height:1.5;margin-bottom:8px">Select which party gets the link and which documents to request. They upload to DEALEX directly — you are notified when complete. No WhatsApp. No email attachments.</div>
        <button class="bg" style="padding:10px" onclick="genUploadLink('broker')">Generate Upload Link for My Party</button>
      </div>
      <button class="bg" style="margin-top:10px" onclick="showAuth('create')">Start as Broker → Create Account</button>
    </div>

    <!-- ── BANK OFFICER education panel ── -->
    <div class="edu-panel" id="ep-bank">
      <div class="info-callout" style="margin-bottom:10px">
        <div style="font-size:13px;font-weight:700;color:var(--gold);margin-bottom:4px">You are a Bank Officer — you receive and authenticate instruments.</div>
        <div style="font-size:13px;color:var(--txt);line-height:1.7">DEALEX generates fully compliant SWIFT MT760 (SBLC) and MT700 (DLC) drafts. Your role is to review, authenticate, and transmit. All instruments follow SWIFT Category 7 November 2025 Standards.</div>
      </div>
      <div class="doc-req must"><div class="doc-req-icon">📋</div><div class="doc-req-body"><div class="doc-req-label">DOA — Deed of Agreement (received from DEALEX)</div><div class="doc-req-desc">Authorises the bank to issue or advise the instrument. Counter-signed by Principal's authorised rep.</div></div></div>
      <div class="doc-req must"><div class="doc-req-icon">🏦</div><div class="doc-req-body"><div class="doc-req-label">Issuing/Advising Bank Instructions</div><div class="doc-req-desc">DEALEX routes the MT760 or MT700 draft with full field set. Bank reviews and transmits via authenticated SWIFT.</div></div></div>
      <button class="bg" style="margin-top:12px" onclick="showAuth('create')">Register Bank Access → Create Account</button>
    </div>
  </div>

  <!-- The 3 Rules — non-negotiable callout (shown after role selection so context is clear) -->
  <div style="padding:0 16px;margin-bottom:16px">
    <div class="info-callout red">
      <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:var(--red);margin-bottom:8px">⚠ DEALEX GROUND RULES — READ BEFORE YOU PROCEED</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;gap:8px;align-items:flex-start"><span style="color:var(--red);font-weight:700;flex-shrink:0">✗</span><span style="font-size:13px;color:var(--txt);line-height:1.6">No Zoom calls. No WhatsApp negotiations. All communication flows through DEALEX — documented, logged, sequenced.</span></div>
        <div style="display:flex;gap:8px;align-items:flex-start"><span style="color:var(--red);font-weight:700;flex-shrink:0">✗</span><span style="font-size:13px;color:var(--txt);line-height:1.6">No paperwork floating to anyone. Documents go where they need to go — and only to the party that needs to see them.</span></div>
        <div style="display:flex;gap:8px;align-items:flex-start"><span style="color:var(--red);font-weight:700;flex-shrink:0">✗</span><span style="font-size:13px;color:var(--txt);line-height:1.6">No step is skipped. NCNDA → KYC → DOA → IMFPA → Term Sheet → Bank Package → SWIFT. That order. Every time.</span></div>
      </div>
    </div>
  </div>

  <!-- DEALEX Document Routing Rules -->
  <div style="padding:0 16px;margin-bottom:16px">
    <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:10px">▸ WHAT DEALEX FORWARDS — AND TO WHOM</div>
    <div style="background:var(--panel);border:1px solid var(--border);padding:14px">
      <div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:10px">DEALEX does not float paperwork. Every document is routed on a need-to-see basis only.</div>
      <div style="display:flex;flex-direction:column;gap:5px">
        <div class="party-row"><div class="party-dot" style="background:#4A8BE0"></div><div style="flex:1"><span style="font-size:13px;font-weight:600;color:var(--white)">CIS / KYC</span><span style="font-size:13px;color:var(--muted2)"> — to DEALEX only. Counterparty sees: <strong style="color:var(--green)">✓ Verified</strong></span></div></div>
        <div class="party-row"><div class="party-dot" style="background:var(--gold)"></div><div style="flex:1"><span style="font-size:13px;font-weight:600;color:var(--white)">NCNDA</span><span style="font-size:13px;color:var(--muted2)"> — both parties sign before any deal detail is shared</span></div></div>
        <div class="party-row"><div class="party-dot" style="background:var(--gold)"></div><div style="flex:1"><span style="font-size:13px;font-weight:600;color:var(--white)">DOA</span><span style="font-size:13px;color:var(--muted2)"> — shared with both Principals and their banks only. Mandate IMFPA not included.</span></div></div>
        <div class="party-row"><div class="party-dot" style="background:var(--gold)"></div><div style="flex:1"><span style="font-size:13px;font-weight:600;color:var(--white)">IMFPA</span><span style="font-size:13px;color:var(--muted2)"> — broker's IMFPA goes to Principals only. DEALEX is paymaster.</span></div></div>
        <div class="party-row"><div class="party-dot" style="background:var(--green)"></div><div style="flex:1"><span style="font-size:13px;font-weight:600;color:var(--white)">MT760 / MT700</span><span style="font-size:13px;color:var(--muted2)"> — transmitted bank-to-bank via authenticated SWIFT only. Not emailed.</span></div></div>
        <div class="party-row"><div class="party-dot" style="background:var(--muted)"></div><div style="flex:1"><span style="font-size:13px;font-weight:600;color:var(--white)">Commodity Docs (B/L, COO, certs)</span><span style="font-size:13px;color:var(--muted2)"> — released to buyer's bank only upon compliant presentation under DLC terms.</span></div></div>
      </div>
    </div>
  </div>

  <!-- Successful Deal Closers Database -->
  <div style="padding:0 16px;margin-bottom:16px">
    <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:10px">▸ SUCCESSFUL DEAL CLOSERS</div>
    <div style="background:var(--panel);border:1px solid var(--border);padding:14px;margin-bottom:8px">
      <div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:10px">Parties that have successfully closed deals through DEALEX are listed in our verified database. This is your track record on the platform. Counterparties can request to see your deal history — with your permission.</div>
      <div class="closer-card"><div style="width:32px;height:32px;border-radius:50%;background:rgba(53,160,101,.2);border:1px solid rgba(53,160,101,.4);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">✓</div><div><div style="font-size:13px;font-weight:700;color:var(--green)">DLX-008821 · SBLC EUR 50M · Germany → Malaysia</div><div style="font-size:11px;color:var(--muted2)">Closed Q4 2024 · 2 Principals · 1 Broker · 18 days</div></div></div>
      <div class="closer-card"><div style="width:32px;height:32px;border-radius:50%;background:rgba(53,160,101,.2);border:1px solid rgba(53,160,101,.4);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">✓</div><div><div style="font-size:13px;font-weight:700;color:var(--green)">DLX-011403 · DLC Bauxite 49,739 MT · Malaysia</div><div style="font-size:11px;color:var(--muted2)">Closed Q1 2025 · FOB Kuantan · CCIC Certified · 12 days</div></div></div>
      <div class="closer-card"><div style="width:32px;height:32px;border-radius:50%;background:rgba(53,160,101,.2);border:1px solid rgba(53,160,101,.4);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">✓</div><div><div style="font-size:13px;font-weight:700;color:var(--green)">DLX-013290 · SBLC USD 120M · Singapore → UAE</div><div style="font-size:11px;color:var(--muted2)">Closed Q2 2025 · 1 Mandate each side · 22 days</div></div></div>
      <div style="text-align:center;padding-top:8px;border-top:1px solid var(--border);margin-top:6px"><span style="font-size:13px;color:var(--muted);letter-spacing:.12em">340+ DEALS IN DATABASE · GROWING DAILY</span></div>
    </div>
  </div>

  <!-- CTAs -->
  <div style="padding:0 16px;margin-bottom:16px">
    <div class="lctas">
      <button class="lbp" onclick="showAuth('create')"><span>✦</span> Create an Account</button>
      <button class="lbs" onclick="showAuth('login')">↩ Login</button>
      <button class="lbg" onclick="enterApp()">Browse as Guest →</button>
    </div>
    <div class="ltrust" style="margin-top:14px">
      <div class="ltc"><div class="ltv">$4.2B</div><div class="ltl">Facilitated</div></div>
      <div class="ltc"><div class="ltv">340+</div><div class="ltl">Deals Closed</div></div>
      <div class="ltc"><div class="ltv">47</div><div class="ltl">Countries</div></div>
      <div class="ltc"><div class="ltv">Free</div><div class="ltl">First Deal</div></div>
    </div>
  </div>

  <div class="lfoot">DEALEX © 2025 · Terms · Privacy · All deals supervised</div>
</div><!-- end lc-en -->

<!-- ══════════ MANDARIN CONTENT ══════════ -->
<div id="lc-zh" style="flex:1;display:none;flex-direction:column;overflow-y:auto" class="zh">

  <!-- Hero ZH -->
  <div class="lhero" style="flex:none;min-height:auto;padding:22px 20px 18px">
    <div class="lgrid"></div><div class="lglow"></div>
    <div style="position:relative;z-index:1;font-family:'Noto Sans SC',sans-serif">
      <div class="lpre" style="font-family:'Noto Sans SC',sans-serif">全球交易平台 — 无需视频会议，无需WhatsApp</div>
      <div style="font-family:'Noto Sans SC',sans-serif;font-size:clamp(28px,8vw,46px);font-weight:700;line-height:1.1;color:var(--white);margin-bottom:8px">交易以<span style="color:var(--gold)">正确方式</span>完成。</div>
      <div style="font-family:'Noto Sans SC',sans-serif;font-size:13px;color:var(--muted2);line-height:1.8;margin-bottom:18px">真实程序。真实合规。真实保护。<br><strong style="color:var(--white)">我们掌控交易流程 — 让您的交易真正成交。</strong></div>
    </div>
  </div>

  <!-- Party Structure ZH -->
  <div style="padding:0 16px;margin-bottom:16px">
    <div style="font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:10px;font-family:'Noto Sans SC',sans-serif">▸ 每笔交易的固定结构</div>
    <div style="background:var(--panel);border:1px solid var(--border);padding:14px">
      <div style="display:flex;flex-direction:column;gap:6px;font-family:'Noto Sans SC',sans-serif">
        <div class="party-row"><div class="party-dot" style="background:#4A8BE0"></div><div><div style="font-size:13px;font-weight:700;color:#4A8BE0">主体方 A（发送方）</div><div style="font-size:13px;color:var(--muted2)">申请人 / 开证行</div></div></div>
        <div class="party-row"><div class="party-dot" style="background:var(--green)"></div><div><div style="font-size:13px;font-weight:700;color:var(--green)">主体方 B（接收方）</div><div style="font-size:13px;color:var(--muted2)">受益人 / 通知行</div></div></div>
        <div class="party-row"><div class="party-dot" style="background:rgba(59,73,223,.6)"></div><div><div style="font-size:13px;font-weight:600;color:var(--txt)">授权代表（最多各1名）</div><div style="font-size:13px;color:var(--muted2)">由主体方任命，须持有授权书。授权代表可有独立的IMFPA，但不体现在DOA中。</div></div></div>
        <div class="party-row"><div class="party-dot" style="background:var(--gold)"></div><div><div style="font-size:13px;font-weight:700;color:var(--gold)">经纪人</div><div style="font-size:13px;color:var(--muted2)">受IMFPA保护 · DEALEX担任付款代理</div></div></div>
        <div class="party-row"><div class="party-dot" style="background:var(--gold);opacity:.5"></div><div><div style="font-size:13px;font-weight:700;color:var(--gold)">DEALEX — 中立平台</div><div style="font-size:13px;color:var(--muted2)">控制流程 · 核验文件 · 路由文件</div></div></div>
      </div>
      <div style="font-size:13px;color:var(--muted2);margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-family:'Noto Sans SC',sans-serif">
        <strong style="color:var(--gold)">每笔交易最多2名主体，最多2名授权代表。</strong>授权代表的IMFPA不体现在DOA中，仅在主体与授权代表之间私下约定。
      </div>
    </div>
  </div>

  <!-- Role Selector ZH -->
  <div style="padding:0 16px;margin-bottom:16px">
    <div style="font-size:13px;letter-spacing:.1em;color:var(--gold);font-weight:700;margin-bottom:10px;font-family:'Noto Sans SC',sans-serif">▸ 选择您的角色，了解所需材料</div>
    <div class="role-grid">
      <div class="role-card" id="rc-zh-principal" onclick="selectRoleZh('principal')">
        <div class="role-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg></div>
        <div class="role-name" style="font-family:'Noto Sans SC',sans-serif">主体方</div>
        <div class="role-sub" style="font-family:'Noto Sans SC',sans-serif">您拥有交易主导权，发送方或接收方。</div>
      </div>
      <div class="role-card" id="rc-zh-mandate" onclick="selectRoleZh('mandate')">
        <div class="role-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div>
        <div class="role-name" style="font-family:'Noto Sans SC',sans-serif">授权代表</div>
        <div class="role-sub" style="font-family:'Noto Sans SC',sans-serif">由主体方任命代理其参与交易。</div>
      </div>
      <div class="role-card" id="rc-zh-broker" onclick="selectRoleZh('broker')">
        <div class="role-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg></div>
        <div class="role-name" style="font-family:'Noto Sans SC',sans-serif">经纪人</div>
        <div class="role-sub" style="font-family:'Noto Sans SC',sans-serif">您持有交易的一方或双方资源。</div>
      </div>
      <div class="role-card" id="rc-zh-bank" onclick="selectRoleZh('bank')">
        <div class="role-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/></svg></div>
        <div class="role-name" style="font-family:'Noto Sans SC',sans-serif">银行人员</div>
        <div class="role-sub" style="font-family:'Noto Sans SC',sans-serif">开证行或通知行代表。</div>
      </div>
    </div>

    <!-- ZH Mandate panel (most critical to show) -->
    <div class="edu-panel" id="ep-zh-mandate">
      <div class="info-callout" style="margin-bottom:10px">
        <div style="font-size:13px;font-weight:700;color:var(--gold);margin-bottom:4px;font-family:'Noto Sans SC',sans-serif">您是授权代表 — 必须持有委托书</div>
        <div style="font-size:13px;color:var(--txt);line-height:1.8;font-family:'Noto Sans SC',sans-serif">授权代表必须由主体方正式任命。没有主体方签署的<strong style="color:var(--white)">授权委托书（Mandate Letter）</strong>，您无法在DEALEX上代表主体方。这不是可选项——这是银行和交易对手方核验授权的方式。</div>
      </div>
      <div class="doc-req must" style="font-family:'Noto Sans SC',sans-serif"><div class="doc-req-icon">📜</div><div class="doc-req-body"><div class="doc-req-label">主体方签署的授权委托书 <span class="doc-missing">必须提供</span></div><div class="doc-req-desc">须由主体方签署，明确指定您的姓名。需注明授权范围、交易参考号及有效期。<strong style="color:var(--white)">无委托书 = 无法担任授权代表。</strong></div></div></div>
      <div class="doc-req must" style="font-family:'Noto Sans SC',sans-serif"><div class="doc-req-icon">🪪</div><div class="doc-req-body"><div class="doc-req-label">您本人的护照</div><div class="doc-req-desc">您是交易当事方，DEALEX必须核验您的身份。</div></div></div>
      <div class="info-callout red" style="margin:10px 0">
        <div style="font-size:13px;font-weight:700;color:var(--red);margin-bottom:4px;font-family:'Noto Sans SC',sans-serif">❌ 没有授权委托书？</div>
        <div style="font-size:13px;color:var(--txt);line-height:1.8;font-family:'Noto Sans SC',sans-serif">
          <strong style="color:var(--white)">方案一：</strong>请您的主体方签署委托书——DEALEX可提供模板。<br>
          <strong style="color:var(--white)">方案二：</strong>发送DEALEX安全上传链接给主体方，由其直接提交文件。<br>
          <strong style="color:var(--white)">方案三：</strong>如无法联系主体方，可以<strong style="color:var(--gold)">经纪人</strong>身份继续推进。
        </div>
      </div>
      <div class="link-gen-box">
        <div style="font-size:13px;font-weight:700;color:#4A8BE0;margin-bottom:6px;font-family:'Noto Sans SC',sans-serif">📎 向主体方发送安全上传链接</div>
        <div style="font-size:13px;color:var(--muted2);line-height:1.6;margin-bottom:8px;font-family:'Noto Sans SC',sans-serif">主体方可通过专属链接直接向DEALEX上传委托书、护照及公司文件。您组建文件包——他们保留对所分享内容的完全控制权。</div>
        <button class="bg" style="padding:10px;font-family:'Noto Sans SC',sans-serif" onclick="genUploadLink('mandate')">为主体方生成上传链接</button>
      </div>
      <button class="bg" style="margin-top:10px;font-family:'Noto Sans SC',sans-serif" onclick="showAuth('create')">以授权代表身份注册账户</button>
    </div>

    <div class="edu-panel" id="ep-zh-principal">
      <div class="info-callout green" style="margin-bottom:10px">
        <div style="font-size:13px;font-weight:700;color:var(--green);margin-bottom:4px;font-family:'Noto Sans SC',sans-serif">您是主体方 — 您是交易的发起人和拥有者</div>
        <div style="font-size:13px;color:var(--txt);line-height:1.8;font-family:'Noto Sans SC',sans-serif">作为交易主体，您直接签署DOA（授权协议）。您可指定最多1名授权代表代理您。您的KYC/CIS只提交给DEALEX——不发送给交易对手方。</div>
      </div>
      <div class="doc-req must" style="font-family:'Noto Sans SC',sans-serif"><div class="doc-req-icon">🪪</div><div class="doc-req-body"><div class="doc-req-label">护照（清晰、有效、未过期）</div><div class="doc-req-desc">彩色复印件，四角完整可见。用于向DEALEX提交KYC/CIS。</div></div></div>
      <div class="doc-req must" style="font-family:'Noto Sans SC',sans-serif"><div class="doc-req-icon">🏢</div><div class="doc-req-body"><div class="doc-req-label">公司注册证书</div><div class="doc-req-desc">营业执照或同等文件，须显示您的姓名为董事/授权签字人。</div></div></div>
      <div class="doc-req must" style="font-family:'Noto Sans SC',sans-serif"><div class="doc-req-icon">🏦</div><div class="doc-req-body"><div class="doc-req-label">银行信息（SWIFT/BIC + 账号）</div><div class="doc-req-desc">最好提供银行官方抬头信函。用于DOA及SWIFT电文路由。</div></div></div>
      <div class="link-gen-box">
        <div style="font-size:13px;font-weight:700;color:#4A8BE0;margin-bottom:6px;font-family:'Noto Sans SC',sans-serif">📎 向授权代表或经纪人发送安全上传链接</div>
        <button class="bg" style="padding:10px;font-family:'Noto Sans SC',sans-serif" onclick="genUploadLink('principal')">为授权代表/经纪人生成上传链接</button>
      </div>
      <button class="bg" style="margin-top:10px;font-family:'Noto Sans SC',sans-serif" onclick="showAuth('create')">以主体方身份注册账户</button>
    </div>

    <div class="edu-panel" id="ep-zh-broker">
      <div class="info-callout green" style="margin-bottom:10px">
        <div style="font-size:13px;font-weight:700;color:var(--green);margin-bottom:4px;font-family:'Noto Sans SC',sans-serif">您是经纪人 — DEALEX保护您的权益</div>
        <div style="font-size:13px;color:var(--txt);line-height:1.8;font-family:'Noto Sans SC',sans-serif">您可能持有交易的一方（发送方或接收方）或双方资源。DEALEX担任付款代理——您的佣金从一开始就受IMFPA保护，确保您不被踢出局。</div>
      </div>
      <div class="doc-req must" style="font-family:'Noto Sans SC',sans-serif"><div class="doc-req-icon">🪪</div><div class="doc-req-body"><div class="doc-req-label">您本人的护照 + KYC</div><div class="doc-req-desc">DEALEX核验所有当事方。您的CIS不会分享给交易对手方。</div></div></div>
      <div class="doc-req must" style="font-family:'Noto Sans SC',sans-serif"><div class="doc-req-icon">📜</div><div class="doc-req-body"><div class="doc-req-label">主体方须提供的材料（由您代为收集）</div><div class="doc-req-desc">护照、公司注册证书、银行信息、授权书（如适用）。使用DEALEX上传链接收集，无需暴露您的交易结构。</div></div></div>
      <div class="link-gen-box">
        <div style="font-size:13px;font-weight:700;color:#4A8BE0;margin-bottom:6px;font-family:'Noto Sans SC',sans-serif">📎 向主体方或交易对手方发送上传链接</div>
        <button class="bg" style="padding:10px;font-family:'Noto Sans SC',sans-serif" onclick="genUploadLink('broker')">为我的当事方生成上传链接</button>
      </div>
      <button class="bg" style="margin-top:10px;font-family:'Noto Sans SC',sans-serif" onclick="showAuth('create')">以经纪人身份注册账户</button>
    </div>

    <div class="edu-panel" id="ep-zh-bank">
      <div class="info-callout" style="margin-bottom:10px">
        <div style="font-size:13px;font-weight:700;color:var(--gold);margin-bottom:4px;font-family:'Noto Sans SC',sans-serif">您是银行人员 — 负责接收和认证金融工具</div>
        <div style="font-size:13px;color:var(--txt);line-height:1.8;font-family:'Noto Sans SC',sans-serif">DEALEX生成完全合规的SWIFT MT760（SBLC）和MT700（DLC）草稿，遵循2025年11月SWIFT第7类标准。您的职责是审查、认证和传输。</div>
      </div>
      <button class="bg" style="margin-top:12px;font-family:'Noto Sans SC',sans-serif" onclick="showAuth('create')">注册银行访问账户</button>
    </div>
  </div>

  <!-- Rules ZH — shown after role selection so context is clear -->
  <div style="padding:0 16px;margin-bottom:16px">
    <div class="info-callout red">
      <div style="font-size:13px;letter-spacing:.1em;font-weight:700;color:var(--red);margin-bottom:8px;font-family:'Noto Sans SC',sans-serif">⚠ DEALEX 基本规则 — 请在继续前阅读</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:'Noto Sans SC',sans-serif">
        <div style="display:flex;gap:8px;align-items:flex-start"><span style="color:var(--red);font-weight:700;flex-shrink:0">✗</span><span style="font-size:13px;color:var(--txt);line-height:1.7">禁止视频会议，禁止WhatsApp谈判。所有沟通通过DEALEX进行——有记录、有顺序。</span></div>
        <div style="display:flex;gap:8px;align-items:flex-start"><span style="color:var(--red);font-weight:700;flex-shrink:0">✗</span><span style="font-size:13px;color:var(--txt);line-height:1.7">不随意传递文件。文件只发送给需要查看的当事方。</span></div>
        <div style="display:flex;gap:8px;align-items:flex-start"><span style="color:var(--red);font-weight:700;flex-shrink:0">✗</span><span style="font-size:13px;color:var(--txt);line-height:1.7">不跳过任何步骤。NCNDA → KYC → DOA → IMFPA → 条款单 → 银行文件包 → SWIFT。顺序固定，每次如此。</span></div>
      </div>
    </div>
  </div>

  <!-- Successful Closers ZH -->
  <div style="padding:0 16px;margin-bottom:16px">
    <div style="font-size:13px;letter-spacing:.1em;color:var(--gold);font-weight:700;margin-bottom:10px;font-family:'Noto Sans SC',sans-serif">▸ 成功成交记录</div>
    <div style="background:var(--panel);border:1px solid var(--border);padding:14px;margin-bottom:8px">
      <div class="closer-card"><div style="width:32px;height:32px;border-radius:50%;background:rgba(53,160,101,.2);border:1px solid rgba(53,160,101,.4);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">✓</div><div><div style="font-size:13px;font-weight:700;color:var(--green);font-family:'Noto Sans SC',sans-serif">DLX-008821 · SBLC 5000万欧元 · 德国→马来西亚</div><div style="font-size:11px;color:var(--muted2);font-family:'Noto Sans SC',sans-serif">2024年Q4成交 · 2名主体方 · 1名经纪人 · 18天</div></div></div>
      <div class="closer-card"><div style="width:32px;height:32px;border-radius:50%;background:rgba(53,160,101,.2);border:1px solid rgba(53,160,101,.4);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">✓</div><div><div style="font-size:13px;font-weight:700;color:var(--green);font-family:'Noto Sans SC',sans-serif">DLX-011403 · DLC 铝土矿49,739公吨 · 马来西亚关丹</div><div style="font-size:11px;color:var(--muted2);font-family:'Noto Sans SC',sans-serif">2025年Q1成交 · FOB关丹 · CCIC认证 · 12天</div></div></div>
      <div class="closer-card"><div style="width:32px;height:32px;border-radius:50%;background:rgba(53,160,101,.2);border:1px solid rgba(53,160,101,.4);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">✓</div><div><div style="font-size:13px;font-weight:700;color:var(--green);font-family:'Noto Sans SC',sans-serif">DLX-013290 · SBLC 1.2亿美元 · 新加坡→阿联酋</div><div style="font-size:11px;color:var(--muted2);font-family:'Noto Sans SC',sans-serif">2025年Q2成交 · 双方各1名授权代表 · 22天</div></div></div>
      <div style="text-align:center;padding-top:8px;border-top:1px solid var(--border);margin-top:6px"><span style="font-size:13px;color:var(--muted);font-family:'Noto Sans SC',sans-serif">数据库中已有340+笔成交记录，每日更新</span></div>
    </div>
  </div>

  <!-- CTAs ZH -->
  <div style="padding:0 16px;margin-bottom:16px">
    <div class="lctas">
      <button class="lbp" onclick="showAuth('create')" style="font-family:'Noto Sans SC',sans-serif"><span>✦</span> 创建账户</button>
      <button class="lbs" onclick="showAuth('login')" style="font-family:'Noto Sans SC',sans-serif">↩ 登录</button>
      <button class="lbg" onclick="enterApp()" style="font-family:'Noto Sans SC',sans-serif">以访客身份浏览 →</button>
    </div>
    <div class="ltrust" style="margin-top:14px">
      <div class="ltc"><div class="ltv">$4.2B</div><div class="ltl" style="font-family:'Noto Sans SC',sans-serif">已促成</div></div>
      <div class="ltc"><div class="ltv">340+</div><div class="ltl" style="font-family:'Noto Sans SC',sans-serif">已成交</div></div>
      <div class="ltc"><div class="ltv">47</div><div class="ltl" style="font-family:'Noto Sans SC',sans-serif">覆盖国家</div></div>
      <div class="ltc"><div class="ltv">免费</div><div class="ltl" style="font-family:'Noto Sans SC',sans-serif">首笔交易</div></div>
    </div>
  </div>

  <div class="lfoot" style="font-family:'Noto Sans SC',sans-serif">DEALEX © 2025 · 条款 · 隐私政策 · 所有交易均受监督</div>
</div><!-- end lc-zh -->

<!-- Upload Link Modal -->
<div id="uploadLinkModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(12px);z-index:1060;align-items:center;justify-content:center;padding:20px">
  <div style="background:var(--panel);border:1px solid var(--border-hi);padding:20px;max-width:360px;width:100%;max-height:80vh;overflow-y:auto">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <div style="font-size:13px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:var(--gold)">SECURE UPLOAD LINK</div>
      <button onclick="closeUploadModal()" style="background:none;border:none;color:var(--muted2);font-size:18px;cursor:pointer;padding:0;line-height:1">×</button>
    </div>
    <div style="font-size:13px;color:var(--muted2);line-height:1.7;margin-bottom:14px" id="ulm-desc">Generate a one-time link for your party to upload documents directly to DEALEX. They never see your documents or deal details.</div>
    <div style="margin-bottom:12px">
      <label class="fl">Recipient Name</label>
      <input class="fi" id="ulm-name" placeholder="e.g. Ahmad Zulkifli / 张伟">
    </div>
    <div style="margin-bottom:12px">
      <label class="fl">Recipient Email</label>
      <input class="fi" type="email" id="ulm-email" placeholder="recipient@company.com">
    </div>
    <div style="margin-bottom:12px">
      <label class="fl">Documents Required</label>
      <div style="display:flex;flex-direction:column;gap:5px" id="ulm-docs">
        <label style="display:flex;gap:8px;font-size:13px;color:var(--txt);cursor:pointer"><input type="checkbox" checked style="accent-color:var(--gold)"> Passport copy</label>
        <label style="display:flex;gap:8px;font-size:13px;color:var(--txt);cursor:pointer"><input type="checkbox" checked style="accent-color:var(--gold)"> Company registration</label>
        <label style="display:flex;gap:8px;font-size:13px;color:var(--txt);cursor:pointer"><input type="checkbox" checked style="accent-color:var(--gold)"> Bank details / SWIFT</label>
        <label style="display:flex;gap:8px;font-size:13px;color:var(--txt);cursor:pointer" id="ulm-mandate-row"><input type="checkbox" checked style="accent-color:var(--gold)"> Mandate Letter (signed)</label>
        <label style="display:flex;gap:8px;font-size:13px;color:var(--txt);cursor:pointer"><input type="checkbox" style="accent-color:var(--gold)"> Proof of address</label>
      </div>
    </div>
    <div style="margin-bottom:12px">
      <label class="fl">Link Expiry</label>
      <select class="fs">
        <option>24 hours</option>
        <option selected>72 hours</option>
        <option>7 days</option>
      </select>
    </div>
    <button class="bg" onclick="generateLink()">Generate Secure Link</button>
    <div id="ulm-result" style="display:none;margin-top:12px;background:rgba(53,160,101,.08);border:1px solid rgba(53,160,101,.3);padding:12px">
      <div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--green);font-weight:700;margin-bottom:6px">✓ LINK GENERATED</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--txt);background:var(--panel2);padding:8px;word-break:break-all;margin-bottom:8px" id="ulm-link-text">dealex.io/upload/DLX-secure-7f4a2b1c</div>
      <button onclick="copyLink()" style="background:var(--gold-a15);border:1px solid var(--border-mid);color:var(--gold);font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:8px 14px;cursor:pointer;width:100%;font-family:Montserrat,sans-serif">Copy Link</button>
    </div>
  </div>
</div>

</div><!-- end #landing -->
` }} />
  )
}
