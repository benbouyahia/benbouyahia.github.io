import { portfolioMedia } from "@/lib/media";
import executive from "@/assets/olist-dashboard.png.asset.json";
import sales from "@/assets/Sales-analysis.png.asset.json";
import service from "@/assets/Customer-service.png.asset.json";

// Each report page has its own gallery entry; append future pages here.
export const reports = [
  { name: "Executive overview", image: portfolioMedia(executive), alt: "Original Olist executive Power BI report showing sales, orders, customers, products and cities", description: "Revenue, growth, and the marketplace’s biggest sales drivers." },
  { name: "Sales analysis", image: portfolioMedia(sales), alt: "Original Sales Analysis report showing orders, customers and payment methods", description: "Customer trends, order patterns, and payment preferences." },
  { name: "Customer service", image: portfolioMedia(service), alt: "Original Customer Service report with delivery KPIs and order status charts", description: "Delivery performance, order status, and operational bottlenecks." },
] as const;