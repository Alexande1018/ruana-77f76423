const HERO = '/landing/grok_1790780438773.jpg';
const PAPER = '/landing/grok_1790780443386.jpg';

function Tape({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`lp-masking-tape ${className}`} />;
}

function Clip() {
  return (
    <svg className="lp-metal-clip" viewBox="0 0 140 100" aria-hidden="true">
      <defs>
        <linearGradient id="clipMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d4d6d0" />
          <stop offset="0.4" stopColor="#8a8d86" />
          <stop offset="1" stopColor="#3f413d" />
        </linearGradient>
      </defs>
      <path d="M40 38 C40 18 100 18 100 38 L108 38 C112 38 116 42 116 48 L116 70 C116 78 108 82 98 82 L42 82 C32 82 24 78 24 70 L24 48 C24 42 28 38 32 38 Z" fill="url(#clipMetal)" stroke="#1c1d1a" strokeWidth="2.2" />
      <ellipse cx="70" cy="28" rx="13" ry="12" fill="#2b2c29" stroke="#cfd2cb" strokeWidth="3" />
      <ellipse cx="70" cy="28" rx="5" ry="4.5" fill="#111211" />
      <rect x="58" y="52" width="24" height="18" rx="3" fill="#6e716b" stroke="#222" strokeWidth="1.2" />
    </svg>
  );
}

const RECOMMENDATIONS = [
  { title: 'Fontanero pasa el trabajo a Electricista', detail: '— reforma de baño' },
  { title: 'Electricista pasa el trabajo a Pintor', detail: '— el cliente pregunta' },
  { title: 'Pintor pasa el trabajo a Carpintero', detail: '— mobiliario a medida' },
];

export function LandingHero() {
  return (
    <section className="lp-hero relative isolate overflow-x-hidden pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="lp-hero-inner max-w-[1536px] mx-auto px-5 md:px-10">
        <div className="lp-hero-grid">
          <div className="lp-hero-left">
            <h1 className="lp-hero-title text-white">
              <span className="block">Aquí el trabajo</span>
              <span className="block">no se compra. Se recomienda.</span>
            </h1>

            <div className="lp-hero-photo relative">
              <div className="lp-photo-frame overflow-hidden">
                <img
                  src={HERO}
                  alt="Fontanero trabajando en un baño en reforma"
                  className="block w-full h-full object-cover object-[35%_45%]"
                />
              </div>
              <aside className="lp-note lp-note-tilt" style={{ backgroundImage: `url(${PAPER})` }}>
                <Tape />
                <p className="lp-note-quote">«Oye, ¿conoces a un buen electricista?»</p>
                <p className="lp-note-body">Tú recomiendas.<br />Mañana ese electricista piensa en ti.</p>
                <p className="lp-note-brand">RUANA lo organiza.</p>
              </aside>
            </div>
          </div>

          <div className="lp-hero-right">
            <div className="lp-board">
              <Clip />
              <ol className="lp-recs">
                {RECOMMENDATIONS.map((item, i) => (
                  <li className="lp-slip" key={item.title} style={{ backgroundImage: `url(${PAPER})` }}>
                    <Tape className="lp-slip-tape" />
                    <span className="lp-num">{i + 1}</span>
                    <div>
                      <p className="lp-rec-title">{item.title}</p>
                      <p className="lp-rec-sub">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <p className="lp-close">
              <span className="lp-close-strong">No es un anuncio.</span>
              <span className="lp-close-rest">Es un profesional de tu grupo que te nombra.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
