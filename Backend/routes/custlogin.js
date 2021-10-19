// // //register page for customer and restuarant
const express = require("express");
const router = express();
 const app = require('../app');

const Users = require('../Models/UserModel');

app.post('/custlogin', (req, res) => {
	Users.findOne({ email: req.body.email, password:req.body.password }, (error, custlogin) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (custlogin) {
            var obj = {
                message : "Customer Found",
                result : custlogin,
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