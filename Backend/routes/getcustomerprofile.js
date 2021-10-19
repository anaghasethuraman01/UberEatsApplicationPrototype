//loading all the restaurants for the customer

const express = require("express");
const router = express();
 const app = require('../app');

const Users = require('../Models/UserModel');

app.post('/getcustomerprofile', (req, res) => {
    //console.log(req.body)
	Users.findOne({ _id: req.body.userid }, (error, getcustomerprofile) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			res.send();
		}
		if (getcustomerprofile) {
            // var obj = {
            //     message : "Customer Found",
            //     result : getcustomerprofile,
            // }                
            res.send(getcustomerprofile);
			
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






