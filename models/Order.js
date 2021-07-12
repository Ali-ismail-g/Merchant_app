const { Sequelize } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Order", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shopping_cart_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    requested_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    total_cost: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  });
  return Order;
};
