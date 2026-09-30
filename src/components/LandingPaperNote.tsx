import { useId } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const PATH =
  'M14 22 C 28 8, 52 18, 74 10 C 96 3, 118 16, 142 8 C 166 2, 188 14, 214 7 C 238 2, 262 13, 286 9 C 302 7, 312 16, 316 28 L 318 70 C 308 86, 320 108, 312 128 C 304 148, 318 168, 310 190 C 304 208, 316 226, 308 248 C 304 262, 292 272, 274 268 C 250 276, 226 264, 200 272 C 176 278, 152 266, 128 274 C 104 280, 80 268, 56 276 C 36 280, 18 268, 8 256 C 2 240, 12 222, 6 204 C 1 186, 12 168, 5 150 C 0 132, 11 114, 6 96 C 2 78, 12 58, 7 40 C 4 30, 8 26, 14 22 Z';

export function LandingPaperNote({
  children,
  className = '',
  style,
  tape = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tape?: boolean;
}) {
  const textureId = `lp-paper-${useId().replace(/:/g, '')}`;

  return (
    <div className={`relative ${className}`} style={style}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 280"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id={textureId} patternUnits="userSpaceOnUse" width="320" height="280">
            <image
              href="/landing/grok_1790780443386.jpg"
              x="0"
              y="0"
              width="320"
              height="280"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
        <path d={PATH} fill={`url(#${textureId})`} />
        <path d={PATH} fill="none" stroke="rgba(112, 91, 57, .4)" strokeWidth="1.5" />
      </svg>
      {tape ? (
        <span
          aria-hidden="true"
          className="absolute z-[2]"
          style={{
            top: 6,
            left: '34%',
            width: 86,
            height: 26,
            background: 'linear-gradient(180deg,#e6d19a,#c4a056)',
            opacity: 0.8,
            transform: 'rotate(-8deg)',
            boxShadow: '0 1px 2px rgba(0,0,0,.2)',
          }}
        />
      ) : null}
      <div className="relative z-[1] px-7 py-8 text-[#1a1814]">{children}</div>
    </div>
  );
}
