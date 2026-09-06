import { Count, SectionLabel } from "./Primitives";
export function SociapiSection() {
  return (
    <section id="sociapi" className="sociapi section">
      <SectionLabel number="05">BEYOND THE BROWSER</SectionLabel>
      <div className="sociapi-top">
        <h2>
          I ALSO BUILT
          <br />A <span>COMMUNITY.</span>
        </h2>
        <span className="society-seal" aria-hidden="true">
          IDEAS
          <br />↓<br />
          INTELLIGENCE
        </span>
      </div>
      <div className="sociapi-content">
        <div>
          <h3>
            Sociapi Society<span>↗</span>
          </h3>
          <p className="mono lime">FROM IDEAS TO INTELLIGENCE.</p>
        </div>
        <div>
          <p>
            A student technology community built around learning together. I
            founded Sociapi Society to connect people through technology,
            workshops, events, and hands-on community work.
          </p>
          <p>
            Alongside building the community, I developed its website,
            management system, and WhatsApp automation.
          </p>
          <a
            className="button lime-button"
            href="https://sociapis.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            EXPLORE SOCIAPI ↗
          </a>
        </div>
      </div>
      <div className="sociapi-stats">
        <Count value={340} label="EVENT PARTICIPANTS" />
        <Count value={50} label="COMMUNITY MEMBERS" />
        <div className="society-note mono">
          A SPACE TO LEARN.
          <br />A REASON TO BUILD.
          <br />
          PEOPLE TO BUILD WITH.
        </div>
      </div>
      <div
        className="community-strip"
        tabIndex={0}
        aria-label="Sociapi website and community management screenshots; scroll horizontally"
      >
        <figure>
          <img
            src="/optimized/New verion of sociapi.webp"
            alt="Sociapi Society community website"
            loading="lazy"
            width="1200"
            height="750"
          />
          <figcaption>01 / THE COMMUNITY PLATFORM</figcaption>
        </figure>
        <figure>
          <img
            src="/optimized/ERP.webp"
            alt="Sociapi Society member management dashboard"
            loading="lazy"
            width="1200"
            height="750"
          />
          <figcaption>02 / THE TOOLS BEHIND THE COMMUNITY</figcaption>
        </figure>
        <figure>
          <img
            src="/optimized/old version of sociapi.webp"
            alt="Earlier version of the Sociapi Society website"
            loading="lazy"
            width="1200"
            height="750"
          />
          <figcaption>03 / WHERE THE WEBSITE STARTED</figcaption>
        </figure>
      </div>
    </section>
  );
}
