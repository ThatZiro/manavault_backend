import app from './app';
import sequelize from "./infrastructure/database/connect";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});