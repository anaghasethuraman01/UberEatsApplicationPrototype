// customer image upload
const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile,getFileStream} = require('../s3')


router.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})
router.post('/', upload.single('file'), async (req, res) => {
  // console.log("Customer Images")
  // console.log(req.file);
  const result = await uploadFile(req.file)
  console.log(result)
  res.send({imagePath : `/images/${result.Key}`})
})


module.exports = router;




// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');

//  const multer = require('multer');

// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         console.log(req.body);
//         callBack(null,'./uploads')    
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, new Date().toISOString()+file.originalname);
//     }
// })
// var upload = multer({
//     storage: storage
// });


// router.post("/", upload.single('file'), (req, res) => {})

// module.exports = router;
