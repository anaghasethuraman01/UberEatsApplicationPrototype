//customer register kafka service
"use strict";

const Users = require('../Models/UserModel');
const Restaurants = require('../Models/RestaurantModel');
const Dishes = require('../Models/DishModel');
function handle_request(req, callback){
	console.log("In kafka Profile Pic upload")
	console.log(req)
	const userid = req.userid;
	const profileImg = req.profileImg;
	const usertype = req.usertype;
	if(usertype === "Customer"){
		Users.updateOne({_id: userid },{$set : {profilepic : profileImg}},(error, imageupload) => {
			if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			console.log(error.message)
			}
			if (imageupload) {
				//callback(null, dishresult);
				console.log({message: "Image Uploaded"});
			}
		})
	}else if(usertype === "Restaurant"){
		Restaurants.updateOne({_id: userid },{$set : {profilepic : profileImg}},(error, imageupload) => {
			if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			console.log(error.message)
			}
			if (imageupload) {
				//callback(null, dishresult);
				console.log({message: "Image Uploaded"});
			}
		})
	}else{
		Dishes.updateOne({_id: userid },{$set : {profilepic : profileImg}},(error, imageupload) => {
			if (error) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			})
			console.log(error.message)
			}
			if (imageupload) {
				//callback(null, dishresult);
				console.log({message: " Dish Image Uploaded"});
			}
		})
		
	}
	

	
};

module.exports.handle_request = handle_request;






