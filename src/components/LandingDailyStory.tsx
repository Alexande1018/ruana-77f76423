import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';

const ease = [0.16, 1, 0.3, 1] as const;
const BANO =
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80';

export function LandingDailyStory() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease }}
      className="relative"
    >
      <div className="relative max-w-xl">
        <img src={BANO} alt="" className="lp-photo w-full h-72 md:h-[420px] object-cover" />
        <div className="lp-paper lp-torn absolute -right-2 md:-right-8 -bottom-6 w-[78%] max-w-[300px] p-5 -rotate-2">
          <span className="lp-tape lp-tape-top" />
          <p className="text-sm font-medium tracking-wide opacity-60 mb-2 relative z-[1]">Un cliente te dice:</p>
          <blockquote className="text-[26px] md:text-[30px] leading-[1.12] relative z-[1]" style={{ fontFamily: 'Caveat, cursive' }}>
            «Oye, ¿conoces a un buen electricista?»
          </blockquote>
          <p className="mt-3 text-sm relative z-[1]">Tú recomiendas a alguien.</p>
          <p className="text-sm relative z-[1]">Mañana ese electricista necesita un fontanero y piensa en ti.</p>
          <p className="mt-3 font-semibold relative z-[1]" style={{ color: GREEN }}>
            RUANA lo organiza.
          </p>
        </div>
      </div>
      <p className="mt-16 max-w-xl text-base md:text-lg text-white/65 leading-relaxed">
        Eso ya ocurre todos los días. Profesionales de distintos oficios que se conocen, se ayudan y
        hacen circular oportunidades de trabajo dentro de su zona.
      </p>
    </motion.div>
  );
}
