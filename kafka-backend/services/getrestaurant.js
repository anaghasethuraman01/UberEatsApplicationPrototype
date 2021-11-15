"use strict";

const Restaurants = require('../Models/RestaurantModel');

function handle_request(req,callback){

    Restaurants.find((error, restaurant_results) => {
	   
		if (error) {
			//callback(null, error); 
		}
		if (restaurant_results) {
           
			callback(null,restaurant_results); 
		}
		else {
             var obj = {
                message : "No Restaurants",  
            }   
            callback(null,obj); 
				
		}
	});
  
  };

module.exports.handle_request = handle_request;








