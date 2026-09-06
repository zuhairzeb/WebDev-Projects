import { reviews, faqs, email } from "../data/site";
import { SectionLabel } from "./Primitives";
export default function Reviews() {
  return (
    <>
      <section id="social" className="section testimonials">
        <SectionLabel number="07">WORDS FROM THE OTHER SIDE</SectionLabel>
        <div className="section-heading">
          <h2>
            GOOD WORK.
            <br />
            <span className="outlined">GOOD PEOPLE.</span>
          </h2>
          <p>
            Feedback from the clients
            <br />
            I've had the pleasure of working with.
          </p>
        </div>
        <div className="testimonial-wall">
          {reviews.map((review, i) => (
            <article className={`testimonial testimonial-${i}`} key={review.id}>
              <div className="review-top mono">
                <span aria-label={`${review.rating} out of 5 stars`}>
                  ★★★★★
                </span>
                <span>{review.date}</span>
              </div>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>{review.text}</blockquote>
              <footer>
                <strong>{review.name}</strong>
                <span className="mono">CLIENT REVIEW ↗</span>
              </footer>
            </article>
          ))}
        </div>
        <a
          className="text-link"
          href={`mailto:${email}?subject=Client%20review`}
        >
          WORKED TOGETHER? SEND ME YOUR FEEDBACK ↗
        </a>
      </section>
      <section id="faq" className="section faq">
        <SectionLabel number="08">BEFORE YOU ASK</SectionLabel>
        <div className="faq-grid">
          <h2>
            FAIR
            <br />
            <span className="blue">QUESTIONS.</span>
          </h2>
          <div className="accordions">
            {faqs.map((faq) => (
              <details key={faq.q} name="faq">
                <summary>
                  <h3>{faq.q}</h3>
                  <span className="accordion-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
