# Architecture Overview

This document describes the high-level architecture of HeritageAI.

## 🏗️ Folder Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components.
  - `features`: Feature-specific components (Chat, Scanner, etc.)
  - `layout`: Global layout components (Header, Footer).
  - `ui`: Primitive UI components (Button, Input, etc.)
- `src/lib`: Utility functions, shared logic, and API clients.
- `src/test`: Unit and integration tests.
- `public`: Static assets (images, icons, etc.)
- `docs`: Detailed documentation.

## 🚀 Key Technologies

- **Frontend**: Next.js with React 19.
- **Styling**: Tailwind CSS for responsive design.
- **State Management**: React Hooks and Context API (if needed).
- **AI Integration**: Custom agents for Vision and Chat.

## 🔄 Data Flow

1. User interacts with the UI components.
2. Components call utility functions or hooks in `src/lib`.
3. AI requests are routed through dedicated agent handlers.
4. Responses are processed and displayed back to the user.

## 🛠️ Quality Assurance

- **Linting**: ESLint and Biome.
- **Testing**: Vitest for unit tests.
- **Formatting**: Prettier.
- **Security**: Secretlint for credential scanning.
