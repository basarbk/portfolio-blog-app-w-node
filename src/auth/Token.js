import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class Token extends Model {}

Token.init(
  {
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
);

export default Token;
