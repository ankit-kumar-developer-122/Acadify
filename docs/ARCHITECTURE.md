# Architecture

Status: Browser-only baseline is approved. An optional, loopback-only portfolio stack is implemented with synthetic data.

## Chosen demo implementation

Keep React + Vite + TypeScript as the primary experience and keep browser storage as its resilient default. `npm run dev:stack` additionally starts a local Express API, SQLite demo store, Python/scikit-learn matcher, Java request-priority queue, and an optional Streamlit analytics view. All services bind locally or read local files; there are no hosted providers, accounts, real learner records, live payments, or public deployment.

## Logical areas

- **Experience:** learner discovery, tutor profile, booking/schedule/chat, creator catalog, study assistant, educator workspace, admin workspace.
- **Domain:** tutors, search/matching, availability, bookings, conversations, resources, moderation/verification demo states.
- **Data boundary:** one shared synthetic tutor catalog at `src/data/catalog.json`; typed browser data plus optional SQLite demo events under ignored `.data/`.
- **Local API:** Express routes for health, catalog, tutor matching, request prioritization, demo booking writes, and aggregate demo metrics. Vite proxies `/api` in local development.
- **Python:** Pandas and scikit-learn TF-IDF/cosine similarity rank matching tutors using the local sample catalog and learner-selected subject/mode/optional goal. This is explainable sample-data matching, not an LLM or validated recommendation model.
- **Java:** a standard-library `PriorityQueue` orders teacher requests by urgency. The educator studio falls back to browser sorting if Java is not available.
- **Analytics:** Streamlit reads aggregate status counts from the local SQLite database; it does not transmit them.
- **Provider boundary:** real maps, payments, messaging, identity/verification, hosted storage, and external AI remain unconnected.

## Proposed dependency direction

UI → local REST boundary (optional) → local Python/Java processes and SQLite. The browser-only demo still works when those optional processes are absent. UI must not call third-party providers directly. Secrets must never be exposed in browser code.

## Quality attributes

Responsive performance, accessible interaction, testable pure matching rules, explicit trust labels, privacy-minimal data, and portable setup. Avoid a backend or infrastructure layer until product needs and an approved deployment plan justify it.

## Next approval gates

Authentication, hosting, external vendors, real personal data, and paid services require separate ADRs and owner approval. The new local stack is for portfolio demonstration only. See `DECISIONS.md` and `ADR_LOG.md`.
