import type { ComponentType } from 'react';
import { LandingNavbar, LandingFooter } from '@/components/LandingChrome';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';
import {
  BoltGlyph,
  BrickGlyph,
  BroomGlyph,
  MoreGlyph,
  PaintbrushGlyph,
  SnowflakeGlyph,
  TreeGlyph,
  WrenchGlyph,
} from '@/components/LandingIcons';

const STEPS = [
  {
    title: 'Te llega un encargo que no haces',
    body: 'Un cliente te pide algo fuera de tu oficio. En vez de decir que no y ya está, lo pasas.',
  },
  {
    title: 'Se lo pasas a alguien de tu zona',
    body: 'A un colega de tu código postal que sí lo hace. Gente de oficio, no un directorio frío.',
  },
  {
    title: 'Cuando le pidan lo tuyo, te llama',
    body: 'El favor vuelve. Eso es RUANA: oficios de Alicante pasándose encargos.',
  },
];

const TRADES: { label: string; Icon: ComponentType<{ className?: string }> }[] = [
  { label: 'Fontanería', Icon: WrenchGlyph },
  { label: 'Electricidad', Icon: BoltGlyph },
  { label: 'Pintura', Icon: PaintbrushGlyph },
  { label: 'Reformas', Icon: BrickGlyph },
  { label: 'Clima', Icon: SnowflakeGlyph },
  { label: 'Jardinería', Icon: TreeGlyph },
  { label: 'Limpieza', Icon: BroomGlyph },
  { label: 'Más oficios', Icon: MoreGlyph },
];

function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1080px] px-5 ${className}`}>{children}</div>;
}

function TradeTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[104px] w-[104px] items-center justify-center rounded-[22px] border-[3px] border-[#6DC41F] bg-[#141820] sm:h-[120px] sm:w-[120px]">
      {children}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0D12] text-[#F5F7F2]">
      <LandingNavbar />

      <section
        className="relative overflow-hidden pt-10 md:pt-14"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 70% 18%, rgba(109,196,31,.22), transparent 60%), linear-gradient(180deg, #0A0D12 0%, #10151c 100%)',
        }}
      >
        <Wrap>
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#8BD450]">
            Oficios de Alicante · por código postal
          </p>
          <h1 className="max-w-[18em] font-display text-[clamp(32px,7vw,56px)] font-extrabold leading-[1.05] tracking-tight">
            Pasa el encargo que no haces.
            <span className="mt-1 block text-[#8BD450]">Recibe el que sí.</span>
          </h1>
          <p className="mt-4 max-w-[34em] text-lg leading-relaxed text-[#d7dde3]">
            ¿Eres fontanero y te piden pintar? Se lo pasas a un pintor de tu zona. Y cuando a él le pidan lo tuyo, te llama a ti.
          </p>
          <div className="mt-7 flex flex-col items-start">
            <PrimaryCTA />
            <p className="mt-2.5 text-sm text-[#9AA3AD]">Apuntarse no tiene cuota.</p>
            <p className="mt-3.5">
              <CodeLink />
            </p>
          </div>
          <div className="mt-9 flex items-center justify-start gap-3 sm:gap-[18px] md:justify-center" aria-hidden="true">
            <TradeTile>
              <WrenchGlyph className="h-12 w-12 sm:h-14 sm:w-14" />
            </TradeTile>
            <span className="text-[28px] font-black text-[#8BD450]">→</span>
            <TradeTile>
              <PaintbrushGlyph className="h-12 w-12 sm:h-14 sm:w-14" />
            </TradeTile>
          </div>
          <p className="mt-5 pb-8 text-sm text-[#9AA3AD] md:pb-10">
            Estamos formando los primeros grupos en Alicante.
          </p>
        </Wrap>
        <div
          aria-hidden="true"
          className="h-16 bg-[#F5F7F2] md:h-24"
          style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}
        />
      </section>

      <section id="como" className="bg-[#F5F7F2] pb-14 pt-2 text-[#12161c] md:pb-20 md:pt-4">
        <Wrap>
          <h2 className="mb-7 font-display text-[clamp(26px,5vw,36px)] font-extrabold tracking-tight">Cómo funciona</h2>
          <div className="grid gap-[18px] md:grid-cols-3">
            {STEPS.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-[#e3e8df] bg-[#f3f5f1] p-[22px]">
                <div
                  aria-hidden="true"
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#6DC41F] font-display text-sm font-extrabold text-[#0A0D12]"
                >
                  {index + 1}
                </div>
                <h3 className="mb-2 font-display text-lg font-extrabold leading-snug">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#3a4450]">{step.body}</p>
              </article>
            ))}
          </div>
        </Wrap>
      </section>

      <section id="oficios" className="bg-[#0A0D12] py-14 md:py-20">
        <Wrap>
          <h2 className="mb-7 font-display text-[clamp(26px,5vw,36px)] font-extrabold tracking-tight">
            Oficios que encajan
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {TRADES.map(({ label, Icon }) => (
              <div
                key={label}
                className="rounded-[14px] border border-[#243040] bg-[#141820] px-3.5 py-[18px] text-center text-sm font-bold"
              >
                <Icon className="mx-auto mb-2 h-10 w-10" />
                {label}
              </div>
            ))}
          </div>
          <p className="mt-[18px] text-center text-sm text-[#9AA3AD]">
            Estamos formando los primeros grupos. Si tu oficio no está en la lista, apúntate igual.
          </p>
        </Wrap>
      </section>

      <section
        id="apuntate"
        className="px-5 py-16 text-center md:py-20"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,13,18,.55), rgba(10,13,18,.85)), radial-gradient(ellipse at 50% 0%, rgba(109,196,31,.25), transparent 55%), #141820',
        }}
      >
        <div className="mx-auto max-w-[1080px]">
          <h2 className="font-display text-[clamp(28px,5vw,40px)] font-extrabold leading-tight tracking-tight">
            Súmate a los primeros grupos de tu zona
          </h2>
          <p className="mx-auto mb-6 mt-3 max-w-[28em] text-[#c9d0d7]">
            Oficios de Alicante, por código postal. Apuntarse no tiene cuota.
          </p>
          <PrimaryCTA />
          <p className="mt-3.5">
            <CodeLink />
          </p>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
