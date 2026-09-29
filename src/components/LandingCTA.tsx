import { APP_LOGIN_URL, useInviteUrl, useRegisterUrl } from '@/lib/registerUrl';
import { cn } from '@/lib/utils';

export const PRIMARY_CTA_LABEL = 'Apúntate con tu oficio';
export const HEADER_CTA_LABEL = 'Apúntate';
export const CODE_LINK_LABEL = 'Ya soy aliado · Entrar';
export const HAVE_CODE_LABEL = 'Tengo un código';

const sizeClass = {
  nav: 'min-h-10 px-4 py-2 text-[15px]',
  default: 'min-h-12 px-[22px] py-3 text-[15px]',
  lg: 'min-h-12 px-7 py-3.5 text-base',
} as const;

type CtaSize = keyof typeof sizeClass;

export function PrimaryCTA({
  children,
  size = 'default',
  className,
}: {
  children?: React.ReactNode;
  size?: CtaSize;
  className?: string;
}) {
  const href = useRegisterUrl();

  return (
    <a
      href={href}
      className={cn(
        'landing-cta inline-flex items-center justify-center rounded-full bg-[#6DC41F] text-center font-display font-extrabold text-[#0A0D12] no-underline whitespace-nowrap',
        'transition hover:brightness-105',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BD450] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D12]',
        sizeClass[size],
        className,
      )}
    >
      {children ?? (
        <>
          {PRIMARY_CTA_LABEL}
          <span aria-hidden="true"> →</span>
        </>
      )}
    </a>
  );
}

export function CodeLink({ className }: { className?: string }) {
  return (
    <a
      href={APP_LOGIN_URL}
      className={cn(
        'text-sm text-[#9AA3AD] hover:text-[#F5F7F2]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BD450] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D12] rounded-sm',
        className,
      )}
    >
      Ya soy aliado · <span className="text-[#8BD450] underline underline-offset-[3px]">Entrar</span>
    </a>
  );
}

/** Quién ya trae un código: enlace a invite.html. No se muestra en la landing. */
export function HaveCodeLink({ className }: { className?: string }) {
  const href = useInviteUrl();

  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center min-h-11 text-sm text-white/50',
        'underline-offset-4 hover:text-white/80 hover:underline',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[#8BD450] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D12] rounded-sm',
        className,
      )}
    >
      {HAVE_CODE_LABEL}
    </a>
  );
}
