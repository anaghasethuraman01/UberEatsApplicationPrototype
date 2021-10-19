// import React, { Component } from 'react';

import React, {Component} from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
import { Button,Input } from 'reactstrap';
import backendServer from "../../webConfig";
import validator from 'validator';
class RestaurantEditProfile extends Component {
    
    constructor(props){
        super(props);
  
       
       this.state = {
        restaurantDetails:JSON.parse(localStorage.getItem("RestaurantDetails")) ,
        restaurantid:null,
        profilepic:null,
        loading: false,
        output: null,
        deliverytypeb : null
        }
    
        // this.handleChange = this.handleChange.bind(this);
      }
      sendRestAPI = (data) => {
        
        axios.post(`${backendServer}/editrestaurant`, data)
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
      if(this.state.restaurantDetails.email === null ||
           this.nullOrEmpty(this.state.restaurantDetails.restaurantname) ||
           this.nullOrEmpty(this.state.restaurantDetails.zipcode) ||  this.nullOrEmpty(this.state.restaurantDetails.phone)
           ||  this.nullOrEmpty(this.state.restaurantDetails.description) ||  this.nullOrEmpty(this.state.restaurantDetails.timing) 
           ||  this.nullOrEmpty(this.state.restaurantDetails.deliverytype) 
           ||  this.nullOrEmpty(this.state.restaurantDetails.city) ||  this.nullOrEmpty(this.state.restaurantDetails.days)){

         alert("Fields cannot be empty");
         isValid = false;
       }
       else
              {
                if (!validator.isEmail(this.state.restaurantDetails.email)) {
                alert('Enter valid Email!')
                isValid = false;
                }
                if(this.state.restaurantDetails.phone.match(/\d/g).length !== 10){
                  alert('Phone number should only be 10 numbers!')
                  isValid = false;
                }
                if(this.state.restaurantDetails.zipcode.match(/\d/g).length !== 5){
                  alert('ZipCode should be 5 digits!')
                  isValid = false;
                }
            } 
        
        return isValid;
     }



     handleChangeName = (e) =>{
      const { restaurantDetails }= this.state;
      restaurantDetails.username = e.target.value;
      this.setState({restaurantDetails});
      
    } 
    handleChangedescription = (e) =>{
      const { restaurantDetails }= this.state;
      restaurantDetails.description = e.target.value;
      this.setState({restaurantDetails});
      
    } 
    handleChangetiming = (e) =>{
      const { restaurantDetails }= this.state;
      restaurantDetails.timing = e.target.value;
      this.setState({restaurantDetails});
      
    } 
    handleChangeemail = (e) =>{
      const { restaurantDetails }= this.state;
      restaurantDetails.email = e.target.value;
      this.setState({restaurantDetails});
      
    } 
    handleChangephone = (e) =>{
      const { restaurantDetails }= this.state;
      restaurantDetails.phone = e.target.value;
      this.setState({restaurantDetails});
      
    } 
    handleChangedays = (e) =>{
      const { restaurantDetails }= this.state;
      restaurantDetails.days = e.target.value;
      this.setState({restaurantDetails}); 
    } 
    handleChangedeliverytype = (e) =>{
      const { restaurantDetails }= this.state;
      restaurantDetails.deliverytype = e.target.value;
      this.setState({restaurantDetails}); 
    } 
    handleChangecity = (e) =>{
      const { restaurantDetails }= this.state;
      restaurantDetails.city = e.target.value;
      this.setState({restaurantDetails}); 
    } 
    handleChangezipcode = (e) =>{
      const { restaurantDetails }= this.state;
      restaurantDetails.zipcode = e.target.value;
      this.setState({restaurantDetails}); 
    } 
    handleChangefoodtype = (e) =>{
      const { restaurantDetails }= this.state;
      restaurantDetails.foodtype = e.target.value;
      this.setState({restaurantDetails}); 
    } 
      handleSubmit = (e) => {
        e.preventDefault();
        // if (this.validateProfile() === true){
          
          const restuarantData = {
            restaurantid: this.state.restaurantDetails.restaurantid,
            restaurantname: this.state.restaurantDetails.username,
            email: this.state.restaurantDetails.email,
            zipcode: this.state.restaurantDetails.zipcode,
            phone:this.state.restaurantDetails.phone,
            description:this.state.restaurantDetails.description,
            timing:this.state.restaurantDetails.timing,
            city:this.state.restaurantDetails.city,
            deliverytype:this.state.restaurantDetails.deliverytype,
            foodtype:this.state.restaurantDetails.foodtype,
            days:this.state.restaurantDetails.days,
            
          }     
        console.log(restuarantData)
        this.sendRestAPI(restuarantData);
        this.setState({
          show : true 
        });
        }
        
