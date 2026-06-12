# Heritage Guide Core Plan

## Architecture

- Next.js App Router provides pages and API routes.
- Shared heritage data lives in `src/lib/mock-data.ts`.
- Recognition helpers live in `src/lib/monument-recognition.ts`.
- Feature UI components live under `src/components/features`.

## Tooling

- ESLint, Prettier, Biome, Oxlint, and Knip cover code quality.
- Vitest with V8 coverage enforces unit test health.
- Gitleaks and TruffleHog cover secret scanning.
- npm audit covers dependency vulnerability checks.
- Husky, lint-staged, pre-commit, and GitLab CI automate checks.

## Delivery Steps

1. Keep repository health files present and documented.
2. Add tests around shared recognition logic.
3. Run quality, test, security, and audit commands locally and in CI.
4. Expand feature specs when new heritage workflows are added.
