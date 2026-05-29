import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, animate, type Variants } from 'framer-motion';
import {
  Lock,
  MapPin,
  Star,
  Wrench,
  Zap,
  HardHat,
  Leaf,
  Car,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Gift,
  Link2,
} from 'lucide-react';
import { LandingNavbar, LandingFooter, BG, BG_ALT, GREEN, GREEN_DARK } from '@/components/LandingChrome';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toString() + suffix);
  const [text, setText] = useState('0' + suffix);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: 'easeOut' });
    const unsub = rounded.on('change', (v) => setText(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, mv, rounded]);

  return <span ref={ref}>{text}</span>;
}

function NodesBackdrop() {
  const nodes = [
    [10, 20], [30, 12], [55, 28], [78, 15], [92, 36],
    [18, 52], [42, 60], [68, 48], [85, 70],
    [22, 82], [48, 88], [72, 80],
  ];
  const links: [number, number][] = [
    [0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[6,7],[7,4],[7,8],[6,9],[9,10],[10,11],[11,8],[5,9],[1,5],[6,2],
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={GREEN} strokeOpacity="0.25" strokeWidth="0.2" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="1.6" fill={GREEN} fillOpacity="0.15" />
          <circle cx={x} cy={y} r="0.7" fill={GREEN} />
        </g>
      ))}
    </svg>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <LandingNavbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <NodesBackdrop />
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 30%, rgba(0,230,118,0.12), transparent 60%)` }} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm mb-6 border"
              style={{ borderColor: 'rgba(0,230,118,0.35)', backgroundColor: 'rgba(0,230,118,0.08)', color: GREEN }}>
              <Lock className="h-3.5 w-3.5" /> Acceso solo por invitación
            </div>
            <h1 className="font-bold leading-[1.05] tracking-tight text-[38px] md:text-[56px] lg:text-[64px]">
              La red profesional que trabaja por ti —{' '}
              <span style={{ color: GREEN }}>solo para quienes son invitados</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              RUANA conecta a profesionales de confianza en tu zona. Sin ruido. Sin competencia desleal.
              Solo aliados que se respaldan entre sí.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/register"
                className="px-6 py-3.5 rounded-lg font-semibold text-base text-black transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,230,118,0.4)]"
                style={{ backgroundColor: GREEN }}>
                Solicitar código de acceso
              </Link>
              <a href="#como-funciona"
                className="px-6 py-3.5 rounded-lg font-semibold text-base border border-white/70 text-white hover:bg-white/10 transition-all duration-200">
                Ver cómo funciona
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ¿QUÉ ES RUANA? */}
      <Section className="py-16" id="que-es">
        <div style={{ backgroundColor: BG_ALT }} className="py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Una red cerrada. Una comunidad real.
              </h2>
              <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
                RUANA es una plataforma privada donde profesionales de distintos oficios se agrupan por zonas geográficas.
                Cada miembro tiene un perfil verificado, un Score de reputación y acceso a una red de aliados que se
                recomiendan mutuamente trabajo.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Lock, title: 'Red Privada', desc: 'Entras solo con código de aliado o invitación de alguien de la red.' },
                { icon: MapPin, title: 'Por zonas', desc: 'Grupos organizados por código postal. Tu comunidad, cerca de ti.' },
                { icon: Star, title: 'Score de reputación', desc: 'Tu historial de respuestas y referencias construye tu reputación en la red.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl p-6 border transition hover:-translate-y-1"
                  style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: 'rgba(0,230,118,0.12)' }}>
                    <Icon className="h-6 w-6" style={{ color: GREEN }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ¿CÓMO FUNCIONA? */}
      <Section className="py-16" id="como-funciona">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Así funciona RUANA</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {[
              { n: 1, title: 'Recibes un código de invitación', desc: 'Un aliado activo te invita a la red.' },
              { n: 2, title: 'Creas tu perfil de aliado', desc: 'Registra tu oficio, zona y descripción de tu servicio.' },
              { n: 3, title: 'Accedes al directorio privado', desc: 'Busca y contacta a profesionales verificados de tu grupo.' },
              { n: 4, title: 'La red trabaja para ti', desc: 'Cuando alguien del grupo necesita tu oficio, apareces tú primero.' },
            ].map((s, i, arr) => (
              <div key={s.n} className="relative">
                <div className="text-5xl md:text-6xl font-extrabold mb-4 leading-none" style={{ color: GREEN }}>
                  {String(s.n).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{s.desc}</p>
                {i < arr.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-3 h-5 w-5 text-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PARA QUIÉN ES */}
      <Section className="py-16" id="para-quien">
        <div style={{ backgroundColor: BG_ALT }} className="py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Si trabajas con tus manos o tu talento, RUANA es para ti
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: Wrench, name: 'Fontanería' },
                { icon: Zap, name: 'Electricidad' },
                { icon: HardHat, name: 'Construcción' },
                { icon: Leaf, name: 'Jardinería' },
                { icon: Car, name: 'Mecánica' },
                { icon: Briefcase, name: 'Consultoría' },
              ].map(({ icon: Icon, name }) => (
                <div key={name}
                  className="rounded-2xl p-6 flex items-center gap-4 border transition hover:border-[rgba(0,230,118,0.4)]"
                  style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.06)' }}>
                  <Icon className="h-7 w-7" style={{ color: GREEN }} />
                  <span className="font-semibold">{name}</span>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-white/60">Y más de 39 oficios disponibles en la red</p>
          </div>
        </div>
      </Section>

      {/* VENTAJAS */}
      <Section className="py-16" id="ventajas">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Por qué RUANA es diferente</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { vs: 'vs. Wallapop / InfoJobs', text: 'No eres uno más entre miles. Aquí tu plaza está protegida.' },
              { vs: 'vs. grupos de WhatsApp', text: 'Trazabilidad, historial y reputación. Todo organizado.' },
              { vs: 'vs. redes sociales', text: 'Sin algoritmos. Sin publicidad. Solo tu red de aliados.' },
            ].map((c) => (
              <div key={c.vs} className="rounded-2xl p-7 border h-full"
                style={{ backgroundColor: BG_ALT, borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="text-sm font-semibold mb-3" style={{ color: GREEN }}>{c.vs}</div>
                <p className="text-lg leading-snug">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* STATS */}
      <Section className="py-16">
        <div style={{ backgroundColor: GREEN_DARK }} className="py-14">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {[
                { value: 11, suffix: '+', label: 'Aliados activos' },
                { value: 3, suffix: '', label: 'Grupos territoriales' },
                { value: 39, suffix: '', label: 'Oficios disponibles' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-5xl md:text-6xl font-extrabold" style={{ color: GREEN }}>
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-white/80 text-sm md:text-base">{s.label}</div>
                </div>
              ))}
              <div>
                <div className="text-2xl md:text-3xl font-bold" style={{ color: GREEN }}>En tiempo real</div>
                <div className="mt-2 text-white/80 text-sm md:text-base">Score de reputación</div>
              </div>
            </div>
            <p className="text-center mt-10 text-white/70">
              Red en crecimiento. Las plazas por zona son limitadas.
            </p>
          </div>
        </div>
      </Section>

      {/* BENEFICIOS DEL SCORE RUANA */}
      <Section className="py-16" id="score">
        <div style={{ backgroundColor: BG, borderTop: '1px solid rgba(0,230,118,0.18)' }} className="py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Tu Score RUANA trabaja para ti
              </h2>
              <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
                Cuanto más activo seas en la red, mayor será tu reputación — y mayores serán tus ventajas.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, emoji: '📈', title: 'Mayor visibilidad', desc: 'Los aliados con mejor score aparecen primero en el directorio cuando alguien busca tu oficio.' },
                { icon: Gift, emoji: '🎁', title: 'Beneficios exclusivos', desc: 'A medida que crezcas en la red, accederás a ventajas y recompensas reservadas para los aliados más comprometidos. Próximamente.' },
                { icon: Link2, emoji: '🔗', title: 'Más conexiones', desc: 'Un score alto genera confianza. Los demás aliados prefieren trabajar con quienes tienen historial probado.' },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="rounded-2xl p-6 border transition hover:-translate-y-1"
                  style={{ backgroundColor: BG_ALT, borderColor: 'rgba(0,230,118,0.18)' }}>
                  <div className="text-3xl mb-4">{emoji}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-10 text-sm" style={{ color: GREEN }}>
              ⭐ El Score RUANA se construye con cada solicitud atendida, referido activo y valoración recibida.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section className="py-24">
        <div className="max-w-5xl mx-auto px-5 md:px-8 text-center rounded-3xl py-20"
          style={{ background: `linear-gradient(135deg, ${BG} 0%, ${GREEN_DARK} 100%)` }}>
          <ShieldCheck className="mx-auto h-12 w-12 mb-6" style={{ color: GREEN }} />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            ¿Tienes un código de invitación?
          </h2>
          <p className="mt-5 text-white/75 text-lg">Entra ahora y activa tu perfil de aliado.</p>
          <div className="mt-10">
            <a href="https://ruana-4293f.web.app/"
              className="inline-block px-8 py-4 rounded-lg font-semibold text-base text-black transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,230,118,0.4)]"
              style={{ backgroundColor: GREEN }}>
              Entrar con mi código
            </a>
          </div>
          <div className="my-10 flex items-center gap-4 max-w-md mx-auto text-white/50 text-sm">
            <div className="flex-1 h-px bg-white/15" />
            <span>¿Aún no tienes código?</span>
            <div className="flex-1 h-px bg-white/15" />
          </div>
          <Link to="/register"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-base border border-white/70 text-white hover:bg-white/10 transition-all duration-200">
            Solicitar acceso a la red
          </Link>
        </div>
      </Section>

      <LandingFooter />
    </div>
  );
}
