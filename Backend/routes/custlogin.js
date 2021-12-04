// login api for customer

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { auth } = require("../utils/passport");
const { secret } = require("../utils/config");
auth();
router.post('/', (req, res) => {

	console.log("Inside Login");
 
	kafka.make_request('customer_login', req.body, (err, data) => {
	// 	console.log("*****")
    //  console.log(data.message)
		if (err) {
		//   res.writeHead(400, {
		// 	"content-type": "text/plain",
		//   });
		  res.end("Invalid Credentials");
		}else if(data.message === "Customer Found"){
			// res.writeHead(200, {
			// 	"content-type": "text/plain",
			//   });
			const payload = {
                _id: data.result._id,
                username : data.result.username,
                email : data.result.email,
                phone : data.result.phone,
                about : data.result.about,
                nickname : data.result.nickname,
                dob :data.result.dob,
                address : data.result.address,
                city : data.result.city,
                state : data.result.state,
                country : data.result.country,
                message: data.message,
				loginType:"customer"
              };
			  const token = jwt.sign(payload, secret, {
				expiresIn: 1008000,
			  });
			  data.token = "JWT " + token;
			  res.status('200').send(JSON.stringify(data))
			// console.log("Login success");
		}else if(data.message === "Invalid credentials" || data.message === "Invalid User"){
			// res.writeHead(400, {
			// 	"content-type": "text/plain",
			//   });
			//res.send({ message: "Invalid credentials" });
			// console.log(JSON.stringify(data))
			  res.status('400').send(JSON.stringify(data))
		}
	});
	
});

module.exports = router;