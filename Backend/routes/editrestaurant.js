//edit restaurant profile
const express = require("express");
const router = express();
const app = require('../app');

const Restaurants = require('../Models/RestaurantModel');

app.post('/editrestaurant', (req, res) => {
	
	var updaterestaurant = {
        restaurantid:req.body.restaurantid,
		restaurantname : req.body.restaurantname,
		email:req.body.email,
		phone:req.body.phone,
		zipcode:req.body.zipcode,
		timing:req.body.timing,
        days:req.body.days,
		address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        description:req.body.description, 
		deliverytype:req.body.deliverytype,
		foodtype:req.body.foodtype
    };
	console.log(updaterestaurant)

    Restaurants.findOneAndUpdate({_id: req.body.restaurantid},updaterestaurant,(error, editrestaurant) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			console.log(error.message)
		}
		if (editrestaurant) {
			console.log("User Profile Edited.");
		}	
    });
	
  });
module.exports = router;






// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');

// router.post("/", (req, res) => {
//    const restaurantid = req.body.restaurantid
//    const restaurantname = req.body.restaurantname;
//    const email = req.body.email;
//    const zipcode = req.body.zipcode;
//    const phone =  req.body.phone;
//    const description =  req.body.description;
//    const timing =  req.body.timing;
//    const city =  req.body.city;
//    const days =  req.body.days;
//    const deliverytype =  req.body.deliverytype;
//    const foodtype =  req.body.foodtype;
//    const profilepic = req.body.restprofilepic;


//     let sql1 = "UPDATE restaurant SET username = " +mysql.escape(restaurantname)
//     +" ,email =  "+mysql.escape(email)+ " ,phone = "+mysql.escape(phone)
//     +",zipcode = "+mysql.escape(zipcode)
//     +",description = "+mysql.escape(description)
//     +",timing = "+mysql.escape(timing)
//     +",deliverytype = "+mysql.escape(deliverytype)
//     +",foodtype = "+mysql.escape(foodtype)+
//     ",city = "+mysql.escape(city)+
//     ",days = "+mysql.escape(days) + "WHERE restaurantid = "+mysql.escape(restaurantid);
    
            
//     let query = connection.query(sql1, (error, result) => {
//         if (error) {
//             console.log(error.message)
//                     // res.send({ error: error });
//             }
//             console.log("Restaurant profile updated");
        
//            //console.log(restaurantid);
//             let sql2 = "UPDATE users SET USERNAME = "+mysql.escape(restaurantname) +
//              ", EMAIL = "+mysql.escape(email) + 
//              ", ZIPCODE =" +mysql.escape(zipcode) +
//               "  WHERE USERID = "+mysql.escape(restaurantid);
//            //console.log(sql2);
//            connection.query(sql2, (error, result4) => {
//                if(error){
//                    console.log(error.message);
//                }else{
                   
//                    console.log("column updated in users")
//                }
//            });
//         });
       
    
   
// });
// module.exports = router;