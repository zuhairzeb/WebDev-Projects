import { useEffect, useRef, useState } from "react";
import { projects, unavailableProjectLinks, type Project } from "../data/site";
import { Reveal, SectionLabel } from "./Primitives";
const selectedIds = [
  "homeitems-marketplace",
  "sociapi-society-web",
  "ospherics-pharma",
  "sociapi-society-management-system",
];
const selected = selectedIds.map((id) => projects.find((p) => p.id === id)!);
const archive = projects.filter((p) => !selectedIds.includes(p.id));
export const imagePath = (image: string) =>
  "/optimized/" + image.replace(/\.(png|jpg)$/i, ".webp");
function ProjectDetails({
  project,
  onClose,
  onNext,
}: {
  project: Project;
  onClose: () => void;
  onNext: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const modal = dialog.current;
    modal?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      modal?.close();
      previous?.focus();
    };
  }, []);
  useEffect(() => {
    content.current?.scrollTo(0, 0);
  }, [project.id]);
  const lists = [
    ["Features", project.features],
    ["Skills", project.skills],
    ["Technical details", project.technicalDetails],
    ["Controls", project.controls],
    ["Files", project.files],
  ] as const;
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-scroll" ref={content}>
        <div className="dialog-bar mono">
          <span>
            PROJECT FILE /{" "}
            {String(projects.indexOf(project) + 1).padStart(2, "0")}
          </span>
          <button onClick={onClose} aria-label="Close project details">
            CLOSE ×
          </button>
        </div>
        <div className="dialog-content">
          <p className="mono blue">
            {project.category}
            {project.date ? ` / ${project.date}` : ""}
          </p>
          <h2 id="project-title">{project.title}</h2>
          <div className="project-technologies">
            {project.technologies?.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="button-row">
            {project.liveDemo &&
              !unavailableProjectLinks.has(project.liveDemo) && (
                <a
                  className="button primary"
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                >
                  LIVE WEBSITE ↗
                </a>
              )}
            {project.github && (
              <a
                className="button"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                SOURCE CODE ↗
              </a>
            )}
            {project.caseStudyUrl &&
              !unavailableProjectLinks.has(project.caseStudyUrl) && (
                <a
                  className="text-link"
                  href={project.caseStudyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  ORIGINAL CASE STUDY ↗
                </a>
              )}
          </div>
          {project.image && (
            <img
              className="detail-image"
              src={imagePath(project.image)}
              alt={`${project.title} — original website screenshot`}
              width="1200"
              height="750"
            />
          )}
          {project.liveDemo &&
            unavailableProjectLinks.has(project.liveDemo) && (
              <p className="archived-notice mono">
                This client website is currently offline. The original project
                screenshot and case details are preserved here.
              </p>
            )}
          <div className="detail-copy">
            <div>
              <h3>{project.results ? "THE PROBLEM" : "THE PROJECT"}</h3>
              <p>{project.description}</p>
            </div>
            {project.overview && (
              <div>
                <h3>{project.results ? "THE SOLUTION" : "THE APPROACH"}</h3>
                <p>{project.overview}</p>
              </div>
            )}
            {project.results && (
              <div>
                <h3>THE RESULT</h3>
                <p>{project.results}</p>
              </div>
            )}
            {lists.map(([title, items]) =>
              items?.length ? (
                <div key={title}>
                  <h3>{title}</h3>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
          </div>
          <button className="next-project" onClick={onNext}>
            NEXT PROJECT <span>→</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
export function Projects() {
  const [all, setAll] = useState(false);
  const [active, setActive] = useState<Project | null>(null);
  useEffect(() => {
    const sync = () => {
      const id = location.hash.startsWith("#project/")
        ? location.hash.slice(9)
        : "";
      setActive(projects.find((p) => p.id === id) || null);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const open = (project: Project) => {
    history.pushState(null, "", `#project/${project.id}`);
    setActive(project);
  };
  const close = () => {
    history.replaceState(null, "", "#projects");
    setActive(null);
  };
  return (
    <section id="projects" className="section projects">
      <SectionLabel number="02">LESS TALK. MORE PROOF.</SectionLabel>
      <div className="section-heading">
        <h2>
          SELECTED
          <br />
          <span className="outlined">WORK.</span>
          <span className="blue punctuation">↘</span>
        </h2>
        <p>
          From client storefronts to community tools.
          <br />
          Real briefs. Real builds. Real screenshots.
        </p>
      </div>
      <div className="project-spreads">
        {selected.map((project, i) => (
          <Reveal
            key={project.id}
            className={`project-spread project-${i + 1}`}
          >
            <div className="project-side">
              <span className="project-number">0{i + 1}</span>
              <span className="mono">{project.category}</span>
            </div>
            <div className="project-main">
              <button
                className="project-image"
                data-cursor="VIEW"
                onClick={() => open(project)}
                aria-label={`View ${project.title} project details`}
              >
                <div className="browser-bar" aria-hidden="true">
                  <span>● ● ●</span>
                  <span>
                    {project.liveDemo
                      ? new URL(project.liveDemo).hostname
                      : "SOCIAPI / MANAGEMENT SYSTEM"}
                  </span>
                  <span>↗</span>
                </div>
                {project.image && (
                  <img
                    src={imagePath(project.image)}
                    alt={`${project.title} website screenshot`}
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="750"
                  />
                )}
                <span className="view-sticker">TAKE A LOOK ↗</span>
              </button>
              <div className="project-caption">
                <div>
                  <p className="mono">
                    {project.technologies?.slice(0, 3).join(" / ")}
                  </p>
                  <h3>
                    <button onClick={() => open(project)}>
                      {project.title} <span>↗</span>
                    </button>
                  </h3>
                </div>
                <p>{project.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="archive-header">
        <span className="mono">AND A FEW MORE THINGS I'VE BUILT.</span>
        <button
          className="button"
          aria-expanded={all}
          aria-controls="project-archive"
          onClick={() => setAll(!all)}
        >
          {all ? "CLOSE ARCHIVE −" : `VIEW ALL ${projects.length} PROJECTS →`}
        </button>
      </div>
      <div id="project-archive" hidden={!all} className="project-archive">
        {archive.map((project, i) => (
          <button
            key={project.id}
            onClick={() => open(project)}
            className="archive-row"
            data-cursor="VIEW"
          >
            <span className="mono">{String(i + 5).padStart(2, "0")}</span>
            {project.image ? (
              <img
                src={imagePath(project.image)}
                alt=""
                loading="lazy"
                width="150"
                height="90"
              />
            ) : (
              <span className="archive-placeholder" aria-hidden="true">
                &gt;_
              </span>
            )}
            <span>
              <strong>{project.title}</strong>
              <small>{project.category}</small>
            </span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      {active && (
        <ProjectDetails
          project={active}
          onClose={close}
          onNext={() =>
            open(projects[(projects.indexOf(active) + 1) % projects.length])
          }
        />
      )}
    </section>
  );
}
