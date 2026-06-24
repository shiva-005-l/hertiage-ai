# Project Structure

This repository now uses a professional monorepo-style layout.

- `frontend/` - Next.js frontend application, public assets, UI components, hooks, services, styles, and utilities.
- `backend/` - Standalone Node.js backend organized into controllers, routes, models, services, middleware, config, and utilities.
- `database/` - Database migrations, schema documentation, and seed-data notes.
- `ai-models/` - Reserved space for model artifacts, training scripts, and notebooks.
- `docs/` - Architecture, API, and evaluator documentation.
- `tests/` - Frontend and backend test suites.
- `specs/` - Product specifications and feature planning artifacts.
- `.github/`, `.gitlab-ci.yml`, `.husky/` - Repository automation and CI configuration.

Legacy loose root source files that were not part of the active Next.js source tree were preserved in `docs/legacy-root-files/` for review.
