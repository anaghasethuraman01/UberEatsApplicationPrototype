//loading all restuarant with given dishname and dishtype

const express = require("express");
const router = express();
const app = require('../app');

const Dishes = require('../Models/DishModel');
const Restaurants =  require('../Models/RestaurantModel');

router.post('/', (req, res) => {
    const searchtype = req.body.search;
    
    if(searchtype === "dish"){
        Dishes.find({dishname : req.body.dish}, (error, dish_results) => {
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                res.send();
            }
            if (dish_results.length>0) {
                              
                const restaurantid = dish_results[0].restaurantid;
                Restaurants.find({_id : restaurantid}, (error, rest_results) => {
                    if (error) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        })
                        res.send();
                    }
                    if(rest_results.length > 0){
                        
                        res.send(JSON.stringify(rest_results));
                    }
                });
                 
            }
            else {
                res.send("No Dishes found");
            } 
        });
    }else 
    if(searchtype === "foodtype"){
    console.log(req.body.foodtype)
    console.log("*********** RESTAURANT SEARCH ***********")
        Dishes.find({foodtype : req.body.foodtype}, (error, food_results) => {
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                res.send();
            }
            console.log(food_results)
            if (food_results.length>0) {
                              
                const restaurantid = food_results[0].restaurantid;
                Restaurants.find({_id : restaurantid}, (error, rest_results1) => {
                    if (error) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        })
                        res.send();
                    }
                    if(rest_results1.length > 0){
                        console.log(rest_results1)
                        res.send(JSON.stringify(rest_results1));
                    }
                });
                 
            }
            else {
                res.send("No Dishes found");
            } 
        });
    }

});
module.exports = router;

