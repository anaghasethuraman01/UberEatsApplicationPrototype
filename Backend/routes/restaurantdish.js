//inserting dishes into restaurant
const express = require("express");
const router = express();
const app = require('../app');
const Dishes = require('../Models/DishModel');


app.post('/restaurantdish', (req, res) => {
	
	var newdish = {
		dishname : req.body.dishname,
		ingrediants:req.body.ingrediants,
		price:req.body.price,
		description:req.body.description,
		category:req.body.category,
		foodtype:req.body.foodtype,
		restaurantid:req.body.restaurantid
	};

	console.log(newdish)
	Dishes.create(newdish, (error, dishresult) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			console.log(error.message)
		}
		if (dishresult) {
			res.send({message: "New Dish Added"});
		}	
	});
			
		
  });
module.exports = router;

// newdish.insertOne((error, data) => {
	// 	if (error) {
	// 		// res.writeHead(500, {
	// 		// 	'Content-Type': 'text/plain'
	// 		// })
	// 		res.send();
	// 	}
	// 	else {
	// 		console.log("added");
	// 		// res.writeHead(200, {
	// 		// 	'Content-Type': 'text/plain'
	// 		// })
	// 		res.send({message: "New Dish added"});
	// 	}
	// });



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