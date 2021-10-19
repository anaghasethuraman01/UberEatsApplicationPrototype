//loading all the restaurants for the customer

const express = require("express");
const router = express();
 const app = require('../app');

const Restaurants = require('../Models/RestaurantModel');

app.get('/getrestaurant', (req, res) => {
    //console.log(req.body)
	Restaurants.find( (error, restaurant_results) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			res.send();
		}
		if (restaurant_results) {
            // var obj = {
            //     message : "Customer Found",
            //     result : getcustomerprofile,
            // }                
            res.send(restaurant_results);
			
		}
		else {
             var obj = {
                message : "No Restaurants",  
            }   
            res.send(obj);
				
		}
	});
  });
module.exports = router;







// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');

// router.get('/', function(req,res){
//     //console.log("Inside Home Login");    
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
// 	let sql1 = "SELECT * FROM restaurant" ;
//     let query = connection.query(sql1, (error, result) => {
	
//     if (error) {
//                 res.send({ error: error });
//         }
// 		//console.log(JSON.stringify(result));	
// 		res.end(JSON.stringify(result));
// 	});
   
    
// });
// module.exports = router;