// loading all restuarant with given dishname and dishtype



const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth, (req, res) => {
   
	kafka.make_request('restaurantsearch',req.body, (err, data) => {	
		
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  res.end();
		}else{

			res.send(data)
			// console.log("Res success");
            // console.log(data)
		}
	});
	
});

module.exports = router;
// const express = require("express");
// const router = express();
// const app = require('../app');

// const Dishes = require('../Models/DishModel');
// const Restaurants =  require('../Models/RestaurantModel');

// router.post('/', (req, res) => {
//     const searchtype = req.body.search;
//     var mySet1 = new Set();
//     var arr = [];
//     if(searchtype === "dish"){
//         Dishes.find({
//             dishname: req.body.dish
//          }).populate({ path: 'restaurantid', model: Restaurants }).exec((error, data) =>{
//              for(var i = 0; i< data.length; i++){
//                 mySet1.add(data[i].restaurantid)
//              }
//              arr = Array.from(mySet1);
//             console.log(arr) 
//         res.send(arr);
//          })
//     }else 
//     if(searchtype === "foodtype"){
//     Dishes.find({
//         foodtype: req.body.foodtype
//      }).populate({ path: 'restaurantid', model: Restaurants }).exec((error, data) =>{
//          for(var i = 0; i< data.length; i++){
//             mySet1.add(data[i].restaurantid)
//          }
//          arr = Array.from(mySet1);
//         console.log(arr) 
//     res.send(arr);
//      })
//     }
//     else if(searchtype === "dishandtype"){
//         Dishes.find({
//             foodtype: req.body.foodtype, dishname : req.body.dish
//          }).populate({ path: 'restaurantid', model: Restaurants }).exec((error, data) =>{
//              for(var i = 0; i< data.length; i++){
//                 mySet1.add(data[i].restaurantid)
//              }
//              arr = Array.from(mySet1);
//             console.log(arr) 
//         res.send(arr);
//          })
//     }

// });
// module.exports = router;

