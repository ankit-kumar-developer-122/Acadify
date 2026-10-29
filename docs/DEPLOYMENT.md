# Deployment

Status: Local demo only. Hosting provider and any public deployment are unselected and require approval.

## Current deployment target

Run locally with synthetic data. No external service or production environment is configured.

## Before preview or public launch

Prepare reproducible build instructions, environment-variable inventory, secret handling, accessibility and browser review, privacy notice and data lifecycle, abuse reporting/moderation process, service ownership, rollback plan, monitoring, and cost estimate. A public preview still requires owner approval if it is externally visible or sends data to providers.

## Hard gates

Do not configure paid services, real payments, production hosting, a custom domain, analytics, or real-data ingestion without a specific approval recorded in `DECISIONS.md`.
# Local portfolio stack

- Browser-only: `npm run dev` (the existing localStorage demo remains available).
- Full stack: `npm run dev:stack` (Vite plus loopback Express API on port 4174). Requires Node 22.13+ for built-in SQLite; Java is optional.
- Python matcher and analytics: `python3 -m venv .venv`, activate it, install `services/python/requirements.txt`, then run `npm run analytics` in another terminal. Streamlit is configured for loopback only. `npm run dev:stack` serves the API and web app even if Python dependencies are absent; matching reports its unavailable state and the UI uses its browser fallback.
- Local state: `.data/acadify-demo.sqlite`, ignored by Git. Delete this file to reset API-created synthetic events.
- The API binds to loopback only. Do not expose it on a network or deploy it publicly without a new security/hosting review and explicit owner approval.

No public hosting, external API keys, paid services, or production environment is configured.
