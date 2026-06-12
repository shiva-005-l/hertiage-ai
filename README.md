# HeritageAI: Smart Heritage Guide

HeritageAI is a modern, AI-powered platform designed to enhance the experience of visiting heritage sites. It provides interactive tools for monument recognition, historical information, and issue reporting.

## 🚀 Features

- 📸 **Monument Recognition**: Identify heritage sites instantly using AI-powered image recognition.
- 🤖 **Heritage Chatbot**: Ask questions and get detailed historical information from our smart assistant.
- 🎙️ **Voice Guide**: Listen to immersive audio tours available in multiple languages.
- 🚩 **Issue Reporting**: Report maintenance issues or vandalism directly to the authorities.
- 🌍 **Multi-language Support**: Experience the heritage in your preferred language.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Linting & Formatting**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Biome](https://biomejs.dev/)
- **Security**: [Secretlint](https://github.com/secretlint/secretlint) with a Gitleaks-compatible config file

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

### Development

Run the development server:

```bash
npm run dev
```

### Testing

Run unit tests:

```bash
npm test
```

Generate coverage report:

```bash
npm run coverage
```

### Quality Tools

- **Format code**: `npm run format`
- **Lint code**: `npm run lint`
- **Check for dead code**: `npm run deadcode`
- **Security scan**: `npm run security`

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
