//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    const dishid = req.body.dishid;
    const dishname = req.body.dishname;
    const ingrediants = req.body.ingrediants;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const foodtype = req.body.foodtype;
    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    let sql1 = "UPDATE restaurantdishes SET dishname = "+mysql.escape(dishname)
    +" , ingrediants =  " +mysql.escape(ingrediants)+" , price = "+mysql.escape(price)
    +" , description = "+mysql.escape(description) + " , category = "+mysql.escape(category)
    +" , foodtype = "+mysql.escape(foodtype) + " WHERE dishid = "+mysql.escape(dishid) ;
    console.log(sql1);  

    let query = connection.query(sql1, (error, result) => {
    if (error) {
        console.log(error.message)
                // res.send({ error: error });
        }
		console.log("Order status updated");
	});
});
module.exports = router;