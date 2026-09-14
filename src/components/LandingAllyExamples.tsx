import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';

const MOMENTS = [
  {
    from: 'Fontanero',
    to: 'Electricista',
    text: 'Le piden una reforma de baño. Necesita a alguien de confianza y se lo pasa a un aliado de su grupo.',
  },
  {
    from: 'Electricista',
    to: 'Pintor',
    text: 'Termina una instalación. El cliente pregunta por un pintor. Tiene a alguien de la red a mano.',
  },
  {
    from: 'Pintor',
    to: 'Carpintero',
    text: 'Un encargo pide mobiliario a medida. Conoce a un carpintero de su zona y cierran el trabajo entre los dos.',
  },
];

export function LandingAllyExamples() {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="relative">
        <span
          aria-hidden
          className="absolute left-[11px] md:left-[15px] top-3 bottom-3 w-px hidden sm:block"
          style={{ background: `linear-gradient(${GREEN}, rgba(0,230,118,0.08))` }}
        />
        <ol className="space-y-0">
          {MOMENTS.map((m, i) => (
            <motion.li
              key={`${m.from}-${m.to}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: reduce ? 0 : i * 0.08, duration: reduce ? 0.2 : 0.5 }}
              className="relative sm:pl-12 py-5 md:py-6 border-t last:border-b"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <span
                aria-hidden
                className="hidden sm:grid absolute left-0 top-7 h-8 w-8 place-items-center rounded-full text-[11px] font-semibold"
                style={{
                  backgroundColor: 'rgba(0,230,118,0.12)',
                  color: GREEN,
                  border: '1px solid rgba(0,230,118,0.28)',
                }}
              >
                {i + 1}
              </span>
              <p className="text-sm font-medium mb-2">
                <span className="text-white/90">{m.from}</span>
                <span className="mx-2 text-white/30">pasa el trabajo a</span>
                <span style={{ color: GREEN }}>{m.to}</span>
              </p>
              <p className="text-[15px] md:text-base text-white/65 leading-relaxed max-w-xl">{m.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
      <p className="mt-6 text-sm text-white/45">
        No es un anuncio. Es un profesional de tu grupo que te nombra.
      </p>
    </div>
  );
}
