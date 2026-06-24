import { handleChatRequest } from '../controllers/chatController.js';

export async function routeChat(req, res, body) {
  if (req.method === 'POST') {
    await handleChatRequest(req, res, body);
    return true;
  }

  return false;
}
