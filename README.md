# HeritageAI Smart Heritage Guide

HeritageAI is an AI-assisted cultural heritage demo that helps visitors explore monuments, ask historical questions, listen to multilingual voice guides, recognize monuments from images, and report site issues.

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Backend: Node.js HTTP service with controller, route, service, model, config, and utility layers
- Testing: Vitest with JSDOM and coverage-v8
- Quality: ESLint, Prettier, Biome, Oxlint, Knip, Secretlint
- AI integrations: Gemini Vision-ready monument recognition, LLM-ready chatbot architecture

## Folder Structure

```text
heritageai-smart-heritage-guide/
├── frontend/                  # Next.js application
│   ├── src/
│   │   ├── app/               # Next App Router pages, layouts, API adapters
│   │   ├── assets/            # Frontend-only static source assets
│   │   ├── components/        # Reusable UI, layout, and feature components
│   │   ├── hooks/             # React hooks and providers
│   │   ├── pages/             # Reserved for page-level abstractions
│   │   ├── services/          # Frontend services, data fixtures, API helpers
│   │   ├── styles/            # Shared style modules
│   │   └── utils/             # Utility helpers
│   ├── public/                # Public static files
│   ├── package.json
│   └── README.md
├── backend/                   # Standalone Node backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── database/                  # Schemas, migrations, and seed notes
├── ai-models/                 # Future AI/ML assets
├── docs/                      # Architecture and project documentation
├── tests/                     # Frontend and backend tests
├── package.json               # Root convenience scripts
└── README.md
```

## Environment Setup

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Fill in optional AI keys such as `GEMINI_API_KEY` when testing live monument recognition. Without an API key, the frontend keeps its demo fallback behavior.

## Run Frontend

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

Open `http://localhost:3000`.

Root shortcut:

```bash
npm run frontend:dev
```

## Run Backend

```bash
npm --prefix backend run dev
```

The backend starts at `http://127.0.0.1:4000`.

Available routes:

- `GET /health`
- `POST /api/chat`

## Test And Build

```bash
npm run test:ci
npm run type-check
npm run build
```

The Next.js demo frontend still includes its existing API route handlers under `frontend/src/app/api` so the deployed/demo app runs as before. The standalone backend is organized separately for evaluator clarity and future expansion.
