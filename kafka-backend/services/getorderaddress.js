//get order address
"use strict";
const Users = require('../Models/UserModel');
const Address = require('../Models/OrderAddressModel');
const Orders = require('../Models/OrderModel');

function handle_request(req, callback){
    console.log("handle req rest profile")

	Users.findOne({ _id: req.customerid }, { address: 1, city: 1, state: 1,country:1 },(error, getcustomeraddress) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			callback(null,res)
		}
		if (getcustomeraddress) {   
            callback(null, getcustomeraddress); 
            //res.send(JSON.stringify(getcustomeraddress))
			
		}
		
	});


//     Restaurants.findOne({ _id: req.userid }, (error, getprofile) => {
// 	  // console.log("I am here")
//     if (error) {
//         res.writeHead(500, {
//         	'Content-Type': 'text/plain'
//         })
//         //res.send();
//     }
//     if (getprofile) {
                      
//         callback(null, getprofile); 
        
//     }
//     else {
//          var obj = {
//             message : "Invalid credentials",  
//         }   
//         callback(null, obj); 
            
//     }
// });
};

module.exports.handle_request = handle_request;





// const express = require("express");
// const router = express();
// const app = require('../app');

// const Users = require('../Models/UserModel');
// const Address = require('../Models/OrderAddressModel');
// const Orders = require('../Models/OrderModel');


// app.post('/getorderaddress', (req, res) => {
// 	console.log("***Delivery**")
// 	console.log(req.body);

// 	Users.findOne({ _id: req.body.customerid }, { address: 1, city: 1, state: 1,country:1 },(error, getcustomeraddress) => {
	   
// 		if (error) {
// 			res.writeHead(500, {
// 				'Content-Type': 'text/plain'
// 			})
// 			res.send();
// 		}
// 		if (getcustomeraddress) {                
//             res.send(JSON.stringify(getcustomeraddress))
			
// 		}
		
// 	});
//   });
// module.exports = router;

