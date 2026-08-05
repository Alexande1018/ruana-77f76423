import { GREEN, BG, BG_ALT } from '@/lib/landingTheme';
import { ArrowRight, Check, Lock, Star } from 'lucide-react';

const cardBase = 'relative rounded-2xl border overflow-hidden';
const cardStyle = {
  backgroundColor: 'rgba(22,27,34,0.65)',
  borderColor: 'rgba(255,255,255,0.08)',
} as const;

export function PanelHeader({ label, right }: { label: string; right?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</p>
      {right && <p className="text-[11px] text-white/35 tabular-nums">{right}</p>}
    </div>
  );
}

/** Cómo funciona una plaza: un titular, un suplente, el resto espera. */
export function SeatPanel() {
  const rows = [
    { name: 'Electricidad · 28004', who: 'Marcos R.', state: 'Titular', score: 847 },
    { name: 'Electricidad · 28004', who: 'Ana P.', state: 'Suplente', score: 612 },
    { name: 'Electricidad · 28004', who: 'Tú', state: 'En espera', score: null },
  ];
  return (
    <div className={cardBase} style={cardStyle}>
      <div className="p-5 md:p-6">
        <PanelHeader label="Plaza · oficio + código postal" right="1 titular" />
        <div className="space-y-2">
          {rows.map((r, i) => (
            <div
              key={r.who}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 border"
              style={{
                backgroundColor: i === 0 ? 'rgba(0,230,118,0.07)' : 'rgba(13,17,23,0.5)',
                borderColor: i === 0 ? 'rgba(0,230,118,0.32)' : 'rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="h-8 w-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold"
                style={{
                  backgroundColor: i === 0 ? GREEN : 'rgba(255,255,255,0.07)',
                  color: i === 0 ? '#04140b' : 'rgba(255,255,255,0.6)',
                }}
              >
                {r.who.slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-white truncate">{r.who}</div>
                <div className="text-[11px] text-white/45 truncate">{r.name}</div>
              </div>
              {r.score !== null && (
                <span className="text-[11px] tabular-nums text-white/50 hidden sm:inline">
                  {r.score}
                </span>
              )}
              <span
                className="text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-md border shrink-0"
                style={{
                  color: i === 0 ? GREEN : 'rgba(255,255,255,0.55)',
                  borderColor: i === 0 ? 'rgba(0,230,118,0.35)' : 'rgba(255,255,255,0.1)',
                }}
              >
                {r.state}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] text-white/45 leading-relaxed">
          Si el titular deja de responder o incumple, el suplente ocupa la plaza. La zona nunca
          se satura del mismo oficio.
        </p>
      </div>
    </div>
  );
}

/** Cómo funciona el Score: movimientos reales, no likes. */
export function ScoreLedger() {
  const moves = [
    { t: 'Encargo cerrado · reforma baño', v: '+10', who: 'referido por Marcos R.' },
    { t: 'Cliente confirma resultado', v: '+5', who: 'valoración 5/5' },
    { t: 'Recomendación aceptada', v: '+4', who: 'a Lucía G. · 28012' },
    { t: 'No respondes en 48 h', v: '-6', who: 'encargo devuelto a la red', neg: true },
  ];
  return (
    <div className={cardBase} style={cardStyle}>
      <div className="p-5 md:p-6">
        <PanelHeader label="Score RUANA · movimientos" right="últimos 30 días" />
        <div className="flex items-end gap-3 mb-5">
          <div className="text-4xl md:text-5xl font-bold tabular-nums" style={{ color: GREEN }}>
            847
          </div>
          <div className="pb-1.5 text-xs text-white/50">
            <span style={{ color: GREEN }}>+13</span> esta semana
          </div>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden mb-5">
          <div className="h-full rounded-full" style={{ width: '84%', backgroundColor: GREEN }} />
        </div>
        <ul className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {moves.map((m) => (
            <li key={m.t} className="flex items-center gap-3 py-3 border-t first:border-t-0"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: m.neg ? 'rgba(255,255,255,0.25)' : GREEN }}
              />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] text-white/85 truncate">{m.t}</div>
                <div className="text-[11px] text-white/40 truncate">{m.who}</div>
              </div>
              <span
                className="text-[13px] font-semibold tabular-nums shrink-0"
                style={{ color: m.neg ? 'rgba(255,255,255,0.45)' : GREEN }}
              >
                {m.v}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Cómo se mueve un encargo dentro de la red. */
export function JobFlow() {
  const steps = [
    { t: 'Un cliente pide un electricista', s: 'Zona 28004 · lunes 10:12' },
    { t: 'Marcos no puede: lo pasa a la red', s: 'Queda registrado quién lo pasa' },
    { t: 'Te llega a ti, titular del oficio', s: 'Aceptas en 9 minutos' },
    { t: 'Cierras el trabajo', s: 'Marcos suma. Tú sumas. El cliente vuelve.' },
  ];
  return (
    <div className={cardBase} style={cardStyle}>
      <div className="p-5 md:p-6">
        <PanelHeader label="Recorrido de un encargo" right="trazado completo" />
        <ol className="relative pl-6">
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px"
            style={{ background: `linear-gradient(${GREEN}, rgba(0,230,118,0.08))` }}
          />
          {steps.map((st, i) => (
            <li key={st.t} className="relative pb-5 last:pb-0">
              <span
                className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2"
                style={{
                  borderColor: GREEN,
                  backgroundColor: i === 3 ? GREEN : BG,
                }}
              />
              <div className="text-sm text-white font-medium">{st.t}</div>
              <div className="text-[12px] text-white/45 mt-0.5">{st.s}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Cómo funciona una invitación. */
export function InvitePanel() {
  return (
    <div className={cardBase} style={cardStyle}>
      <div className="p-5 md:p-6">
        <PanelHeader label="Invitación" right="responde quien invita" />
        <div
          className="rounded-xl border p-4 mb-4"
          style={{ borderColor: 'rgba(0,230,118,0.28)', backgroundColor: 'rgba(0,230,118,0.06)' }}
        >
          <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
            <Lock className="h-3.5 w-3.5" style={{ color: GREEN }} /> Código de acceso
          </div>
          <div
            className="font-mono text-2xl md:text-3xl tracking-[0.28em] font-bold"
            style={{ color: GREEN }}
          >
            FUNDADOR
          </div>
        </div>
        <ul className="space-y-2.5">
          {[
            'Un aliado te da su código o pides acceso.',
            'Revisamos oficio, zona y si hay plaza libre.',
            'Quien te invita responde de ti ante la red.',
          ].map((t) => (
            <li key={t} className="flex gap-2.5 text-[13px] text-white/70">
              <Check className="h-4 w-4 mt-[2px] shrink-0" style={{ color: GREEN }} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Evolución de un aliado en el tiempo. */
export function AllyGrowth() {
  const stages = [
    { m: 'Mes 1', s: 'En espera', v: 18 },
    { m: 'Mes 2', s: 'Suplente', v: 40 },
    { m: 'Mes 4', s: 'Suplente activo', v: 66 },
    { m: 'Mes 7', s: 'Titular de zona', v: 92 },
  ];
  return (
    <div className={cardBase} style={cardStyle}>
      <div className="p-5 md:p-6">
        <PanelHeader label="Cómo evoluciona un aliado" right="caso tipo" />
        <div className="grid grid-cols-4 gap-2 items-end h-32 mb-3">
          {stages.map((s, i) => (
            <div key={s.m} className="flex flex-col justify-end h-full">
              <div
                className="rounded-t-md w-full transition-all"
                style={{
                  height: `${s.v}%`,
                  background:
                    i === stages.length - 1
                      ? `linear-gradient(180deg, ${GREEN}, rgba(0,230,118,0.35))`
                      : 'rgba(0,230,118,0.18)',
                  border: '1px solid rgba(0,230,118,0.25)',
                  borderBottom: 'none',
                }}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {stages.map((s, i) => (
            <div key={s.m}>
              <div className="text-[11px] text-white/40">{s.m}</div>
              <div
                className="text-[11px] font-medium leading-tight"
                style={{ color: i === stages.length - 1 ? GREEN : 'rgba(255,255,255,0.7)' }}
              >
                {s.s}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChapterMark({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="font-mono text-[12px] tabular-nums"
        style={{ color: GREEN }}
      >
        {n}
      </span>
      <span className="h-px w-8" style={{ backgroundColor: 'rgba(0,230,118,0.4)' }} />
      <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">{label}</span>
    </div>
  );
}

export { GREEN, BG, BG_ALT, ArrowRight, Star };
