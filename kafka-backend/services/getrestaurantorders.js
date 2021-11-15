//get orders for a customer
"use strict";

const Orders = require('../Models/OrderModel');

function handle_request(req, callback){


	
    Orders.find({ restaurantid: req.restaurantid },(error, getorder) => {
        //console.log("#############")
        if (error) {
            // res.status = '500';
            // callback(null,res)
            callback(null, error);
        }
        if (getorder) {
            // res.status = 200;
            // res.orders.concat(getorder)
            
            callback(null,getorder)
            // console.log("#############")
            console.log(getorder)
            // console.log("#############")

        }
                
    });
};

module.exports.handle_request = handle_request;



