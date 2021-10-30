//loading all the restaurants for the customer

const express = require("express");
const router = express();
const app = require('../app');

const Restaurants = require('../Models/RestaurantModel');

app.post('/getrestaurantwithcity', (req, res) => {
	//console.log(req.body.city)
	Restaurants.find({city : req.body.city}, (error, rest_results) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (rest_results) {
                          
            res.send(rest_results);
			 
		}
		else {
             var obj = {
                message : "No Dishes",  
            }   
            res.end(obj);
				
		}
	});
  });
module.exports = router;
