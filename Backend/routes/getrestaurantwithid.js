//loading all dishes for restaurant

const express = require("express");
const router = express();
const app = require('../app');

const Dishes = require('../Models/DishModel');

app.post('/getrestaurantwithid', (req, res) => {
	// console.log(req.body.restaurantid)
	Dishes.find({restaurantid : req.body.restaurantid}, (error, dish_results) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (dish_results) {
                          
            res.send(dish_results);
			 
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
//     const restaurantid = req.body.restaurantid;   
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
// 	let sql1 = "SELECT * FROM restaurantdishes WHERE restaurantid = "+mysql.escape(restaurantid) ;
//     let query = connection.query(sql1, (error, result) => {
	
//     if (error) {
//                 res.send({ error: error });
//         }
// 		//console.log(JSON.stringify(result));	
// 		res.end(JSON.stringify(result));
// 	});
   
    
// });
// module.exports = router;