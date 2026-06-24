# Architecture

HeritageAI is organized as a small full-stack monorepo.

## Frontend

The frontend is a Next.js App Router application in `frontend/`.

- `src/app` contains route segments, layouts, and Next API adapters.
- `src/components` contains reusable UI, layout, and feature components.
- `src/hooks` contains React providers and custom hooks.
- `src/services` contains client-side services, local demo data, and recognition helpers.
- `src/utils` contains small framework-agnostic utilities.

## Backend

The backend in `backend/` is a standalone Node.js service. It follows a layered structure:

- `routes` map HTTP paths to controllers.
- `controllers` handle request/response orchestration.
- `services` hold business logic.
- `models` hold data shapes and demo data.
- `config` stores runtime configuration.
- `utils` stores backend helper functions.

## Data Flow

1. A visitor uses the Next.js UI.
2. UI components call frontend services or `/api/*` routes.
3. Next API adapters preserve demo behavior for deployment.
4. The standalone backend exposes equivalent service boundaries for future API deployment.
5. Database schemas, migrations, and seeds will live under `database/` when persistent storage is added.
