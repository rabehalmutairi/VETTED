# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js + TypeScript + Tailwind (frontend); FastAPI + Pydantic on Vercel's Python runtime (backend); Supabase Postgres (accessed only from FastAPI) + Supabase Auth. Decided prior to this record; not open for reconsideration.

## Users

Saudi university students and fresh graduates searching for tech opportunities (hackathons, bootcamps, programs, competitions, internships). They are scanning for listings with a real, still-open deadline, and are distrustful of noisy aggregators and social-media posts where dates and links are often stale or wrong.

## Product Purpose

A small, high-accuracy public directory of tech opportunities for this audience. Listings are found and verified manually by an admin — not scraped or AI-generated for public display. Success means a student finds a legitimate, currently-open opportunity faster, and with more trust, than searching social media or generic aggregators themselves.

## Positioning

Manual verification at small, deliberate scale (roughly 25-40 live listings at a time, 3-8 new per month) is the mechanism, not a v1 limitation. Correctness of dates and links outranks breadth or feed-like volume — a scraped or auto-generated aggregator could not truthfully make the same accuracy claim.

## Operating Context

An admin manually finds and verifies listings and enters them through V1 admin CRUD. Most visitors arrive via a shared link on a phone. A local-only Gemini-based extraction pipeline assists the admin in drafting listing data; it is not part of the deployed product and writes to Supabase directly from the admin's laptop.

## Capabilities and Constraints

- V1 is Discover only: browse listings, view a detail page, admin CRUD. No teammate-finding, matching, or social features (may be considered later, only with real V1 traffic).
- Contact details never appear in list responses; they are returned only by a dedicated, authenticated, rate-limited reveal endpoint. Hiding them with CSS/UI only is not acceptable.
- Descriptions are stored and rendered as plain text only — no rich text, no markdown.
- Every listing has a `slug` (used in the URL) and a publicly displayed `last_verified_at`.
- The deadline is the single most important piece of information on a listing card.
- Tags/fields are curated, validated values, not free text.

## Brand Commitments

No confirmed brand identity yet. Using a working name ("Opportunities") as a placeholder in the UI until real branding is decided.

## Evidence on Hand

No real listings data exists yet. Discover/detail pages are being built against realistic placeholder listings (fake but representative hackathon/bootcamp/internship entries: plausible names, orgs, dates, tags) until Supabase is connected. Future work must not mistake these placeholders for real content.

## Product Principles

1. Correctness of dates and links outranks feature breadth.
2. Information-dense and scannable over decorative — this is a directory, not a marketing site.
3. Small curated scale is a deliberate constraint, not a v1 gap to close with scraping or automation.
4. Mobile-first: most traffic arrives via a shared link on a phone.
5. Contact/PII protection is a hard boundary enforced server-side, never a UI-only concealment.

## Accessibility & Inclusion

No product-specific requirement established beyond standard web accessibility practice.
