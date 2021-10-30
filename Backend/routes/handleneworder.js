// //adding new order by deleting existing order

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth, (req, res) => {

	kafka.make_request('handleneworder', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		 // res.end("Invalid Credentials");
		}else{

			res.send(JSON.stringify(data))
			console.log("handle new order");
		}
	});
	
});

 module.exports = router;












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





