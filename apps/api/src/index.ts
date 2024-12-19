import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import messageRouter from './routes/message';

const app = express();

// Configure CORS
const allowedOrigins = [
  'https://journalink-web-tabish1511s-projects.vercel.app',
  'https://journalink-web.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    console.log(`Request Origin: ${origin}`);
    if (!origin || allowedOrigins.includes(origin)) {
      console.log(`CORS allowed for origin: ${origin}`);
      callback(null, true);
    } else {
      console.error(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Middleware to parse JSON bodies
app.use(express.json());

// Preflight request handling
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // No content for preflight
});

// Setup routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);

// Start server
const httpServer = app.listen(8080, () => {
  console.log('API server running on port 8080');
});

// WebSocket import
import './websocket';

export { httpServer };
