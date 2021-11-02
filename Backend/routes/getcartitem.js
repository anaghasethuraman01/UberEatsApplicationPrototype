//get items in cart

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth,(req, res) => {

	kafka.make_request('showcartitem', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  //res.end("Invalid Credentials");
		}else{

			res.send(data)
			
			console.log("cart items");
			console.log(data)
		}
	});
	
});

 module.exports = router;










// const express = require("express");
// const router = express();
// const app = require('../app');

// const AddToCart = require('../Models/CartModel');

// app.post('/getcartitem', (req, res) => {

//     AddToCart.find({ userid: req.body.customerid  }, (error, cartitems) => {
	   
// 		if (error) {   
// 			res.writeHead(500, {
// 				'Content-Type': 'text/plain'
// 			})
// 			res.send();
// 		}
// 		if (cartitems.length == 0 ) {
// 			res.send("") 
			
// 		}
// 		else if(cartitems.length > 0){
//             res.send(JSON.stringify(cartitems)) 
            
// 		}
// 	});

//   });
// module.exports = router;






    	

        


                                
