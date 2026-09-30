import { motion, useReducedMotion } from 'framer-motion';
import { LandingPaperNote } from '@/components/LandingPaperNote';

const BANO = '/landing/grok_1790780438773.jpg';

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
        <img src={BANO} alt="" className="block w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover object-[30%_40%]" />
        <LandingPaperNote className="absolute -bottom-8 left-2 sm:left-auto sm:right-[-18px] w-[88%] sm:w-[310px] -rotate-2">
          <p className="text-[28px] sm:text-[32px] leading-[1.06]" style={{ fontFamily: 'Caveat, cursive' }}>
            «Oye, ¿conoces a un buen electricista?»
          </p>
          <p className="mt-3 text-[16px] leading-snug">Tú recomiendas.</p>
          <p className="text-[16px] leading-snug">Mañana ese electricista piensa en ti.</p>
          <p className="mt-3 text-[16px] font-semibold" style={{ color: '#1f7a4a' }}>
            RUANA lo organiza.
          </p>
        </LandingPaperNote>
      </div>
    </motion.div>
  );
}
