import express from 'express'
import cors from 'cors';
import userRouter from './routes/user';
import messageRouter from './routes/message';
import { WebSocketServer } from 'ws'

const app = express()
app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);
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
