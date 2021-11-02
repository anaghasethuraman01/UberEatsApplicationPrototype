//get order address
"use strict";
const Users = require('../Models/UserModel');
const Orders = require('../Models/OrderModel');

function handle_request(req, callback){

// Users.aggregate([
// 	{ $project: { address: 1 ,_id:0} },
//     {
//         $match: {
//             _id: req.customerid
//         }
//     },
//     {
//         $unionWith: {
//             coll: Orders,
//             pipeline: [{
// 				$project: { address: 1,_id:0 },
//                 $match: {
//                     userid: req.customerid
//                 }
//             }]
//         }
//     },
   
// ],(error, getcustomeraddress) => {
// 	console.log("***********getcustomeraddress******")
// 	console.log()
// 	//callback(null, getcustomeraddress); 
// });


	// Users.aggregate([
	// 	    { 
	// 			$match: {
	// 				_id: req.customerid
	// 			}
	// 		},
	// 	    {
	// 	        $unionWith: {
	// 	            coll:Orders,
	// 	            pipeline: [{ $project: { address: 1 } }]
	// 	        }
	// 	    }
	// 	],(error, getcustomeraddress) => {
	// 		//console.log(error.message)
	// 		callback(null, getcustomeraddress); 
	// 		console.log("*******************")
	// 	})
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

