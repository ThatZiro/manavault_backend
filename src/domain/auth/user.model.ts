import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database/connect';

/**
 * User model representing the 'users' table in the database.
 *
 * This model defines the structure of the User entity, including the fields
 * 'id', 'email', 'password', 'resetPasswordToken', and 'resetPasswordExpires',
 * with appropriate data types and constraints.
 *
 * Fields:
 * - id: Auto-incremented integer, primary key.
 * - email: Unique, non-null string to store the user's email address.
 * - password: Non-null string to store the hashed password.
 * - resetPasswordToken: Optional string to store the password reset token.
 * - resetPasswordExpires: Optional date to store the expiration time of the reset token.
 */

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public resetPasswordToken?: string | null;
  public resetPasswordExpires?: number | null;
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
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
