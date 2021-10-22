//adding new order by deleting existing order

//edit customer profile

const express = require("express");
const router = express();
const app = require('../app');

const Carts = require('../Models/CartModel');

app.post('/handleneworder', (req, res) => {
	//console.log(req.body)
    newdish = {
        userid:req.body.customerid,
        restaurantid:req.body.restaurantid,
        dishid:req.body.dishid,
        dishname:req.body.dishname,
        dishprice : req.body.dishprice,
		quantity:req.body.quantity,
		quantityprice:req.body.quantityprice,
    }
    Carts.deleteMany({userid: req.body.customerid },(error, neworder) => {
        if (error) {
                res.writeHead(500, {
                	'Content-Type': 'text/plain'
                })
                console.log(error.message)
            }
            if (neworder) {
                Carts.create(newdish, (error, dishresult) => {
	   
                    if (error) {
                        // res.writeHead(500, {
                        // 	'Content-Type': 'text/plain'
                        // })
                        console.log(error.message)
                    }
                    if (dishresult) {
                        res.send({message: "New Dish Added"});
                    }	
                });
            }	
    });
	// var updateuser = {
    //     userid:req.body.userid,
	// 	username : req.body.username,
    //     nickname:req.body.nickname,
	// 	email:req.body.email,
	// 	phone:req.body.phone,
	// 	about:req.body.about,
	// 	dob:req.body.dob,
	// 	address:req.body.address,
    //     city:req.body.city,
    //     state:req.body.state,
    //     country:req.body.country,
		
    // };
    // console.log(updateuser)
    // Users.findOneAndUpdate({_id: req.body.userid },updateuser,(error, editcustomer) => {
	   
	// 	if (error) {
	// 		// res.writeHead(500, {
	// 		// 	'Content-Type': 'text/plain'
	// 		// })
	// 		console.log(error.message)
	// 	}
	// 	if (editcustomer) {
	// 		console.log("User Profile Edited.");
	// 	}	
    // });
	
  });
module.exports = router;





