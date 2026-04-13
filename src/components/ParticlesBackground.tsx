import { useCallback, useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; size: number; alpha: number };

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

const createParticle = (w: number, h: number): Particle => {
  const speed = 0.2 + Math.random() * 0.3;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    size: 1 + Math.random() * 2,
    alpha: 0.2 + Math.random() * 0.4,
  };
};

interface Props {
  count?: number;
}

const ParticlesBackground = ({ count }: Props) => {
  // Use fewer particles on low-end / mobile devices
  const resolvedCount = count ?? (window.navigator.hardwareConcurrency <= 4 ? 70 : 110);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>();
  const visibleRef = useRef(true);
  const throttleRef = useRef(0);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    // Reinitialise particles to new canvas dimensions
    particlesRef.current = Array.from({ length: resolvedCount }, () =>
      createParticle(canvas.width, canvas.height),
    );
  }, [resolvedCount]);

  const draw = useCallback(() => {
    if (!visibleRef.current) { rafRef.current = requestAnimationFrame(draw); return; }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    particlesRef.current.forEach((p) => {
      // Mouse repulsion
      if (mouseRef.current) {
        const dx = mouseRef.current.x * devicePixelRatio - p.x;
        const dy = mouseRef.current.y * devicePixelRatio - p.y;
        const dist2 = dx * dx + dy * dy;
        const radius = 120 * devicePixelRatio;
        if (dist2 < radius * radius && dist2 > 0.01) {
          const inv = 1 / Math.sqrt(dist2);
          p.vx -= dx * inv * 0.06;
          p.vy -= dy * inv * 0.06;
        }
      }

      // Clamp velocity
      const maxV = 1.2;
      p.vx = clamp(p.vx, -maxV, maxV);
      p.vy = clamp(p.vy, -maxV, maxV);

      p.x += p.vx;
      p.y += p.vy;

      // Soft bounce at edges
      if (p.x < 0 || p.x > width)  { p.vx *= -0.85; p.x = clamp(p.x, 0, width); }
      if (p.y < 0 || p.y > height) { p.vy *= -0.85; p.y = clamp(p.y, 0, height); }

      // Draw glow dot
      const r = p.size * devicePixelRatio;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
      g.addColorStop(0, `rgba(94,234,212,${p.alpha})`);
      g.addColorStop(1, 'rgba(94,234,212,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resize();

    // Throttled mousemove — only update every 80ms
    const handleMouse = (e: MouseEvent) => {
      const now = performance.now();
      if (now - throttleRef.current < 80) return;
      throttleRef.current = now;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleLeave = () => { mouseRef.current = null; };

    // Pause particles when hero is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(canvas);

    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('mouseleave', handleLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      resizeObs.disconnect();
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [draw, resize]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
};

export default ParticlesBackground;
