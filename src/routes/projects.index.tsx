import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/portfolio/shell";
import { CustomerFeedbackProjectCard, ProjectCard } from "@/components/portfolio/project-card";
import { pageHead } from "@/lib/portfolio";
export const Route = createFileRoute("/projects/")({
  head: () =>
    pageHead({
      title: "Power BI & SQL case studies",
      description:
        "Two Power BI and SQL case studies: e-commerce sales and delivery for Olist, and customer complaint reporting for Attijari Bank Tunisia.",
      path: "/projects",
    }),
  component: Projects,
});
function Projects() {
  return (
    <main>
      <PageIntro
        label="CASE STUDIES"
        title="A bank’s complaints. A marketplace’s orders."
        accent={["orders."]}
      >
        Two Power BI case studies: 1,171 complaints tracked across five report pages for Attijari
        Bank Tunisia, and 100,000 Olist orders split into views for executives, sales, and
        operations.
      </PageIntro>
      <section className="container project-list" style={{ paddingBottom: "var(--section-space)" }}>
        <ProjectCard />
        <CustomerFeedbackProjectCard />
      </section>
    </main>
  );
}
