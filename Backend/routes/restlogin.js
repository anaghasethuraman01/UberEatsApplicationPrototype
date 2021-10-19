// // //register page for customer and restuarant
const express = require("express");
const router = express();
 const app = require('../app');

const Restaurants = require('../Models/RestaurantModel');

app.post('/restlogin', (req, res) => {
	Restaurants.findOne({ email: req.body.email, password:req.body.password }, (error, restlogin) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (restlogin) {
            var obj = {
                message : "Restaurant Found",
                result : restlogin,
            }                
            res.send(obj);
			
		}
		else {
             var obj = {
                message : "Invalid credentials",
                
            }   
            res.send(obj);
				
		}
	});
  });
module.exports = router;