import { motion, type Variants, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { LandingNavbar, LandingFooter } from '@/components/LandingChrome';
import { LandingAccessInvite } from '@/components/LandingAccessInvite';
import { LandingAllyExamples } from '@/components/LandingAllyExamples';
import { LandingDailyStory } from '@/components/LandingDailyStory';
import { LimitedSeatsIdea, GroupExample } from '@/components/LandingGroup';
import { LandingScore } from '@/components/LandingScore';
import { LandingCompare } from '@/components/LandingCompare';
import { LandingSteps } from '@/components/LandingSteps';
import { NodeField } from '@/components/NodeField';
import { BG, BG_ALT, GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink, HaveCodeLink } from '@/components/LandingCTA';
import { INAUGURAL_PHASE_ACTIVE } from '@/lib/inauguralPhase';

const ease = [0.16, 1, 0.3, 1] as const;

function Section({
  children,
  className = '',
  id,
  alt = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  alt?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const sectionScale = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0.97, 1, 1, 0.97]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0.92, 1, 1, 0.94]);
  const sectionY = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [22, 0, 0, -10]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`scroll-mt-20 relative overflow-hidden border-t border-white/[0.04] ${className}`}
      style={alt ? { backgroundColor: BG_ALT } : undefined}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
      <motion.div
        style={{
          opacity: reduce ? 1 : sectionOpacity,
          scale: reduce ? 1 : sectionScale,
          y: reduce ? 0 : sectionY,
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

export default function Landing() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '7%']);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.975]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.72]);
  const { scrollYProgress: finalCtaProgress } = useScroll({
    target: finalCtaRef,
    offset: ['start end', 'end start'],
  });
  const finalCtaScale = useTransform(finalCtaProgress, [0, 0.18, 0.78, 1], [0.97, 1, 1, 0.97]);
  const finalCtaOpacity = useTransform(finalCtaProgress, [0, 0.18, 0.78, 1], [0.92, 1, 1, 0.94]);
  const finalCtaY = useTransform(finalCtaProgress, [0, 0.18, 0.78, 1], [22, 0, 0, -10]);

  const fadeUp: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.55, ease },
    },
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.04 } },
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG }}>
      <LandingNavbar />

      <section ref={heroRef} className="relative isolate overflow-hidden min-h-0 sm:min-h-[720px] md:min-h-[760px] pt-24 md:pt-32 pb-10 md:pb-20">
        {/* Clean photo-only artwork as a full-bleed background. Responsive positioning
            keeps the tradespeople visible without duplicating UI or text. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-contain bg-top bg-no-repeat sm:bg-cover sm:bg-center md:bg-[center_45%] will-change-transform"
          style={{
            backgroundImage: 'url("/landing/file_00000000e4f88243b41b502ec6975bec.png")',
            y: reduce ? 0 : heroY,
            scale: reduce ? 1 : heroScale,
            opacity: reduce ? 1 : heroOpacity,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080b0f]/95 via-[#080b0f]/72 to-[#080b0f]/25"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#080b0f]/85 via-transparent to-[#080b0f]/30" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl rounded-[28px] md:rounded-none md:bg-transparent bg-black/10 md:backdrop-blur-0 backdrop-blur-[1px]"
          >
            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[1.08] tracking-tight text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px]"
            >
              Pasa el encargo que no haces.
              <span className="block mt-2 md:mt-3" style={{ color: GREEN }}>
                Recibe el que sí.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base md:text-xl text-white/72 leading-relaxed max-w-2xl"
            >
              ¿Te piden algo que no haces? Pásaselo a un colega de tu zona. Y cuando a él le pidan lo
              tuyo, te llama a ti.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-7 flex flex-col items-stretch sm:items-start gap-3 max-w-xl">
              <PrimaryCTA className="w-full sm:w-auto" />
              <p className="text-[13px] text-white/60 leading-snug">
                Apuntarse no tiene cuota.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <CodeLink />
                <HaveCodeLink />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {INAUGURAL_PHASE_ACTIVE && <LandingAccessInvite />}

      <Section className="py-16 md:py-24 bg-gradient-to-b from-[#0b1014] to-[#080b0f]" id="como-funciona">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingDailyStory />
        </div>
      </Section>

      <Section className="py-16 md:py-24" alt id="oportunidades">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-8 md:mb-10">
            <h2 className="text-2xl md:text-[34px] font-semibold tracking-tight leading-[1.15]">
              Aquí el trabajo no se compra. Se recomienda.
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed">
              Cuando un profesional de tu grupo necesita a alguien de tu oficio, puede pasarte la
              oportunidad directamente.
            </p>
            <p className="mt-3 text-base md:text-lg text-white/65 leading-relaxed">
              No son anuncios ni una lista de leads vendidos a varios profesionales.
            </p>
          </div>
          <LandingAllyExamples />
        </div>
      </Section>

      <Section className="py-16 md:py-24" id="plazas">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LimitedSeatsIdea />
        </div>
      </Section>

      <Section className="py-16 md:py-24" alt id="grupo">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <GroupExample />
        </div>
      </Section>

      <Section className="py-16 md:py-24" id="reputacion">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingScore />
        </div>
      </Section>

      <Section className="py-16 md:py-24" id="diferencia">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingCompare />
        </div>
      </Section>

      <Section className="py-16 md:py-24" alt id="empezar">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingSteps />
        </div>
      </Section>

      <motion.section
        ref={finalCtaRef}
        id="entrar"
        className="relative overflow-hidden py-24 md:py-36 scroll-mt-20 border-t border-emerald-400/10"
        style={{ backgroundColor: BG, opacity: reduce ? 1 : finalCtaOpacity, scale: reduce ? 1 : finalCtaScale, y: reduce ? 0 : finalCtaY }}
      >
        <NodeField density={0.00008} opacity={0.45} intensity={0.55} />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8">
          <h2 className="text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.12] tracking-tight">
            Puede haber cientos de profesionales de tu oficio en tu ciudad.
            <span className="block mt-3" style={{ color: GREEN }}>
              En cada grupo RUANA hay una plaza por oficio.
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed">
            Es la regla del grupo: un oficio, una plaza. Cuando alguien necesita lo que tú haces, tiene
            un colega de su zona a quien pasar el encargo.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <PrimaryCTA size="lg" />
            <CodeLink />
          </div>
        </div>
      </motion.section>

      <LandingFooter />
    </div>
  );
}
