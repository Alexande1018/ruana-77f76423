export function LandingCompare() {
  return (
    <div className="max-w-5xl">
      <h2
        className="text-2xl md:text-[36px] tracking-tight mb-3"
        style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
      >
        No es otro sitio donde comprar clientes.
      </h2>
      <p className="text-base md:text-lg text-white/60 leading-relaxed mb-12 max-w-xl">
        RUANA no sustituye tu WhatsApp ni te vende una lista. Organiza a profesionales de una zona
        para que las recomendaciones dejen de perderse.
      </p>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <p className="text-sm text-white/40 mb-3">Fuera.</p>
          <p className="text-lg md:text-xl leading-relaxed text-white/75">
            WhatsApp: muchos contactos. Poca estructura.
          </p>
          <p className="mt-3 text-lg md:text-xl leading-relaxed text-white/75">
            Directorios: muchos profesionales. Poca relación entre ellos.
          </p>
          <p className="mt-3 text-lg md:text-xl leading-relaxed text-white/75">
            Plataformas de leads: varios profesionales pagando por competir por el mismo cliente.
          </p>
        </div>
        <div className="md:border-l md:pl-12" style={{ borderColor: '#A2FF00' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: '#A2FF00' }}>
            RUANA
          </p>
          <p className="text-lg md:text-xl leading-snug">
            Profesionales locales que se conocen, construyen reputación y se recomiendan
            oportunidades.
          </p>
          <p className="mt-4 text-sm text-white/60">Apuntarse no tiene cuota.</p>
        </div>
      </div>
    </div>
  );
}
