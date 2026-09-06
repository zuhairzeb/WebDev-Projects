import { useEffect, useRef } from "react";
import { projects, unavailableProjectLinks } from "../../data/site";
import { setProject, useWorld, travelWithinZone } from "../../world/store";
import { zoneById } from "../../world/zones";
const featured = [6, 4, 7, 0, 1, 2, 3, 5, 8];
export function ProjectViewer() {
  const s = useWorld();
  const p = projects[s.selectedProject];
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    container.current?.scrollTo(0, 0);
  }, [p.id]);
  const next = (delta: number) => {
    const index =
      featured[
        (featured.indexOf(s.selectedProject) + delta + featured.length) %
          featured.length
      ];
    setProject(index);
    const zone = zoneById("projects");
    travelWithinZone("projects", [
      zone.position[0] + ((featured.indexOf(index) % 3) - 1) * 2,
      0,
      zone.position[2] + 0.2,
    ]);
  };
  return (
    <div ref={container} className="project-viewer">
      <div className="project-controls">
        <button onClick={() => next(-1)} aria-label="Previous project">
          ← PREV
        </button>
        <span>
          {String(featured.indexOf(s.selectedProject) + 1).padStart(2, "0")} /{" "}
          {projects.length}
        </span>
        <button onClick={() => next(1)} aria-label="Next project">
          NEXT →
        </button>
      </div>
      {p.image && (
        <img
          className="project-preview"
          src={"/optimized/" + p.image.replace(/\.(png|jpg)$/i, ".webp")}
          alt={`${p.title} — original project screenshot`}
          width="900"
          height="560"
        />
      )}
      <span className="w-mono panel-category">
        {p.category}
        {p.date ? ` / ${p.date}` : ""}
      </span>
      <h2>{p.title}</h2>
      <div className="tech-list">
        {p.technologies?.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <p>{p.description}</p>
      {p.overview && (
        <>
          <h3>{p.results ? "THE SOLUTION" : "THE APPROACH"}</h3>
          <p>{p.overview}</p>
        </>
      )}
      {p.results && (
        <>
          <h3>THE RESULT</h3>
          <p>{p.results}</p>
        </>
      )}
      <div className="panel-links">
        {p.liveDemo && !unavailableProjectLinks.has(p.liveDemo) && (
          <a href={p.liveDemo} target="_blank" rel="noreferrer">
            LIVE WEBSITE ↗
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer">
            SOURCE CODE ↗
          </a>
        )}
        {p.caseStudyUrl && !unavailableProjectLinks.has(p.caseStudyUrl) && (
          <a href={p.caseStudyUrl} target="_blank" rel="noreferrer">
            CASE STUDY ↗
          </a>
        )}
      </div>
      {p.liveDemo && unavailableProjectLinks.has(p.liveDemo) && (
        <p className="panel-muted">
          The original client website is offline. Its screenshot and project
          details are preserved here.
        </p>
      )}
      <details>
        <summary>PROJECT NOTES + TECHNICAL DETAILS</summary>
        {(
          [
            ["Features", p.features],
            ["Skills", p.skills],
            ["Technical details", p.technicalDetails],
            ["Controls", p.controls],
            ["Files", p.files],
          ] as const
        ).map(([name, items]) =>
          items?.length ? (
            <div key={name}>
              <h3>{name}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null,
        )}
      </details>
      <details>
        <summary>ALL {projects.length} PROJECTS</summary>
        <div className="project-index">
          {featured.map((idx, i) => (
            <button
              key={idx}
              onClick={() => setProject(idx)}
              aria-pressed={idx === s.selectedProject}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {projects[idx].title} ↗
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
