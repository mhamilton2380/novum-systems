// The Novum N mark: two pillars and a solid green diagonal, no tile, so it reads as a firm's mark rather than an app icon.
export function Mark({ width = 22, height = 24, className }: { width?: number; height?: number; className?: string }) {
  return (
    <svg width={width} height={height} viewBox="14 13 36 38" className={className} aria-hidden="true">
      <rect x="16" y="15" width="8" height="34" rx="1.2" fill="currentColor" />
      <rect x="40" y="15" width="8" height="34" rx="1.2" fill="currentColor" />
      <path d="M18 15h8l20 34h-8z" fill="#00b36e" />
    </svg>
  );
}

export function Brand() {
  return (
    <>
      <Mark />
      <span className="wm">Novum<sup>AI</sup></span>
    </>
  );
}
