
import Button from '@restart/ui/esm/Button';
import React, {Component} from 'react'
import {Modal} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../webConfig";

class AddToCart extends Component {
  
  constructor(props) {
    super(props);
    
     this.state = {
      
      show: false,
      customerid: localStorage.getItem("userid"),
      restaurantid : localStorage.getItem("restid"),
      dishes : [],
      dishprice : null,
      dishname:null,
      status :null,
  
    }
     //this.handleCheckout = this.handleCheckout.bind(this);
  }
  componentDidMount(){
    this.setState({show:!this.state.show})  
    this.setState({
          dishes : [] 
      });
      const data = {
            customerid:this.state.customerid,
            //restaurantid: this.state.restaurantid
          };
          console.log("***")
          console.log(data)
          axios.post(`${backendServer}/getcartitem`,data)
                  .then((response) => { 
                    console.log(response.data);
                   if(response.data.length > 0){
                     this.setState({ status : "datapresent"});
                   }
                   else {
                     this.setState({ status : "nodata"});
                   }
                  this.setState({
                    dishes : this.state.dishes.concat(response.data) 
                  });
                  });
                  
  }
  render(){
    const { viewCart, closeModal, handleSubmit } = this.props;
    var aftercart = null;
    var beforecart = null;
    if(this.state.status === "datapresent"){
       aftercart = ( 
        <div>
          <table className="table">
                          <thead>
                              <tr>
                                  <th>Dish Name</th>
                                  <th>Price</th>
                                  <th>Qty</th>
                              </tr>
                          </thead>
                      </table>
            {this.state.dishes.map((dish) => (
              <div>
                {/* <p></p>
                 <p className="cartitem"></p>
                  <p ></p> */}
                  <table >
                              <tr >
                                  <th>{dish.dishname}</th>
                                  <th className="cartitem" >${dish.dishprice}</th>
                                  <th className="cartitem">{dish.quantity}</th>
                              </tr>
                          
                      </table>
              </div>
            )
            )}
        <Button className="container1"  onClick={handleSubmit}>CheckOut</Button>
        </div>
      );
    }else{
      beforecart = (
        <div>
         <p>Your Cart is Empty.Add items!</p>
        </div>
      );
      
    }
   
 
    
    
    
    return(
      <div>
          <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={viewCart} onHide={closeModal}>
             <Modal.Header closeButton>Your Cart</Modal.Header>
             <Modal.Body>
              {aftercart}
              {beforecart}
             </Modal.Body>
             <Modal.Footer>
              
             </Modal.Footer>
           </Modal>
      </div>
    )
  }
}
  
  

export default AddToCart
