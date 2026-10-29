# API contracts

Status: Domain operations are implemented in the browser. The optional loopback API below is implemented for local portfolio use only.

## Local HTTP endpoints

- `GET /api/health` → local API/SQLite and runtime availability; contains no user data.
- `GET /api/tutors` → shared synthetic tutor catalog.
- `POST /api/match` with `{subject, mode, goal?}` → Python TF-IDF ranked tutor ids and method; goal is limited to 300 characters and never persisted.
- `POST /api/requests/prioritize` with `{requests:[{id,priority}]}` → ids ranked by Java `PriorityQueue`; accepts at most 100 entries and `urgent | standard | flexible` priorities.
- `POST /api/bookings` with `{tutorId,subject,date,time,mode}` → inserts a synthetic request into local SQLite. No auth or real learner identity is accepted.
- `GET /api/metrics` → aggregate synthetic SQLite booking/event counts for the local Streamlit dashboard.

All routes bind only to `127.0.0.1`; validation errors use `{code,message}`. The API is not suitable for public exposure and has no authentication, rate limiting, or production operational controls.

## Domain operations

- `searchTutors(query)` → `{ tutors, facets, total }`. Query supports subject, mode, locality label, hourly rate, language, minimum rating, and availability window.
- `getTutor(id)` → tutor profile plus public availability; missing id returns not-found.
- `requestBooking(input)` → booking in `requested` state; validate slot, mode, subject, and quote before creation.
- `updateBooking(id, action)` → state transition; only allowed transitions succeed.
- `setEducatorAvailability(days, timeWindow)` → saves the educator’s demo availability locally.
- `publishResource(input)` → adds a synthetic resource to the learner library; file upload and public publishing are not provided.
- `getEducatorSummary(period)` → illustrative earnings, sessions, profile visits, ratings, request queue, and resource activity; values must be marked as sample data.
- `listMessages(conversationId)` / `sendDemoMessage(input)` → demo conversation and message. No real delivery.
- `listResources(filters)` / `getResource(id)` / `simulatePurchase(resourceId)` → catalog, resource details, and clearly simulated checkout confirmation; no payment instrument is requested or charged.
- `matchTutors(preferences)` → ranked candidates with score dimensions and plain-language reasons; no opaque “AI verified” claims.
- `askStudyAssistant(input)` → mock explanation/practice response through provider interface; clearly labeled mock unless a separately approved provider is connected.
- `listVerificationCases()` / `reviewVerificationCase(id, action)` → admin demo queue only.

## Error shape

`{ code, message, fieldErrors? }`; expected codes include `NOT_FOUND`, `VALIDATION_ERROR`, `SLOT_UNAVAILABLE`, `INVALID_TRANSITION`, and `DEMO_ONLY`.

## Boundary rules

These are application-level contracts only. No HTTP routes, external integrations, or service-level guarantees should be claimed until implemented and exercised. A future network API needs authz, input validation, rate limits, audit behavior, and versioning documented in a new ADR.
