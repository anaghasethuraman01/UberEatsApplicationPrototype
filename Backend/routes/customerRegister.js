// //register page for customer and restuarant



// login api for customer

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
//const { checkAuth } = require("../utils/passport");
router.post('/', (req, res) => {

	console.log("Inside Cust Register");
 
	kafka.make_request('customer_register', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  console.log(error.message)
		  res.end("Invalid Credentials");
		}else{

			res.send(JSON.stringify(data))
			console.log("Register success");
		}
	});
	
});

 module.exports = router;
// const express = require("express");
// const router = express();
// const bcrypt = require("bcryptjs");
// const app = require('../app');

// const Users = require('../Models/UserModel');

// app.post('/customerRegister', (req, res) => {
// 	const password = bcrypt.hashSync(req.body.password, 10);
// 	var newuser = new Users({
// 		username : req.body.name,
// 		email:req.body.email,
// 		password:password,
// 		owner:req.body.owner,
// 	});
// 	// console.log("newuser")
//  	// console.log(newuser)
// 	//  console.log("****")
// 	Users.findOne({ email: req.body.email }, (error, register) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			res.send();
// 		}
// 		if (register) {
			
// 			 console.log("Email already exists");
// 			 res.send({ message: "User email already registered" });
			
// 		}
// 		else {
// 		  newuser.save((error, data) => {
// 				if (error) {
// 					// res.writeHead(500, {
// 					// 	'Content-Type': 'text/plain'
// 					// })
// 					res.send();
// 				}
// 				else {
// 					console.log("added");
// 					// res.writeHead(200, {
// 					// 	'Content-Type': 'text/plain'
// 					// })
// 					res.send({message: "User Registration successful"});
// 				}
// 			});
// 		}
// 	});
//   });
// module.exports = router;