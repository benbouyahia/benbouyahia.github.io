import { useState } from "react";
import { BarChart3, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const categories = [
  { label: "Health & Beauty", value: "1.13M", rank: "rank-1" },
  { label: "Bed, Bath & Table", value: "0.90M", rank: "rank-2" },
  { label: "Computers Accessories", value: "0.87M", rank: "rank-3" },
];
const cities = [
  { label: "São Paulo", value: "1.65M", rank: "rank-1" },
  { label: "Rio de Janeiro", value: "0.73M", rank: "rank-4" },
];
export function DashboardPreview() {
  const [mode, setMode] = useState<"Categories" | "Cities">("Categories");
  return (
    <div className="dashboard-preview">
      <div className="dashboard-heading">
        <div className="dashboard-logo">
          <BarChart3 size={17} /> olist<span>/</span>Executive overview
        </div>
        <span className="dataset-period">2018</span>
      </div>
      <div className="dashboard-kpis">
        <div>
          <span>Sales · MoM</span>
          <strong>
            −8.7% <span className="mini-trend">↘</span>
          </strong>
        </div>
        <div>
          <span>Orders · MoM</span>
          <strong>
            +2.2% <span className="mini-trend">↗</span>
          </strong>
        </div>
        <div>
          <span>Customers · MoM</span>
          <strong>
            +2.9% <span className="mini-trend">↗</span>
          </strong>
        </div>
      </div>
      <div className="dashboard-chart-heading">
        <strong>Top sales drivers</strong>
        <div className="chart-tabs">
          {(["Categories", "Cities"] as const).map((t) => (
            <Button
              key={t}
              variant="chartTab"
              size="sm"
              aria-pressed={mode === t}
              onClick={() => setMode(t)}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>
      <div className="dashboard-bars">
        {(mode === "Categories" ? categories : cities).map((item) => (
          <div className="dashboard-bar-row" key={item.label}>
            <span>{item.label}</span>
            <div className={`dashboard-bar ${item.rank}`} />
            <b>{item.value}</b>
          </div>
        ))}
      </div>
      <div className="dashboard-caption">
        <span>Olist marketplace · Selected report findings</span>
        <ArrowUpRight size={14} />
      </div>
    </div>
  );
}
