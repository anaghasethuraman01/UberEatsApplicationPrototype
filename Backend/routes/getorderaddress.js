
   
//get order address

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth,(req, res) => {
  
	kafka.make_request('orderaddress', req.body, (err, data) => {
		console.log(data)
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  //res.end("Invalid Credentials");
		}else{
			res.end(JSON.stringify(data))
			console.log("Address");
		}
	});
	
});

 module.exports = router;
