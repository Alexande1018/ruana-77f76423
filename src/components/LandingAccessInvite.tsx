import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink, HaveCodeLink } from '@/components/LandingCTA';
import { PUBLIC_ACCESS_CODE } from '@/lib/inauguralPhase';
import { useRef } from 'react';

export function LandingAccessInvite() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0.97, 1, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0.92, 1, 1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [22, 0, 0, -10]);

  return (
    <motion.section
      ref={sectionRef}
      id="acceso"
      style={{ opacity: reduce ? 1 : opacity, scale: reduce ? 1 : scale, y: reduce ? 0 : y }}
      className="scroll-mt-20 py-14 md:py-20 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="lp-paper lp-torn p-6 md:p-9 max-w-2xl -rotate-1">
          <span className="lp-tape lp-tape-top" />
          <p className="text-[11px] uppercase tracking-[0.18em] font-medium relative z-[1]" style={{ color: '#1d5c3a' }}>
            Por invitación
          </p>
          <h2
            className="mt-3 text-2xl md:text-[32px] leading-[1.15] tracking-tight max-w-2xl relative z-[1]"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            Esta fase no está abierta a cualquiera.
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed max-w-xl opacity-80 relative z-[1]">
            Las plazas van por invitación y son pocas. Los primeros de cada zona entran con una
            invitación de arranque. Si has llegado hasta aquí, puedes ocupar la de tu oficio con este
            código.
          </p>
          <div className="mt-6 inline-flex flex-col items-start border-2 px-5 py-4 relative z-[1]" style={{ borderColor: GREEN }}>
            <span className="text-[11px] uppercase tracking-[0.18em] opacity-60">Código de acceso</span>
            <span className="mt-1 text-3xl font-extrabold tracking-[0.22em]" style={{ color: '#1d5c3a' }}>
              {PUBLIC_ACCESS_CODE}
            </span>
          </div>
          <p className="mt-4 text-sm opacity-70 relative z-[1]">Apuntarse no tiene cuota.</p>
          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4 relative z-[1]">
            <PrimaryCTA className="rounded-full" />
            <CodeLink />
            <HaveCodeLink />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
