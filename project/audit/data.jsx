// Issue data — each issue has: title, severity (hi/md/lo), tags, body, demoBefore, demoAfter
// Demos are JSX nodes rendered inside the .demo-content area

const ISSUES = [
  {
    n: 1,
    title: 'Emoji icons everywhere',
    sev: 'hi',
    tags: ['Visual', 'Brand', 'Quick win'],
    body: <>
      Sidebar nav (<code>🏠 🏦 📄 💼 👨‍💼</code>), theme toggle (<code>🌙</code>), role selector (<code>🏛️ 📜 🤝</code>), document checklists (<code>🪪 🏢 ✍️</code>), and language tabs (<code>🇬🇧 🇨🇳</code>) all use emoji as iconography. Emoji render <strong>inconsistently across OS/browser</strong>, can't be color-tuned, ship a gendered <code>👨‍💼</code> for "Experts", and signal "AI demo" more than "regulated trade-finance platform." You already have <code>icons.svg</code> in <code>public/</code> sitting unused.
    </>,
    before: <EmojiNavBefore />,
    after: <EmojiNavAfter />,
  },
  {
    n: 2,
    title: 'Type sizes well below readable',
    sev: 'hi',
    tags: ['Accessibility', 'A11y'],
    body: <>
      The landing uses <code>7px</code>, <code>7.5px</code>, <code>8px</code>, <code>8.5px</code>, <code>9px</code>, <code>9.5px</code>, and <code>10px</code> as body sizes. Document-requirement labels are <code>9.5px</code>; their descriptions are <code>8px</code>. <strong>WCAG minimum body is 16px</strong>; this fails on every screen and is unreadable on phones. Audience is "mixed — needs to serve SMB / first-time issuers" — they will bounce.
    </>,
    before: <TypeBefore />,
    after: <TypeAfter />,
  },
  {
    n: 3,
    title: 'Color token misnamed — `--gold` is actually blue',
    sev: 'md',
    tags: ['Code health', 'Tokens', 'Quick win'],
    body: <>
      <code>--gold: #3B49DF</code>, <code>--gold-lt</code>, <code>--gold-dk</code>, <code>--gold-a08</code>, …all reference an indigo blue. New devs (and you, six months from now) will be misled. Plus, the brand mark uses gold sometimes and blue elsewhere — pick one. Rename to <code>--accent</code> + a brand-blue palette, and run a single CSS find-replace.
    </>,
    before: <ColorBefore />,
    after: <ColorAfter />,
  },
  {
    n: 4,
    title: 'Landing leads with a "no" wall',
    sev: 'hi',
    tags: ['UX', 'Copy', 'Conversion'],
    body: <>
      First substantive content is a red callout titled <strong>"⚠ DEALEX GROUND RULES — READ BEFORE YOU PROCEED"</strong> followed by three "No X / No Y" rules. Before the user understands what Dealex <em>is</em>, they're being scolded. Confidence-building copy belongs first ("what you get"); discipline copy belongs after sign-up or as fine print. Lead with value, finish with policy.
    </>,
    before: <CopyBefore />,
    after: <CopyAfter />,
  },
  {
    n: 5,
    title: 'No primary CTA above the fold',
    sev: 'hi',
    tags: ['Conversion', 'UX'],
    body: <>
      The hero shows a tagline but no button. The first action ("Start as Principal", "Create Account") is buried <strong>4+ screens down</strong> after the user has read three rules, a hierarchy diagram, and four role cards. For mixed audiences (SMB included), pair a clear "Start your first deal" CTA with a secondary "How it works" — both above the fold. Education is a click away, not a prerequisite.
    </>,
    before: <CtaBefore />,
    after: <CtaAfter />,
  },
  {
    n: 6,
    title: 'Sidebar uses `dangerouslySetInnerHTML` + `onclick`',
    sev: 'md',
    tags: ['Code health', 'React anti-pattern'],
    body: <>
      <code>Sidebar.jsx</code>, <code>Landing.jsx</code> and most tabs are <strong>strings injected via <code>dangerouslySetInnerHTML</code></strong>, calling <code>window.navTo</code>, <code>window.toggleTheme</code>, <code>window.selectRole</code> from inline <code>onclick</code> handlers. This defeats every reason you adopted React: no event delegation, no state management, no type safety, XSS surface, and your <code>aria-selected</code> attributes go stale because they're set in a string, not derived from state. Port to real components and the rest of this audit gets cheaper.
    </>,
    before: <CodeBefore />,
    after: <CodeAfter />,
  },
  {
    n: 7,
    title: 'Hardcoded "live" ticker',
    sev: 'md',
    tags: ['Trust', 'Content', 'Quick win'],
    body: <>
      The topbar ticker shows <code>GOLD $2,645 ▲0.8%</code> / <code>BTC $67,340 ▲1.2%</code> with hardcoded values that <strong>never change.</strong> For a platform whose pitch is "real procedures, real compliance," static market data masquerading as live is the worst possible signal. Either wire a real feed (even a 5-min cached one), remove it, or relabel it as "indicative" with a timestamp.
    </>,
    before: <TickerBefore />,
    after: <TickerAfter />,
  },
  {
    n: 8,
    title: 'Party-hierarchy diagram drawn in raw CSS',
    sev: 'md',
    tags: ['Visual'],
    body: <>
      The "EVERY DEAL HAS A FIXED STRUCTURE" diagram uses skewed <code>::before/::after</code> pseudo-elements and dashed borders to fake connector lines. It works but reads as <strong>visually janky</strong> — the lines don't actually connect to the boxes. This is a flagship explainer of your product model. It deserves an inline SVG with proper paths, real arrowheads, and labels that align.
    </>,
    before: <DiagramBefore />,
    after: <DiagramAfter />,
  },
  {
    n: 9,
    title: 'Letter-spacing as decoration on every label',
    sev: 'lo',
    tags: ['Visual', 'Type'],
    body: <>
      Almost every label uses uppercase with <code>letter-spacing: 0.18em–0.24em</code>. At <code>9–10px</code> with heavy tracking, labels become a beige texture you have to decode. The technique is fine for one or two anchor labels per screen (section headers, the wordmark). When every label has it, hierarchy collapses. Reserve the treatment; reach for sentence-case + weight contrast elsewhere.
    </>,
    before: <SpacingBefore />,
    after: <SpacingAfter />,
  },
  {
    n: 10,
    title: 'No focus / hover states; tap targets undersized',
    sev: 'md',
    tags: ['Accessibility', 'Mobile'],
    body: <>
      Nav buttons, role cards, language tabs, and the theme toggle have no visible <code>:focus-visible</code> state — keyboard users can't see where they are. The sidebar toggle is <code>34×34px</code>, the language tabs are <code>~22px</code> tall, role cards are <code>10px</code> tall labels — all below the <strong>44×44px minimum tap target</strong>. Add 2px focus rings, bump targets to 44px on touch, and the app passes a basic a11y sweep.
    </>,
    before: <FocusBefore />,
    after: <FocusAfter />,
  },
];

window.ISSUES = ISSUES;
