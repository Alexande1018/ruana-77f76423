import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Network, Menu, X } from 'lucide-react';

export const BG = '#0D1117';
export const BG_ALT = '#161B22';
export const GREEN = '#00E676';
export const GREEN_DARK = '#0A2E1A';

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
    { id: 'que-es', label: 'Qué es' },
    { id: 'como-funciona', label: 'Cómo funciona' },
    { id: 'ventajas', label: 'Comparativa' },
    { id: 'faq', label: 'FAQ' },
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
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Network className="h-6 w-6" style={{ color: GREEN }} strokeWidth={2.2} />
          <span className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: GREEN }}>
            RUANA
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          {navItems.map((it) => (
            <a key={it.id} href={`/#${it.id}`} onClick={(e) => handleNav(e, it.id)} className="hover:text-white transition">
              {it.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="hidden sm:inline-block px-4 md:px-5 py-2 rounded-lg font-semibold text-sm text-black transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,230,118,0.4)]"
            style={{ backgroundColor: GREEN }}
          >
            Solicitar Acceso
          </Link>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5">
          <nav className="px-5 py-4 flex flex-col gap-4 text-base text-white/85">
            {navItems.map((it) => (
              <a key={it.id} href={`/#${it.id}`} onClick={(e) => handleNav(e, it.id)} className="hover:text-white transition">
                {it.label}
              </a>
            ))}
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-black text-center"
              style={{ backgroundColor: GREEN }}
            >
              Solicitar Acceso
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer style={{ backgroundColor: BG_ALT }} className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5" style={{ color: GREEN }} />
          <span className="text-lg font-bold" style={{ color: GREEN }}>RUANA</span>
        </div>
        <div className="text-center text-white/60 text-sm">
          <p>© 2026 RUANA · Red de Unión y Apoyo para Negocios entre Aliados</p>
          <p className="mt-1 text-white/40">Acceso solo por invitación · Red cerrada de confianza y apoyo profesional entre aliados.</p>
        </div>
        <div className="flex gap-5 text-sm text-white/50">
          <a href="#" className="hover:text-white transition">Privacidad</a>
          <a href="#" className="hover:text-white transition">Términos</a>
        </div>
      </div>
    </footer>
  );
}
