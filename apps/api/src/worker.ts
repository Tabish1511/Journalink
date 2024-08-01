// import { PrismaClient } from '@prisma/client';
// import { client } from './websocket';

// const prisma = new PrismaClient();

// async function processMessage(message: string) {
//   try {
//     await prisma.message.create({
//       data: {
//         content: message,
//       },
//     });
//     console.log('Message saved to database');
//   } catch (error) {
//     console.error('Error saving message to database:', error);
//   }
// }

// async function startWorker() {
//   while (true) {
//     try {
//       const messageData = await client.brpop("messages", 0);
//       if (messageData && messageData[1]) {
//         await processMessage(messageData[1]);
//       }
//     } catch (error) {
//       console.error("Error processing message:", error);
//     }
//   }
// }

// startWorker();




















































// import Redis from 'ioredis';
// import { PrismaClient } from '@prisma/client';

// if (typeof process.env.EXTERNAL_REDIS_URL === 'undefined') {
//   throw new Error('Environment variable REDIS_URL is not set.');
// }

// const client = new Redis(process.env.EXTERNAL_REDIS_URL);    // Create a new Redis client (ADD TRY/CATCH)
// const prisma = new PrismaClient();
// client.on('error', (err) => console.error('Redis client error:', err));

// async function processMessage(message: string) {
//   try {
//     await prisma.message.create({
//       data: {
//         content: message,
//       },
//     });
//     console.log('Message saved to database');
//   } catch (error) {
//     console.error('Error saving message to database:', error);
//   }
// }

// async function startWorker() {
//   while (true) {
//     try {
//       const messageData = await client.brpop("messages", 0);
//       if (messageData && messageData[1]) {
//         await processMessage(messageData[1]);
//       }
//     } catch (error) {
//       console.error("Error processing message:", error);
//     }
//   }
// }

// startWorker();


























































































// import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';

const client = createClient({
  url: process.env.EXTERNAL_REDIS_URL
});

// const prisma = new PrismaClient();
client.on('error', (err) => console.error('Redis client error:', err));

async function processMessage(message: string) {
  try {
    // await prisma.message.create({
    //   data: {
    //     content: message,
    //   },
    // });
    console.log('Message saved to database');
  } catch (error) {
    console.error('Error saving message to database:', error);
  }
}

async function startWorker() {
  
  try{
    await client.connect();
    console.log('Connected to Redis from worker');

    while (true) {
      try {
        const messageData = await client.brPop("messages", 0);
        //@ts-ignore
        if (messageData && messageData[1]) {
          //@ts-ignore
          await processMessage(messageData[1]);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    }
  }catch(e){
    console.error('Error connecting to Redis:', e);
  }
}

startWorker();