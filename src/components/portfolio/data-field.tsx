import { useEffect, useRef } from "react";

type Rgb = [number, number, number];

const levels = 10;
const pointerRadius = 190;

function parseHex(value: string, fallback: Rgb): Rgb {
  const match = /^#?([0-9a-f]{6})$/i.exec(value.trim());
  if (!match) return fallback;
  const hex = Number.parseInt(match[1]!, 16);
  return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Three slow waves added together. Only their crests light up, so warm patches form, drift,
// and fade like a live heatmap. Returns 0 (resting dot) to 1 (brightest patch).
function heatAt(x: number, y: number, t: number) {
  const wave =
    Math.sin(x * 0.0042 + t * 0.21) * Math.cos(y * 0.0051 - t * 0.17) +
    0.6 * Math.sin((x + y) * 0.0027 + t * 0.11) +
    0.4 * Math.cos(x * 0.0083 - y * 0.0061 + t * 0.29);
  return smoothstep(0.55, 0.9, (wave + 2) / 4);
}

// The page background: a fine dot matrix, like the plot area of a chart, drawn on one canvas.
// With full motion the heat patches drift, the grid moves at a fraction of the scroll speed,
// and dots near the mouse brighten and part slightly. Reduced motion gets one still frame.
export function DataField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const root = document.documentElement;
    const animate = root.classList.contains("motion-full");
    const followPointer =
      animate && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const styles = getComputedStyle(root);
    const base = parseHex(styles.getPropertyValue("--foreground"), [242, 239, 232]);
    const accent = parseHex(styles.getPropertyValue("--primary"), [217, 130, 91]);

    // Dots are grouped by brightness so each group is drawn with a single fill colour.
    const palette = Array.from({ length: levels }, (_, index) => {
      const k = index / (levels - 1);
      const mix = (from: number, to: number) => Math.round(from + (to - from) * k);
      const alpha = 0.12 + k * 0.5;
      return {
        fill: `rgba(${mix(base[0], accent[0])}, ${mix(base[1], accent[1])}, ${mix(base[2], accent[2])}, ${alpha.toFixed(3)})`,
        size: 1 + k * 1.4,
      };
    });
    const buckets: number[][] = palette.map(() => []);

    let width = 0;
    let height = 0;
    let spacing = 24;
    // Phones show more text per square inch, so the heat patches are softer there.
    let heatStrength = 0.7;
    let ratio = 1;
    // Dots land on whole device pixels, so they stay crisp instead of smearing across four.
    const snap = (value: number) => Math.round(value * ratio) / ratio;
    const resize = () => {
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      spacing = width < 640 ? 20 : 24;
      heatStrength = width < 640 ? 0.4 : 0.7;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, target: 0, seen: false };

    const draw = (time: number) => {
      const t = time / 1000;
      const drift = animate ? window.scrollY * 0.12 : 0;
      const firstRow = Math.floor(drift / spacing);
      const rows = Math.ceil(height / spacing) + 2;
      const columns = Math.floor(width / spacing) + 1;
      const left = (width % spacing) / 2;
      const top = spacing / 2 - drift;
      const reach = pointerRadius * pointerRadius;
      for (const bucket of buckets) bucket.length = 0;

      for (let row = -1; row < rows; row++) {
        const worldY = (firstRow + row) * spacing;
        const y = worldY + top;
        for (let column = 0; column < columns; column++) {
          const x = left + column * spacing;
          let level = heatAt(x, worldY, t) * heatStrength;
          let drawX = x;
          let drawY = y;
          if (pointer.strength > 0.01) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const distanceSquared = dx * dx + dy * dy;
            if (distanceSquared < reach) {
              const distance = Math.sqrt(distanceSquared) || 1;
              const falloff = 1 - distance / pointerRadius;
              const bloom = falloff * falloff * pointer.strength;
              level += bloom;
              drawX += (dx / distance) * bloom * 6;
              drawY += (dy / distance) * bloom * 6;
            }
          }
          const index = Math.round(Math.min(level, 1) * (levels - 1));
          buckets[index]!.push(drawX, drawY);
        }
      }

      context.clearRect(0, 0, width, height);
      buckets.forEach((points, index) => {
        if (!points.length) return;
        const { fill } = palette[index]!;
        const size = Math.max(1, Math.round(palette[index]!.size * ratio)) / ratio;
        const half = size / 2;
        context.fillStyle = fill;
        for (let i = 0; i < points.length; i += 2) {
          context.fillRect(snap(points[i]! - half), snap(points[i + 1]! - half), size, size);
        }
      });
    };

    resize();
    const stillFrame = 14000;

    if (!animate) {
      draw(stillFrame);
      canvas.classList.add("is-ready");
      const onResize = () => {
        resize();
        draw(stillFrame);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let frame = 0;
    let lastDraw = -Infinity;
    let lastScroll = -1;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      pointer.x += (pointer.targetX - pointer.x) * 0.14;
      pointer.y += (pointer.targetY - pointer.y) * 0.14;
      pointer.strength += (pointer.target - pointer.strength) * 0.08;
      const pointerMoving =
        Math.abs(pointer.targetX - pointer.x) > 0.3 ||
        Math.abs(pointer.targetY - pointer.y) > 0.3 ||
        Math.abs(pointer.target - pointer.strength) > 0.005;
      const scrolled = window.scrollY !== lastScroll;
      // The drift is slow, so an idle page redraws about 30 times a second;
      // scrolling and mouse movement get every frame.
      if (!pointerMoving && !scrolled && now - lastDraw < 33) return;
      lastDraw = now;
      lastScroll = window.scrollY;
      draw(stillFrame + now);
    };

    const onMove = (event: PointerEvent) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.target = 1;
      if (!pointer.seen) {
        pointer.seen = true;
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }
    };
    const onLeave = () => {
      pointer.target = 0;
    };
    const onResize = () => {
      resize();
      lastDraw = -Infinity;
    };

    // Start after the first paint so the page's own content loads first.
    const start = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
      canvas.classList.add("is-ready");
    }, 120);
    window.addEventListener("resize", onResize);
    if (followPointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("pointerleave", onLeave);
    }
    return () => {
      window.clearTimeout(start);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="data-field" aria-hidden="true" />;
}
