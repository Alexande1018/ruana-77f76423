import { GREEN } from '@/lib/landingTheme';

type Cell = { cp: string; d: number; you?: boolean };

// density 0..1
const CELLS: Cell[] = [
  { cp: '28001', d: 0.45 }, { cp: '28002', d: 0.22 }, { cp: '28003', d: 0.68 }, { cp: '28004', d: 0.95, you: true },
  { cp: '28005', d: 0.31 }, { cp: '28006', d: 0.57 }, { cp: '28010', d: 0.12 }, { cp: '28012', d: 0.74 },
  { cp: '28014', d: 0.4 }, { cp: '28015', d: 0.86 }, { cp: '28018', d: 0.18 }, { cp: '28020', d: 0.52 },
  { cp: '28025', d: 0.63 }, { cp: '28028', d: 0.28 }, { cp: '28035', d: 0.08 }, { cp: '28045', d: 0.71 },
];

export function DensityMap({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="relative rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: 'rgba(22,27,34,0.7)',
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow: '0 24px 70px -40px rgba(0,230,118,0.4)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative p-4 md:p-5">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            Densidad de aliados · Madrid centro
          </p>
          <p className="text-[11px] text-white/40 tabular-nums">Actualizado hoy</p>
        </div>

        <div className="grid grid-cols-4 gap-1.5 md:gap-2">
          {CELLS.map((c) => (
            <div
              key={c.cp}
              className="group relative rounded-[6px] aspect-[5/3] flex flex-col items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-[1.04]"
              style={{
                backgroundColor: `rgba(0,230,118,${0.05 + c.d * 0.62})`,
                border: c.you
                  ? `1px solid ${GREEN}`
                  : `1px solid rgba(0,230,118,${0.08 + c.d * 0.25})`,
                boxShadow: c.you ? `0 0 0 3px rgba(0,230,118,0.15)` : 'none',
              }}
            >
              <span
                className="text-[10px] md:text-[11px] font-semibold tabular-nums"
                style={{ color: c.d > 0.8 ? '#04140b' : 'rgba(255,255,255,0.92)' }}
              >
                {c.cp}
              </span>
              {!compact && (
                <span
                  className="text-[9px] md:text-[10px] tabular-nums"
                  style={{ color: c.d > 0.8 ? 'rgba(4,20,11,0.75)' : 'rgba(255,255,255,0.55)' }}
                >
                  {Math.round(4 + c.d * 22)} aliados
                </span>
              )}
              {c.you && (
                <span
                  aria-hidden
                  className="absolute inset-0 animate-pulse"
                  style={{ boxShadow: `inset 0 0 22px rgba(0,230,118,0.55)` }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">Baja</span>
            <div
              className="h-1.5 w-24 md:w-32 rounded-full"
              style={{ background: `linear-gradient(90deg, rgba(0,230,118,0.08), ${GREEN})` }}
            />
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">Alta</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/55">
            <span
              className="inline-block h-2.5 w-2.5 rounded-[3px]"
              style={{ backgroundColor: GREEN, boxShadow: '0 0 0 3px rgba(0,230,118,0.18)' }}
            />
            Tu zona: 28004 · plaza libre en tu oficio
          </div>
        </div>
      </div>
    </div>
  );
}
