import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import {
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Network as NetworkIcon,
  Activity,
  FileCheck2,
  Eye,
  Building2,
  Compass,
  Plus,
  Minus,
  UserCheck,
  Quote,
  Zap,
  TrendingUp,
  Users,
  Target,
} from 'lucide-react';
import { LandingNavbar, LandingFooter, BG, BG_ALT, GREEN, GREEN_DARK } from '@/components/LandingChrome';
import { RequestAccessButton } from '@/components/RequestAccessButton';
import { DensityMap } from '@/components/DensityMap';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
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
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ---------- HERO visual: territorial network ---------- */
function HeroNetwork() {
  const nodes = [
    { x: 18, y: 22, r: 2.4, label: '28012' },
    { x: 50, y: 16, r: 3.2, label: '28004', highlight: true },
    { x: 82, y: 26, r: 2.4 },
    { x: 28, y: 50, r: 2.6 },
    { x: 60, y: 46, r: 3.6, label: 'Tú' },
    { x: 88, y: 58, r: 2.4 },
    { x: 22, y: 78, r: 2.6 },
    { x: 52, y: 82, r: 2.4 },
    { x: 80, y: 84, r: 2.8, label: '28015' },
  ];
  const links: [number, number][] = [
    [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8], [1, 4], [4, 7], [3, 6], [2, 5], [0, 3], [4, 8],
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="haze" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={GREEN} stopOpacity="0.18" />
          <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#haze)" />
      {[20, 40, 60, 80].map((v) => (
        <g key={v}>
          <line x1={v} y1="0" x2={v} y2="100" stroke="white" strokeOpacity="0.04" strokeWidth="0.15" />
          <line x1="0" y1={v} x2="100" y2={v} stroke="white" strokeOpacity="0.04" strokeWidth="0.15" />
        </g>
      ))}
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={GREEN}
          strokeOpacity="0.32"
          strokeWidth="0.22"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 1.6} fill={GREEN} fillOpacity={n.highlight ? 0.18 : 0.08} />
          <circle cx={n.x} cy={n.y} r={n.r} fill={GREEN} />
          {n.label && (
            <text
              x={n.x + n.r + 1.5}
              y={n.y + 1}
              fill="white"
              fillOpacity="0.6"
              fontSize="2.6"
              fontFamily="Inter, sans-serif"
            >
              {n.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ---------- FAQ ---------- */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-xl overflow-hidden"
      style={{ backgroundColor: BG_ALT, borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 px-5 md:px-6 py-5 text-left hover:bg-white/[0.02] transition"
      >
        <span className="text-base md:text-lg font-semibold text-white">{q}</span>
        {open ? (
          <Minus className="h-5 w-5 shrink-0" style={{ color: GREEN }} />
        ) : (
          <Plus className="h-5 w-5 shrink-0 text-white/60" />
        )}
      </button>
      {open && (
        <div className="px-5 md:px-6 pb-6 text-white/70 text-sm md:text-base leading-relaxed">{a}</div>
      )}
    </div>
  );
}

export default function Landing() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: BG, fontFamily: '"Public Sans", system-ui, sans-serif' }}
    >
      <LandingNavbar />

      {/* ============== 1. HERO ============== */}
      <section className="relative flex items-center pt-28 pb-16 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, rgba(0,230,118,0.10), transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(0,230,118,0.06), transparent 50%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <h1 className="font-extrabold leading-[1.02] tracking-tight text-[40px] md:text-[62px] lg:text-[72px]">
              Tu reputación local, <span style={{ color: GREEN }}>por fin organizada</span>.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10 grid lg:grid-cols-12 gap-6 md:gap-8 items-center"
          >
            <div className="lg:col-span-7">
              <DensityMap />
            </div>
            <div className="lg:col-span-5">
              <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                RUANA es la red donde profesionales de tu zona se recomiendan entre ellos. Sin ruido, sin desconocidos, sin sorteos. Solo trabajo real entre gente que se conoce.
              </p>
              <div
                className="mt-6 rounded-xl border p-4 flex items-center gap-3"
                style={{ backgroundColor: 'rgba(13,17,23,0.6)', borderColor: 'rgba(0,230,118,0.25)' }}
              >
                <Star className="h-4 w-4 shrink-0" style={{ color: GREEN }} fill={GREEN} />
                <div>
                  <div className="text-sm font-semibold">Score RUANA · 842</div>
                  <p className="text-xs text-white/60 leading-snug">
                    3 referidos activos esta semana en tu zona (28004).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="mt-9 flex flex-wrap gap-3">
              <RequestAccessButton
                className="px-6 py-3.5 rounded-lg font-semibold text-base text-black transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,230,118,0.45)]"
                style={{ backgroundColor: GREEN }}
              >
                Solicitar acceso
              </RequestAccessButton>
              <a
                href="https://ruana-4293f.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-lg font-semibold text-base border text-white hover:bg-white/[0.06] transition inline-flex items-center gap-2"
                style={{ borderColor: 'rgba(0,230,118,0.45)', color: GREEN }}
              >
                Ya tengo un código <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#como-funciona"
                className="px-6 py-3.5 rounded-lg font-semibold text-base border border-white/25 text-white hover:bg-white/[0.06] transition"
              >
                Ver cómo funciona
              </a>
            </div>
            <p className="mt-3 text-sm text-white/50">
              Accede directamente si ya formas parte de la red.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" style={{ color: GREEN }} /> Perfiles verificados
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: GREEN }} /> Una plaza por oficio y zona
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color: GREEN }} /> Sin cuotas fijas
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== FUNDADOR BANNER ============== */}
      <Section className="pt-2 pb-10 md:pt-4 md:pb-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div
            className="relative overflow-hidden rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6"
            style={{
              borderColor: 'rgba(0,230,118,0.35)',
              background:
                'linear-gradient(135deg, rgba(0,230,118,0.08) 0%, rgba(13,17,23,0.6) 60%, rgba(13,17,23,0.6) 100%)',
              boxShadow: '0 20px 60px -30px rgba(0,230,118,0.35)',
            }}
          >
            <div
              aria-hidden
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl"
              style={{ backgroundColor: 'rgba(0,230,118,0.18)' }}
            />
            <div className="flex-1 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ backgroundColor: 'rgba(0,230,118,0.12)', color: GREEN, border: '1px solid rgba(0,230,118,0.35)' }}
              >
                <Star className="h-3.5 w-3.5" fill={GREEN} /> Acceso fase inaugural
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Con el código <span style={{ color: GREEN }}>FUNDADOR</span> entras a la fase inaugural de RUANA.
              </h3>
              <p className="mt-2 text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
                Solo los primeros aliados están siendo admitidos en esta etapa. Haz clic en <span className="text-white font-medium">"Ya tengo un código"</span>, introdúcelo y accede a la app para completar tu registro como aliado fundador.
              </p>
            </div>
            <div className="relative shrink-0">
              <a
                href="https://ruana-4293f.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-base text-black transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,230,118,0.45)]"
                style={{ backgroundColor: GREEN }}
              >
                Ya tengo un código <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ============== 2. PROBLEMA ============== */}
      <Section className="py-20 md:py-24" id="problema">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08]">
              Sin red en tu zona, todo es más difícil.
            </h2>
            <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed">
              Las plataformas masivas te dejan invisible. Los grupos de WhatsApp son ruido sin filtro. Y las ferias de contactos acaban en tarjetas que nadie llama. Si estás empezando o acabas de llegar a un barrio, no sabes a quién acudir ni quién te puede pasar trabajo de verdad.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                'Ofertas que nunca llegan',
                'Clientes que no te conocen',
                'Recomendaciones que se pierden en el chat',
                'Competencia con desconocidos por precio',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/70">
                  <XCircle className="h-5 w-5 shrink-0 text-white/30" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ============== 3. QUÉ ES RUANA ============== */}
      <Section className="py-20 md:py-24" id="que-es">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08]">
                ¿Qué es RUANA?
              </h2>
              <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed">
                <em className="not-italic text-white">Red de Unión y Apoyo para Negocios entre Aliados.</em> No es una red social. No es un marketplace. No es un directorio. Es un grupo de profesionales de tu zona que se pasan trabajo entre ellos porque saben que el otro lo hace bien.
              </p>
              <ul className="mt-7 space-y-3 text-white/80">
                {[
                  { t: 'Acceso evaluado', d: 'No entra cualquiera.' },
                  { t: 'Recomendaciones reales', d: 'Cada recomendación viene de alguien que ha trabajado contigo.' },
                  { t: 'Reputación medible', d: 'Tu historial se ve. Tus resultados hablan por ti.' },
                  { t: 'Trazabilidad total', d: 'Sabes quién te recomendó, qué se hizo y cómo quedó.' },
                ].map((t) => (
                  <li key={t.t} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: GREEN }} />
                    <span><span className="text-white font-medium">{t.t}:</span> <span className="text-white/75">{t.d}</span></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div
                className="rounded-2xl border p-6 md:p-8"
                style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Compass className="h-4 w-4" style={{ color: GREEN }} /> Zona · 28004 Madrid
                  </div>
                  <span className="text-xs text-white/40">Vista de aliado</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    'Fontanería',
                    'Electricidad',
                    'Carpintería',
                    'Reformas',
                    'Asesoría',
                    'Diseño',
                  ].map((trade, i) => (
                    <div
                      key={trade}
                      className="rounded-lg border px-3 py-3 text-xs text-center"
                      style={{
                        backgroundColor: i === 1 ? 'rgba(0,230,118,0.08)' : 'transparent',
                        borderColor: i === 1 ? 'rgba(0,230,118,0.35)' : 'rgba(255,255,255,0.08)',
                        color: i === 1 ? GREEN : 'rgba(255,255,255,0.7)',
                      }}
                    >
                      <div className="font-semibold">{trade}</div>
                      <div className="opacity-60 mt-1">{i === 1 ? 'Titular' : i === 3 ? 'Suplente' : 'Libre'}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    <NetworkIcon className="h-4 w-4" style={{ color: GREEN }} /> 14 aliados activos
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Star className="h-4 w-4" style={{ color: GREEN }} fill={GREEN} /> Score medio 781
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============== 4. CÓMO FUNCIONA ============== */}
      <Section className="py-20 md:py-24" id="como-funciona">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08]">
              ¿Cómo funciona?
            </h2>
            <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed">
              RUANA une oficio, zona y reputación. No hay algoritmos ocultos ni puertas giratorias. Cuatro pasos sencillos para empezar a recibir y dar trabajo de confianza.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', t: 'Solicitas acceso', d: 'Pides entrar con tu oficio y código postal. Si hay plaza, pasas a revisión.' },
              { n: '02', t: 'Activamos tu perfil', d: 'Revisamos tu perfil, zona y oficio. Si encajas, te activamos como Titular o Suplente.' },
              { n: '03', t: 'La red se mueve', d: 'Los aliados empiezan a derivarte encargos. Tú también puedes recomendar a otros.' },
              { n: '04', t: 'Tu nombre gana peso', d: 'Cada referido real, cada cierre y cada feedback sube tu Score RUANA.' },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-5"
                  style={{ backgroundColor: 'rgba(0,230,118,0.12)', color: GREEN }}
                >
                  {step.n}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.t}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============== 5. CÓDIGO POSTAL ============== */}
      <Section className="py-20 md:py-24" id="codigo-postal">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08]">
                La confianza es de barrio. Las oportunidades están cerca.
              </h2>
              <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed">
                RUANA se organiza por códigos postales porque la gente que de verdad te va a pasar trabajo está al lado tuyo, no al otro lado del mundo. Encargos cercanos, aliados que ya pisan tu calle, plazas limitadas para que la red no se sature.
              </p>
              <div className="mt-7 grid sm:grid-cols-2 gap-4">
                {[
                  { t: 'Una plaza por oficio y zona', d: 'Tu posición está protegida frente a la saturación.' },
                  { t: 'Recomendación contextual', d: 'Los aliados que te derivan saben dónde trabajas y cómo te mueves.' },
                  { t: 'Pertenencia real', d: 'Eres parte de la red local, no un perfil más en una base de datos.' },
                  { t: 'Oportunidades cercanas', d: 'Encargos que puedes atender hoy, no leads imposibles.' },
                ].map((b) => (
                  <div key={b.t} className="flex gap-3">
                    <MapPin className="h-5 w-5 mt-0.5 shrink-0" style={{ color: GREEN }} />
                    <div>
                      <div className="font-semibold">{b.t}</div>
                      <div className="text-sm text-white/65">{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <DensityMap />
            </div>
          </div>
        </div>
      </Section>

      {/* ============== 6. SCORE Y REPUTACIÓN ============== */}
      <Section className="py-20 md:py-24" id="score">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              La confianza no se dice, se demuestra.
            </h2>
            <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
              El Score RUANA es la memoria de la red. No suma likes ni conexiones. Suma recomendaciones concretas, encargos cerrados, devoluciones reales y participación constante. Es un número que los demás aliados pueden ver y que tú puedes mejorar con trabajo, no con palabras.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { t: 'Recomendaciones que cierran', d: '+10 puntos' },
                { t: 'Feedback positivo del cliente', d: '+5 puntos' },
                { t: 'Participación semanal', d: '+2 puntos' },
                { t: 'Incumplimiento o queja', d: '-15 puntos' },
              ].map((item) => (
                <div key={item.t} className="flex items-center justify-between rounded-lg border px-4 py-3"
                  style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.08)' }}>
                  <span className="text-white/80 text-sm">{item.t}</span>
                  <span className="text-sm font-semibold" style={{ color: GREEN }}>{item.d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              className="rounded-2xl border p-6 md:p-8"
              style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0,230,118,0.12)' }}>
                    <Activity className="h-5 w-5" style={{ color: GREEN }} />
                  </div>
                  <div>
                    <div className="font-semibold">Score RUANA</div>
                    <div className="text-xs text-white/50">Últimos 90 días</div>
                  </div>
                </div>
                <div className="text-2xl font-bold" style={{ color: GREEN }}>847</div>
              </div>
              <div className="space-y-4">
                {[
                  { l: 'Encargos cerrados', v: 78 },
                  { l: 'Recomendaciones hechas', v: 42 },
                  { l: 'Feedback positivo', v: 94 },
                ].map((bar) => (
                  <div key={bar.l}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-white/70">{bar.l}</span>
                      <span className="text-white font-medium">{bar.v}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${bar.v}%`, backgroundColor: GREEN }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============== 7. TRAZABILIDAD ============== */}
      <Section className="py-20 md:py-24" id="trazabilidad">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Trazabilidad total. Nada se pierde en un chat.
            </h2>
            <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
              En RUANA sabemos quién, qué, cuándo y cómo quedó. Cada recomendación deja huella: quién te pasó al cliente, qué encargo se cerró y qué tal salió.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: FileCheck2,
                t: 'Registro de cada referido',
                d: 'Sabes quién te recomendó, a quién, cuándo y con qué resultado.',
              },
              {
                icon: Eye,
                t: 'Historial visible',
                d: 'Tu actividad en la red la pueden ver los aliados con los que trabajas.',
              },
              {
                icon: ShieldCheck,
                t: 'Reputación con memoria',
                d: 'Lo que aportas suma. Quien rompe la confianza, queda registrado y pierde acceso.',
              },
            ].map(({ icon: Icon, t, d }) => (
              <div
                key={t}
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(0,230,118,0.12)' }}
                >
                  <Icon className="h-5 w-5" style={{ color: GREEN }} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============== 8. BENEFICIOS DEL ALIADO ============== */}
      <Section className="py-20 md:py-24" id="beneficios">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              ¿Qué ganas como aliado?
            </h2>
            <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
              RUANA no es otra red más. Es una forma distinta de conseguir y dar trabajo, pensada para quienes trabajan con las manos, con la cabeza y con la palabra.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                t: 'Recibes recomendaciones reales',
                d: 'Aliados de tu zona te pasan encargos que puedes atender. No leads fríos.',
              },
              {
                icon: TrendingUp,
                t: 'Tu nombre se construye con trabajo',
                d: 'Cuanto más participas y más cierras, más visible eres dentro de tu zona.',
              },
              {
                icon: Target,
                t: 'Pagas solo cuando cobras',
                d: 'Sin cuotas. Sin suscripciones. RUANA aplica un 12% solo sobre encargos cerrados por la red.',
              },
            ].map(({ icon: Icon, t, d }) => (
              <div
                key={t}
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(0,230,118,0.12)' }}
                >
                  <Icon className="h-5 w-5" style={{ color: GREEN }} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============== 9. COMPARATIVA ============== */}
      <Section className="py-20 md:py-24" id="comparativa">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08]">
              RUANA no es otra red más.
            </h2>
            <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
              <span className="block"><span className="text-white font-medium">LinkedIn:</span> para buscar trabajo en una empresa. No para que te llamen a ti.</span>
              <span className="block mt-2"><span className="text-white font-medium">Marketplaces:</span> pujas contra desconocidos por el precio más bajo.</span>
              <span className="block mt-2"><span className="text-white font-medium">WhatsApp / BNI:</span> grupos sin filtro, sin memoria y sin control de calidad.</span>
              <span className="block mt-2"><span className="text-white font-medium">RUANA:</span> acceso evaluado, organización por zona, reputación con historial y sin cuotas fijas.</span>
            </p>
          </div>

          <div
            className="rounded-2xl border overflow-hidden"
            style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base min-w-[720px]">
                <thead>
                  <tr className="text-left text-white/55 text-xs uppercase tracking-[0.14em]">
                    <th className="px-5 md:px-6 py-4 font-medium">Atributo</th>
                    <th className="px-5 md:px-6 py-4 font-medium" style={{ color: GREEN }}>RUANA</th>
                    <th className="px-5 md:px-6 py-4 font-medium">LinkedIn</th>
                    <th className="px-5 md:px-6 py-4 font-medium">Marketplaces</th>
                    <th className="px-5 md:px-6 py-4 font-medium">WhatsApp / BNI</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  {[
                    ['Acceso evaluado', true, false, false, 'partial'],
                    ['Organización por zona', true, false, 'partial', 'partial'],
                    ['Reputación medible', true, 'partial', 'partial', false],
                    ['Trazabilidad de recomendaciones', true, false, false, false],
                    ['Sin cuotas fijas', true, 'partial', false, false],
                    ['Foco en oportunidad real', true, false, 'partial', 'partial'],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-t"
                      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <td className="px-5 md:px-6 py-4 font-medium text-white">{row[0]}</td>
                      {row.slice(1).map((v, j) => (
                        <td key={j} className="px-5 md:px-6 py-4">
                          {v === true ? (
                            <CheckCircle2 className="h-5 w-5" style={{ color: GREEN }} />
                          ) : v === 'partial' ? (
                            <MinusCircle className="h-5 w-5 text-white/35" />
                          ) : (
                            <XCircle className="h-5 w-5 text-white/20" />
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
      </Section>

      {/* ============== 10. CASOS DE USO ============== */}
      <Section className="py-20 md:py-24" id="casos">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08]">
              Así empieza el cambio.
            </h2>
            <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed">
              Tres situaciones comunes en las que RUANA cambia las reglas del juego.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: UserCheck,
                t: 'Llegas a una zona nueva',
                d: 'No conoces a nadie. No tienes referidos. En RUANA, los aliados de tu código postal pueden empezar a pasarte trabajo real en cuanto te activan.',
              },
              {
                icon: Users,
                t: 'Eres autónomo establecido',
                d: 'Ya tienes clientes, pero quieres más predictibilidad. La red te da un canal de encargos calificados sin depender de anuncios o puertas frías.',
              },
              {
                icon: Quote,
                t: 'Necesitas un profesional de confianza',
                d: 'No quieres buscar en marketplaces. Quieres alguien que otro profesional ya ha probado. En RUANA lo encuentras por zona y oficio.',
              },
            ].map(({ icon: Icon, t, d }) => (
              <div
                key={t}
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(0,230,118,0.12)' }}
                >
                  <Icon className="h-5 w-5" style={{ color: GREEN }} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============== 11. ACCESO A LA RED ============== */}
      <Section className="py-20 md:py-24" id="acceso">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08]">
                ¿Cómo entro?
              </h2>
              <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed">
                Evaluamos cada solicitud. Plazas limitadas por zona. Sin cuotas fijas. Si hay sitio en tu oficio y tu código postal, te activamos. Si no, entras en lista de espera priorizada.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <RequestAccessButton
                  className="px-6 py-3.5 rounded-lg font-semibold text-base text-black transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,230,118,0.45)]"
                  style={{ backgroundColor: GREEN }}
                >
                  Solicitar acceso
                </RequestAccessButton>
                <a
                  href="https://ruana-4293f.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-lg font-semibold text-base border text-white hover:bg-white/[0.06] transition inline-flex items-center gap-2"
                  style={{ borderColor: 'rgba(0,230,118,0.45)', color: GREEN }}
                >
                  Ya tengo un código <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div
                className="rounded-2xl border p-7 md:p-8"
                style={{ backgroundColor: BG_ALT, borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="space-y-5">
                  {[
                    { t: 'Invitación o solicitud', d: 'Entras con código de un aliado o pides acceso directamente.' },
                    { t: 'Revisión humana', d: 'Miramos tu perfil, oficio, zona y si hay plaza libre.' },
                    { t: 'Plazas limitadas', d: 'Un titular por oficio y código postal. El resto, en suplencia.' },
                    { t: 'Compromiso con la red', d: 'Quien no participa o rompe la confianza, pierde el sitio.' },
                  ].map((step, i) => (
                    <div key={step.t} className="flex gap-4">
                      <div
                        className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: 'rgba(0,230,118,0.12)', color: GREEN }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{step.t}</div>
                        <div className="text-sm text-white/65 mt-0.5">{step.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-7 p-4 rounded-lg border text-sm flex items-start gap-3"
                  style={{
                    backgroundColor: 'rgba(0,230,118,0.06)',
                    borderColor: 'rgba(0,230,118,0.25)',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  <Building2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: GREEN }} />
                  <span>
                    Sin cuotas fijas. RUANA solo aplica un Apoyo del 12 % cuando cierras un encargo a través de la red.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============== 12. FAQ ============== */}
      <Section className="py-20 md:py-24" id="faq">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08]">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-white/60 text-base md:text-lg">
              Lo que suele preguntarse quien considera unirse.
            </p>
          </div>
          <div className="space-y-4">
            <FAQItem
              q="¿Quién puede entrar en RUANA?"
              a="Profesionales autónomos y pequeños negocios que ofrecen un servicio concreto, que trabajan en una zona definida y que están dispuestos a recomendar y ser recomendados de forma responsable."
            />
            <FAQItem
              q="¿Por qué hay plazas limitadas por oficio y zona?"
              a="Para proteger la calidad y el valor de cada recomendación. Si hay cinco fontaneros en la misma zona, nadie recibe trabajo de la red. La exclusividad hace que cada plaza cuente."
            />
            <FAQItem
              q="¿Qué pasa si mi zona ya tiene titular en mi oficio?"
              a="Entras como Suplente. Si el titular no cumple el compromiso, pierde la plaza y tú puedes ascender. También puedes cubrir encargos de otras zonas si te lo permite tu zona de actuación."
            />
            <FAQItem
              q="¿Cómo se calcula el Score RUANA?"
              a="A partir de recomendaciones reales, encargos cerrados, feedback de clientes y participación semanal en la red. No compras puntuación. La ganas con comportamiento."
            />
            <FAQItem
              q="¿Cuánto cuesta?"
              a="No hay cuota de entrada ni mensualidad. RUANA aplica un 12% sobre el valor del encargo cuando cierras un trabajo a través de la red. Si no recibes, no pagas."
            />
          </div>
        </div>
      </Section>

      {/* ============== 13. CTA FINAL ============== */}
      <Section className="py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(0,230,118,0.12), transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(0,230,118,0.06), transparent 50%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
          <div className="h-40 md:h-52 mb-10">
            <HeroNetwork />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            Construye tu futuro profesional con quienes están al lado.
          </h2>
          <p className="mt-5 text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Plazas limitadas por zona. Acceso evaluado. Sin cuotas fijas. Si crees que RUANA encaja con lo que haces, pide acceso o entra con tu código de aliado.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <RequestAccessButton
              className="px-7 py-3.5 rounded-lg font-semibold text-base text-black transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,230,118,0.45)]"
              style={{ backgroundColor: GREEN }}
            >
              Solicitar acceso
            </RequestAccessButton>
            <a
              href="https://ruana-4293f.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-lg font-semibold text-base border text-white hover:bg-white/[0.06] transition inline-flex items-center gap-2"
              style={{ borderColor: 'rgba(0,230,118,0.45)', color: GREEN }}
            >
              Ya tengo un código <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Section>

      <LandingFooter />
    </div>
  );
}
