const express = require("express");
const app = express();
const router = express.Router();
const itemController = require("../controller/item");

//create new item
router.post("/create", itemController.createItem);

//get all item
router.get("",itemController.getAllItems);

//update an item
router.put("/update/:id",itemController.updateItem);

//get an item
router.get("/:id",itemController.getAnItem);

//remove an item
router.delete("/remove/:id",itemController.deleteAnItem)



module.exports = router;