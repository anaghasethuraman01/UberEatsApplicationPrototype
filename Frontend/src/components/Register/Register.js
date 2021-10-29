import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button ,Input} from 'reactstrap';
import { Redirect } from 'react-router';

import validator from 'validator';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userSignup ,restaurantSignup} from "../../actions/signupActions";
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchForm = this.switchForm.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }
    
    nullOrEmpty(str) {
        return str === null || str === "" 
    }
    validateCustRegister = () => {
        let isValid = true;
        if(this.nullOrEmpty(this.state.username)  || this.nullOrEmpty(this.state.email) ||  this.nullOrEmpty(this.state.password)){
        alert("Fields cannot be empty");
           isValid = false;
        }
        else{
            if (!validator.isEmail(this.state.email)) {
                alert('Enter valid Email!')
                isValid = false;
            }
            
            if(!this.state.username.match(/^[a-zA-Z ]+$/)){
                alert("Name can contain only alphabets")
                isValid = false;
            }
        } 
        return isValid;
     }
   
    handleSubmit = (e) => {
        e.preventDefault();

        const buyerData = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            //restaurantname: "N/A",
            city: "N/A",
            owner: false
        }

        const ownerData = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            //restaurantname: this.state.restaurantname,
            city: this.state.city,
            owner: true
        }
        console.log(ownerData);
        if (!this.state.owner) {   
                this.props.userSignup(buyerData);          
        } else {
                this.props.restaurantSignup(ownerData);   
        }

    }
    login = (e) => {
        e.preventDefault();
        // this.props.user.message = null;
        const {history} = this.props;
        history.push('/login'); 
    }
    //switch between user and owner sign up form
    switchForm = (e) => {
        (!this.state.owner) ? this.setState({ owner: true }) : this.setState({ owner: false });
    }

    render() {
        
        //localStorage.setItem("message",this.props.user.message)
        let redirectHome = null;
        var ownerForm = null;
        var userForm = null;
        var accountType = "Owner";
        let message = "";
        if(this.props.user){
            console.log(this.props.user.message)
            if(this.props.user.message === "User Registration successful"){
                redirectHome = <Redirect to="/Login" />
                this.props.user.message = null;
                message = null;
            }
            else{
                message = this.props.user.message;
                redirectHome = <Redirect to="/Register" />
                this.props.user.message = null;   
      
            }
        }else{
            message = "";
            this.props.user.message = null;   
            redirectHome = <Redirect to="/Register"/>
        }
        
        
        // if(this.state.message == "User email already registered"){
        //     alert("Email already exists");
        // }
        if (this.state.owner) {
            ownerForm =
           
            <div className="form-group">
                <div >
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                      
                  Restaurant Name:  <input type="text" className="form-control" name="username" onChange={this.handleChange} placeholder="Enter Restaurant Name" pattern="^[A-Za-z0-9 ]+$" required /> 
                  Email:  <input type="text" className="form-control" name="email" onChange={this.handleChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" required />
                  Password:  <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Password" required />
                  City: <input type="text" className="form-control" name="city" onChange={this.handleChange} placeholder="Enter location"  required />
                  <Button className="btn btn-primary" >Register</Button> &nbsp;
                 
                  </div>
        
                  </form>

                </div>
                </div>
            
            accountType = "User";
        } else{
            userForm =
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">

            Name: <input type="text" className="form-control" name="username" onChange={this.handleChange} placeholder="Enter Customer Name" pattern="^[A-Za-z0-9 ]+$" required />
            Email:  <input type="text" className="form-control" name="email" onChange={this.handleChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" required />
            Password:  <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Password" required />   
            <Button className="btn btn-primary" >Register</Button> &nbsp;
                  
            </div>
                  
                  
        
        </form>
         accountType = "Owner";
        }
       
        return (
            <div className ="body-login">
                {redirectHome}
           
            <div className="container">
              <div className="login-form">
                <div className="main-div">
                  <div className="panel">
                  <h1>Let's get started.</h1>
                    <p>Please enter required details to register.</p>
                  </div>
                  {userForm}
                  {ownerForm}
                
                  <Button onClick={this.switchForm}>Sign Up as {accountType}</Button>
                 
                  <h4>Already have an account?<Button  color="link" onClick={this.login}><h4>Login</h4></Button></h4>
                  <div  style={{color: "#ff0000"}}><h4>{message}</h4></div> 
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
Register.propTypes = {
    userSignup: PropTypes.func.isRequired,
    restaurantSignup: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
   
  };
  
  const mapStateToProps = (state) => {
    return {
      user: state.signup.user,
    };
  };
  
  export default connect(mapStateToProps, {userSignup,restaurantSignup})(Register);