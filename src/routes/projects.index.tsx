import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/portfolio/shell";
import { CustomerFeedbackProjectCard, ProjectCard } from "@/components/portfolio/project-card";
import { pageHead } from "@/lib/portfolio";
export const Route = createFileRoute("/projects/")({
  head: () =>
    pageHead(
      "Selected projects",
      "Explore Power BI, SQL, and customer experience dashboards by Ayoub Ben Bouyahia, including Olist and Attijari Bank Tunisia case studies.",
    ),
  component: Projects,
});
function Projects() {
  const [filter, setFilter] = useState("All projects");
  const showOlist = filter === "All projects" || filter === "Power BI" || filter === "SQL";
  const showCustomerFeedback =
    filter === "All projects" || filter === "Power BI" || filter === "SQL";
  const resultCount = Number(showOlist) + Number(showCustomerFeedback);
  return (
    <main>
      <PageIntro label="SELECTED WORK" title="Business questions. Data answers.">
        A closer look at how I turn raw data into reporting that supports real decisions.
      </PageIntro>
      <section className="container section projects-section">
        <div className="project-filter" aria-label="Filter projects">
          {["All projects", "Power BI", "SQL"].map((f) => (
            <Button
              key={f}
              variant="ghost"
              className="filter-button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
        {showOlist && <ProjectCard />}
        {showCustomerFeedback && <CustomerFeedbackProjectCard />}
        <p className="result-count">
          {resultCount} projects{filter !== "All projects" ? ` · ${filter}` : ""}
        </p>
      </section>
    </main>
  );
}
