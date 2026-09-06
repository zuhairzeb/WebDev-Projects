import {
  projects,
  experiences,
  skills,
  services,
  reviews,
  faqs,
  certificates,
} from "../../data/site";
export function SemanticPortfolio() {
  return (
    <article
      className="semantic-portfolio"
      aria-label="Complete portfolio text"
    >
      <h2>Muhammad Zuhair Zeb — WordPress & Web Developer</h2>
      <p>
        Based in Peshawar, Pakistan. BS Artificial Intelligence student at
        Islamia College University Peshawar and founder of Sociapi Society.
        Custom WordPress websites, WooCommerce stores, web applications, SEO and
        website performance.
      </p>
      <h3>Projects</h3>
      {projects.map((p) => (
        <section key={p.id}>
          <h4>{p.title}</h4>
          <p>
            {p.description} {p.overview} {p.results}
          </p>
          <p>{p.technologies?.join(", ")}</p>
        </section>
      ))}
      <h3>Experience</h3>
      {experiences.map((e) => (
        <p key={e.role}>
          {e.period}: {e.role}, {e.company}. {e.desc}
        </p>
      ))}
      <h3>Skills</h3>
      {skills.map((g) => (
        <p key={g.name}>
          {g.name}: {g.items.map(([n]) => n).join(", ")}
        </p>
      ))}
      <h3>Services</h3>
      {services.map(([n, d]) => (
        <p key={n}>
          {n}: {d}
        </p>
      ))}
      <h3>Certifications</h3>
      <p>{certificates.join(". ")}</p>
      <h3>Client reviews</h3>
      {reviews.map((r) => (
        <p key={r.id}>
          {r.name}, {r.date}: {r.text}
        </p>
      ))}
      <h3>Frequently asked questions</h3>
      {faqs.map((f) => (
        <p key={f.q}>
          {f.q} {f.a}
        </p>
      ))}
      <h3>Contact</h3>
      <p>
        Email: zuhairzeb@yahoo.com. LinkedIn: linkedin.com/in/zuhairzeb. GitHub:
        github.com/zuhairzeb.
      </p>
    </article>
  );
}
