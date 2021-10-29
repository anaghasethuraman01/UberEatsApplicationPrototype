const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var addressTableSchema = new Schema({
    userid: {type: String, required: true},
    address: {type:String,required:true},
    city: {type:String,required:true},
    state: {type:String,required:true},
    country: {type:String,required:true},
},
{
    versionKey: false
});

const addressModel = mongoose.model('orderaddress', addressTableSchema);
module.exports = addressModel;