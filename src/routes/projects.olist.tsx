import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/portfolio/shell";
import { CountUp } from "@/components/portfolio/motion";
import { pageHead, identity } from "@/lib/portfolio";
import { ReportGallery } from "@/components/portfolio/report-gallery";
import { reports } from "@/lib/reports";
import { AnalyticsProcess } from "@/components/portfolio/analytics-process";
export const Route = createFileRoute("/projects/olist")({
  head: () =>
    pageHead(
      "Olist sales & delivery analysis",
      "An end-to-end SQL and Power BI analysis of 100,000 Olist marketplace orders, exploring revenue, customer behavior and delivery quality.",
    ),
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
      <PageIntro
        label="CASE STUDY / BUSINESS INTELLIGENCE"
        title="E-Commerce Sales & Delivery Analysis"
      >
        An interactive Power BI solution analyzing e-commerce sales, customer behavior, order
        trends, and delivery operations using a public dataset of over 100,000 marketplace orders.
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
        <ReportGallery />
      </div>
      <div className="case-sections container">
        <section className="case-section" data-stagger>
          <span className="eyebrow">01 / THE QUESTION</span>
          <h2>Same data. Different decisions.</h2>
          <p>
            Leadership, sales and operations teams look at the same order data for different
            reasons. Executives need headline numbers and growth. Sales teams need to understand
            customers. Operations teams need to know whether orders arrive when promised.
          </p>
          <p>
            One flat report serves none of them well. This project creates three tailored views
            within a single, consistent reporting solution.
          </p>
        </section>
        <section className="case-section">
          <span className="eyebrow">02 / THE PROCESS</span>
          <h2 data-reveal>From CSV files to a trusted report.</h2>
          <p data-reveal>
            The dataset contains approximately 100,000 orders across Brazil. The model includes
            Orders, Customers, Products, Payments, Order Items, Reviews, and a Date table. Each
            order may contain several items, so the model accounts for order-item grain.
          </p>
          <AnalyticsProcess />
          <p data-reveal>
            Quality checks cover duplicates, nulls, foreign keys, calculated metrics and performance
            aggregates. DAX measures support sales, distinct orders and customers, month-over-month
            comparisons, and delivery performance.
          </p>
        </section>
        <section className="case-section" data-stagger>
          <span className="eyebrow">03 / THE REPORT</span>
          <h2>Built for the people using it.</h2>
          <ul>
            <li>
              <strong>Executives:</strong> KPI cards, month-over-month changes, sparklines, and
              top/bottom categories and cities.
            </li>
            <li>
              <strong>Sales teams:</strong> orders and customer trends, payment methods, table views
              and time-granularity toggles.
            </li>
            <li>
              <strong>Operations:</strong> delivery KPIs, order-status funnel, undelivered orders
              and late-delivery cities.
            </li>
          </ul>
          <p>
            Shared slicers for date, state and product category, reset controls and information
            overlays keep the report consistent across its three pages.
          </p>
        </section>
        <section className="case-section">
          <span className="eyebrow">04 / THE FINDINGS</span>
          <h2 data-reveal>The numbers that raised questions.</h2>
          <div className="insight-grid" data-stagger>
            <div className="insight">
              <strong>
                <CountUp value={1.13} decimals={2} suffix="M" />
              </strong>
              <p>Health & Beauty sales—the leading category in the selected report view.</p>
            </div>
            <div className="insight">
              <strong>2×+</strong>
              <p>São Paulo sales compared with Rio de Janeiro: 1.65M versus 0.73M.</p>
            </div>
            <div className="insight">
              <strong>
                <CountUp value={8.7} decimals={1} prefix="−" suffix="%" />
              </strong>
              <p>Sales in August versus July 2018, while orders increased 2.2%.</p>
            </div>
          </div>
          <p data-reveal>
            The combination of falling sales and rising orders points to an approximately 10%
            decline in revenue per order—not simply a decline in demand.
          </p>
        </section>
        <section className="case-section" data-stagger>
          <span className="eyebrow">05 / THE NEXT DECISION</span>
          <h2>Insights are a starting point.</h2>
          <p>
            Investigate why revenue per order fell: category mix, lower-priced products,
            discounting, freight or payment behavior. Test targeted marketing in cities beyond São
            Paulo, then compare demand and campaign reach.
          </p>
          <div className="mt-6">
            <Button asChild variant="portfolio">
              <a href={identity.repository} target="_blank" rel="noreferrer">
                Explore the repository <ArrowUpRight />
              </a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
