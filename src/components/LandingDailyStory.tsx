import { motion, useReducedMotion } from 'framer-motion';

const BANO =
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80';

export function LandingDailyStory() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.2 : 0.55 }}
      className="relative"
    >
      <div className="relative">
        <img src={BANO} alt="" className="block w-full h-64 sm:h-80 md:h-[400px] object-cover" />
        <div className="lp-paper lp-torn absolute left-2 right-8 sm:left-auto sm:right-[-8px] -bottom-10 sm:w-[300px] p-6 -rotate-2">
          <span className="lp-tape lp-tape-top" />
          <p
            className="relative z-[1] text-[30px] leading-[1.05]"
            style={{ fontFamily: 'Caveat, cursive', color: '#161410' }}
          >
            «Oye, ¿conoces a un buen electricista?»
          </p>
          <p className="relative z-[1] mt-3 text-[16px]" style={{ color: '#161410' }}>
            Tú recomiendas.
          </p>
          <p className="relative z-[1] text-[16px]" style={{ color: '#161410' }}>
            Mañana ese electricista piensa en ti.
          </p>
          <p className="relative z-[1] mt-3 text-[16px] font-semibold lp-mint">RUANA lo organiza.</p>
        </div>
      </div>
    </motion.div>
  );
}
