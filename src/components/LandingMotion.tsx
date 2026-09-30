import { useEffect, useRef, useState, type ReactNode } from 'react';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(28px)',
        transition: 'opacity .75s ease, transform .75s ease',
      }}
    >
      {children}
    </div>
  );
}

export function ParallaxImage({
  src,
  alt,
  className,
  position,
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img || prefersReducedMotion()) return;
    const parent = img.parentElement;
    const onScroll = () => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      img.style.transform = `translate3d(0, ${Math.round(mid * -0.07)}px, 0) scale(1.08)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={{ objectPosition: position, willChange: 'transform' }}
    />
  );
}
