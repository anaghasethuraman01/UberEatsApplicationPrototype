//searching restaurants based on dishname
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
   //console.log("Inside fav Search");   
   const customerid =  req.body.customerid;
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
  let sql1 = "SELECT restaurantid FROM customerfavourite WHERE customerid = "
      +mysql.escape(customerid) ;
      //console.log(sql1)
      let query = connection.query(sql1, (error, result) => {
          //console.log(result);
           if (error) {
               console.log("error")
                
            } 
            if(result.length > 0){
                var rest =[];
                for(var i = 0 ;i<result.length;i++){
                    var item = JSON.stringify(result[i].restaurantid);
                    if(!rest.includes(item)){  
                    rest.push(item);  
                    }  
                }
                //console.log(rest);
                let sql2 = "SELECT * FROM restaurant WHERE restaurantid IN ("
                    + mysql.escape(rest) + " ) " ;
                    //console.log(sql2);
                    let query = connection.query(sql2, (error, result1) => {
                    if (error) {
                        res.send({ error: error });
                    }else{
                        
                        res.end(JSON.stringify(result1));
                    }
                });
            }
	    });  
});
module.exports = router;
