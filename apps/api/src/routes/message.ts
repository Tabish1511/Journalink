import { Router } from 'express';
const messageRouter = Router();
import { wss } from '../websocket'; // Import the WebSocket server if needed

messageRouter.get('/test', (req, res) => {
  res.send('Hello, messageRoute!');
});

export default messageRouter;
