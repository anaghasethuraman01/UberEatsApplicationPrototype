
import Button from '@restart/ui/esm/Button';
import React, {Component} from 'react'
import {Modal,Table} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../webConfig";
class OrdersPage extends Component {
  
  constructor(props) {
    super(props);
    
     this.state = {
      
      
      showcustprofile:false,
      customerid: localStorage.getItem("userid"),
      restaurantid : localStorage.getItem("restaurantid"),
      dishes : [],
      dishprice : null,
      dishname:null,
      status :null,
      restaurantorders : [],
      orderstatusmsg:null,
      updatestatus:false,
      orderstatus:null,
      orderid:null,
      ordermsg:null,
      ordermodetype:null,
      customerdetails:[],
      customername:null,
      customernickname:null,
      customerabout:null,
      custprofilepic:null,
    
  
    }
     //this.handleCheckout = this.handleCheckout.bind(this);
  }
  
    handleModalCloseCustView(){
        this.setState({showcustprofile:!this.state.showcustprofile}) 
    }  
   
      viewcustomerprofile(CustId){
        this.setState({
          customerdetails: [],
        });
        const customerid = {
          userid: CustId
        };
        console.log(customerid)
        axios.defaults.headers.common["authorization"] = localStorage.getItem(
          "token"
      );
        axios.post(`${backendServer}/getcustomerprofile`,customerid).then((response) => {
          console.log(response.data);
          
          //update the state with the response data
          this.setState({
            customerdetails: this.state.customerdetails.concat(response.data),
          });
          this.setState({
            customername: this.state.customerdetails[0]['username'],
          });
          this.setState({
            customernickname: this.state.customerdetails[0]['nickname'],
          });
          this.setState({
            customerabout: this.state.customerdetails[0]['about'],
          });
          this.setState({
            customerabout: this.state.customerdetails[0]['about'],
          });
          this.setState({
            custprofilepic: this.state.customerdetails[0]['profilepic'],
          });
          console.log(this.state.customerdetails)
        });
        this.setState({
          showcustprofile : true 
        });
      }
 componentDidMount() {
      
        const restaurantid = this.state.restaurantid;
	    if(restaurantid){
            const val = {
                restaurantid:restaurantid
            }

            axios.defaults.headers.common.authorization = localStorage.getItem('token');
          axios.post(`${backendServer}/getrestaurantorders`,val).then((response) => {
              
                if(response.data.length > 0){
                    this.setState({ orderstatusmsg: "found" });
                }
                // //update the state with the response data
                this.setState({
                restaurantorders: this.state.restaurantorders.concat(response.data),
                });
                console.log(this.state.restaurantorders)
                
            });

        }
       
	}
handleChangeOrderType = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }

 updatestatusfn = (e,valid,otype) =>{
   e.preventDefault();
  
   const ordertypedata = {
     orderid : valid,
     orderstatus : otype
   }
   console.log(ordertypedata)
   this.updateOrderStatus(ordertypedata);
   
 }


handleChange = (e, orderid) => {
  e.preventDefault();
    const { restaurantorders } = this.state;
    const index = restaurantorders.findIndex((order) => order._id === orderid);
    const orders = [...restaurantorders];
    orders[index].orderstatus = e.target.value;
    this.setState({ restaurantorders: orders });
  }

 updateOrderStatus = (ordertypedata)=>{
   //console.log(ordertypedata)
   axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
    );
    axios.post(`${backendServer}/updateorderstatus`, ordertypedata)
            .then(res => {
                console.log("Order type updated")
            })
            
 }
handleordersearch = (e) => {
  e.preventDefault();
   this.setState({
      restaurantorders: []
    });
    const ordersearch = {
    ordermodetype : this.state.ordermodetype,
    restaurantid : this.state.restaurantid
    }
 
    if(this.state.ordermodetype === "All"){
      this.componentDidMount();
    }else
    {
      this.searchOrder(ordersearch);
    }
    

}

