import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/portfolio/shell";
import { CountUp } from "@/components/portfolio/motion";
import { caseStudySchema, identity, pageHead, project } from "@/lib/portfolio";
import { DashboardPageGallery } from "@/components/portfolio/report-gallery";
import { olistGalleryCopy, reports } from "@/lib/reports";
import { AnalyticsProcess } from "@/components/portfolio/analytics-process";

const description =
  "Power BI and PostgreSQL case study: 100,000 Olist orders turned into three reports for executives, sales and operations, and what the data showed.";

export const Route = createFileRoute("/projects/olist")({
  head: () =>
    pageHead({
      title: "Olist Sales & Delivery Analysis | Power BI Case Study",
      fullTitle: true,
      description,
      path: "/projects/olist",
      type: "article",
      jsonLd: caseStudySchema({
        title: project.title,
        description,
        path: "/projects/olist",
        image: reports[0].image,
        keywords: ["Power BI", "DAX", "PostgreSQL", "e-commerce analytics", "Olist dataset"],
      }),
    }),
  component: Olist,
});
function Olist() {
  return (
    <main>
      <div className="container case-back">
        <Link to="/projects" className="text-link">
          <ArrowLeft size={15} /> All projects
        </Link>
      </div>
      <PageIntro label="CASE STUDY / BUSINESS INTELLIGENCE" title={project.title}>
        {project.description}
      </PageIntro>
      <div className="container">
        <dl className="case-facts hero-enter">
          <div>
            <dt>TOOLS</dt>
            <dd>PostgreSQL · Power BI · DAX</dd>
          </div>
          <div>
            <dt>DATASET</dt>
            <dd>Olist Brazilian E-Commerce · 2016–2018</dd>
          </div>
          <div>
            <dt>PROJECT TYPE</dt>
            <dd>Portfolio project · Public data</dd>
          </div>
        </dl>
        <figure className="case-hero" style={{ viewTransitionName: "case-olist" }}>
          <img src={reports[0].image} alt={reports[0].alt} width={1300} height={727} />
        </figure>
      </div>
      <div className="case-sections container">
        <section className="case-section" data-stagger>
          <span className="eyebrow">01 / THE QUESTION</span>
          <h2>Same data. Different decisions.</h2>
          <p>
            Executives, sales and operations all look at the same orders, but they ask different
            questions. Executives want the headline: are we growing? Sales wants to know who is
            buying and how. Operations wants to know whether orders arrive when promised.
          </p>
          <p>
            One generic dashboard answers none of those well. So I built one report with three
            pages, one per audience, all running on the same data model and the same definitions.
          </p>
        </section>
        <section className="case-section">
          <span className="eyebrow">02 / THE PROCESS</span>
          <h2 data-reveal>From CSV files to a trusted report.</h2>
          <p data-reveal>
            The public Olist dataset holds about 100,000 orders placed across Brazil between 2016
            and 2018. I loaded it into PostgreSQL and modeled Orders, Customers, Products, Payments,
            Order Items, Reviews, and a Date table. One order can contain several items, so totals
            are calculated at the item level to avoid double counting.
          </p>
          <AnalyticsProcess />
          <p data-reveal>
            Before building any visuals, I checked for duplicates, nulls, and broken foreign keys,
            and verified the calculated metrics and aggregates. DAX measures then cover sales,
            distinct orders and customers, month-over-month change, and delivery performance.
          </p>
        </section>
        <section className="case-section" id="report-pages">
          <span className="eyebrow">03 / THE REPORT</span>
          <h2 data-reveal>Three pages, one for each team.</h2>
          <p data-reveal>
            Each page answers one team’s questions. Shared slicers for date, state, and product
            category, plus reset buttons and info overlays, keep the three pages working the same
            way.
          </p>
          <DashboardPageGallery items={reports} copy={olistGalleryCopy} width={1300} height={727} />
        </section>
        <section className="case-section">
          <span className="eyebrow">04 / THE FINDINGS</span>
          <h2 data-reveal>Three numbers worth a second look.</h2>
          <div className="insight-grid" data-stagger>
            <div className="insight">
              <strong>
                <CountUp value={1.13} decimals={2} suffix="M" />
              </strong>
              <p>in Health & Beauty sales, the top category in the report’s selected view.</p>
            </div>
            <div className="insight">
              <strong>2×+</strong>
              <p>São Paulo outsells Rio de Janeiro by more than double: 1.65M against 0.73M.</p>
            </div>
            <div className="insight">
              <strong>
                <CountUp value={8.7} decimals={1} prefix="−" suffix="%" />
              </strong>
              <p>change in sales from July to August 2018, while orders grew 2.2%.</p>
            </div>
          </div>
          <p data-reveal>
            The last one is the interesting one. More orders but less revenue means each order was
            worth about 10% less. Demand held up; something about the basket changed.
          </p>
        </section>
        <section className="case-section" data-stagger>
          <span className="eyebrow">05 / WHAT I’D DO NEXT</span>
          <h2>Where the analysis would go from here.</h2>
          <p>
            First, find out why orders got smaller: a shift in category mix, cheaper products,
            discounts, freight costs, or payment behavior. Second, test targeted marketing in cities
            beyond São Paulo and compare the response against current demand.
          </p>
          <div className="mt-6">
            <Button asChild variant="portfolio">
              <a href={identity.repository} target="_blank" rel="noreferrer">
                See the project on GitHub <ArrowUpRight />
              </a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
