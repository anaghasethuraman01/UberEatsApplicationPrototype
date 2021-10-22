//get order address

//getting customer profile details

const express = require("express");
const router = express();
const app = require('../app');

const Users = require('../Models/UserModel');

app.post('/getorderaddress', (req, res) => {
    //console.log(req.body)
	Users.findOne({ _id: req.body.customerid }, { address: 1, city: 1, state: 1,country:1 },(error, getcustomeraddress) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			res.send();
		}
		if (getcustomeraddress) {
            // var obj = {
            //     message : "Customer Found",
            //     result : getcustomerprofile,
            // }                
            res.send(JSON.stringify(getcustomeraddress))
			
		}
		
	});
  });
module.exports = router;









// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');

// router.post("/", (req, res) => {
//     const customerid = req.body.customerid;
//     const restaurantid = req.body.restaurantid;
//     //console.log(req.body);
//     let sql = "SELECT address,city,state,country FROM userdetails where userid = "+mysql.escape(customerid) +
//     " UNION SELECT address,city,state,country FROM orders where customerid = "+mysql.escape(customerid);
//     console.log(sql);
//     connection.query(sql,(error, result) => {
//          console.log(result)
//          if(result.length == 0 ){
//              console.log("No address");
//          }else{
//             //  const address = result['city'];
//             //  console.log(address)
//             res.send(JSON.stringify(result));
//         }
//      });
 
// });
// module.exports = router;