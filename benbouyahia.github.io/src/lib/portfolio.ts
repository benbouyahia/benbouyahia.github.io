export const identity = {
  name: "Ayoub Ben Bouyahia",
  github: "https://github.com/benbouyahia",
  linkedin: "https://linkedin.com/in/ayoub-ben-bouyahia/",
  repository: "https://github.com/benbouyahia/Data-Analytics-Protfolio/tree/main/olist%20ecommerce",
};
export const project = {
  title: "E-Commerce Sales & Delivery Analysis",
  description:
    "One marketplace. 100,000 orders. Three perspectives on what drives growth—and what holds it back.",
  tools: ["Power BI", "SQL", "DAX"],
  category: "Business intelligence",
};
export const work = [
  { date: "Jan 2024 — Aug 2024", title: "Marketing & Sales Representative", organization: "ABBK Physicsworks", label: "SALES & MARKETING" },
  { date: "Jul 2023 — Jan 2024", title: "Business Developer", organization: "Impacts Digital", label: "BUSINESS DEVELOPMENT" },
  { date: "Internship", title: "Business Analysis Intern", organization: "Attijari Bank", label: "BUSINESS ANALYSIS" },
];
export const education = [
  { date: "Master’s degree", title: "Business Analytics", organization: "ESPRIT School of Business", label: "EDUCATION" },
  { date: "Licence", title: "Marketing", organization: "Tunis Higher School of Commerce", label: "EDUCATION" },
];
export const certifications = [
  {
    title: "PL-300: Power BI Data Analyst",
    organization: "Microsoft",
    brand: "Microsoft",
    logoText: "MS",
    variant: "microsoft",
    status: "Certified",
  },
  {
    title: "DP-700: Fabric Data Engineer",
    organization: "Microsoft",
    brand: "Microsoft",
    logoText: "DP",
    variant: "fabric",
    status: "In progress",
  },
];
export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | Ayoub Ben Bouyahia` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Ayoub Ben Bouyahia` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
