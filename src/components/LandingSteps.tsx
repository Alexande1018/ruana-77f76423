import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';

const STEPS = [
  {
    n: '01',
    title: 'Encuentra tu grupo',
    text: 'RUANA te ubica según tu zona y tu actividad profesional.',
    img: '/landing/grok_1790779246688.jpg',
  },
  {
    n: '02',
    title: 'Ocupa tu plaza profesional',
    text: 'Forma parte del grupo como el profesional de tu oficio.',
    img: '/landing/grok_1790779216851.jpg',
  },
  {
    n: '03',
    title: 'Entra en la rueda',
    text: 'Recomienda profesionales de confianza y recibe oportunidades cuando alguien necesite lo que tú haces.',
    img: '/landing/grok_1790779232217.jpg',
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

      <ol className="lp-step-scatter relative">
        {STEPS.map((step, i) => (
          <motion.li
            key={step.n}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: reduce ? 0 : i * 0.07, duration: 0.45 }}
            className="lp-step-piece"
          >
            <img src={step.img} alt="" className="lp-step-photo" />
            <div className={`lp-paper lp-torn lp-step-note lp-step-note-${i + 1}`}>
              <div className="flex gap-3 relative z-[1]">
                <span className="text-xl font-semibold tabular-nums" style={{ color: GREEN }}>{step.n}</span>
                <div>
                  <h3 className="text-xl font-medium" style={{ fontFamily: 'Patrick Hand, cursive' }}>{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed opacity-80">{step.text}</p>
                </div>
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