searchOrder = (ordersearch) => {
    console.log(ordersearch);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
  );
    axios.post(`${backendServer}/handleordermodesearch`,ordersearch).then((response) => {
                    if(response.data.length > 0){
                        this.setState({ ordermsg: "searchdone" });
                        this.setState({ orderstatusmsg: "notfound" });
                    }
                    // //update the state with the response data
                     this.setState({
                      restaurantorders: this.state.restaurantorders.concat(response.data),
                      });
                      console.log(this.state.restaurantorders)
                    
    });
}

 handleChangeOrder = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
    render(){
      
        const imgLink = `${backendServer}${this.state.custprofilepic}`;
      
       	var orderlist = null;
              if(this.state.orderstatusmsg === "found") {
                orderlist = ( 
                <div>
                    <h1>  Orders Received </h1>
                    <br/>
                <div>
                
                    {this.state.restaurantorders.map((customerorder) => (
                      
                    <div>
                    
                      <Table>
                        <thead>
                        <tr className="form-control-order">
                          <th>Customer Name : {customerorder.customername}   <Button onClick={() => {
                                this.viewcustomerprofile(customerorder.userid);
                                }}>View Profile</Button> </th>
        
                          <th>Date : {customerorder.datetime} . <br/> Total Items : {customerorder.totalorderquantity} item(s).<br/> Total Price : ${customerorder.totalorderprice}</th>
                          <th>Order Status : {customerorder.orderstatus} </th>
                          <th>{
                            customerorder.ordertype === "Pick Up" && (
                              <form >
                              Status Type :
                                <select  name="orderstatus"  value={customerorder.orderstatus} onChange={(e) => { this.handleChange(e, customerorder._id)}} >
                                  <option value="Order Received" >Order Received</option>
                                  <option value="Preparing">Preparing</option>
                                  <option value="Pick up Ready" >Pick up Ready</option>
                                  <option value="Picked up" >Picked up</option>
                                  <option value="Cancelled" >Cancel Order</option>
                                </select>
                              <Button 
                               type="submit" 
                                onClick={(e) => {
                                this.updatestatusfn(e,customerorder._id,customerorder.orderstatus);
                                }}>
                                Update
                              </Button>
                            </form>
                            )
                            }  
                            {
                            customerorder.ordertype === "Delivery" && (
                              <form >
                              Status Type :
                                <select  name="orderstatus"   value={customerorder.orderstatus} onChange={(e) => { this.handleChange(e, customerorder._id)}} >
                                  <option value="Order Received" >Order Received</option>
                                  <option value="Preparing"  >Preparing</option>
                                  <option value="On the way" >On the way</option>
                                  <option value="Delivered" >Delivered</option>
                                  <option value="Cancelled" >Cancel Order</option>
                                </select>
                                 <Button 
                               type="submit" 
                                onClick={(e) => {
                                this.updatestatusfn(e,customerorder._id,customerorder.orderstatus);
                                }}>
                                Update
                              </Button>
                            </form>
                            )
                            }  
                            {
                            customerorder.ordertype === "Pick Up and Delivery" && (
                              <form >
                              Status Type :
                                <select  name="orderstatus"   value={customerorder.orderstatus} onChange={(e) => { this.handleChange(e, customerorder._id)}} >
                                  <option value="Order Received" >Order Received</option>
                                  <option value="Preparing"  >Preparing</option>
                                  <option value="On the way" >On the way</option>
                                  <option value="Delivered" >Delivered</option>
                                  <option value="Pick up Ready" >Pick up Ready</option>
                                  <option value="Picked up" >Picked up</option>
                                  <option value="Cancelled" >Cancel Order</option>
                                </select>
                                 <Button 
                               type="submit" 
                                onClick={(e) => {
                                this.updatestatusfn(e,customerorder._id,customerorder.orderstatus);
                                }}>
                                Update
                              </Button>
                            </form>
                            )
                            }  
                          </th>
                         
                         
                        </tr>
                      </thead>
                      </Table>
                       
                      
                    </div>
                    ))}
                </div>
                </div>
                );
            }
            if(this.state.ordermsg === "searchdone"){
              orderlist = ( 
                <div>
                    <h1>  Orders Received </h1>
                    <br/>
                <div>
                
                    {this.state.restaurantorders.map((customerorder) => (
                      
                    <div>
                    
                      <Table>
                        <thead>
                        <tr className="form-control-order">
                          <th>Customer Name : {customerorder.customername} <Button onClick={() => {
                                this.viewcustomerprofile(customerorder.userid);
                                }}>View Profile</Button> </th>
        
                          <th>Date : {customerorder.datetime} . <br/> Total Items : {customerorder.totalorderquantity} item(s).<br/> Total Price : ${customerorder.totalorderprice}</th>
                          <th>Order Status : {customerorder.orderstatus} </th>
                          <th>{
                            customerorder.ordertype === "Pick Up" && (
                              <form >
                              Status Type :
                                <select  name="orderstatus"  value={customerorder.orderstatus} onChange={(e) => { this.handleChange(e, customerorder._id)}} >
                                  <option value="Order Received" >Order Received</option>
                                  <option value="Preparing">Preparing</option>
                                  <option value="Pick up Ready" >Pick up Ready</option>
                                  <option value="Picked up" >Picked up</option>
                                  <option value="Cancelled" >Cancel Order</option>
                                </select>
                              <Button 
                               type="submit" 
                                onClick={(e) => {
                                this.updatestatusfn(e,customerorder._id,customerorder.orderstatus);
                                }}>
                                Update
                              </Button>
                            </form>
                            )
                            }  
                            {
                            customerorder.ordertype === "Delivery" && (
                              <form >
                              Status Type :
                                <select  name="orderstatus"   value={customerorder.orderstatus} onChange={(e) => { this.handleChange(e, customerorder._id)}} >
                                  <option value="Order Received" >Order Received</option>
                                  <option value="Preparing"  >Preparing</option>
                                  <option value="On the way" >On the way</option>
                                  <option value="Delivered" >Delivered</option>
                                  <option value="Cancelled" >Cancel Order</option>
                                </select>
                                 <Button 
                               type="submit" 
                                onClick={(e) => {
                                this.updatestatusfn(e,customerorder._id,customerorder.orderstatus);
                                }}>
                                Update
                              </Button>
                            </form>
                            )
                            }  
                            {
                            customerorder.ordertype === "Pick Up and Delivery" && (
                              <form >
                              Status Type :
                                <select  name="orderstatus"   value={this.state.orderstatus} onChange={(e) => { this.handleChange(e, customerorder._id)}} >
                                  <option value="Order Received" >Order Received</option>
                                  <option value="Preparing"  >Preparing</option>
                                  <option value="On the way" >On the way</option>
                                  <option value="Delivered" >Delivered</option>
                                  <option value="Pick up Ready" >Pick up Ready</option>
                                  <option value="Picked up" >Picked up</option>
                                  <option value="Cancelled" >Cancel Order</option>
                                </select>
                                 <Button 
                               type="submit" 
                                onClick={(e) => {
                                this.updatestatusfn(e,customerorder._id,customerorder.orderstatus);
                                }}>
                                Update
                              </Button>
                            </form>
                            )
                            }  
                          </th>
                        </tr>
                      </thead>
                      </Table>
                    </div>
                    ))}
                </div>
                </div>
                );

            }
            
            // else {
            //    orderlist = ( 
            //     <div>
            //         <h1> No Orders </h1>
            //     </div>
            //    )

            // }
     
    return (
        <div className="container" >
          <div>
           <form >
						 Order Type :
            	<select  name="ordermodetype"   value={this.state.ordermodetype} onChange={this.handleChangeOrder}>
              	<option value="All">All</option> 
              	<option value="New Order" >New Order</option>
              	<option value="Delivered Order"  >Delivered Order</option>
                <option value="Cancelled Order"  >Cancelled Order</option>
            	</select>
              
						<Button onClick={this.handleordersearch} type="submit">
							Search
						</Button>
					</form>
          </div>

          <br/><br/><br/>
          <div> {orderlist} </div> 
          
          
      <div>
         <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.showcustprofile} onHide={()=>this.handleModalCloseCustView()}>
             <Modal.Header closeButton><h4>Customer Profile</h4></Modal.Header>
             <Modal.Body>

             <Table>
                <thead>
                  <tr className="form-control-order">
                    <th> <img src={imgLink} alt="No image added. Add Image." style={{ maxHeight: '5rem', maxWidth: '10rem' }} /></th>
                    <th> Name : {this.state.customername}</th>
                    <th> Nick Name : {this.state.customernickname}</th>
                    <th> About: {this.state.customerabout}</th>
                  </tr>
                </thead>
              </Table>     
             </Modal.Body>
             <Modal.Footer>
              
             </Modal.Footer>
           </Modal>
      </div>
      {/* <Button className="btn-logout" onClick={this.logout}>Logout</Button> */}
       </div>
    )
    }
}

export default OrdersPage
