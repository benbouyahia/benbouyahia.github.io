import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Database } from "lucide-react";
import { DashboardPageGallery } from "@/components/portfolio/report-gallery";
import { PageIntro } from "@/components/portfolio/shell";
import { caseStudySchema, customerFeedbackProject, pageHead } from "@/lib/portfolio";
import { customerFeedbackPages, feedbackGalleryCopy } from "@/lib/reports";

const dimensions = [
  "dim_date",
  "dim_channel",
  "dim_client",
  "dim_famille",
  "dim_agence",
  "dim_topic",
  "dim_reclamation_type",
  "dim_priority",
];

const kpis = [
  "Total complaints",
  "Resolution rate",
  "Average response time",
  "Unresolved feedback",
  "Urgent complaints",
  "Closed complaints",
  "Justified complaint rate",
  "Average assignment delay",
  "Average entry delay",
  "Average treatment delay",
  "Monthly KPI variation",
];

const description =
  "Power BI and SQL Server case study: a five-page customer complaint report for Attijari Bank Tunisia, tracking resolution, urgent cases, and handling delays.";

export const Route = createFileRoute("/projects/attijari")({
  head: () =>
    pageHead({
      title: "Attijari Bank Complaint Analysis | Power BI Case Study",
      fullTitle: true,
      description,
      path: "/projects/attijari",
      type: "article",
      jsonLd: caseStudySchema({
        title: customerFeedbackProject.title,
        description,
        path: "/projects/attijari",
        image: customerFeedbackPages[0].image,
        keywords: ["Power BI", "DAX", "SQL Server", "customer experience", "banking analytics"],
      }),
    }),
  component: AttijariCaseStudy,
});

function AttijariCaseStudy() {
  return (
    <main>
      <div className="container case-back">
        <Link to="/projects" className="text-link">
          <ArrowLeft size={15} /> All projects
        </Link>
      </div>
      <PageIntro label="CASE STUDY / CUSTOMER EXPERIENCE" title={customerFeedbackProject.title}>
        {customerFeedbackProject.description}
      </PageIntro>

      <div className="container">
        <dl className="case-facts hero-enter">
          <div>
            <dt>ORGANIZATION</dt>
            <dd>{customerFeedbackProject.organization}</dd>
          </div>
          <div>
            <dt>TOOLS</dt>
            <dd>{customerFeedbackProject.tools.join(" · ")}</dd>
          </div>
          <div>
            <dt>REPORT STRUCTURE</dt>
            <dd>{customerFeedbackPages.length} analytical pages</dd>
          </div>
        </dl>
        <figure className="case-hero" style={{ viewTransitionName: "case-attijari" }}>
          <img
            src={customerFeedbackPages[0].image}
            alt={customerFeedbackPages[0].alt}
            width={992}
            height={728}
          />
        </figure>
      </div>

      <div className="case-sections container">
        <section className="case-section" data-stagger>
          <span className="eyebrow">01 / THE OBJECTIVE</span>
          <h2>Make complaints easier to learn from.</h2>
          <p>
            Every complaint says something about a product, a channel, or a process. One at a time,
            they are hard to learn from. Together, they show where service breaks down. This report
            brings them into one place: how many complaints arrive, how quickly they are resolved,
            and where handling slows down.
          </p>
          <p>
            Filters let a team narrow any view by date, channel, customer segment, service family,
            agency, topic, complaint type, or priority.
          </p>
        </section>

        <section className="case-section">
          <span className="eyebrow">02 / THE DATA MODEL</span>
          <h2 data-reveal>One fact table, eight ways to slice it.</h2>
          <p data-reveal>
            The star schema puts every complaint in <code>fact_feedback</code> and links it to eight
            dimensions: date, channel, client, service family, agency, topic, complaint type, and
            priority. Each filter in the report maps to one of them.
          </p>
          <div
            className="feedback-model"
            aria-label="Customer feedback dimensional model"
            data-reveal
          >
            <div className="feedback-model-fact">
              <Database size={19} />
              <div>
                <span>FACT TABLE</span>
                <strong>fact_feedback</strong>
              </div>
            </div>
            <div className="feedback-model-dimensions" data-stagger>
              {dimensions.map((dimension) => (
                <span key={dimension}>{dimension}</span>
              ))}
            </div>
          </div>
          <figure className="feedback-model-figure" data-reveal>
            <img
              src="/images/data-model.png"
              alt="Power BI relationship model showing fact_feedback connected to date, channel, client, agency, topic, family, complaint type, and priority dimensions"
              width={987}
              height={716}
              loading="lazy"
            />
            <figcaption>The relationship model in Power BI.</figcaption>
          </figure>
        </section>

        <section className="case-section" id="dashboard-pages">
          <span className="eyebrow">03 / THE REPORT</span>
          <h2 data-reveal>Five pages, from the big picture to the detail.</h2>
          <DashboardPageGallery
            items={customerFeedbackPages}
            copy={feedbackGalleryCopy}
            width={992}
            height={728}
          />
        </section>

        <section className="case-section">
          <span className="eyebrow">04 / PERFORMANCE INDICATORS</span>
          <h2 data-reveal>Eleven measures, three questions.</h2>
          <p data-reveal>
            How much is coming in? How well is it being resolved? How long does it take? The DAX
            measures below answer those three questions, each shown for the current period and
            against the previous month.
          </p>
          <ul className="feedback-kpi-list" data-stagger>
            {kpis.map((kpi) => (
              <li key={kpi}>{kpi}</li>
            ))}
          </ul>
        </section>

        <section className="case-section" data-stagger>
          <span className="eyebrow">05 / WHAT IT CHANGES</span>
          <h2>What a team can do with it.</h2>
          <ul>
            <li>See complaint volume, resolution rate, and response time on one page.</li>
            <li>
              Compare channels, customer segments, service families, and agencies side by side.
            </li>
            <li>Spot unresolved and urgent cases before they age.</li>
            <li>Find which step slows things down: assignment, entry, or treatment.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
