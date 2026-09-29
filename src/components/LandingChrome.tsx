import { Link } from 'react-router-dom';
import { BG, BG_ALT, GREEN, GREEN_DARK } from '@/lib/landingTheme';
import { PrimaryCTA, HEADER_CTA_LABEL } from '@/components/LandingCTA';

export { BG, BG_ALT, GREEN, GREEN_DARK };

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1c222c] bg-[#0A0D12]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between gap-3 px-5">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 font-display text-xl font-extrabold tracking-[0.02em] text-[#F5F7F2]">
          <img src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
          <span>RUANA</span>
        </Link>
        <PrimaryCTA size="nav" className="shrink-0">
          {HEADER_CTA_LABEL}
        </PrimaryCTA>
      </div>
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-[#1c222c] bg-[#0A0D12] px-5 py-7 text-center text-[13px] text-[#9AA3AD]">
      <p>
        RUANA · Alicante ·{' '}
        <a href="https://ruana.app" className="underline decoration-[#9AA3AD]/70 underline-offset-[3px] hover:text-[#F5F7F2]">
          ruana.app
        </a>
      </p>
    </footer>
  );
}
