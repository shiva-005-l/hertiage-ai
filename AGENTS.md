# Agent Architecture

This document describes the AI agents and autonomous systems used in the Smart Heritage platform.

## Overview

The project utilizes specialized AI agents to provide an immersive and interactive heritage experience.

### 1. Chatbot Agent (Historical Expert)

- **Role**: Act as a knowledgeable historian and tour guide.
- **Capabilities**: Answering questions, providing context, and sharing interesting anecdotes about heritage sites.
- **Tech**: LLM-powered with specialized system prompts for historical accuracy and cultural sensitivity.

### 2. Vision Agent (Monument Recognition)

- **Role**: Identify heritage sites from user-uploaded images.
- **Capabilities**: Landmark detection, era identification, and basic condition assessment.
- **Tech**: Computer Vision models trained on architectural styles and historical monument datasets.

### 3. Voice Guide Agent (Multilingual Narrator)

- **Role**: Provide immersive audio tours.
- **Capabilities**: Text-to-speech generation in multiple local and international languages with natural intonation.
- **Tech**: Advanced TTS engines with regional accent support.

## Configuration

Agent behaviors and prompts can be configured via environment variables. Ensure the necessary API keys are provided in your `.env` file:

- `OPENAI_API_KEY`: For LLM-based interactions.
- `GOOGLE_VISION_API_KEY`: For image recognition features.

## Interaction Flow

1. User interacts via the UI (Text, Voice, or Image).
2. The Request Router identifies the appropriate agent.
3. The Agent processes the request and generates a context-aware response.
4. The response is delivered to the user, potentially through multiple modalities.
