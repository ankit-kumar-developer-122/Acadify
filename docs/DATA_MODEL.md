# Data model

Status: Proposed conceptual schema. Demo data must be synthetic.

## Entities

- **User:** id, display name, role(s), avatar reference, locale; demo-only role switching.
- **TutorProfile:** user id, headline, bio, subjects, teaching modes, service area label, languages, hourly rate in INR, experience, availability, demo verification state, rating summary with seeded provenance.
- **AvailabilitySlot:** tutor id, start/end, mode, capacity, demo status.
- **EducatorAvailability:** educator id, open weekdays, preferred time window, last updated; demo-only and local.
- **Booking:** learner id, tutor id, slot, subject, mode, quoted amount, status (requested/accepted/declined/cancelled/completed), timestamps.
- **Conversation/Message:** participant ids, booking reference, text, timestamp, read demo state.
- **Resource:** educator id, title, description, type, subject, price (INR; zero for free), preview reference, publication/demo status.
- **ResourcePurchase:** learner id, resource id, amount, status (simulated only), timestamp.
- **EducatorSummary:** period and synthetic aggregates for sessions, visits, ratings, and earnings; never treated as accounting or payout data.
- **MatchRequest/MatchResult:** preferences, candidate tutor ids, score components, human-readable reasons, generated-at; never a verified quality record.
- **StudyPrompt/StudyResponse:** prompt and mock answer in session memory only by default; no real learner content.
- **ModerationCase/VerificationRequest:** synthetic subject, submitted claims, reviewer status, audit timestamps; explicitly non-binding demo records.

## Constraints

Do not store legal names, exact home addresses, birth dates, school identifiers, identity documents, payment credentials, or sensitive learning records in the demo. Use locality labels rather than precise coordinates. Ratings, earnings, and verification state must be labeled as sample/demo data.
