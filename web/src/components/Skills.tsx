import { useState } from "react";
import { skills } from "../data/site";
import { SectionLabel } from "./Primitives";
export function Skills() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section id="skills" className="section skills">
      <SectionLabel number="03">THE TOOLKIT</SectionLabel>
      <div className="section-heading">
        <h2>
          RIGHT TOOL.
          <br />
          <span className="outlined">REAL SOLUTION.</span>
        </h2>
        <p>
          From storefronts to dashboards.
          <br />
          Tools I put to work.
        </p>
      </div>
      <div className="skills-wall">
        {skills.map((group, i) => (
          <div className="skill-row" key={group.name}>
            <h3 className="mono">
              <span>0{i + 1} /</span> {group.name}
            </h3>
            <div className="skill-tags">
              {group.items.map(([name, description]) => (
                <button
                  type="button"
                  className="skill-tag"
                  key={name}
                  data-open={selected === name}
                  onClick={() => setSelected(selected === name ? null : name)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setSelected(null);
                  }}
                  aria-label={`${name}: ${description}`}
                >
                  {name}
                  <span className="skill-icon" aria-hidden="true">
                    ↗
                  </span>
                  <span className="skill-tooltip" role="tooltip">
                    {description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
