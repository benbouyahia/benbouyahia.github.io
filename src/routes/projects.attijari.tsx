import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Database } from "lucide-react";
import { DashboardPageGallery } from "@/components/portfolio/report-gallery";
import { PageIntro } from "@/components/portfolio/shell";
import { customerFeedbackProject, pageHead } from "@/lib/portfolio";
import { customerFeedbackPages } from "@/lib/reports";

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
  "Founded rate",
  "Average assignment delay",
  "Average entry delay",
  "Average treatment delay",
  "Monthly KPI variation",
];

export const Route = createFileRoute("/projects/attijari")({
  head: () =>
    pageHead(
      customerFeedbackProject.title,
      "A five-page Power BI dashboard for monitoring customer feedback, complaint resolution, and operational delays at Attijari Bank Tunisia.",
    ),
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
        An interactive Power BI solution for monitoring customer feedback, investigating complaint
        patterns, and assessing resolution performance.
      </PageIntro>

      <div className="container">
        <dl className="case-facts">
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
      </div>

      <div className="case-sections container">
        <section className="case-section">
          <span className="eyebrow">01 / THE OBJECTIVE</span>
          <h2>Make feedback patterns easier to monitor.</h2>
          <p>
            Customer feedback provides information about service quality, recurring issues, and
            operational performance. This report brings those signals into one analytical experience
            for monitoring complaint volumes, resolution performance, and processing delays.
          </p>
          <p>
            Interactive filters support investigation across dates, channels, customer segments,
            service families, agencies, topics, complaint types, and priority levels.
          </p>
        </section>

        <section className="case-section">
          <span className="eyebrow">02 / THE DATA MODEL</span>
          <h2>A fact table connected to business dimensions.</h2>
          <p>
            The dimensional model centers on <code>fact_feedback</code> and connects it to
            descriptive tables for time, customers, service channels, agencies, topics, and
            complaint characteristics.
          </p>
          <div className="feedback-model" aria-label="Customer feedback dimensional model">
            <div className="feedback-model-fact">
              <Database size={19} />
              <div>
                <span>FACT TABLE</span>
                <strong>fact_feedback</strong>
              </div>
            </div>
            <div className="feedback-model-dimensions">
              {dimensions.map((dimension) => (
                <span key={dimension}>{dimension}</span>
              ))}
            </div>
          </div>
          <figure className="feedback-model-figure">
            <img
              src="/images/data-model.png"
              alt="Power BI relationship model showing fact_feedback connected to date, channel, client, agency, topic, family, complaint type, and priority dimensions"
              loading="lazy"
            />
            <figcaption>Power BI relationship model for customer feedback analysis.</figcaption>
          </figure>
        </section>

        <section className="case-section" id="dashboard-pages">
          <span className="eyebrow">03 / THE REPORT</span>
          <h2>Five views for feedback operations.</h2>
          <DashboardPageGallery />
        </section>

        <section className="case-section">
          <span className="eyebrow">04 / PERFORMANCE INDICATORS</span>
          <h2>Monitor workload, resolution, and delay.</h2>
          <p>
            DAX measures organize the operational indicators into a consistent view. The dashboard
            supports month-over-month comparisons alongside current-period performance.
          </p>
          <ul className="feedback-kpi-list">
            {kpis.map((kpi) => (
              <li key={kpi}>{kpi}</li>
            ))}
          </ul>
        </section>

        <section className="case-section">
          <span className="eyebrow">05 / BUSINESS VALUE</span>
          <h2>From complaint records to operational questions.</h2>
          <ul>
            <li>Monitor complaint volume, resolution rate, and response time in one report.</li>
            <li>
              Compare feedback across channels, customer segments, service families, and agencies.
            </li>
            <li>Identify unresolved and urgent cases for further investigation.</li>
            <li>Review assignment, entry, and treatment delays to inform improvement work.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
