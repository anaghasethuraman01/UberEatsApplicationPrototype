//loading all restuarant with given dishname and dishtype

const express = require("express");
const router = express();
const app = require('../app');

const Dishes = require('../Models/DishModel');
const Restaurants =  require('../Models/RestaurantModel');
app.post('/restsearchonsubmit', (req, res) => {
	//console.log(req.body.dish)
	Dishes.find({dishname : req.body.dish}, (error, dish_results) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (dish_results.length>0) {
                          
            const restaurantid = dish_results[0].restaurantid;
            Restaurants.find({_id : restaurantid}, (error, rest_results) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                    res.send();
                }
                if(rest_results.length > 0){
                    
                    res.send(JSON.stringify(rest_results));
                }
            });
			 
		}
		else {
            res.send("No Dishes found");
        } 
    });
});
module.exports = router;

