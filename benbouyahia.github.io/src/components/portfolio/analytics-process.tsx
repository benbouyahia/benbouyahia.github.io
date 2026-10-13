import { Target, Files, Database, ShieldCheck, Network, ChartNoAxesCombined, ArrowRight, RefreshCw } from "lucide-react";

const steps = [
  { name: "Frame the question", detail: "Revenue · customers · delivery", icon: Target, output: "Business objectives" },
  { name: "Collect & explore", detail: "Olist CSV files · order-item grain", icon: Files, output: "Source datasets" },
  { name: "Transform", detail: "PostgreSQL · cleaning · joins", icon: Database, output: "Prepared tables" },
  { name: "Validate", detail: "Nulls · duplicates · relationships", icon: ShieldCheck, output: "Quality-checked data" },
  { name: "Model & measure", detail: "Relationships · date table · DAX", icon: Network, output: "Consistent KPIs" },
  { name: "Visualize & interpret", detail: "Power BI · three audience views", icon: ChartNoAxesCombined, output: "Decision-ready insights" },
];
export function AnalyticsProcess() {
  return <figure className="analytics-process" aria-label="Data analytics workflow from business questions through data preparation to actionable insights">
    <div className="process-endpoint"><Target size={16} /><span>BUSINESS QUESTION</span><span>What drives growth—and what holds it back?</span></div>
    <ol className="process-flow">{steps.map((step, index) => <li className="process-node" key={step.name}>
      <div className="process-node-top"><step.icon size={22} /><span>0{index + 1}</span></div>
      <h3>{step.name}</h3><p>{step.detail}</p><span className="process-output">{step.output}</span>
      {index < steps.length - 1 && <ArrowRight className="process-connector" size={18} aria-hidden="true" />}
    </li>)}</ol>
    <figcaption className="process-feedback"><RefreshCw size={15} /><span>Insights → recommendations → the next business question</span></figcaption>
  </figure>;
}