import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';
import { GREEN, GREEN_BTN, PAPER, TITLE_SHADOW } from '@/lib/landingTheme';
import { ParallaxImage } from '@/components/LandingMotion';

const HERO = '/landing/grok_1790806698745.jpg';

const SWIPE =
  'M 58.0 92.0 C 68.4 82.0, 85.3 68.6, 102.0 66.0 C 118.7 63.4, 130.2 80.2, 148.0 78.0 C 165.8 75.8, 178.7 55.1, 198.0 54.0 C 217.3 52.9, 230.9 73.5, 252.0 72.0 C 273.1 70.5, 290.5 46.7, 312.0 46.0 C 333.5 45.3, 346.5 68.7, 368.0 68.0 C 389.5 67.3, 405.0 42.7, 428.0 42.0 C 451.0 41.3, 469.0 62.9, 492.0 64.0 C 515.0 65.1, 528.7 46.1, 552.0 48.0 C 575.3 49.9, 594.7 74.7, 618.0 74.0 C 641.3 73.3, 655.0 45.5, 678.0 44.0 C 701.0 42.5, 719.0 66.7, 742.0 66.0 C 765.0 65.3, 778.7 40.7, 802.0 40.0 C 825.3 39.3, 844.7 60.1, 868.0 62.0 C 891.3 63.9, 905.4 48.5, 928.0 50.0 C 950.6 51.5, 967.0 68.9, 990.0 70.0 C 1013.0 71.1, 1030.1 54.5, 1052.0 56.0 C 1073.9 57.5, 1089.5 69.5, 1108.0 78.0 C 1126.5 86.5, 1141.3 89.4, 1152.0 102.0 C 1162.7 114.6, 1171.6 133.0, 1166.0 146.0 C 1160.4 159.0, 1141.6 169.8, 1122.0 172.0 C 1102.4 174.2, 1083.0 155.0, 1060.0 158.0 C 1037.0 161.0, 1021.3 186.5, 998.0 188.0 C 974.7 189.5, 958.1 164.9, 934.0 166.0 C 909.9 167.1, 892.1 193.3, 868.0 194.0 C 843.9 194.7, 827.7 170.4, 804.0 170.0 C 780.3 169.6, 763.7 193.1, 740.0 192.0 C 716.3 190.9, 699.7 165.1, 676.0 164.0 C 652.3 162.9, 635.7 186.7, 612.0 186.0 C 588.3 185.3, 571.7 160.7, 548.0 160.0 C 524.3 159.3, 508.1 182.7, 484.0 182.0 C 459.9 181.3, 442.1 156.7, 418.0 156.0 C 393.9 155.3, 378.1 177.3, 354.0 178.0 C 329.9 178.7, 312.1 158.9, 288.0 160.0 C 263.9 161.1, 247.0 184.4, 224.0 184.0 C 201.0 183.6, 184.7 159.9, 164.0 158.0 C 143.3 156.1, 129.8 175.5, 112.0 174.0 C 94.2 172.5, 80.2 160.0, 68.0 150.0 C 55.8 140.0, 47.9 130.7, 46.0 120.0 C 44.1 109.3, 47.6 102.0, 58.0 92.0 Z';

const SWIPE_BRISTLES =
  'M 118 58 C 168 34, 214 48, 196 30 C 176 44, 140 52, 118 58 Z M 392 48 C 454 22, 512 40, 486 26 C 458 40, 420 50, 392 48 Z M 742 46 C 804 20, 860 38, 834 24 C 808 38, 768 48, 742 46 Z M 1008 62 C 1064 40, 1112 58, 1088 46 C 1064 58, 1032 66, 1008 62 Z M 132 176 C 196 198, 250 184, 228 204 C 186 198, 154 188, 132 176 Z M 470 178 C 540 206, 600 186, 568 210 C 516 202, 486 190, 470 178 Z M 820 176 C 890 204, 948 182, 916 206 C 864 198, 840 186, 820 176 Z M 18 108 C 4 96, 8 122, 26 124 C 16 116, 14 112, 18 108 Z M 1178 118 C 1204 108, 1216 124, 1196 132 C 1184 128, 1176 124, 1178 118 Z';

const BADGE =
  'M 36 86 C 48 52, 92 40, 148 54 C 198 28, 246 46, 310 38 C 372 24, 424 44, 488 34 C 548 22, 598 40, 648 36 C 692 30, 724 52, 734 78 C 748 108, 736 142, 712 160 C 668 188, 610 170, 548 184 C 486 200, 420 174, 354 188 C 286 204, 220 176, 156 186 C 96 196, 48 168, 28 146 C 12 128, 16 104, 36 86 Z';

const BADGE_BRISTLES =
  'M 92 58 C 140 32, 188 46, 168 28 C 148 42, 112 52, 92 58 Z M 300 40 C 360 16, 414 34, 388 20 C 360 34, 324 44, 300 40 Z M 520 36 C 582 14, 634 32, 608 18 C 576 32, 544 42, 520 36 Z M 110 178 C 168 202, 220 186, 198 206 C 160 200, 128 188, 110 178 Z M 360 182 C 430 210, 490 190, 456 214 C 404 206, 376 192, 360 182 Z M 560 176 C 624 202, 678 184, 648 206 C 604 198, 576 186, 560 176 Z M 14 112 C 2 100, 6 126, 24 128 C 14 118, 12 114, 14 112 Z M 742 96 C 768 86, 774 108, 754 116 C 744 108, 740 100, 742 96 Z';

