"use strict";


const Restaurants = require('../Models/RestaurantModel');

function handle_request(req, callback){
    console.log("handle req rest profile")
    console.log(req)
    Restaurants.findOne({ _id: req.userid }, (error, getprofile) => {
	  // console.log("I am here")
    if (error) {
        res.writeHead(500, {
        	'Content-Type': 'text/plain'
        })
        //res.send();
    }
    if (getprofile) {
                      
        callback(null, getprofile); 
        
    }
    else {
         var obj = {
            message : "Invalid credentials",  
        }   
        callback(null, obj); 
            
    }
});
};

module.exports.handle_request = handle_request;

// const express = require("express");
// const router = express();
// const app = require('../app');
// const Restaurants = require('../Models/RestaurantModel');
// app.post('/getrestaurantprofile', (req, res) => {
// 	//console.log(req.body.userid)
// 	Restaurants.findOne({ _id: req.body.userid }, (error, getprofile) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			res.send();
// 		}
// 		if (getprofile) {
//             // var obj = {
//             //     message : "Customer Found",
//             //     result : getcustomerprofile,
//             // }                
//             res.send(getprofile);
			
// 		} 
// 		else {
//              var obj = {
//                 message : "Invalid credentials",  
//             }   
//             res.send(obj);
				
// 		}
// 	});
//   });
// module.exports = router;













