import app from './app';
import sequelize from "./infrastructure/database/connect";
import * as fs from "fs";
import * as https from "https";
import * as path from "path";

// Read SSL certificate files (self-signed or Let's Encrypt)
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '../selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, '../selfsigned.crt'))
};

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');

  // Create HTTPS server
  https.createServer(httpsOptions, app).listen(443, () => {
    console.log(`HTTPS server is running on port 443`);
  });
});