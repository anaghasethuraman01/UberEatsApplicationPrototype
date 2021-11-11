//customer register kafka service
"use strict";

const bcrypt = require('bcrypt');
const Restaurants = require('../Models/RestaurantModel');

function handle_request(req, callback){
    const password = bcrypt.hashSync(req.password, 10);
	var newuser = new Restaurants({
		restaurantname : req.name,
		email:req.email,
		password:password,
		owner:req.owner,
		city:req.city
	});
  
    Restaurants.findOne({ email: req.email }, (error, register) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			res.send();
		}
		if (register) {
            var obj = {
                message : "Email already exists",
                
            }    
            
            callback(null, obj); 
		}
		else {
		  newuser.save((error, data) => {
				if (error) {
					//res.send();
				}
				else {
                    var obj = {
                        message : "User Registration successful",
                        
                    }    
                    callback(null, obj); 
                    
	
				}
			});
		}
	});
       
      
 
};

module.exports.handle_request = handle_request;




