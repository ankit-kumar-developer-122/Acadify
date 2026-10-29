# API contracts

Status: Proposed interface contracts; no network API is implemented yet.

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
