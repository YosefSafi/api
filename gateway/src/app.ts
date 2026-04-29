import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware } from './middleware/auth';

dotenv.config();

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Health Check (Gateway Internal)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', service: 'API Gateway' });
});

// Services URLs
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5000';
const DECISION_SERVICE_URL = process.env.DECISION_SERVICE_URL || 'http://localhost:3002';

// Auth Proxy (Public)
app.use('/auth', createProxyMiddleware({ 
  target: USER_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: { '^/auth': '/auth' } 
}));

// User Service Proxy (Protected)
app.use('/user', authMiddleware, createProxyMiddleware({ 
  target: USER_SERVICE_URL, 
  changeOrigin: true 
}));

// Decision Engine Proxy (Protected)
app.use('/decision', authMiddleware, createProxyMiddleware({ 
  target: DECISION_SERVICE_URL, 
  changeOrigin: true 
}));

// AI Service Proxy (Protected)
app.use('/ai', authMiddleware, createProxyMiddleware({ 
  target: AI_SERVICE_URL, 
  changeOrigin: true 
}));

export default app;
