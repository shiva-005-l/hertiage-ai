# HeritageAI Project Structure

This repository uses a split frontend/backend architecture with MongoDB persistence and follows MVC principles on the backend.

## Top-level folders

- `backend/` - Node.js Express backend application.
- `frontend/` - React + Vite + Tailwind frontend application.
- `database/` - MongoDB-related scripts, seed data, and schema definitions.
- `docs/` - Documentation and architecture notes.
- `scripts/` - Utility scripts for local setup, seed data generation, or deployment tasks.
- `config/` - Shared configuration files and environment settings for the project.
- `specs/` - Project specification artifacts.

## Backend folder structure

- `backend/src/controllers/` - Express controller functions that handle incoming requests and coordinate responses.
- `backend/src/models/` - MongoDB model definitions, schema objects, and data access abstractions.
- `backend/src/routes/` - Express route definitions that map HTTP endpoints to controllers.
- `backend/src/middlewares/` - Custom middleware for authentication, authorization, validation, error handling, and logging.
- `backend/src/services/` - Business logic and service layer code used by controllers (e.g. review processing, AI orchestration, QR generation).
- `backend/src/config/` - Backend configuration code, environment variable handling, and app settings.
- `backend/src/database/` - MongoDB connection utilities, database initialization, and migration helpers.
- `backend/src/utils/` - Shared helper utilities and common functions used across the backend.
- `backend/src/views/` - Optional view templates or server-rendered pages if needed by the backend.
- `backend/tests/` - Backend test suites for unit and integration tests.
- `backend/public/` - Static backend assets and publicly served files.
- `backend/scripts/` - Backend-specific scripts like seeders, migrations, or maintenance helpers.

## Frontend folder structure

- `frontend/src/assets/` - Static asset files such as images, icons, and fonts.
- `frontend/src/components/` - Reusable UI components, widgets, and presentational pieces.
- `frontend/src/pages/` - Page-level components representing routes and screens.
- `frontend/src/layouts/` - Layout components for app structure, headers, footers, and dashboard shells.
- `frontend/src/hooks/` - Custom React hooks for state, data fetching, and UI behavior.
- `frontend/src/services/` - API service modules and frontend business logic.
- `frontend/src/stores/` - State management files, context providers, or global stores.
- `frontend/src/styles/` - Tailwind entrypoints, global styles, and design system utilities.
- `frontend/src/types/` - TypeScript type definitions and shared interfaces.
- `frontend/src/utils/` - Frontend utility functions and helpers.
- `frontend/src/api/` - HTTP client wrappers and API route abstractions.
- `frontend/public/` - Public static files served by Vite, including the app entry HTML.
- `frontend/tests/` - Frontend test files for components and integration tests.

## Database folder structure

- `database/seed/` - Seed scripts or JSON fixtures for populating MongoDB with initial data.
- `database/migrations/` - Database migration scripts or versioned schema changes.
- `database/schemas/` - Schema definitions and MongoDB collection models used across the repo.

## Support folders

- `docs/project-structure.md` - This document explaining folder responsibilities.
- `scripts/` - Cross-cutting automation scripts for setup and operations.
- `config/` - Centralized project-wide configuration and environment templates.
