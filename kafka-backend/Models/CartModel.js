const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartTableSchema = new Schema({
    userid: {type: String, required: true},
    restaurantid: {type:String,required:true},
    dishid: {type: String, required: true},
    dishprice:{type: Number, required: true},
    dishname:{type:String,required:true},
    quantity:{type:Number,required:true},
    quantityprice:{type:Number,required:false},
    deliverytype:{type:String,required:true}
},
{
    versionKey: false
});

const dishModel = mongoose.model('cart', cartTableSchema);
module.exports = dishModel;