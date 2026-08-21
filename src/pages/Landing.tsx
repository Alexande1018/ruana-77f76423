import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Link2, LogIn, Users } from 'lucide-react';
import { LandingNavbar, LandingFooter } from '@/components/LandingChrome';
import { LandingFundadorInvite } from '@/components/LandingFundadorInvite';
import { LandingAllyExamples } from '@/components/LandingAllyExamples';
import { NodeField } from '@/components/NodeField';
import { BG, BG_ALT, GREEN } from '@/lib/landingTheme';
import { RequestAccessButton } from '@/components/RequestAccessButton';
import { INAUGURAL_PHASE_ACTIVE } from '@/lib/inauguralPhase';

const APP_URL = 'https://ruana-4293f.web.app';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

const STEPS = [
  {
    icon: LogIn,
    title: 'Entras',
    text: 'Con tu código o solicitud. Te ubicamos por oficio y zona.',
  },
  {
    icon: Link2,
    title: 'Conectas',
    text: 'Conoces a otros profesionales de tu calle que ya forman parte de la red.',
  },
  {
    icon: Users,
    title: 'La red se mueve',
    text: 'Cuando surge un trabajo, se pasa a quien confías. Y a ti te pueden pasar encargos.',
  },
];

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
      viewport={{ once: true, amount: 0.12 }}
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
      className="px-6 py-3.5 rounded-lg font-semibold text-base text-black transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,230,118,0.45)] hover:-translate-y-0.5 active:translate-y-0"
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
      className="group inline-flex items-center gap-2 text-base font-medium border-b pb-0.5 transition-all duration-300 hover:text-white"
      style={{ color: GREEN, borderColor: 'rgba(0,230,118,0.35)' }}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease }}
      whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
      className={`overflow-hidden rounded-xl border shadow-2xl ${className}`}
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG }}>
      <LandingNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
        <NodeField density={0.00014} opacity={0.85} intensity={0.9} />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 0%, rgba(0,230,118,0.1), transparent 55%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="max-w-xl"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.h1
                variants={fadeUp}
                className="font-bold leading-[1.08] tracking-tight text-[34px] md:text-[48px] lg:text-[52px]"
              >
                ¿Tienes un negocio u oficio y quieres tener más clientes de tu zona?
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed"
              >
                En RUANA, otros profesionales pueden ayudarte a conseguirlos.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-5">
                <PrimaryCTA />
                <CodeLink />
              </motion.div>
            </motion.div>
            <AppScreenshot
              src="/landing/01-dashboard-aliado.png"
              alt="Panel del aliado en RUANA"
              className="lg:max-w-md lg:ml-auto opacity-95"
            />
          </div>
        </div>
      </section>

      {/* Código fundador — invitación especial */}
      {INAUGURAL_PHASE_ACTIVE && <LandingFundadorInvite />}

      {/* Explicación natural */}
      <Section className="py-16 md:py-24" id="como-funciona">
        <motion.div
          className="max-w-3xl mx-auto px-5 md:px-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="space-y-6 text-lg md:text-[21px] leading-[1.65] text-white/80">
            <motion.p variants={fadeUp}>
              Imagínate que eres fontanero y conoces a un electricista, un pintor y un fotógrafo de
              tu zona.
            </motion.p>
            <motion.p variants={fadeUp}>
              Cuando ellos necesiten a alguien de confianza para un trabajo, pueden contar contigo.
            </motion.p>
            <motion.p variants={fadeUp}>Y tú puedes hacer lo mismo con ellos.</motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-14 pt-10 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="text-xl md:text-2xl font-semibold text-white leading-snug">
              Así funciona RUANA.
            </p>
            <p className="mt-4 text-lg md:text-[21px] text-white/75 leading-relaxed">
              Profesionales de distintos oficios que se conocen, se ayudan y se pasan oportunidades
              de trabajo.
            </p>
          </motion.div>
        </motion.div>
      </Section>

      {/* Oportunidades concretas */}
      <Section className="py-16 md:py-24" alt id="oportunidades">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Oportunidades que nacen de la confianza
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed">
              No son anuncios ni leads fríos. Son trabajos que otro profesional de tu zona decide
              pasarte porque te conoce.
            </p>
          </div>
          <LandingAllyExamples />
        </div>
      </Section>

      {/* La red */}
      <Section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-lg order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
              Tu zona, tu red
            </h2>
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

      {/* Cómo empezar */}
      <Section className="py-16 md:py-24" alt id="empezar">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Entrar, conectar y empezar
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed">
              Tres pasos sencillos. Sin complicarte la vida.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.55, ease }}
                whileHover={{ y: -3 }}
                className="rounded-xl border p-6 md:p-7 transition-colors duration-300 hover:border-[rgba(0,230,118,0.25)]"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  backgroundColor: 'rgba(22,27,34,0.45)',
                }}
              >
                <div
                  className="h-10 w-10 rounded-lg grid place-items-center mb-5"
                  style={{ backgroundColor: 'rgba(0,230,118,0.12)' }}
                >
                  <step.icon className="h-5 w-5" style={{ color: GREEN }} />
                </div>
                <p className="text-sm font-medium text-white/45 mb-1">Paso {i + 1}</p>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="mt-2 text-[15px] text-white/65 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Diferencia */}
      <Section className="py-16 md:py-24" id="diferencia">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">
            ¿En qué se diferencia?
          </h2>
          <div className="space-y-5">
            {[
              { label: 'WhatsApp', text: 'muchos contactos, poca estructura.' },
              { label: 'Directorios', text: 'muchos profesionales, poca confianza.' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
                className="rounded-xl border px-6 py-5 transition-colors duration-300 hover:bg-white/[0.02]"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <p className="text-base font-medium text-white/50 mb-1">{item.label}</p>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.55, ease }}
              whileHover={{ scale: 1.01 }}
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
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Comunidad y confianza */}
      <Section className="py-16 md:py-28" alt id="confianza">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
              Una comunidad que se conoce
            </h2>
            <div className="space-y-5 text-lg md:text-[21px] text-white/75 leading-relaxed">
              <p>
                En tu zona no queremos juntar a cientos de profesionales haciendo lo mismo.
              </p>
              <p>
                Queremos construir una red donde los profesionales puedan conocerse y confiar unos
                en otros.
              </p>
              <p className="text-base md:text-lg text-white/55">
                Cuando alguien te pasa un trabajo, pone su nombre. Por eso la red funciona.
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

      {/* Modelo de cobro */}
      <Section className="py-16 md:py-24" id="modelo">
        <motion.div
          className="max-w-2xl mx-auto px-5 md:px-8 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
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
        </motion.div>
      </Section>

      {/* CTA final */}
      <section
        id="entrar"
        className="relative overflow-hidden py-24 md:py-32"
        style={{ backgroundColor: BG_ALT }}
      >
        <NodeField density={0.00012} opacity={0.6} intensity={0.75} />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(0,230,118,0.12), transparent 60%)',
          }}
        />
        <motion.div
          className="relative max-w-2xl mx-auto px-5 md:px-8 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease }}
        >
          <h2 className="text-2xl md:text-[40px] font-semibold leading-[1.12] tracking-tight">
            Tu zona necesita profesionales
            <br />
            <span style={{ color: GREEN }}>que se conozcan y se ayuden.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed">
            Entra en RUANA, conoce la red de tu calle y empieza a generar oportunidades de verdad.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <PrimaryCTA>Entrar en RUANA</PrimaryCTA>
            <CodeLink />
          </div>
        </motion.div>
      </section>

      <LandingFooter />
    </div>
  );
}
