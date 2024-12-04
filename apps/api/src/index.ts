import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import messageRouter from './routes/message';

// 1st TRY BUILD WORKFLOW - SECONDARY
// 2nd TRY BUILD WORKFLOW - SECONDARY
// 3rd TRY BUILD WORKFLOW - SECONDARY
// 4th TRY BUILD WORKFLOW - SECONDARY

// 5th TRY DEPLOY WORKFLOW - SECONDARY

// 5th TRY DEPLOY WORKFLOW FINALLY TO EC2 - SECONDARY

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);

const httpServer = app.listen(8080);

export { httpServer };

import './websocket';
