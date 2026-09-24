import { ArrowRight } from 'lucide-react';
import { RequestAccessButton } from '@/components/RequestAccessButton';
import { APP_LOGIN_URL } from '@/lib/registerUrl';
import { GREEN } from '@/lib/landingTheme';
import { cn } from '@/lib/utils';

export const PRIMARY_CTA_LABEL = 'Apúntate con tu oficio';
export const HEADER_CTA_LABEL = 'Apúntate';
export const CODE_LINK_LABEL = 'Ya soy aliado · Entrar';

const sizeClass = {
  nav: 'min-h-10 px-3.5 py-2 text-[13px] sm:text-sm leading-tight whitespace-nowrap',
  default: 'min-h-12 px-5 py-3.5 text-[15px] md:text-base',
  lg: 'min-h-14 px-7 py-4 text-base md:text-lg',
} as const;

type CtaSize = keyof typeof sizeClass;

export function PrimaryCTA({
  children = PRIMARY_CTA_LABEL,
  size = 'default',
  className,
  onBeforeOpen,
}: {
  children?: React.ReactNode;
  size?: CtaSize;
  className?: string;
  onBeforeOpen?: () => void;
}) {
  return (
    <RequestAccessButton
      onBeforeOpen={onBeforeOpen}
      className={cn(
        'landing-cta inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-black text-center',
        'transition-all duration-200',
        'hover:shadow-[0_0_32px_rgba(0,230,118,0.45)] hover:-translate-y-0.5',
        'active:translate-y-0 active:shadow-[0_0_16px_rgba(0,230,118,0.25)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'focus-visible:ring-[#00E676] focus-visible:ring-offset-[#0D1117]',
        sizeClass[size],
        className,
      )}
      style={{ backgroundColor: GREEN }}
    >
      {children}
    </RequestAccessButton>
  );
}

export function CodeLink({
  label = CODE_LINK_LABEL,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={APP_LOGIN_URL}
      className={cn(
        'group inline-flex items-center gap-2 min-h-11 text-[15px] md:text-base font-medium',
        'border-b pb-0.5 transition-colors duration-200',
        'hover:text-white focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[#00E676] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117] rounded-sm',
        className,
      )}
      style={{ color: GREEN, borderColor: 'rgba(0,230,118,0.35)' }}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </a>
  );
}
