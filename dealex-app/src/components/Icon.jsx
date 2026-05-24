/**
 * Icon — lightweight SVG icon system
 * 24 × 24 viewBox, 1.6 stroke-width, currentColor
 * Usage: <Icon name="home" size={20} />
 */

const PATHS = {
  home: (
    <path
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  bank: (
    <path
      d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  document: (
    <path
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  briefcase: (
    <path
      d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  people: (
    <path
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  moon: (
    <path
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        strokeLinecap="round"
      />
    </>
  ),
};

export default function Icon({ name, size = 20, className = '', style, ...props }) {
  const content = PATHS[name];
  if (!content) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={className}
      style={style}
      {...props}
    >
      {content}
    </svg>
  );
}
