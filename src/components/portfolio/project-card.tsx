import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { DashboardPageGallery, ReportGallery } from "./report-gallery";
import { customerFeedbackProject, project } from "@/lib/portfolio";

function CaseCard({
  to,
  gallery,
  label,
  context,
  title,
  description,
  tools,
}: {
  to: "/projects/olist" | "/projects/attijari";
  gallery: ReactNode;
  label: string;
  context: string;
  title: string;
  description: string;
  tools: readonly string[];
}) {
  return (
    <article className="project-card">
      <div className="project-visual">{gallery}</div>
      <div className="project-body">
        <div className="project-meta">
          <span>{label}</span>
          <span>{context}</span>
        </div>
        <Link to={to} className="project-title">
          <h3>{title}</h3>
          <span className="project-arrow">
            <ArrowUpRight />
          </span>
        </Link>
        <p>{description}</p>
        <div className="project-bottom">
          <div className="tag-list">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <Link to={to} className="text-link">
            Explore case study <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProjectCard() {
  return (
    <CaseCard
      to="/projects/olist"
      gallery={<ReportGallery compact />}
      label="01 / BUSINESS INTELLIGENCE"
      context="2016—2018 DATA"
      title={project.title}
      description={project.description}
      tools={project.tools}
    />
  );
}

export function CustomerFeedbackProjectCard() {
  return (
    <CaseCard
      to="/projects/attijari"
      gallery={<DashboardPageGallery compact />}
      label="02 / CUSTOMER EXPERIENCE"
      context="ATTIJARI BANK TUNISIA"
      title={customerFeedbackProject.title}
      description={customerFeedbackProject.description}
      tools={customerFeedbackProject.tools}
    />
  );
}
