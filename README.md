# Acadify

Acadify is a portfolio demo for a hyperlocal learning marketplace. It includes learner tutor discovery, educator tools, scheduling, local demo chat, resources, study assistant mock flows, and three appearance modes. Marketplace profiles and dashboard activity are synthetic examples.

## Run it

- `npm install`
- `npm run dev` for the browser-only experience.
- `npm run dev:stack` for the browser plus optional local Express API and SQLite demo store.
- For Python tutor matching and the Streamlit dashboard: create a Python virtual environment, install `services/python/requirements.txt`, then start `npm run analytics` separately. The web app's matcher falls back to browser filtering when Python dependencies or the API are unavailable.

The optional local stack demonstrates Express REST endpoints, Node.js, SQLite, Python/Pandas/scikit-learn, Java's standard-library `PriorityQueue`, and Streamlit. The browser baseline continues to save its normal demo state in localStorage. API-generated data stays in the ignored `.data/` folder.

## Scope and safety

The app does not connect to real payments, external AI, messaging, maps, hosted databases, authentication, or deployment. Do not enter real learner/student data. The local API binds to loopback only and is not production-ready. Read [the project handbook](docs/README.md), especially its security, deployment, and approval-gate documents, before extending the integrations.
