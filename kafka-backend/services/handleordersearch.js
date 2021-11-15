
// searching order based on status
"use strict";

const Orders = require('../Models/OrderModel');
function handle_request(req, callback){
	console.log("search") 
    console.log(req)
	Orders.find({orderstatus : req.orderstatus, userid : req.customerid}, (error, dish_results) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			//res.send();
		}
		if (dish_results) {
                          
            //res.send();
			console.log("Results")
			console.log(dish_results)
			callback(null, dish_results);    
		}
		else {
             var obj = {
                message : "No Dishes",  
            }   
            callback(null, obj);    
				
		}
	});
  
  };

module.exports.handle_request = handle_request;









// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');

// router.post('/', function(req,res){
//     const orderstatus = req.body.orderstatus; 
//     const customerid = req.body.customerid;
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
//     console.log(orderstatus)
//     let orderSearchSql = "SELECT * FROM orders where orderstatus = "+mysql.escape(orderstatus)
//     +" AND customerid = "+mysql.escape(customerid);
	
//      console.log(orderSearchSql);
//     let query = connection.query(orderSearchSql, (error, result) => {
	
//     if (error) {
//             console.log(error.message)
//                 // res.send({ error: error });
//         }
// 		console.log(JSON.stringify(result));	
// 		res.end(JSON.stringify(result));
// 	});

// });
// module.exports = router;