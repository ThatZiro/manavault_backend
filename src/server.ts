import app from './app';
import sequelize from "./infrastructure/database/connect";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";


let server;
if (process.env.NODE_ENV === 'production') {
  // Read Let's Encrypt SSL certificate files
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/api.mana-vault.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api.mana-vault.com/fullchain.pem')
  };
  server = https.createServer(httpsOptions, app);
} else {
  server = http.createServer(app);
}

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');

  // Start the HTTP or HTTPS server
  server.listen(8080, '0.0.0.0', () => {
    console.log('Server is running on port 8080');
  });
});