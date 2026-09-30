import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';

const ease = [0.16, 1, 0.3, 1] as const;
const BANO =
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80';

export function LandingDailyStory() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease }}
      className="grid lg:grid-cols-2 gap-8 items-center"
    >
      <div className="relative">
        <img src={BANO} alt="" className="w-full h-72 md:h-96 object-cover" />
        <div className="absolute left-3 bottom-4 max-w-[280px] bg-[#efe6d4] text-[#1a1814] p-4 -rotate-1 shadow-xl">
          <p className="text-sm font-medium tracking-wide text-[#1a1814]/60 mb-2">Un cliente te dice:</p>
          <blockquote className="text-[26px] leading-[1.15]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
            «Oye, ¿conoces a un buen electricista?»
          </blockquote>
        </div>
      </div>

      <div>
        <ol className="space-y-5">
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
        <div className="mt-10 pt-6 border-t border-white/10">
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
      </div>
    </motion.div>
  );
}
