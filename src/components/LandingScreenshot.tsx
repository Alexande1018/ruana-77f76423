import { motion, useReducedMotion } from 'framer-motion';
import { GREEN } from '@/lib/landingTheme';

const ease = [0.16, 1, 0.3, 1] as const;

export function LandingScreenshot({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <figure className={className}>
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduce ? 0.2 : 0.7, ease }}
        className="overflow-hidden rounded-xl border"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
      </motion.div>
      {caption && (
        <figcaption className="mt-3 text-[13px] md:text-sm text-white/50 leading-relaxed">
          <span className="inline-block h-1.5 w-1.5 rounded-full mr-2 align-middle" style={{ backgroundColor: GREEN }} />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
