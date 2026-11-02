import { useEffect } from "react";

// Runs in <head> before first paint so scroll reveals never flash. If hydration
// fails, the timeout removes the class and all content stays visible.
export const motionBootstrapScript = `(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("js-motion");setTimeout(function(){if(!d.classList.contains("motion-live"))d.classList.remove("js-motion")},4000)})();`;

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
