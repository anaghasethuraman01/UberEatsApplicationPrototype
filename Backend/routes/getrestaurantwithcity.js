//loading all the restaurants for the customer

const express = require("express");
const router = express();
const app = require('../app');

const Restaurants = require('../Models/RestaurantModel');

app.post('/getrestaurantwithcity', (req, res) => {
	//console.log(req.body.city)
	Restaurants.find({city : req.body.city}, (error, rest_results) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (rest_results) {
                          
            res.send(rest_results);
			 
		}
		else {
             var obj = {
                message : "No Dishes",  
            }   
            res.end(obj);
				
		}
	});
  });
module.exports = router;
// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');

// router.post('/', function(req,res){
//     //console.log("Inside Near you"); 
//     const city = req.body.city;   
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
// 	let sql1 = "SELECT * FROM restaurant WHERE CITY = "+mysql.escape(city) ;
//     let query = connection.query(sql1, (error, result) => {
	
//     if (error) {
//                 res.send({ error: error });
//         }
// 		//console.log(JSON.stringify(result));	
// 		res.end(JSON.stringify(result));
// 	});
   
    
// });
// module.exports = router;