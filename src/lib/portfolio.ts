export const siteUrl = "https://benbouyahia.github.io";
export const socialImage = "/og-image.png";

export const identity = {
  name: "Ayoub Ben Bouyahia",
  role: "Business Intelligence Analyst",
  location: "Tunis, Tunisia",
  email: "benbouyahiaa@gmail.com",
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
  {
    title: "Reporting",
    items: ["Power BI & DAX", "Report and dashboard design", "Excel reporting"],
  },
  {
    title: "Data",
    items: [
      "Data pipelines and ETL",
      "SQL (PostgreSQL, SQL Server)",
      "Star-schema data modeling",
      "Microsoft Fabric",
    ],
  },
  {
    title: "Analysis",
    items: ["KPI definition", "Business requirements", "Sales and customer analytics"],
  },
] as const;
export const roles = "Business Intelligence, Data Analyst, or BI Developer";
export const emailLink = `mailto:${identity.email}`;

// Quick facts at the top of the About page, for someone meeting Ayoub for the first time.
export const aboutFacts = [
  { label: "Focus", value: "Data pipelines, SQL data modeling, and Power BI reporting" },
  { label: "Experience", value: "Business analysis, sales, and business development" },
  { label: "Education", value: "Master’s in Business Analytics" },
  {
    label: "Certification",
    // Non-breaking hyphens keep the exam codes on one line on small screens.
    value: "Microsoft PL‑300: Power BI Data Analyst. DP‑700 in progress",
  },
  { label: "Open to", value: "Business Intelligence, Data Analyst, and BI Developer roles" },
];

export const project = {
  title: "E-Commerce Sales & Delivery Analysis",
  description:
    "A three-page Power BI report on 100,000 orders from Olist, a Brazilian online marketplace: where revenue comes from, how customers buy, and whether orders arrive on time.",
  tools: ["Power BI", "SQL", "DAX"],
  category: "Business intelligence",
  highlight: {
    label: "KEY FINDING",
    value: "−8.7%",
    text: "Sales fell from July to August 2018 while orders rose 2.2%. Customers kept buying, but each order was worth less.",
  },
};
export const customerFeedbackProject = {
  title: "Customer Feedback & Complaint Analysis",
  description:
    "A five-page Power BI report for Attijari Bank Tunisia that follows customer complaints from arrival to resolution and shows where handling slows down.",
  organization: "Attijari Bank Tunisia",
  tools: ["Power BI", "SQL Server", "DAX"],
  category: "Customer experience",
  highlight: {
    label: "REPORT SCOPE",
    value: "11 KPIs",
    text: "From resolution rate and urgent cases to assignment and treatment delays, by agency and by channel.",
  },
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

type StoryEvidence = {
  date: string;
  title: string;
  organization: string;
  logo?: { brand: string; variant: string };
};

const [pl300, dp700] = certifications;
export const nextCertification = dp700!;

// The home page tells the career as three chapters. Evidence reuses the entries above,
// so dates and organizations stay identical to the experience page.
export const story: {
  id: string;
  keyword: string;
  title: string;
  body: string;
  evidence: StoryEvidence[];
}[] = [
  {
    id: "business",
    keyword: "Business",
    title: "Started in sales and business development.",
    body: "I studied marketing, then spent 14 months in business development and sales at Impacts Digital and ABBK Physicsworks.",
    evidence: [education[1]!, work[1]!, work[0]!],
  },
  {
    id: "analytics",
    keyword: "Analytics",
    title: "Moved into business analytics.",
    body: "I completed a Master’s in Business Analytics at ESPRIT School of Business and a business analysis internship at Attijari Bank.",
    evidence: [education[0]!, work[2]!],
  },
  {
    id: "intelligence",
    keyword: "Intelligence",
    title: "Now working in data and BI.",
    body: "I build data pipelines and models in SQL, write measures in DAX, and design reports in Power BI. PL-300 certified, preparing for DP-700 next.",
    evidence: [
      {
        date: pl300!.status,
        title: pl300!.title,
        organization: pl300!.organization,
        logo: { brand: pl300!.brand, variant: pl300!.variant },
      },
      {
        date: "Portfolio",
        title: "Two end-to-end case studies",
        organization: "Olist e-commerce · Attijari Bank Tunisia",
      },
    ],
  },
];

// Search and social metadata for one page. `path` is the page's address on the live site;
// GitHub Pages serves every page from a folder, so canonical addresses end with a slash.
export function pageHead({
  title,
  description,
  path,
  fullTitle = false,
  type = "website",
  jsonLd,
}: {
  title: string;
  description: string;
  path: string;
  fullTitle?: boolean;
  type?: "website" | "profile" | "article";
  jsonLd?: object;
}) {
  const pageTitle = fullTitle ? title : `${title} | ${identity.name}`;
  const url = `${siteUrl}${path.endsWith("/") ? path : `${path}/`}`;
  const image = `${siteUrl}${socialImage}`;
  return {
    meta: [
      { title: pageTitle },
      { name: "description", content: description },
      { property: "og:site_name", content: identity.name },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${identity.name}, ${identity.role}` },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd
      ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }]
      : undefined,
  };
}

// Structured data that tells search engines who the site is about.
export const personSchema = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: identity.name,
  jobTitle: identity.role,
  url: `${siteUrl}/`,
  image: `${siteUrl}${portraitImage}`,
  email: identity.email,
  sameAs: [identity.linkedin, identity.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tunis",
    addressCountry: "TN",
  },
  knowsAbout: [
    "Business intelligence",
    "Data pipelines",
    "ETL",
    "Power BI",
    "DAX",
    "SQL",
    "PostgreSQL",
    "SQL Server",
    "Data modeling",
    "Microsoft Fabric",
    "Data analysis",
  ],
  alumniOf: education.map((item) => ({
    "@type": "CollegeOrUniversity",
    name: item.organization,
  })),
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: pl300!.title,
    credentialCategory: "certification",
    recognizedBy: { "@type": "Organization", name: pl300!.organization },
  },
};

export function caseStudySchema(study: {
  title: string;
  description: string;
  path: string;
  image: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    headline: study.title,
    description: study.description,
    url: `${siteUrl}${study.path}/`,
    image: `${siteUrl}${study.image}`,
    keywords: study.keywords.join(", "),
    inLanguage: "en",
    author: personSchema,
  };
}
