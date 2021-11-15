//loading all the restaurants for the customer based on city 
"use strict";

const Restaurants = require('../Models/RestaurantModel');

function handle_request(req,callback){
	// console.log(req)
    Restaurants.find({city : req.city},(error, restaurant_results) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			//res.send();
			callback(null, error); 
		}
		if (restaurant_results) {
           
			callback(null,restaurant_results); 
		}
		// else {
        //      var obj = {
        //         message : "No Restaurants",  
        //     }   
        //     callback(null,obj); 
				
		// }
	});
  
  };

module.exports.handle_request = handle_request;





























