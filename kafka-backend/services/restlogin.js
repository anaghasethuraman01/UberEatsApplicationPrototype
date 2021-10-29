"use strict";

const bcrypt = require("bcryptjs");
const Restaurants = require('../Models/RestaurantModel');
function handle_request(req, callback){
    console.log(req)
    console.log("Inside rest login kafka");
    const res = {};
    Restaurants.find({ email: req.email}, (error, restlogin) => {
     
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          console.log('Failed to fetch data');
      }
      if (restlogin.length > 0) {
  
          var password_hash = restlogin[0].password;
          const verified = bcrypt.compareSync(req.password, password_hash);
          
          if(verified){
              var obj = {
                  message : "Restaurant Found",
                  result : restlogin[0],
              }    
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
      else if(restlogin.length == 0) {
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








