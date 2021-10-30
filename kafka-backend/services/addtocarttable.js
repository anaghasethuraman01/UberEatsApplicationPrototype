//customer register kafka service
"use strict";

const AddToCart = require('../Models/CartModel');

function handle_request(req, callback){
    
	var newaddtocart = {
        userid:req.customerid,
		restaurantid : req.restaurantid,
        dishid:req.dishid,
		dishprice:req.dishprice,
		dishname:req.dishname,
		quantity:req.quantity,
		quantityprice:req.quantityprice
    };
	AddToCart.find({ userid: req.customerid , restaurantid : {$ne:req.restaurantid} }, (error, addtocart) => {
	   
		if (error) {   
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			//res.send();
		}
		if (addtocart.length > 0 ) {
			var obj = {
				message : "Delete previous order",
				
			}    
			callback(null, obj);
			//console.log(addtocart.length) 
			 //res.send("Delete previous order");
			
		}
		else if(addtocart.length == 0){
            
            AddToCart.find({dishid:req.dishid , userid:req.customerid}, (error, addnewdish)=>{
                if (error) {
                    res.writeHead(500, {
                    	'Content-Type': 'text/plain'
                    })
                   // res.send();
                } 
                if (addnewdish.length == 0) {
                    
                     //console.log("Add new dish");
                     AddToCart.create(newaddtocart, (error, cartresult) => {
	   
                        if (error) {
                            res.writeHead(500, {
                            	'Content-Type': 'text/plain'
                            })
                            console.log(error.message)
                        }
                        if (cartresult) {
							var obj = {
								message : "Quantity updated",
								
							}    
							callback(null, obj);
							
                            //res.send("Quantity updated")
                            //res.send({message: "New Dish Added"});
                        }	
                    });
                    
                }
                else if(addnewdish.length > 0) {
                    
                    let updatedprice = Number(addnewdish[0].quantityprice + req.dishprice);
                    let updatedqty = Number(addnewdish[0].quantity + req.quantity) ;
                   
                    var updateaddtocart = {
                        userid:req.customerid,
                        restaurantid : req.restaurantid,
                        dishid:req.dishid,
                        dishprice:req.dishprice,
                        dishname:req.dishname,
                        quantity:updatedqty ,
                        quantityprice:updatedprice
                    };
                    console.log(updateaddtocart)
                    AddToCart.findOneAndUpdate({userid: req.customerid , dishid:req.dishid },updateaddtocart,(error, editdishquantity) => {
	   
                        if (error) {
                            res.writeHead(500, {
                            	'Content-Type': 'text/plain'
                            })
                            console.log(error.message)
                        }
                        if (editdishquantity) {
							
							var obj = {
								message : "Quantity updated",
								
							}    
							callback(null, obj); 
                            //res.send("Quantity updated")
                        }	
                    });
                    
                }
            })
		}
	});



    
 
};

module.exports.handle_request = handle_request;


// //edit customer profile

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




    	

        


                                





