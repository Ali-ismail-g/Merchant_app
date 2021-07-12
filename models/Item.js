const { Sequelize } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("Item", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Item_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cost: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    available_quatity: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  });
  return Item;
};