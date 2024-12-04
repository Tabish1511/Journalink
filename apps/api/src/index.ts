import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import messageRouter from './routes/message';

const app = express();

// Configure CORS
app.use(cors({
  origin: 'https://journalink-web.vercel.app', // Replace with your frontend's Vercel URL
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
}));

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);

const httpServer = app.listen(8080, () => {
  console.log('API server running on port 8080');
});

export { httpServer };

import './websocket';











// import express from 'express';
// import cors from 'cors';
// import userRouter from './routes/user';
// import messageRouter from './routes/message';

// // 1st TRY BUILD WORKFLOW - SECONDARY
// // 2nd TRY BUILD WORKFLOW - SECONDARY
// // 3rd TRY BUILD WORKFLOW - SECONDARY
// // 4th TRY BUILD WORKFLOW - SECONDARY

// // 5th TRY DEPLOY WORKFLOW - SECONDARY

// // 5th TRY DEPLOY WORKFLOW FINALLY TO EC2 - SECONDARY

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/v1/user', userRouter);
// app.use('/api/v1/message', messageRouter);

// const httpServer = app.listen(8080);

// export { httpServer };

// import './websocket';
