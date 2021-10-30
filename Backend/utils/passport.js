"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const Users = require('../Models/UserModel');
const Restaurants = require('../Models/RestaurantModel');
// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            const loginType = jwt_payload.loginType;
            
            console.log("I am here **********")
            console.log(user_id)
            console.log(loginType)
            if(loginType === "customer"){
                Users.findById(user_id, (err, results) => {
                    console.log("Cust profile **********")
                    if (err) {
                        return callback(err, false);
                    }
                    if (results) {
                        callback(null, results);
                    }
                    else {
                        callback(null, false);
                    }
                });
            }else if(loginType === restaurant){
                Restaurants.findById(user_id, (err, results) => {
                    console.log("Rest profile **********")
                    if (err) {
                        return callback(err, false);
                    }
                    if (results) {
                        callback(null, results);
                    }
                    else {
                        callback(null, false);
                    }
                });
            }
            
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


