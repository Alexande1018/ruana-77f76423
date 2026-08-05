import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  MapPin,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Plus,
  Minus,
  Star,
  Wallet,
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
  ChapterMark,
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

function Rule() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,230,118,0.35), rgba(255,255,255,0.06) 35%, transparent)',
        }}
      />
    </div>
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

/* ---------- FAQ ---------- */
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

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-20">
        <NodeField className="opacity-[0.9]" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 0%, rgba(0,230,118,0.13), transparent 55%), radial-gradient(ellipse at 5% 95%, rgba(0,230,118,0.05), transparent 50%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-6"
            >
              <p className="text-[12px] md:text-[13px] uppercase tracking-[0.22em] text-white/45 mb-6">
                Red privada de aliados · Madrid
              </p>
              <h1 className="font-extrabold leading-[1.03] tracking-tight text-[42px] md:text-[58px] lg:text-[66px]">
                Un oficio.
                <br />
                Un código postal.
                <br />
                <span style={{ color: GREEN }}>Una plaza.</span>
              </h1>
              <p className="mt-7 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                RUANA es la red donde los profesionales de tu barrio se pasan trabajo entre
                ellos. Cada oficio tiene una sola plaza por zona, y quien la ocupa se la ha
                ganado trabajando.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <PrimaryCTA />
                <CodeLink />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/50">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" style={{ color: GREEN }} /> Acceso evaluado
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" style={{ color: GREEN }} /> Una plaza por oficio y
                  zona
                </span>
                <span className="inline-flex items-center gap-2">
                  <Wallet className="h-4 w-4" style={{ color: GREEN }} /> Pagas solo cuando cobras
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <DensityMap />
              <p className="mt-3 text-[12px] text-white/40">
                Vista real de la red: cada celda es un código postal y cuánta gente hay dentro.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FUNDADOR ================= */}
      <Section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div
            className="relative overflow-hidden rounded-2xl border px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row md:items-center gap-6"
            style={{
              borderColor: 'rgba(0,230,118,0.3)',
              background:
                'linear-gradient(120deg, rgba(0,230,118,0.10) 0%, rgba(13,17,23,0.7) 55%)',
            }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] mb-2" style={{ color: GREEN }}>
                <Star className="h-3.5 w-3.5" fill={GREEN} /> Fase inaugural
              </div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight">
                Con el código{' '}
                <span className="font-mono tracking-[0.2em]" style={{ color: GREEN }}>
                  FUNDADOR
                </span>{' '}
                entras antes que nadie.
              </h3>
              <p className="mt-2 text-white/60 text-sm leading-relaxed max-w-2xl">
                Estamos admitiendo a los primeros aliados de cada zona. Entra en la app,
                introduce el código y completa tu registro como aliado fundador.
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

      <Rule />

      {/* ================= 01 · POR QUÉ EXISTE ================= */}
      <Section className="py-20 md:py-28" id="problema">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <ChapterMark n="01" label="Por qué existe" />
              <h2 className="text-3xl md:text-[44px] font-bold tracking-tight leading-[1.06]">
                El mejor trabajo de tu barrio se reparte en conversaciones a las que no estás
                invitado.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Alguien pregunta por un fontanero en un grupo. Otro pasa un teléfono. El encargo
                se cierra y nadie se entera. Así funciona el trabajo local desde siempre: por
                confianza, de boca en boca y sin ningún orden.
              </p>
              <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
                El problema no es la falta de trabajo. Es que esa red existe, pero es invisible,
                desordenada y no tiene memoria.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  'Las plataformas masivas te ponen a competir por precio con desconocidos.',
                  'Los grupos de WhatsApp son ruido: hoy se recomienda, mañana se olvida.',
                  'Si acabas de llegar a una zona, empiezas de cero aunque lleves 20 años en el oficio.',
                ].map((t) => (
                  <div key={t} className="flex gap-3 text-white/60 text-[15px]">
                    <XCircle className="h-5 w-5 shrink-0 mt-0.5 text-white/25" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Rule />

      {/* ================= 02 · QUÉ ES ================= */}
      <Section className="py-20 md:py-28" id="que-es">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <ChapterMark n="02" label="Qué es RUANA" />
              <h2 className="text-3xl md:text-[44px] font-bold tracking-tight leading-[1.06]">
                Esa red que ya existe, pero con reglas.
              </h2>
              <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
                <span className="text-white">Red de Unión y Apoyo para Negocios entre Aliados.</span>{' '}
                No es una red social, ni un directorio, ni un marketplace. Es un grupo cerrado de
                profesionales de una misma zona que se pasan encargos porque saben cómo trabaja
                el otro.
              </p>
              <p className="mt-4 text-white/60 text-[15px] leading-relaxed">
                Tres reglas la sostienen: se entra por invitación o evaluación, hay una sola
                plaza por oficio y código postal, y todo lo que pasa queda registrado.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <SeatPanel />
              </div>
              <div className="sm:col-span-2">
                <InvitePanel />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Rule />

      {/* ================= 03 · EL SISTEMA ================= */}
      <Section className="py-20 md:py-28" id="como-funciona">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl">
            <ChapterMark n="03" label="Cómo funciona" />
            <h2 className="text-3xl md:text-[44px] font-bold tracking-tight leading-[1.06]">
              Mira el sistema por dentro.
            </h2>
            <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
              No hace falta que nos creas. Esto es literalmente lo que ves dentro de la app: un
              encargo moviéndose, un score subiendo y una plaza cambiando de manos.
            </p>
          </div>

          <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Un encargo no se pierde: se traza.
              </h3>
              <p className="mt-4 text-white/65 leading-relaxed">
                Cuando un aliado no puede atender algo, lo pasa a la red. Queda escrito quién lo
                pasó, quién lo cogió, cuándo y cómo acabó. Esa huella es la que hace que
                recomendar te compense.
              </p>
            </div>
            <div className="lg:col-span-7">
              <JobFlow />
            </div>
          </div>

          <div className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <ScoreLedger />
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                El Score es la memoria de la red.
              </h3>
              <p className="mt-4 text-white/65 leading-relaxed">
                No cuenta seguidores ni likes. Cuenta trabajos cerrados, clientes contentos,
                recomendaciones que salieron bien y lo que dejaste tirado. Sube con trabajo y
                baja con silencio.
              </p>
              <p className="mt-4 text-white/50 text-sm leading-relaxed">
                Tu score decide si eres titular de tu oficio en tu zona, o si esperas turno.
              </p>
            </div>
          </div>

          <div className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Un aliado no entra hecho: se hace.
              </h3>
              <p className="mt-4 text-white/65 leading-relaxed">
                Casi nadie empieza siendo titular. Se entra en espera o de suplente, se responde
                rápido, se cierran encargos y la plaza acaba llegando. Aquí la antigüedad no vale
                nada; el historial, todo.
              </p>
            </div>
            <div className="lg:col-span-7">
              <AllyGrowth />
            </div>
          </div>
        </div>
      </Section>

      <Rule />

      {/* ================= 04 · TERRITORIO ================= */}
      <Section className="py-20 md:py-28" id="territorio">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <ChapterMark n="04" label="Territorio" />
            <h2 className="text-3xl md:text-[44px] font-bold tracking-tight leading-[1.06]">
              La confianza es de barrio, no de país.
            </h2>
            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
              RUANA se organiza por código postal porque así es como se mueve el trabajo real:
              nadie cruza la ciudad para colgar una lámpara. Cada zona tiene su propio grupo de
              aliados y sus propias plazas.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Solo compites por una plaza, no contra media España.',
                'Cuando entras, entras con los que ya trabajan a tu lado.',
                'Si tu zona está llena, entras en suplencia con prioridad.',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-white/70 text-[15px]">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: GREEN }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <DensityMap compact />
          </div>
        </div>
      </Section>

      <Rule />

      {/* ================= 05 · POR QUÉ ES DIFERENTE ================= */}
      <Section className="py-20 md:py-28" id="ventajas">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <ChapterMark n="05" label="Por qué es diferente" />
              <h2 className="text-3xl md:text-[44px] font-bold tracking-tight leading-[1.06]">
                Aquí no eres un perfil más.
              </h2>
              <p className="mt-6 text-white/70 leading-relaxed">
                La diferencia no está en las funciones. Está en que RUANA solo gana dinero si tú
                lo ganas: <span className="text-white">un 12% sobre los encargos que cierras
                gracias a la red</span>. Cero cuotas, cero suscripciones, cero anuncios.
              </p>
              <div
                className="mt-7 rounded-xl border p-5"
                style={{ borderColor: 'rgba(0,230,118,0.28)', backgroundColor: 'rgba(0,230,118,0.05)' }}
              >
                <div className="text-sm text-white/60">Si no cobras…</div>
                <div className="text-2xl font-bold mt-1">no pagas nada.</div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[520px]">
                  <thead>
                    <tr className="text-left text-white/45 text-[11px] uppercase tracking-[0.14em]">
                      <th className="py-3 pr-4 font-medium"> </th>
                      <th className="py-3 px-3 font-semibold" style={{ color: GREEN }}>
                        RUANA
                      </th>
                      <th className="py-3 px-3 font-medium">LinkedIn</th>
                      <th className="py-3 px-3 font-medium">Marketplaces</th>
                      <th className="py-3 px-3 font-medium">WhatsApp / BNI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Se entra por evaluación', true, false, false, 'partial'],
                      ['Organizado por zona', true, false, 'partial', 'partial'],
                      ['Reputación con historial', true, 'partial', 'partial', false],
                      ['Cada referido queda trazado', true, false, false, false],
                      ['Sin cuotas fijas', true, 'partial', false, true],
                      ['Plazas limitadas por oficio', true, false, false, false],
                    ].map((row, i) => (
                      <tr key={i} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        <td className="py-3.5 pr-4 text-white/85 font-medium">{row[0] as string}</td>
                        {row.slice(1).map((v, j) => (
                          <td
                            key={j}
                            className="py-3.5 px-3"
                            style={
                              j === 0
                                ? { backgroundColor: 'rgba(0,230,118,0.04)' }
                                : undefined
                            }
                          >
                            {v === true ? (
                              <CheckCircle2 className="h-[18px] w-[18px]" style={{ color: GREEN }} />
                            ) : v === 'partial' ? (
                              <MinusCircle className="h-[18px] w-[18px] text-white/30" />
                            ) : (
                              <XCircle className="h-[18px] w-[18px] text-white/15" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Rule />

      {/* ================= 06 · QUIÉN ENTRA ================= */}
      <Section className="py-20 md:py-28" id="casos">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl">
            <ChapterMark n="06" label="Quién entra" />
            <h2 className="text-3xl md:text-[44px] font-bold tracking-tight leading-[1.06]">
              Tres personas muy distintas, la misma red.
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden border"
            style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.06)' }}>
            {[
              {
                k: 'Acabas de llegar',
                t: '“Llevo 15 años de electricista, pero aquí no me conoce nadie.”',
                d: 'Entras por una plaza libre de tu zona y empiezas a recibir encargos de aliados que ya trabajan en tu calle.',
              },
              {
                k: 'Ya tienes clientes',
                t: '“Trabajo bien, pero hay meses que no sé qué va a pasar.”',
                d: 'La red te da un canal estable de encargos cualificados sin gastar en anuncios ni bajar precios.',
              },
              {
                k: 'Necesitas a alguien',
                t: '“No quiero buscar en internet y cruzar los dedos.”',
                d: 'Pides el oficio en tu zona y te llega alguien que otro profesional ya ha probado y responde por él.',
              },
            ].map((c, i) => (
              <div key={c.k} className="p-6 md:p-7" style={{ backgroundColor: i === 1 ? 'rgba(0,230,118,0.045)' : BG_ALT }}>
                <div className="text-[11px] uppercase tracking-[0.16em] mb-4" style={{ color: GREEN }}>
                  {c.k}
                </div>
                <p className="text-white text-[17px] leading-snug font-medium">{c.t}</p>
                <p className="mt-4 text-white/60 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Rule />

      {/* ================= 07 · FAQ ================= */}
      <Section className="py-20 md:py-28" id="faq">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <ChapterMark n="07" label="Dudas razonables" />
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
                q: '¿Esto es una franquicia o un club de pago tipo BNI?',
                a: 'No. No hay cuota de entrada, ni reuniones obligatorias, ni cuotas anuales. Solo la red, las plazas y el historial.',
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

      {/* ================= CTA FINAL ================= */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor: BG_ALT }}>
        <NodeField density={0.00007} opacity={0.65} />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(0,230,118,0.14), transparent 60%)',
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
