import { ArrowRight } from 'lucide-react';
import { LandingNavbar, LandingFooter } from '@/components/LandingChrome';
import { BG, BG_ALT, GREEN } from '@/lib/landingTheme';
import { RequestAccessButton } from '@/components/RequestAccessButton';
import { AppShot } from '@/components/AppShot';
import { FUNDADOR_APP_URL, FUNDADOR_CODE, INAUGURAL_PHASE_ACTIVE } from '@/lib/inauguralPhase';

function PrimaryCTA({ children = 'Solicitar acceso' }: { children?: React.ReactNode }) {
  return (
    <RequestAccessButton
      className="px-6 py-3.5 rounded-lg font-semibold text-base text-black transition-colors duration-200 hover:brightness-110"
      style={{ backgroundColor: GREEN }}
    >
      {children}
    </RequestAccessButton>
  );
}

function CodeLink({ label = 'Ya tengo un código' }: { label?: string }) {
  return (
    <a
      href={FUNDADOR_APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-base font-medium border-b pb-0.5 transition-colors"
      style={{ color: GREEN, borderColor: 'rgba(0,230,118,0.35)' }}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG }}>
      <LandingNavbar />

      <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(0,230,118,0.12), transparent 58%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
          <h1 className="font-extrabold leading-[1.12] tracking-tight text-[32px] md:text-[48px] lg:text-[54px]">
            ¿Tienes un negocio u oficio y quieres tener más clientes de tu zona?
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/72 leading-relaxed max-w-2xl mx-auto">
            En RUANA, otros profesionales pueden ayudarte a conseguirlos.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
            <PrimaryCTA />
            <CodeLink />
          </div>
          {INAUGURAL_PHASE_ACTIVE ? (
            <p className="mt-5 text-sm text-white/42 leading-relaxed">
              Ahora puedes entrar con el código{' '}
              <span className="font-mono font-semibold tracking-wide" style={{ color: GREEN }}>
                {FUNDADOR_CODE}
              </span>
              .
            </p>
          ) : (
            <p className="mt-5 text-sm text-white/42">Para profesionales y pequeños negocios de la misma zona.</p>
          )}
        </div>

        <div className="relative max-w-5xl mx-auto px-5 md:px-8 mt-12 md:mt-14">
          <AppShot
            src="/landing/07-directorio-red.png"
            alt="Directorio de RUANA: un fontanero, un electricista y una pintora de la misma zona."
            caption="Profesionales de oficios distintos, de la misma zona. Así se ve la red."
          />
        </div>
      </section>

      <section className="py-20 md:py-28" id="que-es">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <p className="text-[17px] md:text-[19px] text-white/78 leading-[1.75]">
            Imagínate que eres fontanero y conoces a un electricista, un pintor y un fotógrafo de tu
            zona.
          </p>
          <p className="mt-6 text-[17px] md:text-[19px] text-white/78 leading-[1.75]">
            Cuando ellos necesiten a alguien de confianza para un trabajo, pueden contar contigo.
          </p>
          <p className="mt-6 text-[17px] md:text-[19px] text-white/78 leading-[1.75]">
            Y tú puedes hacer lo mismo con ellos.
          </p>

          <h2 className="mt-14 text-2xl md:text-[34px] font-bold tracking-tight leading-[1.2]">
            Así funciona RUANA.
          </h2>
          <p className="mt-5 text-[17px] md:text-[19px] text-white/70 leading-[1.75]">
            Profesionales de distintos oficios que se conocen, se ayudan y se pasan oportunidades de
            trabajo.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12" id="diferencia">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div
            className="rounded-[28px] px-6 py-12 md:px-12 md:py-16"
            style={{ backgroundColor: BG_ALT }}
          >
            <h2 className="text-2xl md:text-[32px] font-bold tracking-tight leading-[1.2] max-w-xl">
              No es un grupo de WhatsApp. Tampoco un directorio.
            </h2>
            <div className="mt-12 grid md:grid-cols-3 gap-10 md:gap-12">
              <div>
                <p className="text-sm uppercase tracking-[0.14em] text-white/40">WhatsApp</p>
                <p className="mt-3 text-[17px] text-white/70 leading-relaxed">
                  Muchos contactos, poca estructura.
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.14em] text-white/40">Directorios</p>
                <p className="mt-3 text-[17px] text-white/70 leading-relaxed">
                  Muchos profesionales, poca confianza.
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.14em]" style={{ color: GREEN }}>
                  RUANA
                </p>
                <p className="mt-3 text-[17px] text-white leading-relaxed">
                  Una red de profesionales de tu zona que pueden ayudarse entre ellos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" id="confianza">
        <div className="max-w-5xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-[17px] md:text-[19px] text-white/78 leading-[1.75]">
              En tu zona no queremos juntar a cientos de profesionales haciendo lo mismo.
            </p>
            <p className="mt-6 text-[17px] md:text-[19px] text-white/78 leading-[1.75]">
              Queremos construir una red donde los profesionales puedan conocerse y confiar unos en
              otros.
            </p>
            <p className="mt-12 text-3xl md:text-[42px] font-bold tracking-tight leading-[1.2]">
              Menos desconocidos.
              <br />
              <span style={{ color: GREEN }}>Más profesionales de confianza.</span>
            </p>
          </div>
          <AppShot
            src="/landing/08-perfil-aliado.png"
            alt="Perfil de un aliado en RUANA: oficio, zona y nombre de un profesional real."
            caption="Oficio, zona y un nombre. Gente que trabaja, no una lista infinita."
          />
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <h2 className="text-3xl md:text-[40px] font-bold tracking-tight leading-[1.15]">
            No pagas por estar aquí.
            <br />
            <span style={{ color: GREEN }}>RUANA gana cuando tú ganas.</span>
          </h2>
          <p className="mt-6 text-[17px] md:text-lg text-white/68 leading-relaxed">
            No hay cuota mensual ni hay que pagar por aparecer. Si cierras un trabajo gracias a la
            red, hay un apoyo del 12%. Si no hay trabajo, no hay cobro.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor: BG_ALT }}>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(0,230,118,0.12), transparent 58%)',
          }}
        />
        <div className="relative max-w-2xl mx-auto px-5 md:px-8 text-center">
          <h2 className="text-3xl md:text-[42px] font-bold tracking-tight leading-[1.15]">
            Si tienes un oficio y quieres una red de tu zona, entra.
          </h2>
          <p className="mt-6 text-white/65 text-base md:text-lg leading-relaxed">
            El resto se entiende mejor desde dentro.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
            <PrimaryCTA />
            <CodeLink />
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
