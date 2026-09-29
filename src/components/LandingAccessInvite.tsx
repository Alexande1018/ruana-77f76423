import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { GREEN, GREEN_DARK } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';
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
      className="scroll-mt-20 py-14 md:py-20 relative overflow-hidden border-y border-emerald-400/10 bg-gradient-to-br from-emerald-400/[0.07] via-transparent to-transparent"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div
          className="relative p-6 md:p-9 rounded-[26px] border border-white/[0.08] bg-black/20 backdrop-blur-sm"
          style={{ boxShadow: '0 28px 70px rgba(0,0,0,0.22)' }}
        >
          <p className="text-[11px] uppercase tracking-[0.18em] font-medium" style={{ color: GREEN }}>
            Por invitación
          </p>
          <h2 className="mt-3 text-2xl md:text-[32px] font-semibold leading-[1.15] tracking-tight max-w-2xl">
            Esta fase no está abierta a cualquiera.
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
            Las plazas van por invitación y son pocas. Si has llegado hasta aquí, puedes ocupar la de
            tu oficio en tu zona con este código.
          </p>
          <div
            className="mt-6 inline-flex flex-col items-start rounded-xl px-5 py-4 border-2"
            style={{ backgroundColor: GREEN_DARK, borderColor: GREEN }}
          >
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">Código de acceso</span>
            <span className="mt-1 text-3xl font-extrabold tracking-[0.22em]" style={{ color: GREEN }}>
              {PUBLIC_ACCESS_CODE}
            </span>
          </div>
          <p className="mt-4 text-sm text-white/60">Apuntarse no tiene cuota.</p>
          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
            <PrimaryCTA />
            <CodeLink />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
