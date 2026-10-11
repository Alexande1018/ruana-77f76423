import { Fragment, useId, type CSSProperties } from 'react';

const TAPE_PATH =
  'M9.4 2.7 C27 1.1 49 2.85 68.2 1.35 L72.6 3.4 L68.4 4.55 L77.4 6.15 L69.6 7.35 L75.2 8.9 L68.8 10.15 L77.8 12.05 L70.4 13.35 L75.8 15.15 L69.2 16.55 L76.6 18.35 L70.2 19.7 L73.6 21.55 L68.6 22.35 C48 23.35 27 22.15 10.2 22.9 L4.2 20.7 L9.4 19.15 L2.4 17.05 L9.8 15.35 L3.6 13.2 L10.2 11.55 L1.8 9.85 L8.8 8.35 L4.4 6.55 L9.6 5.15 L3.2 3.55 L8.8 2.55 Z';

function unit(text: string, index: number, salt: number, channel: number) {
  let hash = (2166136261 ^ (salt * 977 + channel * 131)) >>> 0;
  const sample = `${index}:${text}`;
  for (let i = 0; i < sample.length; i += 1) {
    hash ^= sample.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 1000) / 1000;
}

function handStyle(text: string, index: number, salt: number): CSSProperties {
  const spin = unit(text, index, salt, 1) < 0.5 ? -1 : 1;
  const rise = unit(text, index, salt, 2) < 0.5 ? -1 : 1;
  const rotation = spin * (0.5 + unit(text, index, salt, 3));
  const baseline = rise * (1 + unit(text, index, salt, 4));
  const spacing = -0.016 + unit(text, index, salt, 5) * 0.028;
  const opacity = 0.85 + unit(text, index, salt, 6) * 0.15;

  return {
    transform: `rotate(${rotation.toFixed(2)}deg) translateY(${baseline.toFixed(2)}px)`,
    letterSpacing: `${spacing.toFixed(3)}em`,
    opacity: Number(opacity.toFixed(3)),
    backgroundPosition: `${Math.round(unit(text, index, salt, 7) * 46)}px ${Math.round(unit(text, index, salt, 8) * 24)}px`,
  };
}

function Word({ text, index, salt }: { text: string; index: number; salt: number }) {
  return (
    <span className="worksite-note__word" style={handStyle(text, index, salt)}>
      {text}
    </span>
  );
}

function PencilUnderline({ id }: { id: string }) {
  const fade = `${id}-fade`;
  const mask = `${id}-mask`;

  return (
    <svg className="worksite-note__stroke" viewBox="0 0 160 28" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={fade} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.1" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.78" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.9" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={mask}>
          <rect width="160" height="28" fill={`url(#${fade})`} />
        </mask>
        <filter id={id} x="-8%" y="-45%" width="116%" height="190%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.25" xChannelSelector="R" yChannelSelector="G" result="warp" />
          <feTurbulence type="fractalNoise" baseFrequency="1.55" numOctaves="1" seed="8" result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0.14  0 0 0 0 0.14  0 0 0 0 0.14  0 0 0 0.5 0"
            result="speck"
          />
          <feComposite in="speck" in2="warp" operator="in" result="speckIn" />
          <feBlend in="speckIn" in2="warp" mode="multiply" />
        </filter>
      </defs>
      <path
        d="M5 16.5 C24 12.2 46 19.4 74 14.2 C98 10.1 122 18.6 155 13.8"
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="3.05"
        strokeLinecap="round"
        mask={`url(#${mask})`}
        filter={`url(#${id})`}
      />
    </svg>
  );
}

function NoteLine({
  text,
  breakOnComma,
  salt,
  underline,
  strokeId,
}: {
  text: string;
  breakOnComma?: boolean;
  salt: number;
  underline?: boolean;
  strokeId: string;
}) {
  const words = text.split(' ');
  const tail =
    underline && words.length >= 2 && words.at(-2) === 'a' && words.at(-1)?.replace(/\.$/, '') === 'ti';
  const body = tail ? words.slice(0, -2) : words;
  const marked = tail ? words.slice(-2) : [];

  return (
    <span className="worksite-note__line">
      {body.map((word, index) => (
        <Fragment key={`${salt}-${word}-${index}`}>
          {index > 0 ? ' ' : null}
          <Word text={word} index={index} salt={salt} />
          {breakOnComma && word.endsWith(',') ? <br className="worksite-note__br" /> : null}
        </Fragment>
      ))}
      {marked.length === 2 ? (
        <>
          {' '}
          <span className="worksite-note__mark">
            <Word text={marked[0]} index={body.length} salt={salt} />{' '}
            <Word text={marked[1]} index={body.length + 1} salt={salt} />
            <PencilUnderline id={strokeId} />
          </span>
        </>
      ) : null}
    </span>
  );
}

