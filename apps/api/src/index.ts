import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });




wss.on('connection', function connection(ws) {
  
  ws.on('message', function message(data, isBinary) {

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});




























// import express from "express";

// const app = express()

// app.get("/", (req, res) => {
//     res.json({
//         message: "hello world"
//     });
// })

// app.listen(8080, () => {
//     console.log("Listening on port 8080");
// })