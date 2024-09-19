import app from './app';
import sequelize from "./infrastructure/database/connect";
import * as fs from "fs";
import * as https from "https";

const PORT = process.env.PORT || 3000;

// Read SSL certificate files (self-signed or Let's Encrypt)
const httpsOptions = {
  key: fs.readFileSync('../selfsigned.key'),
  cert: fs.readFileSync('../selfsigned.crt')
};

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');

  // Create HTTPS server
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`HTTPS server is running on port ${PORT}`);
  });
});