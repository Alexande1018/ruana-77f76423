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
import { LandingPaperDefs } from '@/components/LandingPaperDefs';
import { NodeField } from '@/components/NodeField';
import { BG, GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink, HaveCodeLink } from '@/components/LandingCTA';
import { INAUGURAL_PHASE_ACTIVE, PUBLIC_ACCESS_CODE } from '@/lib/inauguralPhase';

const ease = [0.16, 1, 0.3, 1] as const;

const HERO =
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1800&q=80';

export default function Landing() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '6%']);

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
    visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG }}>
      <LandingPaperDefs />
      <LandingNavbar />

      <section ref={heroRef} className="relative isolate overflow-hidden min-h-[640px] md:min-h-[760px] pt-24 md:pt-28 pb-10">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-[center_40%]"
          style={{ backgroundImage: `url("${HERO}")`, y: reduce ? 0 : heroY }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080b0f]/94 via-[#080b0f]/78 to-[#080b0f]/45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#080b0f] via-transparent to-[#080b0f]/40" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-[1.2fr_.8fr] gap-8 items-end">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.h1
              variants={fadeUp}
              className="leading-[1.05] tracking-tight text-[34px] sm:text-[42px] md:text-[56px]"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontWeight: 400 }}
            >
              Pasa el encargo que no haces.
              <span className="block mt-2 italic" style={{ color: GREEN }}>
                Recibe el que sí.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 text-base md:text-xl text-white/75 leading-relaxed max-w-2xl">
              ¿Te piden algo que no haces? Pásaselo a un colega de tu zona. Y cuando a él le pidan lo
              tuyo, te llama a ti.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 text-sm text-white/55">
              Alicante · por invitación · sin cuota
            </motion.p>
            <motion.div variants={fadeUp} className="mt-7 flex flex-col items-stretch sm:items-start gap-3 max-w-xl">
              <PrimaryCTA className="w-full sm:w-auto rounded-full" />
              <p className="text-[13px] text-white/60 leading-snug">Apuntarse no tiene cuota.</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <CodeLink />
                <HaveCodeLink />
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="relative pb-4">
            <div className="lp-paper lp-torn p-5 -rotate-1 max-w-sm ml-auto">
              <span className="lp-tape lp-tape-top" />
              <p className="text-[11px] tracking-[0.16em] relative z-[1]">POR INVITACIÓN</p>
              <p className="text-3xl font-bold tracking-wide mt-1 relative z-[1]">{PUBLIC_ACCESS_CODE}</p>
              <p className="mt-2 text-sm leading-snug relative z-[1]">
                Esta fase no está abierta a cualquiera. Las plazas van por oficio y código postal.
              </p>
            </div>
            <div className="lp-paper p-4 rotate-1 max-w-sm ml-auto mt-3 text-sm">
              <p className="font-semibold relative z-[1]">03001 Alicante Centro</p>
              <p className="mt-2 relative z-[1]">Fontanero — plaza disponible</p>
              <p className="relative z-[1]">Electricista — plaza ocupada</p>
              <p className="relative z-[1]">Pintor — plaza disponible</p>
              <p className="relative z-[1]">Carpintero — plaza ocupada</p>
              <p className="mt-2 text-xs relative z-[1]">Una plaza por oficio en cada grupo.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {INAUGURAL_PHASE_ACTIVE && <LandingAccessInvite />}

      <section className="scroll-mt-20 py-16 md:py-24" id="como-funciona">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2
            className="text-[32px] md:text-[48px] leading-[1.08] mb-10 max-w-3xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            Aquí el trabajo no se compra. Se recomienda.
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <LandingDailyStory />
            <div>
              <p className="mb-5 text-base md:text-lg text-white/65 leading-relaxed">
                Cuando un profesional de tu grupo necesita a alguien de tu oficio, puede pasarte la
                oportunidad directamente. No son anuncios ni una lista de leads vendidos a varios
                profesionales.
              </p>
              <LandingAllyExamples />
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="plazas">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LimitedSeatsIdea />
        </div>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="grupo">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <GroupExample />
        </div>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="reputacion">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingScore />
        </div>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="diferencia">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingCompare />
        </div>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="empezar">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingSteps />
        </div>
      </section>

      <section id="entrar" className="relative overflow-hidden py-24 md:py-32 scroll-mt-20" style={{ backgroundColor: BG }}>
        <NodeField density={0.00008} opacity={0.28} intensity={0.4} />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8">
          <h2 className="text-[28px] sm:text-[34px] md:text-[42px] leading-[1.12]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
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
            <PrimaryCTA size="lg" className="rounded-full" />
            <CodeLink />
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
