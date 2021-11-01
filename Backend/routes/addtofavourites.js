//add customer favourite restaurants


const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth,(req, res) => {
 
	kafka.make_request('favourites', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  //res.end("Invalid Credentials");
		}else{
			console.log(data.message)
			res.send(JSON.stringify(data.message))
			//console.log("Add to cart success");
		}
	});
	
});

 module.exports = router;



// const express = require("express");
// const router = express();
//  const app = require('../app');

// const Favourites = require('../Models/FavouritesModel');


// app.post('/addtofavourites', (req, res) => {

// 	var customerfavourite = new Favourites({
// 		restaurantid:req.body.restaurantid,
// 		userid:req.body.customerid
// 	});
// 	Favourites.findOne({ restaurantid: req.body.restaurantid ,userid: req.body.customerid }, (error, favresult) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			res.send();
// 		}
// 		if (favresult) {
			
// 			 console.log("Already added as Favourites");
// 			 res.send({ message: "Already added as Favourites" });
			
// 		}
// 		else {
// 			customerfavourite.save((error, data) => {
// 				if (error) {
// 					// res.writeHead(500, {
// 					// 	'Content-Type': 'text/plain'
// 					// })
// 					res.send();
// 				}
// 				else {
// 					console.log("Added as Favourites");
// 					// res.writeHead(200, {
// 					// 	'Content-Type': 'text/plain'
// 					// })
// 					//res.send({message: "User Registration successful"});
// 				}
// 			});
// 		}
// 	});
//   });
	

// module.exports = router;


