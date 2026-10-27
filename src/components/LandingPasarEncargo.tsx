import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GREEN } from '@/lib/landingTheme';

export const PASAR_ENCARGO_TITLE = '¿Te ha salido un encargo que no puedes coger?';
export const PASAR_ENCARGO_BUTTON = 'Pásaselo a un colega';

export function LandingPasarEncargo() {
  return (
    <section id="pasar-encargo" className="scroll-mt-20 pt-10 md:pt-14">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8 border border-white/10 p-6 md:px-10 md:py-7"
          style={{ backgroundColor: '#0a100d' }}
        >
          <div className="max-w-xl">
            <h2
              className="text-2xl md:text-[28px] leading-[1.15] tracking-tight"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
            >
              {PASAR_ENCARGO_TITLE}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-white/80">
              Escribe el oficio y la zona, y te dejamos el mensaje de WhatsApp listo para mandárselo.
            </p>
          </div>
          <Link
            to="/pasar-encargo"
            className={[
              'group inline-flex shrink-0 items-center justify-center gap-2 min-h-12 px-5 text-[15px] md:text-base font-semibold',
              'rounded-lg border hover:bg-white/10 transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ED400]',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117]',
            ].join(' ')}
            style={{ borderColor: GREEN, color: GREEN }}
          >
            {PASAR_ENCARGO_BUTTON}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </div>
      </div>
    </section>
  );
}
