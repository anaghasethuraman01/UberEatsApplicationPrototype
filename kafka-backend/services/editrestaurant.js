//customer register kafka service
"use strict";

const Restaurants = require('../Models/RestaurantModel');

function handle_request(req, callback){
	console.log("In kafka update")
	console.log(req)

	var updaterestaurant = {
        restaurantid:req.restaurantid,
		restaurantname : req.restaurantname,
		email:req.email,
		phone:req.phone,
		zipcode:req.zipcode,
		timing:req.timing,
        days:req.days,
		address:req.address,
        city:req.city,
        state:req.state,
        country:req.country,
        description:req.description, 
		deliverytype:req.deliverytype,
		foodtype:req.foodtype
    };
	// console.log("Update")
    console.log(updaterestaurant)
    Restaurants.findOneAndUpdate({_id: req.restaurantid },updaterestaurant,(error, editrestaurant) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			console.log(error.message)
		}
		if (editrestaurant) {
			callback(null, editrestaurant);
			console.log("Restaurant Profile Edited.");
		}	
    });
	
};

module.exports.handle_request = handle_request;





// const express = require("express");
// const router = express();
// const app = require('../app');

// const Restaurants = require('../Models/RestaurantModel');

// app.post('/editrestaurant', (req, res) => {
	
// 	var updaterestaurant = {
//         restaurantid:req.body.restaurantid,
// 		restaurantname : req.body.restaurantname,
// 		email:req.body.email,
// 		phone:req.body.phone,
// 		zipcode:req.body.zipcode,
// 		timing:req.body.timing,
//         days:req.body.days,
// 		address:req.body.address,
//         city:req.body.city,
//         state:req.body.state,
//         country:req.body.country,
//         description:req.body.description, 
// 		deliverytype:req.body.deliverytype,
// 		foodtype:req.body.foodtype
//     };
// 	console.log(updaterestaurant)

//     Restaurants.findOneAndUpdate({_id: req.body.restaurantid},updaterestaurant,(error, editrestaurant) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			console.log(error.message)
// 		}
// 		if (editrestaurant) {
// 			console.log("User Profile Edited.");
// 		}	
//     });
	
//   });
// module.exports = router;
