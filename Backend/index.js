var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
// const app = require('./app');
//const express = require("express");

// app.use(express.static('uploads'));


const config = require('./utils/config');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0
};

mongoose.connect(config.mongoURI, options, (err, res) => {
  if (err) {
      console.log(err);
      console.log(`MongoDB Connection Failed`);
  } else {
      console.log(`MongoDB Connected`);
  }
});

const restlogin = require("./routes/restlogin");
const custlogin = require("./routes/custlogin");
const custregister = require("./routes/customerRegister");
const restregister = require("./routes/restaurantRegister");
const editrestaurant = require("./routes/editrestaurant");
const getrestaurant = require("./routes/getrestaurant");
const getrestaurantwithcity = require("./routes/getrestaurantwithcity");
const restaurantdish = require("./routes/restaurantdish");
const editcustomer = require("./routes/editcustomer");
// const custimageupload = require("./routes/custimageupload");
// const restimageupload = require("./routes/restimageupload");
// const dishimageupload = require("./routes/dishimageupload");
// const getrestaurantdetails = require("./routes/getrestaurantdetails");
// const restsearchonsubmit = require("./routes/restsearchonsubmit");
const addtofavourites = require("./routes/addtofavourites");
const getfavouriterestaurant = require("./routes/getfavouriterestaurant");
const addtocarttable = require("./routes/addtocarttable");
const getcartitem = require("./routes/getcartitem");
const handleneworder = require("./routes/handleneworder");
const getorderaddress = require("./routes/getorderaddress");
const placeorder = require("./routes/placeorder");
const getitemsfromorders = require("./routes/getitemsfromorders");
const getrestaurantorders = require("./routes/getrestaurantorders");
const getorderreceipt= require("./routes/getorderreceipt"); 
// const updateordertype = require("./routes/updateordertype");
// const handleordersearch = require("./routes/handleordersearch");
// const handleordermodesearch = require("./routes/handleordermodesearch");
const getrestaurantwithid = require("./routes/getrestaurantwithid")
const editrestaurantdishes = require("./routes/editrestaurantdishes")
const getcustomerprofile = require("./routes/getcustomerprofile")
const getrestaurantprofile = require("./routes/getrestaurantprofile")
const updatedishquantity = require("./routes/updatedishquantity");

app.use("/restlogin", restlogin);
app.use("/custlogin", custlogin);
app.use("/customerRegister", custregister);
app.use("/restaurantRegister", restregister);
app.use("/editrestaurant", editrestaurant);
app.use("/getrestaurant", getrestaurant);
app.use("/getrestaurantwithcity", getrestaurantwithcity);
app.use("/restaurantdish", restaurantdish);
app.use("/editcustomer", editcustomer);
// app.use("/custimageupload", custimageupload);
// app.use("/dishimageupload", dishimageupload);
app.use("/updatedishquantity", updatedishquantity);
// app.use("/getrestaurantdetails", getrestaurantdetails);  
// app.use("/restimageupload",restimageupload);
// app.use("/restsearchonsubmit",restsearchonsubmit);
app.use("/addtofavourites",addtofavourites);
app.use("/getfavouriterestaurant",getfavouriterestaurant);
app.use("/addtocarttable",addtocarttable);
app.use("/getcartitem",getcartitem);
app.use("/handleneworder",handleneworder);
app.use("/getorderaddress",getorderaddress);
app.use("/placeorder",placeorder);
app.use("/getitemsfromorders",getitemsfromorders);
app.use("/getrestaurantorders",getrestaurantorders);
app.use("/getorderreceipt",getorderreceipt);
// app.use("/updateordertype",updateordertype);
// app.use("/handleordersearch",handleordersearch);
// app.use("/handleordermodesearch",handleordermodesearch);
app.use("/getrestaurantwithid",getrestaurantwithid);
app.use("/editrestaurantdishes",editrestaurantdishes);
app.use("/getcustomerprofile",getcustomerprofile);
app.use("/getrestaurantprofile",getrestaurantprofile);

// app.listen(5000);
// console.log("Server Listening on port 5000");
const port = process.env.PORT || 5000;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});  

module.exports = app;