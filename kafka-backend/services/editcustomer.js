//customer register kafka service
"use strict";

const Users = require('../Models/UserModel');

function handle_request(req, callback){
	console.log("In kafka update")
	console.log(req.username)

	var updateuser = {
        userid:req.userid,
		username : req.username,
        nickname:req.nickname,
		email:req.email,
		phone:req.phone,
		about:req.about,
		dob:req.dob,
		address:req.address,
        city:req.city,
        state:req.state,
        country:req.country,
		
    };
	// console.log("Update")
    console.log(updateuser)
    Users.findOneAndUpdate({_id: req.userid },updateuser,(error, editcustomer) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			console.log(error.message)
		}
		if (editcustomer) {
			callback(null, editcustomer);
			console.log("User Profile Edited.");
		}	
    });
	
};

module.exports.handle_request = handle_request;






