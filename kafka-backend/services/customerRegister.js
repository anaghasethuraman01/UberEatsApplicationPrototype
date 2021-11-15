//customer register kafka service
"use strict";

const bcrypt = require('bcrypt');
const Users = require('../Models/UserModel');

function handle_request(req, callback){
    const password = bcrypt.hashSync(req.password, 10);
	var newuser = new Users({
		username : req.name,
		email:req.email,
		password:password,
		owner:req.owner,
	});
  
    Users.findOne({ email: req.email }, (error, register) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			callback(null, error);
		}
		if (register) {
            var obj = {
                message : "Email already exists",
                
            }    
            
            callback(null, obj); 
		}
		else {
		  newuser.save((error, data) => {
				if (error) {
					//res.send();
				}
				else {
                    var obj = {
                        message : "User Registration successful",
                        
                    }    
                    callback(null, obj); 
                    
	
				}
			});
		}
	});
     
 
};

module.exports.handle_request = handle_request;




