//register page for customer and restuarant
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post("/", (req, res) => {
    console.log("Cart");
    
	customerid = req.body.customerid;
    restaurantid = req.body.restaurantid;
    dishid = req.body.dishid;
    dishname = req.body.dishname;
    dishprice =req.body.dishprice;
    quantity = req.body.quantity;
    quantityprice = req.body.quantityprice;
    let cartvalues = {
        customerid: customerid,
        restaurantid:restaurantid,
        dishid:dishid,
        dishname:dishname,
        dishprice:dishprice,
        quantity:quantity,
        quantityprice:quantityprice
    };
    //console.log(cartvalues);
	 let sql = "SELECT * FROM placeorder WHERE restaurantid != " +mysql.escape(restaurantid) + " AND customerid = "+mysql.escape(customerid) ;
    
	 connection.query(sql,(error, result) => {
       
         if(result.length > 0 ){
             console.log("Cant place order");
             res.send("Delete previous order")
         }else{

             sql1 = "SELECT * FROM placeorder WHERE dishid = "+mysql.escape(dishid)
             +" AND customerid = "+mysql.escape(customerid);
             //console.log(sql1)
             connection.query(sql1,(error, result1) => {
                if(error){
                    console.log(error.message)
                }
                 if(result1.length == 0){
                     sql2 = "INSERT INTO placeorder  SET ?";
                    connection.query(sql2,cartvalues,(error, result) => {
                        console.log("Values added to Cart");
                        res.send("Quantity updated")
                    });

                 }
                 else if(result1.length > 0){
                    //  console.log("sfbnbfdns z")
                    // //result1 = JSON.stringify(result1);
                          
                            quantity = result1[0].quantity + 1;
                            quantityprice = quantity * dishprice;
                            console.log(quantity)
                            console.log(dishprice)
                            console.log(quantityprice)
                            let sql3 = "UPDATE placeorder SET quantity = " +mysql.escape(quantity)+ " , quantityprice = " 
                            +mysql.escape(quantityprice) + " WHERE dishid = "
                            + mysql.escape(dishid) + " AND customerid = "+ mysql.escape(customerid);
                        //console.log(sql3);
                            connection.query(sql3, (error, result3) => {
                            if(error){
                                console.log(error.message);
                            }else{
                                res.send("Quantity updated")
                            }
                            });    
                }
                 
            //          let sql3 = "UPDATE placeorder SET quantity = "+ mysql.escape(img)  +
            //    "  WHERE RESTAURANTID = "+mysql.escape(restaurantid) + " AND DISHNAME =  "
            //      }
             })



            
         }
     });
	// 	if (error) {
	// 		console.log("already added as favourites");
	// 	} 
    //     else {
            
    //         console.log("Favourites added");
	// 	}
	// });	
	
});
module.exports = router;