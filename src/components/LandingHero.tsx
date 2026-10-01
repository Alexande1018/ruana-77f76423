import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';
import { GREEN, PAPER, TITLE_SHADOW } from '@/lib/landingTheme';
import { ParallaxImage } from '@/components/LandingMotion';

const HERO = '/landing/grok_1790806698745.jpg';

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
          className="mt-6 font-normal tracking-tight leading-[1.08] max-w-[18ch] text-[36px] sm:text-[50px] md:text-[64px]"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: PAPER, textShadow: TITLE_SHADOW }}
        >
          Ese trabajo no lo haces tú.
          <span className="block">Pero conoces a alguien que sí.</span>
        </h1>
        <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-white/90" style={{ textShadow: '0 1px 12px rgba(0,0,0,.55)' }}>
          Si entras, tienes a quién pasarle lo que no haces. Y cuando aparezca algo de lo tuyo, hay
          alguien que sabe a quién pasárselo.
        </p>
        <p className="mt-8 max-w-sm text-lg text-white" style={{ textShadow: '0 1px 12px rgba(0,0,0,.55)' }}>
          «Oye, ¿conoces a un buen electricista?»
        </p>
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <PrimaryCTA size="lg" />
          <CodeLink />
        </div>
      </div>
    </section>
  );
}
