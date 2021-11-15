//add to favourites
"use strict";

const Favourites = require('../Models/FavouritesModel');

function handle_request(req, callback){
    
    var customerfavourite = new Favourites({
		restaurantid:req.restaurantid,
		userid:req.customerid
	});
    Favourites.findOne({ restaurantid: req.restaurantid ,userid: req.customerid }, (error, favresult) => {
	   
		if (error) {
			callback(null, error);
			//res.send();
		}
		if (favresult) {
			var obj = {
                message : "Already added as Favourites",
                
            }    
            callback(null, obj);
			 console.log("Already added as Favourites");
			// res.send({ message: "Already added as Favourites" });
			
		}
		else {
			customerfavourite.save((error, data) => {
				if (error) {
					callback(null, error);
					//res.send();
				}
				else {
					console.log("Added as Favourites");
					var obj = {
                        message : "Added as Favourites",
                        
                    }    
                    callback(null, obj);
				}
			});
		}
	});
};

module.exports.handle_request = handle_request;




