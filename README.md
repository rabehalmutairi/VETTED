# VETTED 

AI-Assisted Tech Opportunities, high-accuracy directory of tech opportunities (hackathons, bootcamps, programs,
competitions, internships) for university students and fresh graduates in Saudi Arabia.

> **Status: Work in progress.** Discover is built and themed against placeholder data.
> Auth and profile persistence are built. Admin CRUD and
> the collab feed are under work. See [Status](#status) below for the full breakdown.

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

The frontend is Next.js 16 (App Router), TypeScript, and Tailwind v4, and it stays server-first:
pages fetch through FastAPI instead of reimplementing query logic client-side. FastAPI and
Pydantic handle the backend, deployed on Vercel's Python runtime right alongside the frontend, so
production has no CORS to worry about (both sides share an origin there; CORS only gets enabled
for local dev, where they run on separate ports).

Data lives in Supabase Postgres, with the schema managed through Alembic migrations
(`alembic/versions/`). Supabase is only ever touched from the FastAPI layer, never directly from
the frontend.

Auth runs through Supabase's magic-link sign-in. The frontend never sees a session secret; FastAPI
verifies the Supabase JWT server-side (`api/auth.py`) before it trusts any request.

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

## Status

| Surface | Status |
|---|---|
| Discover (browse, filter, sort, detail page) | Built, on placeholder listings |
| Dark theme | Applied to all Discover surfaces |
| Supabase Auth (magic link, JWT verified server-side) | Built; not yet confirmed end-to-end with a real user.  |
| Profiles (create/view, curated-list validation) | Built; |
| Team requests | Working on |
| Collab feed |  Working on |
| Reports / rate limiting |  Working on |
| Admin CRUD for listings |  Working on |
| Gemini extraction pipeline | Designed |

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
