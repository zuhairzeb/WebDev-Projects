import {
  projects,
  experiences,
  skills,
  services,
  certificates,
  reviews,
  faqs,
  email,
  socials,
  unavailableProjectLinks,
} from "../../data/site";
import { setWorld } from "../../world/store";
import { ContactPanel } from "./ContactPanel";
import "./simple-portfolio.css";
const enter = () =>
  setWorld({
    simpleMode: false,
    reduced: false,
    worldLoaded: false,
    desktopMap: false,
    mobileMap: false,
  });
export function SimplePortfolio({
  canEnterWorld = true,
}: {
  canEnterWorld?: boolean;
}) {
  return (
    <div className="portfolio-simple">
      <header className="sp-header">
        <a className="sp-logo" href="#sp-top">
          MZZ.
        </a>
        <nav aria-label="Simple portfolio sections">
          {["About", "Projects", "Experience", "Skills", "Contact"].map((n) => (
            <a key={n} href={"#sp-" + n.toLowerCase()}>
              {n}
            </a>
          ))}
        </nav>
        <button
          onClick={enter}
          disabled={!canEnterWorld}
          title={
            canEnterWorld
              ? "Explore the interactive portfolio"
              : "3D requires WebGL and motion enabled"
          }
        >
          3D WORLD ↗
        </button>
      </header>
      <main className="sp-content" id="sp-top">
        <section className="sp-hero">
          <div>
            <span className="sp-eyebrow">
              PESHAWAR, PAKISTAN / AVAILABLE FOR WORK
            </span>
            <h1>
              MUHAMMAD
              <br />
              <em>ZUHAIR ZEB.</em>
            </h1>
            <h2>WordPress & Web Developer</h2>
            <p>
              AI student. Founder of Sociapi Society.
              <br />I build fast websites, useful digital products, and things
              people actually use.
            </p>
            <div className="sp-actions">
              <a className="sp-primary" href="#sp-projects">
                VIEW PROJECTS ↗
              </a>
              <a href="#sp-contact">CONTACT ME ↗</a>
            </div>
          </div>
          <div
            className="sp-hero-art"
            aria-label="Creative developer, WordPress engineer and AI student"
          >
            <span>DESIGN. DEVELOP. DELIVER.</span>
            <b>
              MAKE
              <br />
              IT WORK<span>↗</span>
            </b>
            <div className="sp-code">
              &lt;developer&gt;
              <br />
              &nbsp; WordPress × Web × AI
              <br />
              &lt;/developer&gt;
            </div>
            <small>BUILT WITH CURIOSITY.</small>
          </div>
        </section>
        <section id="sp-about" className="sp-about">
          <div>
            <span className="sp-eyebrow">01 / ABOUT</span>
            <h2>
              Useful websites.
              <br />
              Thoughtful development.
            </h2>
          </div>
          <div>
            <p>
              I’m Muhammad Zuhair Zeb, a WordPress and web developer working on
              custom websites, WooCommerce stores, and digital products for real
              clients.
            </p>
            <p>
              I study Artificial Intelligence at Islamia College University
              Peshawar and lead Sociapi Society, a student technology community.
            </p>
            <div className="sp-stats">
              <span>
                <b>4+</b>Years of experience
              </span>
              <span>
                <b>10+</b>Websites delivered
              </span>
              <span>
                <b>340+</b>Community participants
              </span>
            </div>
          </div>
        </section>
        <section id="sp-projects">
          <div className="sp-section-title">
            <div>
              <span className="sp-eyebrow">02 / SELECTED WORK</span>
              <h2>Proof, in pixels.</h2>
            </div>
            <p>
              Client websites, community platforms
              <br />
              and experiments in the browser.
            </p>
          </div>
          {projects.map((p, i) => (
            <article className="sp-project" key={p.id}>
              <div className="sp-project-visual">
                <span className="sp-project-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.image ? (
                  <img
                    loading="lazy"
                    src={
                      "/optimized/" + p.image.replace(/\.(png|jpg)$/i, ".webp")
                    }
                    alt={p.title + " — real project screenshot"}
                  />
                ) : (
                  <div className="sp-chatbot">
                    QUESTION →<br />
                    <b>USEFUL ANSWER.</b>
                    <small>SOCIAPI WHATSAPP CHATBOT</small>
                  </div>
                )}
              </div>
              <div className="sp-project-copy">
                <span className="sp-eyebrow">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="sp-tags">
                  {p.technologies?.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="sp-project-links">
                  {p.liveDemo && !unavailableProjectLinks.has(p.liveDemo) && (
                    <a href={p.liveDemo} target="_blank" rel="noreferrer">
                      VIEW LIVE ↗
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer">
                      SOURCE ↗
                    </a>
                  )}
                  {p.caseStudyUrl &&
                    !unavailableProjectLinks.has(p.caseStudyUrl) && (
                      <a href={p.caseStudyUrl} target="_blank" rel="noreferrer">
                        CASE STUDY ↗
                      </a>
                    )}
                </div>
                {p.overview && (
                  <details>
                    <summary>PROJECT DETAILS +</summary>
                    <p>{p.overview}</p>
                    {p.results && <p>{p.results}</p>}
                  </details>
                )}
              </div>
            </article>
          ))}
        </section>
        <section id="sp-experience">
          <div className="sp-section-title">
            <div>
              <span className="sp-eyebrow">03 / EXPERIENCE</span>
              <h2>Built through doing.</h2>
            </div>
          </div>
          <div className="sp-timeline">
            {experiences.map((e) => (
              <article key={e.role}>
                <time>{e.period}</time>
                <div>
                  <h3>{e.role}</h3>
                  <strong>{e.company}</strong>
                  <ul>
                    {e.desc.split(/(?<=\.)\s+/).map((line, i) => (
                      <li key={i}>
                        {line.length > 230
                          ? line.slice(0, line.lastIndexOf(" ", 220)) + "…"
                          : line}
                      </li>
                    ))}
                  </ul>
                  {e.desc.length > 300 && (
                    <details>
                      <summary>FULL EXPERIENCE DETAILS +</summary>
                      <p>{e.desc}</p>
                    </details>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="sp-skills">
          <div className="sp-section-title">
            <div>
              <span className="sp-eyebrow">04 / SKILLS</span>
              <h2>The working toolkit.</h2>
            </div>
          </div>
          <div className="sp-skill-groups">
            {skills.map((g) => (
              <div key={g.name}>
                <h3>{g.name}</h3>
                <div className="sp-tags">
                  {g.items.map(([n, d]) => (
                    <span title={d} key={n}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="sp-services">
          <div className="sp-section-title">
            <div>
              <span className="sp-eyebrow">05 / SERVICES</span>
              <h2>What I can build for you.</h2>
            </div>
          </div>
          <div className="sp-services">
            {services.map(([n, d], i) => (
              <article key={n}>
                <span className="sp-eyebrow">0{i + 1}</span>
                <h3>{n}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="sp-community">
          <span className="sp-eyebrow">SOCIAPI SOCIETY</span>
          <h2>
            From ideas
            <br />
            to intelligence.
          </h2>
          <p>
            A student technology community built around learning, events, and
            social impact.
          </p>
          <a
            href="https://sociapis.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            EXPLORE SOCIAPI ↗
          </a>
        </section>
        <section className="sp-credentials">
          <div>
            <span className="sp-eyebrow">06 / CONTINUED LEARNING</span>
            <h2>
              Certifications
              <br />& recognition.
            </h2>
          </div>
          <div>
            {certificates.map((c, i) => (
              <div className="sp-credential" key={c}>
                <span>0{i + 1}</span>
                <h3>{c}</h3>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="sp-section-title">
            <div>
              <span className="sp-eyebrow">07 / CLIENT WORDS</span>
              <h2>
                From the other side
                <br />
                of the project.
              </h2>
            </div>
          </div>
          <div className="sp-reviews">
            {reviews.map((r) => (
              <article key={r.id}>
                <span className="sp-quote">“</span>
                <blockquote>
                  {r.text.length > 250
                    ? r.text.slice(0, r.text.lastIndexOf(" ", 250)) + "…"
                    : r.text}
                </blockquote>
                <footer>
                  <strong>{r.name}</strong>
                  <span>{r.date}</span>
                </footer>
                {r.text.length > 250 && (
                  <details>
                    <summary>READ FULL REVIEW +</summary>
                    <p>{r.text}</p>
                  </details>
                )}
              </article>
            ))}
          </div>
        </section>
        <section className="sp-faq">
          <div>
            <span className="sp-eyebrow">08 / QUESTIONS</span>
            <h2>Before we start.</h2>
          </div>
          <div>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="sp-contact" className="sp-contact">
          <div>
            <span className="sp-eyebrow">09 / YOUR NEXT PROJECT</span>
            <h2>
              LET’S BUILD
              <br />
              SOMETHING
              <br />
              <em>USEFUL.</em>
            </h2>
            <a className="sp-email" href={"mailto:" + email}>
              {email} ↗
            </a>
            <div className="sp-actions">
              {socials.slice(0, 2).map(([n, u]) => (
                <a key={n} href={u} target="_blank" rel="noreferrer">
                  {n} ↗
                </a>
              ))}
            </div>
            <button
              onClick={enter}
              disabled={!canEnterWorld}
              title={
                canEnterWorld
                  ? "Explore the interactive portfolio"
                  : "3D requires WebGL and motion enabled"
              }
            >
              ENTER 3D WORLD ↗
            </button>
          </div>
          <div className="sp-form">
            <ContactPanel />
          </div>
        </section>
        <footer className="sp-footer">
          <span>
            MUHAMMAD ZUHAIR ZEB
            <br />
            WORDPRESS & WEB DEVELOPER
          </span>
          <span>PESHAWAR, PAKISTAN / {new Date().getFullYear()}</span>
          <a href="#sp-top">BACK TO TOP ↑</a>
        </footer>
      </main>
    </div>
  );
}
