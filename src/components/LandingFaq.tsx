import { useState } from 'react';
import { GREEN } from '@/lib/landingTheme';

const QUESTIONS = [
  {
    q: '¿Me cobráis por apuntarme?',
    a: 'No. Apuntarse no tiene cuota. Si no trabajas, no pagas nada.',
  },
  {
    q: '¿Y si ya hay alguien de mi oficio?',
    a: 'Quedas de suplente. Si se libera la plaza o se abre otro grupo en esa zona, te avisan.',
  },
  {
    q: '¿Cómo se entra ahora?',
    a: 'Con un código de arranque. Si te lo han pasado, pulsa Tengo un código. Después solo entra quien invita un aliado.',
  },
  {
    q: '¿Sirve si no soy fontanero?',
    a: 'Sí. También quien limpia casas, cuida mascotas, atiende a mayores, hace de manitas o da clases de inglés. El grupo es por zona y por oficio.',
  },
  {
    q: '¿Por qué iba a pasarle un trabajo a alguien que no conozco?',
    a: 'Porque aquí cuenta cómo trabajas. Responder, cumplir y aportar al grupo construye tu reputación. No es soltar un número a ciegas.',
  },
  {
    q: '¿Qué es el Apoyo?',
    a: 'Solo aparece cuando un encargo se cierra con un importe. Si no hay trabajo cerrado, no hay Apoyo.',
  },
];

export function LandingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl">
      <h2
        className="text-[28px] md:text-[40px] tracking-tight leading-[1.12]"
        style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
      >
        Lo que suele preguntar la gente
      </h2>
      <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
        Si después de esto todavía te encaja, entra y mira si hay plaza.
      </p>

      <ul className="mt-10 divide-y divide-white/10 border-t border-white/10">
        {QUESTIONS.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q}>
              <button
                type="button"
                className="w-full text-left py-5 flex items-start justify-between gap-6"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="text-base md:text-lg text-white leading-snug">{item.q}</span>
                <span className="mt-1 text-sm shrink-0" style={{ color: GREEN }}>
                  {isOpen ? '—' : '+'}
                </span>
              </button>
              {isOpen && (
                <p className="pb-6 -mt-1 text-base text-white/80 leading-relaxed max-w-xl">{item.a}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
