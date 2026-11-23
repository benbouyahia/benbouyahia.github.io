import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { SplitWords } from "@/components/portfolio/motion";
import { ToolLogo } from "@/components/portfolio/tool-logos";
import { projectSlides, type ProjectSlide as Slide } from "@/lib/showcase";

const pad = (value: number) => String(value).padStart(2, "0");
const slidesOf = (track: HTMLElement) => Array.from(track.children) as HTMLElement[];
const scrollBehavior = (): ScrollBehavior =>
  document.documentElement.classList.contains("motion-full") ? "smooth" : "auto";

function ProjectSlide({ slide, index }: { slide: Slide; index: number }) {
  const [page, setPage] = useState(0);
  const current = slide.pages[page] ?? slide.pages[0]!;
  return (
    <article className="carousel-card">
      <div className="carousel-visual">
        <Link
          to={slide.to}
          className="carousel-media"
          data-cursor="View"
          aria-label={`Open the ${slide.title} case study`}
          style={{ viewTransitionName: slide.transitionName } as CSSProperties}
        >
          <img
            key={current.image}
            src={current.image}
            alt={current.alt}
            width={slide.width}
            height={slide.height}
            loading={index === 0 ? undefined : "lazy"}
            draggable={false}
          />
        </Link>
        <div className="carousel-pages" role="group" aria-label={`${slide.title} report pages`}>
          {slide.pages.map((item, pageIndex) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show the ${item.name} page`}
              title={item.name}
              aria-pressed={pageIndex === page}
              onClick={() => setPage(pageIndex)}
            >
              <img src={item.image} alt="" loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      </div>
      <div className="carousel-copy">
        <div className="project-meta">
          <span>{slide.label}</span>
          <span>{slide.context}</span>
        </div>
        <Link to={slide.to} className="project-title">
          <h3>{slide.title}</h3>
        </Link>
        <p>{slide.description}</p>
        <div className="carousel-highlight">
          <span className="eyebrow">{slide.highlight.label}</span>
          <strong>{slide.highlight.value}</strong>
          <p>{slide.highlight.text}</p>
        </div>
        <div className="tag-list">
          {slide.tools.map((tool) => (
            <span key={tool}>
              <ToolLogo tool={tool} />
              {tool}
            </span>
          ))}
        </div>
        <Link to={slide.to} className="text-link">
          Explore case study <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}

// Horizontal case-study carousel. Native scroll snapping handles touch, trackpads and focus;
// the arrows, keyboard and mouse dragging move between slides on top of it.
export function ProjectCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = projectSlides.length + 1;

  const nearest = useCallback(() => {
    const element = track.current;
    if (!element) return 0;
    if (element.scrollLeft >= element.scrollWidth - element.clientWidth - 4) return total - 1;
    const start = parseFloat(getComputedStyle(element).paddingLeft) || 0;
    let best = 0;
    let distance = Infinity;
    slidesOf(element).forEach((slide, index) => {
      const gap = Math.abs(slide.offsetLeft - start - element.scrollLeft);
      if (gap < distance) {
        distance = gap;
        best = index;
      }
    });
    return best;
  }, [total]);

  const goTo = useCallback(
    (index: number) => {
      const element = track.current;
      if (!element) return;
      const target = slidesOf(element)[Math.max(0, Math.min(total - 1, index))];
      if (!target) return;
      const start = parseFloat(getComputedStyle(element).paddingLeft) || 0;
      element.scrollTo({ left: target.offsetLeft - start, behavior: scrollBehavior() });
    },
    [total],
  );

  // Follow the scroll position, whatever moved it.
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setActive(nearest());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    element.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [nearest]);

  // Mouse dragging. Touch and pens keep native scrolling; a drag never counts as a click.
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let startX = 0;
    let startLeft = 0;
    let startIndex = 0;
    let pressed = false;
    let dragged = false;
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      pressed = true;
      dragged = false;
      startX = event.clientX;
      startLeft = element.scrollLeft;
      startIndex = nearest();
    };
    const onMove = (event: PointerEvent) => {
      if (!pressed) return;
      const distance = event.clientX - startX;
      if (!dragged && Math.abs(distance) > 6) {
        dragged = true;
        element.classList.add("is-dragging");
        element.setPointerCapture(event.pointerId);
      }
      if (dragged) element.scrollLeft = startLeft - distance;
    };
    const onUp = (event: PointerEvent) => {
      if (!pressed) return;
      pressed = false;
      if (!dragged) return;
      // A deliberate drag moves one slide in its direction; a short one settles back.
      const distance = event.clientX - startX;
      const step = Math.abs(distance) > 60 ? (distance < 0 ? 1 : -1) : 0;
      element.classList.remove("is-dragging");
      goTo(startIndex + step);
    };
    const onClick = (event: MouseEvent) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    };
    const onDragStart = (event: DragEvent) => event.preventDefault();
    element.addEventListener("pointerdown", onDown);
    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerup", onUp);
    element.addEventListener("pointercancel", onUp);
    element.addEventListener("click", onClick, true);
    element.addEventListener("dragstart", onDragStart);
    return () => {
      element.removeEventListener("pointerdown", onDown);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerup", onUp);
      element.removeEventListener("pointercancel", onUp);
      element.removeEventListener("click", onClick, true);
      element.removeEventListener("dragstart", onDragStart);
    };
  }, [goTo, nearest]);

  return (
    <section
      className="projects-carousel"
      id="projects"
      aria-roledescription="carousel"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="section-heading" data-reveal="line">
          <div>
            <span className="eyebrow">A BANK AND A MARKETPLACE</span>
            <h2 id="projects-title" data-words aria-label="Power BI case studies">
              <SplitWords text="Power BI case studies" />
            </h2>
          </div>
          <div className="carousel-controls">
            <span className="carousel-count" aria-live="polite" aria-atomic="true">
              <span className="sr-only">Slide </span>
              {pad(active + 1)}
              <span aria-hidden="true"> / </span>
              <span className="sr-only"> of </span>
              {pad(total)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="carousel-button"
              aria-label="Previous project"
              title="Previous project"
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="carousel-button"
              aria-label="Next project"
              title="Next project"
              disabled={active === total - 1}
              onClick={() => goTo(active + 1)}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
      <div
        ref={track}
        className="carousel-track"
        data-cursor="Drag"
        data-reveal
        tabIndex={0}
        aria-label="Projects, scroll sideways"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(active + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(active - 1);
          }
        }}
      >
        {projectSlides.map((slide, index) => (
          <div
            key={slide.to}
            className={index === active ? "carousel-slide is-active" : "carousel-slide"}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total}: ${slide.title}`}
          >
            <ProjectSlide slide={slide} index={index} />
          </div>
        ))}
        <div
          className={
            active === total - 1
              ? "carousel-slide carousel-slide-end is-active"
              : "carousel-slide carousel-slide-end"
          }
          role="group"
          aria-roledescription="slide"
          aria-label={`${total} of ${total}: All case studies`}
        >
          <div className="carousel-card carousel-end">
            <span className="eyebrow">IN THE FULL WRITE-UPS</span>
            <h3>Star schemas, DAX measures, and what the numbers said.</h3>
            <p>
              Each case study walks through the data model, every report page, and the findings,
              with the original Power BI screenshots.
            </p>
            <div className="carousel-end-actions">
              <Button asChild variant="portfolio" size="lg">
                <Link to="/projects">
                  View all projects <ArrowUpRight />
                </Link>
              </Button>
              <Link to="/contact" className="text-link">
                Get in touch <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          className="carousel-progress"
          aria-hidden="true"
          style={{ "--progress": (active + 1) / total } as CSSProperties}
        >
          <span />
        </div>
      </div>
    </section>
  );
}
