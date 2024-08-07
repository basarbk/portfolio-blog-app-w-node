import { Model, DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import Reaction from "../reactions/Reaction.js";

class Article extends Model {}

Article.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    published_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    updatedAt: "updated_at",
    createdAt: "created_at",
  },
);

Article.hasMany(Reaction, { onDelete: "cascade", foreignKey: "articleId" });

export default Article;
