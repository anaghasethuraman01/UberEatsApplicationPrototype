import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
// import cookie from 'react-cookies';
import { Button } from 'reactstrap';
import axios from "axios";
import { Modal,Card, ListGroup, ListGroupItem, Offcanvas} from "react-bootstrap";



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
          
          <Button className="btn-offcanvas" onClick={restaurantprofile}>Profile</Button>

          <Button className="btn-offcanvas" onClick={addnewdish}>New Dish</Button>

          <Button className="btn-offcanvas" onClick={restaurantorders}>Orders</Button>

          <Button className="btn-offcanvas" onClick={restauranthome}>Home Page</Button>
          </div> 
        </Offcanvas.Body>
      </Offcanvas>
        </div>
      
    )
    }
   
}
 
export default LaunchRestaurant;