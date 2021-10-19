
// viewing dishes menu from restaurant page
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    const orderstatus = req.body.orderstatus; 
    const customerid = req.body.customerid;
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log(orderstatus)
    let orderSearchSql = "SELECT * FROM orders where orderstatus = "+mysql.escape(orderstatus)
    +" AND customerid = "+mysql.escape(customerid);
	
     console.log(orderSearchSql);
    let query = connection.query(orderSearchSql, (error, result) => {
	
    if (error) {
            console.log(error.message)
                // res.send({ error: error });
        }
		console.log(JSON.stringify(result));	
		res.end(JSON.stringify(result));
	});
   
    
});
module.exports = router;