import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";
class Reaction extends Model {}

Reaction.init(
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
);

export default Reaction;
