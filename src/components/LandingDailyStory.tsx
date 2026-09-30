import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;
const BANO =
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80';

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
      <div className="relative overflow-visible">
        <img
          src={BANO}
          alt="Reforma de baño"
          className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
        />
        <div className="lp-paper lp-torn absolute left-3 sm:left-auto sm:right-[-12px] -bottom-8 w-[86%] sm:w-[70%] max-w-[320px] p-5 -rotate-2">
          <span className="lp-tape lp-tape-top" />
          <blockquote
            className="text-[28px] md:text-[32px] leading-[1.08] relative z-[1]"
            style={{ fontFamily: 'Caveat, cursive', color: '#1a1814' }}
          >
            «Oye, ¿conoces a un buen electricista?»
          </blockquote>
          <p className="mt-3 text-[15px] relative z-[1]" style={{ color: '#1a1814' }}>
            Tú recomiendas.
          </p>
          <p className="text-[15px] relative z-[1]" style={{ color: '#1a1814' }}>
            Mañana ese electricista piensa en ti.
          </p>
          <p className="mt-3 font-semibold relative z-[1] lp-mint">RUANA lo organiza.</p>
        </div>
      </div>
      <p className="mt-16 max-w-xl text-base md:text-lg text-white/70 leading-relaxed">
        Eso ya ocurre todos los días. Un cliente te dice. Tú recomiendas a alguien. Profesionales de
        distintos oficios que se conocen y hacen circular el trabajo en su zona.
      </p>
    </motion.div>
  );
}
