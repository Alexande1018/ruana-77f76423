import { motion, useReducedMotion } from 'framer-motion';

const MOMENTS = [
  {
    from: 'Fontanero',
    to: 'Electricista',
    short: 'reforma de baño',
    text: 'Le piden una reforma de baño. Necesita a alguien de confianza y se lo pasa a un aliado de su grupo.',
  },
  {
    from: 'Electricista',
    to: 'Pintor',
    short: 'el cliente pregunta',
    text: 'Termina una instalación. El cliente pregunta por un pintor. Tiene a alguien de la red a mano.',
  },
  {
    from: 'Pintor',
    to: 'Carpintero',
    short: 'mobiliario a medida',
    text: 'Un encargo pide mobiliario a medida. Conoce a un carpintero de su zona y cierran el trabajo entre los dos.',
  },
];

export function LandingAllyExamples() {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="lp-clipboard">
        <ol>
          {MOMENTS.map((m, i) => (
            <motion.li
              key={`${m.from}-${m.to}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: reduce ? 0 : i * 0.08, duration: reduce ? 0.2 : 0.45 }}
              className="lp-ticket lp-paper lp-torn"
              style={{
                transform: i === 1 ? 'rotate(1.4deg)' : i === 2 ? 'rotate(-1.1deg)' : 'rotate(-0.8deg)',
              }}
            >
              <span className="lp-tape" style={{ top: -8, left: 22, width: 56 }} />
              <p className="relative z-[1]" style={{ color: '#1a1814' }}>
                <span className="font-bold mr-2 lp-mint">{i + 1}</span>
                <span className="font-semibold">{m.from}</span>
                <span className="opacity-60"> pasa el trabajo a </span>
                <span className="font-semibold">{m.to}</span>
              </p>
              <p className="sr-only">{m.text}</p>
              <p className="mt-1 relative z-[1]" style={{ color: '#3b3328' }}>
                — {m.short}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
      <p className="mt-5 text-sm md:text-base lp-mint">
        No es un anuncio.{' '}
        <span className="text-white/60">Es un profesional de tu grupo que te nombra.</span>
      </p>
    </div>
  );
}
