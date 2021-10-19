//register page for customer and restuarant
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post("/", (req, res) => {
    console.log(req.body);
    const customerid = req.body.customerid;
    const restaurantid = req.body.restaurantid;
    const restaurantname = req.body.restaurantname;
    const customername = req.body.customername;
    const datetime = req.body.datetime;
    const address = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const orderDetails = req.body.orderDetails;
    const ordertype = req.body.ordertype;
    const totalorderprice = req.body.totalorderprice;
    const totalorderquantity = req.body.totalorderquantity;

    let post = {
        customerid:customerid,
        restaurantid:restaurantid,
        restaurantname:restaurantname,
        customername:customername,
        datetime:datetime,
        address:address,
        city:city,
        state:state,
        country:country,
        orderstatus: "Order Received",
        ordertype:ordertype,
        ordermodetype:"New Order",
        totalorderprice:totalorderprice,
        totalorderquantity:totalorderquantity
    }
    let sql = "INSERT INTO orders SET ?";
     connection.query(sql, post, (error, result) => {
     if (error) {
        console.log(error.message);

      } else {
         
          let sqlDet = 'INSERT INTO orderdetails(orderid,dishid,quantity,price,dishname) VALUES ?';
          let orderid = result.insertId;
          
          let records =[];
          orderDetails.forEach((element, index) => {
            records.push([orderid, element.dishid, element.quantity,element.price,element.dishname]);
          });
        //   console.log("****")
        // console.log(records);
            connection.query(sqlDet, [records], (error, resultdetails) => {
                if(error){
                    console.log(error.message)
                }
                else{
                    console.log("Details table updated");
                    sqldeletecart = "DELETE FROM placeorder WHERE customerid = "+ mysql.escape(customerid);
                    connection.query(sqldeletecart,(error, resultdelete)=>{
                        if(error){
                            console.log("unable to delete")
                        }else{
                            console.log("Deleted");
                        }
                    } ) 
                }
            })

       }
    });
    // let sql = "SELECT city,state,country FROM userdetails where userid = "+mysql.escape(customerid);
    // console.log(sql);
    // connection.query(sql,(error, result) => {
    //      console.log(result)
    //      if(result.length == 0 ){
    //          console.log("No address");
    //      }else{
    //         //  const address = result['city'];
    //         //  console.log(address)
    //         res.end(JSON.stringify(result));
    //     }
    // });
 
});
module.exports = router;