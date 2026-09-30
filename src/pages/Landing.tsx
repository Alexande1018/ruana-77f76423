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
import { BG, GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';
import { INAUGURAL_PHASE_ACTIVE } from '@/lib/inauguralPhase';

const GROUP = '/landing/file_00000000e4f88243b41b502ec6975bec.png';
const ELECTRIC = '/landing/grok_1790779224413.jpg';
const PAINTER = '/landing/grok_1790779232217.jpg';
const CLOSE = '/landing/grok_1790779216851.jpg';

export default function Landing() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG }}>
      <LandingNavbar />

      <LandingHero />
      {INAUGURAL_PHASE_ACTIVE && <LandingAccessInvite />}

      <section className="scroll-mt-20 relative overflow-hidden" id="para-quien">
        <img src={GROUP} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090c0a] via-[#090c0a]/88 to-[#090c0a]/35" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <h2
            className="text-[32px] md:text-[48px] leading-[1.08] max-w-xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            Es para quien vive del oficio.
          </h2>
          <p className="mt-6 max-w-md text-base md:text-lg text-white/75 leading-relaxed">
            Fontaneros, electricistas, pintores, albañiles, carpinteros y el resto de oficios del
            catálogo.
          </p>
          <p className="mt-4 max-w-md text-base md:text-lg text-white/75 leading-relaxed">
            Autónomos y negocios pequeños de la misma zona.
          </p>
          <p className="mt-4 max-w-md text-base md:text-lg text-white/75 leading-relaxed">
            No es una red para el cliente final.
          </p>
        </div>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="como-funciona">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2
              className="text-[32px] md:text-[48px] leading-[1.08] mb-8"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
            >
              Si te piden algo que no haces, se lo pasas a un aliado de tu zona.
            </h2>
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
          <img
            src={ELECTRIC}
            alt="Manos trabajando en un cuadro eléctrico"
            className="w-full aspect-[4/3] object-cover"
          />
        </div>
      </section>

      <section className="scroll-mt-20 relative overflow-hidden min-h-[70vh]" id="encargo">
        <img src={PAINTER} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090c0a] via-[#090c0a]/80 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <h2
            className="text-[32px] md:text-[48px] leading-[1.08] max-w-md"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            Te nombran. Acordáis. Cerráis un importe.
          </h2>
          <p className="mt-6 max-w-md text-base md:text-lg text-white/75 leading-relaxed">
            El encargo va de un aliado a otro. La negociación es guiada. No se queda en un chat suelto.
          </p>
        </div>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="directorio">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2
            className="text-[32px] md:text-[44px] leading-[1.08] max-w-xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            El directorio de tu grupo
          </h2>
          <p className="mt-5 max-w-xl text-base md:text-lg text-white/65 leading-relaxed">
            Ves a los aliados de tu código postal y contactas desde el panel. No es un listado de la
            ciudad. Es la gente de tu grupo.
          </p>
        </div>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="perfil">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2
            className="text-[32px] md:text-[44px] leading-[1.08] max-w-xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            Tu perfil en el panel
          </h2>
          <p className="mt-5 max-w-xl text-base md:text-lg text-white/65 leading-relaxed">
            Oficio, zona, código de aliado y estado. El score se convierte en un estado: aquí se ve
            Estable.
          </p>
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

      <section className="scroll-mt-20 py-16 md:py-24" id="apoyo">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingPay />
        </div>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="empezar">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingSteps />
        </div>
      </section>

      <section className="scroll-mt-20 py-16 md:py-24" id="preguntas">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <LandingFaq />
        </div>
      </section>

      <section id="entrar" className="relative overflow-hidden min-h-[80vh] scroll-mt-20">
        <img src={CLOSE} alt="" className="absolute inset-0 w-full h-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090c0a] via-[#090c0a]/88 to-[#090c0a]/25" />
        <NodeField density={0.00008} opacity={0.18} intensity={0.3} />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <h2
            className="text-[28px] sm:text-[34px] md:text-[42px] leading-[1.12]"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            Si tienes invitación, entra con tu oficio.
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">
            Puede haber cientos de profesionales de tu oficio en tu ciudad.
            <span className="block mt-3" style={{ color: GREEN }}>
              En cada grupo RUANA hay una plaza por oficio.
            </span>
          </p>
          <p className="mt-4 text-base md:text-lg text-white/60 leading-relaxed">
            Es la regla del grupo: un oficio, una plaza. Cuando alguien necesita lo que tú haces, tiene
            un colega de su zona a quien pasar el encargo.
          </p>
          <p className="mt-4 text-white/60">Apuntarse no tiene cuota.</p>
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
