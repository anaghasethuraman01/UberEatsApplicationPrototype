// import React, { Component } from 'react';

import React, {Component} from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
import {Modal} from 'react-bootstrap';
import axios from 'axios';
import { Button,Input } from 'reactstrap';
import backendServer from "../../webConfig";
import { CountryDropdown } from 'react-country-region-selector';
import validator from 'validator';
class CustomerEditProfile extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
            customerDetails:JSON.parse(localStorage.getItem("CustomerDetails")) ,
            userid:null,
            profilepic:null,
            loading: false,
            output: null
        }
        // this.state.email = localStorage.getItem("email");
        // this.state.username = localStorage.getItem("username");
        
      }
      sendRestAPI = (data) => {
        console.log("here")
        axios.defaults.headers.common.authorization = localStorage.getItem('token');
        axios.post(`${backendServer}/editcustomer`, data)
            .then(res => {
               console.log("edit details");
              // console.log(res.data);
                if(res.data.message){
                    this.setState({message:res.data.message})
                }
                
            }).catch(
                (error) => {
                  console.log(error);
                }
            );
            // const {history} = this.props;
            // history.push('/customerprofile'); 
    }
  

    nullOrEmpty(str) {
        return str === null || str === "" || str === "Add"
    }


    validateProfile = () => {
           let isValid = true;
           if(this.state.customerDetails.email === null ||
                this.nullOrEmpty(this.state.customerDetails.about) ||
                this.nullOrEmpty(this.state.customerDetails.username) ||  this.nullOrEmpty(this.state.customerDetails.phone)
                ||  this.nullOrEmpty(this.state.customerDetails.dob) ||  this.nullOrEmpty(this.state.customerDetails.nickname) 
                ||  this.nullOrEmpty(this.state.customerDetails.address) ||  this.nullOrEmpty(this.state.customerDetails.state)
                ||  this.nullOrEmpty(this.state.customerDetails.city) ||  this.nullOrEmpty(this.state.customerDetails.country))
            {
              alert("Fields cannot be empty");
              isValid = false;
            }
            else
              {
                if (!validator.isEmail(this.state.customerDetails.email)) {
                alert('Enter valid Email!')
                isValid = false;
                }
                // if(this.state.customerDetails.phone.match(/\d/g).length !== 10){
                //   alert('Phone number should only be 10 numbers!')
                //   isValid = false;
                // }
            } 
        
        return isValid;
     }
     handleChangeName = (e) =>{
      const { customerDetails }= this.state;
      customerDetails.username = e.target.value;
      this.setState({customerDetails});
      
    } 
    handleChangenickame = (e) =>{
      const { customerDetails }= this.state;
      customerDetails.nickname = e.target.value;
      this.setState({customerDetails});
      
    } 
    handleChangeabout = (e) =>{
      const { customerDetails }= this.state;
      customerDetails.about = e.target.value;
      this.setState({customerDetails});
      
    } 
    handleChangeemail = (e) =>{
      const { customerDetails }= this.state;
      customerDetails.email = e.target.value;
      this.setState({customerDetails});
      
    } 
    handleChangephone = (e) =>{
      const { customerDetails }= this.state;
      customerDetails.phone = e.target.value;
      this.setState({customerDetails});
      
    } 
    handleChangedob = (e) =>{
      const { customerDetails }= this.state;
      customerDetails.dob = e.target.value;
      this.setState({customerDetails}); 
    } 
    handleChangeaddress = (e) =>{
      const { customerDetails }= this.state;
      customerDetails.address = e.target.value;
      this.setState({customerDetails}); 
    } 
    handleChangecity = (e) =>{
      const { customerDetails }= this.state;
      customerDetails.city = e.target.value;
      this.setState({customerDetails}); 
    } 
    handleChangestate = (e) =>{
      const { customerDetails }= this.state;
      customerDetails.state = e.target.value;
      this.setState({customerDetails}); 
    } 
    handleChangeCountry = (val) =>{
      const { customerDetails }= this.state;
      customerDetails.country = val;
      this.setState({customerDetails}); 
    } 

      handleSubmit = (e) => {
        e.preventDefault();
        
        
         if (this.validateProfile() === true){
              const customerData = {
              userid:this.state.customerDetails.userid,
              username: this.state.customerDetails.username,
              email:this.state.customerDetails.email ,
              about: this.state.customerDetails.about,
              phone:this.state.customerDetails.phone,
              nickname:this.state.customerDetails.nickname,
              dob:this.state.customerDetails.dob,
              state:this.state.customerDetails.state,
              city:this.state.customerDetails.city,
              address:this.state.customerDetails.address,
              country:this.state.customerDetails.country,
              
          }
          
        console.log(customerData)
        localStorage.setItem("username",this.state.customerDetails.username);
        this.sendRestAPI(customerData);
        
        this.setState({
          show : true 
        });
         }        
      
    }
 
      // goback = (e) =>{
      //   e.preventDefault();
      //   const {history} = this.props;
      //   history.push('/customerprofile'); 
      // }
      // handleChange = (e) => {
      //   this.setState({ [e.target.name]: e.target.value });
      //   }
        goback = (e) =>{
          
          e.preventDefault();
          const {history} = this.props;
          history.push('/customerprofile'); 
        }
        saveFile = (e) => {
          e.preventDefault();
          this.setState({file:e.target.files[0]});
          this.setState({fileName:e.target.files[0].name});
          
        };
        handleModalClose(){
          this.setState({show:!this.state.show}) 
          const {history} = this.props;
          history.push('/customerprofile'); 
      }
        uploadFile = (e) => {
          e.preventDefault();
          const formData = new FormData();
          if(this.state.file !== undefined && this.state.fileName !== undefined){
            formData.append("file", this.state.file,this.state.fileName);
            formData.append("userid", this.state.customerDetails.userid);
          }
          else{
            alert("No Image inserted");
            return;
          }
         
         this.sendImageAPI(formData);        
        }
        sendImageAPI = (data) => {
          axios.post( `${backendServer}/custimageupload`, data)
              .then(res => {
              console.log(res.data);
                 this.setState({profilepic:res.data});
                localStorage.setItem("profilepic",res.data);
                console.log(this.state.profilepic);
              })
            }
     
    render(){

    return (
     
         <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Customer Profile</h2>

              </div>

              <div className="form-group">

              Profile pic:
              <input className="filefolder" type="file" onChange={this.saveFile} />
              <button onClick={this.uploadFile}>Upload</button>  
              <Button onClick = {this.goback}>Go Back</Button>
        
              </div>
              <div className="form-group">

              Customer Name: <Input className="form-control" type="text" name="username" value={this.state.customerDetails.username} onChange={(e) => { this.handleChangeName(e)}} ></Input>
               
              </div>
              <div className="form-group">
              Nick Name: <Input type="text" className="form-control" name="nickname" value={this.state.customerDetails.nickname} onChange={(e) => { this.handleChangenickame(e)}} ></Input>
              </div>
              <div className="form-group">
              About : <textarea type="text" className="form-control" name="about" defaultValue={this.state.customerDetails.about} onChange={(e) => { this.handleChangeabout(e)}}/>
              </div>
              <div className="form-group">
              Email:<Input type="text" className="form-control" name="email" value= {this.state.customerDetails.email} onChange={(e) => { this.handleChangeemail(e)}} />
              </div>
              <div className="form-group">
              Phone: <Input type="number" className="form-control" name="phone" defaultValue={this.state.customerDetails.phone} onChange={(e) => { this.handleChangephone(e)}} ></Input>
              </div>
              <div className="form-group">
              DoB: <input type="date" className="form-date" name="dob" defaultValue={this.state.customerDetails.dob} onChange={(e) => { this.handleChangedob(e)}} />
              </div>
              <div className="form-group">
              Apt and Street No: <Input type="text" className="form-control" name="address" defaultValue={this.state.customerDetails.address} onChange={(e) => { this.handleChangeaddress(e)}} ></Input>
              </div>
              <div className="form-group">
              City: <Input type="text" className="form-control" name="city" defaultValue={this.state.customerDetails.city} onChange={(e) => { this.handleChangecity(e)}} ></Input>
              </div>
              <div className="form-group">
              State: <Input type="text" className="form-control" name="state" defaultValue={this.state.customerDetails.state} onChange={(e) => { this.handleChangestate(e)}} ></Input>
              </div>
             
              <div className="form-group">
              Country :
              <CountryDropdown className="form-control"
                    value={this.state.customerDetails.country}
                    onChange={(val) => { this.handleChangeCountry(val)}}
                     
                  />

             
              </div>
             
              <Button onClick = {this.handleSubmit}>Update Profile</Button>

              <Button onClick = {this.goback}>Back</Button>
              <div>
               <Modal size="md-down"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={()=>this.handleModalClose()}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <h1>Profile Updated Successfully!</h1>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
          </div>
        </div>
    )
    }
   
}
 
export default CustomerEditProfile;