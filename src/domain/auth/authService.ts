import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from './user.model';
import crypto from 'crypto';
import { sendForgotPasswordEmail } from '../../infrastructure/email/emailService';

export class AuthService {
  /**
   * Handles the signup process by hashing the user's password and creating a new user in the database.
   *
   * This method first checks that the password is a string, then hashes the password using bcrypt
   * before storing the user in the database. If an error occurs during user creation,
   * it returns a message instead of throwing an error.
   *
   * @param email - The user's email address.
   * @param password - The user's plain-text password.
   * @returns An object with a status and message.
   */
  static async signup(email: string, password: string) {
    if (typeof password !== 'string') {
      return { status: 'error', message: 'Password must be a string' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = { email, password: hashedPassword };
      const user = await User.create(newUser);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return { status: 'success', message: 'User created successfully', user, token }; // Return success and created user
    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'User could not be created. Please try again.' };
    }
  }

  /**
   * Logs in a user by validating their email and password, and returns a JWT token.
   *
   * This method performs the following steps:
   * 1. Searches for a user in the database based on the provided email.
   * 2. Validates the provided password by comparing it with the hashed password stored in the database.
   * 3. If the credentials are valid, it generates a JWT token that expires in 1 hour.
   * 4. Sends appropriate HTTP responses based on the result:
   *    - 200: Login successful, returns a JWT token.
   *    - 401: Invalid password.
   *    - 404: User not found.
   *    - 500: Internal server error.
   *
   * @param email - The user's email address.
   * @param password - The user's plain-text password.
   * @returns An object with a status and message or the token.
   */
  static async login(email: string, password: string) {
    console.log(email);
    console.log(password);

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { status: 'error', message: 'User not found' };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { status: 'error', message: 'Invalid password' };
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return { status: 'success', message: 'Login successful', user, token };
    } catch (error) {
      return { status: 'error', message: 'An internal error occurred. Please try again later.' };
    }
  }

  static async forgotPassword(email: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    // Set token expiration (e.g., 1 hour from now)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour in milliseconds

    await user.save();

    await sendForgotPasswordEmail(user.email, resetToken);
  };

  // Other methods (signup, login, forgotPassword)...

  /**
   * Resets the password for a user, given a valid reset token and a new password.
   *
   * The method:
   * 1. Looks up a user by their reset token.
   * 2. Checks if the reset token is still valid (not expired).
   * 3. Hashes the new password and updates the user's password in the database.
   * 4. Clears the reset token and expiration fields after successful password reset.
   *
   * @param token - The password reset token sent to the user.
   * @param password - The new password provided by the user.
   * @returns An object with a status and message.
   */
  static async resetPassword(token: string, password: string) {
    try {
      // Find the user by the reset token and check if the token is still valid (not expired)
      console.log(token, password, Date.now());
      const user = await User.findOne({
        where: {
          resetPasswordToken: token,
        },
      });

      if (!user) {
        return { status: 'error', message: 'Invalid token' };
      }

      const currentTime = Date.now();
      if (user.resetPasswordExpires && user.resetPasswordExpires < currentTime) {
        // Token has expired
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
        return { status: 'error', message: 'Reset token has expired. Please request a new password reset.' };
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password and clear the reset token and expiration fields
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      // Save the updated user
      await user.save();

      return { status: 'success', message: 'Password reset successful. You can now log in with your new password.' };
    } catch (error) {
      console.error(error);
      return { status: 'error', message: 'An internal error occurred while resetting your password.' };
    }
  }
}