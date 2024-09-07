import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Protected route that requires JWT authentication.
 *
 * This route uses the authMiddleware to verify the user's JWT token.
 * If the token is valid, the user gains access to the route and
 * the server responds with a success message and user information.
 *
 * GET /login-token - Protected route requiring authentication.
 */

// Route for user /api/protected-route/login-token
router.get('/login-token', authMiddleware, (req, res) => {
  const user = (req as any).user;
  res.json({ message: 'You have access to this protected route!', user });
});

export default router;