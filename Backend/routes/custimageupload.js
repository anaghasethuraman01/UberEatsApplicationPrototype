//customer image upload
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

 const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        console.log(req.body);
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
    console.log("image")
	const img = req.file.filename;
	const userid = req.body.userid;
	console.log(img);
    if (!req.file) {
        console.log("No file upload");
    } else {
        const img = req.file.filename;
		let sql = "UPDATE userdetails SET profilepic = "+mysql.escape(img) +
               "  WHERE USERID = "+mysql.escape(userid);
			   connection.query(sql, (error, result) => {
				if(error){
					console.log(error.message);
				}else{
					//localStorage.setItem("profile",mysql.escape(img))
					//console.log(req.file.filename);
					res.send(req.file.filename);

				}
            });

    }
});

module.exports = router;
