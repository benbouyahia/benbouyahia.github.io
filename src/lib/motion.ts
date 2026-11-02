import { useEffect } from "react";
import Lenis from "lenis";

const preferenceKey = "motion-preference";
export type MotionPreference = "full" | "gentle";

// Runs in <head> before first paint and picks the motion tier: a saved choice wins, otherwise
// the device setting decides. If hydration fails, the timeout removes the classes so all
// content stays visible.
export const motionBootstrapScript = `(function(){var d=document.documentElement,s=null;try{s=localStorage.getItem("${preferenceKey}")}catch(e){}var f=s?s==="full":!matchMedia("(prefers-reduced-motion: reduce)").matches;d.classList.add("js-motion",f?"motion-full":"motion-gentle");setTimeout(function(){if(!d.classList.contains("motion-live"))d.classList.remove("js-motion","motion-full","motion-gentle")},4000)})();`;

const fullMotion = () => document.documentElement.classList.contains("motion-full");
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function getSavedMotionPreference(): MotionPreference | null {
  try {
    const saved = window.localStorage.getItem(preferenceKey);
    return saved === "full" || saved === "gentle" ? saved : null;
  } catch {
    return null;
  }
}

export function saveMotionPreference(preference: MotionPreference) {
  try {
    window.localStorage.setItem(preferenceKey, preference);
  } catch {
    // Without storage the choice only lasts for this page.
  }
}

// Marks [data-reveal], [data-stagger] and [data-words] elements as they enter the viewport.
// The MutationObserver picks up new elements after route and tab changes.
export function useRevealOnScroll() {
  useEffect(() => {
    document.documentElement.classList.add("motion-live");
    const selector =
      "[data-reveal]:not(.is-in), [data-stagger]:not(.is-in), [data-words]:not(.is-in)";
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
    if (!fullMotion() || !finePointer()) return;
    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
      anchors: true,
      prevent: () => document.body.hasAttribute("data-scroll-locked"),
    });
    return () => lenis.destroy();
  }, []);
}

// Buttons lean slightly toward the mouse and settle back when it leaves.
export function useMagneticButtons() {
  useEffect(() => {
    if (!fullMotion() || !finePointer()) return;
    let active: HTMLElement | null = null;
    const onMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const button = target?.closest<HTMLElement>(".portfolio-button") ?? null;
      if (active && active !== button) active.style.translate = "";
      active = button;
      if (!button) return;
      const box = button.getBoundingClientRect();
      const x = (event.clientX - (box.left + box.width / 2)) * 0.22;
      const y = (event.clientY - (box.top + box.height / 2)) * 0.32;
      button.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}
