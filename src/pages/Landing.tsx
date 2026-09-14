import { motion, type Variants, useReducedMotion } from 'framer-motion';
import { LandingNavbar, LandingFooter } from '@/components/LandingChrome';
import { LandingFundadorInvite } from '@/components/LandingFundadorInvite';
import { LandingAllyExamples } from '@/components/LandingAllyExamples';
import { LandingDailyStory } from '@/components/LandingDailyStory';
import { LimitedSeatsIdea, GroupExample } from '@/components/LandingGroup';
import { LandingScore } from '@/components/LandingScore';
import { LandingProduct } from '@/components/LandingProduct';
import { LandingCompare } from '@/components/LandingCompare';
import { LandingSteps } from '@/components/LandingSteps';
import { LandingScreenshot } from '@/components/LandingScreenshot';
import { NodeField } from '@/components/NodeField';
import { BG, BG_ALT, GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';
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
  return (
    <section
      id={id}
      className={`scroll-mt-20 ${className}`}
      style={alt ? { backgroundColor: BG_ALT } : undefined}
    >
      {children}
    </section>
  );
}

export default function Landing() {
  const reduce = useReducedMotion();

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

      <section className="relative overflow-hidden pt-24 md:pt-32 pb-12 md:pb-20">
        <NodeField density={0.00012} opacity={0.7} intensity={0.8} />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p
              variants={fadeUp}
              className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-medium uppercase tracking-[0.14em] text-white/55 mb-6"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: GREEN }}
              />
              Buscamos Aliados Fundadores · Primeros grupos en formación
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[1.08] tracking-tight text-[30px] sm:text-[38px] md:text-[48px] lg:text-[52px]"
            >
              Estamos formando la red de profesionales de tu zona.
              <span className="block mt-2 md:mt-3" style={{ color: GREEN }}>
                ¿Está libre la plaza de tu oficio?
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-base md:text-xl text-white/72 leading-relaxed max-w-2xl"
            >
              Fontaneros, electricistas, pintores, asesores, fotógrafos y otros profesionales que
              se recomiendan oportunidades de trabajo entre ellos.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-5"
            >
              <PrimaryCTA />
              <CodeLink />
            </motion.div>
          </motion.div>

          <div className="mt-12 md:mt-16 max-w-4xl">
            <LandingScreenshot
              src="/landing/01-dashboard-aliado.png"
              alt="Panel del aliado en RUANA, con el grupo, las solicitudes y el Score RUANA"
              caption="Panel del aliado: el grupo, las solicitudes y el Score RUANA. No es un escaparate de anuncios."
            />
          </div>
        </div>
      </section>

      {INAUGURAL_PHASE_ACTIVE && <LandingFundadorInvite />}

      <Section className="py-16 md:py-24" id="como-funciona">
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

      <Section className="py-16 md:py-24" id="producto">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingProduct />
        </div>
      </Section>

      <Section className="py-16 md:py-24" alt id="reputacion">
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

      <section
        id="entrar"
        className="relative overflow-hidden py-24 md:py-36 scroll-mt-20"
        style={{ backgroundColor: BG }}
      >
        <NodeField density={0.00008} opacity={0.45} intensity={0.55} />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8">
          <h2 className="text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.12] tracking-tight">
            Puede haber cientos de profesionales de tu oficio en tu ciudad.
            <span className="block mt-3" style={{ color: GREEN }}>
              En tu grupo RUANA, las plazas son limitadas.
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed">
            Comprueba si la tuya sigue disponible.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <PrimaryCTA size="lg" />
            <CodeLink />
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
