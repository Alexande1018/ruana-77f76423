import { MapPin, Quote, ShieldCheck } from 'lucide-react';
import { GREEN } from '@/lib/landingTheme';

type Ally = {
  initials: string;
  name: string;
  trade: string;
  zip: string;
  seat: 'Titular' | 'Suplente';
  score: number;
  services: string[];
  quote: string;
  by: string;
};

const ALLIES: Ally[] = [
  {
    initials: 'MR',
    name: 'Marcos R.',
    trade: 'Electricista',
    zip: '28012 · Lavapiés',
    seat: 'Titular',
    score: 412,
    services: ['Cuadros', 'Boletines', 'Averías'],
    quote: 'Le pasé una avería un domingo y estaba allí en una hora. El cliente repitió conmigo.',
    by: 'Lucía G. · Reformas · 28012',
  },
  {
    initials: 'DS',
    name: 'Diego S.',
    trade: 'Fontanero',
    zip: '28045 · Delicias',
    seat: 'Titular',
    score: 366,
    services: ['Calderas', 'Fugas', 'Baños'],
    quote: 'Cerró tres encargos que yo no podía coger. Deja el trabajo limpio y avisa si se retrasa.',
    by: 'Marcos R. · Electricista · 28012',
  },
  {
    initials: 'LG',
    name: 'Lucía G.',
    trade: 'Reformas',
    zip: '28019 · Carabanchel',
    seat: 'Suplente',
    score: 248,
    services: ['Cocinas', 'Tabiquería', 'Alicatado'],
    quote: 'Coordina bien con el resto de oficios. Cuando entra ella, no tengo que estar encima.',
    by: 'Diego S. · Fontanero · 28045',
  },
];

export function AllyCards() {
  return (
    <div className="grid md:grid-cols-3 gap-5 md:gap-6">
      {ALLIES.map((a) => (
        <article
          key={a.name}
          className="rounded-2xl border overflow-hidden flex flex-col"
          style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(22,27,34,0.7)' }}
        >
          <div className="p-6 pb-5">
            <div className="flex items-start gap-4">
              <span
                className="h-12 w-12 shrink-0 rounded-full grid place-items-center font-bold text-black"
                style={{ backgroundColor: GREEN }}
              >
                {a.initials}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-bold tracking-tight truncate">{a.name}</h3>
                <p className="text-sm text-white/60">{a.trade}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/45">
                  <MapPin className="h-3.5 w-3.5" /> {a.zip}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold"
                style={{
                  color: a.seat === 'Titular' ? GREEN : 'rgba(255,255,255,0.75)',
                  backgroundColor:
                    a.seat === 'Titular' ? 'rgba(0,230,118,0.12)' : 'rgba(255,255,255,0.07)',
                }}
              >
                <ShieldCheck className="h-3.5 w-3.5" /> {a.seat} de su zona
              </span>
              <span className="text-white/45">Score {a.score}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {a.services.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-md text-xs text-white/65"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div
            className="mt-auto px-6 py-5 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(0,230,118,0.04)' }}
          >
            <Quote className="h-4 w-4 mb-2" style={{ color: GREEN }} />
            <p className="text-[15px] text-white/85 leading-snug">{a.quote}</p>
            <p className="mt-3 text-xs text-white/45">Recomendado por {a.by}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
