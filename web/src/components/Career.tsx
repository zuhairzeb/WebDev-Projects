import { useEffect, useRef } from "react";
import { experiences, certificates } from "../data/site";
import { SectionLabel } from "./Primitives";
export function Career() {
  const timeline = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.target.classList.toggle("active", e.isIntersecting),
        );
      },
      { rootMargin: "-25% 0px -35% 0px" },
    );
    timeline.current
      ?.querySelectorAll("article")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <section id="career" className="section career">
      <SectionLabel number="04">EXPERIENCE & EDUCATION</SectionLabel>
      <div className="career-grid">
        <div>
          <h2>
            LEARNING.
            <br />
            BUILDING.
            <br />
            <span className="blue">REPEATING.</span>
          </h2>
          <p className="career-intro">
            Client work, community work, and everything I've learned along the
            way.
          </p>
          <a
            className="button"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            DOWNLOAD MY CV ↗
          </a>
          <div className="credentials">
            <h3 className="mono">CERTIFICATIONS & RECOGNITION</h3>
            {certificates.map((c) => (
              <p key={c}>{c} ↗</p>
            ))}
            <p>Outstanding Contributor · 2025</p>
            <p>Top Performer Volunteer · 2025</p>
          </div>
        </div>
        <div className="timeline" ref={timeline}>
          {experiences.map((exp, i) => (
            <article key={exp.role}>
              <span className="timeline-node" />
              <div className="mono timeline-date">{exp.period}</div>
              <h3>{exp.role}</h3>
              <p className="company">{exp.company}</p>
              <p>
                {exp.desc.length > 230
                  ? exp.desc.slice(0, exp.desc.indexOf(".", 100) + 1)
                  : exp.desc}
              </p>
              {exp.role === "WordPress Mentor" && (
                <p>
                  Mentored 60+ aspiring developers in WordPress development and
                  SEO.
                </p>
              )}
              {exp.desc.length > 230 && (
                <details>
                  <summary>FULL ROLE DETAILS ＋</summary>
                  <p>{exp.desc}</p>
                </details>
              )}
              <span className="timeline-number" aria-hidden="true">
                0{i + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
