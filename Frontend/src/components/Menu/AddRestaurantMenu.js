import React, {Component} from 'react';
import axios from 'axios';
// import cookie from 'react-cookies';
import { Button, Input } from 'reactstrap';
import {Modal} from 'react-bootstrap';
import backendServer from "../../webConfig";

class AddRestaurantMenu extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantid:null,
          dishname:null,
          ingrediants:null,
          price:null,
          description:null,
          category:null,
          foodtype:null,
          show:false,
          showdish:false,
          dishid:''
        }
      }

      sendDishAPI = (data) => {
        localStorage.setItem("dishname",data.dishname);
        axios.defaults.headers.common.authorization = localStorage.getItem('token');
          axios.post(`${backendServer}/restaurantdish`, data)
              .then(res => {
                console.log(res.data)
                this.setState({dishid : res.data._id})
              //     if(res.data.message){
              //         this.setState({message:res.data.message})
              //     }
              }).catch(
                  (error) => {
                    console.log(error);
                  }
                  );
       }
    handleChange = (e) => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
  } 
  // logout = e => {
  //   e.preventDefault();
  //   window.localStorage.clear();
  //   const {history} = this.props;
  //   history.push('/login'); 
  // }
  nullOrEmpty(str) {
    return str === null || str === "" 
  }
  validateDish = () => {
         
    let isValid = true;
    if(this.nullOrEmpty(this.state.dishname) ||
         this.nullOrEmpty(this.state.ingrediants) ||  this.nullOrEmpty(this.state.price)
         ||  this.nullOrEmpty(this.state.description) ||  this.nullOrEmpty(this.state.category) 
         ||  this.nullOrEmpty(this.state.foodtype)){

       alert("Fields cannot be empty");
       isValid = false;
     }
  
    return isValid;
  }
      handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateDish() === true){
          const dishData = {
              restaurantid:localStorage.getItem("restaurantid"),
              dishname:this.state.dishname,
              ingrediants:this.state.ingrediants,
              price:this.state.price,
              description:this.state.description,
              category:this.state.category,
              foodtype:this.state.foodtype
          }
          this.sendDishAPI(dishData);
          this.setState({
            show : true 
          });
        }
        
      }
      goback = () =>{
        // e.preventDefault();
        const {history} = this.props;
        history.push('/restauranthome'); 
      }
      

      saveFile = (e) => {
        e.preventDefault();
        this.setState({file:e.target.files[0]});
        this.setState({fileName:e.target.files[0].name});
        
      };
      uploadFile = (e) => {
        e.preventDefault();
        console.log(localStorage.getItem("restaurantid"));
        const formData = new FormData();
        if(this.state.file !== undefined && this.state.fileName !== undefined){
          formData.append("file", this.state.file,this.state.fileName);
          formData.append("restaurantid", localStorage.getItem("restaurantid"));
          formData.append("dishname",localStorage.getItem("dishname"))
        } else{
          alert("No Image inserted");
          return;
        } 
       // console.log(customerData);
       this.sendImageAPI(formData);   
       this.setState({
        showdish : true 
      });     
      }
      sendImageAPI = (data) => {
        axios.post( `${backendServer}/images`, data)
            .then(response => {
              if(response.status === 200){
                var data1 = {
                  userid : this.state.dishid,
                  profileImg : response.data.imagePath,
                  usertype:"Dish"
                }
                axios.post( `${backendServer}/uploadProfilePic`, data1)
                .then(response1 =>{
                  console.log(response1.data)
                })
              }
            })
          }
   
      // sendImageAPI = (data) => {
      //   axios.post( `${backendServer}/dishimageupload`, data)
      //       .then(res => {
      //       console.log(res.data);
      //         //  this.setState({profilepic:res.data});
      //         // localStorage.setItem("profilepic",res.data);
      //        // console.log(this.state.profilepic);
      //       })
      //     }

          handleModalClose(){
            this.setState({show:!this.state.show}) 
        }
        handleModalCloseDish(){
          this.setState({showdish:!this.state.showdish}) 
      }
    render(){

    return (

      <div className="container">
      <div className="login-form">
        <div className="main-div">
          <div className="panel">
          <h1>Dish Details</h1>

          </div>

          <div className="form-group">
          Dish Name: <Input className="form-control" type="text" name="dishname" defaultValue={this.state.dishname} onChange={this.handleChange} required/>
          
          </div>
          <div className="form-group">

          Ingredients: <Input className="form-control" type="text" name="ingrediants" defaultValue={this.state.ingrediants} onChange={this.handleChange} required/>
           
          </div>
          <div className="form-group">
          
          Price: <Input className="form-control" type="number" name="price" defaultValue={this.state.price} onChange={this.handleChange} required/>
       
          </div>
          <div className="form-group">
          Description: <Input className="form-control" type="text" name="description" defaultValue={this.state.description} onChange={this.handleChange} required/>
          </div>
          <div className="form-group">
          Category: 
             <select className="form-control" name="category" value={this.state.value} onChange={this.handleChange}>
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
              <select className="form-control" name="foodtype" name="foodtype"  value={this.state.foodtype} onChange={this.handleChange} >
              <option value="">Select food type</option> 
              <option value="Veg" >Veg</option>
              <option value="Non-veg"  >Non-veg</option>
              <option value="Vegan" >Vegan</option>
            </select>
          </div>
          <div className="form-group">
          <Button onClick={this.handleSubmit}>Add new Dish</Button>
          </div>
          <div className="form-group">
          <Input className="filefolder" type="file" onChange={this.saveFile} required/>
            <Button onClick={this.uploadFile}>Upload Dish Image</Button>
          </div>
          <Button onClick = {this.goback}>Back</Button>
          <div>
               <Modal size="md-down"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={()=>this.handleModalClose()}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <h1>Dish Added Successfully!</h1>
                        </Modal.Body>
                </Modal>
            </div>
            <div>
               <Modal size="md-down"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.showdish} onHide={()=>this.handleModalCloseDish()}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <h1>Dish Image Added Successfully!</h1>
                        </Modal.Body>
                </Modal>
            </div>
            {/* <Button className="btn-logout" onClick={this.logout}>Logout</Button> */}
        </div>
      </div>
    </div>

    )
    }
   
}
 
export default AddRestaurantMenu;