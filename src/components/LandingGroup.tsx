import { GREEN } from '@/lib/landingTheme';

const VAN = '/landing/grok_1790779246688.jpg';

const EXAMPLE_SEATS = [
  { trade: 'Electricista', open: true },
  { trade: 'Fontanero', open: true },
  { trade: 'Pintor', open: false },
  { trade: 'Asesor', open: true },
];

export function LimitedSeatsIdea() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
      <div className="max-w-xl">
        <h2
          className="text-[28px] md:text-[40px] tracking-tight leading-[1.12]"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
          El grupo es de tu código postal.
        </h2>
        <p className="mt-4 text-base md:text-lg text-white/70">Una plaza por oficio en cada grupo.</p>
        <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
          No queremos 200 del mismo oficio a por el{' '}
          <em style={{ color: GREEN }}>mismo cliente</em>.
        </p>
        <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
          RUANA organiza profesionales en grupos locales por código postal y limita las plazas por
          oficio principal dentro de cada grupo.
        </p>
        <p className="sr-only">No queremos 200 profesionales del mismo oficio compitiendo por el mismo cliente.</p>
      </div>
      <img src={VAN} alt="Profesional junto a su furgoneta en una calle" className="w-full aspect-[4/3] object-cover" />
    </div>
  );
}

export function GroupExample() {
  return (
    <div>
      <p className="text-xs font-medium text-white/45 mb-5">
        Ejemplo ilustrativo · no es disponibilidad real
      </p>
      <h2
        className="text-2xl md:text-[36px] tracking-tight leading-snug"
        style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
      >
        Así puede verse un grupo RUANA
      </h2>
      <p className="mt-3 text-base text-white/60 leading-relaxed max-w-xl">
        Un grupo local. Distintos oficios. Una plaza por oficio. Esta vista es un ejemplo para entender
        el modelo, no un estado actual de Alicante ni de ninguna zona.
      </p>

      <ul className="mt-10 max-w-xl space-y-3">
        {EXAMPLE_SEATS.map((seat) => (
          <li key={seat.trade} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
            <span className="text-xl md:text-2xl" style={{ color: GREEN, fontFamily: 'Instrument Serif, Georgia, serif' }}>
              {seat.trade}
            </span>
            <span className="text-sm md:text-base text-white/70">
              {seat.open ? 'Plaza disponible' : 'Plaza ocupada'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
