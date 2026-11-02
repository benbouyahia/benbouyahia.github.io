import { createFileRoute, Link } from "@tanstack/react-router";
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
import { CountUp, SplitWords } from "@/components/portfolio/motion";
import { CustomerFeedbackProjectCard, ProjectCard } from "@/components/portfolio/project-card";
import { CertificationLogo } from "@/components/portfolio/certification-logo";
import { pageHead, work, education, certifications, portraitImage, toolset } from "@/lib/portfolio";
import { reports } from "@/lib/reports";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Business Intelligence & Data Analyst",
      "Ayoub Ben Bouyahia is a Business Intelligence and Data Analyst in Tunis, building actionable Power BI and SQL reporting.",
    ),
  component: Index,
});

function ToolTicker() {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {toolset.map((tool) => (
        <li key={tool}>{tool}</li>
      ))}
    </ul>
  );
  return (
    <div className="ticker" aria-label="Tools">
      <div className="ticker-track">
        {list(false)}
        {list(true)}
        {list(true)}
        {list(true)}
      </div>
    </div>
  );
}

function Index() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-enter">
                <Availability />
              </div>
              <h1>
                <SplitWords text="Turning business data into decisions." accent={["decisions."]} />
              </h1>
              <p className="hero-lede hero-enter" style={{ "--i": 1 } as React.CSSProperties}>
                I’m Ayoub Ben Bouyahia, a Business Intelligence Analyst in Tunis. Power BI
                dashboards, SQL analysis, and reporting across sales, customers, and operations.
              </p>
              <div className="hero-actions hero-enter" style={{ "--i": 2 } as React.CSSProperties}>
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
            <figure className="m-0 hero-stack-drift">
              <Link
                to="/projects/olist"
                className="hero-stack"
                aria-label="Open the Olist sales and delivery case study"
              >
                {[reports[2], reports[1], reports[0]].map((report) => (
                  <img
                    key={report.name}
                    className="stack-sheet"
                    src={report.image}
                    alt=""
                    width={1300}
                    height={727}
                  />
                ))}
              </Link>
              <figcaption
                className="hero-figure-caption hero-enter"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                Fig. 1: Olist Power BI reports, about 100,000 orders
              </figcaption>
            </figure>
          </div>
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
        </div>
      </section>
      <ToolTicker />
      <section className="band-dark" id="selected-work">
        <div className="section container">
          <div className="section-heading" data-reveal="line">
            <div>
              <span className="eyebrow">SELECTED WORK</span>
              <h2>Selected projects</h2>
            </div>
            <Link to="/projects" className="text-link">
              View all projects <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="case-stack">
            <ProjectCard />
            <CustomerFeedbackProjectCard />
          </div>
        </div>
      </section>
      <section className="home-about section">
        <div className="container home-about-inner">
          <figure className="portrait-frame" data-reveal="wipe">
            <img
              src={portraitImage}
              alt="Ayoub Ben Bouyahia"
              width={900}
              height={900}
              loading="lazy"
            />
          </figure>
          <div data-stagger>
            <span className="eyebrow">ABOUT AYOUB</span>
            <h2>Sales, marketing, and analytics.</h2>
            <p>
              From sales conversations to SQL queries, I’ve always been interested in understanding
              what makes a business move. Today, I bring that perspective to data.
            </p>
            <Link to="/about" className="text-link">
              More about me <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container" aria-labelledby="journey-title">
        <div className="section-heading" data-reveal="line">
          <div>
            <span className="eyebrow">EXPERIENCE & QUALIFICATIONS</span>
            <h2 id="journey-title">Experience &amp; credentials</h2>
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
      </section>
      <section className="band-dark contact-band">
        <div className="container" data-stagger>
          <Availability />
          <h2>Open to BI opportunities.</h2>
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
