import { Count, SectionLabel } from "./Primitives";
export function About() {
  return (
    <section id="about" className="section about">
      <SectionLabel number="01">A BIT ABOUT ME</SectionLabel>
      <div className="about-grid">
        <h2>
          I DON'T JUST
          <br />
          BUILD PAGES.
          <br />I BUILD THINGS
          <br />
          <span className="outlined">THAT HAVE</span>
          <br />
          <span className="blue">A JOB.</span>
        </h2>
        <div className="about-story">
          <span className="annotation">
            Developer by practice.
            <br />
            Curious by default. ↙
          </span>
          <p className="lead">
            A website should do more than sit there and look good.
          </p>
          <p>
            I'm Muhammad Zuhair Zeb, a WordPress developer building custom
            websites, WooCommerce stores, and multivendor marketplaces for real
            clients. My focus is simple: clean code, fast load times, and sites
            that help businesses grow.
          </p>
          <p>
            I'm also studying BS Artificial Intelligence at Islamia College
            University Peshawar, and I founded Sociapi Society to bring people
            together around technology and social impact.
          </p>
          <a
            className="text-link"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            THE LONGER VERSION — MY CV ↗
          </a>
          <div className="about-stamp">
            <span>WEB DEVELOPER</span>
            <b>＋</b>
            <span>AI STUDENT</span>
            <b>＋</b>
            <span>COMMUNITY BUILDER</span>
          </div>
        </div>
      </div>
      <div className="stats-row">
        <Count value={4} label="YEARS OF EXPERIENCE" />
        <Count value={10} label="WEBSITES DELIVERED" />
        <Count value={340} label="EVENT PARTICIPANTS" />
        <Count value={50} label="COMMUNITY MEMBERS" />
      </div>
    </section>
  );
}
