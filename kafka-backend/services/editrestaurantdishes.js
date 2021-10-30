//editing restaurant dishes
"use strict";

const Dishes = require('../Models/DishModel');

function handle_request(req, callback){
	
	var newdishes = {
        dishid:req.dishid,
		dishname : req.dishname,
		ingrediants:req.ingrediants,
		price:req.price,
		description:req.description,
		category:req.category,
		foodtype:req.foodtype,
		
    };
	Dishes.findOneAndUpdate({_id: req.dishid },newdishes,(error, dishresult) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			console.log(error.message)
		}
		if (dishresult) {
			callback(null, dishresult);
			console.log("Restaurant Dishes Edited.");
		}	
    });

   
	
};

module.exports.handle_request = handle_request;












