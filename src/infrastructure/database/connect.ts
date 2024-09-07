import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database connection setup using Sequelize.
 *
 * This code initializes a Sequelize instance to connect to a PostgreSQL database using credentials
 * and connection details from environment variables. It attempts to authenticate the connection and
 * logs success or error messages.
 *
 * Environment variables required:
 * - DB_NAME: The name of the database.
 * - DB_USER: The database user.
 * - DB_PASSWORD: The user's password.
 * - DB_HOST: The host address of the database.
 */

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: 'postgres',
    logging: false,
  }
);

// Authenticate and establish connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err: any) => console.error('Error connecting to the database:', err));

export default sequelize;