const Sequelize = require("sequelize");
const sequelize = require("./database");
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; 

db.Order = require("./Order")(sequelize, Sequelize);
db.Item = require("./Item")(sequelize, Sequelize);

//relation between Order and Item is one to many as requested 
db.Item.hasOne(db.Order);
db.Order.belongsTo(db.Item);
module.exports = db;