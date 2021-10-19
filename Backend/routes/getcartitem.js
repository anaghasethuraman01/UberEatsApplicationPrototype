//register page for customer and restuarant
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post("/", (req, res) => {
    const customerid = req.body.customerid;
    const restaurantid = req.body.restaurantid;
    console.log(req.body);
    let sql = "SELECT * FROM placeorder where customerid = "+mysql.escape(customerid);
    console.log(sql);
    connection.query(sql,(error, result) => {
//console.log(result)
         if(result.length == 0 ){
             console.log("Cart is empty");
         }else{
            res.end(JSON.stringify(result));
        }
     });
    // restaurantid = req.body.restaurantid;
    // dishid = req.body.dishid;
    // dishname = req.body.dishname;
    // dishprice =req.body.dishprice;
    // let cartvalues = {
    //     customerid: customerid,
    //     restaurantid:restaurantid,
    //     dishid:dishid,
    //     dishname:dishname,
    //     dishprice:dishprice
    // };
    // console.log(cartvalues);
	//  let sql = "SELECT * FROM placeorder WHERE restaurantid != " +mysql.escape(restaurantid);
	//  connection.query(sql,(error, result) => {
    //      if(result.length > 0 ){
    //          console.log("Cant place order");
    //      }else{
    //          sql1 = "INSERT INTO placeorder  SET ?";
    //          connection.query(sql1,cartvalues,(error, result) => {
    //              console.log("Values added to Cart");
    //          });
    //      }
    //  });
});
module.exports = router;