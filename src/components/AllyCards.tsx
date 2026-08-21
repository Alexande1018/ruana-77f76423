import { MapPin, Briefcase } from 'lucide-react';
import { GREEN } from '@/lib/landingTheme';

type Scenario = {
  trade: string;
  zip: string;
  need: string;
  gets: string;
};

const SCENARIOS: Scenario[] = [
  {
    trade: 'Fontanero',
    zip: '28045 · Delicias',
    need: 'Le llaman para una reforma de baño y necesita un electricista de la zona.',
    gets: 'Se lo pasa a un aliado de su zona y el cliente queda contento con los dos.',
  },
  {
    trade: 'Electricista',
    zip: '28012 · Lavapiés',
    need: 'Acaba una instalación y el cliente le pregunta si conoce a un pintor.',
    gets: 'Tiene a un aliado de confianza a mano para pasarle el trabajo.',
  },
  {
    trade: 'Pintor',
    zip: '28019 · Carabanchel',
    need: 'Quiere mejorar su portfolio y busca un fotógrafo de producto.',
    gets: 'Encuentra a otro profesional de su zona con el que colaborar.',
  },
];

export function AllyCards() {
  return (
    <div className="grid md:grid-cols-3 gap-5 md:gap-6">
      {SCENARIOS.map((s) => (
        <article
          key={s.trade}
          className="rounded-2xl border overflow-hidden flex flex-col"
          style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(22,27,34,0.7)' }}
        >
          <div className="p-6 pb-5">
            <div className="flex items-start gap-4">
              <span
                className="h-12 w-12 shrink-0 rounded-full grid place-items-center font-bold text-black"
                style={{ backgroundColor: GREEN }}
              >
                <Briefcase className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-bold tracking-tight truncate">{s.trade}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/45">
                  <MapPin className="h-3.5 w-3.5" /> {s.zip}
                </p>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold" style={{ color: GREEN, backgroundColor: 'rgba(0,230,118,0.12)' }}>
              Ejemplo de cómo funciona
            </div>

            <div className="mt-5 space-y-4">
              <p className="text-[15px] text-white/80 leading-snug">
                {s.need}
              </p>
              <p className="text-[15px] text-white/60 leading-snug">
                {s.gets}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
