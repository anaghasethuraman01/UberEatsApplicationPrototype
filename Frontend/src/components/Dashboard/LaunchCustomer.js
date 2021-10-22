import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
// import cookie from 'react-cookies';

import axios from "axios";
import { Button,Modal,Card, ListGroup, ListGroupItem, Offcanvas} from "react-bootstrap";
import {CgProfile} from 'react-icons/cg';
import {MdFavoriteBorder} from 'react-icons/md';
import {MdOutlineFoodBank} from 'react-icons/md';
import {BiFoodMenu} from 'react-icons/bi';
import {AiOutlineHome} from 'react-icons/ai';

class LaunchCustomer extends Component {
    
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
        const { closeCanvas, viewCustomerLaunch ,profile,orders,findfood,showfavourites,home} = this.props;


     
    return (
      
    <div className="container">
            
      <Offcanvas className="offcanvas" show={viewCustomerLaunch} >
        <Offcanvas.Header closeButton onHide={closeCanvas}>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='form-buttons-offcanvas'>
          
          <Button className="btn-offcanvas" variant="light" onClick={profile}><CgProfile/><br/>Profile</Button>

          <Button className="btn-offcanvas" variant="light" onClick={findfood}><MdOutlineFoodBank/><br/>Find Food</Button>

          <Button className="btn-offcanvas"  variant="light" onClick={orders}><BiFoodMenu/><br/>Orders</Button>

          <Button className="btn-offcanvas"variant="light"  onClick={showfavourites}><MdFavoriteBorder/><br/>Favourites</Button>

          <Button className="btn-offcanvas" variant="light" onClick={home}><AiOutlineHome/><br/>Home Page</Button>
          </div> 
        </Offcanvas.Body>
      </Offcanvas>
        </div>
      
    )
    }
   
}
 
export default LaunchCustomer;