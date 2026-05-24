export default function AuthSheet() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!-- AUTH -->
<div class="so" id="authSheet" role="dialog" aria-modal="true" aria-labelledby="authSheetTitle" onclick="if(event.target===this)closeAuth()"><div class="sh"><div class="shh" id="authSheetTitle"></div>
<div class="atr"><button class="at active" id="atLogin" onclick="swAt('login')">Login</button><button class="at" id="atCreate" onclick="swAt('create')">Create Account</button></div>
<div class="ap active" id="apLogin"><div style="margin-bottom:14px"><div style="font-family:'Inter', sans-serif;font-size:22px;font-weight:300;color:var(--white);margin-bottom:3px">Welcome back.</div><div style="font-size:9px;color:var(--muted2)">Log in to access your deals and documents.</div></div>
<div class="fg"><label class="fl">Email or Username</label><input class="fi" type="text" placeholder="your@email.com" id="loginEmail" onkeydown="if(event.key==='Enter')doLogin()"></div>
<div class="fg"><label class="fl">Password</label><input class="fi" type="password" placeholder="Your password" id="loginPass" onkeydown="if(event.key==='Enter')doLogin()"></div>
<div style="display:flex;justify-content:flex-end;margin-bottom:14px"><span style="font-size:8.5px;color:var(--gold);cursor:pointer;letter-spacing:.1em">Forgot password?</span></div>
<button class="bg" onclick="doLogin()">Log In to DEALEX</button>
<div style="display:flex;align-items:center;gap:10px;margin:14px 0"><div style="flex:1;height:1px;background:var(--border)"></div><span style="font-size:8px;color:var(--muted);letter-spacing:.1em">OR</span><div style="flex:1;height:1px;background:var(--border)"></div></div>
<button class="bgh" onclick="doSocial()" style="margin-bottom:8px"><span style="font-size:15px">G</span> Continue with Google</button>
<button class="bgh" onclick="doSocial()"><span style="font-size:15px">🍎</span> Continue with Apple</button>
<p style="font-size:8px;color:var(--muted);text-align:center;margin-top:12px;line-height:1.6">New to DEALEX? <span style="color:var(--gold);cursor:pointer" onclick="swAt('create')">Create a free account →</span></p></div>
<div class="ap" id="apCreate"><div style="margin-bottom:14px"><div style="font-family:'Inter', sans-serif;font-size:22px;font-weight:300;color:var(--white);margin-bottom:3px">Join DEALEX.</div><div style="font-size:9px;color:var(--muted2)">Your first deal is free. No credit card required.</div></div>
<div style="background:var(--green-a);border:1px solid rgba(42,128,80,.35);padding:10px 12px;margin-bottom:14px;display:flex;align-items:center;gap:10px"><span style="font-size:20px">🎁</span><div><div style="font-size:10px;font-weight:700;color:var(--green);margin-bottom:2px">First Deal is FREE</div><div style="font-size:9px;color:var(--muted2);line-height:1.5">Complete your first DOA at no cost.</div></div></div>
<div class="fr"><div class="fg"><label class="fl">First Name</label><input class="fi" type="text" placeholder="First name"></div><div class="fg"><label class="fl">Last Name</label><input class="fi" type="text" placeholder="Last name"></div></div>
<div class="fg"><label class="fl">Email Address</label><input class="fi" type="email" placeholder="your@email.com" id="regEmail" onkeydown="if(event.key==='Enter')doReg()"></div>
<div class="fg"><label class="fl">Password</label><input class="fi" type="password" placeholder="Min 8 characters" id="regPass" onkeydown="if(event.key==='Enter')doReg()"></div>
<div class="fg"><label class="fl">Country</label><select class="fs"><option>Malaysia</option><option>Singapore</option><option>Philippines</option><option>Indonesia</option><option>United States</option><option>UAE</option><option>Hong Kong</option><option>Other</option></select></div>
<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;padding:10px 12px;background:var(--gold-a08);border:1px solid var(--border-mid)"><input type="checkbox" id="tc" style="margin-top:2px;accent-color:var(--gold)"><label for="tc" style="font-size:9px;color:var(--muted2);line-height:1.6;cursor:pointer">I agree to the DEALEX <span style="color:var(--gold)">Terms of Service</span> and <span style="color:var(--gold)">Privacy Policy</span>.</label></div>
<button class="bg" onclick="doReg()">Create Free Account →</button>
<p style="font-size:8px;color:var(--muted);text-align:center;margin-top:12px;line-height:1.6">Already have an account? <span style="color:var(--gold);cursor:pointer" onclick="swAt('login')">Log in →</span></p></div>
</div></div>` }} />
  )
}
