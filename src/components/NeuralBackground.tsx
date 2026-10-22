import { useEffect, useRef } from 'react';

// Easter egg: type "ml" anywhere to wake up a small neural network behind the page.
// Signals fire from the input layer and propagate forward; nodes near the cursor glow.

const LAYERS = [4, 7, 7, 5, 2];

interface Node {
  x: number;
  y: number;
  glow: number;
}
interface Signal {
  from: Node;
  to: Node;
  layer: number;
  t: number;
  speed: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let layers: Node[][] = [];
    let signals: Signal[] = [];
    let raf = 0;
    let frame = 0;
    let colors = { accent: '#a78bfa', line: '#888' };
    const mouse = { x: -9999, y: -9999 };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = { accent: cs.getPropertyValue('--accent').trim(), line: cs.getPropertyValue('--fg-subtle').trim() };
    };

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const padX = w * 0.08;
      const padY = h * 0.14;
      layers = LAYERS.map((count, li) =>
        Array.from({ length: count }, (_, ni) => ({
          x: padX + ((w - padX * 2) * li) / (LAYERS.length - 1),
          y: padY + ((h - padY * 2) * (ni + 1)) / (count + 1),
          glow: 0,
        })),
      );
      signals = [];
    };

    const fire = (layer: number, node: Node) => {
      const next = layers[layer + 1];
      if (!next) return;
      // Each neuron activates a random subset of the next layer.
      for (const to of next) {
        if (Math.random() < 0.35) signals.push({ from: node, to, layer, t: 0, speed: 0.012 + Math.random() * 0.01 });
      }
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.line;
      ctx.globalAlpha = 0.16;
      ctx.beginPath();
      for (let li = 0; li < layers.length - 1; li++)
        for (const a of layers[li])
          for (const b of layers[li + 1]) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
      ctx.stroke();

      ctx.fillStyle = colors.accent;
      for (const s of signals) {
        const x = s.from.x + (s.to.x - s.from.x) * s.t;
        const y = s.from.y + (s.to.y - s.from.y) * s.t;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const layer of layers)
        for (const n of layer) {
          const near = Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / 220);
          const g = Math.min(1, n.glow + near);
          ctx.globalAlpha = 0.25 + g * 0.6;
          ctx.fillStyle = g > 0.05 ? colors.accent : colors.line;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 5 + g * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      frame++;
      if (frame % 60 === 0) readColors();
      if (frame % 40 === 0) fire(0, layers[0][Math.floor(Math.random() * layers[0].length)]);
      for (const s of signals) s.t += s.speed;
      const arrived = signals.filter((s) => s.t >= 1);
      signals = signals.filter((s) => s.t < 1).slice(-160);
      for (const s of arrived) {
        s.to.glow = 1;
        if (Math.random() < 0.5) fire(s.layer + 1, s.to);
      }
      for (const layer of layers) for (const n of layer) n.glow *= 0.94;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(tick);
    };

    readColors();
    layout();
    if (reduce) draw();
    else raf = requestAnimationFrame(tick);
    window.addEventListener('resize', layout);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', layout);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70 motion-safe:animate-[fade-in_0.8s_ease-out]"
    />
  );
}
