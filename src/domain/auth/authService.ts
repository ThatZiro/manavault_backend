import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.model';

export class AuthService {
  /**
   * Handles the signup process by hashing the user's password and creating a new user in the database.
   *
   * The method first checks that the password is a string, then hashes the password using bcrypt
   * before storing the user in the database. If an error occurs during user creation,
   * it throws the error.
   *
   * @param email - The user's email address.
   * @param password - The user's plain-text password.
   * @returns The newly created user.
   * @throws An error if the user could not be created.
   */
  static async signup(email: string, password: string) {
    if (typeof password !== 'string') {
      throw new Error('Password must be a string');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password : hashedPassword,
    }

    try {
      const user = await User.create(newUser);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Handles the login process by validating the user's credentials and returning a JWT token.
   *
   * The method checks if a user exists with the given email and compares the hashed password.
   * If the credentials are valid, it generates a JWT token that expires in 1 hour.
   *
   * @param email - The user's email address.
   * @param password - The user's plain-text password for validation.
   * @returns A JWT token if the login is successful.
   * @throws An error if the credentials are invalid.
   */
  static async login(email: string, password: string) {
    const user = await User.findOne({where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return token;
  }
}