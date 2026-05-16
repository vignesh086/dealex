export default function DocViewer() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div id="doc-viewer" role="dialog" aria-modal="true" aria-labelledby="doc-viewer-title">
  <div id="doc-viewer-bar">
    <div id="doc-viewer-title">Document</div>
    <button class="swift-copy-btn" onclick="printDocViewer()" title="Print document">🖨️ Print</button>
    <button class="swift-copy-btn" onclick="copyDocViewer()" title="Copy all text">📋 Copy All</button>
    <button class="swift-copy-btn" onclick="closeDocViewer()" title="Close viewer" aria-label="Close document viewer">✕</button>
  </div>
  <div id="doc-viewer-body"></div>
</div>` }} />
  )
}
