"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("minumans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama: {
        type: DataTypes.STRING,
      },
      harga: {
        type: DataTypes.INTEGER,
      },
      qty: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("minumans");
  },
};
