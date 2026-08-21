type Props = {
  className?: string;
  size?: number;
};

/** Marca oficial de RUANA: tres nodos unidos. */
export function RuanaMark({ className, size = 28 }: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 24v7.5" />
        <path d="M32 31.5H18v7.5" />
        <path d="M32 31.5H46v7.5" />
      </g>
      <rect x="22" y="8" width="20" height="20" rx="5.5" fill="currentColor" />
      <rect x="8" y="39" width="20" height="20" rx="5.5" fill="currentColor" />
      <rect x="36" y="39" width="20" height="20" rx="5.5" fill="currentColor" />
    </svg>
  );
}
