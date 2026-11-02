export const identity = {
  name: "Ayoub Ben Bouyahia",
  github: "https://github.com/benbouyahia",
  linkedin: "https://linkedin.com/in/ayoub-ben-bouyahia/",
  repository: "https://github.com/benbouyahia/Data-Analytics-Protfolio/tree/main/olist%20ecommerce",
};
export const portraitImage = "/images/ayoub-portrait.webp";
export const toolset = [
  "Power BI",
  "DAX",
  "SQL",
  "PostgreSQL",
  "SQL Server",
  "Microsoft Fabric",
  "Excel",
  "Data modeling",
];
export const skills = [
  { title: "Visualization", items: ["Power BI & DAX", "Excel reporting", "Dashboard design"] },
  { title: "Data", items: ["SQL queries", "Data modeling", "Microsoft Fabric"] },
  { title: "Business", items: ["KPI analysis", "Sales & CRM", "Marketing"] },
] as const;
export const statement =
  "From sales conversations to SQL queries, I’ve always been interested in understanding what makes a business move. Today, I bring that perspective to data.";
export const project = {
  title: "E-Commerce Sales & Delivery Analysis",
  description:
    "An interactive Power BI solution analyzing e-commerce sales, customer behavior, order trends, and delivery operations using a public dataset of over 100,000 marketplace orders.",
  tools: ["Power BI", "SQL", "DAX"],
  category: "Business intelligence",
};
export const customerFeedbackProject = {
  title: "Customer Feedback Business Intelligence Dashboard",
  description:
    "A five-page Power BI solution for monitoring customer feedback, complaint resolution, and operational delays at Attijari Bank Tunisia.",
  organization: "Attijari Bank Tunisia",
  tools: ["Power BI", "SQL Server", "DAX"],
  category: "Customer experience",
};
export const work = [
  {
    date: "Jan 2024 — Aug 2024",
    title: "Marketing & Sales Representative",
    organization: "ABBK Physicsworks",
    label: "SALES & MARKETING",
  },
  {
    date: "Jul 2023 — Jan 2024",
    title: "Business Developer",
    organization: "Impacts Digital",
    label: "BUSINESS DEVELOPMENT",
  },
  {
    date: "Internship",
    title: "Business Analysis Intern",
    organization: "Attijari Bank",
    label: "BUSINESS ANALYSIS",
  },
];
export const education = [
  {
    date: "Master’s degree",
    title: "Business Analytics",
    organization: "ESPRIT School of Business",
    label: "EDUCATION",
  },
  {
    date: "Licence",
    title: "Marketing",
    organization: "Tunis Higher School of Commerce",
    label: "EDUCATION",
  },
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
