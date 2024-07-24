import { WebSocketServer } from 'ws';
import { httpServer } from './index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const wss = new WebSocketServer({ server: httpServer, path: '/api/v1/chatWs' });

wss.on('connection', function connection(ws) {
  ws.on('message', async function message(data, isBinary) {

    try {
      await prisma.message.create({
        data: {
          content: data.toString(),
        },
      });
      console.log('Message saved to database');
    } catch (error) {
      console.error('Error saving message to database:', error);
    }



    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

export { wss };
