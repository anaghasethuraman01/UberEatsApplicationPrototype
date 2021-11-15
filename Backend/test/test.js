

var supertest = require("supertest");
var app = require("../index");
 var server = supertest.agent("http://localhost:5000");
var chai = require("chai");
chai.use(require("chai-http"));
//var supertest = require("supertest");
//let server = require('../app');
var assert = require('assert');
describe('UberEats', function () {
  describe("Customer Login Test", () => {
  it('Incorrect password',(done) => {
    
    server.post("/custlogin")
          .send({ email: "anu@gmail.com", password: "nu" })
          .then(function (res) {
             assert.equal(res.status, 400);
              done();
          })
          .catch(done);
  });
});
describe("Valid User Test", () => {
  it('Invalid User',(done) => {
    
    server.post("/custlogin")
          .send({ email: "anvu@gmail.com", password: "nu" })
          .then(function (res) {
             assert.equal(res.status, 400);
              done();
          })
          .catch(done);
  });
});
describe("Valid Registration Test", () => {
  it('Existing e-mail',(done) => {
    
    server.post("/register")
          .send({ email: "anu@gmail.com", password: "nu" })
          .then(function (res) {
             assert.equal(res.status,404);
              done();
          })
          .catch(done);
  });
});
describe("Valid Profile", () => {
  it('Profile Exists',(done) => {
    
    server.post("/getcustomerprofile")
          .send({ _id:'61720800fc28fe32fcc4bafc' })
          .then(function (res) {
            
             assert.equal(res.status,200);
              done();
          })
          .catch(done);
  });
});
describe("Restaurant Dishes", () => {
  it('View Restaurant dishes',(done) => {
    
    server.post("/getrestaurantwithid")
          .send({restaurantid: "619072c60b29187784101eb5" })
          .then(function (res) {
            
             assert.equal(res.status,200);
              done();
          })
          .catch(done);
  });
});
})







//   //   describe("Valid Profile", () => {

//   //   describe("Restaurant Dishes", () => {
//   //     it("View Restaurant dishes", (done) => {
         
//   //       chai.request(server)
//   //           .post('/getrestaurantdishes')
//   //           .send({ restaurantid: "1000"})
//   //           .end((err, res) => {
//   //                 res.body.should.have.property('message').eql('No Dishes Found');
//   //             done();
//   //           });
//   //     });
//   //   });
//   //   describe("View Order", () => {
//   //     it("View Customer Orders", (done) => {
//   //       chai.request(server)
//   //           .post('/getrestaurantorders')
//   //           .send({ restaurantid: "1000"})
//   //           .end((err, res) => {
//   //                 res.body.should.have.property('message').eql('No Orders Found');
//   //             done();
//   //           });
//   //     });
//   //   });
    



// });
 
 
