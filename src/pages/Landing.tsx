import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LandingNavbar, LandingFooter } from '@/components/LandingChrome';
import { BG, BG_ALT, GREEN } from '@/lib/landingTheme';
import { RequestAccessButton } from '@/components/RequestAccessButton';
import { INAUGURAL_PHASE_ACTIVE, FUNDADOR_APP_URL, FUNDADOR_CODE } from '@/lib/inauguralPhase';

const APP_URL = 'https://ruana-4293f.web.app';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

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
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      className={className}
      style={alt ? { backgroundColor: BG_ALT } : undefined}
    >
      {children}
    </motion.section>
  );
}

function PrimaryCTA({ children = 'Solicitar acceso' }: { children?: React.ReactNode }) {
  return (
    <RequestAccessButton
      className="px-6 py-3.5 rounded-lg font-semibold text-base text-black transition-all duration-200 hover:shadow-[0_0_28px_rgba(0,230,118,0.4)] hover:-translate-y-[1px]"
      style={{ backgroundColor: GREEN }}
    >
      {children}
    </RequestAccessButton>
  );
}

function CodeLink({ label = 'Ya tengo un código' }: { label?: string }) {
  return (
    <a
      href={APP_URL}
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

function AppScreenshot({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-2xl ${className}`}
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG }}>
      <LandingNavbar />

      {/* 1. Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 0%, rgba(0,230,118,0.08), transparent 55%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              <h1 className="font-bold leading-[1.08] tracking-tight text-[34px] md:text-[48px] lg:text-[52px]">
                ¿Tienes un negocio u oficio y quieres tener más clientes de tu zona?
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed">
                En RUANA, otros profesionales pueden ayudarte a conseguirlos.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <PrimaryCTA />
                <CodeLink />
              </div>
            </div>
            <AppScreenshot
              src="/landing/01-dashboard-aliado.png"
              alt="Panel del aliado en RUANA"
              className="lg:max-w-md lg:ml-auto opacity-95"
            />
          </div>
        </div>
      </section>

      {/* Banner fundador — solo fase inaugural */}
      {INAUGURAL_PHASE_ACTIVE && (
        <Section className="pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <div
              className="rounded-xl border px-6 py-5 md:px-7 md:py-6 flex flex-col sm:flex-row sm:items-center gap-5"
              style={{
                borderColor: 'rgba(0,230,118,0.25)',
                backgroundColor: 'rgba(0,230,118,0.06)',
              }}
            >
              <div className="flex-1">
                <p className="text-base md:text-lg leading-relaxed">
                  Ahora puedes entrar con el código{' '}
                  <span className="font-mono font-semibold tracking-wider" style={{ color: GREEN }}>
                    {FUNDADOR_CODE}
                  </span>{' '}
                  y registrarte como aliado fundador de tu zona.
                </p>
              </div>
              <a
                href={FUNDADOR_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm text-black transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,230,118,0.4)]"
                style={{ backgroundColor: GREEN }}
              >
                Entrar con código <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Section>
      )}

      {/* 2. Explicación natural */}
      <Section className="py-16 md:py-24" id="como-funciona">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="space-y-6 text-lg md:text-[21px] leading-[1.65] text-white/80">
            <p>
              Imagínate que eres fontanero y conoces a un electricista, un pintor y un fotógrafo de
              tu zona.
            </p>
            <p>
              Cuando ellos necesiten a alguien de confianza para un trabajo, pueden contar contigo.
            </p>
            <p>Y tú puedes hacer lo mismo con ellos.</p>
          </div>

          <div className="mt-14 pt-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-xl md:text-2xl font-semibold text-white leading-snug">
              Así funciona RUANA.
            </p>
            <p className="mt-4 text-lg md:text-[21px] text-white/75 leading-relaxed">
              Profesionales de distintos oficios que se conocen, se ayudan y se pasan oportunidades
              de trabajo.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. La red */}
      <Section className="py-16 md:py-24" alt>
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-lg order-2 lg:order-1">
            <p className="text-lg md:text-[21px] text-white/75 leading-relaxed">
              En tu zona hay profesionales de otros oficios que ya forman parte de la red. Cuando
              surge un trabajo, se lo pasan a quien conocen y en quien confían.
            </p>
            <p className="mt-5 text-lg md:text-[21px] text-white/75 leading-relaxed">
              No es un listado infinito. Es gente de tu calle, con la que puedes hablar y trabajar.
            </p>
          </div>
          <AppScreenshot
            src="/landing/07-directorio-red.png"
            alt="Directorio de profesionales de la red en RUANA"
            className="order-1 lg:order-2 opacity-95"
          />
        </div>
      </Section>

      {/* 4. Diferencia clara */}
      <Section className="py-16 md:py-24" id="diferencia">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">
            ¿En qué se diferencia?
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-base font-medium text-white/50 mb-1">WhatsApp</p>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                muchos contactos, poca estructura.
              </p>
            </div>
            <div>
              <p className="text-base font-medium text-white/50 mb-1">Directorios</p>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                muchos profesionales, poca confianza.
              </p>
            </div>
            <div
              className="rounded-xl border px-6 py-5"
              style={{
                borderColor: 'rgba(0,230,118,0.28)',
                backgroundColor: 'rgba(0,230,118,0.05)',
              }}
            >
              <p className="text-base font-medium mb-1" style={{ color: GREEN }}>
                RUANA
              </p>
              <p className="text-lg md:text-xl text-white leading-relaxed">
                una red de profesionales de tu zona que pueden ayudarse entre ellos.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Exclusividad / confianza */}
      <Section className="py-16 md:py-28" alt id="confianza">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-lg">
            <div className="space-y-5 text-lg md:text-[21px] text-white/75 leading-relaxed">
              <p>
                En tu zona no queremos juntar a cientos de profesionales haciendo lo mismo.
              </p>
              <p>
                Queremos construir una red donde los profesionales puedan conocerse y confiar unos
                en otros.
              </p>
            </div>
            <p className="mt-12 text-2xl md:text-[32px] font-semibold leading-[1.2] tracking-tight">
              Menos desconocidos.
              <br />
              <span style={{ color: GREEN }}>Más profesionales de confianza.</span>
            </p>
          </div>
          <AppScreenshot
            src="/landing/08-perfil-aliado.png"
            alt="Perfil de un profesional en RUANA"
            className="lg:max-w-md opacity-95"
          />
        </div>
      </Section>

      {/* 6. Modelo de cobro */}
      <Section className="py-16 md:py-24" id="modelo">
        <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
          <p className="text-2xl md:text-[34px] font-semibold leading-snug tracking-tight">
            No pagas por estar aquí.
          </p>
          <p className="mt-4 text-xl md:text-2xl leading-snug" style={{ color: GREEN }}>
            RUANA gana cuando tú ganas.
          </p>
          <p className="mt-7 text-base md:text-lg text-white/65 leading-relaxed max-w-xl mx-auto">
            Sin cuota mensual ni suscripción. Solo aplicas un apoyo del 12% cuando cierras un
            encargo que te llegó por la red. Si no cobras, no pagas.
          </p>
        </div>
      </Section>

      {/* 7. CTA final */}
      <section
        id="entrar"
        className="relative py-20 md:py-28"
        style={{ backgroundColor: BG_ALT }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(0,230,118,0.1), transparent 60%)',
          }}
        />
        <div className="relative max-w-2xl mx-auto px-5 md:px-8 text-center">
          <h2 className="text-2xl md:text-[38px] font-semibold leading-[1.15] tracking-tight">
            Una red de profesionales de tu zona que puede ayudarte a conseguir trabajo.
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/60 leading-relaxed">
            Entra, mira cómo funciona en tu zona y decide si te encaja.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
            <PrimaryCTA>Entrar en RUANA</PrimaryCTA>
            <CodeLink />
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
