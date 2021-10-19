//restaurant login
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');
const bcrypt = require("bcryptjs");
router.post("/", (request, res) => {
    console.log(request.body);
    const email = request.body.email;
    const password = request.body.password;

    const query="SELECT * from users where owner = 1 AND email=?";
    const params=[request.body.email]
    connection.query(query,params,(err,result1) => {
    if(err) throw err;
    //const encryptedpassword = bcrypt.hashSync(request.body.password, 10);
    var output={}
    if(result1.length!=0)
    {

        var password_hash=result1[0]["password"];
        const verified = bcrypt.compareSync(request.body.password, password_hash);
        if(verified)
        {
             let sql1 = "SELECT * FROM restaurant  WHERE EMAIL = " +
                 mysql.escape(email);
                 let query = connection.query(sql1, (error, result) => {
                    if (error) {
                        res.send({ error: error });
                    }
                    //console.log(result[0]);
                    if (result.length > 0) {
                        var obj = {
                            message : "Restaurant Found",
                            result : result[0],
                        }   
                       // console.log(obj);
                        res.send(obj);							
                    }
                });		

        }          
        else{
            output["status"]=0;
            output["message"]="Invalid password";
            var obj = {
                message : "Invalid credentials",
                
            }   
            res.send(obj);
        }          
    }else{
        var obj = {
            message : "Invalid user",
            
        } 
       res.send(obj);
    }




   
    // let sql = 
    //     "SELECT * FROM users  WHERE EMAIL = " +
    //     mysql.escape(email) +
    //     " AND PASSWORD = " +
    //     mysql.escape(password)+" AND OWNER = 1";
    //     let query = connection.query(sql, (error, result1) => {
    //         if (error) {
    //             console.log("Error here");
    //             res.send({ error: error });     
    //         }
    //     if (result1.length > 0) {
    //         let sql1 = "SELECT * FROM restaurant  WHERE EMAIL = " +
    //              mysql.escape(email);
    //              let query = connection.query(sql1, (error, result) => {
    //                 if (error) {
    //                     res.send({ error: error });
    //                 }
    //                 //console.log(result[0]);
    //                 if (result.length > 0) {
    //                     var obj = {
    //                         status : "found",
    //                         userid: result1[0].userid,
    //                         result : result[0],
    //                     }
    //                    // console.log(obj);
    //                     res.send(obj);							
    //                 }else{  
    //                          var obj = {
    //                             status : "notfound",
    //                             userid: result1[0].userid,
    //                             result : result1[0],
    //                         }
    //                      //  console.log(obj);
    //                         res.send(obj);
    //                 }	
    //                 if(result.length === 0){
    //                     let post = {
    //                         restaurantid :result1[0].userid,
    //                         username: result1[0].username,
    //                         email: result1[0].email,
    //                         zipcode: result1[0].zipcode,
                            
    //                     };
    //                     let sql = "INSERT INTO restaurant SET ?";
    //                     connection.query(sql, post, (error, result) => {
    //                         if (error) {
    //                             console.log(error.message);
    //                             //res.send({message:"Invalid credentials"})
    //                         } else {
    //                             console.log("USER ADDED");

    //                         }
    //                     });
    //                 }
    //             });		
                         
    //     } else {
    //         res.send({ message: "Invalid credentials" });
    //     }
     });
});
module.exports = router;