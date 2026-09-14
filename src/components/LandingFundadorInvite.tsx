import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';

export function LandingFundadorInvite() {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id="fundador"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="scroll-mt-20 py-14 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div
          className="relative pl-5 md:pl-7"
          style={{ borderLeft: `3px solid ${GREEN}` }}
        >
          <p className="text-[11px] uppercase tracking-[0.18em] font-medium" style={{ color: GREEN }}>
            Aliado Fundador
          </p>
          <h2 className="mt-3 text-2xl md:text-[32px] font-semibold leading-[1.15] tracking-tight max-w-2xl">
            Estamos formando los primeros grupos RUANA.
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
            Los profesionales que entren durante esta etapa ayudarán a construir la primera red de
            su zona.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
            <PrimaryCTA />
            <CodeLink />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
