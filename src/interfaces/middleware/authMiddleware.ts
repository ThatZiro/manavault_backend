import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate users by verifying their JWT token.
 *
 * This middleware extracts the JWT token from the 'Authorization' header,
 * verifies it using the secret key, and attaches the decoded token to the request object
 * if valid. If the token is missing or invalid, it returns an appropriate response.
 *
 * @param req - Express request object, expected to contain the JWT token in the Authorization header.
 * @param res - Express response object.
 * @param next - Express next function, used to pass control to the next middleware.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Extract the token

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Explicitly tell TypeScript that `req.user` is of type `string | JwtPayload`
    (req as any).user = decoded;

    next();  // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};