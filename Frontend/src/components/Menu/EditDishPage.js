// import React, { Component } from 'react';

import React, {Component} from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
import axios from 'axios';
import { Button,Input } from 'reactstrap';
import {Modal} from 'react-bootstrap';
import backendServer from "../../webConfig";

class EditDishPage extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
           selectedDish:JSON.parse(localStorage.getItem("SelectedDish")) ,
           dishid:null ,
           show:false 
        }
      }
    //   logout = e => {
    //     e.preventDefault();
    //     window.localStorage.clear();
    //     const {history} = this.props;
    //     history.push('/login'); 
    //   }
       
      handleModalClose(){
            this.setState({show:!this.state.show}) 
            const {history} = this.props;
            history.push('/restauranthome'); 
        }
    sendDishAPI = (data) => {
        console.log(data);
          axios.post(`${backendServer}/editrestaurantdishes`, data)
              .then(res => {
                  if(res.data.message){
                      this.setState({message:res.data.message})
                  }
              }).catch(
                  (error) => {
                    console.log(error);
                  }
                  );
    }
    handleChangeName = (e) =>{
        const { selectedDish }= this.state;
        selectedDish.dishname = e.target.value;
        this.setState({selectedDish});
        console.log(this.state.selectedDish);
    } 
    handleChangeIngrediants = (e) =>{
        const { selectedDish }= this.state;
        selectedDish.ingrediants = e.target.value;
        this.setState({selectedDish});
        console.log(this.state.selectedDish);
    } 

    handleChangePrice = (e) =>{
        const { selectedDish }= this.state;
        selectedDish.price = e.target.value;
        this.setState({selectedDish});
        console.log(this.state.selectedDish);
    } 

    handleDescription = (e) =>{
        const { selectedDish }= this.state;
        selectedDish.description = e.target.value;
        this.setState({selectedDish});
        //console.log(this.state.selectedDish);
    } 

    handleCategory = (e) =>{
        const { selectedDish }= this.state;
        selectedDish.category = e.target.value;
        this.setState({selectedDish});
        console.log(this.state.selectedDish);
    } 
    handlefoodtype = (e) =>{
        const { selectedDish }= this.state;
        selectedDish.foodtype = e.target.value;
        this.setState({selectedDish});
        console.log(this.state.selectedDish);
    } 
    nullOrEmpty(str) {
        return str === null || str === "" 
    }

    validateDish = () => {
        
        let isValid = true;
        if(this.nullOrEmpty(this.state.selectedDish.dishname) ||
             this.nullOrEmpty(this.state.selectedDish.ingrediants) ||  this.nullOrEmpty(this.state.selectedDish.price)
             ||  this.nullOrEmpty(this.state.selectedDish.description) ||  this.nullOrEmpty(this.state.selectedDish.category) 
             ||  this.nullOrEmpty(this.state.selectedDish.foodtype)){
    
           alert("Fields cannot be empty");
           isValid = false;
         }
      
        return isValid;
      }
    handleEditSubmit = (e) => {
        e.preventDefault();
        if (this.validateDish() === true){
            const dishdetails = {
                dishid:this.state.selectedDish._id,
                dishname:this.state.selectedDish.dishname,
                ingrediants:this.state.selectedDish.ingrediants,
                price:this.state.selectedDish.price,
                description:this.state.selectedDish.description,
                category:this.state.selectedDish.category,
                foodtype:this.state.selectedDish.foodtype
            }
           
            this.sendDishAPI(dishdetails);
            this.setState({
                show : true 
              });
             

        }
        
    }
    goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restauranthome'); 
      }
    render(){
        
    return (
        <div className="container">
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2>Edit Dish</h2>
            </div>
              <div className="form-group">
                Dish Name: <Input className="form-control" type="text" name="dishname" defaultValue={this.state.selectedDish.dishname} onChange={(e) => { this.handleChangeName(e)}} required/>
          
                </div>
                <div className="form-group">

                Ingrediants: <Input className="form-control" type="text" name="ingrediants" defaultValue={this.state.selectedDish.ingrediants} onChange={(e) => { this.handleChangeIngrediants(e)}} required/>
                </div>
                <div className="form-group">
                
                Price: <Input className="form-control" type="number" name="price" defaultValue={this.state.selectedDish.price} onChange={(e) => { this.handleChangePrice(e)}} required/>
            
                </div>
                <div className="form-group">
                    Description: <Input className="form-control" type="text" name="description" defaultValue={this.state.selectedDish.description} onChange={(e) => { this.handleDescription(e)}} required/>
                </div>
                <div className="form-group">
                    Category: 
                        <select className="form-control" name="category" defaultValue={this.state.selectedDish.category} onChange={(e) => { this.handleCategory(e)}}>
                                <option value="">Category</option>
                                <option value="Appetizer">Appetizer</option>
                                <option value="salads">Salads</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Beverages">Beverages</option>
                        </select>
                </div>
                <div className="form-group">
                Food Type :
                    <select className="form-control" name="foodtype" name="foodtype"  value={this.state.selectedDish.foodtype} onChange={(e) => { this.handlefoodtype(e)}} >
                    <option value="">Select food type</option> 
                    <option value="Veg" >Veg</option>
                    <option value="Non-veg"  >Non-veg</option>
                    <option value="Vegan" >Vegan</option>
                    </select>
                </div>
                <div className="form-group">
                    <Button onClick={this.handleEditSubmit}>Edit Dish</Button>
                </div>
                    <Button onClick = {this.goback}>Back</Button>
                <div>
                    <Modal size="md-down"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={()=>this.handleModalClose()}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <h1>Dish Updated Successfully!</h1>
                        </Modal.Body>
                    </Modal>
                </div>
         </div>
        </div>
        {/* <Button className="btn-logout" onClick={this.logout}>Logout</Button> */}
        </div>
             
    )
    }
   
}
 
export default EditDishPage;