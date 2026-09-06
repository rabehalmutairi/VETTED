# Opportunities (working name)

A small, high-accuracy directory of tech opportunities (hackathons, bootcamps, programs,
competitions, internships) for university students and fresh graduates in Saudi Arabia.

> **Status: Work in progress.** Discover is built and themed against placeholder data.
> Auth and profile persistence are built but not yet verified end-to-end. Admin CRUD and
> the collab feed are not started. See [Status](#status) below for the full breakdown.

---

## Problem

Students looking for hackathons or internships end up scanning Twitter threads and Telegram
channels where half the dates are stale and half the links are dead by the time anyone clicks
them. The fix here isn't more listings, it's fewer, correct ones: a small set of opportunities
that someone has actually checked are still open, refreshed a handful of times a month rather
than scraped in bulk.

That constraint (correctness over volume) drives most of the technical decisions below,
including which parts of the stack use automation and which deliberately don't.

---

## Architecture

**Frontend** — Next.js 16 (App Router) + TypeScript + Tailwind v4. Server-first: pages fetch
through FastAPI rather than reimplementing query logic client-side.

**Backend** — FastAPI + Pydantic, deployed on Vercel's Python runtime alongside the frontend
(same origin in production, so no CORS in prod; CORS is only enabled for local dev where the
two run on separate ports).

**Data** — Supabase Postgres, schema managed through Alembic migrations (`alembic/versions/`).
Supabase is only ever touched from the FastAPI layer, never directly from the frontend.

**Auth** — Supabase Auth, magic-link sign-in. The frontend never sees a session secret; FastAPI
verifies the Supabase JWT server-side (`api/auth.py`) before trusting any request.

```
Next.js (app/, components/)  ->  FastAPI (api/)  ->  Supabase Postgres
                                       |
                              Supabase Auth (JWT verification)
```

---

## Data extraction: designed, not yet built

Listings are found and verified by a human admin, not scraped or AI-generated for public
display. That's a product requirement, not a v1 shortcut (see
[Deliberate non-scope](#deliberate-non-scope) below for why).

The bottleneck automation can actually help with is drafting: turning a raw announcement (a
tweet, a poster caption, a program page) into the structured fields a listing needs, title,
organization, deadline, tags, link. The plan is a local-only pipeline using Gemini to extract
those fields from unstructured text into a draft row, which the admin then reviews and corrects
before it's published. The model drafts; a human still confirms the deadline is real and the
link resolves.

This deliberately stays out of the deployed app:

- It runs on the admin's machine, not as a service the public API depends on. If it's slow, or
  Gemini has an outage, or the extraction is wrong, none of that touches user-facing requests.
- It writes to Supabase directly with the admin's own credentials, not through a public
  endpoint. There's no reason to expose an LLM-backed write path to the internet.
- Its output is a draft, never a publish. A wrong extraction costs the admin a correction, not a
  wrong deadline shown to a student.

Not implemented yet. Recorded here because it's a decided part of the design, not because it
exists in this repository. `extraction/` doesn't exist yet.

---

## Deliberate non-scope

Explicitly decided against for this version, and why:

| Not building | Why |
|---|---|
| AI-based matching / recommendation | The product's entire pitch is "a human checked this." An automated ranking layer between the listing and the student is exactly the kind of unverifiable middle step this project exists to avoid. |
| Vector / semantic search | At 25-40 live listings, a filter and a sort do everything embeddings would, with nothing to go wrong. Worth reaching for once the catalog outgrows a human being able to browse it directly, not before. |
| Scraping listings automatically | Volume and correctness trade off against each other here. Scraping buys volume at the cost of the one property, verified accuracy, that differentiates this from every other aggregator a student could already find. |
| Chat / DMs / matching feed | Out of scope for a directory. Contact happens through a rate-limited reveal endpoint and then moves off-platform. |

None of this is "not yet." It's a standing decision, kept here so it doesn't get quietly
reconsidered mid-build without someone noticing the tradeoff.

---

## Status

| Surface | Status |
|---|---|
| Discover (browse, filter, sort, detail page) | Built, on placeholder listings |
| Dark theme | Applied to all Discover surfaces |
| Supabase Auth (magic link, JWT verified server-side) | Built; not yet confirmed end-to-end with a real user. Testing was interrupted by Supabase's free-tier email rate limit (2/hour) |
| Profiles (create/view, curated-list validation) | Built; same end-to-end caveat as auth |
| Team requests | Not started |
| Collab feed | Not started |
| Reports / rate limiting | Not started |
| Admin CRUD for listings | Not started |
| Gemini extraction pipeline | Designed, not built |

`lib/mock-opportunities.ts` is the Discover data source until the `opportunities` table
(already created via Alembic) is wired to the frontend, a deliberate sequencing choice, not an
oversight.

---

## Running locally

Two servers, bridged by `NEXT_PUBLIC_API_URL`:

```bash
# Frontend
npm install
npm run dev                    # :3000

# Backend
pip install -r requirements.txt
uvicorn api.index:app --reload --port 8000
```

Needs a `.env` with a Supabase project URL/keys and a Postgres connection string for Alembic.
Not committed, and not included here since it holds real project credentials.

---

## Repository structure

    app/            Next.js pages (App Router)
    components/     React components
    lib/            Client-side helpers, types, mock data
    api/            FastAPI backend (auth, profiles, db access)
    alembic/        Database migrations
    extraction/     Not present yet, planned local Gemini extraction pipeline

---

## Next

- Confirm the auth -> session -> profile-create flow end-to-end (blocked on Supabase's
  free-tier email rate limit; needs custom SMTP)
- Wire the `opportunities` table to Discover, retiring the mock data
- Admin CRUD for listings
- Build the local Gemini extraction pipeline described above
