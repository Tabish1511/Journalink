import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });




wss.on('connection', function connection(ws) {
  
  ws.on('message', function message(data, isBinary) {

    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
