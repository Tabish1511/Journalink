import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import messageRouter from './routes/message';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);

const httpServer = app.listen(8080);

export { httpServer };

import './websocket';
