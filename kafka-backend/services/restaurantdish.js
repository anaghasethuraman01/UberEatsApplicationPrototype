//customer register kafka service
"use strict";
const Dishes = require('../Models/DishModel');

function handle_request(req, callback){
    
	var newdish = {
		dishname : req.dishname,
		ingrediants:req.ingrediants,
		price:req.price,
		description:req.description,
		category:req.category,
		foodtype:req.foodtype,
		restaurantid:req.restaurantid
	};
	Dishes.create(newdish, (error, dishresult) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			console.log(error.message)
		}
		if (dishresult) {
			var obj = {
                message : "New Dish Added",
                
            }    
            callback(null, obj); 
		}	
	});
		
    // Restaurants.findOne({ email: req.email }, (error, register) => {
	   
	// 	if (error) {
	// 		// res.writeHead(500, {
	// 		// 	'Content-Type': 'text/plain'
	// 		// })
	// 		res.send();
	// 	}
	// 	if (register) {
    //         var obj = {
    //             message : "Email already exists",
                
    //         }    
            
    //         callback(null, obj); 
	// 	}
	// 	else {
	// 	  newuser.save((error, data) => {
	// 			if (error) {
	// 				//res.send();
	// 			}
	// 			else {
    //                 var obj = {
    //                     message : "Restaurant Registration successful",
                        
    //                 }    
    //                 callback(null, obj); 
                    
	
	// 			}
	// 		});
	// 	}
	// });
       
      
 
};

module.exports.handle_request = handle_request;







