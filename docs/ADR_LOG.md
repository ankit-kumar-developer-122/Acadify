
## 2026-10-29 — Appearance and account personalization
- **Decision:** Add Light, Study (warm paper), and Dark modes as local browser preferences; use native system font fallbacks and translucent navigation surfaces for a restrained macOS feel.
- **Decision:** Use Ankit Kumar as the named demo learner/educator account, while retaining fictional marketplace tutor examples.
- **Decision:** Persist educator availability days and time range atomically in the existing local demo store, with validation and stale-update-safe reducers.
- **Status:** Implemented and pushed to the supplied GitHub repository; production build and browser review passed on the pushed version.
- **Approval gate:** Any move from local demo persistence to hosted accounts/student records, paid services, payment processing, or production release still requires explicit approval.
