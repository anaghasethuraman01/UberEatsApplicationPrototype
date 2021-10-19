const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    dishname: {type: String, required: true},
    ingrediants: {type:String,required:true},
    price: {type: String, required: true},
    description:{type: Boolean, required: true},
    category:{type:String,required:true},
    foodtype:{type:String,required:true},
    restaurantid:{type:Number,required:true}
},
{
    versionKey: false
});

const restaurantModel = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurantModel;