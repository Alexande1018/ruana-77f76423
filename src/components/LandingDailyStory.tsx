import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';

const ease = [0.16, 1, 0.3, 1] as const;

export function LandingDailyStory() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease }}
      className="max-w-2xl"
    >
      <p className="text-sm font-medium tracking-wide text-white/45 mb-6">Un cliente te dice:</p>

      <blockquote
        className="text-[28px] sm:text-[34px] md:text-[40px] leading-[1.15] text-white"
        style={{ fontFamily: 'Caveat, cursive' }}
      >
        «Oye, ¿conoces a un buen electricista?»
      </blockquote>

      <ol className="mt-10 space-y-7">
        <li className="flex gap-4">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: GREEN }} />
          <p className="text-lg md:text-xl text-white/80 leading-snug">Tú recomiendas a alguien.</p>
        </li>
        <li className="flex gap-4">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white/25" />
          <p className="text-lg md:text-xl text-white/80 leading-snug">
            Mañana ese electricista necesita un fontanero y piensa en ti.
          </p>
        </li>
      </ol>

      <div
        className="mt-12 pt-8 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <p className="text-xl md:text-2xl font-semibold leading-snug tracking-tight">
          Eso ya ocurre todos los días.
        </p>
        <p className="mt-2 text-xl md:text-2xl font-semibold leading-snug tracking-tight" style={{ color: GREEN }}>
          RUANA lo organiza.
        </p>
        <p className="mt-5 text-base md:text-lg text-white/65 leading-relaxed">
          Profesionales de distintos oficios que se conocen, se ayudan y hacen circular
          oportunidades de trabajo dentro de su zona.
        </p>
      </div>
    </motion.div>
  );
}
