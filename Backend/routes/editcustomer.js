//edit customer profile

const express = require("express");
const router = express();
const app = require('../app');

const Users = require('../Models/UserModel');

app.post('/editcustomer', (req, res) => {
	
	var updateuser = {
        userid:req.body.userid,
		username : req.body.username,
        nickname:req.body.nickname,
		email:req.body.email,
		phone:req.body.phone,
		about:req.body.about,
		dob:req.body.dob,
		address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
		
    };
    console.log(updateuser)
    Users.findOneAndUpdate({_id: req.body.userid },updateuser,(error, editcustomer) => {
	   
		if (error) {
			// res.writeHead(500, {
			// 	'Content-Type': 'text/plain'
			// })
			console.log(error.message)
		}
		if (editcustomer) {
			console.log("User Profile Edited.");
		}	
    });
	
  });
module.exports = router;






// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');

// router.post("/", (req, res) => {
    	
//         const userid = req.body.userid
//         const username = req.body.username;
//         const email = req.body.email;
//         const phone = req.body.phone;
//         const about =  req.body.about;
//         const dob =  req.body.dob;
//         const state =  req.body.state;
//         const city =  req.body.city;
//         const address =  req.body.address;
//         const country =  req.body.country;
//         const nickname =  req.body.nickname;
//         console.log(address);
        
//         let sql1 = "UPDATE userdetails SET username = " +mysql.escape(username)
//         +" ,email =  "+mysql.escape(email)+ " ,phone = "+mysql.escape(phone)
//         +",about = "+mysql.escape(about)
//         +",dob = "+mysql.escape(dob)
//         +",state = "+mysql.escape(state)
//         +",nickname = "+mysql.escape(nickname)
//         +",country = "+mysql.escape(country)+
//         ",city = "+mysql.escape(city)+
//         ",address = "+mysql.escape(address) + "WHERE userid = "+mysql.escape(userid);
      
//         let query = connection.query(sql1, (error, result) => {
//             if (error) {
//                 console.log(error.message)
//                         // res.send({ error: error });
//                 }
//                 console.log("Customer profile updated");          
                
           
//                  let sql2 = "UPDATE users SET USERNAME = "+mysql.escape(username) +
//                   ", EMAIL = "+mysql.escape(email) + 
//                    "  WHERE USERID = "+mysql.escape(userid);
//                        // console.log(sql2);
//                         connection.query(sql2, (error, result4) => {
//                             if(error){
//                                 console.log(error.message);
//                             }else{
                                
//                                 console.log("userdetails updated");
            
//                             }
//                         });
            
//         });
        
//     });
//     module.exports = router;