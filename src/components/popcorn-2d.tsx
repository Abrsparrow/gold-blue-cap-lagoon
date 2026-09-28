import { useEffect, useRef } from "react";

type Kernel = {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  r: number; rot: number; vr: number; flying: boolean;
};

const COUNT = 70;

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
    r: 18 + Math.random() * 16,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 6,
    flying,
  };
}

export function Popcorn2D() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, last = performance.now(), intro = 1.4, idle = 0;
    const pointer = { x: 0, y: 0, px: 0, py: 0 };
    let kernels: Kernel[] = [];
    const bucketImg = new Image();
    const kernelImg = new Image();
    let assetsReady = 0;
    const onAsset = () => { assetsReady += 1; };
    bucketImg.onload = onAsset;
    kernelImg.onload = onAsset;
    bucketImg.src = "/media/popcorn-bucket.webp";
    kernelImg.src = "/media/popcorn-kernel.webp";

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
      const i = kernels.findIndex((k) => !k.flying && k.vy === 0);
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

    const onMove = (e: PointerEvent) => { pointer.x = e.clientX; pointer.y = e.clientY; };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      intro = Math.max(0, intro - dt);
      idle += dt;
      const dx = pointer.x - pointer.px;
      const dy = pointer.y - pointer.py;
      const dist = Math.hypot(dx, dy);
      pointer.px = pointer.x; pointer.py = pointer.y;
      if (dist > 6) {
        const n = dist > 28 ? 4 : 2;
        for (let i = 0; i < n; i++) spawn(dx / 80, dy / 80);
        idle = 0;
      } else if (idle > (intro > 0 ? 0.05 : 0.16)) {
        idle = 0;
        spawn((Math.random() - 0.5) * 0.8, -0.6);
      }
      ctx.fillStyle = "#070708";
      ctx.fillRect(0, 0, w, h);
      const g = ctx.createRadialGradient(w * (w >= 720 ? 0.62 : 0.5), h * 0.42, 20, w * 0.55, h * 0.5, Math.max(w, h) * 0.55);
      g.addColorStop(0, "rgba(196, 92, 74, 0.14)");
      g.addColorStop(0.45, "rgba(20, 20, 24, 0.18)");
      g.addColorStop(1, "rgba(7, 7, 8, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      const cx = w * (w >= 720 ? 0.62 : 0.5);
      const cy = h * 0.52;
      const scale = Math.min(w, h) / 520;
      if (assetsReady >= 1 && bucketImg.complete) {
        const bw = 220 * scale, bh = 220 * scale;
        ctx.drawImage(bucketImg, cx - bw / 2, cy - bh * 0.55, bw, bh);
      }
      const gravity = 980;
      for (const k of kernels) {
        if (k.flying || k.vy !== 0) {
          k.vy += gravity * dt;
          k.x += k.vx * dt;
          k.y += k.vy * dt;
          k.rot += k.vr * dt;
          k.vx *= 0.995;
          if (k.y > h + 40) Object.assign(k, makeKernel(w, h, false));
        }
      }
      const ordered = [...kernels].sort((a, b) => a.z - b.z);
      for (const k of ordered) {
        if (assetsReady >= 2 && kernelImg.complete) {
          ctx.save();
          ctx.translate(k.x, k.y);
          ctx.rotate(k.rot);
          const size = k.r * 2.2;
          ctx.globalAlpha = 0.92 + k.z * 0.08;
          ctx.drawImage(kernelImg, -size / 2, -size / 2, size, size);
          ctx.restore();
        }
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
