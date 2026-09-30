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
      <path d="M51 62 C30 43 34 19 58 20 C73 21 83 39 98 53 M229 62 C250 43 246 19 222 20 C207 21 197 39 182 53" fill="none" stroke="#20211f" strokeWidth="10" strokeLinecap="round" />
      <path d="M51 60 C34 42 38 23 58 24 C72 25 82 41 96 54 M229 60 C246 42 242 23 222 24 C208 25 198 41 184 54" fill="none" stroke="url(#clipHighlight)" strokeWidth="3" strokeLinecap="round" />
      <path d="M39 57 Q43 47 59 47 L93 47 C105 20 120 10 140 10 C160 10 175 20 187 47 L221 47 Q237 47 241 58 L255 108 Q258 122 242 126 L38 126 Q22 122 25 108 Z" fill="url(#clipMetal)" stroke="#171815" strokeWidth="4" />
      <path d="M44 61 Q47 55 60 55 L97 55 M183 55 L220 55 Q233 55 236 62" fill="none" stroke="url(#clipHighlight)" strokeWidth="3" opacity=".8" />
      <path d="M64 102 L216 102 Q228 102 231 112 L233 120 L47 120 L49 112 Q52 102 64 102 Z" fill="#242522" stroke="#aeb0a8" strokeWidth="2" />
      <ellipse cx="140" cy="27" rx="17" ry="16" fill="#2d2e2b" stroke="url(#clipHighlight)" strokeWidth="5" />
      <ellipse cx="140" cy="27" rx="8" ry="8" fill="#111210" stroke="#555751" strokeWidth="2" />
      <path d="M132 75 Q140 70 148 75 L151 88 L129 88 Z" fill="#666963" stroke="#242522" strokeWidth="2" />
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
