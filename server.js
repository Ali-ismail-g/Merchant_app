const express = require("express")
const app = express()
const port = process.env.PORT || 5000;
const mysql = require("mysql2");
const db = require("./models/index");
const itemRouter = require("./routes/item");
const orderRouter = require("./routes/order");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors()); 
app.use(bodyParser.json());

db.sequelize.sync();
let dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "merchantdb",
});

//items routes
app.use("/item", itemRouter);

//order routes
app.use("/order", orderRouter);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });

  module.exports = app;