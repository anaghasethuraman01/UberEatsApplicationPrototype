
// viewing dishes menu from restaurant page
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    const orderid = req.body.orderid; 
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });

    let sql1 = "SELECT price,dishname,quantity FROM orderdetails WHERE "
    + " orderid = " + mysql.escape(orderid) ;
    console.log(sql1);
    let query = connection.query(sql1, (error, result) => {
	
    if (error) {
            console.log(error.message)
                // res.send({ error: error });
        }
		//console.log(JSON.stringify(result));	
		res.end(JSON.stringify(result));
	});


	// let sql1 = "SELECT price,dishname,quantity FROM orderdetails o "
    // + " JOIN restaurantdishes r ON r.dishid = o.dishid WHERE "
    // + " orderid = " + mysql.escape(orderid) ;
    // console.log(sql1);
    // let query = connection.query(sql1, (error, result) => {
	
    // if (error) {
    //         console.log(error.message)
    //             // res.send({ error: error });
    //     }
	// 	//console.log(JSON.stringify(result));	
	// 	res.end(JSON.stringify(result));
	// });
   
    
});
module.exports = router;