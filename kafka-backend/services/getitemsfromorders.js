//get orders for a customer
"use strict";

const Orders = require('../Models/OrderModel');

function handle_request(req, callback){


	
    Orders.find({ userid: req.customerid },(error, getorder) => {
        //console.log("#############")
        if (error) {
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



