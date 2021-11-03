//add to cart


const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth,(req, res) => {
 
	kafka.make_request('addtocart', req.body, (err, data) => {
    console.log(req.body)
		if (err) { 
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  //res.end("Invalid Credentials");
		}else{
			console.log(data.message)
			res.send(data.message)
			//console.log("Add to cart success");
		}
	});
	
});

 module.exports = router;



// const express = require("express");
// const router = express();
// const app = require('../app');

// const AddToCart = require('../Models/CartModel');

// app.post('/addtocarttable', (req, res) => {
	
// 	var newaddtocart = {
//         userid:req.body.customerid,
// 		restaurantid : req.body.restaurantid,
//         dishid:req.body.dishid,
// 		dishprice:req.body.dishprice,
// 		dishname:req.body.dishname,
// 		quantity:req.body.quantity,
// 		quantityprice:req.body.quantityprice
//     };
//   // console.log(newaddtocart)

//     AddToCart.find({ userid: req.body.customerid , restaurantid : {$ne:req.body.restaurantid} }, (error, addtocart) => {
	   
// 		if (error) {   
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			res.send();
// 		}
// 		if (addtocart.length > 0 ) {
// 			//console.log(addtocart.length) 
// 			 res.send("Delete previous order");
			
// 		}
// 		else if(addtocart.length == 0){
            
//             AddToCart.find({dishid:req.body.dishid , userid:req.body.customerid}, (error, addnewdish)=>{
//                 if (error) {
//                     res.writeHead(500, {
//                     	'Content-Type': 'text/plain'
//                     })
//                     res.send();
//                 } 
//                 if (addnewdish.length == 0) {
                    
//                      //console.log("Add new dish");
//                      AddToCart.create(newaddtocart, (error, cartresult) => {
	   
//                         if (error) {
//                             res.writeHead(500, {
//                             	'Content-Type': 'text/plain'
//                             })
//                             console.log(error.message)
//                         }
//                         if (cartresult) {
//                             res.send("Quantity updated")
//                             //res.send({message: "New Dish Added"});
//                         }	
//                     });
                    
//                 }
//                 else if(addnewdish.length > 0) {
                    
//                     let updatedprice = Number(addnewdish[0].quantityprice + req.body.dishprice);
//                     let updatedqty = Number(addnewdish[0].quantity + req.body.quantity) ;
                   
//                     var updateaddtocart = {
//                         userid:req.body.customerid,
//                         restaurantid : req.body.restaurantid,
//                         dishid:req.body.dishid,
//                         dishprice:req.body.dishprice,
//                         dishname:req.body.dishname,
//                         quantity:updatedqty ,
//                         quantityprice:updatedprice
//                     };
//                     console.log(updateaddtocart)
//                     AddToCart.findOneAndUpdate({userid: req.body.customerid , dishid:req.body.dishid },updateaddtocart,(error, editdishquantity) => {
	   
//                         if (error) {
//                             // res.writeHead(500, {
//                             // 	'Content-Type': 'text/plain'
//                             // })
//                             console.log(error.message)
//                         }
//                         if (editdishquantity) {
//                             res.send("Quantity updated")
//                         }	
//                     });
                    
//                 }
//             })
// 		}
// 	});

//   });
// module.exports = router;




    	

        


                                
