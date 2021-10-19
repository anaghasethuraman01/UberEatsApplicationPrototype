//inserting dishes into restaurant

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




// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');


// router.post("/", (req, res) => {
// 	//console.log(req.body);

// 	const dishname = req.body.dishname;
// 	const ingrediants = req.body.ingrediants;
// 	const price = req.body.price;
// 	const description = req.body.description;
// 	const category = req.body.category;
// 	const restaurantid = req.body.restaurantid;
// 	const foodtype = req.body.foodtype;

// 	let post = {
//         dishname: dishname,
//         ingrediants: ingrediants,
//         price: price,
//         description: description,
//         category: category,
//         restaurantid:restaurantid,
// 		foodtype:foodtype
// 		};
// 			let sql = "INSERT INTO restaurantdishes SET ?";
// 			connection.query(sql, post, (error, result) => {
// 				if (error) {
// 					//console.log("Error");
// 					//res.send({message:"Invalid credentials"})
// 				} else {
// 					console.log("Dish ADDED");
// 					//res.send("Row added");
// 				}
// 			});
// });
// module.exports = router;