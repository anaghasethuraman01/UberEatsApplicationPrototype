// //register page for customer and restuarant
const express = require("express");
const router = express();
 const app = require('../app');

const Users = require('../Models/UserModel');
const { checkAuth } = require("../utils/passport");
app.post('/',checkAuth, (req, res) => {
	
	var newuser = new Users({
		username : req.body.name,
		email:req.body.email,
		password:req.body.password,
		owner:req.body.owner,
		city:req.body.city
	});

	Users.findOne({ email: req.body.email }, (error, register) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			res.send();
		}
		if (register) {
			
			 console.log("Email already exists");
			 res.status('400').send({ message: "User email already registered" });
			
		}
		else {
		  newuser.save((error, data) => {
				if (error) {
					// res.writeHead(500, {
					// 	'Content-Type': 'text/plain'
					// })
					res.statys('404').send();
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