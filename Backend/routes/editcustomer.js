// edit customer profile

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth, (req, res) => {

	console.log("Inside Edit Cust Profile");
 
	kafka.make_request('editcustomerprofile', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		 // res.end("Invalid Credentials");
		}else{

			//res.send(JSON.stringify(data))
			console.log("Edit success");
		}
	});
	
});

 module.exports = router;













// const express = require("express");
// const router = express();
// const app = require('../app');

// const Users = require('../Models/UserModel');

// app.post('/editcustomer', (req, res) => {
	
// 	var updateuser = {
//         userid:req.body.userid,
// 		username : req.body.username,
//         nickname:req.body.nickname,
// 		email:req.body.email,
// 		phone:req.body.phone,
// 		about:req.body.about,
// 		dob:req.body.dob,
// 		address:req.body.address,
//         city:req.body.city,
//         state:req.body.state,
//         country:req.body.country,
		
//     };
//     console.log(updateuser)
//     Users.findOneAndUpdate({_id: req.body.userid },updateuser,(error, editcustomer) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			console.log(error.message)
// 		}
// 		if (editcustomer) {
// 			console.log("User Profile Edited.");
// 		}	
//     });
	
//   });
// module.exports = router;





