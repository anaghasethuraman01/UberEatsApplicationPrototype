
// viewing dishes menu from restaurant page
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    const ordermodetype = req.body.ordermodetype; 
    const restaurantid = req.body.restaurantid;
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    
    let orderSearchSql = "SELECT * FROM orders where ordermodetype = "+mysql.escape(ordermodetype)
    +" AND restaurantid = "+mysql.escape(restaurantid);
	
     console.log(orderSearchSql);
    let query = connection.query(orderSearchSql, (error, result) => {
	
    if (error) {
            console.log(error.message)
                // res.send({ error: error });
        }
		//console.log(JSON.stringify(result));	
		res.end(JSON.stringify(result));
	});
   
    
});
module.exports = router;