function PaintSwipe() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute -z-10 max-w-none overflow-visible"
      style={{
        left: '50%',
        top: '50%',
        width: 'calc(100% + 1.65rem)',
        height: 'calc(100% + 0.85rem)',
        transform: 'translate(-50%, -50%) rotate(-2deg)',
      }}
      viewBox="0 0 1240 230"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="ruana-hero-swipe" x="-10%" y="-28%" width="120%" height="156%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.085" numOctaves="3" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#ruana-hero-swipe)">
        <path d={SWIPE} fill={GREEN_BTN} transform="translate(0 9)" />
        <path d={SWIPE} fill={GREEN} />
        <path d={SWIPE_BRISTLES} fill={GREEN} />
      </g>
      <rect x="64" y="58" width="1104" height="124" rx="30" fill={GREEN} />
    </svg>
  );
}

function BadgePatch() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute -z-10 max-w-none overflow-visible"
      style={{
        left: '50%',
        top: '50%',
        width: 'calc(100% + 1.35rem)',
        height: 'calc(100% + 1.15rem)',
        transform: 'translate(-50%, -50%)',
      }}
      viewBox="0 0 780 230"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="ruana-hero-badge" x="-12%" y="-32%" width="124%" height="164%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.11" numOctaves="3" seed="8" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="13" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#ruana-hero-badge)">
        <path d={BADGE} fill={GREEN_BTN} transform="translate(0 8)" />
        <path d={BADGE} fill={GREEN} />
        <path d={BADGE_BRISTLES} fill={GREEN} />
      </g>
      <rect x="46" y="64" width="684" height="108" rx="22" fill={GREEN} />
    </svg>
  );
}

function BadgeArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 72 56"
      className={className}
      fill="none"
    >
      <path
        d="M58 46c-8-2-18-8-26-16-6-6-12-14-16-22"
        stroke={GREEN}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M14 14c2 6-2 8-6 7M16 12c6 1 8-4 12-6"
        stroke={GREEN}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeroPaintLine() {
  return (
    <p className="relative isolate mt-7 mb-1 w-fit max-w-full">
      <PaintSwipe />
      <span
        className="relative block text-balance px-3 py-1.5 font-display text-[15px] font-extrabold leading-snug tracking-tight min-[380px]:text-base sm:px-4 sm:py-2 sm:text-lg md:text-xl"
        style={{ color: '#111111' }}
      >
        Hoy recomiendas tú, mañana te recomiendan a ti.
      </span>
    </p>
  );
}

function HeroFreeBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-fit max-w-full pt-8 ${className}`}>
      <BadgeArrow className="absolute left-5 top-0 h-7 w-10" />
      <div className="w-fit max-w-full origin-center -rotate-[8deg] py-7">
        <p className="relative isolate w-fit max-w-full px-3 py-1.5 sm:px-3.5 sm:py-2">
          <BadgePatch />
          <span
            className="relative block text-center leading-[1.15] text-[#111111] text-[14px] min-[360px]:text-[15px] sm:text-[17px] md:text-lg"
            style={{ fontFamily: '"Permanent Marker", cursive', color: '#111111' }}
          >
            <span className="block whitespace-nowrap">Apúntate gratis.</span>
            <span className="block whitespace-nowrap">Si no te sale trabajo, no pagas nada.</span>
          </span>
        </p>
      </div>
    </div>
  );
}

export function LandingHero() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden pt-20">
      <ParallaxImage
        src={HERO}
        alt="Dos profesionales de oficio pasándose un encargo en la calle"
        position="78% center"
        className="absolute inset-0 h-[108%] w-full object-cover -top-[4%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050705] via-[#050705]/92 via-45% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050705]/80 via-transparent to-[#050705]/35" />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <p className="text-2xl md:text-3xl font-semibold tracking-tight drop-shadow-sm" style={{ color: GREEN }}>
          RUANA
        </p>
        <h1
          className="mt-6 max-w-xl font-normal tracking-tight"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: PAPER, textShadow: TITLE_SHADOW }}
        >
          <span className="block max-w-[14em] text-[28px] leading-[1.14] sm:text-[36px] md:text-[44px] lg:text-[48px] text-balance">
            ¿Estás sin trabajo, pero sabes hacer un oficio?
          </span>{' '}
          <span className="mt-4 block max-w-[36rem] text-[18px] font-normal leading-snug sm:text-[20px] md:text-[22px] lg:text-[24px] text-balance">
            En RUANA otros profesionales de tu zona te recomiendan para los trabajos que ellos no pueden hacer.
          </span>
        </h1>
        <HeroPaintLine />
        <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-white/90" style={{ textShadow: '0 1px 12px rgba(0,0,0,.55)' }}>
          Si entras, tienes a quién pasarle lo que no haces. Y cuando aparezca algo de lo tuyo, hay
          alguien que sabe a quién pasárselo.
        </p>
        <p className="mt-8 max-w-sm text-lg text-white" style={{ textShadow: '0 1px 12px rgba(0,0,0,.55)' }}>
          «Oye, ¿conoces a un buen electricista?»
        </p>
        <div className="mt-10 grid w-full max-w-full grid-cols-1 items-start gap-y-2 sm:w-fit sm:grid-cols-[auto_auto] sm:gap-x-5 sm:gap-y-2">
          <PrimaryCTA size="lg" className="relative z-10 shrink-0 sm:col-start-1 sm:row-start-1" />
          <HeroFreeBadge className="sm:col-span-2 sm:col-start-1 sm:row-start-2" />
          <CodeLink className="order-3 sm:order-none sm:col-start-2 sm:row-start-1 sm:self-center" />
        </div>
      </div>
    </section>
  );
}
