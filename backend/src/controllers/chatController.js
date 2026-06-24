import { createChatReply } from '../services/chatService.js';

export async function handleChatRequest(req, res, body) {
  try {
    const reply = createChatReply(body?.message);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ reply }));
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        reply:
          'Sorry, I am having trouble connecting to my historical database right now. Please try again.',
      })
    );
  }
}
