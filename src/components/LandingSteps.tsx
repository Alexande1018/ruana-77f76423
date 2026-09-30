import { GREEN } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink } from '@/components/LandingCTA';

const STEPS = [
  {
    n: '01',
    title: 'Encuentra tu grupo',
    text: 'RUANA te ubica según tu zona y tu actividad profesional.',
    img: '/landing/foto-paso-01.jpg',
  },
  {
    n: '02',
    title: 'Ocupa tu plaza profesional',
    text: 'Forma parte del grupo como el profesional de tu oficio.',
    img: '/landing/foto-paso-02.jpg',
  },
  {
    n: '03',
    title: 'Entra en la rueda',
    text: 'Recomienda profesionales de confianza y recibe oportunidades cuando alguien necesite lo que tú haces.',
    img: '/landing/foto-paso-03.jpg',
  },
];

export function LandingSteps() {
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

      <ol className="grid md:grid-cols-3 gap-8">
        {STEPS.map((step) => (
          <li key={step.n}>
            <img src={step.img} alt="" className="w-full h-40 object-cover mb-4" />
            <div className="flex gap-3">
              <span className="text-sm font-semibold tabular-nums" style={{ color: GREEN }}>
                {step.n}
              </span>
              <div>
                <h3 className="text-lg md:text-xl">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{step.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <PrimaryCTA />
        <CodeLink />
      </div>
    </div>
  );
}
