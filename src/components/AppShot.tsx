type Props = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
};

/** Captura real de la app, como apoyo al mensaje. */
export function AppShot({ src, alt, caption, priority = false, className = '' }: Props) {
  return (
    <figure className={className}>
      <div
        className="overflow-hidden rounded-2xl border"
        style={{
          borderColor: 'rgba(255,255,255,0.10)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
        }}
      >
        <img
          src={src}
          alt={alt}
          width={1440}
          height={900}
          className="block w-full h-auto"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      {caption ? (
        <figcaption className="mt-4 text-sm text-white/45 leading-relaxed">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
