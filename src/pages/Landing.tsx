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
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden" focusable="false">
        <defs>
          <clipPath id="ruana-torn-paper" clipPathUnits="objectBoundingBox">
            <path d="M .012 .055 C .02 .026 .034 .025 .048 .04 C .066 .056 .078 .025 .095 .036 C .113 .049 .126 .02 .144 .035 C .163 .05 .177 .027 .194 .04 C .214 .058 .231 .022 .25 .036 C .27 .052 .283 .028 .3 .04 C .32 .057 .337 .023 .355 .037 C .375 .052 .391 .024 .41 .04 C .43 .058 .444 .027 .463 .038 C .482 .052 .5 .023 .518 .037 C .54 .056 .555 .026 .575 .04 C .594 .055 .61 .024 .63 .037 C .65 .053 .668 .027 .687 .04 C .707 .059 .724 .023 .743 .036 C .762 .05 .777 .025 .797 .04 C .817 .055 .832 .027 .852 .04 C .872 .056 .89 .024 .908 .037 C .928 .052 .946 .027 .963 .043 C .982 .054 .99 .067 .987 .087 C .982 .11 .997 .128 .985 .151 C .976 .173 .994 .193 .984 .215 C .973 .238 .996 .256 .984 .28 C .974 .303 .993 .324 .982 .347 C .972 .37 .994 .389 .982 .414 C .972 .437 .993 .458 .982 .48 C .972 .504 .995 .524 .983 .548 C .972 .572 .993 .592 .982 .615 C .971 .639 .995 .66 .982 .684 C .97 .708 .992 .73 .98 .754 C .969 .778 .99 .8 .979 .823 C .967 .846 .991 .868 .978 .892 C .966 .914 .987 .935 .97 .955 C .952 .976 .935 .98 .915 .97 C .892 .958 .875 .986 .851 .972 C .829 .96 .81 .986 .788 .972 C .765 .959 .745 .985 .722 .972 C .699 .958 .679 .986 .656 .972 C .632 .959 .612 .987 .588 .973 C .565 .96 .545 .987 .522 .973 C .498 .96 .478 .985 .454 .972 C .431 .958 .41 .987 .387 .972 C .364 .959 .343 .985 .32 .972 C .297 .96 .277 .987 .254 .973 C .23 .959 .21 .985 .187 .972 C .164 .96 .144 .986 .121 .972 C .098 .958 .078 .984 .055 .97 C .034 .958 .017 .964 .012 .944 C .007 .922 .025 .901 .014 .878 C .003 .855 .026 .833 .015 .81 C .004 .786 .027 .764 .015 .74 C .004 .716 .026 .694 .015 .67 C .003 .646 .027 .624 .015 .6 C .004 .576 .026 .554 .015 .53 C .004 .506 .027 .484 .015 .46 C .003 .436 .027 .414 .015 .39 C .004 .366 .026 .344 .015 .32 C .003 .296 .027 .274 .015 .25 C .004 .226 .026 .204 .015 .18 C .003 .156 .027 .134 .015 .11 C .005 .087 .006 .068 .012 .055 Z" />
          </clipPath>
        </defs>
      </svg>
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
