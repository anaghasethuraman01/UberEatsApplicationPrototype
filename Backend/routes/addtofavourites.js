// add customer favourite restaurants

const express = require("express");
const router = express();
 const app = require('../app');

const Favourites = require('../Models/FavouritesModel');


app.post('/addtofavourites', (req, res) => {

	var customerfavourite = new Favourites({
		restaurantid:req.body.restaurantid,
		userid:req.body.customerid
	});
	Favourites.findOne({ restaurantid: req.body.restaurantid ,userid: req.body.customerid }, (error, favresult) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			res.send();
		}
		if (favresult) {
			
			 console.log("Already added as Favourites");
			 res.send({ message: "Already added as Favourites" });
			
		}
		else {
			customerfavourite.save((error, data) => {
				if (error) {
					// res.writeHead(500, {
					// 	'Content-Type': 'text/plain'
					// })
					res.send();
				}
				else {
					console.log("Added as Favourites");
					// res.writeHead(200, {
					// 	'Content-Type': 'text/plain'
					// })
					//res.send({message: "User Registration successful"});
				}
			});
		}
	});
  });
	
// 	Favourites.create(customerfavourite, (error, favresult) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			console.log(error.message)
// 		}
// 		if (favresult) {
// 			console.log( "Favourites Added");
// 			res.send( "Favourites Added");
// 		}	
// 	});
// });
module.exports = router;


// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');

// router.post("/", (req, res) => {
// 	const customerid = req.body.customerid;
//     const restid = req.body.restid;
//     let favourite = {
//         customerid: customerid,
//         restaurantid:restid
//     };

// 	let sql = "INSERT INTO customerfavourite SET ?";
// 	connection.query(sql, favourite, (error, result) => {
// 		if (error) {
// 			res.send({message:"already added as favourites"});
// 			console.log("already added as favourites");
// 		} 
//         else {
            
//             console.log("Favourites added");
// 		}
// 	});	
	
// });
// module.exports = router;