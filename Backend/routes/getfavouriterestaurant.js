//loading favourite restaurants 


const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth,(req, res) => {

	kafka.make_request('getfavourites', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  //res.end("Invalid Credentials");
		}else{

			res.send(data)
			console.log("cart items");
		}
	});
	
});

 module.exports = router;







// const express = require("express");
// const router = express();
// const app = require('../app');

// const Restaurants = require('../Models/RestaurantModel');
// const Favourites = require('../Models/FavouritesModel');
// app.post('/getfavouriterestaurant', (req, res) => {
//     //console.log(req.body.customerid)
// 	Favourites.find({userid : req.body.customerid},{restaurantid : 1}, (error, rest_results) => {
	   
// 		if (error) {
// 			res.writeHead(500, {
// 				'Content-Type': 'text/plain'
// 			})
// 			res.send();
// 		}
// 		if (rest_results) {
                     
          
//             var rest =[];
//             for(var i = 0 ;i<rest_results.length;i++){
//                 var item = rest_results[i].restaurantid;
//                 if(!rest.includes(item)){  
//                 rest.push(item);  
//                 }  
//             }
//             Restaurants.find({_id : {$in : rest }}, (error, dish_results) => {
	   
//                 if (error) {
//                     res.writeHead(500, {
//                         'Content-Type': 'text/plain'
//                     })
//                    console.log(error.message)
//                 }
//                 if (dish_results) {
//                     console.log(dish_results)           
//                     //res.send(dish_results);
//                     res.send(dish_results);
                     
//                 }
                
//             });

// 		}
// 		else {
//              var obj = {
//                 message : "No Dishes",  
//             }   
//             res.end(obj);
				
// 		}
// 	});
//   });
// module.exports = router;


