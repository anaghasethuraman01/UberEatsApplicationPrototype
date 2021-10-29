var connection =  new require('./kafka/Connection');
var custlogin = require('./services/custlogin.js');
var restlogin = require('./services/restlogin.js');
var customerRegister = require('./services/customerRegister.js');
var restaurantRegister = require('./services/restaurantRegister.js');
var restaurantDish = require('./services/restaurantdish.js');
var getrestaurantwithid = require('./services/getrestaurantwithid.js');
var getrestaurant = require('./services/getrestaurant.js');
var getcustomerprofile = require('./services/getcustomerprofile.js');
const { mongoDB } = require('./config');
const mongoose = require('mongoose');
 const { Console } = require('console');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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