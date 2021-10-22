//login api for restuarant
const express = require("express");
const router = express();
const bcrypt = require("bcryptjs");
const app = require('../app');

const Restaurants = require('../Models/RestaurantModel');

app.post('/restlogin', (req, res) => {
	Restaurants.find({ email: req.body.email}, (error, restlogin) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (restlogin.length > 0) {

			var password_hash = restlogin[0].password;
			const verified = bcrypt.compareSync(req.body.password, password_hash);

			if(verified){
				var obj = {
					message : "Restaurant Found",
					result : restlogin[0],
				}                
				res.send(obj);
			}else{
				var obj = {
					message : "Invalid credentials",
					
				}   
				res.send(obj);

			}
			
		}
		else if(restlogin.length == 0) {
            var obj = {
                message : "Invalid User",   
            }   
            res.send(obj);
				
		}
	});
  });
module.exports = router;