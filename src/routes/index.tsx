import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Database,
  Table2,
  MapPin,
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  BadgeCheck,
  Clock3,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Availability } from "@/components/portfolio/shell";
import { CustomerFeedbackProjectCard, ProjectCard } from "@/components/portfolio/project-card";
import { CertificationLogo } from "@/components/portfolio/certification-logo";
import { pageHead, work, education, certifications, identity } from "@/lib/portfolio";
import portrait from "@/assets/linkedin_profile_high_quality.png.asset.json";
import { portfolioMedia } from "@/lib/media";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Business Intelligence & Data Analyst",
      "Ayoub Ben Bouyahia is a Business Intelligence and Data Analyst in Tunis, building actionable Power BI and SQL reporting.",
    ),
  component: Index,
});
const roleDescriptions = [
  "Business Intelligence Analyst",
  "Power BI Developer",
  "SQL Reporting Analyst",
];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleText, setVisibleText] = useState(roleDescriptions[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roleDescription = roleDescriptions[roleIndex];
    const isTyping = visibleText.length < roleDescription.length;
    const delay = isDeleting ? 38 : isTyping ? 72 : 1350;
    const timer = window.setTimeout(() => {
      if (isDeleting && visibleText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((currentIndex) => (currentIndex + 1) % roleDescriptions.length);
      } else if (isDeleting) {
        setVisibleText((currentText) => currentText.slice(0, -1));
      } else if (isTyping) {
        setVisibleText(roleDescription.slice(0, visibleText.length + 1));
      } else {
        setIsDeleting(true);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, roleIndex, visibleText]);

  return (
    <div className="hero-role">
      <span className="sr-only">
        Business Intelligence Analyst, Power BI Developer, SQL Reporting Analyst
      </span>
      <span className="typewriter-track" aria-hidden="true">
        <span className="typewriter-text">{visibleText}</span>
        <span className="type-cursor" />
      </span>
    </div>
  );
}

function Index() {
  return (
    <main>
      <section className="home-hero portrait-hero">
        <img
          src={portfolioMedia(portrait)}
          alt="Ayoub Ben Bouyahia"
          width={900}
          height={900}
          className="hero-portrait"
        />
        <div className="portrait-registration" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="portrait-floats" aria-hidden="true">
          <span className="float-chip float-chip--powerbi">
            <BarChart3 size={15} />
            Power BI
          </span>
          <span className="float-chip float-chip--sql">
            <Database size={15} />
            SQL
          </span>
          <span className="float-chip float-chip--excel">
            <Table2 size={15} />
            Excel
          </span>
          <span className="float-spark float-spark--one" />
          <span className="float-spark float-spark--two" />
        </div>
        <div className="container hero-content">
          <Availability />
          <div className="hero-introduction">
            HELLO, I’M AYOUB <span className="intro-line" />
          </div>
          <h1>
            Ayoub <br className="hero-name-break" />
            Ben Bouyahia<span className="name-dot">.</span>
          </h1>
          <TypewriterRole />
          <p>
            Power BI dashboards, SQL analysis, and reporting across sales, customers, and
            operations.
          </p>
          <div className="hero-actions">
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
          <div className="hero-location">
            <MapPin size={14} /> Tunis, Tunisia
          </div>
          <div className="hero-socials" aria-label="Social profiles">
            <span>Follow me</span>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section className="section container" id="selected-work">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SELECTED WORK</span>
            <h2>
              Selected projects<span className="name-dot">.</span>
            </h2>
          </div>
          <Link to="/projects" className="text-link">
            View all projects <ArrowUpRight size={17} />
          </Link>
        </div>
        <ProjectCard />
        <CustomerFeedbackProjectCard />
      </section>
      <section className="home-about">
        <div className="container home-about-inner">
          <span className="eyebrow">ABOUT AYOUB</span>
          <div>
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
      <section className="section container home-journey" aria-labelledby="journey-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPERIENCE & QUALIFICATIONS</span>
            <h2 id="journey-title">
              Experience &amp; credentials<span className="name-dot">.</span>
            </h2>
          </div>
          <Link to="/experience" className="text-link">My full journey <ArrowUpRight size={17} /></Link>
        </div>
        <div className="home-credentials-layout">
          <div className="home-work">
            <h3 className="credential-heading"><BriefcaseBusiness size={19} /> Experience</h3>
            <ol className="home-work-list">
              {work.map((item) => (
                <li key={item.title}>
                  <span className="eyebrow">{item.date}</span>
                  <h4>{item.title}</h4>
                  <p>{item.organization}</p>
                  <span className="home-work-label">{item.label}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="home-qualifications">
            <div>
              <h3 className="credential-heading"><GraduationCap size={20} /> Education</h3>
              {education.map((item) => (
                <div className="home-education-item" key={item.title}>
                  <span className="eyebrow">{item.date}</span>
                  <h4>{item.title}</h4>
                  <p>{item.organization}</p>
                </div>
              ))}
            </div>
            <div className="home-certifications">
              <h3 className="credential-heading"><Award size={20} /> Certifications</h3>
              {certifications.map((item) => (
                <div className="home-certification-item" key={item.title}>
                  <div className="certification-summary">
                    <CertificationLogo brand={item.brand} variant={item.variant} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.organization}</p>
                    </div>
                  </div>
                  <span className={`credential-status ${item.status === "In progress" ? "credential-pending" : ""}`}>
                    {item.status === "Certified" ? <BadgeCheck size={14} /> : <Clock3 size={14} />}
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="container contact-band">
        <div>
          <Availability />
          <h2>Open to BI opportunities.</h2>
          <p>Business Intelligence, Data Analyst, and BI Developer roles.</p>
        </div>
        <Button asChild variant="portfolio" size="lg">
          <Link to="/contact">
            Start a conversation <ArrowUpRight />
          </Link>
        </Button>
      </section>
    </main>
  );
}
