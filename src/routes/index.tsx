import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificationLogo } from "@/components/portfolio/certification-logo";
import { ToolLogo } from "@/components/portfolio/tool-logos";
import { Availability } from "@/components/portfolio/shell";
import { SplitWords } from "@/components/portfolio/motion";
import { ProjectCarousel } from "@/components/portfolio/project-carousel";
import { StorySection } from "@/components/portfolio/story";
import { SkillsGrid } from "@/components/portfolio/skills";
import {
  emailLink,
  identity,
  nextCertification,
  pageHead,
  personSchema,
  portraitImage,
  roles,
  siteUrl,
  toolset,
} from "@/lib/portfolio";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: `${identity.name} | Business Intelligence Analyst in Tunis`,
      fullTitle: true,
      description:
        "PL-300 certified Business Intelligence Analyst in Tunis. Power BI case studies: complaint tracking for Attijari Bank and 100,000 Olist e-commerce orders.",
      path: "/",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: `${siteUrl}/`,
            name: identity.name,
            inLanguage: "en",
            publisher: { "@id": personSchema["@id"] },
          },
          personSchema,
        ],
      },
    }),
  component: Index,
});

function ToolMarquee() {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {toolset.map((tool) => (
        <li key={tool}>
          <span className="tool-name">
            <ToolLogo tool={tool} />
            {tool}
          </span>
        </li>
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
            {identity.role}
          </p>
          <p className="hero-lede hero-enter">
            I work across the whole data pipeline, from cleaning and modeling data in SQL to the
            Power BI reports on top. Each page answers one clear business question.
          </p>
          <div className="hero-actions hero-enter" style={{ "--i": 1 } as CSSProperties}>
            <Button asChild variant="portfolio" size="lg">
              <a href="#projects">
                See my work <ArrowDown />
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
              <MapPin size={14} /> {identity.location}
            </span>
            <a href={emailLink} aria-label={`Email ${identity.email}`} title="Email">
              <Mail size={18} aria-hidden="true" />
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
            alt="Portrait of Ayoub Ben Bouyahia, Business Intelligence Analyst"
            width={1000}
            height={1000}
            fetchPriority="high"
          />
        </figure>
      </div>
      <div className="hero-credential" data-stagger>
        <CertificationLogo brand="Microsoft" variant="microsoft" />
        <div className="hero-credential-copy">
          <div className="hero-credential-title">
            <strong>PL-300</strong>
            <span className="credential-status">
              <BadgeCheck size={14} aria-hidden="true" /> Certified
            </span>
          </div>
          <span>Microsoft Certified: Power BI Data Analyst Associate</span>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main>
      <Hero />
      <StorySection />
      <ProjectCarousel />
      <section className="skills-section" aria-labelledby="skills-title">
        <div className="container">
          <div className="section-heading" data-reveal="line">
            <div>
              <span className="eyebrow">TOOLKIT</span>
              <h2 id="skills-title" data-words aria-label="Power BI, DAX, SQL, and the rest.">
                <SplitWords text="Power BI, DAX, SQL, and the rest." />
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
      <section className="closing">
        <div className="container" data-stagger>
          <span className="eyebrow">WHAT’S NEXT</span>
          <h2 data-words aria-label="Open to BI roles.">
            <SplitWords text="Open to BI roles." accent={["roles."]} />
          </h2>
          <p>
            {roles}. Tell me what your team can’t answer from its reports yet. That’s the
            conversation I want to have.
          </p>
          <p className="closing-next">
            <Clock3 size={15} aria-hidden="true" /> Currently preparing for{" "}
            {nextCertification.title}
          </p>
          <div className="closing-actions">
            <Button asChild variant="portfolio" size="lg">
              <a href={emailLink}>
                Send me an email <Mail />
              </a>
            </Button>
            <Button asChild variant="portfolioOutline" size="lg">
              <a href={identity.linkedin} target="_blank" rel="noreferrer">
                Message me on LinkedIn <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
