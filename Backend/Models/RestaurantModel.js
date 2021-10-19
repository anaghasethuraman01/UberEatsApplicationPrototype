const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    username: {type: String, required: true},
    email:    {type:String,required:true},
    password: {type: String, required: true},
    owner:{type: Boolean, required: true},
    city:{type:String,required:true}

},
{
    versionKey: false
});

const restaurantModel = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurantModel;