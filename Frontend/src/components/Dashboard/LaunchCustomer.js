import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
// import cookie from 'react-cookies';
import { Button } from 'reactstrap';
import axios from "axios";
import { Modal,Card, ListGroup, ListGroupItem, Offcanvas} from "react-bootstrap";



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
          
          <Button className="btn-offcanvas" onClick={profile}>Profile</Button>

          <Button className="btn-offcanvas" onClick={findfood}>Find Food</Button>

          <Button className="btn-offcanvas" onClick={orders}>Orders</Button>

          <Button className="btn-offcanvas" onClick={showfavourites}>Favourites</Button>

          <Button className="btn-offcanvas" onClick={home}>Home Page</Button>
          </div> 
        </Offcanvas.Body>
      </Offcanvas>
        </div>
      
    )
    }
   
}
 
export default LaunchCustomer;