import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/portfolio/shell";
import { CertificationLogo } from "@/components/portfolio/certification-logo";
import { pageHead, work, education, certifications } from "@/lib/portfolio";
export const Route = createFileRoute("/experience")({
  head: () =>
    pageHead({
      title: "Experience, education & certifications",
      description:
        "Business analysis at Attijari Bank, a Master’s in Business Analytics from ESPRIT, and Microsoft PL-300 certification. Ayoub Ben Bouyahia’s path into BI.",
      path: "/experience",
    }),
  component: Experience,
});
const tabs = ["Experience", "Education", "Certifications"];
function Experience() {
  const [tab, setTab] = useState("Experience");
  return (
    <main>
      <PageIntro label="EXPERIENCE" title="Where I’ve worked and studied." accent={["studied."]}>
        A marketing degree, two roles in business development and sales, a business analysis
        internship, a Master’s in Business Analytics, and a Microsoft Power BI certification.
      </PageIntro>
      <section className="container">
        <div
          className="experience-tabs"
          style={{ "--active": tabs.indexOf(tab) } as React.CSSProperties}
        >
          <span className="tab-indicator" aria-hidden="true" />
          {tabs.map((t) => (
            <Button
              key={t}
              variant="ghost"
              className="filter-button"
              aria-pressed={tab === t}
              onClick={() => setTab(t)}
            >
              {t}
            </Button>
          ))}
        </div>
        <div className="tab-panel" key={tab}>
          {tab === "Certifications" ? (
            <div className="certificate-list">
              {certifications.map((item) => (
                <article className="certificate" key={item.title}>
                  <div className="certificate-header">
                    <CertificationLogo brand={item.brand} variant={item.variant} />
                    <span
                      className={`credential-status ${item.status === "In progress" ? "credential-pending" : ""}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.organization}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="timeline">
              {(tab === "Experience" ? work : education).map((item) => (
                <article key={item.title} className="timeline-row">
                  <span className="timeline-date">{item.date}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.organization}</p>
                  </div>
                  <span className="timeline-label">{item.label}</span>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
