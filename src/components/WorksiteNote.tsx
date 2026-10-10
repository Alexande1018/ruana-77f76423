import { useId } from 'react';

const TAPE_PATH =
  'M40 16 C98 13 156 17 188 14 L202 19 L186 25 L204 31 L187 37 L201 43 L186 49 C132 52 78 48 42 51 L26 46 L40 40 L22 34 L39 28 L24 22 L40 17 Z';

export function WorksiteNote({
  variant = 'hero',
  lines,
}: {
  variant?: 'hero' | 'aside';
  lines: readonly string[];
}) {
  const uid = useId().replace(/:/g, '');
  const grad = `tape-${uid}`;
  const crepe = `crepe-${uid}`;
  const grain = `grain-${uid}`;
  const clip = `tape-clip-${uid}`;

  return (
    <div className={`worksite-note worksite-note--${variant}`}>
      <div className="worksite-note__sheet">
        <svg className="worksite-note__tape" viewBox="0 0 230 64" aria-hidden="true">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6edd8" stopOpacity="0.5" />
              <stop offset="0.16" stopColor="#ead9b6" stopOpacity="0.8" />
              <stop offset="0.62" stopColor="#e3d2ad" stopOpacity="0.74" />
              <stop offset="1" stopColor="#cbb892" stopOpacity="0.84" />
            </linearGradient>
            <pattern id={crepe} width="3.4" height="64" patternUnits="userSpaceOnUse">
              <rect width="1" height="64" fill="#fff" opacity="0.2" />
              <rect x="1.7" width="0.55" height="64" fill="#5a4530" opacity="0.18" />
            </pattern>
            <clipPath id={clip}>
              <path d={TAPE_PATH} />
            </clipPath>
            <filter id={`${grain}-tape`} x="-4%" y="-12%" width="108%" height="124%">
              <feTurbulence type="fractalNoise" baseFrequency="0.75 0.28" numOctaves="2" seed="5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.42  0 0 0 0 0.34  0 0 0 0 0.22  0 0 0 0.22 0"
              />
            </filter>
          </defs>
          <path d={TAPE_PATH} fill={`url(#${grad})`} />
          <path d={TAPE_PATH} fill={`url(#${crepe})`} opacity="0.65" />
          <g clipPath={`url(#${clip})`} filter={`url(#${grain}-tape)`} opacity="0.55">
            <rect width="230" height="64" fill="#fff" />
          </g>
        </svg>
        <svg className="worksite-note__grain" aria-hidden="true">
          <filter id={grain} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${grain})`} />
        </svg>
        <p className="worksite-note__text">
          {lines.map((line) => (
            <span className="worksite-note__line" key={line}>
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
