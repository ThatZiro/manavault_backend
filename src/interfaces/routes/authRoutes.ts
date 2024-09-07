import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();

/**
 * Authentication routes.
 *
 * This router defines routes for user signup and login,
 * and delegates the corresponding logic to the AuthController methods.
 *
 * POST /signup - Route to handle user signup.
 * POST /login - Route to handle user login.
 */

// Route for user /api/auth/signup
router.post('/signup', AuthController.signup);
// Route for user /api/auth/login
router.post('/login', AuthController.login);

export default router;