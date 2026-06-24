import { createServer } from 'node:http';
import { appConfig } from './config/app.js';
import { routeChat } from './routes/chatRoutes.js';
import { readJsonBody, sendJson } from './utils/http.js';

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

  if (url.pathname === '/health') {
    sendJson(res, 200, { status: 'ok', service: 'heritageai-backend' });
    return;
  }

  try {
    const body = await readJsonBody(req);
    if (url.pathname === '/api/chat' && (await routeChat(req, res, body))) {
      return;
    }
  } catch {
    sendJson(res, 400, { error: 'Invalid JSON request body.' });
    return;
  }

  sendJson(res, 404, {
    error: 'Not found',
    availableRoutes: ['GET /health', 'POST /api/chat'],
  });
});

server.listen(appConfig.port, appConfig.host, () => {
  console.log(
    `HeritageAI backend running at http://${appConfig.host}:${appConfig.port}`
  );
});
