"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mieayam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mieayam.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "mieayam",
    }
  );
  return mieayam;
};
