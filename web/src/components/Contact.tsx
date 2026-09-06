import { useEffect, useRef, useState, type FormEvent } from "react";
import { email, socials } from "../data/site";
import { SectionLabel } from "./Primitives";
export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    if (fields.botcheck) return;
    setStatus("sending");
    controller.current = new AbortController();
    const timer = window.setTimeout(() => controller.current?.abort(), 15000);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...fields,
          access_key: "4889b007-7960-4444-b8f7-5f948e45a9ab",
        }),
        signal: controller.current.signal,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timer);
    }
  }
  return (
    <section id="contact" className="section contact">
      <SectionLabel number="09">HAVE A PROJECT?</SectionLabel>
      <div className="contact-grid">
        <div>
          <h2>
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            <span>USEFUL.</span>
            <span className="contact-arrow" aria-hidden="true">
              ↗
            </span>
          </h2>
          <p>
            Freelance projects, internships, collaborations,
            <br />
            or a good idea. I'm listening.
          </p>
          <a className="email-link" href={`mailto:${email}`}>
            {email} ↗
          </a>
          <div className="contact-socials">
            {socials.slice(0, 2).map(([name, url]) => (
              <a href={url} key={name} target="_blank" rel="noreferrer">
                {name.toUpperCase()} ↗
              </a>
            ))}
          </div>
        </div>
        <form
          onSubmit={submit}
          className="contact-form"
          aria-label="Project inquiry"
        >
          <div className="form-heading mono">
            TELL ME WHAT YOU HAVE IN MIND. ↙
          </div>
          <div className="form-pair">
            <label htmlFor="contact-name">
              YOUR NAME
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                placeholder="Your name"
                maxLength={120}
              />
            </label>
            <label htmlFor="contact-email">
              EMAIL ADDRESS
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                maxLength={254}
              />
            </label>
          </div>
          <label htmlFor="contact-subject">
            WHAT ARE WE BUILDING?
            <input
              id="contact-subject"
              name="subject"
              required
              placeholder="A website, a store, something new…"
              maxLength={200}
            />
          </label>
          <label htmlFor="contact-phone">
            PHONE <span>(OPTIONAL)</span>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Your phone number"
              maxLength={40}
            />
          </label>
          <label htmlFor="contact-message">
            A LITTLE ABOUT YOUR PROJECT
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="Goals, timeline, and anything I should know."
              maxLength={8000}
            />
          </label>
          <input
            name="botcheck"
            type="checkbox"
            className="honeypot"
            tabIndex={-1}
            aria-hidden="true"
          />
          <button className="button primary" disabled={status === "sending"}>
            {status === "sending" ? "SENDING…" : "SEND YOUR MESSAGE ↗"}
          </button>
          <p
            className={`form-status ${status}`}
            role="status"
            aria-live="polite"
          >
            {status === "success"
              ? "Message sent. Thanks for reaching out!"
              : status === "error"
                ? `Could not send. Please try again or email ${email}.`
                : "Usually responds within 24 hours."}
          </p>
        </form>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="logo" href="#home">
          MZZ<span>.</span>
        </a>
        <p>
          MUHAMMAD ZUHAIR ZEB
          <br />
          <span>WORDPRESS & WEB DEVELOPER</span>
        </p>
      </div>
      <div className="footer-socials">
        {socials.slice(2).map(([name, url]) => (
          <a key={name} href={url} target="_blank" rel="noreferrer">
            {name} ↗
          </a>
        ))}
      </div>
      <div className="footer-bottom mono">
        <span>PESHAWAR, PAKISTAN</span>
        <span>© {new Date().getFullYear()} MUHAMMAD ZUHAIR ZEB</span>
        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
