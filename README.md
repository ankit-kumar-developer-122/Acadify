# Acadify

**Learn Better. Teach Smarter.**

Acadify is a hyperlocal learning marketplace concept connecting learners with trusted local educators while helping educators build a teaching business. This workspace is the planning and demo application project.

## Project status

Working portfolio demo scaffold is in place. All sample people, locations, reviews, sessions, messages, and transactions are synthetic. No real payments or data integrations are active.

## Product surfaces

- Learner: tutor discovery, profiles, filters, booking, messaging, schedule, learning resources, and study assistance.
- Educator: request triage, schedule, weekly availability, public profile preview, creator resource publishing, and sample earnings analytics.
- Admin: verification queue and content moderation demo.
- AI: transparent tutor matching and study assistant with a clearly isolated mock/provider boundary.

## Project documents

See [`docs/`](docs/) for requirements, MVP boundaries, architecture, data, API contracts, design system, privacy/security, quality, deployment, roadmap, decision log, and approval gates.

## Run locally

Requires Node.js and npm. Run `npm install`, then `npm run dev`; use `npm run build` to produce a static build. The demo stores bookings, messages, and simulated resource purchases in this browser's local storage under `acadify-demo-v1`.

Profile photos and font files are decorative remote assets; core demo behavior and seeded marketplace data are local. Saved tutors, educator availability, requests, messages, and published resources stay in this browser. The app does not send learner prompts or profile information to an AI service.

## Local demo safety

Until a specific approval is recorded in `docs/DECISIONS.md`, use synthetic data, local-only demo flows, no real payment credentials, no production deployment, and no collection of real student data.
