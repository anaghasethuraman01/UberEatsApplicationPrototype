//loading restaurant details for the restaurant tab for customer
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    //console.log("Inside rest ");   
    const restid = req.body.restaurantid;     
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
	let sql1 = "SELECT * FROM restaurant WHERE restaurantid = "
     +mysql.escape(restid) ;
     //console.log(sql1)
     let query = connection.query(sql1, (error, result) => {
       //console.log(result)
    if (error) {
                res.send({ error: error });
        }
        //console.log(JSON.stringify(result));	
	 	res.end(JSON.stringify(result));
    });
    // let query = connection.query(sql1, (error, result) => {
	
    // if (error) {
    //             res.send({ error: error });
    //     }
	
	// });
   
    
});
module.exports = router;