import { useEffect, useRef, type CSSProperties } from "react";

// Headline whose words rise from behind a mask. Pure CSS, so it also plays for prerendered HTML.
// The heading using it carries the full text as its aria-label.
export function SplitWords({
  text,
  accent = [],
  startIndex = 0,
}: {
  text: string;
  accent?: string[] | undefined;
  startIndex?: number;
}) {
  const words = text.split(" ");
  return (
    <span aria-hidden="true">
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="split-word">
            <span
              className={accent.includes(word) ? "split-accent" : undefined}
              style={{ "--i": index + startIndex } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

// Counts up to a figure when it scrolls into view. The server-rendered text is the
// final value, so it stays correct without JavaScript or when frames never run.
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${prefix}${value.toFixed(decimals)}${suffix}`;
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        element.textContent = `${prefix}${(value * eased).toFixed(decimals)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, decimals, prefix, suffix, duration]);
  return <span ref={ref}>{finalText}</span>;
}

// Small label that trails the mouse over elements with data-cursor. Mouse devices only.
export function CursorLabel() {
  const root = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = root.current;
    const label = text.current;
    const usable =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!element || !label || !usable) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    const follow = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const settled = Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(follow);
    };
    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const host = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
      const name = host?.getAttribute("data-cursor");
      if (name) {
        if (!element.classList.contains("is-active")) {
          x = targetX;
          y = targetY;
        }
        label.textContent = name;
      }
      element.classList.toggle("is-active", Boolean(name));
      if (!frame) frame = requestAnimationFrame(follow);
    };
    const hide = () => element.classList.remove("is-active");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", hide);
    };
  }, []);
  return (
    <div ref={root} className="cursor-label" aria-hidden="true">
      <span ref={text} />
    </div>
  );
}
