
// viewing orders based on status


const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/', checkAuth,(req, res) => {
   
	kafka.make_request('handleordersearch',req.body, (err, data) => {	
		
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  res.end();
		}else{

			res.send(data)
			// console.log("Res success");
            // console.log(data)
		}
	});
	
});

module.exports = router;

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