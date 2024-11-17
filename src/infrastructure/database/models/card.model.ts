import { DataTypes, Model } from 'sequelize';
import sequelize from '../connect'; // Adjust the path if needed

// Define Card Model
class Card extends Model {
  public id!: string;
  public name!: string;
  public type!: string | null;
  public oracle_text!: string | null;
  public mana_cost!: string | null;
  public power!: string | null;
  public toughness!: string | null;
  public colors!: string[] | null; // Stored as JSONB
  public rarity!: string | null;
}

Card.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    oracle_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mana_cost: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    power: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    toughness: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    colors: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Card',
    tableName: 'cards', // Ensure this matches your database table name
    timestamps: false, // Change to true if you use `createdAt` and `updatedAt`
  }
);

export default Card;
