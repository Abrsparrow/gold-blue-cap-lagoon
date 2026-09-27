import { useEffect, useRef } from "react";

type Kernel = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  r: number;
  rot: number;
  vr: number;
  flying: boolean;
  hue: number;
};

const COUNT = 90;

function makeKernel(w: number, h: number, flying: boolean): Kernel {
  const cx = w * 0.62;
  const cy = h * 0.52;
  const a = Math.random() * Math.PI * 2;
  const rad = Math.random() * 36;
  return {
    x: cx + Math.cos(a) * rad,
    y: cy - 18 + Math.random() * 46,
    z: Math.random(),
    vx: flying ? (Math.random() - 0.5) * 420 : 0,
    vy: flying ? -220 - Math.random() * 280 : 0,
    vz: 0,
    r: 5 + Math.random() * 6,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 8,
    flying,
    hue: 38 + Math.random() * 18,
  };
}

export function Popcorn2D() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let intro = 1.4;
    let idle = 0;
    const pointer = { x: 0, y: 0, px: 0, py: 0 };
    let kernels: Kernel[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect() ?? canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      kernels = Array.from({ length: COUNT }, () => makeKernel(w, h, false));
    };

    const spawn = (dirx: number, diry: number) => {
      const i = kernels.findIndex((k) => !k.flying && k.vy === 0) % COUNT;
      const idx = i >= 0 ? i : Math.floor(Math.random() * COUNT);
      const k = makeKernel(w, h, true);
      const cx = w * (w >= 720 ? 0.62 : 0.5);
      const cy = h * 0.48;
      k.x = cx + (Math.random() - 0.5) * 28;
      k.y = cy - 70;
      k.vx = dirx * 380 + (Math.random() - 0.5) * 180;
      k.vy = -260 - Math.random() * 220 + Math.min(0, diry) * 80;
      kernels[idx] = k;
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const drawBucket = (cx: number, cy: number, scale: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.beginPath();
      ctx.ellipse(0, 92, 78, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      const top = -62;
      const bot = 88;
      const topW = 78;
      const botW = 58;

      const body = ctx.createLinearGradient(-topW, top, topW, bot);
      body.addColorStop(0, "#b4433a");
      body.addColorStop(0.45, "#8f2c26");
      body.addColorStop(1, "#6a1f1b");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.moveTo(-topW, top);
      ctx.lineTo(topW, top);
      ctx.lineTo(botW, bot);
      ctx.lineTo(-botW, bot);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#efe7dc";
      for (let i = 0; i < 7; i++) {
        const t = (i + 0.5) / 7;
        const x0 = -topW + t * topW * 2;
        const x1 = -botW + t * botW * 2;
        ctx.beginPath();
        ctx.moveTo(x0 - 4, top);
        ctx.lineTo(x0 + 4, top);
        ctx.lineTo(x1 + 3, bot);
        ctx.lineTo(x1 - 3, bot);
        ctx.closePath();
        ctx.fill();
      }

      ctx.strokeStyle = "#e4dcd2";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.ellipse(0, top, topW, 14, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#6f221e";
      ctx.beginPath();
      ctx.ellipse(0, top, topW - 2, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      intro = Math.max(0, intro - dt);
      idle += dt;

      const dx = pointer.x - pointer.px;
      const dy = pointer.y - pointer.py;
      const dist = Math.hypot(dx, dy);
      pointer.px = pointer.x;
      pointer.py = pointer.y;

      if (dist > 6) {
        const n = dist > 28 ? 5 : 2;
        for (let i = 0; i < n; i++) spawn(dx / 80, dy / 80);
        idle = 0;
      } else if (idle > (intro > 0 ? 0.05 : 0.16)) {
        idle = 0;
        spawn((Math.random() - 0.5) * 0.8, -0.6);
      }

      ctx.fillStyle = "#070708";
      ctx.fillRect(0, 0, w, h);

      const g = ctx.createRadialGradient(
        w * (w >= 720 ? 0.62 : 0.5),
        h * 0.42,
        20,
        w * 0.55,
        h * 0.5,
        Math.max(w, h) * 0.55,
      );
      g.addColorStop(0, "rgba(196, 92, 74, 0.16)");
      g.addColorStop(0.45, "rgba(20, 20, 24, 0.2)");
      g.addColorStop(1, "rgba(7, 7, 8, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const cx = w * (w >= 720 ? 0.62 : 0.5);
      const cy = h * 0.52;
      const scale = Math.min(w, h) / 520;

      drawBucket(cx, cy, scale);

      const gravity = 980;
      for (const k of kernels) {
        if (k.flying || k.vy !== 0) {
          k.vy += gravity * dt;
          k.x += k.vx * dt;
          k.y += k.vy * dt;
          k.rot += k.vr * dt;
          k.vx *= 0.995;
          if (k.y > h + 40) {
            Object.assign(k, makeKernel(w, h, false));
          }
        }
      }

      const ordered = [...kernels].sort((a, b) => a.z - b.z);
      for (const k of ordered) {
        ctx.save();
        ctx.translate(k.x, k.y);
        ctx.rotate(k.rot);
        ctx.fillStyle = `hsl(${k.hue} 62% ${58 + k.z * 18}%)`;
        ctx.beginPath();
        ctx.ellipse(0, 0, k.r * 1.15, k.r * 0.85, 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,248,230,0.7)";
        ctx.beginPath();
        ctx.ellipse(-k.r * 0.25, -k.r * 0.3, k.r * 0.35, k.r * 0.22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="block h-full w-full" aria-hidden />;
}
