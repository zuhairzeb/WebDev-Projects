import { useState, type FormEvent } from "react";
import { email } from "../../data/site";

export function ReviewForm() {
  const [status, setStatus] = useState("");

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Client review from ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Project: ${data.get("project") || "Not specified"}`,
      `Rating: ${data.get("rating")}/5`,
      "",
      "Review:",
      data.get("review"),
    ].join("\n");
    const gmail = new URL("https://mail.google.com/mail/");
    gmail.search = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: email,
      su: subject,
      body,
    }).toString();
    const compose = window.open(gmail.toString(), "_blank");
    if (!compose) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setStatus("Your review is ready in an email draft. Send it to share it with me.");
    event.currentTarget.reset();
  };

  return (
    <form className="review-form" onSubmit={submitReview}>
      <h3>Share your experience</h3>
      <label>
        Your name
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        Project
        <input name="project" placeholder="Which project did we work on?" />
      </label>
      <label>
        Rating
        <select name="rating" defaultValue="5">
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </select>
      </label>
      <label>
        Your review
        <textarea name="review" rows={5} required />
      </label>
      <button type="submit">CONTINUE TO EMAIL</button>
      <p className="review-form-status" aria-live="polite">{status}</p>
      <small>Submitting opens a prefilled email draft so you can send your review.</small>
    </form>
  );
}
