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
    <div className="max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
        No es otro sitio donde comprar clientes.
      </h2>
      <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
        RUANA no sustituye tu WhatsApp ni te vende una lista. Organiza a profesionales de una zona
        para que las recomendaciones dejen de perderse.
      </p>

      <div className="space-y-3">
        {OTHERS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reduce ? 0 : i * 0.06, duration: 0.4 }}
            className="grid sm:grid-cols-[140px_1fr] gap-1 sm:gap-6 px-1 py-3 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <p className="text-sm font-medium text-white/40 pt-0.5">{item.label}</p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: reduce ? 0 : 0.18, duration: 0.5 }}
          className="mt-2 rounded-xl border px-5 py-5 sm:px-6 sm:py-6"
          style={{
            borderColor: 'rgba(0,230,118,0.32)',
            backgroundColor: 'rgba(0,230,118,0.06)',
          }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: GREEN }}>
            RUANA
          </p>
          <p className="text-lg md:text-xl text-white leading-snug">
            Profesionales locales que se conocen, construyen reputación y se recomiendan
            oportunidades.
          </p>
          <p className="mt-4 text-sm text-white/55 leading-relaxed">
            Sin cuota mensual. Un apoyo del 12% solo si cierras un encargo que te llegó por la red.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
