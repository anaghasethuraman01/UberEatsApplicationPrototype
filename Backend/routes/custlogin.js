// login api for customer

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();

router.post('/', (req, res) => {

	console.log("Inside Login");
 
	kafka.make_request('customer_login', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  res.end("Invalid Credentials");
		}else{

			res.send(JSON.stringify(data))
			console.log("Login success");
		}
	});
	
});

module.exports = router;