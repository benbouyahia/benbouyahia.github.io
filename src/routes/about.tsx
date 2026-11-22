import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/portfolio/shell";
import { SkillsGrid } from "@/components/portfolio/skills";
import {
  identity,
  nextCertification,
  pageHead,
  personSchema,
  portraitImage,
  roles,
  siteUrl,
} from "@/lib/portfolio";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: `About ${identity.name} | BI Analyst in Tunis`,
      fullTitle: true,
      description:
        "BI analyst in Tunis: 14 months in sales and business development, a Master’s in Business Analytics from ESPRIT, and Microsoft PL-300. How I build reports.",
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
      <PageIntro label="ABOUT AYOUB" title="From business to data." accent={["data."]} />
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
              I’m a BI analyst based in Tunis.
            </h2>
            <p>
              My Olist report shows how I work. Executives, sales, and operations were all looking
              at the same 100,000 orders but asking different questions. Instead of one crowded
              dashboard, I built three pages on a single data model: one for each team, with the
              same definitions underneath.
            </p>
            <p>
              Before analytics, I spent 14 months in business development and sales at Impacts
              Digital and ABBK Physicsworks. I studied marketing at the Tunis Higher School of
              Commerce, completed a Master’s in Business Analytics at ESPRIT School of Business, and
              did a business analysis internship at Attijari Bank.
            </p>
            <p>
              I’m certified as a Microsoft Power BI Data Analyst (PL-300) and preparing for{" "}
              {nextCertification.title}. I’m looking for a {roles} role.
            </p>
            <Link to="/experience" className="text-link">
              See my experience <ArrowUpRight size={17} />
            </Link>
          </div>
          <SkillsGrid />
        </div>
      </section>
    </main>
  );
}
