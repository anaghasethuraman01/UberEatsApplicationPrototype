import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies';
import {Input} from 'reactstrap';
import { Button } from 'react-bootstrap';
import backendServer from "../../webConfig";
import validator from 'validator';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLogin,restaurantLogin} from "../../actions/loginActions";
class Login extends Component {
 
    constructor(props) {
        super(props);
        this.state= {
            message : null
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
    
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

  
  
    handleSubmit = (e) => {
        e.preventDefault();
        // if (this.validateLogin() === true) {
        const credential = {
            email: this.state.email,
            password: this.state.password,
            usertype:this.state.usertype
        }
        
        if(credential.usertype === 'customer'){
            // console.log("customer")
            this.props.userLogin(credential);
        }else if(credential.usertype === 'restaurant'){
            this.props.restaurantLogin(credential);
            
        }else{
            alert("Provide valid user type");
        }
       // }
        
    }
    register = (e) => {
        e.preventDefault();
        //this.props.login.message = null;
        const {history} = this.props;
        history.push('/register'); 
    }
    render() {
        
        let redirectVar = null;
        let redirectHome = null;
        let message = ""
        if (cookie.load('cookie')) { 
            redirectHome = <Redirect to="/" />
           

        }
        if(this.props.login){
            
            if(this.props.login.message === "Customer Found"){
                redirectHome = <Redirect to="/CustomerHome" />
                localStorage.setItem("userid",this.props.login.result._id)
                localStorage.setItem("username",this.props.login.result.username)
                this.props.login.message = null;
                message = null;
            }else if(this.props.login.message === "Restaurant Found"){
                redirectHome = <Redirect to="/RestaurantHome" />
                localStorage.setItem("restaurantid",this.props.login.result.userid)
                this.props.login.message = null;
                message = null;
            }
            if(this.props.login.message === "Invalid credentials" ||this.props.login.message === "Invalid user" ){
                message = this.props.login.message;
            }
        }
       else{
            message = "";
            redirectHome = <Redirect to="/Login" />
        }


        return (
            
            
            <div className ="body-login">{redirectHome}
                {redirectVar}

            <div className="container">
            <div className="login-form">
            <div className="main-div">
            <div className="panel">
                <h1>Welcome to Uber Eats.</h1>
                <p>Please enter your email and password.</p>
            </div >
            <form onSubmit={this.handleSubmit}>
              Email :
            <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.handleChange}
                placeholder="Email Id"
                pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
                title="Please enter valid email address"
                required
              />
              Password : 
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.handleChange}
                placeholder="Password"
                required
              />
            <div className="form-group">
              <select className="usertype" name="usertype" value={this.state.value} onChange={this.handleChange}>
                        <option value="">User type</option>
                        <option value="customer">Customer</option>
                        <option value="restaurant">Restaurant</option>
                    </select>
                  </div> 
             
              <br />
              <button type="submit" className="btn btn-primary">
              Login
              </button>
              <h4>New to Uber Eats?<Button  variant="link" onClick={this.register}><h4>Create an account</h4></Button></h4>
              <div  style={{color: "#ff0000"}}><h4>{message}</h4></div> 
              </form>
            </div>
          </div>
        </div>
        </div>
        
        // </Col>
        // </Row>
        // </Container>
        )
    }
}

Login.propTypes = {
    userLogin: PropTypes.func.isRequired,
    restaurantLogin: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
    return {
      login: state.login.login,
    };
  };
  export default connect(mapStateToProps, {userLogin,restaurantLogin})(Login);