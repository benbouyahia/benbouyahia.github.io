import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Database, BriefcaseBusiness, MapPin, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/portfolio/shell";
import { pageHead } from "@/lib/portfolio";
import { portfolioMedia } from "@/lib/media";
import portrait from "@/assets/linkedin_profile_high_quality.png.asset.json";
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
      <PageIntro label="ABOUT AYOUB" title="Curious by nature. Analytical by choice." />
      <section className="container about-layout">
        <figure className="m-0">
          <img
            src={portfolioMedia(portrait)}
            alt="Ayoub Ben Bouyahia"
            width={380}
            height={475}
            className="portrait-photo"
          />
          <figcaption className="portrait-caption">
            <MapPin size={13} /> Tunis, Tunisia
          </figcaption>
        </figure>
        <div className="about-copy">
          <h2>
            Hi, I’m Ayoub.
            <br />I connect data and business.
          </h2>
          <p>
            I hold a Master’s in Business Analytics and have worked in business development, sales,
            CRM, and marketing. That experience gives me a practical lens for analysis: the numbers
            matter most when they help someone make a better decision.
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
          <div className="skills-grid">
            <div>
              <BarChart3 className="skill-icon" size={24} />
              <h3>Visualization</h3>
              <ul>
                <li>Power BI & DAX</li>
                <li>Excel reporting</li>
                <li>Dashboard design</li>
              </ul>
            </div>
            <div>
              <Database className="skill-icon" size={24} />
              <h3>Data</h3>
              <ul>
                <li>SQL queries</li>
                <li>Data modeling</li>
                <li>Microsoft Fabric</li>
              </ul>
            </div>
            <div>
              <BriefcaseBusiness className="skill-icon" size={24} />
              <h3>Business</h3>
              <ul>
                <li>KPI analysis</li>
                <li>Sales & CRM</li>
                <li>Marketing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
