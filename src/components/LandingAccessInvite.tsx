import { GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink, HaveCodeLink } from '@/components/LandingCTA';
import { PUBLIC_ACCESS_CODE } from '@/lib/inauguralPhase';

export function LandingAccessInvite() {
  return (
    <section id="acceso" className="scroll-mt-20 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl border border-white/10 p-7 md:p-10" style={{ backgroundColor: '#0a100d' }}>
          <h2
            className="text-2xl md:text-[32px] leading-[1.15] tracking-tight"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            Los que abren el grupo entran con un código.
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-white/85">
            Si te lo han pasado, úsalo aquí. Luego la puerta cambia: solo entra quien invita un aliado
            que ya está dentro.
          </p>
          <span className="sr-only">{PUBLIC_ACCESS_CODE}</span>
          <p className="mt-4 text-sm text-white/80">Apuntarse no tiene cuota.</p>
          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
            <PrimaryCTA />
            <HaveCodeLink />
            <CodeLink />
          </div>
        </div>
      </div>
    </section>
  );
}
