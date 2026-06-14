# 🏛️ HeritageAI – Smart Heritage Guide

**HeritageAI** is an AI-powered digital heritage platform that enhances the experience of exploring historical monuments and cultural sites. The application combines Artificial Intelligence, multilingual support, voice assistance, and community-driven issue reporting to create an interactive and accessible heritage tourism ecosystem.

🌐 **Live Demo:** https://smart-heritage-demo-t1gm.vercel.app

---

## 📖 Overview

Many heritage sites lack interactive digital assistance, multilingual accessibility, and efficient maintenance reporting systems. HeritageAI addresses these challenges by providing:

* AI-based monument recognition
* Historical information through an intelligent chatbot
* Multilingual voice-guided tours
* Community issue reporting system
* Accessible heritage exploration for tourists and students

The platform aims to preserve cultural heritage while improving visitor engagement through modern technology.

---

# ✨ Key Features

## 📸 AI Monument Recognition

Upload or capture an image of a monument and receive:

* Monument identification
* Historical significance
* Architectural details
* Cultural importance

---

## 🤖 Heritage Chatbot

Interact with an AI assistant to:

* Ask historical questions
* Learn monument facts
* Explore cultural stories
* Receive contextual information instantly

Example Questions:

* "Who built Charminar?"
* "What is the history of Golconda Fort?"
* "Why is Hampi a UNESCO World Heritage Site?"

---

## 🎙️ Multilingual Voice Guide

Listen to heritage information through voice narration.

Supported Languages:

* English
* Telugu
* Hindi
* Tamil

Benefits:

* Hands-free exploration
* Improved accessibility
* Better visitor engagement

---

## 🚩 Issue Reporting System

Visitors can report:

* Damaged structures
* Cleanliness issues
* Missing signboards
* Vandalism
* Safety concerns

This helps authorities maintain heritage sites effectively.

---

## 🌍 Multi-Language Support

HeritageAI promotes inclusivity by supporting multiple Indian languages, making cultural knowledge accessible to a wider audience.

---

# 🏗️ System Architecture

```text
User
 │
 ▼
Next.js Frontend
 │
 ├── AI Monument Recognition
 ├── Heritage Chatbot
 ├── Voice Guide
 └── Issue Reporting
 │
 ▼
Backend Services / APIs
 │
 ▼
Heritage Information Database
```

---

# 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with PostCSS
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Components**: [Lucide React](https://lucide.dev/) for icons
- **Testing**: [Vitest](https://vitest.dev/) with JSDOM and Coverage-v8
- **Linting & Formatting**: [ESLint 9](https://eslint.org/), [Prettier 3](https://prettier.io/), [Biome 2](https://biomejs.dev/)
- **Security**: [Secretlint](https://github.com/secretlint/secretlint) & [Gitleaks](https://github.com/gitleaks/gitleaks)
- **Code Quality**: [Knip](https://knip.dev/) for dead code detection, [Oxlint](https://oxlint.js.org/) for performance
- **Workflow**: [Husky](https://typicode.github.io/husky/) & [Lint-staged](https://github.com/okonet/lint-staged) for pre-commit hooks
- **Release**: [Git-cliff](https://git-cliff.org/) for automated changelogs

---

# 📂 Project Structure

```text
heritageai/
│
├── app/
│   ├── explore/
│   ├── chatbot/
│   ├── voice-guide/
│   └── report/
│
├── components/
│
├── public/
│
├── styles/
│
├── tests/
│
├── .env.example
├── package.json
├── next.config.js
└── README.md
```

---

# 🚀 Installation

## Prerequisites

* Node.js 20+
* npm or yarn

---

## Clone Repository

```bash
git clone https://code.swecha.org/lshiva21/heritageai-smart-heritage-guide.git
```

```bash
cd heritageai-smart-heritage-guide
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

```bash
cp .env.example .env
```

Update the environment variables as required.

---

# ▶️ Running the Application

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Testing

Run Tests:

```bash
npm test
```

Generate Coverage Report:

```bash
npm run coverage
```

---

# 🔍 Code Quality & Security

### Format Code

```bash
npm run format
```

### Lint Project

```bash
npm run lint
```

### Dead Code Detection

```bash
npm run deadcode
```

### Security Scan

```bash
npm run security
```

---

# 🎯 Use Cases

### For Tourists

* Discover monument history
* Access multilingual guides
* Explore heritage interactively

### For Students

* Learn historical facts
* Conduct educational research
* Access AI-powered explanations

### For Heritage Authorities

* Receive issue reports
* Improve site maintenance
* Increase visitor engagement

---

# 🌟 Future Enhancements

* AR-based monument visualization
* Real-time navigation inside heritage sites
* Offline voice guides
* QR code monument scanning
* AI-generated personalized heritage tours
* UNESCO heritage integration
* Mobile application support

---

# 🏆 Hackathon Impact

HeritageAI demonstrates how Artificial Intelligence can be used to:

* Preserve cultural heritage
* Improve tourism experiences
* Increase accessibility
* Encourage citizen participation
* Support digital transformation of heritage management

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

---

# 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

See the LICENSE file for more information.

---

# 👨‍💻 Team

**Team Name:** HeritageAI

Developed for innovation in cultural heritage preservation and digital tourism.

---

## 🔗 Links

* Live Demo: https://smart-heritage-demo-t1gm.vercel.app
* Repository: https://code.swecha.org/lshiva21/heritageai-smart-heritage-guide

⭐ If you like this project, consider giving it a star!
