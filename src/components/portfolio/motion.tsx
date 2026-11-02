import { useEffect, useRef, type CSSProperties } from "react";

// Headline whose words rise from behind a mask. Pure CSS, so it also plays for prerendered HTML.
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
    <>
      <span className="sr-only">{text}</span>
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
    </>
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
  return (
    <>
      <span className="sr-only">{finalText}</span>
      <span ref={ref} aria-hidden="true">
        {finalText}
      </span>
    </>
  );
}
