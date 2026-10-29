# Security and privacy

Status: Demo safety baseline; not a legal or production compliance assessment.

## Demo requirements

- Use synthetic learner, tutor, location, review, message, booking, and transaction examples.
- Do not request or accept real student records, precise addresses, identity documents, or payment data.
- Any local browser persistence must be clearly demo-only and contain no sensitive data.
- Do not put secrets in frontend source, repository, screenshots, or demo configuration.
- AI, messaging, maps, storage, identity, and payment adapters default to mocks/unavailable. No data leaves the browser unless separately approved and implemented.
- Clearly distinguish demo verification, sample rating, AI suggestion, and simulated purchase from real trust or transaction states.

## Before real users or deployment

Require a separate review for authentication and role authorization, data minimization/retention/deletion, encryption, abuse and child-safety handling, moderation escalation, secure file uploads, vendor data handling, incident response, logging, consent, applicable legal requirements, and payment/provider controls. Obtain specialist review where needed; do not represent this demo as compliant.

## Approval gates

Owner approval and documented ADR are required before importing real personal/student data, connecting a provider that receives user data, enabling public signup, or deploying a production/public service.
