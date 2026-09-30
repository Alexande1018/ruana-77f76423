import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';

const STEPS = [
  {
    n: '01',
    title: 'Encuentra tu grupo',
    text: 'RUANA te ubica según tu zona y tu actividad profesional.',
    img: 'https://images.unsplash.com/photo-1524661132064-ba19655ce54b?auto=format&fit=crop&w=800&q=80',
  },
  {
    n: '02',
    title: 'Ocupa tu plaza profesional',
    text: 'Forma parte del grupo como el profesional de tu oficio.',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  },
  {
    n: '03',
    title: 'Entra en la rueda',
    text: 'Recomienda profesionales de confianza y recibe oportunidades cuando alguien necesite lo que tú haces.',
    img: 'https://images.unsplash.com/photo-1504148455728-c1f2856e03fa?auto=format&fit=crop&w=800&q=80',
  },
];

export function LandingSteps() {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="max-w-xl mb-10 md:mb-12">
        <h2 className="text-2xl md:text-3xl tracking-tight" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
          Cómo entrar
        </h2>
        <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed">
          No te apuntas a un listado. Pides ocupar la plaza de tu oficio en el grupo de tu zona.
        </p>
      </div>

      <ol className="grid md:grid-cols-3 gap-4">
        {STEPS.map((step, i) => (
          <motion.li
            key={step.n}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: reduce ? 0 : i * 0.07, duration: 0.45 }}
            className="flex flex-col bg-[#161716] border border-white/10 overflow-hidden"
          >
            <img src={step.img} alt="" className="w-full h-36 object-cover" />
            <div className="p-5 flex gap-3">
              <span className="text-sm font-semibold tabular-nums" style={{ color: GREEN }}>
                {step.n}
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-[15px] md:text-base text-white/65 leading-relaxed">{step.text}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <PrimaryCTA className="rounded-full" />
        <CodeLink />
      </div>
    </div>
  );
}
