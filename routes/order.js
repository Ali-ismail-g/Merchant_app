const express = require("express");
const app = express();
const router = express.Router();
const orderController = require("../controller/order");

//create new item
router.post("/create", orderController.createOrder);

//get all item
router.get("",orderController.getOrders);

//update an item
router.put("/update/:id",orderController.updateOrder);

//get an item
router.get("/:id",orderController.getOrder);

//remove an item
router.delete("/remove/:id",orderController.removeOrder)



module.exports = router;