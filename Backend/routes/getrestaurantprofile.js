//fetching restaurant profile details







//getting customer profile details
//inserting dishes into restaurant

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth,(req, res) => {

	kafka.make_request('restaurant_profile', req.body, (err, data) => {
    
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
// const Restaurants = require('../Models/RestaurantModel');
// app.post('/getrestaurantprofile', (req, res) => {
// 	//console.log(req.body.userid)
// 	Restaurants.findOne({ _id: req.body.userid }, (error, getprofile) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			res.send();
// 		}
// 		if (getprofile) {
//             // var obj = {
//             //     message : "Customer Found",
//             //     result : getcustomerprofile,
//             // }                
//             res.send(getprofile);
			
// 		} 
// 		else {
//              var obj = {
//                 message : "Invalid credentials",  
//             }   
//             res.send(obj);
				
// 		}
// 	});
//   });
// module.exports = router;


