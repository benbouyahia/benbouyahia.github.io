import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/portfolio/shell";
import { SkillsGrid } from "@/components/portfolio/skills";
import {
  aboutFacts,
  emailLink,
  identity,
  nextCertification,
  pageHead,
  personSchema,
  portraitImage,
  siteUrl,
} from "@/lib/portfolio";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: `About ${identity.name} | BI Analyst in Tunis`,
      fullTitle: true,
      description:
        "Ayoub Ben Bouyahia is a Business Intelligence Analyst in Tunis working with Power BI, SQL and data pipelines. Master’s in Business Analytics, Microsoft PL-300.",
      path: "/about",
      type: "profile",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: `${siteUrl}/about/`,
        mainEntity: personSchema,
      },
    }),
  component: About,
});
function About() {
  return (
    <main>
      <PageIntro label="ABOUT ME" title="From business to data." accent={["data."]} />
      <section className="container about-layout">
        <figure className="about-portrait">
          <div className="portrait-frame hero-enter">
            <img
              src={portraitImage}
              alt="Portrait of Ayoub Ben Bouyahia"
              width={1000}
              height={1000}
            />
          </div>
          <figcaption className="portrait-caption">
            <MapPin size={13} /> {identity.location}
          </figcaption>
        </figure>
        <div className="about-copy">
          <div data-stagger>
            <h2>
              Hi, I’m Ayoub.
              <br />
              I’m a Business Intelligence Analyst in Tunis.
            </h2>
            <p className="about-lead">
              I build Power BI reports and the data pipelines behind them. I clean and model the
              data in SQL, write the measures in DAX, and design reports that are easy to read.
            </p>
          </div>

          <dl className="about-facts" data-stagger>
            {aboutFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="about-block" data-stagger>
            <span className="eyebrow">MY BACKGROUND</span>
            <p>
              I have a bachelor’s degree in marketing and started my career in sales and business
              development.
            </p>
            <p>
              I moved into data with a Master’s in Business Analytics. I’m Microsoft PL-300
              certified and preparing for {nextCertification.title}.
            </p>
            <p>
              Coming from sales, I start every report with the questions the business needs
              answered.
            </p>
            <Link to="/experience" className="text-link">
              See my full experience <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="about-block">
            <span className="eyebrow">SKILLS</span>
            <SkillsGrid />
          </div>

          <div className="about-cta" data-stagger>
            <span className="eyebrow">GET IN TOUCH</span>
            <h3>Hiring for a BI or data role?</h3>
            <p>
              Send me an email at <a href={emailLink}>{identity.email}</a>. You can also see my work
              first.
            </p>
            <div className="about-actions">
              <Button asChild variant="portfolio" size="lg">
                <a href={emailLink}>
                  Send me an email <Mail />
                </a>
              </Button>
              <Button asChild variant="portfolioOutline" size="lg">
                <Link to="/projects">
                  See my projects <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
