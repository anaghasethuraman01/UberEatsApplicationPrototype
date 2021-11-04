//customer register kafka service
"use strict";

const Orders = require('../Models/OrderModel');
const Carts = require('../Models/CartModel');

function handle_request(req, callback){
    const userid = req.customerid;
    const restaurantid = req.restaurantid;
    const orderDetails = req.orderDetails;
	var neworder = {
        userid : userid,
        restaurantid:restaurantid,
        restaurantname:req.restaurantname,
        customername:req.customername,
        address:req.street,
        city:req.city,
        state:req.state,
        country:req.country,
        ordertype:req.ordertype,
        totalorderquantity:req.totalorderquantity,
        datetime:req.datetime,
        orderstatus:"Order Received",
        ordermodetype:"New Order",
        note:req.note,
        totalorderprice:req.totalorderprice
    }
 
	Orders.create(neworder, (error, dishresult) => {
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			console.log(error.message)
		}
		if (dishresult) {
            //console.log(dishresult._id)

            Orders.findOneAndUpdate({_id :dishresult._id },
            {
                    $push : {
                        orderdetails :
                        {
                            $each : orderDetails
                            
                        }
                        
                    }
                },(error, editdishquantity) => {
                    if(error){
                        console.log(error.message)
                    }else{
                        //console.log(editdishquantity.userid)
                        Carts.deleteMany({userid:editdishquantity.userid},(error,updatecart)=>{
                            if(error){
                                console.log(error.message)
                            }else{
								callback(null, updatecart);
                                console.log("Cart updated after checkout")
                            }
                        })
                    }

            })
			//console.log("Order placed")
		}	
	});

   
	
};

module.exports.handle_request = handle_request;
