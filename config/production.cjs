module.exports = {
  database: {
    database: "my-app",
    username: "admin",
    password: "password",
    dialect: "sqlite",
    storage: "./app-prod-db.sqlite",
    logging: false,
  },
  email: {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "cecile.skiles@ethereal.email",
      pass: "1D4XAbTk1xyKUWsath",
    },
  },
  client: {
    host: "http://localhost:5173",
  },
  uploadDir: "upload-prod",
};
