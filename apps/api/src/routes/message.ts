import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const messageRouter = Router();
const prisma = new PrismaClient();

messageRouter.get('/test', (req, res) => {
  res.send('Hello, messageRoute!');
});

messageRouter.get('/messages', async (req, res) => {
  try {
    // Fetch all messages (no authentication needed)
    const messages = await prisma.message.findMany();

    console.log("Messages fetched successfully");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).send("Failed to fetch messages");
  }
});

export default messageRouter;
