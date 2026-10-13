import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/portfolio/shell";
import { pageHead, identity } from "@/lib/portfolio";
import { ReportGallery } from "@/components/portfolio/report-gallery";
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
        An interactive three-page Power BI report. About 100,000 marketplace orders. A clearer
        picture of growth, customers, and delivery quality.
      </PageIntro>
      <div className="container">
        <dl className="case-facts">
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
        <ReportGallery />
      </div>
      <div className="case-sections container">
        <section className="case-section">
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
          <h2>From CSV files to a trusted report.</h2>
          <p>
            The dataset contains approximately 100,000 orders across Brazil. The model includes
            Orders, Customers, Products, Payments, Order Items, Reviews, and a Date table. Each
            order may contain several items, so the model accounts for order-item grain.
          </p>
          <AnalyticsProcess />
          <p className="mt-6">
            Quality checks cover duplicates, nulls, foreign keys, calculated metrics and performance
            aggregates. DAX measures support sales, distinct orders and customers, month-over-month
            comparisons, and delivery performance.
          </p>
        </section>
        <section className="case-section">
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
          <h2>The numbers that raised questions.</h2>
          <div className="insight-grid">
            <div className="insight">
              <strong>1.13M</strong>
              <p>Health & Beauty sales—the leading category in the selected report view.</p>
            </div>
            <div className="insight">
              <strong>2×+</strong>
              <p>São Paulo sales compared with Rio de Janeiro: 1.65M versus 0.73M.</p>
            </div>
            <div className="insight">
              <strong>−8.7%</strong>
              <p>Sales in August versus July 2018, while orders increased 2.2%.</p>
            </div>
          </div>
          <p className="mt-6">
            The combination of falling sales and rising orders points to an approximately 10%
            decline in revenue per order—not simply a decline in demand.
          </p>
        </section>
        <section className="case-section">
          <span className="eyebrow">05 / THE NEXT DECISION</span>
          <h2>Insights are a starting point.</h2>
          <p>
            Investigate why revenue per order fell: category mix, lower-priced products,
            discounting, freight or payment behavior. Test targeted marketing in cities beyond São
            Paulo, then compare demand and campaign reach.
          </p>
          <div className="mt-7">
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
