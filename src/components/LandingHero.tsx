import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';

const HERO = '/landing/grok_1790779246688.jpg';

export function LandingHero() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden pt-20">
      <img
        src={HERO}
        alt="Profesional junto a su furgoneta en una calle del barrio"
        className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#090c0a] via-[#090c0a]/90 to-[#090c0a]/25" />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <p className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: '#A2FF00' }}>
          RUANA
        </p>
        <h1
          className="mt-6 text-white font-normal tracking-tight leading-[1.05] max-w-[16ch] text-[34px] sm:text-[48px] md:text-[62px]"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
          Aquí el trabajo no se compra. Se recomienda.
        </h1>
        <p className="mt-6 max-w-md text-base md:text-lg text-white/75 leading-relaxed">
          RUANA es una red de aliados. Autónomos y negocios de oficio de la misma zona. Os agrupáis
          por código postal, os veis en el directorio del grupo y os pasáis el trabajo con nombre.
        </p>
        <p className="mt-8 max-w-sm text-white/80">
          «Oye, ¿conoces a un buen electricista?»
        </p>
        <p className="mt-2 max-w-sm text-white/60 text-[15px] leading-relaxed">
          Tú recomiendas. Mañana ese electricista piensa en ti. RUANA lo organiza.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <PrimaryCTA size="lg" />
          <CodeLink />
        </div>
      </div>
    </section>
  );
}
