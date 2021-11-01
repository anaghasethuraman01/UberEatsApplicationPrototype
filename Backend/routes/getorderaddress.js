//get order address

//fetching restaurant profile details
const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
//const { checkAuth } = require("../utils/passport");
router.post('/',(req, res) => {
  
	kafka.make_request('orderaddress', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  //res.end("Invalid Credentials");
		}else{
			res.send(data)
			console.log("restaurant profile");
		}
	});
	
});

 module.exports = router;

 
// const express = require("express");
// const router = express();
// const app = require('../app');

// const Users = require('../Models/UserModel');
// const Address = require('../Models/OrderAddressModel');
// const Orders = require('../Models/OrderModel');


// app.post('/getorderaddress', (req, res) => {
// 	console.log("***Delivery**")
// 	console.log(req.body);

// 	Users.findOne({ _id: req.body.customerid }, { address: 1, city: 1, state: 1,country:1 },(error, getcustomeraddress) => {
	   
// 		if (error) {
// 			res.writeHead(500, {
// 				'Content-Type': 'text/plain'
// 			})
// 			res.send();
// 		}
// 		if (getcustomeraddress) {                
//             res.send(JSON.stringify(getcustomeraddress))
			
// 		}
		
// 	});
//   });
// module.exports = router;

