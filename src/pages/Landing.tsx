import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Plus,
  Minus,
} from 'lucide-react';
import { LandingNavbar, LandingFooter } from '@/components/LandingChrome';
import { BG, BG_ALT, GREEN } from '@/lib/landingTheme';
import { RequestAccessButton } from '@/components/RequestAccessButton';
import { DensityMap } from '@/components/DensityMap';
import { NodeField } from '@/components/NodeField';
import {
  SeatPanel,
  ScoreLedger,
  JobFlow,
  InvitePanel,
  AllyGrowth,
  NetworkGraph,
} from '@/components/SystemVisuals';

const APP_URL = 'https://ruana-4293f.web.app';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function PrimaryCTA({ children = 'Solicitar acceso' }: { children?: React.ReactNode }) {
  return (
    <RequestAccessButton
      className="px-6 py-3.5 rounded-lg font-semibold text-base text-black transition-all duration-200 hover:shadow-[0_0_28px_rgba(0,230,118,0.45)] hover:-translate-y-[1px]"
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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
      >
        <span className="text-base md:text-lg font-semibold text-white/90 group-hover:text-white transition">
          {q}
        </span>
        {open ? (
          <Minus className="h-5 w-5 shrink-0 mt-1" style={{ color: GREEN }} />
        ) : (
          <Plus className="h-5 w-5 shrink-0 mt-1 text-white/40 group-hover:text-white/70 transition" />
        )}
      </button>
      {open && (
        <div className="pb-6 pr-10 text-white/65 text-sm md:text-base leading-relaxed max-w-3xl">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG }}>
      <LandingNavbar />

      {/* ============ HERO: la red, viva y visible ============ */}
      <section className="relative overflow-hidden pt-32 md:pt-44 pb-20 md:pb-28">
        <NodeField density={0.00022} />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(0,230,118,0.16), transparent 60%), radial-gradient(ellipse at 10% 100%, rgba(0,230,118,0.07), transparent 55%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h1 className="font-extrabold leading-[1.02] tracking-tight text-[44px] md:text-[68px] lg:text-[78px]">
            Nadie levanta un oficio
            <br />
            <span style={{ color: GREEN }}>completamente solo.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            RUANA conecta a los profesionales de un mismo barrio para que se pasen trabajo entre
            ellos. Una plaza por oficio y código postal. Se entra con código o solicitando acceso.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <PrimaryCTA />
            <CodeLink />
          </div>
          <p className="mt-6 text-sm text-white/40">
            Madrid, barrio a barrio. Las plazas por zona son limitadas.
          </p>
        </div>
      </section>

      {/* ============ FUNDADOR ============ */}
      <Section className="pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div
            className="relative overflow-hidden rounded-2xl border px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row md:items-center gap-6"
            style={{
              borderColor: 'rgba(0,230,118,0.3)',
              background:
                'linear-gradient(120deg, rgba(0,230,118,0.10) 0%, rgba(13,17,23,0.7) 55%)',
            }}
          >
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold tracking-tight">
                Estamos abriendo las primeras plazas con el código{' '}
                <span className="font-mono tracking-[0.2em]" style={{ color: GREEN }}>
                  FUNDADOR
                </span>
              </h3>
              <p className="mt-2 text-white/60 text-sm leading-relaxed max-w-2xl">
                Entra en la app, introduce el código y completa tu registro como aliado fundador
                de tu zona.
              </p>
            </div>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-base text-black transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,230,118,0.45)]"
              style={{ backgroundColor: GREEN }}
            >
              Entrar con código <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Section>

      {/* ============ LA RED QUE YA EXISTE ============ */}
      <Section className="py-20 md:py-28" id="que-es">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">
              La red de tu barrio ya existe.
              <br />
              Solo que no la ves.
            </h2>
            <p className="mt-7 text-white/70 text-base md:text-lg leading-relaxed">
              Un cliente pregunta por un fontanero. Alguien pasa un teléfono. El encargo se cierra
              y nadie se entera. Así se reparte el trabajo local desde siempre: por confianza, de
              boca en boca y sin ningún orden.
            </p>
            <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
              RUANA es esa misma red, pero dibujada: sabes quién está, qué hace y quién responde
              por él. Si acabas de llegar a una zona, dejas de empezar de cero.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <PrimaryCTA>Quiero mi plaza</PrimaryCTA>
            </div>
          </div>
          <NetworkGraph />
        </div>
      </Section>

      {/* ============ LA PLAZA ============ */}
      <Section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0" style={{ backgroundColor: BG_ALT }} />
        <NodeField density={0.00012} opacity={0.5} intensity={0.8} />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <SeatPanel />
          <div className="lg:order-first">
            <h2 className="text-3xl md:text-[42px] font-bold tracking-tight leading-[1.06]">
              Un oficio. Un código postal. Una plaza.
            </h2>
            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
              En cada zona hay un titular por oficio y un suplente esperando. Nadie cruza la ciudad
              para colgar una lámpara, así que compites por una plaza, no contra media España.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Si el titular deja de responder, la plaza pasa al suplente.',
                'Si tu zona está llena, entras en espera con prioridad.',
                'Cuando entras, entras con los que ya trabajan en tu calle.',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-white/70 text-[15px]">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: GREEN }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ============ EL ENCARGO Y EL SCORE ============ */}
      <Section className="py-20 md:py-28" id="como-funciona">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2 className="text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05] max-w-3xl">
            Un encargo entra en la red y se puede seguir con el dedo.
          </h2>

          <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <JobFlow />
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Quien lo pasa también gana.
              </h3>
              <p className="mt-4 text-white/65 leading-relaxed">
                Cuando un aliado no puede atender algo, lo suelta a la red. Queda escrito quién lo
                pasó, quién lo cogió, cuándo y cómo acabó. Esa huella es la que hace que recomendar
                te compense de verdad.
              </p>
            </div>
          </div>

          <div className="mt-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                El Score es la memoria de la red.
              </h3>
              <p className="mt-4 text-white/65 leading-relaxed">
                No cuenta seguidores ni likes. Cuenta trabajos cerrados, clientes contentos,
                recomendaciones que salieron bien y lo que dejaste tirado. Sube con trabajo y baja
                con silencio.
              </p>
              <p className="mt-4 text-white/50 text-sm leading-relaxed">
                Tu score decide si eres titular de tu oficio en tu zona o si esperas turno.
              </p>
            </div>
            <ScoreLedger />
          </div>

          <div className="mt-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AllyGrowth />
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Un aliado no entra hecho: se hace.
              </h3>
              <p className="mt-4 text-white/65 leading-relaxed">
                Casi nadie empieza siendo titular. Se entra en espera o de suplente, se responde
                rápido, se cierran encargos y la plaza acaba llegando. Aquí la antigüedad no vale
                nada; el historial, todo.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ TERRITORIO ============ */}
      <Section className="relative overflow-hidden py-20 md:py-28" id="territorio">
        <div className="absolute inset-0" style={{ backgroundColor: BG_ALT }} />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-[42px] font-bold tracking-tight leading-[1.06]">
              La confianza es de barrio, no de país.
            </h2>
            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
              Cada celda es un código postal y cuánta gente hay dentro. Abrimos zona por zona: si
              la tuya aún no está encendida, tu solicitud ayuda a decidir cuál abrimos después.
            </p>
          </div>
          <div>
            <DensityMap />
          </div>
        </div>
      </Section>

      {/* ============ ENTRADA ============ */}
      <Section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <InvitePanel />
          <div>
            <h2 className="text-3xl md:text-[42px] font-bold tracking-tight leading-[1.06]">
              Se entra porque alguien responde por ti.
            </h2>
            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
              Un aliado te pasa su código, o pides acceso y revisamos tu oficio, tu zona y si hay
              plaza libre. Quien invita pone su nombre encima del tuyo: por eso nadie invita a la
              ligera.
            </p>
            <div className="mt-9">
              <PrimaryCTA />
            </div>
          </div>
        </div>
      </Section>

      {/* ============ MODELO ============ */}
      <Section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0" style={{ backgroundColor: BG_ALT }} />
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 className="text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">
            Si no cobras, <span style={{ color: GREEN }}>no pagas nada.</span>
          </h2>
          <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            RUANA solo gana cuando tú ganas: un 12% sobre el valor de los encargos que cierras
            gracias a la red. Sin cuota mensual, sin permanencia, sin anuncios, sin pagar por
            aparecer arriba.
          </p>
        </div>
      </Section>

      {/* ============ VOCES ============ */}
      <Section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2 className="text-3xl md:text-[42px] font-bold tracking-tight leading-[1.06] max-w-3xl">
            Así suena la gente que entra.
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                t: '“Llevo 15 años de electricista, pero aquí no me conocía nadie.”',
                d: 'Entras por una plaza libre de tu zona y empiezas a recibir encargos de aliados que ya trabajan en tu calle.',
              },
              {
                t: '“Trabajo bien, pero hay meses que no sé qué va a pasar.”',
                d: 'La red te da encargos cualificados sin gastar en anuncios ni bajar precios para ganar el trabajo.',
              },
              {
                t: '“No quiero buscar en internet y cruzar los dedos.”',
                d: 'Pides el oficio en tu zona y te llega alguien que otro profesional ya ha probado y respalda.',
              },
            ].map((c, i) => (
              <div
                key={c.t}
                className="rounded-2xl border p-6 md:p-7"
                style={{
                  borderColor: i === 1 ? 'rgba(0,230,118,0.28)' : 'rgba(255,255,255,0.08)',
                  backgroundColor: i === 1 ? 'rgba(0,230,118,0.05)' : 'rgba(22,27,34,0.65)',
                }}
              >
                <p className="text-white text-[17px] leading-snug font-medium">{c.t}</p>
                <p className="mt-4 text-white/60 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ FAQ ============ */}
      <Section className="py-20 md:py-28" id="faq">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-[40px] font-bold tracking-tight leading-[1.06]">
              Lo que todo el mundo pregunta antes de entrar.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {[
              {
                q: '¿Cuánto cuesta estar en RUANA?',
                a: 'Nada por estar. Un 12% sobre el valor de los encargos que cierras gracias a la red. Si no cobras, no pagas.',
              },
              {
                q: '¿Y si mi oficio ya tiene titular en mi zona?',
                a: 'Entras como suplente o en lista de espera con prioridad. Si el titular deja de responder o incumple, la plaza pasa al siguiente.',
              },
              {
                q: '¿Qué pasa si alguien hace un mal trabajo?',
                a: 'Queda registrado: baja su score, pierde visibilidad y, si se repite, pierde el acceso. Quien lo recomendó también lo nota.',
              },
              {
                q: '¿Puedo entrar sin conocer a nadie?',
                a: 'Sí. Puedes solicitar acceso directamente y revisamos tu oficio, tu zona y si hay plaza. La invitación acelera el proceso, no es obligatoria.',
              },
              {
                q: '¿Con qué zonas estáis funcionando?',
                a: 'Arrancamos por Madrid, barrio a barrio. Si tu código postal aún no está abierto, tu solicitud ayuda a decidir cuál abrimos después.',
              },
            ].map((f) => (
              <FAQItem key={f.q} {...f} />
            ))}
          </div>
        </div>
      </Section>

      {/* ============ CTA FINAL ============ */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor: BG_ALT }}>
        <NodeField density={0.00018} />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(0,230,118,0.16), transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
          <h2 className="text-3xl md:text-[46px] font-bold tracking-tight leading-[1.06]">
            Tu zona tiene una plaza para tu oficio.
            <br />
            <span style={{ color: GREEN }}>Alguien la va a ocupar.</span>
          </h2>
          <p className="mt-6 text-white/65 text-base md:text-lg leading-relaxed">
            Solicita acceso y te decimos en pocos días si hay sitio en tu código postal.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
            <PrimaryCTA />
            <CodeLink />
          </div>
          <p className="mt-6 text-sm text-white/40">
            Sin cuotas. Sin permanencia. Solo pagas cuando la red te trae trabajo.
          </p>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
