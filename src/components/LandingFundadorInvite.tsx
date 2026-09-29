import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';
import { useRef } from 'react';

export function LandingFundadorInvite() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0.97, 1, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0.92, 1, 1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [22, 0, 0, -10]);

  return (
    <motion.section
      ref={sectionRef}
      id="fundador"
      style={{ opacity: reduce ? 1 : opacity, scale: reduce ? 1 : scale, y: reduce ? 0 : y }}
      className="scroll-mt-20 py-14 md:py-20 relative overflow-hidden border-y border-emerald-400/10 bg-gradient-to-br from-emerald-400/[0.07] via-transparent to-transparent"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div
          className="relative p-6 md:p-9 rounded-[26px] border border-white/[0.08] bg-black/20 backdrop-blur-sm"
          style={{ boxShadow: '0 28px 70px rgba(0,0,0,0.22)' }}
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
