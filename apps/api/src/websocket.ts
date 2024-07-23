import { WebSocketServer } from 'ws';
import { httpServer } from './index';

const wss = new WebSocketServer({ server: httpServer, path: '/api/v1/chatWs' });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

export { wss };
