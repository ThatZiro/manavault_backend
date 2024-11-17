import express from 'express';
import authRoutes from './interfaces/routes/authRoutes';
import protectedRoutes from "./interfaces/routes/protectedRoutes";
import cardRoutes from "./interfaces/routes/cardRoutes";
import cors from "cors"

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://mana-vault.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/protected-route', protectedRoutes)
app.use('/api/cards', cardRoutes)

export default app;