import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
// import cookie from 'react-cookies';
import axios from "axios";
import {Button, Modal,Card, ListGroup, ListGroupItem, Offcanvas} from "react-bootstrap";
import {CgProfile} from 'react-icons/cg';
import {BiDish} from 'react-icons/bi';
import {BiFoodMenu} from 'react-icons/bi';
import {AiOutlineHome} from 'react-icons/ai';


class LaunchRestaurant extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
    
         
            show:false,
            message:null,
            sideshow:false,
           
          }
      }
    
       
     
   
  
  handleShow = ()=>{
    this.setState({
      sideshow:true
    });
  }
  handleClose= () => {
    this.setState({
      sideshow:false
    });
 }
 
  
     
     
      
      
    render(){
        const { closeRestaurantCanvas, viewRestaurantLaunch ,restaurantprofile,restaurantorders,addnewdish,restauranthome} = this.props;


     
    return (
      
    <div className="container">
            
      <Offcanvas className="offcanvas" show={viewRestaurantLaunch} >
        <Offcanvas.Header closeButton onHide={closeRestaurantCanvas}>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='form-buttons-offcanvas'>
          
          <Button className="btn-offcanvas" variant="light" onClick={restaurantprofile}><CgProfile/><br/>Profile</Button>

          <Button className="btn-offcanvas" variant="light" onClick={addnewdish}><BiDish/><br/>New Dish</Button>

          <Button className="btn-offcanvas"  variant="light" onClick={restaurantorders}><BiFoodMenu/><br/>Orders</Button>

          <Button className="btn-offcanvas" variant="light" onClick={restauranthome}><AiOutlineHome/><br/>Home Page</Button>
          </div> 
        </Offcanvas.Body>
      </Offcanvas>
        </div>
      
    )
    }
   
}
 
export default LaunchRestaurant;