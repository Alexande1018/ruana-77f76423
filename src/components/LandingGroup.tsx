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
    <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-14 items-start">
      <div className="max-w-xl">
        <h2
          className="text-[28px] md:text-[40px] tracking-tight leading-[1.12]"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
          No queremos 200 del mismo oficio a por el{' '}
          <em style={{ color: GREEN }}>mismo cliente</em>.
        </h2>
        <p className="mt-4 text-base md:text-lg text-white/70">Una plaza por oficio en cada grupo.</p>
        <p className="mt-1 text-base md:text-lg" style={{ color: GREEN }}>
          Por código postal.
        </p>
        <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
          RUANA organiza profesionales en grupos locales por código postal y limita las plazas por
          oficio principal dentro de cada grupo.
        </p>
        <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
          Si ocupas la plaza de tu oficio, queremos que cuando alguien del grupo necesite lo que tú
          haces piense en ti.
        </p>
        <p className="sr-only">No queremos 200 profesionales del mismo oficio compitiendo por el mismo cliente.</p>
      </div>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduce ? 0.2 : 0.55, ease }}
        className="lp-paper p-5 -rotate-1"
      >
        <p className="text-[11px] uppercase tracking-[0.16em] opacity-70 relative z-[1]">Lo que saturaría la zona</p>
        <div className="mt-3 flex flex-wrap gap-2 relative z-[1]" aria-hidden>
          {CROWD.map((label, i) => (
            <span key={`${label}-${i}`} className="text-sm px-2 py-1 bg-black/10">
              {label}
            </span>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-[#8d7750] flex items-center justify-between gap-4 relative z-[1]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] lp-ok">En un grupo RUANA</p>
            <p className="text-base md:text-lg font-semibold">Una plaza de fontanero</p>
          </div>
          <span className="text-sm font-medium shrink-0 lp-ok">Una por oficio</span>
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
    >
      <p className="inline-flex items-center text-xs font-medium px-2.5 py-1 mb-5 lp-paper">
        Ejemplo ilustrativo · no es disponibilidad real
      </p>
      <h2
        className="text-2xl md:text-[28px] tracking-tight leading-snug"
        style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
      >
        Así puede verse un grupo RUANA
      </h2>
      <p className="mt-3 text-base text-white/60 leading-relaxed max-w-xl">
        Un grupo local. Distintos oficios. Una plaza por oficio. Esta vista es un ejemplo para entender
        el modelo, no un estado actual de Alicante ni de ninguna zona.
      </p>

      <div className="mt-8 grid md:grid-cols-[1.1fr_.9fr] gap-6 items-start">
        <div className="lp-cork p-6">
          <span className="lp-pin" style={{ background: '#c0392b', top: 10, left: 14 }} />
          <span className="lp-pin" style={{ background: '#2980b9', top: 10, right: 16 }} />
          <span className="lp-pin" style={{ background: '#27ae60', bottom: 12, left: 16 }} />
          <span className="lp-pin" style={{ background: '#bdc3c7', bottom: 14, right: 18 }} />
          <p className="text-xl mb-3 relative z-[1]" style={{ fontFamily: 'Caveat, cursive' }}>
            Grupo 03001 · Alicante Centro
          </p>
          <ul className="relative z-[1]">
            {EXAMPLE_SEATS.map((seat) => (
              <li
                key={seat.trade}
                className="flex items-center justify-between gap-4 py-2.5 border-b border-dashed border-[#8d7750]"
              >
                <span className="text-[16px]" style={{ fontFamily: 'Caveat, cursive' }}>
                  {seat.trade}
                </span>
                <span className={`text-sm font-semibold ${seat.open ? 'lp-ok' : 'lp-no'}`}>
                  {seat.open ? 'Plaza disponible' : 'Plaza ocupada'}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <img
          src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=80"
          alt=""
          className="lp-photo w-full h-56 md:h-full object-cover hidden md:block"
        />
      </div>
    </motion.div>
  );
}
