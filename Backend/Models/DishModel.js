const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dishSchema = new Schema({
    dishname: {type: String, required: true},
    ingrediants: {type:String,required:true},
    price: {type: String, required: true},
    description:{type: String, required: true},
    category:{type:String,required:true},
    foodtype:{type:String,required:true},
    restaurantid:{type:String,required:false}
},
{
    versionKey: false
});

const dishModel = mongoose.model('dish', dishSchema);
module.exports = dishModel;