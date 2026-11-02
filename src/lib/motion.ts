import { useEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";

// Runs in <head> before first paint so scroll reveals never flash. If hydration
// fails, the timeout removes the class and all content stays visible.
export const motionBootstrapScript = `(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("js-motion");setTimeout(function(){if(!d.classList.contains("motion-live"))d.classList.remove("js-motion")},4000)})();`;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Marks [data-reveal] and [data-stagger] elements as they enter the viewport.
// The MutationObserver picks up new elements after route and tab changes.
export function useRevealOnScroll() {
  useEffect(() => {
    document.documentElement.classList.add("motion-live");
    const selector = "[data-reveal]:not(.is-in), [data-stagger]:not(.is-in)";
    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          intersection.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const observeAll = () => {
      document.querySelectorAll(selector).forEach((element) => intersection.observe(element));
    };
    observeAll();
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      intersection.disconnect();
      mutations.disconnect();
    };
  }, []);
}

// Eases mouse-wheel scrolling on desktop. Touch keeps native scrolling, and
// open dialogs keep their own scroll lock.
export function useSmoothScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion() || !finePointer) return;
    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
      prevent: () => document.body.hasAttribute("data-scroll-locked"),
    });
    return () => lenis.destroy();
  }, []);
}

// Writes scroll progress through an element to its --p custom property.
// "pin" runs while a tall element's sticky child is held; "pass" runs as it crosses the viewport.
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  mode: "pin" | "pass",
  onChange?: (progress: number) => void,
) {
  const callback = useRef(onChange);
  callback.current = onChange;
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      const height = window.innerHeight;
      const raw =
        mode === "pin"
          ? box.height > height
            ? -box.top / (box.height - height)
            : 1
          : (height * 0.85 - box.top) / (box.height + height * 0.35);
      const progress = Math.min(Math.max(raw, 0), 1);
      element.style.setProperty("--p", progress.toFixed(4));
      callback.current?.(progress);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, mode]);
}
