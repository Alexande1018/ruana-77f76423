const HERO = '/landing/grok_1790780438773.jpg';
const PAPER = '/landing/grok_1790780443386.jpg';

function Tape({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`lp-masking-tape ${className}`} />;
}

function Clip() {
  return (
    <svg className="lp-metal-clip" viewBox="0 0 280 150" aria-hidden="true">
      <defs>
        <linearGradient id="clipMetal" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor="#d6d7d2" />
          <stop offset="0.2" stopColor="#858780" />
          <stop offset="0.48" stopColor="#383a37" />
          <stop offset="0.72" stopColor="#777a73" />
          <stop offset="1" stopColor="#242522" />
        </linearGradient>
        <linearGradient id="clipHighlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0f1eb" stopOpacity=".95" />
          <stop offset="1" stopColor="#73766f" stopOpacity=".2" />
        </linearGradient>
      </defs>
      <path d="M48 73 L48 61 Q48 54 57 54 L101 54 M179 54 L223 54 Q232 54 232 61 L232 73" fill="none" stroke="#161715" strokeWidth="13" strokeLinecap="round" />
      <path d="M48 68 L48 59 Q48 55 57 55 L101 55 M179 55 L223 55 Q232 55 232 59 L232 68" fill="none" stroke="url(#clipHighlight)" strokeWidth="3" strokeLinecap="round" />
      <path d="M54 63 L226 63 Q238 63 240 75 L250 112 Q253 123 239 126 L41 126 Q27 123 30 112 L40 75 Q42 63 54 63Z" fill="url(#clipMetal)" stroke="#171815" strokeWidth="4" />
      <path d="M48 71 Q51 68 59 68 L221 68 Q229 68 232 71" fill="none" stroke="url(#clipHighlight)" strokeWidth="3" opacity=".85" />
      <path d="M62 99 L218 99 Q229 99 232 110 L234 119 L46 119 L48 110 Q51 99 62 99Z" fill="#292a27" stroke="#b8bbb3" strokeWidth="2" />
      <path d="M112 63 C112 44 117 17 140 12 C163 17 168 44 168 63" fill="none" stroke="#242522" strokeWidth="13" />
      <path d="M112 62 C112 43 119 19 140 14 C161 19 168 43 168 62" fill="none" stroke="url(#clipHighlight)" strokeWidth="5" />
      <ellipse cx="140" cy="31" rx="13" ry="14" fill="#252623" stroke="#c6c8c1" strokeWidth="4" />
      <ellipse cx="140" cy="31" rx="6" ry="7" fill="#10110f" stroke="#62645e" strokeWidth="2" />
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
              <div className="lp-sheet" style={{ backgroundImage: `url(${PAPER})` }}>
                <ol className="lp-recs">
                {RECOMMENDATIONS.map((item, i) => (
                  <li className="lp-rec-row" key={item.title}>
                    <span className="lp-num">{i + 1}</span>
                    <div>
                      <p className="lp-rec-title">{item.title}</p>
                      <p className="lp-rec-sub">{item.detail}</p>
                    </div>
                  </li>
                ))}
                </ol>
              </div>
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
