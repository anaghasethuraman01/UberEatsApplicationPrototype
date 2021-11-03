//placing order

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth, (req, res) => {

	console.log("placeorder");
 
	kafka.make_request('placeorder', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		 // res.end("Invalid Credentials");
		}else{

			//res.send(JSON.stringify(data))
            console.log("Order Placed");
            console.log(data);
			console.log("Order Placed");
		}
	});
	
});

 module.exports = router;





// const express = require("express");
// const router = express();
// const app = require('../app');
// const Orders = require('../Models/OrderModel');
// const Carts = require('../Models/CartModel');

// app.post('/placeorder', (req, res) => {
// 	//console.log(req.body)

//     const userid = req.body.customerid;
//     const restaurantid = req.body.restaurantid;
//     const orderDetails = req.body.orderDetails;

//     var neworder = {
//         userid : userid,
//         restaurantid:restaurantid,
//         restaurantname:req.body.restaurantname,
//         customername:req.body.customername,
//         address:req.body.street,
//         city:req.body.city,
//         state:req.body.state,
//         country:req.body.country,
//         ordertype:req.body.ordertype,
//         totalorderquantity:req.body.totalorderquantity,
//         datetime:req.body.datetime,
//         orderstatus:"Order Received",
//         ordermodetype:"New Order",
//         totalorderprice:req.body.totalorderprice
//     }
//     //console.log(neworder);

//     // console.log(typeof(orderDetails[0].dishprice));

//     Orders.create(neworder, (error, dishresult) => {
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			console.log(error.message)
// 		}
// 		if (dishresult) {
//             //console.log(dishresult._id)

//             Orders.findOneAndUpdate({_id :dishresult._id },
//             {
//                     $push : {
//                         orderdetails :
//                         {
//                             $each : orderDetails
                            
//                         }
                        
//                     }
//                 },(error, editdishquantity) => {
//                     if(error){
//                         console.log(error.message)
//                     }else{
//                         //console.log(editdishquantity.userid)
//                         Carts.deleteMany({userid:editdishquantity.userid},(error,updatecart)=>{
//                             if(error){
//                                 console.log(error.message)
//                             }else{
//                                 console.log("Cart updated after checkout")
//                             }
//                         })
//                     }

//             })
// 			//console.log("Order placed")
// 		}	
// 	});	
//   });
// module.exports = router;





