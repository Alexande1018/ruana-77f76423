import { useEffect, useRef } from 'react';
import { GREEN } from '@/lib/landingTheme';

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Fondo vivo de nodos conectados: la red RUANA respirando.
 */
export function NodeField({
  density = 0.00016,
  className = '',
  opacity = 1,
  intensity = 1,
}: {
  density?: number;
  className?: string;
  opacity?: number;
  intensity?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let nodes: Node[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(26, Math.min(110, Math.round(w * h * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.6 + 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const maxDist = Math.min(220, Math.max(140, w * 0.16));

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!reduce) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const t = 1 - d / maxDist;
            ctx.strokeStyle = `rgba(0,230,118,${0.38 * t * t * intensity})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        const near = pd < 170 ? 1 - pd / 170 : 0;
        ctx.fillStyle = `rgba(0,230,118,${(0.55 + near * 0.45) * intensity})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + near * 1.6, 0, Math.PI * 2);
        ctx.fill();
        if (near > 0.25) {
          ctx.strokeStyle = `rgba(0,230,118,${(near - 0.25) * 0.8 * intensity})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    draw();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [density, intensity]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity, color: GREEN }}
    />
  );
}
