//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    //console.log("Inside Orders");  
    const customerid = req.body.customerid;  
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
	let sql1 = "SELECT * FROM orders WHERE customerid = "+mysql.escape(customerid) ;
    let query = connection.query(sql1, (error, result) => {
	
    if (error) {
                res.send({ error: error });
        }
		//console.log(JSON.stringify(result));	
		res.end(JSON.stringify(result));
	});
   
    
});
module.exports = router;