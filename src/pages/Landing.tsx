import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Menu, X } from 'lucide-react';
import { PrimaryCTA, CodeLink, HaveCodeLink } from '@/components/LandingCTA';
import { PUBLIC_ACCESS_CODE } from '@/lib/inauguralPhase';
import './Landing.css';

const navItems = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#grupo', label: 'El grupo' },
  { href: '#confianza', label: 'Confianza' },
];

function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="rl-header">
      <div className="rl-header-inner">
        <Link to="/" className="rl-wordmark" aria-label="RUANA, inicio" onClick={() => setMenuOpen(false)}>
          <span className="rl-wordmark-mark" aria-hidden="true">R</span>
          <span>RUANA</span>
        </Link>

        <nav className="rl-nav" aria-label="Navegación principal">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>

        <div className="rl-header-actions">
          <CodeLink className="rl-login-link" />
          <PrimaryCTA size="nav" className="rl-cta rl-cta-small">Apúntate</PrimaryCTA>
          <button
            type="button"
            className="rl-menu-toggle"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="rl-mobile-nav" aria-label="Navegación móvil">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <CodeLink className="rl-mobile-login" />
          <PrimaryCTA className="rl-cta" onBeforeOpen={() => setMenuOpen(false)}>Apúntate con tu oficio</PrimaryCTA>
        </nav>
      )}
    </header>
  );
}

