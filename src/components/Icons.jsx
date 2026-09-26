// Decorative stroke icons from the design. Always aria-hidden.

export function Logo({ size = 30, ring = '#1F4D3A', north = '#B34A22', south = '#1F4D3A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="13.5" stroke={ring} strokeWidth="2" />
      <path d="M16 6.5l4 9.5h-8z" fill={north} />
      <path d="M16 25.5l-4-9.5h8z" fill={south} />
    </svg>
  );
}

function Stroke({ size = 18, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ArrowRight({ size }) {
  return (
    <Stroke size={size}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Stroke>
  );
}

export function ArrowLeft({ size }) {
  return (
    <Stroke size={size}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </Stroke>
  );
}

// Feature icons: "compass", "leaf" or "map".
export function FeatureIcon({ name }) {
  const props = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#E3B26B',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (name === 'leaf') {
    return (
      <svg {...props}>
        <path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14z" />
        <path d="M5 19l7-7" />
      </svg>
    );
  }
  if (name === 'map') {
    return (
      <svg {...props}>
        <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
        <path d="M9 4v14M15 6v14" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </svg>
  );
}

// Shown where a photo will go, until there is one.
export function ImagePlaceholder() {
  return (
    <div className="img-placeholder" aria-hidden="true">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(255, 251, 244, 0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="33" cy="15" r="5" />
        <path d="M4 40 L17 22 L26 33 L31 27 L44 40 Z" />
      </svg>
    </div>
  );
}
