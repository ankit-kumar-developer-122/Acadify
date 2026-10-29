# Architecture

Status: Approved and implemented for demo. React + Vite + TypeScript; local browser storage holds synthetic demo state.

## Chosen demo implementation

Use a TypeScript component-based web app with a clear separation between presentation, domain rules, data access, and external-provider adapters. For the first demo, keep data and services local and deterministic; expose seams so a backend or AI provider can be added later without implying that one exists.

## Logical areas

- **Experience:** learner discovery, tutor profile, booking/schedule/chat, creator catalog, study assistant, educator workspace, admin workspace.
- **Domain:** tutors, search/matching, availability, bookings, conversations, resources, moderation/verification demo states.
- **Data boundary:** typed repositories over synthetic seed data and optional browser-local demo persistence.
- **Provider boundary:** interfaces for maps, payments, messaging, identity/verification, storage, and AI; default implementation is unavailable or mock.

## Proposed dependency direction

UI → application/domain services → repository/provider interfaces → mock adapters. UI must not call third-party providers directly. Secrets must never be exposed in browser code.

## Quality attributes

Responsive performance, accessible interaction, testable pure matching rules, explicit trust labels, privacy-minimal data, and portable setup. Avoid a backend or infrastructure layer until product needs and an approved deployment plan justify it.

## Next approval gates

Backend, authentication, hosting, and vendor selection each require a separate ADR and approval where material. See `DECISIONS.md` for approved choices.
