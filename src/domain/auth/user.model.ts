import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database/connect';

/**
 * User model representing the 'users' table in the database.
 *
 * This model defines the structure of the User entity, including the fields
 * 'id', 'email', and 'password', with appropriate data types and constraints.
 * It uses Sequelize to map the table and the corresponding attributes.
 *
 * Fields:
 * - id: Auto-incremented integer, primary key.
 * - email: Unique, non-null string to store the user's email address.
 * - password: Non-null string to store the hashed password.
 */

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
