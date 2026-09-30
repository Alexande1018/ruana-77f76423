const BRICK = '/landing/foto-reputacion.jpg';

export function LandingScore() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,.95fr)] gap-8 lg:gap-12 items-center">
      <div className="max-w-lg">
        <h2
          className="text-2xl md:text-[34px] tracking-tight leading-[1.15]"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
          Tu sitio en el grupo se gana.
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
          El score va de 0 a 500 y se convierte en un estado en tu panel. Empiezas en 50.
        </p>
        <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
          RUANA recuerda cómo participas, cómo respondes y los trabajos que completas. Tu actividad
          construye tu reputación dentro de la red.
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
          <p className="mt-4 text-sm text-white/55">Ejemplo de panel. 75 es Estable.</p>
        </div>
      </div>
    </div>
  );
}
