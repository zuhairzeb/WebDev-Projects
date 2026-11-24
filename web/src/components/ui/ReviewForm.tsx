import { useEffect, useState, type FormEvent } from "react";

type SubmittedReview = {
  id: string;
  name: string;
  project: string;
  rating: number;
  review: string;
  createdAt: string;
};

const localReviewsKey = "mzz-client-reviews-preview";
const isVitePreview = () =>
  ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname) &&
  ["5173", "5174", "4173"].includes(window.location.port);

function readLocalReviews(): SubmittedReview[] {
  try {
    return JSON.parse(localStorage.getItem(localReviewsKey) || "[]");
  } catch {
    return [];
  }
}

export function ReviewForm() {
  const [reviews, setReviews] = useState<SubmittedReview[]>([]);
  const [status, setStatus] = useState("Loading client reviews...");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/.netlify/functions/reviews")
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load submitted reviews.");
        return (await response.json()) as SubmittedReview[];
      })
      .then((items) => {
        setReviews(items);
        setStatus(items.length ? "" : "Be the first to share a review.");
      })
      .catch(() => {
        if (isVitePreview()) {
          setReviews(readLocalReviews());
          setStatus("Local preview: reviews saved here are only visible in this browser.");
        } else {
          setStatus("Reviews are temporarily unavailable.");
        }
      });
  }, []);

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSaving(true);
    setStatus("");
    const data = new FormData(form);

    try {
      const response = await fetch("/.netlify/functions/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          project: data.get("project"),
          rating: data.get("rating"),
          review: data.get("review"),
          website: data.get("website"),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          result.error || "Review service unavailable. Please try again on the live site.",
        );
      }

      setReviews((current) => [result as SubmittedReview, ...current]);
      setStatus("Thanks! Your review is now visible on the site.");
      form.reset();
    } catch (error) {
      if (isVitePreview()) {
        const localReview: SubmittedReview = {
          id: crypto.randomUUID(),
          name: String(data.get("name") || "").trim(),
          project: String(data.get("project") || "").trim(),
          rating: Number(data.get("rating")),
          review: String(data.get("review") || "").trim(),
          createdAt: new Date().toISOString(),
        };
        const updated = [localReview, ...readLocalReviews()];
        localStorage.setItem(localReviewsKey, JSON.stringify(updated));
        setReviews(updated);
        setStatus("Saved in this local preview only; it is not shared with other visitors.");
        form.reset();
        setSaving(false);
        return;
      }
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not save your review. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="review-submission-area">
      <form className="review-form" onSubmit={submitReview}>
        <h3>Leave a client review</h3>
        <label>
          Your name
          <input name="name" autoComplete="name" minLength={2} maxLength={100} required />
        </label>
        <label>
          Project
          <input name="project" maxLength={160} placeholder="Which project did we work on?" />
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
          <textarea name="review" rows={5} minLength={10} maxLength={2000} required />
        </label>
        <label className="review-honeypot" aria-hidden="true" tabIndex={-1}>
          Leave this field empty
          <input name="website" autoComplete="off" tabIndex={-1} />
        </label>
        <button type="submit" disabled={saving}>
          {saving ? "POSTING..." : "POST REVIEW"}
        </button>
        <p className="review-form-status" aria-live="polite">{status}</p>
      </form>

      <div className="submitted-reviews" aria-live="polite">
        <h3>Client reviews</h3>
        {reviews.map((item) => (
          <article className="submitted-review" key={item.id}>
            <span aria-label={`${item.rating} out of 5 stars`}>
              {"★".repeat(item.rating)}
            </span>
            <blockquote>{item.review}</blockquote>
            <footer>
              <strong>{item.name}</strong>
              {item.project && <span>{item.project}</span>}
              <time dateTime={item.createdAt}>
                {new Date(item.createdAt).toLocaleDateString()}
              </time>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
