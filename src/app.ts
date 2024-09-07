import express from 'express';
import authRoutes from './interfaces/routes/authRoutes';
import protectedRoutes from "./interfaces/routes/protectedRoutes";

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/protected-route', protectedRoutes)

export default app;