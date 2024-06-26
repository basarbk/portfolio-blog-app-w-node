import { Sequelize } from "sequelize";

const sequelize = new Sequelize("my-app", "admin", "password", {
  dialect: "sqlite",
  storage: "./app-dev-db.sqlite",
  logging: false,
});

export default sequelize;
