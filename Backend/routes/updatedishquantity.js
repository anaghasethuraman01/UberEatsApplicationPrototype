//update dish quantity
const express = require("express");
const router = express();
const app = require('../app');

const Carts = require('../Models/CartModel');

app.post('/updatedishquantity', (req, res) => {
	
	const quantity = req.body.quantity;
    const quantityprice = req.body.quantityprice;
    if( quantity == 0){
        
        Carts.deleteMany( { _id : req.body._id },(error, dishresult) => {
	   
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                console.log(error.message)
            }
            if (dishresult) {
                console.log({message: "Deleted"});
            }	
        });
    }
    else if( quantity > 0) {
        Carts.updateMany({_id: req.body._id },{$set : {quantity : req.body.quantity , quantityprice : quantityprice}},(error, dishresult) => {
	   
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                console.log(error.message)
            }
            if (dishresult) {
                console.log( "New Dish Added");
            }	
        });
    }
    
	
  });
module.exports = router;



