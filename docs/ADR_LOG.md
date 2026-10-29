
## 2026-10-29 — Appearance and account personalization
- **Decision:** Add Light, Study (warm paper), and Dark modes as local browser preferences; use native system font fallbacks and translucent navigation surfaces for a restrained macOS feel.
- **Decision:** Use Ankit Kumar as the named demo learner/educator account, while retaining fictional marketplace tutor examples.
- **Decision:** Persist educator availability days and time range atomically in the existing local demo store, with validation and stale-update-safe reducers.
- **Status:** Implemented and pushed to the supplied GitHub repository; production build and browser review passed on the pushed version.
- **Approval gate:** Any move from local demo persistence to hosted accounts/student records, paid services, payment processing, or production release still requires explicit approval.

## ADR-003: Optional local portfolio integrations
- Date: 2026-10-29
- Status: Implemented for local demo; no external data processing or deployment.
- Context: The owner asked to integrate relevant technologies from their resume into Acadify and optimize the project.
- Decision: Preserve the approved React/Vite/TypeScript and browser-storage baseline; add optional Node/Express REST endpoints, local SQLite demo event storage, a Python/Pandas/scikit-learn tutor similarity ranker, Java standard-library request priority queue, and an optional Streamlit local aggregate dashboard. Share the synthetic tutor catalog as JSON. Keep each integration optional with graceful browser fallback where it is part of the UI.
- Alternatives: Replace the browser demo with a hosted backend, managed database, or external AI provider; rejected for this portfolio iteration because they add cost, deployment, privacy, or operational commitments not requested.
- Consequences: The project demonstrates the resume technologies in coherent roles and can still run in browser-only mode. Local stack requires Node 22.13+; the matching and dashboard extras require installing Python dependencies; no integration is production-ready.
- Approval: The owner explicitly asked to integrate as many resume technologies as possible. Their request authorizes relevant reversible local implementation. External services, real student data, live payments, public deployment, and further major architecture changes remain approval-gated.
- Excluded for now: YOLO/OpenCV and Android/Flutter have no meaningful role in the current web marketplace MVP; MySQL/PostgreSQL, XGBoost, Prophet, and other resume items are not added just to inflate the stack. They can be reconsidered when a concrete product need justifies them.
