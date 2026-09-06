import { services, process } from "../data/site";
import { SectionLabel } from "./Primitives";
export function Services() {
  return (
    <section id="services" className="section services">
      <SectionLabel number="06">WHAT I CAN DO FOR YOU</SectionLabel>
      <div className="services-grid">
        <div>
          <h2>
            LET'S PUT
            <br />
            YOUR SITE
            <br />
            <span className="blue">TO WORK.</span>
          </h2>
          <p>
            Practical development. Clear communication.
            <br />
            Support from the first call to launch.
          </p>
          <a
            className="text-link"
            href="https://calendly.com/zebzuhair71/30min"
            target="_blank"
            rel="noreferrer"
          >
            BOOK A STRATEGY CALL ↗
          </a>
        </div>
        <div className="accordions">
          {services.map(([title, description], i) => (
            <details key={title} name="services">
              <summary>
                <span className="mono">0{i + 1}</span>
                <h3>{title}</h3>
                <span className="accordion-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{description}</p>
            </details>
          ))}
        </div>
      </div>
      <div id="process" className="process">
        <h3 className="mono">FROM FIRST CONVERSATION TO GOING LIVE →</h3>
        <ol>
          {process.map(([title, description], i) => (
            <li key={title}>
              <span className="mono">0{i + 1}</span>
              <h4>{title}</h4>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
