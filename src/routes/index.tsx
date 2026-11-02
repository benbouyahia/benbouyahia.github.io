import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  BadgeCheck,
  Clock3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Availability } from "@/components/portfolio/shell";
import { CountUp, HeroChart, SplitWords } from "@/components/portfolio/motion";
import { CustomerFeedbackProjectCard, ProjectCard } from "@/components/portfolio/project-card";
import { CertificationLogo } from "@/components/portfolio/certification-logo";
import {
  pageHead,
  work,
  education,
  certifications,
  portraitImage,
  statement,
  toolset,
} from "@/lib/portfolio";
import { reports, storyChapters } from "@/lib/reports";
import { useScrollProgress } from "@/lib/motion";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Business Intelligence & Data Analyst",
      "Ayoub Ben Bouyahia is a Business Intelligence and Data Analyst in Tunis, building actionable Power BI and SQL reporting.",
    ),
  component: Index,
});

function ToolMarquee() {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {toolset.map((tool) => (
        <li key={tool}>{tool}</li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" aria-label="Tools">
      <div className="marquee-track">
        {list(false)}
        {list(true)}
        {list(true)}
        {list(true)}
      </div>
    </div>
  );
}

function HeroMedia() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, "pin");
  return (
    <div className="hero-media" ref={ref}>
      <figure className="hero-media-pin m-0">
        <Link
          to="/projects/olist"
          className="hero-media-link"
          data-cursor="View"
          aria-label="Open the Olist sales and delivery case study"
        >
          <div className="hero-media-frame">
            <img
              src={reports[0].image}
              alt={reports[0].alt}
              width={1300}
              height={727}
              fetchPriority="high"
            />
          </div>
        </Link>
        <figcaption className="hero-media-caption">
          Olist Power BI reports, about 100,000 orders
        </figcaption>
      </figure>
    </div>
  );
}

function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  useScrollProgress(ref, "pass");
  const words = statement.split(" ");
  return (
    <section className="section statement">
      <div className="container statement-grid">
        <div>
          <span className="eyebrow">ABOUT AYOUB</span>
          <p className="statement-text" ref={ref} style={{ "--n": words.length } as CSSProperties}>
            {words.map((word, index) => (
              <span
                className="statement-word"
                key={`${word}-${index}`}
                style={{ "--i": index } as CSSProperties}
              >
                {word}{" "}
              </span>
            ))}
          </p>
          <Link to="/about" className="text-link">
            More about me <ArrowUpRight size={17} />
          </Link>
        </div>
        <figure className="portrait-frame" data-reveal="wipe">
          <img
            src={portraitImage}
            alt="Ayoub Ben Bouyahia"
            width={900}
            height={900}
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}

