//register page for customer and restuarant
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');
const bcrypt = require("bcryptjs");


router.post("/", (req, res) => {
	//console.log(req.body);
	const username = req.body.name;
	const email = req.body.email;
	const password = bcrypt.hashSync(req.body.password, 10);
	// const password = req.body.password;
	//const restaurantname = req.body.restaurantname;
	const zipcode = req.body.zipcode;
	const owner = req.body.owner;
	console.log(req.body);
	let sql = "SELECT * FROM users  WHERE EMAIL = " + mysql.escape(email);
	let query = connection.query(sql, (error, result) => {
		
		if (error) {
			console.log("Connection Error!");
		}
		if (result.length == 0) {
			let post = {
				username: username,
				email: email,
				password: password,
				zipcode: zipcode,
				owner: owner,
			};
			let sql = "INSERT INTO users SET ?";
			connection.query(sql, post, (error, result) => {
				if (error) {
					console.log("Error");
					//res.send({message:"Invalid credentials"})
				} else {
					console.log("USER ADDED");
					
					if(owner === false ){
						console.log("cust")
						let post_cust = {
                            userid :result.insertId,
                            username: username,
							email:email,
							owner:0
                           
                        };
						console.log(post_cust)
						let sql = "INSERT INTO userdetails SET ?";
                        connection.query(sql, post_cust, (error, result3) => {
                            //console.log("after insert");
                            //console.log(result3[0]);
                            if (error) {
                                console.log(error.message);
                                //res.send({message:"Invalid credentials"})
                            } else {
                                console.log("USER ADDED");
								res.send({message: "User Registration successful"});
                            }
						});
					}else if(owner === true){
						console.log("rest")
						let post_rest = {
                            restaurantid :result.insertId,
                            username: username,
                            email: email,
							owner:1,
							zipcode:zipcode,
                        };
						console.log(post_rest);
						let sql = "INSERT INTO restaurant SET ?";
                        connection.query(sql, post_rest, (error, result3) => {
                            //console.log("after insert");
                            //console.log(result3[0]);
                            if (error) {
                                console.log(error.message);
                                //res.send({message:"Invalid credentials"})
                            } else {
                                console.log("USER ADDED");
								res.send({message: "User Registration successful"});
                            }
						});

					}
				}
			});
		} else {
			res.send({ message: "User email already registered" });
		}
	});
});
module.exports = router;