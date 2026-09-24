import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Network, Menu, X } from 'lucide-react';
import { INAUGURAL_PHASE_ACTIVE } from '@/lib/inauguralPhase';
import { BG, BG_ALT, GREEN, GREEN_DARK } from '@/lib/landingTheme';
import { PrimaryCTA, CodeLink, HEADER_CTA_LABEL, PRIMARY_CTA_LABEL } from '@/components/LandingCTA';

export { BG, BG_ALT, GREEN, GREEN_DARK };

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setOpen(false);
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== '/') return;
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navItems = [
    { id: 'como-funciona', label: 'Cómo funciona' },
    { id: 'plazas', label: 'Plazas' },
    { id: 'diferencia', label: 'Por qué RUANA' },
    ...(INAUGURAL_PHASE_ACTIVE ? [{ id: 'fundador', label: 'Aliado Fundador' }] : []),
    { id: 'entrar', label: 'Entrar' },
  ];

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled || open ? 'rgba(13,17,23,0.92)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled || open ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.35)' : 'none',
        borderBottom: scrolled || open ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Network className="h-6 w-6" style={{ color: GREEN }} strokeWidth={2.2} />
          <span className="text-xl font-bold tracking-tight" style={{ color: GREEN }}>
            RUANA
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-white/70">
          {navItems.map((it) => (
            <a
              key={it.id}
              href={`/#${it.id}`}
              onClick={(e) => handleNav(e, it.id)}
              className="hover:text-white transition focus-visible:outline-none focus-visible:text-white"
            >
              {it.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <span className="hidden md:inline-flex">
            <CodeLink className="text-sm min-h-10" />
          </span>
          <PrimaryCTA size="nav" className="inline-flex shrink-0">
            {HEADER_CTA_LABEL}
          </PrimaryCTA>
          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/5">
          <nav className="px-5 py-4 flex flex-col gap-4 text-base text-white/85">
            {navItems.map((it) => (
              <a
                key={it.id}
                href={`/#${it.id}`}
                onClick={(e) => handleNav(e, it.id)}
                className="hover:text-white transition"
              >
                {it.label}
              </a>
            ))}
            <PrimaryCTA size="default" className="mt-2 w-full" onBeforeOpen={() => setOpen(false)}>
              {PRIMARY_CTA_LABEL}
            </PrimaryCTA>
            <CodeLink className="justify-center" />
          </nav>
        </div>
      )}
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer style={{ backgroundColor: BG_ALT }} className="border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5" style={{ color: GREEN }} />
          <span className="text-lg font-bold" style={{ color: GREEN }}>
            RUANA
          </span>
        </div>
        <div className="text-center text-white/55 text-sm leading-relaxed">
          <p>© 2026 RUANA · Red local de profesionales que se recomiendan en su zona</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/45">
          <a
            href="https://ruana-4293f.web.app/politica-privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Privacidad
          </a>
          <a
            href="https://ruana-4293f.web.app/terminos"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Términos
          </a>
          <a
            href="https://ruana-4293f.web.app/aviso-legal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Aviso legal
          </a>
        </div>
      </div>
    </footer>
  );
}
