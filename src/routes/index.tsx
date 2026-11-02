import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Availability } from "@/components/portfolio/shell";
import { CountUp, SplitWords } from "@/components/portfolio/motion";
import { CustomerFeedbackProjectCard, ProjectCard } from "@/components/portfolio/project-card";
import { SkillsGrid } from "@/components/portfolio/skills";
import { CertificationLogo } from "@/components/portfolio/certification-logo";
import {
  certifications,
  education,
  identity,
  pageHead,
  portraitImage,
  statement,
  toolset,
  work,
} from "@/lib/portfolio";
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

function Hero() {
  return (
    <section className="hero container">
      <span className="hero-glow" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-enter" style={{ "--i": -8 } as CSSProperties}>
            <Availability />
          </div>
          <h1 aria-label={identity.name}>
            <SplitWords text={identity.name} />
          </h1>
          <p className="hero-role hero-enter" style={{ "--i": -5 } as CSSProperties}>
            Business Intelligence Analyst
          </p>
          <p className="hero-lede hero-enter">
            I turn business data into clear decisions, building Power BI dashboards, SQL analysis,
            and reporting across sales, customers, and operations.
          </p>
          <div className="hero-actions hero-enter" style={{ "--i": 1 } as CSSProperties}>
            <Button asChild variant="portfolio" size="lg">
              <a href="#projects">
                See my projects <ArrowDown />
              </a>
            </Button>
            <Button asChild variant="portfolioOutline" size="lg">
              <Link to="/contact">
                Let’s talk <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <div className="hero-meta hero-enter" style={{ "--i": 2 } as CSSProperties}>
            <span className="portrait-caption">
              <MapPin size={14} /> Tunis, Tunisia
            </span>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
            >
              <Github size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <figure className="hero-portrait portrait-frame">
          <img
            src={portraitImage}
            alt="Ayoub Ben Bouyahia"
            width={1000}
            height={1000}
            fetchPriority="high"
          />
        </figure>
      </div>
      <dl className="stat-row" data-stagger>
        <div>
          <dt>PL-300</dt>
          <dd>Microsoft Power BI certified</dd>
        </div>
        <div>
          <dt>
            <CountUp value={2} duration={900} />
          </dt>
          <dd>end-to-end BI case studies</dd>
        </div>
      </dl>
    </section>
  );
}

function Index() {
  return (
    <main>
      <Hero />
      <section className="section container" id="projects">
        <div className="section-heading" data-reveal="line">
          <div>
            <span className="eyebrow">MY WORK</span>
            <h2 data-words aria-label="Projects">
              <SplitWords text="Projects" />
            </h2>
          </div>
          <Link to="/projects" className="text-link">
            View all projects <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="project-list">
          <ProjectCard />
          <CustomerFeedbackProjectCard />
        </div>
      </section>
      <section className="skills-section" aria-labelledby="skills-title">
        <div className="container">
          <div className="section-heading" data-reveal="line">
            <div>
              <span className="eyebrow">WHAT I WORK WITH</span>
              <h2 id="skills-title" data-words aria-label="Skills">
                <SplitWords text="Skills" />
              </h2>
            </div>
            <Link to="/about" className="text-link">
              More about me <ArrowUpRight size={17} />
            </Link>
          </div>
          <SkillsGrid />
        </div>
        <ToolMarquee />
      </section>
      <section className="band-light section" aria-labelledby="journey-title">
        <div className="container">
          <div className="section-heading" data-reveal="line">
            <div>
              <span className="eyebrow">MY BACKGROUND</span>
              <h2 id="journey-title" data-words aria-label="Experience and education">
                <SplitWords text="Experience & education" />
              </h2>
            </div>
            <Link to="/experience" className="text-link">
              My full journey <ArrowUpRight size={17} />
            </Link>
          </div>
          <p className="journey-intro" data-reveal>
            {statement}
          </p>
          <div className="credentials-grid">
            <div>
              <h3 className="credential-heading">
                <BriefcaseBusiness size={16} /> PROFESSIONAL EXPERIENCE
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
                  <GraduationCap size={16} /> ACADEMIC BACKGROUND
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
