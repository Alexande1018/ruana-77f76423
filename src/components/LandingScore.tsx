const BRICK = '/landing/grok_1790806831384.jpg';

export function LandingScore() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,.95fr)] gap-8 lg:gap-12 items-center">
      <div className="max-w-lg">
        <h2
          className="text-2xl md:text-[34px] tracking-tight leading-[1.15]"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
          Aquí cuenta cómo trabajas.
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
          Responder, cumplir y aportar al grupo construye tu reputación.
        </p>
        <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
          No es otro grupo de WhatsApp. Quien recomienda, recomienda a alguien que se juega el sitio.
        </p>
      </div>

      <div className="relative overflow-hidden min-h-[280px]">
        <img src={BRICK} alt="Albañil colocando ladrillo" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative p-6 md:p-8 border border-white/10 bg-[#0D1117]/80">
          <p className="text-[56px] md:text-[72px] leading-none font-semibold" style={{ color: '#00E676' }}>
            75
          </p>
          <p className="mt-1 text-lg tracking-[0.18em]" style={{ color: '#5ecf9a' }}>
            ESTABLE
          </p>
          <p className="sr-only">Estable</p>
          <p className="mt-4 text-sm text-white/55">Así se ve en el panel. El número se entiende dentro.</p>
        </div>
      </div>
    </div>
  );
}
