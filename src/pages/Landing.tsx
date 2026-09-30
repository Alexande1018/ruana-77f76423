import { LandingNavbar, LandingFooter } from '@/components/LandingChrome';
import { LandingHero } from '@/components/LandingHero';
import { LandingAccessInvite } from '@/components/LandingAccessInvite';
import { LandingAllyExamples } from '@/components/LandingAllyExamples';
import { LandingDailyStory } from '@/components/LandingDailyStory';
import { LimitedSeatsIdea, GroupExample } from '@/components/LandingGroup';
import { LandingScore } from '@/components/LandingScore';
import { LandingCompare } from '@/components/LandingCompare';
import { LandingSteps } from '@/components/LandingSteps';
import { NodeField } from '@/components/NodeField';
import { BG, GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';
import { INAUGURAL_PHASE_ACTIVE } from '@/lib/inauguralPhase';

export default function Landing() {
  return (
    <div className="ruana-landing min-h-screen text-white" style={{ backgroundColor: BG }}>
      <LandingNavbar />
      <LandingHero />

      {INAUGURAL_PHASE_ACTIVE && <LandingAccessInvite />}

      <section className="scroll-mt-20 py-16 md:py-24" id="como-funciona">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2
            className="text-[32px] md:text-[48px] leading-[1.08] mb-10 max-w-3xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            Aquí el trabajo no se compra. Se recomienda.
          </h2>
          <div className="flex flex-col lg:flex-row lg:items-start gap-14">
            <div className="lg:w-[54%]">
              <LandingDailyStory />
            </div>
            <div className="lg:w-[42%] lg:mt-16">
              <p className="mb-5 text-base md:text-lg text-white/65 leading-relaxed">
                ¿Te piden algo que no haces? Pásaselo a un colega de tu zona. Y cuando a él le pidan lo
                tuyo, te llama a ti.
              </p>
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
