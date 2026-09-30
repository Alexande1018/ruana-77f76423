import { motion, useReducedMotion } from 'framer-motion';

const MOMENTS = [
  { from: 'Fontanero', to: 'Electricista', short: 'reforma de baño', text: 'Le piden una reforma de baño. Necesita a alguien de confianza y se lo pasa a un aliado de su grupo.' },
  { from: 'Electricista', to: 'Pintor', short: 'el cliente pregunta', text: 'Termina una instalación. El cliente pregunta por un pintor. Tiene a alguien de la red a mano.' },
  { from: 'Pintor', to: 'Carpintero', short: 'mobiliario a medida', text: 'Un encargo pide mobiliario a medida. Conoce a un carpintero de su zona y cierran el trabajo entre los dos.' },
];

export function LandingAllyExamples() {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="lp-paper lp-torn lp-example-sheet -rotate-1">
        <ol className="lp-example-list relative z-[1]">
          {MOMENTS.map((m, i) => (
            <motion.li
              key={`${m.from}-${m.to}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lp-example-row"
            >
              <span className="lp-example-number">{i + 1}</span>
              <div>
                <p className="lp-example-title">{m.from} → {m.to}</p>
                <p className="sr-only">{m.text}</p>
                <p className="lp-example-caption">— {m.short}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
      <p className="mt-4 text-[15px] lp-example-close">
        <span className="font-semibold" style={{ color: '#22c55e' }}>
          No es un anuncio.
        </span>{' '}
        <span className="text-white/70">Es un profesional de tu grupo que te nombra.</span>
      </p>
    </div>
  );
}
