//fetching restaurant profile details
const express = require("express");
const router = express();
const app = require('../app');

const Restaurants = require('../Models/RestaurantModel');

app.post('/getrestaurantprofile', (req, res) => {
	//console.log(req.body.userid)
	Restaurants.findOne({ _id: req.body.userid }, (error, getprofile) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			res.send();
		}
		if (getprofile) {
            // var obj = {
            //     message : "Customer Found",
            //     result : getcustomerprofile,
            // }                
            res.send(getprofile);
			
		} 
		else {
             var obj = {
                message : "Invalid credentials",  
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

// router.post('/', function(req,res){
//     //console.log("Inside Near you"); 
//     const restaurantid = req.body.restaurantid;   
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
// 	let sql1 = "SELECT * FROM restaurant WHERE restaurantid = "+mysql.escape(restaurantid) ;
//     let query = connection.query(sql1, (error, result) => {
	
//     if (error) {
//                 res.send({ error: error });
//         }
// 		//console.log(JSON.stringify(result));	
// 		res.end(JSON.stringify(result));
// 	});
   
    
// });
// module.exports = router;