# API Documentation

## Frontend Next API Adapters

These routes are available when the Next.js frontend is running.

### `POST /api/chat`

Request:

```json
{
  "message": "What is the entry fee for Charminar?"
}
```

Response:

```json
{
  "reply": "Charminar entry fee: Rs. 25 (Indian), Rs. 300 (Foreign)."
}
```

### `POST /api/recognize`

Multipart form request:

- `image`: image file under 8 MB

Response:

```json
{
  "recognized": true,
  "siteId": "site_1",
  "name": "Charminar",
  "confidence": "85%"
}
```

## Standalone Backend

Run from `backend/`.

### `GET /health`

Response:

```json
{
  "status": "ok",
  "service": "heritageai-backend"
}
```

### `POST /api/chat`

Request and response match the frontend chat API shape.
