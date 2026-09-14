import { GREEN } from '@/lib/landingTheme';

export function LandingScore() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] gap-10 lg:gap-16 items-center">
      <div className="max-w-lg">
        <h2 className="text-2xl md:text-[34px] font-semibold tracking-tight leading-[1.15]">
          Tu reputación se gana.
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
          RUANA recuerda cómo participas, cómo respondes y los trabajos que completas.
        </p>
        <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
          Tu actividad construye tu reputación dentro de la red.
        </p>
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          backgroundColor: '#12171e',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        }}
      >
        <div
          className="px-4 py-3 border-b flex items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Panel del aliado</p>
          <p className="text-[11px] text-white/35">Representación conceptual</p>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="h-11 w-11 rounded-full grid place-items-center text-sm font-bold shrink-0"
                style={{ backgroundColor: 'rgba(0,230,118,0.16)', color: GREEN }}
              >
                Tu
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Tu oficio en el grupo</p>
                <p className="text-xs text-white/45 mt-0.5">Zona · código postal</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Score RUANA</p>
              <p
                className="mt-1 inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  color: GREEN,
                  backgroundColor: 'rgba(0,230,118,0.12)',
                  border: '1px solid rgba(0,230,118,0.28)',
                }}
              >
                Estable
              </p>
            </div>
          </div>
          <p className="mt-5 text-[13px] text-white/50 leading-relaxed">
            En la aplicación, el Score RUANA aparece en tu panel y se traduce en un estado operativo.
            No mostramos una puntuación de ejemplo: la tuya se construye cuando entras.
          </p>
        </div>
      </div>
    </div>
  );
}
