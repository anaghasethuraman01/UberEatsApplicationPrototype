var connection =  new require('./kafka/Connection');
var custlogin = require('./services/custlogin.js');
var restlogin = require('./services/restlogin.js');
var customerRegister = require('./services/customerRegister.js');
var restaurantRegister = require('./services/restaurantRegister.js');
var restaurantDish = require('./services/restaurantdish.js');
var getrestaurantwithid = require('./services/getrestaurantwithid.js');
var getrestaurant = require('./services/getrestaurant.js');
var getcustomerprofile = require('./services/getcustomerprofile.js');
var getrestaurantprofile = require('./services/getrestaurantprofile.js');
var getrestaurantwithcity = require('./services/getrestaurantwithcity.js');
var editcustomer = require('./services/editcustomer.js');
var editrestaurant = require('./services/editrestaurant.js');
var editrestaurantdishes = require('./services/editrestaurantdishes.js');
var addtocarttable = require('./services/addtocarttable.js');
var getcartitem = require('./services/getcartitem.js');
var updatedishquantity = require('./services/updatedishquantity.js');
var handleneworder = require('./services/handleneworder.js');
var addtofavourites = require('./services/addtofavourites.js');
var getfavouriterestaurant = require('./services/getfavouriterestaurant.js');
var getorderaddress = require('./services/getorderaddress.js');
var placeorder = require('./services/placeorder.js');
var getitemsfromorders = require('./services/getitemsfromorders.js');
var getorderreceipt = require('./services/getorderreceipt.js');
var getrestaurantorders = require('./services/getrestaurantorders.js');
var handleordersearch = require('./services/handleordersearch.js');
var updateorderstatus = require('./services/updateorderstatus.js');
var uploadprofilepic = require('./services/uploadProfilePic.js');


const { mongoDB } = require('./config');
const mongoose = require('mongoose');
 const { Console } = require('console');

var options = {
    keepAlive: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

//Route to handle Post Request Call
function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

handleTopicRequest("customer_login", custlogin)
handleTopicRequest("restaurant_login", restlogin)
handleTopicRequest("customer_register", customerRegister)
handleTopicRequest("restaurant_register", restaurantRegister)
handleTopicRequest("restaurant_dish", restaurantDish)
handleTopicRequest("dishes_list", getrestaurantwithid)
handleTopicRequest("restaurant_list", getrestaurant)
handleTopicRequest("customer_profile", getcustomerprofile)
handleTopicRequest("restaurant_profile", getrestaurantprofile)
handleTopicRequest("restaurantcitylist", getrestaurantwithcity)
handleTopicRequest("editcustomerprofile", editcustomer)
handleTopicRequest("editrestaurantprofile", editrestaurant)
handleTopicRequest("editrestaurantdish", editrestaurantdishes)
handleTopicRequest("addtocart", addtocarttable)
handleTopicRequest("showcartitem", getcartitem)
handleTopicRequest("updatedishquantity", updatedishquantity)
handleTopicRequest("handleneworder", handleneworder)
handleTopicRequest("favourites",addtofavourites)
handleTopicRequest("getfavourites",getfavouriterestaurant)
handleTopicRequest("orderaddress",getorderaddress)
handleTopicRequest("placeorder",placeorder)
handleTopicRequest("customerorders",getitemsfromorders)
handleTopicRequest("orderreceipt",getorderreceipt)
handleTopicRequest("restaurantorders",getrestaurantorders)
handleTopicRequest("handleordersearch",handleordersearch)
handleTopicRequest("updateorderstatus",updateorderstatus)
handleTopicRequest("uploadprofilepic",uploadprofilepic)
