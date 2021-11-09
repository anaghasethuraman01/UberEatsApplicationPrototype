const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderTableSchema = new Schema({
    userid: {type: String, required: true},
    restaurantid: {type:String,required:true},
    restaurantname: {type:String,required:true},
    customername: {type:String,required:true},
    address: {type:String,required:false},
    city: {type:String,required:false},
    state: {type:String,required:false},
    country: {type:String,required:false},
    ordertype: {type:String,required:true},
    totalorderquantity: {type:Number,required:true},
    totalorderprice: {type:Number,required:true},
    datetime: {type:String,required:true},
    orderstatus:{type:String,required:true},
    ordermodetype:{type:String,required:true},
    note:{type: String, required: false },
    orderdetails: [
        {
          dishid: { type: String, required: true },
          quantity: { type:Number,required: true},
          dishprice: { type:Number,required: true},
          dishname: {type: String, required: true },
        },
      ],
},

{
    versionKey: false
});

const orderModel = mongoose.model('order', orderTableSchema);
module.exports = orderModel;