//register page for customer and restuarant
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post("/", (req, res) => {
	const customerid = req.body.customerid;
    const restid = req.body.restid;
    let favourite = {
        customerid: customerid,
        restaurantid:restid
    };

	let sql = "INSERT INTO customerfavourite SET ?";
	connection.query(sql, favourite, (error, result) => {
		if (error) {
			res.send({message:"already added as favourites"});
			console.log("already added as favourites");
		} 
        else {
            
            console.log("Favourites added");
		}
	});	
	
});
module.exports = router;