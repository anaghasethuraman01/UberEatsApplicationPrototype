//get items in cart

"use strict";

const AddToCart = require('../Models/CartModel');

function handle_request(req, callback){
 
    AddToCart.find({ userid: req.customerid  }, (error, cartitems) => {
	   
		if (error) {   
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			//res.send();
		}
		if (cartitems.length == 0 ) {
			//res.send("") 
			
		}
		else if(cartitems.length > 0){
            //res.send(JSON.stringify(cartitems)) 
            callback(null, JSON.stringify(cartitems)); 
		}
	}); 
};

module.exports.handle_request = handle_request;








    	

        


                                









