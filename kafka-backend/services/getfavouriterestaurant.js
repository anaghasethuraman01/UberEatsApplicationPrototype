//loading favourite restaurants 

"use strict";


const Restaurants = require('../Models/RestaurantModel');
const Favourites = require('../Models/FavouritesModel');

function handle_request(req, callback){
	Favourites.find({userid : req.customerid},{restaurantid : 1}, (error, rest_results) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			//res.send();
		}
		if (rest_results) {
                     
          
            var rest =[];
            for(var i = 0 ;i<rest_results.length;i++){
                var item = rest_results[i].restaurantid;
                if(!rest.includes(item)){  
                rest.push(item);  
                }  
            }
            Restaurants.find({_id : {$in : rest }}, (error, dish_results) => {
	   
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                   console.log(error.message)
                }
                if (dish_results) {
                    console.log(dish_results)           
                    //res.send(dish_results);
                    callback(null, JSON.stringify(dish_results));
                     
                }
                
            });

		}
		else {
             var obj = {
                message : "No Dishes",  
            }   
            callback(null, obj);
				
		}
	});
    // AddToCart.find({ userid: req.customerid  }, (error, cartitems) => {
	   
	// 	if (error) {   
	// 		res.writeHead(500, {
	// 			'Content-Type': 'text/plain'
	// 		})
	// 		//res.send();
	// 	}
	// 	if (cartitems.length == 0 ) {
	// 		//res.send("") 
			
	// 	}
	// 	else if(cartitems.length > 0){
    //         //res.send(JSON.stringify(cartitems)) 
    //         callback(null, JSON.stringify(cartitems)); 
	// 	}
	// }); 
};

module.exports.handle_request = handle_request;


//loading favourite restaurants 





