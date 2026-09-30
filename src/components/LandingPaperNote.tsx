import { useId } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const PATH =
  'M13 28 C 18 17, 28 12, 41 16 C 54 19, 60 9, 73 10 C 86 11, 91 17, 103 10 C 116 2, 126 10, 138 12 C 151 14, 157 5, 170 7 C 184 9, 190 17, 202 12 C 216 6, 225 5, 238 12 C 251 19, 259 7, 273 11 C 288 16, 293 20, 306 17 L 316 27 C 311 39, 319 48, 315 61 C 312 74, 306 81, 314 95 C 321 110, 309 120, 314 134 C 320 148, 311 157, 316 171 C 321 187, 308 196, 313 208 C 318 222, 309 232, 314 245 L 306 261 C 294 258, 287 271, 273 266 C 259 261, 250 274, 236 269 C 221 264, 214 271, 201 272 C 185 274, 178 263, 163 270 C 148 277, 140 268, 126 271 C 111 274, 103 264, 89 270 C 73 277, 62 265, 49 270 C 35 275, 24 267, 15 262 L 7 251 C 14 238, 3 228, 8 214 C 13 200, 1 190, 7 177 C 13 163, 3 152, 8 138 C 13 124, 2 112, 8 99 C 14 86, 5 75, 9 61 C 13 48, 4 39, 13 28 Z';

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
