import { useEffect, useRef } from "react";
import {
  useWorld,
  navigate,
  setWorld,
  interact,
  travelWithinZone,
} from "../../world/store";
import { zoneById } from "../../world/zones";
import {
  skills,
  experiences,
  certificates,
  services,
  process,
  reviews,
  faqs,
} from "../../data/site";
import { experienceStops } from "../../world/interactionPoints";
import { ProjectViewer } from "./ProjectViewer";
import { ContactPanel } from "./ContactPanel";
const titles = {
  home: (
    <>
      MUHAMMAD
      <br />
      <em>ZUHAIR ZEB.</em>
    </>
  ),
  about: (
    <>
      DEVELOPER.
      <br />
      STUDENT. BUILDER.
    </>
  ),
  projects: (
    <>
      THE PROJECT
      <br />
      EXHIBITION.
    </>
  ),
  skills: (
    <>
      TOOLS FOR
      <br />
      REAL PROBLEMS.
    </>
  ),
  experience: (
    <>
      THE PATH
      <br />
      SO FAR.
    </>
  ),
  sociapi: (
    <>
      I ALSO BUILT
      <br />A COMMUNITY.
    </>
  ),
  services: (
    <>
      LET'S PUT YOUR
      <br />
      SITE TO WORK.
    </>
  ),
  contact: (
    <>
      LET'S BUILD
      <br />
      <em>SOMETHING USEFUL.</em>
    </>
  ),
};
export function DestinationPanel() {
  const s = useWorld();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [s.currentZone]);
  if (s.isMoving || !s.panelOpen) return null;
  const zone = zoneById(s.currentZone);
  const skill = skills
    .flatMap((g) => g.items)
    .find(([name]) => name === s.selectedSkill);
  const experience = experiences[s.selectedExperience];
  return (
    <section
      id="destination-content"
      ref={ref}
      className={`destination-panel ${s.currentZone === "home" ? "home-panel" : ""} ${s.currentZone === "sociapi" ? "community-panel" : ""}`}
      aria-labelledby="destination-title"
      tabIndex={-1}
    >
      <div className="panel-top">
        <span className="w-mono">
          {zone.number} / {zone.subtitle.toUpperCase()}
        </span>
        {s.currentZone !== "home" && (
          <button
            className="panel-close"
            aria-label="Close destination panel"
            onClick={() => setWorld({ panelOpen: false, mobileDetails:false })}
          >
            ×
          </button>
        )}
      </div>
      <h1 id="destination-title">{titles[s.currentZone]}</h1>
      {s.currentZone === "home" && (
        <>
          <p>
            WordPress & Web Developer.
            <br />
            AI student. Founder of Sociapi Society.
          </p>
          <p className="panel-muted">
            Welcome to my corner of the internet.
            <br />
            Pick a destination. I'll take you there.
          </p>
          <button
            className="world-button"
            onClick={() => {
              setWorld({ selectedProject: 6 });
              navigate("projects");
            }}
          >
            EXPLORE MY WORK ↗
          </button>
          <p className="availability-world">
            <i /> AVAILABLE FOR WORK
          </p>
        </>
      )}
      {s.currentZone === "about" && (
        <>
          <p>
            I'm Muhammad Zuhair Zeb. I build custom WordPress websites,
            WooCommerce stores, and multivendor marketplaces for real clients.
          </p>
          <p>
            My focus is simple: clean code, fast load times, and sites that help
            businesses grow.
          </p>
          <p>
            I study BS Artificial Intelligence at Islamia College University
            Peshawar. I also founded Sociapi Society, a technology community
            built around learning together and social impact.
          </p>
          <div className="world-stats">
            <span>
              <b>4+</b>YEARS EXPERIENCE
            </span>
            <span>
              <b>10+</b>WEBSITES DELIVERED
            </span>
          </div>
          <div className="panel-links">
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              DOWNLOAD MY CV ↗
            </a>
            <button onClick={() => navigate("sociapi")}>VISIT SOCIAPI →</button>
          </div>
          <details>
            <summary>CLIENT WORDS / {reviews.length} REVIEWS</summary>
            {reviews.map((r) => (
              <blockquote key={r.id}>
                <p>{r.text}</p>
                <cite>
                  {r.name} · {r.date} · {r.rating}/5
                </cite>
              </blockquote>
            ))}
          </details>
        </>
      )}
      {s.currentZone === "projects" && <ProjectViewer />}
      {s.currentZone === "skills" && (
        <>
          <p>Click a lab object or choose a tool below.</p>
          {skill && (
            <div className="skill-readout" role="status">
              <h2>{skill[0]}</h2>
              <p>{skill[1]}</p>
            </div>
          )}
          {skills.map((group) => (
            <div className="skill-group" key={group.name}>
              <h3>{group.name}</h3>
              <div className="world-skill-tags">
                {group.items.map(([name]) => (
                  <button
                    key={name}
                    aria-pressed={s.selectedSkill === name}
                    onClick={() => {
                      setWorld({ selectedSkill: name });
                      interact();
                    }}
                  >
                    {name} ↗
                  </button>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
      {s.currentZone === "experience" && (
        <>
          <div
            className="checkpoint-selector"
            aria-label="Experience checkpoints"
          >
            {experiences.map((exp, i) => (
              <button
                key={exp.role}
                aria-label={`Checkpoint ${i + 1}: ${exp.role}`}
                aria-pressed={s.selectedExperience === i}
                onClick={() => {
                  setWorld({ selectedExperience: i });
                  const p = experienceStops[i];
                  travelWithinZone("experience", [
                    zone.position[0] + p[0],
                    0,
                    zone.position[2] + p[2] + 0.65,
                  ]);
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <span className="w-mono panel-category">{experience.period}</span>
          <h2>{experience.role}</h2>
          <h3>{experience.company}</h3>
          <p>{experience.desc}</p>
          {experience.role === "WordPress Mentor" && (
            <p>Mentored 60+ aspiring developers in WordPress and SEO.</p>
          )}
          <details>
            <summary>CERTIFICATIONS + RECOGNITION</summary>
            <ul>
              {certificates.map((c) => (
                <li key={c}>{c}</li>
              ))}
              <li>Outstanding Contributor · 2025</li>
              <li>Top Performer Volunteer · 2025</li>
            </ul>
          </details>
          <a
            className="panel-link"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            DOWNLOAD CV ↗
          </a>
        </>
      )}
      {s.currentZone === "sociapi" && (
        <>
          <h3>FROM IDEAS TO INTELLIGENCE.</h3>
          <p>
            Sociapi Society is a student technology community connecting people
            through events, workshops, and hands-on learning. I founded and lead
            the society, and built its website, management system, and WhatsApp
            automation.
          </p>
          <div className="world-stats">
            <span>
              <b>340+</b>PARTICIPANTS
            </span>
            <span>
              <b>50+</b>COMMUNITY MEMBERS
            </span>
          </div>
          <img
            src="/optimized/New verion of sociapi.webp"
            alt="Sociapi Society community platform"
            loading="lazy"
            width="900"
            height="560"
          />
          <div className="panel-links">
            <a
              href="https://sociapis.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              EXPLORE SOCIAPI ↗
            </a>
            <button
              onClick={() => {
                setWorld({ selectedProject: 5 });
                navigate("projects");
              }}
            >
              SEE THE TOOLS I BUILT →
            </button>
          </div>
        </>
      )}
      {s.currentZone === "services" && (
        <>
          <p>
            Choose a workstation. Each one solves a different part of the
            website puzzle.
          </p>
          <div className="service-selector">
            {services.map(([name], i) => (
              <button
                key={name}
                aria-pressed={s.selectedService === i}
                onClick={() => {
                  setWorld({ selectedService: i });
                  interact("Typing");
                }}
              >
                <span>0{i + 1}</span>
                {name} ↗
              </button>
            ))}
          </div>
          <div className="skill-readout">
            <h2>{services[s.selectedService][0]}</h2>
            <p>{services[s.selectedService][1]}</p>
          </div>
          <div className="panel-links">
            <a
              href="https://calendly.com/zebzuhair71/30min"
              target="_blank"
              rel="noreferrer"
            >
              BOOK A STRATEGY CALL ↗
            </a>
            <button onClick={() => navigate("contact")}>LET'S TALK →</button>
          </div>
          <details>
            <summary>HOW WE'LL WORK TOGETHER</summary>
            <ol>
              {process.map(([name, desc]) => (
                <li key={name}>
                  <strong>{name}</strong>
                  <p>{desc}</p>
                </li>
              ))}
            </ol>
          </details>
          <details>
            <summary>COMMON QUESTIONS</summary>
            {faqs.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </details>
        </>
      )}
      {s.currentZone === "contact" && <ContactPanel />}
    </section>
  );
}
