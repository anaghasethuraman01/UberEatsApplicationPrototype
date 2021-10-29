"use strict";

const bcrypt = require('bcrypt');
const Users = require('../Models/UserModel');

function handle_request(req, callback){
  console.log(req)
  console.log("Inside login kafka");
  const res = {};
  Users.find({ email: req.email}, (error, custlogin) => {
    //console.log(custlogin)
    if (error) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        console.log('Failed to fetch data');
    }
    if (custlogin.length > 0) {

        var password_hash = custlogin[0].password;
        const verified = bcrypt.compareSync(req.password, password_hash);
        
        if(verified){
            var obj = {
                message : "Customer Found",
                result : custlogin[0],
            }    
            console.log('customer found');  
            callback(null, obj);          
           // res.send(obj);
        }else{
            var obj = {
                message : "Invalid credentials",
            } 
            callback(null, obj);    
            console.log( "Invalid credentials");  
            //res.send(obj);

        }
        
    }

    
    else if(custlogin.length == 0) {
        var obj = {
            message : "Invalid User",   
        }  
        callback(null, obj); 
        //res.send(obj);
        console.log( "Invalid User");  
    }
});
 

};

module.exports.handle_request = handle_request;