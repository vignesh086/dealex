export default function TemplatesTab() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div class="tab-page" id="pg-templates"><div class="section"><div class="ey">Templates</div><div class="h2">DOCUMENT <em>TEMPLATES.</em></div><div class="bt">Legal templates for every deal type.</div></div>
<div class="ig"><div class="ic" onclick="showT('Open DOA workflow')"><div class="ii">📜</div><div class="it">DOA</div><div class="is">Deed of Assignment</div></div><div class="ic" onclick="openIMFPA()"><div class="ii">📋</div><div class="it">IMFPA</div><div class="is">Irrevocable Master Fee Protection</div></div><div class="ic" onclick="generateNCNDA()"><div class="ii">🛡️</div><div class="it">NCNDA</div><div class="is">Non-Circumvention Non-Disclosure</div></div><div class="ic lk"><div class="ii">📨</div><div class="it">ICPO</div><div class="is">Coming Soon</div></div><div class="ic lk"><div class="ii">🏛️</div><div class="it">BCL</div><div class="is">Coming Soon</div></div><div class="ic lk"><div class="ii">📝</div><div class="it">SPA</div><div class="is">Coming Soon</div></div></div>
<div class="empty-state" id="templates-empty-state" style="display:none"><div class="es-icon">📄</div><div class="es-text">No items yet</div></div>
</div>
<!-- EXPERTS -->
` }} />
  )
}
