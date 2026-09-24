import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';

const ease = [0.16, 1, 0.3, 1] as const;

const CROWD = [
  'Fontanero',
  'Fontanero',
  'Fontanero',
  'Fontanero',
  'Fontanero',
  'Fontanero',
  'Fontanero',
  'Fontanero',
];

const EXAMPLE_SEATS = [
  { trade: 'Electricista', open: true },
  { trade: 'Fontanero', open: true },
  { trade: 'Pintor', open: false },
  { trade: 'Asesor', open: true },
];

export function LimitedSeatsIdea() {
  const reduce = useReducedMotion();

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-16 items-start">
      <div className="max-w-xl">
        <h2 className="text-[26px] md:text-[34px] font-semibold tracking-tight leading-[1.15]">
          No queremos 200 profesionales del mismo oficio compitiendo por el mismo cliente.
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
          RUANA organiza profesionales en grupos locales por código postal y limita las plazas por
          oficio principal dentro de cada grupo.
        </p>
        <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
          Si ocupas la plaza de tu oficio, queremos que cuando alguien del grupo necesite lo que tú
          haces piense en ti.
        </p>
      </div>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduce ? 0.2 : 0.55, ease }}
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(13,17,23,0.55)' }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">Lo que saturaría la zona</p>
        </div>
        <div className="px-5 py-4 flex flex-wrap gap-2" aria-hidden>
          {CROWD.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="text-sm px-2.5 py-1 rounded-md"
              style={{
                color: `rgba(255,255,255,${0.18 + i * 0.04})`,
                backgroundColor: 'rgba(255,255,255,0.04)',
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <div
          className="px-5 py-4 border-t flex items-center justify-between gap-4"
          style={{
            borderColor: 'rgba(0,230,118,0.22)',
            backgroundColor: 'rgba(0,230,118,0.06)',
          }}
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] mb-1" style={{ color: GREEN }}>
              En un grupo RUANA
            </p>
            <p className="text-base md:text-lg font-semibold text-white">Una plaza de fontanero</p>
          </div>
          <span className="text-sm font-medium shrink-0" style={{ color: GREEN }}>
            Una por oficio
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function GroupExample() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease }}
      className="max-w-lg"
    >
      <p
        className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-md border mb-5"
        style={{
          borderColor: 'rgba(255,255,255,0.14)',
          color: 'rgba(255,255,255,0.7)',
          backgroundColor: 'rgba(255,255,255,0.04)',
        }}
      >
        Ejemplo ilustrativo · no es disponibilidad real
      </p>
      <h2 className="text-2xl md:text-[28px] font-semibold tracking-tight leading-snug">
        Así puede verse un grupo RUANA
      </h2>
      <p className="mt-3 text-base text-white/60 leading-relaxed">
        Un grupo local. Distintos oficios. Una plaza por oficio. Esta vista es un ejemplo para entender
        el modelo, no un estado actual de Alicante ni de ninguna zona.
      </p>

      <div
        className="mt-8 rounded-xl border overflow-hidden"
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          backgroundColor: '#12171e',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        }}
      >
        <div
          className="flex items-center justify-between gap-3 px-4 py-3.5 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(0,230,118,0.04)' }}
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Grupo RUANA</p>
            <p className="text-sm font-semibold text-white mt-0.5">Alicante</p>
          </div>
          <span className="text-[11px] text-white/40">Por oficio y código postal</span>
        </div>
        <ul>
          {EXAMPLE_SEATS.map((seat) => (
            <li
              key={seat.trade}
              className="flex items-center justify-between gap-4 px-4 py-3.5 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <span className={`text-[15px] font-medium ${seat.open ? 'text-white' : 'text-white/45'}`}>
                {seat.trade}
              </span>
              <span
                className="text-xs font-medium px-2 py-1 rounded-md"
                style={
                  seat.open
                    ? { color: GREEN, backgroundColor: 'rgba(0,230,118,0.1)' }
                    : { color: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.05)' }
                }
              >
                {seat.open ? 'Plaza disponible' : 'Plaza ocupada'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
