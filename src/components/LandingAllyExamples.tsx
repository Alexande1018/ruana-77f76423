const MOMENTS = [
  { from: 'Fontanero', to: 'Electricista', short: 'reforma de baño' },
  { from: 'Limpieza', to: 'Manitas', short: 'un grifo que gotea' },
  { from: 'Cuidado de mayores', to: 'Clases de inglés', short: 'la familia pregunta' },
];

export function LandingAllyExamples() {
  return (
    <div>
      <ol className="space-y-4">
        {MOMENTS.map((m, i) => (
          <li key={`${m.from}-${m.to}`} className="border-b border-white/10 pb-4">
            <p className="text-[15px] leading-snug text-white/90">
              <span className="font-bold mr-2" style={{ color: '#A2FF00' }}>
                {i + 1}
              </span>
              {m.from} pasa el trabajo a {m.to}
            </p>
            <p className="mt-1 text-[14px] text-white/50">— {m.short}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-[15px]">
        <span className="font-semibold" style={{ color: '#A2FF00' }}>
          No es un anuncio.
        </span>{' '}
        <span className="text-white/70">Es un profesional de tu grupo que te nombra.</span>
      </p>
    </div>
  );
}
