import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';

const STEPS = [
  {
    n: '01',
    title: 'Encuentra tu grupo',
    text: 'RUANA te ubica según tu zona y tu actividad profesional.',
  },
  {
    n: '02',
    title: 'Ocupa tu plaza profesional',
    text: 'Forma parte del grupo como el profesional de tu oficio.',
  },
  {
    n: '03',
    title: 'Entra en la rueda',
    text: 'Recomienda profesionales de confianza y recibe oportunidades cuando alguien necesite lo que tú haces.',
  },
];

export function LandingSteps() {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="max-w-xl mb-10 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Cómo entrar</h2>
        <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed">
          No te apuntas a un listado. Pides ocupar la plaza de tu oficio en el grupo de tu zona.
        </p>
      </div>

      <ol className="max-w-2xl">
        {STEPS.map((step, i) => (
          <motion.li
            key={step.n}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: reduce ? 0 : i * 0.07, duration: 0.45 }}
            className="relative pl-16 md:pl-20 pb-10 last:pb-0"
          >
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[18px] md:left-[22px] top-10 bottom-0 w-px"
                style={{ backgroundColor: 'rgba(0,230,118,0.22)' }}
              />
            )}
            <span
              className="absolute left-0 top-0 text-sm font-semibold tabular-nums w-10 h-10 md:w-11 md:h-11 grid place-items-center rounded-full border"
              style={{
                color: i === 2 ? '#04140b' : GREEN,
                backgroundColor: i === 2 ? GREEN : 'transparent',
                borderColor: i === 2 ? GREEN : 'rgba(0,230,118,0.35)',
              }}
            >
              {step.n}
            </span>
            <h3 className="text-lg md:text-xl font-semibold text-white pt-1.5">{step.title}</h3>
            <p className="mt-2 text-[15px] md:text-base text-white/65 leading-relaxed">{step.text}</p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <PrimaryCTA />
        <CodeLink />
      </div>
    </div>
  );
}
