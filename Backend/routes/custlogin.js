//login api for customer
const express = require("express");
const router = express();
const bcrypt = require("bcryptjs");
const app = require('../app');

const Users = require('../Models/UserModel');

app.post('/custlogin', (req, res) => {
	//console.log(req.body.email)
	Users.find({ email: req.body.email}, (error, custlogin) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (custlogin.length > 0) {

			var password_hash = custlogin[0].password;
			const verified = bcrypt.compareSync(req.body.password, password_hash);

			if(verified){
				var obj = {
					message : "Customer Found",
					result : custlogin[0],
				}                
				res.send(obj);
			}else{
				var obj = {
					message : "Invalid credentials",
					
				}   
				res.send(obj);

			}
			
		}
		else if(custlogin.length == 0) {
            var obj = {
                message : "Invalid User",   
            }   
            res.send(obj);
				
		}
	});
  });
module.exports = router;