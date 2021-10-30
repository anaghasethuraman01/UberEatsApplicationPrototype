//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth, function(req,res){
    
    const orderid = req.body.orderid;  
    const ordertype = req.body.ordertype;
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    let sql1 = null;
    console.log(ordertype);  
    if (ordertype == "Picked up" || ordertype == "Delivered" ){
        sql1 = "UPDATE orders SET orderstatus = " + mysql.escape(ordertype)
        +" , ordermodetype = 'Delivered Order' "
        + " WHERE orderid = " +mysql.escape(orderid);
    }
    else {
            sql1 = "UPDATE orders SET orderstatus = " + mysql.escape(ordertype)
             + " WHERE orderid = " +mysql.escape(orderid);
    }
    
    let query = connection.query(sql1, (error, result) => {
    if (error) {
        console.log(error.message)
                // res.send({ error: error });
        }
		console.log("Order status updated");
	});
   
    
});
module.exports = router;