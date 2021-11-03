import React, {Component} from 'react';

// import cookie from 'react-cookies';
import { Input} from 'reactstrap';
import {Button,Modal, Form,Row,Col} from 'react-bootstrap';
import backendServer from "../../webConfig";
import axios from 'axios';
import { CountryDropdown } from 'react-country-region-selector';
class CheckOut extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          status : null,
          addressstatus:null,
          dishes:[],
          customerid:localStorage.getItem("userid"),
          restaurantid:localStorage.getItem("restaurantid"),
          restaurantname : localStorage.getItem("restaurantname"),
          customername:localStorage.getItem("username"),
          dishid:null,
          deliveryaddress: [],
          orderadd:null,
          showDiv:false,
          street:null,
          state:null,
          city:null,
          country:null,
          dateandtime:Date().toLocaleString(),
          selectedAddr: null,
          errorMsg: null,
          ordertype: localStorage.getItem("deliverytype"),
          totalorderquantity:null,
          totalorderprice:null,
          show: false,
          
        }

      }
      componentDidMount(){
        const data = {
          customerid:localStorage.getItem("userid"),
          //restaurantid: this.state.restaurantid
        };
        axios.defaults.headers.common["authorization"] = localStorage.getItem(
          "token");
        axios.post(`${backendServer}/getorderaddress`,data)
                .then((response) => { 
                  console.log(response.data);

                 if(response.data.status === 200){
                   this.setState({ addressstatus : "datapresent"});
                 }
                 else {
                   this.setState({ addressstatus : "nodata"});
                 }
                this.setState({
                  deliveryaddress : this.state.deliveryaddress.concat(response.data.address) 
                });
            });
         axios.post(`${backendServer}/getcartitem`,data)
                .then((response) => { 
                 // console.log(response.data);
                 if(response.data.length > 0){
                   this.setState({ status : "datapresent"});
                 }
                 else {
                   this.setState({ status : "nodata"});
                 }
                this.setState({
                  dishes : this.state.dishes.concat(response.data) 
                });
                this.state.dishes.forEach((element) => {
                  // console.log("**************");
                  // console.log(element.quantity);
                  // console.log(element.quantityprice);

                  this.setState({
                    totalorderquantity : this.state.totalorderquantity + element.quantity
                  })
                  this.setState({
                    totalorderprice : this.state.totalorderprice + element.quantityprice
                  })

                 
                });
                this.setState({
                  totalorderquantity : this.state.totalorderquantity 
                });
                this.setState({
                  totalorderprice : this.state.totalorderprice.toFixed(2) 
                });
                });
      }
     
      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restauranthome'); 
      }

   addToOrders = (data) => {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
        axios.post(`${backendServer}/placeorder`, data)
            .then(res => {
                
            }).catch(
                (error) => {
                  console.log(error);
                }
            );
    }
     
      placeOrder = (e) => {
        e.preventDefault();
        let street; let city ; let state; let country;
        if(localStorage.getItem("deliverytype") === "Delivery"){
          console.log("*****Delivery******");
          console.log(this.state.selectedAddr);
          if ((this.state.selectedAddr === null || this.state.selectedAddr === undefined)  ) {
            alert( 'Please select a delivery address option!')
            return;
          }
          else{
            if(this.state.selectedAddr !== "new"){
                const addrObj = JSON.parse(this.state.selectedAddr);
                street = addrObj.address;
                city = addrObj.city;
                state =addrObj.state;
                country = addrObj.country;

                const orderDetails = []; 
                  this.state.dishes.forEach((element) => {
                    orderDetails.push({ dishid: element.dishid, quantity: element.quantity,dishprice : element.dishprice,dishname:element.dishname });  
                  });
                  const orderData = {
                      customerid:this.state.customerid,
                      restaurantid:this.state.restaurantid,
                      restaurantname:this.state.restaurantname,
                      customername:this.state.customername,
                      street:street,
                      city:city,
                      state:state,
                      country:country,
                      ordertype:this.state.ordertype,
                      totalorderquantity:this.state.totalorderquantity,
                      totalorderprice:this.state.totalorderprice,
                      datetime:this.state.dateandtime.substring(0,24),
                      orderDetails
                  }
                  this.addToOrders(orderData); 
                    this.setState({
                      show : true 
                  });
              }
            else if(this.state.selectedAddr === "new"){
              street = this.state.street;
              city = this.state.city;
              state =this.state.state;
              country = this.state.country;
              console.log(street,city,state,country)
              if(city === null || state === null || country === null || street === null || country === "" ){
                  alert("Address fields cannot be empty");
                  return;
              }else{
                  const orderDetails = []; 
                  this.state.dishes.forEach((element) => {
                    orderDetails.push({ dishid: element.dishid, quantity: element.quantity,dishprice : element.dishprice,dishname:element.dishname });  
                  });
                  const orderData = {
                    customerid:this.state.customerid,
                    restaurantid:this.state.restaurantid,
                    restaurantname:this.state.restaurantname,
                    customername:this.state.customername,
                    street:street,
                    city:city,
                    state:state,
                    country:country,
                    ordertype:this.state.ordertype,
                    totalorderquantity:this.state.totalorderquantity,
                    totalorderprice:this.state.totalorderprice,
                    datetime:this.state.dateandtime.substring(0,24),
                    orderDetails
                  }
                  this.addToOrders(orderData); 
                    this.setState({
                      show : true 
                    });
              }
            }
          }
        }else if(localStorage.getItem("deliverytype") === "Pick Up"){
          console.log("*****Pick Up******");
              city = "";
              state= "";
              country = "";
              street = "";
              const orderDetails = []; 
                  this.state.dishes.forEach((element) => {
                  orderDetails.push({ dishid: element.dishid, quantity: element.quantity,dishprice : element.dishprice,dishname:element.dishname });  
              });
                  const orderData = {
                    customerid:this.state.customerid,
                    restaurantid:this.state.restaurantid,
                    restaurantname:this.state.restaurantname,
                    customername:this.state.customername,
                    street:street,
                    city:city,
                    state:state,
                    country:country,
                    ordertype:this.state.ordertype,
                    totalorderquantity:this.state.totalorderquantity,
                    totalorderprice:this.state.totalorderprice,
                    datetime:this.state.dateandtime.substring(0,24),
                    orderDetails
                  }
                  this.addToOrders(orderData); 
                    this.setState({
                      show : true 
                    });

        }
      }
       handleModalClose(){
      this.setState({show:!this.state.show}) 
       const {history} = this.props;
        history.push('/customerhome'); 
        }
      handleChangeAddress = (e) => {
      this.setState({
        selectedAddr: e.target.value,
      }); 

        
      if (e.target.value === 'new') {
        this.setState({ showDiv: true });
      } else {
        this.setState({ showDiv: false });
      }
  }
  handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }
        selectCountry (val) {
      this.setState({ country: val });
    }
      render(){
       
        var addresses = null;
        var addnewaddress = null;
        var cartitems = null;
       
      if(localStorage.getItem("deliverytype") === "Delivery") { 
        console.log("***DEli***")
       if(this.state.showDiv){
         addnewaddress = (
           <div>
            
             <div className="form-group">
              Apt and Street No: <Input type="text" className="form-control-add" name="street" defaultValue={this.state.street} onChange={this.handleChange} ></Input>
              </div>
              <div className="form-group">
              City: <Input type="text" className="form-control-add" name="city" defaultValue={this.state.city} onChange={this.handleChange} ></Input>
              </div>
             <div className="form-group">
              State: <Input type="text" className="form-control-add" name="state" defaultValue={this.state.state} onChange={this.handleChange} ></Input>
              </div>
             
              <div className="form-group">

              <CountryDropdown className="form-control"
                    value={this.state.country}
                    onChange={(val) => this.selectCountry(val)} 
                  />
              </div>
           </div>
         )
       }
        if(this.state.addressstatus === "datapresent"){
         
          addresses = (
            <div>
               <h4>Select a delivery address</h4>
              {this.state.deliveryaddress.map(deliveryadd=>
              <div>
                {deliveryadd.address ?
                (
                  <Form.Group  >
                  <Form.Check inline value={JSON.stringify(deliveryadd)} label={`${deliveryadd.address},${deliveryadd.city},${deliveryadd.state},${deliveryadd.country}`}  name="address" type="radio" id={deliveryadd} onChange={this.handleChangeAddress} />
                  </Form.Group>
                ) 
                :<div/>}
 
              </div>
              )}
              <Form.Group  >
            <Form.Check inline value="new" label="Add new delivery address"  name="address" type="radio" id="new" onChange={this.handleChangeAddress} />
          </Form.Group>
            </div>
            
          )
        }

      }
      if(localStorage.getItem("deliverytype") === "Pick Up"){
        
        addresses = (
          <div><h1>Pick Up from Restaurant</h1></div>
        )
       
        
      }
     
    return (
      

      <div className="container">
         
      <h4>Your items</h4>
         <div>
         <Form>
            <Row>
            <Col className="carttable">
            Item 
            </Col>
            <Col className="carttable">
              Price(per Item)
            </Col>
            <Col className="carttable">
              Qty
            </Col>
            </Row>
          </Form>
          {this.state.dishes.map(dish=>
            <Form>
              <Row>
              <Col>
              {dish.dishname}
              </Col>
              <Col>
              ${dish.dishprice}
              </Col>
              <Col>
              {dish.quantity}
              </Col>
              </Row>
            </Form>
          )}
              
          </div>
       
        <br/>
        <h2>Total : ${this.state.totalorderprice}</h2>
        <h4>Total No of Items : {this.state.totalorderquantity}</h4>
        <br/>
        <br/>
       
       {addresses}
     
      
      {addnewaddress}
       
       <br/>
       <Button variant="success" onClick={this.placeOrder}>Place Order</Button>
       <br/>
       <br/>
     
      <div>
         <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModalClose()}>
             <Modal.Header closeButton></Modal.Header>
             <Modal.Body>
              <h5>Order Successfully Placed ! Thank you {this.state.customername}</h5>
             </Modal.Body>
            
           </Modal>
      </div>
      </div>
    )
    }
   
}
 
export default CheckOut;