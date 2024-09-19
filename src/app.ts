import express from 'express';
import authRoutes from './interfaces/routes/authRoutes';
import protectedRoutes from "./interfaces/routes/protectedRoutes";
import cors from "cors"

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/protected-route', protectedRoutes)

export default app;