//loading all orders for restaurant


const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth,(req, res) => {
  console.log(req.body) 
	kafka.make_request('restaurantorders', req.body, (err, data) => {
		console.log(data)
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  //res.end("Invalid Credentials");
		}else{
         
			res.status('200').end(JSON.stringify(data))
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
//     //console.log("Restaurant Orders");  
//     const restaurantid = req.body.restaurantid;  
//     // res.writeHead(200,{
//     //     'Content-Type' : 'application/json'
//     // });    
// 	let sql1 = "SELECT * FROM orders WHERE restaurantid = "+mysql.escape(restaurantid) ;
//     let query = connection.query(sql1, (error, result) => {
	   
//     if (error) {
//                 res.send({ error: error });
//         }
//      if(result.length == 0 ){
//         res.send({ message: "No Orders Found" })
//      }else{
//         res.end(JSON.stringify(result));
//      }   
// 		//console.log(JSON.stringify(result));	
		
// 	});
   
    
// });
// module.exports = router;