"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reactions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
      },
      articleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "articles",
          key: "id",
        },
        onDelete: "cascade",
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("reactions");
  },
};
