import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';

const OTHERS = [
  {
    label: 'WhatsApp',
    text: 'Muchos contactos. Poca estructura.',
  },
  {
    label: 'Directorios',
    text: 'Muchos profesionales. Poca relación entre ellos.',
  },
  {
    label: 'Plataformas de leads',
    text: 'Varios profesionales pagando por competir por el mismo cliente.',
  },
];

export function LandingCompare() {
  const reduce = useReducedMotion();

  return (
    <div className="max-w-5xl">
      <h2
        className="text-2xl md:text-3xl tracking-tight mb-3"
        style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
      >
        No es otro sitio donde comprar clientes.
      </h2>
      <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
        RUANA no sustituye tu WhatsApp ni te vende una lista. Organiza a profesionales de una zona
        para que las recomendaciones dejen de perderse.
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        {OTHERS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reduce ? 0 : i * 0.06, duration: 0.4 }}
            className="p-5 bg-white/[0.03] border-l-2 border-white/15"
          >
            <p className="text-sm font-medium text-white/40">{item.label}</p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: reduce ? 0 : 0.18, duration: 0.5 }}
          className="md:col-span-2 mt-2 bg-[#efe6d4] text-[#1a1814] px-5 py-6 sm:px-7 sm:py-7"
        >
          <p className="text-sm font-semibold mb-2" style={{ color: '#1d5c3a' }}>
            RUANA
          </p>
          <p className="text-lg md:text-xl leading-snug">
            Profesionales locales que se conocen, construyen reputación y se recomiendan
            oportunidades.
          </p>
          <p className="mt-4 text-sm opacity-70">Apuntarse no tiene cuota.</p>
        </motion.div>
      </div>
    </div>
  );
}
