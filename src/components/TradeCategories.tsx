import {
  Wrench,
  Zap,
  PaintRoller,
  Hammer,
  Truck,
  Sparkles,
  Leaf,
  Laptop,
  Camera,
  Calculator,
  Thermometer,
  KeyRound,
} from 'lucide-react';
import { GREEN } from '@/lib/landingTheme';

const TRADES = [
  { label: 'Fontanería', Icon: Wrench },
  { label: 'Electricidad', Icon: Zap },
  { label: 'Pintura', Icon: PaintRoller },
  { label: 'Reformas', Icon: Hammer },
  { label: 'Mudanzas', Icon: Truck },
  { label: 'Limpieza', Icon: Sparkles },
  { label: 'Jardinería', Icon: Leaf },
  { label: 'Informática', Icon: Laptop },
  { label: 'Fotografía', Icon: Camera },
  { label: 'Gestoría', Icon: Calculator },
  { label: 'Climatización', Icon: Thermometer },
  { label: 'Cerrajería', Icon: KeyRound },
];

export function TradeCategories() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
      {TRADES.map(({ label, Icon }) => (
        <div
          key={label}
          className="group rounded-xl border px-3 py-5 flex flex-col items-center gap-3 text-center transition-colors"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(22,27,34,0.6)',
          }}
        >
          <span
            className="h-10 w-10 rounded-lg grid place-items-center transition-colors"
            style={{ backgroundColor: 'rgba(0,230,118,0.10)' }}
          >
            <Icon className="h-5 w-5" style={{ color: GREEN }} strokeWidth={1.9} />
          </span>
          <span className="text-[13px] md:text-sm text-white/75 leading-tight">{label}</span>
        </div>
      ))}
    </div>
  );
}
