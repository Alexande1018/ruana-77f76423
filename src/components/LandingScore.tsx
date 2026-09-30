export function LandingScore() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,.85fr)] gap-8 items-center">
      <div className="max-w-lg">
        <h2
          className="text-2xl md:text-[34px] tracking-tight leading-[1.15]"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
          Tu reputación se gana.
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
          RUANA recuerda cómo participas, cómo respondes y los trabajos que completas.
        </p>
        <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
          Tu actividad construye tu reputación dentro de la red.
        </p>
      </div>

      <div>
        <img src="/landing/08-perfil-aliado.png" alt="" className="w-full mb-4 object-cover max-h-48" />
        <div className="lp-paper lp-torn p-6 rotate-1">
          <span className="lp-tape lp-tape-top" />
          <p className="text-[11px] uppercase tracking-[0.14em] opacity-60 relative z-[1]">Puntuación RUANA</p>
          <p className="mt-2 text-lg relative z-[1]" style={{ fontFamily: 'Caveat, cursive' }}>
            Tu oficio en el grupo
          </p>
          <p className="text-xs opacity-60 relative z-[1]">Zona · código postal</p>
          <p className="lp-stamp mt-4 relative z-[1]">ESTABLE</p>
          <p className="sr-only">Estable</p>
          <p className="mt-4 text-[13px] leading-relaxed opacity-80 relative z-[1]">
            En la aplicación, el Score RUANA aparece en tu panel y se traduce en un estado operativo.
            No mostramos una puntuación de ejemplo: la tuya se construye cuando entras. Panel del aliado.
            Representación conceptual.
          </p>
        </div>
      </div>
    </div>
  );
}
