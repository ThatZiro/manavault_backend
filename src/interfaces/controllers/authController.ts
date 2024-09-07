import { Request, Response } from 'express';
import { AuthService } from '../../domain/auth/authService';

// Controller class for handling authentication-related routes
export class AuthController {
  /**
   * Handles the signup process for a new user.
   *
   * This method extracts email and password from the request body,
   * passes them to the AuthService for user creation, and returns
   * a response with the newly created user if successful.
   * In case of an error, it returns a 400 status code with the error message.
   *
   * @param req - Express request object, containing the email and password in the body.
   * @param res - Express response object.
   */
  static async signup(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await AuthService.signup(email, password);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  /**
   * Handles the login process for an existing user.
   *
   * This method extracts email and password from the request body,
   * passes them to the AuthService to validate and generate a token,
   * and returns a response with the token if successful.
   * In case of an error, it returns a 401 status code with the error message.
   *
   * @param req - Express request object, containing the email and password in the body.
   * @param res - Express response object.
   */
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(401).json({ message: 'An unknown error occurred' });
      }
    }
  }
}
