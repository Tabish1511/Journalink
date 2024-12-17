import { Router } from 'express';
import cookieParser from 'cookie-parser';
import jwt, { JwtPayload } from 'jsonwebtoken';
const messageRouter = Router();
import { wss } from '../websocket'; // Import the WebSocket server if needed
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

messageRouter.get('/test', (req, res) => {
  res.send('Hello, messageRoute!');
});

messageRouter.get('/messages', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Cookie token is missing" });
    return;
  }

  if (!JWT_SECRET) {
    res.status(500).json({
      message: "JWT secret is not defined"
    });
    return;
  }
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  const userId = decoded.id;
  
  try {
    const messages = await prisma.message.findMany({
      where: {
        userId: userId,
      }
    });

    console.log("Messages for specific user ran successfully");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).send("Failed to fetch messages");
  }
});

export default messageRouter;
