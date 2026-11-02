import { useEffect, useRef, useState, type CSSProperties } from "react";
import { X } from "lucide-react";
import { getSavedMotionPreference, saveMotionPreference } from "@/lib/motion";

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
    if (!element) return;
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

// A copper dot trails the mouse, grows over links, and becomes a label over data-cursor elements.
export function CursorLabel() {
  const root = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = root.current;
    const label = text.current;
    const usable =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      document.documentElement.classList.contains("motion-full");
    if (!element || !label || !usable) return;
    let frame = 0;
    let started = false;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    const follow = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      const settled = Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(follow);
    };
    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!started) {
        started = true;
        x = targetX;
        y = targetY;
        element.classList.add("is-visible");
      }
      const target = event.target instanceof Element ? event.target : null;
      const name = target?.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (name) label.textContent = name;
      element.classList.toggle("is-active", Boolean(name));
      element.classList.toggle("is-link", Boolean(target?.closest("a, button")));
      if (!frame) frame = requestAnimationFrame(follow);
    };
    const hide = () => element.classList.remove("is-active");
    const onLeave = () => element.classList.remove("is-visible");
    const onEnter = () => element.classList.add("is-visible");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", hide);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", hide);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, []);
  return (
    <div ref={root} className="cursor-label" aria-hidden="true">
      <i />
      <span ref={text} />
    </div>
  );
}

function applyMotionPreference(preference: "full" | "gentle") {
  saveMotionPreference(preference);
  window.location.reload();
}

// Footer switch for choosing the motion tier on this device.
export function MotionToggle() {
  const [full, setFull] = useState<boolean | null>(null);
  useEffect(() => {
    setFull(document.documentElement.classList.contains("motion-full"));
  }, []);
  if (full === null) return null;
  return (
    <button
      type="button"
      className="text-link motion-toggle"
      aria-pressed={full}
      onClick={() => applyMotionPreference(full ? "gentle" : "full")}
    >
      {full ? "Motion: full" : "Motion: reduced"}
    </button>
  );
}

// One-time offer for devices that ask for reduced motion, so the choice stays with the visitor.
export function MotionNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShow(reduced && !getSavedMotionPreference());
  }, []);
  if (!show) return null;
  return (
    <div className="motion-notice" role="status">
      <span>Reduced motion is on for this device.</span>
      <button type="button" onClick={() => applyMotionPreference("full")}>
        Turn on full motion
      </button>
      <button
        type="button"
        className="motion-notice-close"
        aria-label="Keep reduced motion"
        title="Keep reduced motion"
        onClick={() => {
          saveMotionPreference("gentle");
          setShow(false);
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
