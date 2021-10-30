//loading all the restaurants for the customer

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.get('/',checkAuth, (req, res) => {
  
	kafka.make_request('restaurant_list',req.body, (err, data) => {
   
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
//  const app = require('../app');

// const Restaurants = require('../Models/RestaurantModel');

// app.get('/getrestaurant', (req, res) => {
//     //console.log(req.body)
// 	Restaurants.find( (error, restaurant_results) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			res.send();
// 		}
// 		if (restaurant_results) {
//             // var obj = {
//             //     message : "Customer Found",
//             //     result : getcustomerprofile,
//             // }                
//             res.send(restaurant_results);
			
// 		}
// 		else {
//              var obj = {
//                 message : "No Restaurants",  
//             }   
//             res.send(obj);
				
// 		}
// 	});
//   });
// module.exports = router;
