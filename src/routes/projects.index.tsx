import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/portfolio/shell";
import { ProjectCard } from "@/components/portfolio/project-card";
import { pageHead } from "@/lib/portfolio";
export const Route = createFileRoute("/projects/")({
  head: () =>
    pageHead(
      "Selected projects",
      "Explore SQL and Power BI work by Ayoub Ben Bouyahia, including the Olist marketplace sales and delivery analysis.",
    ),
  component: Projects,
});
function Projects() {
  const [filter, setFilter] = useState("All projects");
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
        <ProjectCard />
        <p className="result-count">1 project{filter !== "All projects" ? ` · ${filter}` : ""}</p>
      </section>
    </main>
  );
}
