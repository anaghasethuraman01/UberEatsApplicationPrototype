const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favouriteSchema = new Schema({
    userid : {type:String, required:true},
    restaurantid : {type:String, required:true},
},
{
    versionKey: false
});

const FavouritesModel = mongoose.model('favourite', favouriteSchema);
module.exports = FavouritesModel;