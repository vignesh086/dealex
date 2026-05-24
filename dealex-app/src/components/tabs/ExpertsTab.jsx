export default function ExpertsTab() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div class="tab-page" id="pg-experts"><div class="section"><div class="ey">Experts</div><div class="h2">CONNECT WITH <em>EXPERTS.</em></div><div class="bt">Book consultations with verified DEALEX professionals.</div></div>
<div style="padding:0 16px"><div class="card"><div class="cb" style="text-align:center;padding:30px"><div style="font-size:36px;margin-bottom:10px">👨‍💼</div><div style="font-size:11px;color:var(--white);font-weight:600">Expert Network</div><div style="font-size:13px;color:var(--muted2);margin-top:4px">DEALEX Desk · Lv.25 Banker · Law · Gold</div></div></div></div>
<div class="empty-state"><div class="es-icon">👨‍💼</div><div class="es-text">No experts listed yet</div></div>
</div>
<!-- MATCH -->
` }} />
  )
}
