import { WebSocketServer } from 'ws';
import { httpServer } from './index';
import { createClient } from 'redis';

const client = createClient({
  url: process.env.EXTERNAL_REDIS_URL,
});

client.on('error', (err) => console.error('Redis client error:', err));

const wss = new WebSocketServer({ server: httpServer, path: '/api/v1/chatWs' });

wss.on('connection', function connection(ws) {
  ws.on('message', async function message(data, isBinary) {

    try{
      client.lPush('newMessages', data.toString());   // << One way to make the delivery faster
      console.log('Message saved to Redis');
    }catch(e){
      console.error('Error saving message to redis:', e);
    }

    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

async function startServer(){
  try{
    await client.connect();
    console.log('Connected to Redis from websocket server');
  }catch(e){
    console.log('Error connecting to Redis:', e);
  }
}

startServer();

export { wss };





















































































// import { WebSocketServer } from 'ws';
// import { httpServer } from './index';
// import Redis from 'ioredis';

// if (typeof process.env.EXTERNAL_REDIS_URL === 'undefined') {
//   throw new Error('Environment variable REDIS_URL is not set.');
// }
// const client = new Redis(process.env.EXTERNAL_REDIS_URL);

// const wss = new WebSocketServer({ server: httpServer, path: '/api/v1/chatWs' });

// wss.on('connection', function connection(ws) {
//   ws.on('message', async function message(data, isBinary) {

//     try{
//       client.set('messages', data.toString());   // << One way to make the delivery faster
//       console.log('Message saved to Redis');
//     }catch(e){
//       console.error('Error saving message to redis:', e);
//     }

//     wss.clients.forEach(function each(client) {
//       if (client.readyState === 1) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
// });

// export { wss, client };
// // export { wss };






































// import { WebSocketServer } from 'ws';
// import { httpServer } from './index';
// // import { PrismaClient } from '@prisma/client';
// import Redis from 'ioredis';

// if (typeof process.env.REDIS_URL === 'undefined') {
//   throw new Error('Environment variable REDIS_URL is not set.');
// }

// const client = new Redis(process.env.REDIS_URL);


// client.on('error', (err) => console.error('Redis client error:', err));


// // const prisma = new PrismaClient();

// const wss = new WebSocketServer({ server: httpServer, path: '/api/v1/chatWs' });

// wss.on('connection', function connection(ws) {
//   ws.on('message', async function message(data, isBinary) {

//     try{
//       await client.lpush('messages', data.toString());
//     }catch(e){
//       console.error('Error saving message to redis:', e);
//     }

//     // try {
//     //   await prisma.message.create({
//     //     data: {
//     //       content: data.toString(),
//     //     },
//     //   });
//     //   console.log('Message saved to database');
//     // } catch (error) {
//     //   console.error('Error saving message to database:', error);
//     // }



//     wss.clients.forEach(function each(client) {
//       if (client.readyState === 1) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
// });








// async function startServer(){
//   try{
//     await client.connect();
//     console.log('Connected to Redis'); 
//   }catch(e){
//     console.error('Error connecting to Redis:', e);
//   }
// }

// startServer();


// export { wss };