function Story() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useScrollProgress(ref, "pin", (progress) => {
    setActive(Math.min(Math.floor(progress * storyChapters.length), storyChapters.length - 1));
  });
  return (
    <section className="story section" ref={ref}>
      <div className="story-pin container">
        <div className="story-heading">
          <span className="eyebrow">HOW THE WORK COMES TOGETHER</span>
          <h2 data-words aria-label="From a business question to a trusted report.">
            <SplitWords text="From a business question to a trusted report." accent={["report."]} />
          </h2>
        </div>
        <ol className="story-list">
          {storyChapters.map((chapter, index) => (
            <li className="story-chapter" key={chapter.title} data-active={index === active}>
              <div>
                <span className="eyebrow">
                  0{index + 1} / 0{storyChapters.length}
                </span>
                <h3>{chapter.title}</h3>
                <p>{chapter.description}</p>
              </div>
              <div className="story-media">
                <img
                  src={chapter.image}
                  alt={chapter.alt}
                  width={chapter.width}
                  height={chapter.height}
                  loading="lazy"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main>
      <section className="container hero-copy">
        <span className="hero-glow" aria-hidden="true" />
        <HeroChart />
        <div className="hero-enter" style={{ "--i": -8 } as CSSProperties}>
          <Availability />
        </div>
        <h1 aria-label="Turning business data into decisions.">
          <SplitWords text="Turning business data into decisions." accent={["decisions."]} />
        </h1>
        <div className="hero-row">
          <p className="hero-lede hero-enter">
            I’m Ayoub Ben Bouyahia, a Business Intelligence Analyst in Tunis. Power BI dashboards,
            SQL analysis, and reporting across sales, customers, and operations.
          </p>
          <div className="hero-actions hero-enter" style={{ "--i": 1 } as CSSProperties}>
            <Button asChild variant="portfolio" size="lg">
              <Link to="/projects">
                Explore my work <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="portfolioOutline" size="lg">
              <Link to="/about">
                A little about me <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <HeroMedia />
      <ToolMarquee />
      <Statement />
      <Story />
      <section className="section container" id="selected-work">
        <div className="section-heading" data-reveal="line">
          <div>
            <span className="eyebrow">SELECTED WORK</span>
            <h2 data-words aria-label="Selected projects">
              <SplitWords text="Selected projects" accent={["projects"]} />
            </h2>
          </div>
          <Link to="/projects" className="text-link">
            View all projects <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="work-grid">
          <ProjectCard />
          <CustomerFeedbackProjectCard />
        </div>
      </section>
      <section className="container" aria-label="Highlights">
        <dl className="stat-row" data-stagger>
          <div>
            <dt>PL-300</dt>
            <dd>Microsoft Power BI certified</dd>
          </div>
          <div>
            <dt>
              <CountUp value={100} suffix="K+" />
            </dt>
            <dd>orders analysed</dd>
          </div>
          <div>
            <dt>
              <CountUp value={2} duration={900} />
            </dt>
            <dd>end-to-end BI case studies</dd>
          </div>
        </dl>
      </section>
      <div className="credentials-band">
        <section className="band-light section" aria-labelledby="journey-title">
          <div className="container">
            <div className="section-heading" data-reveal="line">
              <div>
                <span className="eyebrow">EXPERIENCE & QUALIFICATIONS</span>
                <h2 id="journey-title" data-words aria-label="Experience and credentials">
                  <SplitWords text="Experience & credentials" accent={["credentials"]} />
                </h2>
              </div>
              <Link to="/experience" className="text-link">
                My full journey <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="credentials-grid">
              <div>
                <h3 className="credential-heading">
                  <BriefcaseBusiness size={16} /> EXPERIENCE
                </h3>
                <ol className="timeline-rail" data-stagger>
                  {work.map((item) => (
                    <li key={item.title}>
                      <span className="eyebrow">{item.date}</span>
                      <h4>{item.title}</h4>
                      <p>{item.organization}</p>
                      <span className="credential-tag">{item.label}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <div className="credential-block">
                  <h3 className="credential-heading">
                    <GraduationCap size={16} /> EDUCATION
                  </h3>
                  <div data-stagger>
                    {education.map((item) => (
                      <div className="credential-item" key={item.title}>
                        <span className="eyebrow">{item.date}</span>
                        <h4>{item.title}</h4>
                        <p>{item.organization}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="credential-block">
                  <h3 className="credential-heading">
                    <Award size={16} /> CERTIFICATIONS
                  </h3>
                  <div data-stagger>
                    {certifications.map((item) => (
                      <div className="credential-item certification-row" key={item.title}>
                        <div className="certification-summary">
                          <CertificationLogo brand={item.brand} variant={item.variant} />
                          <div>
                            <h4>{item.title}</h4>
                            <p>{item.organization}</p>
                          </div>
                        </div>
                        <span
                          className={`credential-status ${item.status === "In progress" ? "credential-pending" : ""}`}
                        >
                          {item.status === "Certified" ? (
                            <BadgeCheck size={13} />
                          ) : (
                            <Clock3 size={13} />
                          )}
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="closing">
        <div className="container" data-stagger>
          <Availability />
          <h2 data-words aria-label="Open to BI opportunities.">
            <SplitWords text="Open to BI opportunities." accent={["opportunities."]} />
          </h2>
          <p>Business Intelligence, Data Analyst, and BI Developer roles.</p>
          <Button asChild variant="portfolio" size="lg">
            <Link to="/contact">
              Start a conversation <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
