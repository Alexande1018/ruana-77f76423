import { useId } from 'react';

const TAPE_PATH =
  'M10 2.1 C28 1.5 52 2.4 74 1.7 L77.6 3.2 L74.3 4.5 L79.1 5.8 L74.7 7.3 L77.4 8.9 L74.2 10.5 L78.6 12.1 L74.9 13.7 L78.1 15.5 L74.4 17.1 L78.3 18.9 L74.7 20.3 L76.4 22.3 L73.5 22.5 C52 23 30 22.2 10.5 22.6 L7.1 20.9 L10.3 19.3 L6.2 17.5 L9.9 15.9 L6.6 14.1 L10.5 12.5 L5.6 10.9 L9.7 9.3 L6.4 7.5 L10.3 5.9 L6.8 4.3 L9.9 2.9 L7.4 2.2 Z';

function NoteLine({ text, breakOnComma }: { text: string; breakOnComma?: boolean }) {
  const comma = breakOnComma ? text.indexOf(', ') : -1;
  if (comma === -1) {
    return <span className="worksite-note__line">{text}</span>;
  }

  return (
    <span className="worksite-note__line">
      {text.slice(0, comma + 1)}
      <br className="worksite-note__br" /> {text.slice(comma + 2)}
    </span>
  );
}

export function WorksiteNote({
  variant = 'hero',
  lines,
  className = '',
}: {
  variant?: 'hero' | 'aside';
  lines: readonly string[];
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const grain = `grain-${uid}`;
  const crepe = `crepe-${uid}`;
  const sheen = `sheen-${uid}`;
  const clip = `tape-clip-${uid}`;

  return (
    <div className={`worksite-note worksite-note--${variant} ${className}`.trim()}>
      <div className="worksite-note__sheet">
        <div className="worksite-note__face" aria-hidden="true">
          <svg className="worksite-note__grain">
            <filter id={grain} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#${grain})`} />
          </svg>
          <span className="worksite-note__crease" />
        </div>
        <svg className="worksite-note__tape" viewBox="0 0 84 24" aria-hidden="true">
          <defs>
            <linearGradient id={sheen} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff6e4" stopOpacity="0.55" />
              <stop offset="0.22" stopColor="#f3e6c4" stopOpacity="0.2" />
              <stop offset="0.55" stopColor="#e8d9b0" stopOpacity="0" />
              <stop offset="1" stopColor="#6d5838" stopOpacity="0.2" />
            </linearGradient>
            <pattern id={crepe} width="3" height="2.4" patternUnits="userSpaceOnUse">
              <rect width="3" height="0.7" fill="#fff" opacity="0.28" />
              <rect y="1.15" width="3" height="0.35" fill="#5c4930" opacity="0.22" />
            </pattern>
            <clipPath id={clip}>
              <path d={TAPE_PATH} />
            </clipPath>
            <filter id={`${grain}-fiber`} x="-5%" y="-20%" width="110%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9 0.45" numOctaves="2" seed="3" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.22  0 0 0 0.28 0"
              />
            </filter>
          </defs>
          <path d={TAPE_PATH} fill="#E8D9B0" fillOpacity="0.85" />
          <path d={TAPE_PATH} fill={`url(#${crepe})`} opacity="0.7" />
          <path d={TAPE_PATH} fill={`url(#${sheen})`} />
          <g clipPath={`url(#${clip})`} filter={`url(#${grain}-fiber)`} opacity="0.45">
            <rect width="84" height="24" fill="#fff" />
          </g>
        </svg>
        <p className="worksite-note__text">
          {lines.map((line) => (
            <NoteLine key={line} text={line} breakOnComma={variant === 'aside'} />
          ))}
        </p>
      </div>
    </div>
  );
}
