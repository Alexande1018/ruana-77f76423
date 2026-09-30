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
        <h2
          className="text-[26px] md:text-[34px] tracking-tight leading-[1.15]"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
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
        className="bg-[#d8c7a4] text-[#1a1814] p-6 shadow-2xl"
      >
        <p className="text-[11px] uppercase tracking-[0.16em] opacity-70">Lo que saturaría la zona</p>
        <div className="mt-3 flex flex-wrap gap-2" aria-hidden>
          {CROWD.map((label, i) => (
            <span key={`${label}-${i}`} className="text-sm px-2 py-1 bg-black/10">
              {label}
            </span>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-[#8d7750] flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: '#1f7a45' }}>
              En un grupo RUANA
            </p>
            <p className="text-base md:text-lg font-semibold">Una plaza de fontanero</p>
          </div>
          <span className="text-sm font-medium shrink-0" style={{ color: '#1f7a45' }}>
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
      <p className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 mb-5 bg-[#efe6d4] text-[#1a1814]">
        Ejemplo ilustrativo · no es disponibilidad real
      </p>
      <h2
        className="text-2xl md:text-[28px] tracking-tight leading-snug"
        style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
      >
        Así puede verse un grupo RUANA
      </h2>
      <p className="mt-3 text-base text-white/60 leading-relaxed">
        Un grupo local. Distintos oficios. Una plaza por oficio. Esta vista es un ejemplo para entender
        el modelo, no un estado actual de Alicante ni de ninguna zona.
      </p>

      <div className="mt-8 bg-[#efe6d4] text-[#1a1814] p-5 shadow-xl rotate-[-0.6deg]">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#c3ad80]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] opacity-60">Grupo RUANA</p>
            <p className="text-sm font-semibold mt-0.5">Alicante</p>
          </div>
          <span className="text-[11px] opacity-60">Por oficio y código postal</span>
        </div>
        <ul>
          {EXAMPLE_SEATS.map((seat) => (
            <li key={seat.trade} className="flex items-center justify-between gap-4 py-3 border-t border-dashed border-[#c3ad80]">
              <span className="text-[15px] font-medium">{seat.trade}</span>
              <span className={`text-xs font-bold ${seat.open ? 'text-[#1f7a45]' : 'text-[#9a2f2f]'}`}>
                {seat.open ? 'Plaza disponible' : 'Plaza ocupada'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
