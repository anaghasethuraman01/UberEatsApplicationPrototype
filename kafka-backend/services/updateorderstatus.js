//update dish quantity
"use strict";

const Orders = require('../Models/OrderModel');

function handle_request(req, callback){
	console.log("kafka change status")
    console.log(req)
    const orderstatus = req.orderstatus;
    const orderid = req.orderid;
    let ordermodetype = "New Order";
    if(orderstatus === "Picked up" || orderstatus === "Delivered"){
        ordermodetype = "Delivered Order";
    }
    else if(orderstatus === "Cancelled"){
        ordermodetype = "Cancelled Order";
    }
    Orders.updateMany({_id: orderid },{$set : {orderstatus : orderstatus, ordermodetype : ordermodetype}},(error, dishresult) => {
                if (error) {
                // res.writeHead(500, {
                //     'Content-Type': 'text/plain'
                // })
                console.log(error.message)
                }
                if (dishresult) {
                    callback(null, dishresult);
                    console.log({message: "Order updated"});
                }
     })

};

module.exports.handle_request = handle_request;

