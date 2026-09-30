import { useState } from 'react';
import { PUBLIC_ACCESS_CODE } from '@/lib/inauguralPhase';
import { GREEN } from '@/lib/landingTheme';

const QUESTIONS = [
  {
    q: '¿Hay que pagar para apuntarse?',
    a: 'No. Apuntarse no tiene cuota. Si no trabajas, no pagas nada.',
  },
  {
    q: '¿Y el Apoyo?',
    a: 'Solo aparece cuando un encargo se cierra con un importe. Es un porcentaje sobre ese importe, para sostener la red. Si no hay trabajo cerrado, no hay Apoyo.',
  },
  {
    q: '¿Esto es para clientes?',
    a: 'No. RUANA es entre profesionales de oficio de la misma zona. Autónomos y negocios pequeños que se pasan el trabajo con nombre.',
  },
  {
    q: '¿Si no hay plaza de mi oficio?',
    a: 'Puedes quedar en espera como suplente. Si se libera la plaza o se abre otro grupo en esa zona, te avisan.',
  },
  {
    q: '¿Cómo se entra?',
    a: `Ahora, quien abre el grupo entra con el código de arranque ${PUBLIC_ACCESS_CODE}. Después solo entra quien invita un aliado.`,
  },
  {
    q: '¿Qué es una plaza?',
    a: 'En cada grupo, por código postal, hay una plaza por oficio principal. Las especialidades no ocupan plaza. Puede haber muchos de tu oficio en la ciudad; en un grupo RUANA solo cabe uno de cada oficio.',
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
        Preguntas que salen siempre
      </h2>
      <p className="mt-4 text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
        Lo justo para decidir si te interesa. El resto se ve cuando entras.
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
                <span className="text-base md:text-lg text-white/90 leading-snug">{item.q}</span>
                <span className="mt-1 text-sm shrink-0" style={{ color: GREEN }}>
                  {isOpen ? '—' : '+'}
                </span>
              </button>
              {isOpen && (
                <p className="pb-6 -mt-1 text-base text-white/60 leading-relaxed max-w-xl">{item.a}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