      //}
      // handleChange = (e) => {
      //   this.setState({ [e.target.name]: e.target.value });
      //   }
        goback = (e) =>{
          e.preventDefault();
          const {history} = this.props;
          history.push('/restaurantprofile'); 
        }
        saveFile = (e) => {
          e.preventDefault();
          this.setState({file:e.target.files[0]});
          this.setState({fileName:e.target.files[0].name});
          
        };
        handleModalClose(){
          this.setState({show:!this.state.show}) 
          const {history} = this.props;
          history.push('/restaurantprofile'); 
      }
   
    uploadFile = (e) => {
          e.preventDefault();
          const formData = new FormData();
          if(this.state.file !== undefined && this.state.fileName !== undefined){
            formData.append("file", this.state.file,this.state.fileName);
            formData.append("restaurantid", this.state.restaurantDetails.restaurantid);
          }
          else{
            alert("No Image inserted");
            return;
          }
          this.sendImageAPI(formData);        
        }
     sendImageAPI = (data) => {
          axios.post( `${backendServer}/restimageupload`, data)
              .then(res => {
              console.log(res.data);
                this.setState({profilepic:res.data});
                localStorage.setItem("restprofilepic",res.data);
                console.log(this.state.profilepic);
              })
            }
    render(){
    
    return (

      <div className="container">
      <div className="login-form">
        <div className="main-div">
          <div className="panel">
            <h2>Restuarant Profile</h2>

          </div>
 <div className="form-group">

              Profile pic:
              <input className="filefolder" type="file" onChange={this.saveFile} />
              <button onClick={this.uploadFile}>Upload</button>  
              <Button onClick = {this.goback}>Go Back</Button>
        
              </div>
          <div className="form-group">
          Restaurant Name: <Input className="form-control" type="text" name="restaurantname" value={this.state.restaurantDetails.username} onChange={(e) => { this.handleChangeName(e)}} ></Input>
          
          </div>
          <div className="form-group">
          Description : <textarea className="form-control" type="text" name="description" defaultValue={this.state.restaurantDetails.description} onChange={(e) => { this.handleChangedescription(e)}}/>
         
          </div>
         
          <div className="form-group">
          Email:<Input type="text" className="form-control" name="email" value= {this.state.restaurantDetails.email} onChange={(e) => { this.handleChangeemail(e)}} />
          </div>
          <div className="form-group">
          Phone: <Input type="number" className="form-control"  maxlength="10"  name="phone" defaultValue={this.state.restaurantDetails.phone} onChange={(e) => { this.handleChangephone(e)}} ></Input>
          </div>
          <div className="form-group">

          Timings : 
             <textarea className="form-control" type="text" name="timing" defaultValue={this.state.restaurantDetails.timing} onChange={(e) => { this.handleChangetiming(e)}}  />
          </div>
          <div className="form-group">
          Days :  
             <textarea className="form-control" type="text" name="days" defaultValue={this.state.restaurantDetails.days} onChange={(e) => { this.handleChangedays(e)}} />
          </div>
          <div className="form-group">
              Mode of Delivery :
            <select className="form-control" name="deliverytype" value={this.state.restaurantDetails.deliverytype} onChange={(e) => { this.handleChangedeliverytype(e)}}>
              <option value="">Select delivery type</option> 
              {/* <option value="Pick Up and Delivery">Pick Up and Delivery</option> */}
              <option value="Pick Up and Delivery">Pick up and Delivery</option>
              <option value="Pick Up">Pick Up</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
           <div className="form-group">
              Food Type :
            <select className="form-control" name="foodtype" name="foodtype"  value={this.state.restaurantDetails.foodtype} onChange={(e) => { this.handleChangefoodtype(e)}}>
              <option value="">Select food type</option> 
              <option value="Veg" >Veg</option>
              <option value="Non-veg"  >Non-veg</option>
              <option value="Vegan" >Vegan</option>
            </select>
          </div>
          <div className="form-group">
          City: <Input type="text"  className="form-control" name="city" defaultValue={this.state.restaurantDetails.city} onChange={(e) => { this.handleChangecity(e)}} ></Input>
          </div>
          <div className="form-group">
          Location Zip Code: <Input type="number" name="zipcode" defaultValue={this.state.restaurantDetails.zipcode} onChange={(e) => { this.handleChangezipcode(e)}} ></Input>
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
 
export default RestaurantEditProfile;