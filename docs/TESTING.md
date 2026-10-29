# Testing strategy

Status: Proposed. Test tooling is stack-dependent and awaits approval.

## Coverage targets

- Unit: search filters, ranking/explanation rules, booking state transitions, price formatting, validation.
- Educator: request accept/decline, availability day selection, resource publish → learner catalog visibility, and sample earnings labels.
- Component: forms, filters, tutor cards, accessible dialogs, booking flow, demo labels, and error/empty states.
- End-to-end: discovery → profile → booking; match wizard → explained results; resource → simulated checkout; role switch → tutor/admin tasks.
- Responsive/accessibility: keyboard-only core journeys, semantic labels, focus visibility, contrast, narrow/mobile and wide layouts.
- Safety checks: synthetic-only seed data, no real payment/provider claim, no secrets, clear mock states.

## Quality gate

Before marking demo-ready, document commands and outcomes for the available checks, inspect the core journeys visually, and record known gaps. Do not claim a test passed unless it was run against the final implementation. Test framework selection follows stack approval.

## Current verification record

- `npm run build`: passed on 2026-10-29.
- Desktop marketplace was opened for visual review; primary layout and tutor cards rendered.
- Educator dashboard, availability editor, and resource creator rendered in the browser; actions are connected to local demo state.
- Automated test suite and complete mobile journey review are not yet implemented/run.

## Post-push verification requested (2026-10-29)
Run after the first GitHub push, in this order:
1. Production build and TypeScript validation.
2. Browser smoke check in Light, Study, and Dark; verify selection remains after refresh and core surfaces remain readable.
3. Learner: search/filter, open a tutor profile, request a session, and confirm it appears in the Ankit schedule.
4. Learner: send a local demo message, request a study response, inspect a resource and complete the simulated library add.
5. Educator: toggle weekdays, change time window, save, navigate away, reopen, and verify exact persisted values and dashboard summary; confirm invalid/empty schedules cannot be saved.
6. Educator: accept/decline a sample request and publish a resource; verify it appears in the library.
7. Admin demo and responsive layout smoke review.
