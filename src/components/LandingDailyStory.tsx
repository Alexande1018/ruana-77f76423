const ELECTRIC = '/landing/grok_1790779224413.jpg';

export function LandingDailyStory() {
  return (
    <div className="relative overflow-hidden">
      <img
        src={ELECTRIC}
        alt=""
        className="block w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090c0a] via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
        <p
          className="text-[26px] sm:text-[32px] leading-[1.08] text-white"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
          «Oye, ¿conoces a un buen electricista?»
        </p>
        <p className="mt-3 text-[16px] text-white/75 leading-snug">Tú recomiendas.</p>
        <p className="text-[16px] text-white/75 leading-snug">Mañana ese electricista piensa en ti.</p>
        <p className="mt-3 text-[16px] font-semibold" style={{ color: '#A2FF00' }}>
          RUANA lo organiza.
        </p>
      </div>
    </div>
  );
}
