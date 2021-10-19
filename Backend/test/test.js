var assert = require("chai").assert;
var app = require("../index");
var supertest = require("supertest");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);
let server = require('../app');
let should = chai.should();
describe("UberEats", function () {
  describe("Customer Login Test", () => {
    it("Incorrect password", (done) => {
       
      chai.request(server)
          .post('/custlogin')
          .send({ email: "user1@gmail.com", password: "incorrect password" })
          .end((err, res) => {
                
                res.body.should.have.property('message').eql('Invalid credentials');
            done();
          });
    });
  });

  describe("Valid User Test", () => {
    it("Invalid User", (done) => {
       
      chai.request(server)
          .post('/custlogin')
          .send({ email: "userunknown@gmail.com", password: "incorrect password" })
          .end((err, res) => {
                
                res.body.should.have.property('message').eql('Invalid User');
            done();
          });
    });
  });
    describe("Valid Registration Test", () => {
      it("Existing e-mail", (done) => {
         
        chai.request(server)
            .post('/register')
            .send({ email: "user1@gmail.com", password: "incorrect password" ,username :"ana"})
            .end((err, res) => {
                  
                  res.body.should.have.property('message').eql('User email already registered');
              done();
            });
      });
    });
    describe("Valid Profile", () => {
      it("Profile Exists", (done) => {
         
        chai.request(server)
            .post('/getcustomerprofile')
            .send({ userid: "1000"})
            .end((err, res) => {
                  res.body.should.have.property('message').eql('No Profile Exists');
              done();
            });
      });
    });

    describe("Restaurant Dishes", () => {
      it("View Restaurant dishes", (done) => {
         
        chai.request(server)
            .post('/getrestaurantdishes')
            .send({ restaurantid: "1000"})
            .end((err, res) => {
                  res.body.should.have.property('message').eql('No Dishes Found');
              done();
            });
      });
    });
    describe("View Order", () => {
      it("View Customer Orders", (done) => {
        chai.request(server)
            .post('/getrestaurantorders')
            .send({ restaurantid: "1000"})
            .end((err, res) => {
                  res.body.should.have.property('message').eql('No Orders Found');
              done();
            });
      });
    });
    



});
 
 
