import app from './app';
import sequelize from "./infrastructure/database/connect";
import * as fs from "fs";
import * as https from "https";

// Read Let's Encrypt SSL certificate files
const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.mana-vault.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.mana-vault.com/fullchain.pem')
};

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');

  // Create HTTPS server
  https.createServer(httpsOptions, app).listen(8080, '0.0.0.0', () => {
    console.log('HTTPS server is running on port 8080');
  });
});
