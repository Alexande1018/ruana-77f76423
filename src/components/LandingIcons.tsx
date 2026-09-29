type GlyphProps = { className?: string };

function Glyph({ className = 'h-12 w-12', children }: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

export function WrenchGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <g transform="rotate(-42 32 32)">
        <rect x="27.5" y="24" width="9" height="28" rx="4" fill="#C5DCEC" />
        <path
          fill="#9EC4DC"
          d="M18 20.5C18 13.6 23.6 8 30.5 8h3C41.4 8 47 13.6 47 20.5V30H38.2a6.2 6.2 0 0 0-12.4 0H18V20.5z"
        />
        <rect x="29" y="22.5" width="6" height="8" rx="1" fill="#141820" />
      </g>
    </Glyph>
  );
}

export function PaintbrushGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <g transform="rotate(-38 32 34)">
        <rect x="28" y="6" width="8" height="30" rx="3.5" fill="#3C7EAB" />
        <rect x="26" y="34" width="12" height="6" rx="1.5" fill="#E2B45A" />
        <path d="M26.5 40h11l-1.6 12.5c-.3 2.2-2.2 3.8-4.4 3.5-1.8-.2-3.3-1.6-3.6-3.4L26.5 40z" fill="#E07A2F" />
        <path d="M29 42.5h6.2l-.6 5.2H29.6z" fill="#F0A35A" />
      </g>
    </Glyph>
  );
}

export function BoltGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <polygon points="36,6 18,36 30,36 26,58 48,26 34,26" fill="#F5C542" />
    </Glyph>
  );
}

export function BrickGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <rect x="10" y="16" width="20" height="10" rx="1.6" fill="#E08A62" />
      <rect x="33" y="16" width="21" height="10" rx="1.6" fill="#D4724E" />
      <rect x="10" y="28" width="13" height="10" rx="1.6" fill="#C46545" />
      <rect x="26" y="28" width="28" height="10" rx="1.6" fill="#E08A62" />
      <rect x="10" y="40" width="22" height="10" rx="1.6" fill="#D4724E" />
      <rect x="35" y="40" width="19" height="10" rx="1.6" fill="#C46545" />
    </Glyph>
  );
}

export function SnowflakeGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <g fill="none" stroke="#7ED0E0" strokeWidth="4" strokeLinecap="round">
        <path d="M32 10v44M14 20l36 24M14 44l36-24" />
      </g>
      <g fill="#B7EEF5">
        <circle cx="32" cy="32" r="3.2" />
        <circle cx="32" cy="12" r="2.4" />
        <circle cx="32" cy="52" r="2.4" />
        <circle cx="16" cy="22" r="2.4" />
        <circle cx="48" cy="42" r="2.4" />
        <circle cx="16" cy="42" r="2.4" />
        <circle cx="48" cy="22" r="2.4" />
      </g>
    </Glyph>
  );
}

export function TreeGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <rect x="28" y="40" width="8" height="14" rx="2" fill="#A67C52" />
      <circle cx="32" cy="30" r="14" fill="#3E9A4E" />
      <circle cx="23" cy="34" r="9" fill="#57B368" />
      <circle cx="41" cy="34" r="9" fill="#2F8640" />
    </Glyph>
  );
}

export function BroomGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <g transform="rotate(-28 32 32)">
        <rect x="29.5" y="6" width="5" height="32" rx="2.2" fill="#C9923E" />
        <path d="M20 38h24l-3.2 16.5c-.4 2-2.2 3.5-4.3 3.5H27.5c-2.1 0-3.9-1.5-4.3-3.5L20 38z" fill="#E6C56A" />
        <path d="M26 40.5v14M32 40v15M38 40.5v14" stroke="#C9923E" strokeWidth="1.4" />
      </g>
    </Glyph>
  );
}

export function MoreGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <g fill="#9AA3AD">
        <circle cx="16" cy="32" r="4.2" />
        <circle cx="32" cy="32" r="4.2" />
        <circle cx="48" cy="32" r="4.2" />
      </g>
    </Glyph>
  );
}
