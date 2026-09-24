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
              className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-medium tracking-[0.04em] text-white/55 mb-5"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: GREEN }}
              />
              Oficios de Alicante · por código postal
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[1.08] tracking-tight text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px]"
            >
              Pasa el curro que no haces.
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
                Sin cuota mensual. Solo un 12% si cierras un curro que te llegó por RUANA.
              </p>
              <CodeLink />
            </motion.div>
          </motion.div>

          <figure
            className="mt-8 md:mt-10 w-full max-w-[350px] rounded-[14px] border px-3.5 pt-4 pb-3"
            style={{ backgroundColor: '#11161d', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <img
              src="/landing/hero-fontanero-pintor.webp"
              alt="Un fontanero y un pintor se pasan trabajo en los dos sentidos"
              width={700}
              height={195}
              decoding="async"
              className="block w-full h-auto"
            />
            <div
              className="mt-1.5 grid text-[13px] font-semibold leading-none text-white/75"
              style={{ gridTemplateColumns: '26% 48% 26%' }}
            >
              <span className="text-center">Fontanero</span>
              <span aria-hidden="true" />
              <span className="text-center">Pintor</span>
            </div>
          </figure>
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
              En cada grupo RUANA hay una plaza por oficio.
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed">
            Es la regla del grupo: un oficio, una plaza. Cuando alguien necesita lo que tú haces, tiene
            un colega de su zona a quien pasar el curro.
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
