const db = require("../models/index");
const Order = db.Order;
const Item = db.Item;

//create an order
exports.createOrder=(req, res)=>{
    const requested_quantity = req.body.requested_quantity;
    Item.findOne({where:{ id:req.body.id}}).then((item)=>{
        if(requested_quantity <= item.available_quatity){
            Order.create({
                shopping_cart_id: req.body.shopping_cart_id,
                requested_quantity: requested_quantity,
                total_cost: req.body.total_cost,
                }).then((order)=>{
                    item.setOrder(order).then(() => {
                        res.send({
                          message: "Orders and Items were assigned successfully!",
                        });
                      }).catch(err => {console.log(err)})
                }).catch(err => {console.log(err)})
        }else{
            res.send({message:"There is no available item!"})
        }
    })     
}


//get a specific order
exports.getOrder=(req, res)=>{
    Order.findOne({id: req.params.id}).then((order) => {
        res.send(order);
    }).catch((error) => {res.send(error)})
}

//get all orders
exports.getOrders=(req, res)=>{
    Order.findAll({})
    .then((order) => {
      res.send(order);
    })
    .catch((err) => console.log(err));
}

//update a specific order
exports.updateOrder=(req, res)=>{
    const requested_quantity = req.body.requested_quantity;
    Item.findOne({where:{ id:req.body.id}}).then((item)=>{
        if(requested_quantity <= item.available_quatity){
            Order.update({
                shopping_cart_id: req.body.shopping_cart_id,
                requested_quantity: req.body.requested_quantity,
                total_cost: req.body.total_cost,
                },
                   {
                        where: {
                            id: req.params.id,
                          },
                    }
                ).then((order)=>{
                    res.send({
                        message: "Orders has been updated successfully!",
                      });
                }).catch(err => {console.log(err)})
        }else{
            res.send({message:"There is no available item!"})
        }
    })    
}

//delete a specific order
exports.removeOrder=(req, res)=>{
    Order.destroy({
        where: {
            id:req.params.id
        }
    }).then((data) => res.sendStatus(200))
    .catch((error) => console.log(error))
}