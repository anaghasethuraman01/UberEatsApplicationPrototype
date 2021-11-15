//loading all dishes for restaurant

//login api for restuarant
const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth, (req, res) => {
 
	kafka.make_request('dishes_list', req.body, (err, data) => {
    
		if (err) {
		//   res.writeHead(400, {
		// 	"content-type": "text/plain",
		//   });
		  //res.end("Invalid Credentials");
		}else{

			res.status('200').send(JSON.stringify(data))
			//console.log("Login success");
		}
	});
	
});

module.exports = router;













// const express = require("express");
// const router = express();
// const app = require('../app');

// const Dishes = require('../Models/DishModel');

// app.post('/getrestaurantwithid', (req, res) => {
// 	// console.log(req.body.restaurantid)
// 	Dishes.find({restaurantid : req.body.restaurantid}, (error, dish_results) => {
	   
// 		if (error) {
// 			res.writeHead(500, {
// 				'Content-Type': 'text/plain'
// 			})
// 			res.send();
// 		}
// 		if (dish_results) {
                          
//             res.send(dish_results);
			 
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







