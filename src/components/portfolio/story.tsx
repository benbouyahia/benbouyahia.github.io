import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SplitWords } from "@/components/portfolio/motion";
import { CertificationLogo } from "@/components/portfolio/certification-logo";
import { story } from "@/lib/portfolio";

const pad = (value: number) => String(value).padStart(2, "0");

// The career told as chapters. A sticky index on wide screens follows the chapter being read.
export function StorySection() {
  const [active, setActive] = useState(0);
  const chapters = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(Number((entry.target as HTMLElement).dataset["index"] ?? 0));
        }
      },
      { rootMargin: "-38% 0px -52% 0px" },
    );
    chapters.current.forEach((chapter) => chapter && observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="band-light section story" aria-labelledby="story-title">
      <div className="container">
        <div className="section-heading" data-reveal="line">
          <div>
            <span className="eyebrow">HOW I GOT HERE</span>
            <h2 id="story-title" data-words aria-label="From a marketing degree to PL-300.">
              <SplitWords text="From a marketing degree to PL-300." accent={["PL-300."]} />
            </h2>
          </div>
          <Link to="/experience" className="text-link">
            Full experience <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="story-layout">
          <nav
            className="story-nav"
            aria-label="Story chapters"
            style={{ "--progress": (active + 1) / story.length } as CSSProperties}
          >
            <span className="story-rail" aria-hidden="true">
              <span />
            </span>
            <ol>
              {story.map((chapter, index) => (
                <li key={chapter.id}>
                  <a
                    href={`#story-${chapter.id}`}
                    className={index === active ? "is-active" : undefined}
                    aria-current={index === active ? "step" : undefined}
                  >
                    <span>{pad(index + 1)}</span>
                    {chapter.keyword}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <ol className="story-chapters">
            {story.map((chapter, index) => (
              <li
                key={chapter.id}
                id={`story-${chapter.id}`}
                data-index={index}
                ref={(element) => {
                  chapters.current[index] = element;
                }}
                className={index === active ? "story-chapter is-active" : "story-chapter"}
              >
                <div className="story-chapter-head" data-reveal>
                  <span className="story-number" aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <span className="story-keyword">
                    <span className="sr-only">Chapter {index + 1}: </span>
                    {chapter.keyword}
                  </span>
                </div>
                <h3 data-reveal>{chapter.title}</h3>
                <p data-reveal>{chapter.body}</p>
                <ul className="story-evidence" data-stagger>
                  {chapter.evidence.map((item) => (
                    <li key={item.title}>
                      <span className="eyebrow">{item.date}</span>
                      <div className="story-evidence-title">
                        {item.logo && (
                          <CertificationLogo brand={item.logo.brand} variant={item.logo.variant} />
                        )}
                        <strong>{item.title}</strong>
                      </div>
                      <span>{item.organization}</span>
                    </li>
                  ))}
                </ul>
                {index === story.length - 1 && (
                  <a href="#projects" className="text-link story-next">
                    See the case studies <ArrowDown size={16} />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
