import { useEffect, useRef, useState, type FormEvent } from "react";
import { email, socials } from "../../data/site";
import { interact } from "../../world/store";
export function ContactPanel() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const request = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      request.current?.abort();
    };
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    if (fields.botcheck) return;
    setStatus("sending");
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
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
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw Error("Rejected");
      if (mounted.current) {
        setStatus("success");
        form.reset();
        interact("Celebrate");
      }
    } catch {
      if (mounted.current) setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }
  return (
    <>
      <p>
        Freelance projects, internships, collaborations, or a good idea. I'm
        listening.
      </p>
      <a className="contact-email" href={`mailto:${email}`}>
        {email} ↗
      </a>
      <div className="panel-links">
        {socials.slice(0, 2).map(([label, url]) => (
          <a key={label} href={url} target="_blank" rel="noreferrer">
            {label} ↗
          </a>
        ))}
      </div>
      <form
        className="terminal-form"
        onSubmit={submit}
        aria-label="Project inquiry"
      >
        <label htmlFor="world-name">
          YOUR NAME
          <input
            id="world-name"
            name="name"
            required
            autoComplete="name"
            maxLength={120}
          />
        </label>
        <label htmlFor="world-email">
          EMAIL ADDRESS
          <input
            id="world-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={254}
          />
        </label>
        <label htmlFor="world-subject">
          PROJECT / SUBJECT
          <input id="world-subject" name="subject" required maxLength={200} />
        </label>
        <label htmlFor="world-phone">
          PHONE (OPTIONAL)
          <input
            id="world-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
          />
        </label>
        <label htmlFor="world-message">
          WHAT DO YOU HAVE IN MIND?
          <textarea
            id="world-message"
            name="message"
            required
            rows={3}
            maxLength={8000}
          />
        </label>
        <input
          className="honeypot"
          name="botcheck"
          type="checkbox"
          tabIndex={-1}
          aria-hidden="true"
        />
        <button className="world-button" disabled={status === "sending"}>
          {status === "sending" ? "TRANSMITTING…" : "SEND MESSAGE ↗"}
        </button>
        <p role="status" className={`form-feedback ${status}`}>
          {status === "success"
            ? "Message received. Thank you!"
            : status === "error"
              ? "Could not send. Try again or email me directly."
              : "Usually responds within 24 hours."}
        </p>
      </form>
    </>
  );
}
