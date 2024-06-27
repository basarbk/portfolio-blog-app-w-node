import { Sequelize } from "sequelize";
import config from "config";

const databaseConfig = config.get("database");

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    dialect: databaseConfig.dialect,
    storage: databaseConfig.storage,
    logging: databaseConfig.logging,
  },
);

export default sequelize;
