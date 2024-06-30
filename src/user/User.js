import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";
import Token from "../auth/Token.js";
import Article from "../articles/Article.js";

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    registrationToken: {
      type: DataTypes.STRING,
    },
    loginToken: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
);

User.hasMany(Token, { onDelete: "cascade", foreignKey: "userId" });
User.hasMany(Article, { onDelete: "cascade", foreignKey: "userId" });

Token.belongsTo(User);
export default User;
