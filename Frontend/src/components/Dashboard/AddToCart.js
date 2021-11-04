
import Button from '@restart/ui/esm/Button';
import React, {Component} from 'react'
import {Modal,Form,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../webConfig";
import {TiDelete} from 'react-icons/ti';
import ReactTooltip from 'react-tooltip';
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
  addquantityfn = (e,dishid) =>{
    e.preventDefault();
    const { dishes } = this.state;
    const index = dishes.findIndex((dish) => dish._id === dishid);
    const orders = [...dishes];
    const {quantity} = orders[index]
    const {dishprice} = orders[index]
    const amount = parseFloat(dishprice, 10);
    orders[index].quantity = quantity + 1;
    orders[index].quantityprice = (amount * (quantity+1)).toFixed(2) ;
    this.setState({ dishes : orders });
    const quantitydata = {
      _id : dishid,
      quantity : orders[index].quantity,
      quantityprice : orders[index].quantityprice
    }
  
   this.updateDishQuantity(quantitydata);
  }
  subquantityfn = (e,dishid) =>{
    e.preventDefault();
    const { dishes } = this.state;
    const index = dishes.findIndex((dish) => dish._id === dishid);
    const orders = [...dishes];
    const {quantity} = orders[index]
    const {dishprice} = orders[index]
    const amount = parseFloat(dishprice, 10);
    if(orders[index].quantity > 1) {
      orders[index].quantity = quantity - 1;
      orders[index].quantityprice = (amount * (quantity-1)).toFixed(2) ;
    }
    this.setState({ dishes : orders });
    const quantitydata = {
      _id : dishid,
      quantity : orders[index].quantity,
      quantityprice : orders[index].quantityprice
    }
  
   this.updateDishQuantity(quantitydata);
  }
  deletequantityfn = (e,dishid) =>{
    e.preventDefault();
    const { dishes } = this.state;
    const index = dishes.findIndex((dish) => dish._id === dishid);
    const orders = [...dishes];
    console.log(orders.splice(index,1))
    if(orders.length === 0){
      this.setState({ status : "empty"});
    }
    // 
    this.setState({ dishes : orders });
    
    const quantitydata = {
      _id : dishid,
      quantity : 0,
      quantityprice : 0
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
                <ReactTooltip />

                <Form>
                  <Row>
                    <Col>
                    {dish.dishname}
                    </Col>
                    <Col>
                    ${dish.quantityprice}
                    </Col>
                    <Col>
                    <Button 
                      type="submit" 
                      onClick={(e) => {
                        this.addquantityfn(e,dish._id);
                      }}>
                      +
                    </Button> 
                    &nbsp; &nbsp;
                    {dish.quantity}
                     &nbsp; &nbsp;
                     <Button 
                      type="submit" 
                      onClick={(e) => {
                        this.subquantityfn(e,dish._id);
                      }}>
                      -
                    </Button> 
                    &nbsp; &nbsp;
                     <Button 
                      type="submit" data-tip="Remove"
                      onClick={(e) => {
                        this.deletequantityfn(e,dish._id);
                      }}>
                      <TiDelete/>
                    </Button> 
                    </Col>
                  </Row>
                </Form>
                
              </div>
            )
            )}
        <Button className="container1"  onClick={handleSubmit}>CheckOut</Button>
        </div>
      );
    }else if(this.state.status !== "datapresent" || this.state.status === "empty"){
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