function LandingFooter() {
  return (
    <footer className="rl-footer">
      <div className="rl-footer-inner">
        <Link to="/" className="rl-footer-wordmark">RUANA</Link>
        <p>Una red local de profesionales que se recomiendan en su zona.</p>
        <nav aria-label="Información legal">
          <a href="https://ruana-4293f.web.app/politica-privacidad" target="_blank" rel="noreferrer">Privacidad</a>
          <a href="https://ruana-4293f.web.app/terminos" target="_blank" rel="noreferrer">Términos</a>
          <a href="https://ruana-4293f.web.app/aviso-legal" target="_blank" rel="noreferrer">Aviso legal</a>
        </nav>
        <span className="rl-copyright">© 2026 RUANA</span>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="ruana-landing">
      <LandingHeader />

      <main>
        <section className="rl-hero" aria-labelledby="hero-title">
          <div className="rl-hero-texture" aria-hidden="true" />
          <div className="rl-hero-inner">
            <div className="rl-hero-copy">
              <p className="rl-eyebrow"><span /> Red local de oficios <i>·</i> Alicante</p>
              <h1 id="hero-title"><span>El trabajo</span><span>no se compra.</span><em>Se recomienda.</em></h1>
              <p className="rl-hero-description">
                RUANA conecta a profesionales de una misma zona para que recomendar a alguien de confianza sea más fácil.
              </p>
              <div className="rl-hero-actions">
                <PrimaryCTA size="lg" className="rl-cta">Apúntate con tu oficio <ArrowRight size={17} /></PrimaryCTA>
                <CodeLink className="rl-login-link" />
              </div>
              <p className="rl-hero-meta">Sin cuota de alta <span>·</span> Grupos por oficio y código postal</p>
            </div>

            <figure className="rl-hero-figure">
              <img
                src="/landing/grok_1790780438773.jpg"
                alt="Fontanero trabajando en una reforma de baño"
                className="rl-hero-photo"
              />
              <div className="rl-photo-shade" aria-hidden="true" />
              <figcaption className="rl-photo-caption"><span>01</span> Un ejemplo de recomendación</figcaption>
              <aside className="rl-quote-paper" aria-label="Ejemplo de una recomendación">
                <span className="rl-tape" aria-hidden="true" />
                <p className="rl-quote-label">EN UNA REFORMA</p>
                <p className="rl-quote">«Oye, ¿conoces a un buen electricista?»</p>
                <p className="rl-quote-foot">Un profesional de tu grupo puede tener la respuesta.</p>
              </aside>
            </figure>
          </div>
          <a className="rl-scroll-cue" href="#como-funciona">La idea, en un minuto <ArrowDown size={15} /></a>
        </section>

        <section className="rl-story" id="como-funciona" aria-labelledby="story-title">
          <div className="rl-story-inner">
            <div className="rl-story-heading">
              <p className="rl-kicker">La recomendación, ordenada</p>
              <h2 id="story-title">Un cliente pide un oficio que tú no haces.</h2>
              <p>
                En vez de dejarlo en el aire, puedes recomendar a alguien de tu grupo. RUANA ayuda a que esa conexión llegue a la persona adecuada.
              </p>
              <p className="rl-example-note">Ejemplo ilustrativo. No representa encargos realizados.</p>
            </div>

            <div className="rl-referral-sheet">
              <div className="rl-sheet-clip" aria-hidden="true"><span /></div>
              <div className="rl-sheet-heading">
                <span>Una reforma de baño</span>
                <span>Ejemplo</span>
              </div>
              <ol>
                <li><span className="rl-step-number">01</span><span><b>Fontanero</b><small>El cliente necesita otro oficio.</small></span><span className="rl-step-arrow">→</span><span className="rl-step-next">Electricista</span></li>
                <li><span className="rl-step-number">02</span><span><b>Electricista</b><small>El cliente pregunta por alguien.</small></span><span className="rl-step-arrow">→</span><span className="rl-step-next">Pintor</span></li>
                <li><span className="rl-step-number">03</span><span><b>Pintor</b><small>Hace falta mobiliario a medida.</small></span><span className="rl-step-arrow">→</span><span className="rl-step-next">Carpintero</span></li>
              </ol>
              <p className="rl-sheet-foot">Una red de profesionales. Cada recomendación empieza con una persona.</p>
            </div>
          </div>
        </section>

        <section className="rl-network" id="grupo" aria-labelledby="network-title">
          <div className="rl-network-intro">
            <div>
              <p className="rl-kicker">Cerca y entre profesionales</p>
              <h2 id="network-title">Tu oficio, conectado con otros.</h2>
            </div>
            <p>
              RUANA organiza grupos por código postal y limita las plazas por oficio. No es un directorio abierto ni un anuncio que compite por el mismo cliente.
            </p>
          </div>

          <div className="rl-photo-essay" aria-label="Oficios que pueden formar parte de una red RUANA">
            <figure className="rl-essay-electric">
              <img src="/landing/grok_1790779224413.jpg" alt="Electricista trabajando en un cuadro eléctrico" loading="lazy" />
              <figcaption><span>01</span> Electricidad</figcaption>
            </figure>
            <figure className="rl-essay-wood">
              <img src="/landing/grok_1790779232217.jpg" alt="Cepillo de carpintero sobre un banco de trabajo" loading="lazy" />
              <figcaption><span>02</span> Carpintería</figcaption>
            </figure>
            <figure className="rl-essay-van">
              <img src="/landing/grok_1790779246688.jpg" alt="Profesional preparando herramientas junto a su furgoneta" loading="lazy" />
              <figcaption><span>03</span> Trabajo local</figcaption>
            </figure>
          </div>

          <div className="rl-group-rule">
            <span className="rl-rule-mark">R</span>
            <p><b>Un grupo de tu zona.</b> Profesionales de distintos oficios, plazas limitadas y una forma clara de recomendarse.</p>
            <a href="#confianza">Así se cuida la red <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="rl-trust" id="confianza" aria-labelledby="trust-title">
          <div className="rl-trust-inner">
            <div className="rl-trust-copy">
              <p className="rl-kicker">La confianza se construye</p>
              <h2 id="trust-title">Una red pequeña tiene que cuidar sus reglas.</h2>
              <p>
                Cada aliado pertenece a un grupo territorial. El Score RUANA recoge la actividad declarada y ayuda a construir reputación dentro de la red.
              </p>
            </div>
            <div className="rl-trust-points">
              <div><span>01</span><p><b>Zona definida</b><small>Tu grupo se organiza por código postal y oficio.</small></p></div>
              <div><span>02</span><p><b>Plazas cuidadas</b><small>Se evita que el grupo se convierta en un listado masivo del mismo oficio.</small></p></div>
              <div><span>03</span><p><b>Trayectoria cuidada</b><small>La reputación se construye con participación y encargos declarados.</small></p></div>
            </div>
          </div>
        </section>

        <section className="rl-access" id="acceso" aria-labelledby="access-title">
          <div className="rl-access-paper">
            <div className="rl-access-copy">
              <p className="rl-kicker">Empieza por tu zona</p>
              <h2 id="access-title">Si tienes un oficio, ya puedes dar el primer paso.</h2>
              <p>El registro usa el código de acceso de RUANA y te lleva al alta de la aplicación.</p>
            </div>
            <div className="rl-access-actions">
              <div className="rl-code-label">Código de acceso <strong>{PUBLIC_ACCESS_CODE}</strong></div>
              <PrimaryCTA size="lg" className="rl-cta">Apúntate con tu oficio <ArrowRight size={17} /></PrimaryCTA>
              <div className="rl-access-links"><HaveCodeLink /><CodeLink label="Ya soy aliado · Entrar" /></div>
            </div>
            <p className="rl-fee-note">
              El alta no tiene cuota. Si un encargo se realiza y ambas partes lo confirman, se aplica el apoyo RUANA del 12% sobre el importe acordado.
            </p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
