import { GREEN } from '@/lib/landingTheme';

export function LandingScore() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] gap-10 lg:gap-16 items-center">
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

      <div className="bg-[#efe6d4] text-[#1a1814] p-6 shadow-xl rotate-[1.4deg]">
        <p className="text-[11px] uppercase tracking-[0.14em] opacity-60">Panel del aliado</p>
        <p className="text-xs opacity-50 mt-1">Representación conceptual</p>
        <p className="mt-4 text-sm font-semibold">Tu oficio en el grupo</p>
        <p className="text-xs opacity-60">Zona · código postal</p>
        <p className="mt-4 text-[10px] uppercase tracking-[0.16em] opacity-60">Score RUANA</p>
        <p
          className="mt-2 inline-block border-[3px] px-3 py-1 text-sm font-bold tracking-[0.14em]"
          style={{ borderColor: GREEN, color: '#1d5c3a' }}
        >
          Estable
        </p>
        <p className="mt-4 text-[13px] leading-relaxed opacity-75">
          En la aplicación, el Score RUANA aparece en tu panel y se traduce en un estado operativo.
          No mostramos una puntuación de ejemplo: la tuya se construye cuando entras.
        </p>
      </div>
    </div>
  );
}
