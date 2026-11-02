import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/portfolio/shell";
import { SkillsGrid } from "@/components/portfolio/skills";
import { pageHead, portraitImage } from "@/lib/portfolio";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About me",
      "Meet Ayoub Ben Bouyahia, a Business Analytics graduate with a background in business development, sales, CRM and marketing.",
    ),
  component: About,
});
function About() {
  return (
    <main>
      <PageIntro
        label="ABOUT AYOUB"
        title="Curious by nature. Analytical by choice."
        accent={["choice."]}
      />
      <section className="container about-layout">
        <figure className="about-portrait">
          <div className="portrait-frame hero-enter">
            <img src={portraitImage} alt="Ayoub Ben Bouyahia" width={1000} height={1000} />
          </div>
          <figcaption className="portrait-caption">
            <MapPin size={13} /> Tunis, Tunisia
          </figcaption>
        </figure>
        <div className="about-copy">
          <div data-stagger>
            <h2>
              Hi, I’m Ayoub.
              <br />I connect data and business.
            </h2>
            <p>
              I hold a Master’s in Business Analytics and have worked in business development,
              sales, CRM, and marketing. That experience gives me a practical lens for analysis: the
              numbers matter most when they help someone make a better decision.
            </p>
            <p>
              I build Power BI and SQL reporting with the business question at the center—from
              identifying sales drivers to understanding customer behavior and delivery performance.
            </p>
            <p>
              I’m interested in Business Intelligence, Data Analyst, and BI Developer opportunities
              where I can bring an analytical mindset and a business perspective to the same table.
            </p>
            <Link to="/experience" className="text-link">
              Explore my journey <ArrowUpRight size={17} />
            </Link>
          </div>
          <SkillsGrid />
        </div>
      </section>
    </main>
  );
}
