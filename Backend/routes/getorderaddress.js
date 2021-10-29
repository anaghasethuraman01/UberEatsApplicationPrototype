//get order address

//getting customer profile details

const express = require("express");
const router = express();
const app = require('../app');

const Users = require('../Models/UserModel');
const Address = require('../Models/OrderAddressModel');
const Orders = require('../Models/OrderModel');


app.post('/getorderaddress', (req, res) => {

	console.log(req.body);

	Users.findOne({ _id: req.body.customerid }, { address: 1, city: 1, state: 1,country:1 },(error, getcustomeraddress) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (getcustomeraddress) {                
            res.send(JSON.stringify(getcustomeraddress))
			
		}
		
	});
  });
module.exports = router;

