# Decision log and approval gates

Record consequential decisions here with date, status, alternatives, rationale, consequences, and owner approval. A verbal preference in the active conversation can be recorded as approval. Until approved, use the safest reversible demo default.

## Approval gates

The following require explicit owner approval before action:

1. **Major stack or architecture choice** when alternatives materially affect delivery or maintenance.
2. **Paid third-party service** or commitment with ongoing cost.
3. **Real payment processing, payouts, or financial data.**
4. **Production/public deployment**, custom domain, or externally visible launch.
5. **Real student/tutor personal data**, especially minors, precise location, identity, or educational records.
6. **External AI, messaging, maps, analytics, storage, identity, or verification integration** that transmits data.
7. **Scope expansion** that changes the MVP or creates material safety/operational obligations.

## ADR-000: Demo-safe project baseline

- Date: 2026-10-29
- Status: Proposed baseline
- Context: Empty project workspace; portfolio demo requested.
- Decision: Start with synthetic data, demo-only journeys, transparent mock labels, no external providers, no live payments, and no production deployment. Keep provider seams isolated.
- Consequences: Core flows can be implemented and reviewed without committing to vendors or handling real learner data.

## ADR-001: Frontend stack

- Date: 2026-10-29
- Status: Approved by owner
- Proposed: React + Vite + TypeScript for a fast, static-friendly portfolio demo.
- Alternatives: Next.js + TypeScript; defer selection.
- Approval: Owner selected “React + Vite + TypeScript” on 2026-10-29.
- Consequences: Use Vite for the client demo; keep domain logic portable and do not imply server-side capabilities.

## ADR-002: Demo persistence

- Date: 2026-10-29
- Status: Approved by owner
- Proposed: Synthetic in-memory/local browser storage only; no server or external data service.
- Alternatives: Frontend-only ephemeral state; revisit Supabase only after a separate approval and data/security review.
- Approval: Owner selected “Yes, local mock data” on 2026-10-29.
- Consequences: Use browser-local storage for synthetic demo state. Never store sensitive or real user data.
