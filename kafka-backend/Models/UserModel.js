const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {type: String, required: true},
    email:    {type:String,required:true},
    password: {type: String, required: true},
    owner:{type: Boolean, required: true},
    about:{type: String, required: false},
    dob:{type:String,required: false},
    address:{type: String, required: false},
    state:{type: String, required: false},
    city:{type: String, required: false},
    country:{type: String, required: false},
    nickname:{type: String, required: false},
    phone:{type: Number, required: false},
    profilepic:{type:String,required:false}

},
{
    versionKey: false
});

const userModel = mongoose.model('customer', usersSchema);
module.exports = userModel;