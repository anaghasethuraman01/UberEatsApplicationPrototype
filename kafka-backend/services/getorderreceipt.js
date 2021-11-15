// viewing order receipt
"use strict";

const Orders = require('../Models/OrderModel');

function handle_request(req, callback){
    console.log("#######Receipt######")
    Orders.find({ _id: req.orderid },(error, getorder) => {
        //console.log("#############")
        if (error) {
            callback(null, error);
        }
        if (getorder) {
            // res.status = 200;
            // res.orders.concat(getorder)
            
            callback(null,getorder)
            

        }
                
    });
};

module.exports.handle_request = handle_request;



