
//edit restaurant dishes
const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth, (req, res) => {

 
	kafka.make_request('editrestaurantdish', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		 // res.end("Invalid Credentials");
		}else{

			//res.send(JSON.stringify(data))
			console.log("Edit success");
		}
	});
	
});

 module.exports = router;


// const express = require("express");
// const router = express();
//  const app = require('../app');

// const Dishes = require('../Models/DishModel');

// app.post('/editrestaurantdishes', (req, res) => {
	
// 	var newdishes = {
//         dishid:req.body.dishid,
// 		dishname : req.body.dishname,
// 		ingrediants:req.body.ingrediants,
// 		price:req.body.price,
// 		description:req.body.description,
// 		category:req.body.category,
// 		foodtype:req.body.foodtype,
		
//     };
//     Dishes.findOneAndUpdate({_id: req.body.dishid },newdishes,(error, dishresult) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			console.log(error.message)
// 		}
// 		if (dishresult) {
// 			res.send({message: "New Dish Added"});
// 		}	
//     });
	
//   });
// module.exports = router;









