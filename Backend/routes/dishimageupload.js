//dish single image upload 
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

 const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null,'./uploads')    
    },
    filename: (req, file, callBack) => {
        callBack(null, new Date().toISOString()+file.originalname);
    }
})
var upload = multer({
    storage: storage
});


router.post("/", upload.single('file'), (req, res) => {
	const img = req.file.filename;
	const restaurantid = req.body.restaurantid;
    const dishname = req.body.dishname;
	
    if (!req.file) {
        console.log("No file upload");
    } else {
        
       
        // const img = req.file.filename;
		let sql = "UPDATE restaurantdishes SET dishimage = "+mysql.escape(img) +
               "  WHERE RESTAURANTID = "+mysql.escape(restaurantid) + " AND DISHNAME =  "
               + mysql.escape(dishname);
               console.log(sql);
			   connection.query(sql, (error, result) => {
				if(error){
					console.log(error.message);
				}else{
					//localStorage.setItem("profile",mysql.escape(img))
					//console.log(req.file.filename);
					//res.send(req.file.filename);
				}
            });

    }
});

module.exports = router;
