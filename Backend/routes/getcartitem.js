//get items in cart
const express = require("express");
const router = express();
const app = require('../app');

const AddToCart = require('../Models/CartModel');

app.post('/getcartitem', (req, res) => {

    AddToCart.find({ userid: req.body.customerid  }, (error, cartitems) => {
	   
		if (error) {   
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (cartitems.length == 0 ) {
			res.send("") 
			
		}
		else if(cartitems.length > 0){
            res.send(JSON.stringify(cartitems)) 
            
		}
	});

  });
module.exports = router;




    	

        


                                
