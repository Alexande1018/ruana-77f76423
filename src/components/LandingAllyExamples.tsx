import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';

const MOMENTS = [
  {
    from: 'Fontanero',
    to: 'Electricista',
    text: 'Le piden una reforma de baño. Necesita a alguien de confianza y se lo pasa a un aliado de su grupo.',
    short: 'reforma de baño',
  },
  {
    from: 'Electricista',
    to: 'Pintor',
    text: 'Termina una instalación. El cliente pregunta por un pintor. Tiene a alguien de la red a mano.',
    short: 'el cliente pregunta',
  },
  {
    from: 'Pintor',
    to: 'Carpintero',
    text: 'Un encargo pide mobiliario a medida. Conoce a un carpintero de su zona y cierran el trabajo entre los dos.',
    short: 'mobiliario a medida',
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
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: reduce ? 0 : i * 0.08, duration: reduce ? 0.2 : 0.5 }}
              className="lp-ticket lp-paper"
              style={{ transform: i === 1 ? 'rotate(0.7deg)' : i === 2 ? 'rotate(-0.5deg)' : 'rotate(-0.8deg)' }}
            >
              <span className="lp-tape" style={{ top: -7, left: 18, width: 48 }} />
              <p className="text-sm font-medium mb-1 relative z-[1]">
                <span className="tabular-nums mr-2 font-bold" style={{ color: GREEN }}>
                  {i + 1}
                </span>
                <span>{m.from}</span>
                <span className="mx-2 opacity-50">pasa el trabajo a</span>
                <span>{m.to}</span>
              </p>
              <p className="text-[15px] leading-relaxed relative z-[1]">{m.text}</p>
              <p className="mt-1 text-sm opacity-60 relative z-[1]">— {m.short}</p>
            </motion.li>
          ))}
        </ol>
      </div>
      <p className="mt-5 text-sm md:text-base" style={{ color: GREEN }}>
        No es un anuncio.
        <span className="text-white/55"> Es un profesional de tu grupo que te nombra.</span>
      </p>
    </div>
  );
}
