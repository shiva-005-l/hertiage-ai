# 🏛️ HeritageAI - Smart Heritage Guide

![HeritageAI](https://img.shields.io/badge/Project-AI%20Heritage%20Guide-blue)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2016-black)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![AI](https://img.shields.io/badge/AI-Gemini%20Vision%20Ready-orange)

## 🌐 Live Demo

🚀 Experience the deployed application:

🔗 **Live Website:**
https://smart-heritage-demo-t1gm.vercel.app/

The live demo provides an interactive experience of the HeritageAI platform, including:

* 🏛️ Heritage monument exploration
* 🤖 AI-powered historical assistant
* 📷 Monument recognition interface
* 🎙️ Multilingual voice guide experience
* 🚨 Heritage issue reporting workflow

---

# 📌 Project Overview

**HeritageAI** is an AI-assisted cultural heritage exploration platform designed to improve how visitors discover, understand, and interact with historical monuments.

The platform combines **Artificial Intelligence, Computer Vision, multilingual support, and modern full-stack technologies** to create a digital heritage companion for tourists, researchers, and cultural enthusiasts.

HeritageAI enables users to:

* Explore monument information digitally
* Ask AI-based historical questions
* Identify monuments using images
* Listen to voice-based heritage guides
* Report maintenance issues at heritage locations

The project follows a scalable architecture with separate frontend, backend, database, documentation, and AI integration layers.

---

# ✨ Features

## 🏛️ Smart Heritage Explorer

* Browse historical monuments
* View cultural and historical information
* Access structured heritage data
* Improve visitor learning experience

---

## 🤖 AI Heritage Assistant

* AI-powered chatbot architecture
* Answers historical queries
* Provides interactive heritage information
* Designed for future LLM integration

---

## 📷 AI Monument Recognition

* Image-based monument identification
* Gemini Vision-ready integration
* Supports future computer vision models
* Enables smart visitor assistance

---

## 🎙️ Multilingual Voice Guide

* Voice-based heritage narration
* Designed for regional language support
* Improves accessibility for different users

---

## 🚨 Heritage Issue Reporting

Visitors can report:

* Monument damage
* Cleanliness problems
* Maintenance requirements
* Visitor concerns

---

# 🏗️ System Architecture

```
                         User
                           |
                           |
                  Next.js Frontend
                  React + TypeScript
                           |
                           |
                    Backend API Layer
                     Node.js Service
                           |
        --------------------------------------
        |                 |                  |
    Database        AI Services        Utility Layer
                   Gemini Vision
                   LLM Integration
```

---

# 🛠️ Technology Stack

## Frontend

| Technology      | Purpose                    |
| --------------- | -------------------------- |
| Next.js 16      | React web framework        |
| React 19        | User interface development |
| TypeScript      | Type safety                |
| Tailwind CSS 4  | Modern styling             |
| Next App Router | Application routing        |

---

## Backend

| Technology   | Purpose            |
| ------------ | ------------------ |
| Node.js      | Backend runtime    |
| HTTP Service | API handling       |
| Controllers  | Request processing |
| Services     | Business logic     |
| Models       | Data structures    |
| Middleware   | Request handling   |

---

## Artificial Intelligence

* Gemini Vision-ready monument recognition
* LLM-ready chatbot architecture
* AI-assisted heritage interaction

---

## Development & Quality Tools

* Vitest
* JSDOM
* Coverage-v8
* ESLint
* Prettier
* Biome
* Oxlint
* Knip
* Secretlint

---

# 📂 Project Structure

```
heritageai-smart-heritage-guide/

│
├── frontend/                   
│   ├── src/
│   │   ├── app/                
│   │   ├── assets/             
│   │   ├── components/         
│   │   ├── hooks/              
│   │   ├── pages/              
│   │   ├── services/           
│   │   ├── styles/             
│   │   └── utils/              
│   │
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env.example
│
├── database/
│
├── ai-models/
│
├── docs/
│
├── tests/
│
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## Prerequisites

Install the following before running the project:

* Node.js (v18 or above)
* npm
* Git

Verify installation:

```bash
node -v
npm -v
git --version
```

---

# 📥 Clone Repository

```bash
git clone <YOUR_GITLAB_REPOSITORY_URL>

cd heritageai-smart-heritage-guide
```

---

# 🔐 Environment Configuration

## Frontend Environment

Create frontend environment file:

```bash
cp frontend/.env.example frontend/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Backend Environment

Create backend environment file:

```bash
cp backend/.env.example backend/.env
```

Optional AI configuration:

```env
GEMINI_API_KEY=your_api_key_here
```

If no API key is provided, the application continues with demo fallback functionality.

---

# ▶️ Running the Application

## Start Frontend

Install dependencies:

```bash
npm --prefix frontend install
```

Run development server:

```bash
npm --prefix frontend run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## Start Backend

Install dependencies:

```bash
npm --prefix backend install
```

Run backend:

```bash
npm --prefix backend run dev
```

Backend runs at:

```
http://127.0.0.1:4000
```

---

# 🔌 API Documentation

## Health Check

### Request

```
GET /health
```

### Response

```json
{
  "status": "ok"
}
```

---

## AI Chat Endpoint

### Request

```
POST /api/chat
```

Example:

```json
{
  "message": "Tell me about Charminar"
}
```

---

# 🧪 Testing & Quality Checks

Run tests:

```bash
npm run test:ci
```

Type checking:

```bash
npm run type-check
```

Production build:

```bash
npm run build
```

---

# 🌐 Deployment

## Production Deployment

The frontend application is deployed using Vercel.

Live Application:

https://smart-heritage-demo-t1gm.vercel.app/

The deployed version provides a public demonstration of the HeritageAI platform.

---

# 🚀 Future Enhancements

Planned improvements:

* Real-time AR monument guidance
* GPS-based heritage recommendations
* Offline heritage maps
* Advanced multilingual AI voice models
* Mobile application support
* Government heritage database integration
* Personalized AI travel assistant

---

# 🎯 Project Objective

The objective of HeritageAI is to combine artificial intelligence with cultural preservation by creating an accessible and interactive digital heritage platform.

The project focuses on making historical knowledge:

* More accessible
* More interactive
* Multilingual
* Visitor-friendly

---

# 👨‍💻 Project Information

**Project Name:**
HeritageAI - Smart Heritage Guide

**Category:**
Artificial Intelligence + Full Stack Web Application

**Application Type:**
AI-assisted Cultural Heritage Platform

---

# 📄 License

This project is developed for educational and demonstration purposes.

---

# 🙏 Acknowledgement

HeritageAI demonstrates how modern web technologies and artificial intelligence can support cultural heritage preservation, digital tourism, and improved visitor experiences.
