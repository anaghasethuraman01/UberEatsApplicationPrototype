//inserting dishes into restaurant

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
router.post('/',checkAuth, (req, res) => {

	console.log("Add restaurant dish");
 
	kafka.make_request('restaurant_dish', req.body, (err, data) => {
    
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  res.end("Invalid Credentials");
		}else{

			res.send(JSON.stringify(data))
			console.log("Adding dish success");
		}
	});
	
});

 module.exports = router;

			


	   
		
			
		


