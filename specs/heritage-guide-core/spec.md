# Heritage Guide Core Specification

## User Story

As a heritage visitor, I want one guide app that helps me identify monuments, ask heritage questions, listen to guided context, and report site issues so that I can explore responsibly with less friction.

## Scope

- Monument recognition accepts an image upload and returns a supported Hyderabad heritage site when confidence is sufficient.
- Chatbot assistance answers practical and historical questions from the curated site data.
- Voice guide presents multilingual narration for supported sites.
- Issue reporting captures site maintenance or safety concerns for admin review.

## Acceptance Criteria

- Users can discover the covered monuments and view their core details.
- Users can upload an image and receive a recognition result with confidence and explanation.
- Users can ask a site-specific chatbot question and receive a relevant answer.
- Users can submit an issue report with category, description, and site context.
- The app keeps working with local fallback behavior when optional AI keys are not configured.

## Non-Functional Requirements

- API keys must stay in environment variables and never be committed.
- Quality gates must include linting, formatting checks, tests, coverage, dependency audit, and secret scanning.
- The project must remain licensed under AGPL-3.0-only.
