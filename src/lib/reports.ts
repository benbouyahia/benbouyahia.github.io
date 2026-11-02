import { portfolioMedia } from "@/lib/media";
import executive from "@/assets/olist-dashboard.png.asset.json";
import sales from "@/assets/Sales-analysis.png.asset.json";
import service from "@/assets/Customer-service.png.asset.json";

// Each report page has its own gallery entry; append future pages here.
export const reports = [
  {
    name: "Executive overview",
    image: portfolioMedia(executive),
    alt: "Original Olist executive Power BI report showing sales, orders, customers, products and cities",
    description: "Revenue, growth, and the marketplace’s biggest sales drivers.",
  },
  {
    name: "Sales analysis",
    image: portfolioMedia(sales),
    alt: "Original Sales Analysis report showing orders, customers and payment methods",
    description: "Customer trends, order patterns, and payment preferences.",
  },
  {
    name: "Customer service",
    image: portfolioMedia(service),
    alt: "Original Customer Service report with delivery KPIs and order status charts",
    description: "Delivery performance, order status, and operational bottlenecks.",
  },
] as const;

// Chapters of the home page story, drawn from the two case studies.
export const storyChapters = [
  {
    title: "Same data. Different decisions.",
    description:
      "Executives need headline numbers and growth. Sales teams need to understand customers. Operations teams need to know whether orders arrive when promised.",
    image: reports[0].image,
    alt: reports[0].alt,
    width: 1300,
    height: 727,
  },
  {
    title: "A fact table connected to business dimensions.",
    description:
      "The dimensional model centers on fact_feedback and connects it to descriptive tables for time, customers, service channels, agencies, topics, and complaint characteristics.",
    image: "/images/data-model.png",
    alt: "Power BI relationship model showing fact_feedback connected to its business dimensions",
    width: 987,
    height: 716,
  },
  {
    title: "Five views for feedback operations.",
    description:
      "Monitor complaint volume, resolution, response time, and feedback mix, then track the open workload and identify urgent cases for attention.",
    image: "/images/feedback-overview.png",
    alt: "Attijari Bank customer feedback overview with complaint totals, resolution rate, and feedback by channel",
    width: 992,
    height: 728,
  },
] as const;

export const customerFeedbackPages = [
  {
    name: "Feedback Overview",
    image: "/images/feedback-overview.png",
    alt: "Attijari Bank customer feedback overview with complaint totals, resolution rate, and feedback by channel",
    description: "Monitor complaint volume, resolution, response time, and feedback mix.",
    keyVisuals: [
      "Total complaints, resolution rate, and average response time",
      "Monthly performance comparisons",
      "Resolution rate by channel",
      "Feedback by channel, customer segment, and service family",
    ],
  },
  {
    name: "Customer Insights",
    image: "/images/customer-insights.png",
    alt: "Attijari Bank customer insights with feedback type, founded rate by segment, and service-family treemap",
    description: "Compare feedback patterns across customer segments and service categories.",
    keyVisuals: [
      "Feedback type by customer segment",
      "Justified complaint rate by segment",
      "Product and service family treemap",
      "Unresolved feedback indicator",
    ],
  },
  {
    name: "Feedback Prioritization",
    image: "/images/feedback-prioritization.png",
    alt: "Attijari Bank complaint prioritization with unresolved, urgent, and closed feedback indicators",
    description: "Track the open workload and identify urgent cases for attention.",
    keyVisuals: [
      "Unresolved, urgent, and closed complaints",
      "Complaint status by service category",
      "Feedback by market type",
      "Detailed feedback table",
    ],
  },
  {
    name: "Operational Efficiency",
    image: "/images/operational-efficiency.png",
    alt: "Attijari Bank operational efficiency report with agency trends, processing delays, and feedback by day",
    description: "Evaluate complaint handling delays across agencies and processing units.",
    keyVisuals: [
      "Assignment, entry, and treatment delays",
      "Closure performance by agency",
      "Processing delays by unit",
      "Feedback volume by day and channel",
    ],
  },
  {
    name: "Continuous Improvement",
    image: "/images/continuous-improvement.png",
    alt: "Attijari Bank continuous improvement report with KPI trends, service decomposition, and closure motives",
    description: "Review service trends and recurring complaint closure reasons.",
    keyVisuals: [
      "Response time, resolution, and justified complaint trends",
      "Service family and tier analysis",
      "Closed cases by closure motive",
    ],
  },
] as const;
