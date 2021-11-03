
import Button from '@restart/ui/esm/Button';
import React, {Component} from 'react'
import {Modal,Form,Row,Col} from 'react-bootstrap';
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
          // console.log("***")
          // console.log(data)
          // console.log("***")
          axios.post(`${backendServer}/getcartitem`,data)
                  .then((response) => { 
                    //console.log(response.data[0].deliverytype);
                    localStorage.setItem("deliverytype",response.data[0].deliverytype)
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

  handleChange = (e, dishid,dishprice) => {
    e.preventDefault();
    const { dishes } = this.state;
    const index = dishes.findIndex((dish) => dish._id === dishid);
    const orders = [...dishes];
    orders[index].quantity = e.target.value;
    orders[index].quantityprice = (dishprice * (e.target.value)).toFixed(2) ;
    this.setState({ dishes : orders });
  }

  updatestatusfn = (e,dishid,quantity,dishprice) =>{
    e.preventDefault();
    const quantitydata = {
      _id : dishid,
      quantity : quantity,
      quantityprice : (quantity * dishprice).toFixed(2)
    }
  
   this.updateDishQuantity(quantitydata);
    
  }

  updateDishQuantity = (quantitydata)=>{

    console.log(quantitydata)
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token");
     axios.post(`${backendServer}/updatedishquantity`, quantitydata)
             .then(res => {
                 console.log("Order type updated")
             })
             
  }
  render(){
    const { viewCart, closeModal, handleSubmit } = this.props;
    var aftercart = null;
    var beforecart = null;
    let updateitems = null;
    if(this.state.status === "datapresent"){
     
       aftercart = ( 
        <div>

                <Form>
                  <Row>
                   
                    <Col className="carttable">
                    Item 
                    </Col>
                    <Col className="carttable">
                    Price
                    </Col>
                    <Col className="carttable">
                    Qty
                    </Col>
                  </Row>
                </Form>
            {this.state.dishes.map((dish) => (
              <div>

                <Form>
                  <Row>
                    <Col>
                    {dish.dishname}
                    </Col>
                    <Col>
                    ${dish.quantityprice}
                    </Col>
                    <Col>
                   
                     <select  name="quantity"  value={dish.quantity} onChange={(e) => { this.handleChange(e, dish._id,dish.dishprice)}} >
                        <option value="0" >0</option>
                        <option value="1">1</option>
                        <option value="2" >2</option>
                        <option value="3" >3</option>
                        <option value="4" >4</option>
                        <option value="5" >5</option>
                        <option value="6" >6</option>
                        <option value="7" >7</option>
                        <option value="8" >8</option>
                        <option value="9" >9</option>
                        <option value="10" >10</option>
                    </select> 
                     <Button 
                      type="submit" 
                      onClick={(e) => {
                        this.updatestatusfn(e,dish._id,dish.quantity,dish.dishprice);
                      }}>
                      +/-
                    </Button> 
                    </Col>
                  </Row>
                </Form>
                {/* <p></p>
                 <p className="cartitem"></p>
                  <p ></p> */}
                  {/* <table >
                              <tr >
                                  <th>{dish.dishname}</th>
                                  <th className="cartitem" >${dish.dishprice}</th>
                                  <th className="cartitem">{dish.quantity}</th>
                              </tr>
                          
                      </table> */}
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
