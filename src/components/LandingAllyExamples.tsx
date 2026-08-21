import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { GREEN } from '@/lib/landingTheme';

const EXAMPLES = [
  {
    from: 'Fontanero',
    to: 'Electricista',
    text: 'Le piden una reforma de baño. Necesita a alguien de confianza y se lo pasa a un aliado de su zona.',
  },
  {
    from: 'Electricista',
    to: 'Pintor',
    text: 'Termina una instalación. El cliente pregunta por un pintor. Tiene a alguien de la red a mano.',
  },
  {
    from: 'Pintor',
    to: 'Carpintero',
    text: 'Un encargo pide mobiliario a medida. Conoce a un carpintero de su calle y cierran el trabajo entre los dos.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function LandingAllyExamples() {
  return (
    <div className="grid md:grid-cols-3 gap-5 md:gap-6">
      {EXAMPLES.map((ex, i) => (
        <motion.article
          key={ex.from}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="rounded-xl border p-6 transition-colors duration-300 hover:border-[rgba(0,230,118,0.28)]"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(22,27,34,0.55)',
          }}
        >
          <div className="flex items-center gap-2 text-sm font-medium mb-4">
            <span className="text-white/90">{ex.from}</span>
            <span className="text-white/30">→</span>
            <span style={{ color: GREEN }}>{ex.to}</span>
          </div>
          <p className="text-[15px] text-white/70 leading-relaxed">{ex.text}</p>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-white/40">
            <MapPin className="h-3.5 w-3.5" /> En tu zona
          </p>
        </motion.article>
      ))}
    </div>
  );
}
