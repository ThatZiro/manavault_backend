module.exports = {
  apps: [
    {
      name: "manavault-dev",
      script: "./src/server.ts",
      interpreter: "ts-node",
      env: {
        NODE_ENV: "development",
        PORT: "3000"
      },
    },
    {
      name: "manavault-prod",
      script: "./dist/server.js",
      env: {
        NODE_ENV: "production",
        PORT: "8080"
      },
    },
  ],
};
