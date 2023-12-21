import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/AuthRoutes.js';
import sauceRoutes from './routes/SauceRoutes.js';
import helmet from 'helmet';
import path from 'path';
import authMiddleware from "./middleware/authMiddleware.js";
import "./config/dbConfig.js";
dotenv.config();

// Es6 Modules for the __dirname method
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { errorHandler } from "./middleware/errorHandler.js";
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname( __filename);

const app = express();

// Middlewares
app.use(helmet({ crossOriginResourcePolicy: false}));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use(authMiddleware);
app.use('/api/sauces', sauceRoutes);

// Handling errors function
app.use(errorHandler);

export default app;