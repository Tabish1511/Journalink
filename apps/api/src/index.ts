import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import messageRouter from './routes/message';

// CHECK IF ALL DOCKER BUILDS RUNNING OKAY
// CHECK IF ALL DOCKER BUILDS RUNNING OKAY

const app = express();

// Configure CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://journalink-web.vercel.app', 'http://localhost:3000'];
    // Allow requests without an origin (like tools or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
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
