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
      <p className="text-[13px] font-medium text-white/60">{label}</p>
      {right && <p className="text-[12px] text-white/35 tabular-nums">{right}</p>}
    </div>
  );
}


/** Cómo funciona una plaza: un titular, un suplente, el resto espera. */
export function SeatPanel() {
  const rows = [
    { name: 'Electricidad · zona centro', who: 'Aliado 1', state: 'Titular', score: 847 },
    { name: 'Electricidad · zona centro', who: 'Aliado 2', state: 'Suplente', score: 612 },
    { name: 'Electricidad · zona centro', who: 'Tú', state: 'En espera', score: null },
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
    { t: 'Encargo cerrado · reforma baño', v: '+10', who: 'referido por un aliado' },
    { t: 'Cliente confirma resultado', v: '+5', who: 'valoración 5/5' },
    { t: 'Recomendación aceptada', v: '+4', who: 'a otro aliado · zona sur' },
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
    { t: 'Un cliente pide un electricista', s: 'Zona centro · lunes 10:12' },
    { t: 'El titular no puede: lo pasa a la red', s: 'Queda registrado quién lo pasa' },
    { t: 'Te llega a ti, titular del oficio', s: 'Aceptas en 9 minutos' },
    { t: 'Cierras el trabajo', s: 'El aliado suma. Tú sumas. El cliente vuelve.' },
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

/** Qué sube el Score y qué desbloquea al subir. */
export function ScoreLevers() {
  const levers = [
    { t: 'Cierras más encargos', v: '+10 cada uno' },
    { t: 'Contestas en menos de 2 h', v: '+3' },
    { t: 'Recomiendas y sale bien', v: '+4' },
    { t: 'El cliente confirma el trabajo', v: '+5' },
    { t: 'Dejas un encargo sin respuesta', v: '−6', neg: true },
  ];
  const unlocks = [
    { s: '0 – 300', u: 'Estás en espera: ves la red y recibes encargos sueltos.' },
    { s: '300 – 600', u: 'Suplente: entras cuando el titular no puede.' },
    { s: '600 – 800', u: 'Suplente activo: te llegan encargos directos de tu zona.' },
    { s: '+800', u: 'Titular: primera opción del oficio en tu código postal.' },
  ];
  return (
    <div className={cardBase} style={cardStyle}>
      <div className="p-5 md:p-6">
        <PanelHeader label="Qué mueve tu Score" right="y qué desbloquea" />
        <ul className="space-y-2">
          {levers.map((l) => (
            <li
              key={l.t}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 border"
              style={{
                backgroundColor: 'rgba(13,17,23,0.5)',
                borderColor: 'rgba(255,255,255,0.06)',
              }}
            >
              <span className="text-[13px] text-white/80 flex-1 min-w-0">{l.t}</span>
              <span
                className="text-[13px] font-semibold tabular-nums shrink-0"
                style={{ color: l.neg ? 'rgba(255,255,255,0.45)' : GREEN }}
              >
                {l.v}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <ol className="relative pl-5 space-y-4">
            <span
              aria-hidden
              className="absolute left-[3px] top-1.5 bottom-1.5 w-px"
              style={{ background: `linear-gradient(rgba(0,230,118,0.12), ${GREEN})` }}
            />
            {unlocks.map((u, i) => (
              <li key={u.s} className="relative">
                <span
                  className="absolute -left-5 top-1.5 h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: i === unlocks.length - 1 ? GREEN : 'rgba(0,230,118,0.3)',
                  }}
                />
                <div
                  className="text-[12px] font-semibold tabular-nums"
                  style={{ color: i === unlocks.length - 1 ? GREEN : 'rgba(255,255,255,0.6)' }}
                >
                  {u.s}
                </div>
                <div className="text-[12px] text-white/55 leading-relaxed">{u.u}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}


/** Red de aliados dibujada: nodos con nombre y oficio, unidos por encargos. */
export function NetworkGraph({ className = '' }: { className?: string }) {
  const nodes = [
    { id: 'a', x: 18, y: 26, label: 'Marcos', trade: 'Electricidad', main: true },
    { id: 'b', x: 50, y: 12, label: 'Lucía', trade: 'Reformas' },
    { id: 'c', x: 82, y: 28, label: 'Diego', trade: 'Fontanería' },
    { id: 'd', x: 30, y: 62, label: 'Ana', trade: 'Pintura' },
    { id: 'e', x: 64, y: 72, label: 'Sara', trade: 'Carpintería' },
    { id: 'f', x: 88, y: 58, label: 'Iván', trade: 'Climatización' },
  ];
  const edges: [string, string][] = [
    ['a', 'b'], ['b', 'c'], ['a', 'd'], ['d', 'e'], ['e', 'c'], ['c', 'f'], ['b', 'e'], ['a', 'e'],
  ];
  const get = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div
      className={`relative rounded-2xl border overflow-hidden ${className}`}
      style={{ ...cardStyle, aspectRatio: '4 / 3' }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {edges.map(([s, t], i) => {
          const A = get(s);
          const B = get(t);
          return (
            <g key={i}>
              <line
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke={GREEN}
                strokeOpacity={0.32}
                strokeWidth={0.35}
                vectorEffect="non-scaling-stroke"
              />
              <circle r="0.9" fill={GREEN}>
                <animateMotion
                  dur={`${3 + i * 0.6}s`}
                  repeatCount="indefinite"
                  path={`M${A.x},${A.y} L${B.x},${B.y}`}
                />
              </circle>
            </g>
          );
        })}
      </svg>
      {nodes.map((n) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span
            className="h-2.5 w-2.5 rounded-full shrink-0"
            style={{
              backgroundColor: GREEN,
              boxShadow: n.main ? `0 0 0 5px rgba(0,230,118,0.14)` : `0 0 0 3px rgba(0,230,118,0.08)`,
            }}
          />
          <span className="hidden sm:block leading-tight">
            <span className="block text-[12px] font-medium text-white/90">{n.label}</span>
            <span className="block text-[10px] text-white/40">{n.trade}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export { GREEN, BG, BG_ALT, ArrowRight, Star };

