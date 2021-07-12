const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const mysql = require("mysql2");
const db = require("../models/index");
const app = require("../server");
const { should, assert } = chai;
chai.use(chaiHttp);
const Order = db.Order;
const Item = db.Item;

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "password",
    database: "merchantdb",
    debug: false,
  });

  describe("testing merchant app", function () {
    it("testing Db connection should be successful ...", function (done) {
      pool.getConnection(function (err, result) {
        if (err) {
          done(err);
          return;
        }
        done();
      });
    });
    let itemId = 17
    before((done) => {
        pool.getConnection(function (err, connection) {
          return err;
        });
        done();
      });
      after((done) => {
        // User.remove().exec(), done();
        pool.end();
        done();
      });
    it("should create an item", (done) => {
        chai
          .request(app)
          .post("/item/create")
          .send({
            id : itemId,  
            Item_name: "smartTV",
            cost: 50000,
            available_quatity: 25
          })
          .type("json")
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.have.property("body");
            done();
          });
      })
    it("should get a specific item",(done)=>{
        chai
      .request(app)
      .get("/item/:id")
      .set("id", itemId)
      .end((err, res) => {  
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.have.property("body");
        done();
      });
    })
    it("should get all items",(done)=>{
        chai
        .request(app)
        .get("/item/")
        .end((err, res) => {  
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");
          done();
        });
    })
    it("should update an item",(done)=>{
        const item = Item.create({
            id:140,
            Item_name: "MacbookAir",
            cost: 60000,
            available_quatity: 60,
          });
        
        let newData = {id:item.id, Item_name: "Iphone", cost: 20000, available_quatity: 40 };
         chai
        .request(app)
        .put("/item/update/"+ item.id)
        .send(newData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
           done();
        });
    }).timeout(5000);
    it("should delete an item",(done)=>{
        const item = Item.create({
            id : 120,
            Item_name: "smartPhone",
            cost: 22000,
            available_quatity: 25,
          });
           chai
            .request(app)
            .delete("/item/remove/" + item.id)
            .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done()
    })
  }).timeout(5000)
  // it("should create a new Order",(done) => {
  //   const item = Item.create({
  //       id : 120,
  //       Item_name: "smartPhone",
  //       cost: 22000,
  //       available_quatity: 25,
  //     });
  //      chai
  //         .request(app)
  //         .post("/order/create")
  //         .send({  
  //           shopping_cart_id: 10,
  //           requested_quantity: 4,
  //           total_cost: 25000,
  //           // ItemId: item.id
  //         })
  //         .type("json")
  //         .end(function (err, res) {
  //           console.log(res)  
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(200);
  //           expect(res).to.have.property("body");
  //           done();
  //         });
  // }).timeout(5000)
  it("should return all orders",(done)=>{
    chai
        .request(app)
        .get("/order/")
        .end((err, res) => {  
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");
          done();
        });
  })
  it("should return specific order",(done)=>{
    const order = Order.create({
            id:120,
            shopping_cart_id: 10,
            requested_quantity: 4,
            total_cost: 25000,
    })
    chai
    .request(app)
    .get("/item/:id"+ order.id)
    .end((err, res) => {  
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.have.property("body");
      done();
    });
  })
  it("should delete specific order",(done)=>{
    const order = Order.create({
      id:120,
      shopping_cart_id: 10,
      requested_quantity: 4,
      total_cost: 25000,
      })
      chai
        .request(app)
        .delete("/order/remove/" + order.id)
        .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done()
          })
  })
})

