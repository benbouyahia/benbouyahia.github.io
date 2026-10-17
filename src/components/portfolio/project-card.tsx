import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { DashboardPageGallery, ReportGallery } from "./report-gallery";
import { customerFeedbackProject, project } from "@/lib/portfolio";
export function ProjectCard() {
  return (
    <article className="project-card">
      <div className="project-visual">
        <ReportGallery compact />
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>01 / BUSINESS INTELLIGENCE</span>
          <span>2016—2018 DATA</span>
        </div>
        <Link to="/projects/olist" className="project-title">
          <h3>{project.title}</h3>
          <span className="project-arrow">
            <ArrowUpRight />
          </span>
        </Link>
        <p>{project.description}</p>
        <div className="project-bottom">
          <div className="tag-list">
            {project.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <Link to="/projects/olist" className="text-link">
            Explore case study <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CustomerFeedbackProjectCard() {
  return (
    <article className="project-card">
      <div className="project-visual project-visual--feedback">
        <DashboardPageGallery compact />
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>02 / CUSTOMER EXPERIENCE</span>
          <span>ATTIJARI BANK TUNISIA</span>
        </div>
        <Link to="/projects/attijari" className="project-title">
          <h3>{customerFeedbackProject.title}</h3>
          <span className="project-arrow">
            <ArrowUpRight />
          </span>
        </Link>
        <p>{customerFeedbackProject.description}</p>
        <div className="project-bottom">
          <div className="tag-list">
            {customerFeedbackProject.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <Link to="/projects/attijari" className="text-link">
            Explore case study <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
