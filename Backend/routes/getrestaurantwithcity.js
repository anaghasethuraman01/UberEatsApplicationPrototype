//loading all the restaurants for the customer

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth, (req, res) => {
	kafka.make_request('restaurantcitylist',req.body, (err, data) => {
			
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  res.end();
		}else{

			res.send(data)
			console.log("Res success");
		}
	});
	
});

module.exports = router;






























// const express = require("express");
// const router = express();
// const app = require('../app');

// const Restaurants = require('../Models/RestaurantModel');

// app.post('/getrestaurantwithcity', (req, res) => {
// 	//console.log(req.body.city)
// 	Restaurants.find({city : req.body.city}, (error, rest_results) => {
	   
// 		if (error) {
// 			res.writeHead(500, {
// 				'Content-Type': 'text/plain'
// 			})
// 			res.send();
// 		}
// 		if (rest_results) {
                          
//             res.send(rest_results);
			 
// 		}
// 		else {
//              var obj = {
//                 message : "No Dishes",  
//             }   
//             res.end(obj);
				
// 		}
// 	});
//   });
// module.exports = router;
