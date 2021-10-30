//adding new order by deleting existing order
"use strict";

const Carts = require('../Models/CartModel');

function handle_request(req, callback){
	var newdish = {
        userid:req.customerid,
        restaurantid:req.restaurantid,
        dishid:req.dishid,
        dishname:req.dishname,
        dishprice : req.dishprice,
		quantity:req.quantity,
		quantityprice:req.quantityprice,
    }
	
	Carts.deleteMany({userid: req.customerid },(error, neworder) => {
        if (error) {
                res.writeHead(500, {
                	'Content-Type': 'text/plain'
                })
                console.log(error.message)
            }
            if (neworder) {
                Carts.create(newdish, (error, dishresult) => {
	   
                    if (error) {
                        res.writeHead(500, {
                        	'Content-Type': 'text/plain'
                        })
                        console.log(error.message)
                    }
                    if (dishresult) {
						callback(null, dishresult);
                        //res.send({message: "New Dish Added"});
                    }	
                });
            }	
    });


};

module.exports.handle_request = handle_request;







// const express = require("express");
// const router = express();
// const app = require('../app');

// const Carts = require('../Models/CartModel');

// app.post('/handleneworder', (req, res) => {
// 	//console.log(req.body)
//     newdish = {
//         userid:req.body.customerid,
//         restaurantid:req.body.restaurantid,
//         dishid:req.body.dishid,
//         dishname:req.body.dishname,
//         dishprice : req.body.dishprice,
// 		quantity:req.body.quantity,
// 		quantityprice:req.body.quantityprice,
//     }
//     Carts.deleteMany({userid: req.body.customerid },(error, neworder) => {
//         if (error) {
//                 res.writeHead(500, {
//                 	'Content-Type': 'text/plain'
//                 })
//                 console.log(error.message)
//             }
//             if (neworder) {
//                 Carts.create(newdish, (error, dishresult) => {
	   
//                     if (error) {
//                         // res.writeHead(500, {
//                         // 	'Content-Type': 'text/plain'
//                         // })
//                         console.log(error.message)
//                     }
//                     if (dishresult) {
//                         res.send({message: "New Dish Added"});
//                     }	
//                 });
//             }	
//     });
//   });
// module.exports = router;







