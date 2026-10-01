import { LandingNavbar, LandingFooter } from '@/components/LandingChrome';
import { LandingHero } from '@/components/LandingHero';
import { LandingAccessInvite } from '@/components/LandingAccessInvite';
import { LandingAllyExamples } from '@/components/LandingAllyExamples';
import { LimitedSeatsIdea, GroupExample } from '@/components/LandingGroup';
import { LandingScore } from '@/components/LandingScore';
import { LandingCompare } from '@/components/LandingCompare';
import { LandingPay } from '@/components/LandingPay';
import { LandingFaq } from '@/components/LandingFaq';
import { LandingSteps } from '@/components/LandingSteps';
import { NodeField } from '@/components/NodeField';
import { Reveal, ParallaxImage } from '@/components/LandingMotion';
import { BG, GREEN, PAPER, TITLE_SHADOW } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';
import { INAUGURAL_PHASE_ACTIVE } from '@/lib/inauguralPhase';

const GROUP = '/landing/file_00000000e4f88243b41b502ec6975bec.png';
const ELECTRIC = '/landing/grok_1790779224413.jpg';
const PAINTER = '/landing/grok_1790780438773.jpg';
const CLOSE = '/landing/grok_1790806707494.jpg';

const photoTitle = {
  fontFamily: 'Instrument Serif, Georgia, serif',
  color: PAPER,
  textShadow: TITLE_SHADOW,
} as const;

export default function Landing() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG }}>
      <LandingNavbar />

      <LandingHero />
      {INAUGURAL_PHASE_ACTIVE && (
        <Reveal>
          <LandingAccessInvite />
        </Reveal>
      )}

      <section className="scroll-mt-20 relative overflow-hidden" id="para-quien">
        <ParallaxImage src={GROUP} alt="" className="absolute inset-0 h-[108%] w-full object-cover -top-[4%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705] via-[#050705]/90 via-50% to-[#050705]/25" />
        <Reveal className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <h2 className="text-[32px] md:text-[48px] leading-[1.08] max-w-xl" style={photoTitle}>
            Es para quien vive del oficio.
          </h2>
          <p className="mt-6 max-w-lg text-base md:text-lg text-white/90 leading-relaxed">
            Fontaneros, electricistas, pintores, manitas. También quien cuida mascotas, atiende a
            adultos mayores, limpia casas o da clases de inglés.
          </p>
          <p className="mt-4 max-w-md text-base md:text-lg text-white/90 leading-relaxed">
            Autónomos y negocios pequeños de la misma zona.
          </p>
        </Reveal>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="como-funciona">
        <Reveal className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2
              className="text-[32px] md:text-[48px] leading-[1.08] mb-8"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: PAPER }}
            >
              Si te piden algo que no haces, se lo pasas a un aliado de tu zona.
            </h2>
            <p className="mb-5 text-base md:text-lg text-white/80 leading-relaxed">
              ¿Te piden algo que no haces? Pásaselo a un colega de tu zona. Y cuando a él le pidan lo
              tuyo, te llama a ti.
            </p>
            <p className="mb-5 text-base md:text-lg text-white/80 leading-relaxed">
              Cuando un profesional de tu grupo necesita a alguien de tu oficio, puede pasarte la
              oportunidad directamente. No son anuncios ni una lista de leads vendidos a varios
              profesionales.
            </p>
            <LandingAllyExamples />
          </div>
          <img
            src={ELECTRIC}
            alt="Manos trabajando en un cuadro eléctrico"
            className="w-full aspect-[4/3] object-cover"
          />
        </Reveal>
      </section>

      <section className="scroll-mt-20 relative overflow-hidden min-h-[70vh]" id="encargo">
        <ParallaxImage src={PAINTER} alt="" className="absolute inset-0 h-[108%] w-full object-cover -top-[4%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705] via-[#050705]/88 to-transparent" />
        <Reveal className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <h2 className="text-[32px] md:text-[48px] leading-[1.08] max-w-md" style={photoTitle}>
            Te nombran. Acordáis. Cerráis un importe.
          </h2>
          <p className="mt-6 max-w-md text-base md:text-lg text-white/90 leading-relaxed">
            El encargo va de un aliado a otro. La negociación es guiada. No se queda en un chat suelto.
          </p>
        </Reveal>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="directorio">
        <Reveal className="max-w-6xl mx-auto px-5 md:px-8">
          <h2
            className="text-[32px] md:text-[44px] leading-[1.08] max-w-xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: PAPER }}
          >
            El directorio de tu grupo
          </h2>
          <p className="mt-5 max-w-xl text-base md:text-lg text-white/80 leading-relaxed">
            Ves a los aliados de tu código postal y contactas desde el panel. No es un listado de la
            ciudad. Es la gente de tu grupo.
          </p>
        </Reveal>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="perfil">
        <Reveal className="max-w-6xl mx-auto px-5 md:px-8">
          <h2
            className="text-[32px] md:text-[44px] leading-[1.08] max-w-xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: PAPER }}
          >
            Tu perfil en el panel
          </h2>
          <p className="mt-5 max-w-xl text-base md:text-lg text-white/80 leading-relaxed">
            Oficio, zona, código de aliado y estado. El score se convierte en un estado: aquí se ve
            Estable.
          </p>
        </Reveal>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="plazas">
        <Reveal className="max-w-6xl mx-auto px-5 md:px-8">
          <LimitedSeatsIdea />
        </Reveal>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="grupo">
        <Reveal className="max-w-6xl mx-auto px-5 md:px-8">
          <GroupExample />
        </Reveal>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="reputacion">
        <Reveal className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingScore />
        </Reveal>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="diferencia">
        <Reveal className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingCompare />
        </Reveal>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="apoyo">
        <Reveal className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingPay />
        </Reveal>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="empezar">
        <Reveal className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingSteps />
        </Reveal>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="preguntas">
        <Reveal className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingFaq />
        </Reveal>
      </section>

      <section id="entrar" className="relative overflow-hidden min-h-[80vh] scroll-mt-20">
        <ParallaxImage
          src={CLOSE}
          alt="Manos de un profesional cerrando la caja de herramientas al final del día"
          position="70% center"
          className="absolute inset-0 h-[108%] w-full object-cover -top-[4%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705] via-[#050705]/92 to-[#050705]/25" />
        <NodeField density={0.00008} opacity={0.18} intensity={0.3} />
        <Reveal className="relative max-w-3xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <h2 className="text-[28px] sm:text-[34px] md:text-[42px] leading-[1.12]" style={photoTitle}>
            Si tienes invitación, entra con tu oficio.
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed">
            Puede haber cientos de profesionales de tu oficio en tu ciudad.
            <span className="block mt-3 font-medium" style={{ color: GREEN }}>
              En cada grupo RUANA hay una plaza por oficio.
            </span>
          </p>
          <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
            Es la regla del grupo: un oficio, una plaza. Cuando alguien necesita lo que tú haces, tiene
            un colega de su zona a quien pasar el encargo.
          </p>
          <p className="mt-4 text-white/80">Apuntarse no tiene cuota.</p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <PrimaryCTA size="lg" />
            <CodeLink />
          </div>
        </Reveal>
      </section>

      <LandingFooter />
    </div>
  );
}
