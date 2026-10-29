import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <main>
      <PageIntro label="SELECTED WORK" title="Business questions. Data answers.">
        A closer look at how I turn raw data into reporting that supports real decisions.
      </PageIntro>
      <section className="container section projects-section">
        <ProjectCard />
        <CustomerFeedbackProjectCard />
      </section>
    </main>
  );
}
