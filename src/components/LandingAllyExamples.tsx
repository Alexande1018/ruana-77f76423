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
    <div className="max-w-xl ml-auto">
      <div className="bg-[#1a1b19] border border-white/10 p-4 md:p-5">
        <ol>
          {MOMENTS.map((m, i) => (
            <motion.li
              key={`${m.from}-${m.to}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: reduce ? 0 : i * 0.08, duration: reduce ? 0.2 : 0.5 }}
              className="bg-[#efe6d4] text-[#1a1814] p-4 mb-3 last:mb-0"
              style={{ transform: i === 1 ? 'rotate(0.6deg)' : 'rotate(-0.4deg)' }}
            >
              <p className="text-sm font-medium mb-1">
                <span className="tabular-nums mr-2" style={{ color: GREEN }}>{i + 1}</span>
                <span>{m.from}</span>
                <span className="mx-2 opacity-50">pasa el trabajo a</span>
                <span>{m.to}</span>
              </p>
              <p className="text-[15px] leading-relaxed">{m.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
      <p className="mt-6 text-sm text-white/55">
        No es un anuncio. Es un profesional de tu grupo que te nombra.
      </p>
    </div>
  );
}
