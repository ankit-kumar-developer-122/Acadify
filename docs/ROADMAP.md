# Roadmap and implementation status

Status: Initial plan; phases are sequential checkpoints.

## Phase 0 — Workspace and governance

- [x] Inspect workspace; no existing app/code found.
- [x] Establish project handbook and approval gates.
- [x] Approve React + Vite + TypeScript and synthetic local browser persistence.

## Phase 1 — Reversible scaffold

- [x] Create app shell, brand foundations, responsive navigation, and synthetic seed data.
- [x] Establish typed domain/data boundaries and visible demo labeling.

## Phase 2 — Learner marketplace

- [x] Search/filter, tutor profiles, match wizard, booking, schedule, and demo chat.

## Phase 3 — Creator and AI demo

- [x] Resource discovery and simulated checkout with no payment collection.
- [x] Study assistant mock and transparent match explanations.

## Phase 4 — Educator/admin and polish

- [x] Educator workspace with requests, accept/decline, schedule, availability, resource publishing, profile summary, and sample earnings.
- [x] Teacher role has a dedicated full-width workspace and direct learner/educator role switching on mobile.
- [x] Tutor saves persist locally; locality, mode, subject, rate, and sort controls are functional.
- [x] Resource library has subject filters, details, demo checkout, and published educator resources.
- [x] Admin verification/moderation demo, responsive layouts, and setup guide.
- [x] Refine learner discovery copy and implement functional locality and hourly-rate filters.
- [x] Production build completes successfully with `npm run build` (2026-10-29).
- [x] Visual browser review of learner discovery, educator dashboard, availability editor, and resource creator (2026-10-29).
- [ ] Continue visual review across mobile and each primary journey.

## Potential next integrations and product capabilities

These are ideas for later phases, not active services. Each requires its own scope, privacy, and cost review before implementation.

- Group classes, lesson bundles, recurring sessions, and cohort rosters.
- Learner goals and progress notes controlled by the learner; assignment feedback and revision history.
- Calendar sync and reminders, with learner/tutor consent and a clear cancellation policy.
- Video classroom, shared whiteboard, and lesson attachments through an approved provider.
- Real checkout, refunds, tutor payouts, invoices, and fee visibility after marketplace operations and payment approval.
- Resource drafts, previews, captions, accessibility checks, and protected delivery for paid content.
- Teacher insights on profile conversion, repeat learners, response time, and resource engagement, using privacy-minimal aggregates.
- Local discovery using coarse service areas; precise location sharing only after explicit approval and a safety review.
- Reviews, attendance, rescheduling, disputes, safeguarding reports, and human moderation workflows for a real launch.

Each phase should update this file and the relevant design/architecture/decision records. Do not advance external or consequential gates without owner approval.

## Update — 2026-10-29
- [x] Added persistent Light, Study, and Dark appearance modes with macOS-inspired system typography, translucent chrome, and a segmented top-bar switch.
- [x] Personalized the demo account and educator workspace for Ankit Kumar while keeping marketplace tutor examples as clearly synthetic sample profiles.
- [x] Repaired weekly availability editing: day changes and editable start/end times now save together, reopen from stored values, reject empty/invalid windows, and use functional state updates to avoid stale writes.
- [ ] After the requested GitHub push, run a fresh build and end-to-end browser review across learner and educator journeys.
- [x] Added the Study buddy to desktop and mobile navigation so its mock assistant flow is reachable without a hidden route.
