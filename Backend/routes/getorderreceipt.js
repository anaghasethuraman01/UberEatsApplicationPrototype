
// viewing order receipt


const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth,(req, res) => {
  console.log(req.body)
	kafka.make_request('orderreceipt', req.body, (err, data) => {
		//console.log(data) 
		
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  //res.end("Invalid Credentials");
		}else{
			res.end(JSON.stringify(data))
			console.log("Orders");
		}
	});
	
});

 module.exports = router;
// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');

// router.post('/', function(req,res){
//     const orderid = req.body.orderid; 
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
   
//     let sql1 = "SELECT price,dishname,quantity FROM orderdetails WHERE "
//     + " orderid = " + mysql.escape(orderid) ;
//     console.log(sql1);
//     let query = connection.query(sql1, (error, result) => {
	
//     if (error) {
//             console.log(error.message)
//                 // res.send({ error: error });
//         }
// 		//console.log(JSON.stringify(result));	
// 		res.end(JSON.stringify(result));
// 	});


	
    
// });
// module.exports = router;