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
      <div className="lp-clipboard">
        <ol>
          {MOMENTS.map((m, i) => (
            <motion.li
              key={`${m.from}-${m.to}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : i * 0.06 }}
              className="lp-ticket lp-paper lp-torn mb-2 px-4 py-3"
              style={{ transform: i === 1 ? 'rotate(0.8deg)' : 'rotate(-0.6deg)' }}
            >
              <span className="lp-tape" style={{ top: -7, left: 28, width: 58 }} />
              <p className="relative z-[1] text-[15px]" style={{ color: '#161410' }}>
                <span className="lp-mint font-bold mr-1">{i + 1}</span>
                {m.from} pasa el trabajo a {m.to}
              </p>
              <p className="sr-only">{m.text}</p>
              <p className="relative z-[1] text-[14px] mt-1" style={{ color: '#161410' }}>
                — {m.short}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
      <p className="mt-4 text-[15px]">
        <span className="lp-mint font-semibold">No es un anuncio.</span>{' '}
        <span className="text-white/70">Es un profesional de tu grupo que te nombra.</span>
      </p>
    </div>
  );
}
