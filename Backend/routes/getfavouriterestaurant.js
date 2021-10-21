//loading favourite restaurants 

const express = require("express");
const router = express();
const app = require('../app');

const Restaurants = require('../Models/RestaurantModel');
const Favourites = require('../Models/FavouritesModel');
app.post('/getfavouriterestaurant', (req, res) => {
    //console.log(req.body.customerid)
	Favourites.find({userid : req.body.customerid},{restaurantid : 1}, (error, rest_results) => {
	   
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			res.send();
		}
		if (rest_results) {
                     
          
            var rest =[];
            for(var i = 0 ;i<rest_results.length;i++){
                var item = rest_results[i].restaurantid;
                if(!rest.includes(item)){  
                rest.push(item);  
                }  
            }
            Restaurants.find({_id : {$in : rest }}, (error, dish_results) => {
	   
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                   console.log(error.message)
                }
                if (dish_results) {
                    console.log(dish_results)           
                    //res.send(dish_results);
                    res.send(dish_results);
                     
                }
                
            });

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
     
//    const customerid =  req.body.customerid;
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
//   let sql1 = "SELECT restaurantid FROM customerfavourite WHERE customerid = "
//       +mysql.escape(customerid) ;
//       //console.log(sql1)
//       let query = connection.query(sql1, (error, result) => {
//           //console.log(result);
//            if (error) {
//                console.log("error")
                
//             } 
//             if(result.length > 0){
//                 var rest =[];
//                 for(var i = 0 ;i<result.length;i++){
//                     var item = JSON.stringify(result[i].restaurantid);
//                     if(!rest.includes(item)){  
//                     rest.push(item);  
//                     }  
//                 }
//                 //console.log(rest);
//                 let sql2 = "SELECT * FROM restaurant WHERE restaurantid IN ("
//                     + mysql.escape(rest) + " ) " ;
//                     //console.log(sql2);
//                     let query = connection.query(sql2, (error, result1) => {
//                     if (error) {
//                         res.send({ error: error });
//                     }else{
                        
//                         res.end(JSON.stringify(result1));
//                     }
//                 });
//             }
// 	    });  
// });
// module.exports = router;
