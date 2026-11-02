import { BarChart3, BriefcaseBusiness, Database } from "lucide-react";
import { skills } from "@/lib/portfolio";

const icons = { Visualization: BarChart3, Data: Database, Business: BriefcaseBusiness };

export function SkillsGrid() {
  return (
    <div className="skills-grid" data-stagger>
      {skills.map((group) => {
        const Icon = icons[group.title];
        return (
          <div key={group.title}>
            <Icon className="skill-icon" size={22} />
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
