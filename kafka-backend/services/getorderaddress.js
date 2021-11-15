//get order address



"use strict";
const Users = require('../Models/UserModel');
const Orders = require('../Models/OrderModel');


function handle_request(req, callback){

	
var res = {status: '', address : []};
	
Users.find({ _id: req.customerid },(error, getcustomeraddress) => {

     if (error) {
        callback(null, error);
     }
     if (getcustomeraddress) {
		res.status = 200;
         console.log("Address")   
		// console.log(getcustomeraddress)
		 for(let i=0; i<getcustomeraddress.length; i++){
			let addr = {
				address : getcustomeraddress[i].address,
				city : getcustomeraddress[i].city,
				state : getcustomeraddress[i].state,
				country : getcustomeraddress[i].country,
			};
			res.address.push(addr);
		}
		
			
	
	Orders.find({ userid: req.customerid },(error, getorderaddress) => {
			
		if (error) {
			res.status = '500';
			callback(null,res)
		}
		if (getorderaddress) {
			res.status = 200;
			console.log("Address 2")   
			for(let i=0; i<getorderaddress.length; i++){
				let addr = {
					address : getorderaddress[i].address,
					city : getorderaddress[i].city,
					state : getorderaddress[i].state,
					country : getorderaddress[i].country,
				};
				let j;
				for(j = 0 ;j<res.address.length; j++){
					if((res.address[j].address === getorderaddress[i].address)
					&&  (res.address[j].state === getorderaddress[i].state)
					&& (res.address[j].city === getorderaddress[i].city)
					&& (res.address[j].country === getorderaddress[i].country)) {
						break;
					}
				}
				if (j == res.address.length) {
					res.address.push(addr);
				}
				
			}
		}
	// console.log("address")
	// console.log(address)
	
	callback(null, res);
			
	});
}
			
});
};

module.exports.handle_request = handle_request;


// "use strict";
// const Users = require('../Models/UserModel');
// const Orders = require('../Models/OrderModel');

// function handle_request(req, callback){
// let address = [];

//  Users.findOne({ _id: req.customerid }, { address: 1, city: 1, state: 1,country:1 },(error, getcustomeraddress) => {
       
//      if (error) {
//          res.writeHead(500, {
//              'Content-Type': 'text/plain'
//          })
//          callback(null,res)
//      }
//      if (getcustomeraddress) {
//          //console.log("Address")   
//          address = address.concat(getcustomeraddress)
//          //callback(null, getcustomeraddress);
		
			
// 		}
			
// 	});
// 	Orders.find({ userid: req.customerid }, { address: 1, city: 1, state: 1,country:1 },(error, getorderaddress) => {
			
// 		if (error) {
// 			res.writeHead(500, {
// 			 'Content-Type': 'text/plain'
// 			})
// 			callback(null,res)
// 		}
// 		if (getorderaddress) {
// 			console.log("Address 2")   
// 			address	= address.concat(getorderaddress)
			
// 		}
			
// 	});
// 	console.log(address)
// 	callback(null, address);
// };

// module.exports.handle_request = handle_request;









// "use strict";
// const Users = require('../Models/UserModel');
// const Orders = require('../Models/OrderModel');

// function handle_request(req, callback){
// let address = [];

//  Users.findOne({ _id: req.customerid }, { address: 1, city: 1, state: 1,country:1 },(error, getcustomeraddress) => {
       
//      if (error) {
//          res.writeHead(500, {
//              'Content-Type': 'text/plain'
//          })
//          callback(null,res)
//      }
//      if (getcustomeraddress) {
//          //console.log("Address")   
//          address = address.concat(getcustomeraddress)
//          //callback(null, getcustomeraddress);
// 		Orders.find({ userid: req.customerid }, { address: 1, city: 1, state: 1,country:1 },(error, getorderaddress) => {
			
// 			if (error) {
// 				res.writeHead(500, {
// 				 'Content-Type': 'text/plain'
// 				})
// 				callback(null,res)
// 			}
// 			if (getorderaddress) {
// 				console.log("Address 2")   
// 				address	= address.concat(getorderaddress)
// 				console.log(address)
// 				callback(null, address);
// 			}
				
// 		});
			
// 		}
			
// 	});
// };

// module.exports.handle_request = handle_request;






