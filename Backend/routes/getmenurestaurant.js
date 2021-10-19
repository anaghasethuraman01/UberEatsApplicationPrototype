
// viewing dishes menu from restaurant page
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    const restaurantid = req.body.restaurantid;
   
   // console.log("View dishes");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
	let sql1 = "SELECT * FROM restaurantdishes WHERE restaurantid = " +
    mysql.escape(restaurantid) ;
    let query = connection.query(sql1, (error, result) => {
	
    if (error) {
                res.send({ error: error });
        }
		//console.log(JSON.stringify(result));	
		res.end(JSON.stringify(result));
	});
   
    
});
module.exports = router;