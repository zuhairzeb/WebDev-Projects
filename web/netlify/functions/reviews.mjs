import { getStore } from "@netlify/blobs";

const store = getStore({ name: "client-reviews", consistency: "strong" });
const jsonHeaders = { "Content-Type": "application/json; charset=utf-8" };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

export default async (request) => {
  if (request.method === "GET") {
    const { blobs } = await store.list({ prefix: "review-" });
    const reviews = await Promise.all(
      blobs.map(({ key }) => store.get(key, { type: "json" })),
    );
    reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return json(reviews);
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Please submit a valid review." }, 400);
  }

  // Quietly reject automated submissions that fill the hidden honeypot.
  if (body.website) return json({ ok: true }, 201);

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const project = typeof body.project === "string" ? body.project.trim() : "";
  const review = typeof body.review === "string" ? body.review.trim() : "";
  const rating = Number(body.rating);

  if (name.length < 2 || name.length > 100) {
    return json({ error: "Enter your name (2 to 100 characters)." }, 400);
  }
  if (project.length > 160) {
    return json({ error: "Project name must be under 160 characters." }, 400);
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return json({ error: "Choose a rating from 1 to 5." }, 400);
  }
  if (review.length < 10 || review.length > 2000) {
    return json({ error: "Review must be 10 to 2,000 characters." }, 400);
  }

  const entry = {
    id: crypto.randomUUID(),
    name,
    project,
    rating,
    review,
    createdAt: new Date().toISOString(),
  };
  await store.setJSON(`review-${entry.createdAt}-${entry.id}`, entry);
  return json(entry, 201);
};
