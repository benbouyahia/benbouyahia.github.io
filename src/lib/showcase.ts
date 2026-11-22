import { customerFeedbackProject, project } from "@/lib/portfolio";
import { customerFeedbackPages, reports } from "@/lib/reports";

type Page = { name: string; image: string; alt: string };

// Case studies shown in the home carousel, in order. Each links to its own route.
export const projectSlides = [
  {
    ...project,
    to: "/projects/olist",
    transitionName: "case-olist",
    label: "01 / BUSINESS INTELLIGENCE",
    context: "2016—2018 DATA",
    pages: reports as readonly Page[],
    width: 1300,
    height: 727,
  },
  {
    ...customerFeedbackProject,
    to: "/projects/attijari",
    transitionName: "case-attijari",
    label: "02 / CUSTOMER EXPERIENCE",
    context: "ATTIJARI BANK TUNISIA",
    pages: customerFeedbackPages as readonly Page[],
    width: 992,
    height: 728,
  },
] as const;

export type ProjectSlide = (typeof projectSlides)[number];
