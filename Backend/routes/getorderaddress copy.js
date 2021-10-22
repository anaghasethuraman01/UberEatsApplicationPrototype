//register page for customer and restuarant
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post("/", (req, res) => {
    const customerid = req.body.customerid;
    const restaurantid = req.body.restaurantid;
    //console.log(req.body);
    let sql = "SELECT address,city,state,country FROM userdetails where userid = "+mysql.escape(customerid) +
    " UNION SELECT address,city,state,country FROM orders where customerid = "+mysql.escape(customerid);
    console.log(sql);
    connection.query(sql,(error, result) => {
         console.log(result)
         if(result.length == 0 ){
             console.log("No address");
         }else{
            //  const address = result['city'];
            //  console.log(address)
            res.send(JSON.stringify(result));
        }
     });
 
});
module.exports = router;