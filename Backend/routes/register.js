// //register page for customer and restuarant
const express = require("express");
const router = express();
 const app = require('../app');

const Users = require('../Models/UserModel');

app.post('/register', (req, res) => {
	
	var newuser = new Users({
		username : req.body.name,
		email:req.body.email,
		password:req.body.password,
		owner:req.body.owner,
		city:req.body.city
	});
	// console.log("newuser")
 	// console.log(newuser)
	//  console.log("****")
	Users.findOne({ email: req.body.email }, (error, register) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			res.send();
		}
		if (register) {
			
			 console.log("Email already exists");
			 res.send({ message: "User email already registered" });
			
		}
		else {
		  newuser.save((error, data) => {
				if (error) {
					// res.writeHead(500, {
					// 	'Content-Type': 'text/plain'
					// })
					res.send();
				}
				else {
					console.log("added");
					// res.writeHead(200, {
					// 	'Content-Type': 'text/plain'
					// })
					res.send({message: "User Registration successful"});
				}
			});
		}
	});
  });
module.exports = router;