// //register page for restuarant

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();

router.post('/', (req, res) => {

	console.log("Inside Restaurant Register");
 
	kafka.make_request('restaurant_register', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  res.end("Invalid Credentials");
		}else{

			res.send(JSON.stringify(data))
			console.log("Register success");
		}
	});
	
});

 module.exports = router;

			
