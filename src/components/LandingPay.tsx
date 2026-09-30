const PLANE = '/landing/grok_1790779232217.jpg';

export function LandingPay() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-14 items-center">
      <div className="max-w-xl">
        <h2
          className="text-[28px] md:text-[42px] tracking-tight leading-[1.1]"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
          Si no trabajas, no pagas nada.
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
          Apuntarse no tiene cuota. El Apoyo RUANA solo aparece cuando un encargo se cierra con un
          importe. Es un porcentaje sobre ese importe, para sostener la red.
        </p>
        <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
          Si no hay trabajo cerrado, no hay cobro.
        </p>
      </div>
      <div className="overflow-hidden">
        <img
          src={PLANE}
          alt="Cepillo de carpintero sobre el banco de un taller"
          className="w-full h-full object-cover aspect-[4/3]"
        />
      </div>
    </div>
  );
}
