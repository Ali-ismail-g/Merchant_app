const db = require("../models/index");
const Item = db.Item;

//create a new item 
exports.createItem = (req,res) => {
    Item.create({
        Item_name: req.body.Item_name,
        cost: req.body.cost,
        available_quatity: req.body.available_quatity,
      })
        .then((item) => {
          res.send(item);
        })
        .catch((error) => {
          console.log(error);
        });
}

//get specific item by id
exports.getAnItem = (req,res) => {
    Item.findOne({id: req.params.id}).then((item) => {
        res.send(item);
    }).catch((error) => {res.send(error)})
}

//get all created items
exports.getAllItems = (req,res) => {
    Item.findAll({})
    .then((item) => {
      res.send(item);
    })
    .catch((err) => console.log(err));
}

//update an item
exports.updateItem = (req,res)=>{
    Item.update(
        {
            Item_name: req.body.Item_name,
            cost: req.body.cost,
            available_quatity: req.body.available_quatity,
        },
        {
            where: {
                id: req.params.id,
              },
        }
      )
        .then((data) => res.sendStatus(200))
        .catch((error) => console.log(error))
}

//delete specific item by id
exports.deleteAnItem = (req,res) => {
    Item.destroy({
        where: {
            id:req.params.id
        }
    }).then((data) => res.sendStatus(200))
    .catch((error) => console.log(error))
}