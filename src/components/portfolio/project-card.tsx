import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { customerFeedbackProject, project } from "@/lib/portfolio";
import { customerFeedbackPages, reports } from "@/lib/reports";

function CaseCard({
  to,
  transitionName,
  image,
  alt,
  width,
  height,
  label,
  context,
  title,
  description,
  tools,
}: {
  to: "/projects/olist" | "/projects/attijari";
  transitionName: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  context: string;
  title: string;
  description: string;
  tools: readonly string[];
}) {
  return (
    <article className="project-row">
      <Link
        to={to}
        className="work-media"
        data-reveal
        data-cursor="View"
        aria-label={`Open the ${title} case study`}
        style={{ viewTransitionName: transitionName } as CSSProperties}
      >
        <img src={image} alt={alt} width={width} height={height} loading="lazy" />
      </Link>
      <div className="project-copy" data-stagger>
        <div className="project-meta">
          <span>{label}</span>
          <span>{context}</span>
        </div>
        <Link to={to} className="project-title">
          <h3>{title}</h3>
        </Link>
        <p>{description}</p>
        <div className="tag-list">
          {tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        <Link to={to} className="text-link">
          Explore case study <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export function ProjectCard() {
  return (
    <CaseCard
      to="/projects/olist"
      transitionName="case-olist"
      image={reports[0].image}
      alt={reports[0].alt}
      width={1300}
      height={727}
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
      transitionName="case-attijari"
      image={customerFeedbackPages[0].image}
      alt={customerFeedbackPages[0].alt}
      width={992}
      height={728}
      label="02 / CUSTOMER EXPERIENCE"
      context="ATTIJARI BANK TUNISIA"
      title={customerFeedbackProject.title}
      description={customerFeedbackProject.description}
      tools={customerFeedbackProject.tools}
    />
  );
}
