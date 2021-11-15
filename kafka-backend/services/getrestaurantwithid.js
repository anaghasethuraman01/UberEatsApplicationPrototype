"use strict";

const Dishes = require('../Models/DishModel');
function handle_request(req, callback){
	Dishes.find({restaurantid : req.restaurantid}, (error, dish_results) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			//res.send();
		}
		if (dish_results) {
                          
            //res.send();
			callback(null, dish_results);    
		}
		else {
             var obj = {
                message : "No Dishes",  
            }   
            callback(null, obj);    
				
		}
	});
  
  };

module.exports.handle_request = handle_request;