function Tape({ uid, className = '' }: { uid: string; className?: string }) {
  const sheen = `sheen-${uid}`;
  const crepe = `crepe-${uid}`;
  const clip = `tape-clip-${uid}`;
  const fiber = `fiber-${uid}`;

  return (
    <svg
      className={`worksite-note__tape ${className}`.trim()}
      viewBox="0 0 84 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={sheen} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6e4" stopOpacity="0.42" />
          <stop offset="0.2" stopColor="#f4e7c8" stopOpacity="0.12" />
          <stop offset="0.58" stopColor="#e8d9b0" stopOpacity="0" />
          <stop offset="1" stopColor="#6d5838" stopOpacity="0.14" />
        </linearGradient>
        <pattern id={crepe} width="3.2" height="2.5" patternUnits="userSpaceOnUse">
          <rect width="3.2" height="0.55" fill="#fffaf0" opacity="0.34" />
          <rect y="1.2" width="3.2" height="0.32" fill="#5c4930" opacity="0.2" />
        </pattern>
        <clipPath id={clip}>
          <path d={TAPE_PATH} />
        </clipPath>
        <filter id={fiber} x="-6%" y="-25%" width="112%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85 0.4" numOctaves="2" seed="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.42  0 0 0 0 0.34  0 0 0 0 0.2  0 0 0 0.22 0" />
        </filter>
      </defs>
      <path d={TAPE_PATH} fill="#E8D9B0" fillOpacity="0.44" />
      <path d={TAPE_PATH} fill={`url(#${crepe})`} opacity="0.4" />
      <path d={TAPE_PATH} fill={`url(#${sheen})`} />
      <g clipPath={`url(#${clip})`} filter={`url(#${fiber})`} opacity="0.16">
        <rect width="84" height="24" fill="#fff" />
      </g>
      <g clipPath={`url(#${clip})`} fill="none" strokeLinecap="round">
        <path
          d="M11 11.7 C26 9.7 40 14.1 56 11.2 C66 9.6 73 12.9 76 11.6"
          stroke="#4a3b28"
          strokeOpacity="0.38"
          strokeWidth="0.6"
        />
        <path
          d="M11 12.45 C26 10.5 40 14.8 56 11.95 C66 10.35 73 13.6 76 12.3"
          stroke="#fff9ee"
          strokeOpacity="0.55"
          strokeWidth="0.4"
        />
      </g>
      <g fill="none" stroke="#cbb892" strokeWidth="0.55" strokeLinecap="round">
        <path d="M3.4 7.6 L0.4 7.1" />
        <path d="M2.6 13.4 L0.2 13.9" />
        <path d="M4.6 18.8 L1.2 18.2" />
        <path d="M76.8 5.6 L80.4 5.1" />
        <path d="M77.6 12.2 L81.2 12.7" />
        <path d="M75.4 18.6 L79.2 19.3" />
      </g>
    </svg>
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
  const saltBase = variant === 'aside' ? 11 : 3;

  return (
    <div className={`worksite-note worksite-note--${variant} ${className}`.trim()}>
      <div className="worksite-note__sheet">
        <span className="worksite-note__lift" aria-hidden="true" />
        <div className="worksite-note__face" aria-hidden="true">
          <svg className="worksite-note__grain">
            <filter id={grain} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="3" seed="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#${grain})`} />
          </svg>
          <span className="worksite-note__crease" />
          <span className="worksite-note__glow" />
        </div>
        <Tape uid={uid} />
        {variant === 'hero' ? <Tape uid={`${uid}-b`} className="worksite-note__tape--side" /> : null}
        <p className="worksite-note__text">
          {lines.map((line, index) => (
            <NoteLine
              key={line}
              text={line}
              breakOnComma={variant === 'aside'}
              salt={saltBase + index * 5}
              underline={variant === 'hero'}
              strokeId={`stroke-${uid}-${index}`}
            />
          ))}
        </p>
      </div>
    </div>
  );
}
