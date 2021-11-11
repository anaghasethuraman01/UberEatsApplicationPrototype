
import Button from '@restart/ui/esm/Button';
import React, {Component} from 'react'
import {Modal,Table,Pagination} from 'react-bootstrap';
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
      restaurantorders1 : [],
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
      curPage: 1,
      pageSize: 5,
  
    }
     //this.handleCheckout = this.handleCheckout.bind(this);
  }
  onPage = (e) => {
    this.setState({
      curPage: e.target.text,
    });
  };
  OnChange = (e) => {
    this.setState({
      pageSize: parseInt(e.target.value, 10),
    });
  };
  
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
  handleChangenew = (e, orderid) => {
    e.preventDefault();
      const { restaurantorders1 } = this.state;
      const index = restaurantorders1.findIndex((order) => order._id === orderid);
      const orders = [...restaurantorders1];
      orders[index].orderstatus = e.target.value;
      this.setState({ restaurantorders1: orders });
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
  this.setState({curPage : 1})
  this.setState ({restaurantorders1 : [] })
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
  );
    axios.post(`${backendServer}/handleordermodesearch`,ordersearch).then((response) => {
                    if(response.data.length > 0){
                        this.setState({ orderstatusmsg: "searchdone" });
                        //this.setState({ orderstatusmsg: "notfound" });
                    }
                    // //update the state with the response data
                     this.setState({
                      restaurantorders1: this.state.restaurantorders1.concat(response.data),
                      });
                      
                    
    });
}

 handleChangeOrder = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
    render(){

      let paginationItemsTag = []; let items = [];
      if(this.state.orderstatusmsg === "found") {
        items = this.state.restaurantorders;
       
      }else if(this.state.orderstatusmsg === "searchdone" ){
        items = this.state.restaurantorders1;

      }
      let pgSize = this.state.pageSize;
      
      let count = 1;
      let num = items.length / pgSize;
      console.log(items.length / pgSize);
      console.log(Number.isInteger(items.length / pgSize));
      if (Number.isInteger(num)) {
        count = num;
      } else {
        count = Math.floor(num) + 1;
      }
      console.log("count:", count);
    console.log("items.length:", items.length);

    const active = parseInt(this.state.curPage, 10);

    for (let number = 1; number <= count; number++) {
      paginationItemsTag.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }
        let start = parseInt(pgSize * (this.state.curPage - 1));
        let end = this.state.pageSize + start;
        //   console.log("start: ", start, ", end: ", end);
        let displayitems = [];
        if (end > items.length) {
          end = items.length;
        }
        for (start; start < end; start++) {
          displayitems.push(items[start]);
        }
        const imgLink = `${backendServer}${this.state.custprofilepic}`;
      
       	var orderlist = null;
              if(this.state.orderstatusmsg === "found") {
                orderlist = ( 
                  <div>
                     {displayitems && displayitems.length > 0 ? (
                       <div>
                    <h1>  Orders Received </h1>
                    {displayitems.map((customerorder) => {
                          return (
                  <div>
                   
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
                  </div>
                  )})}
                    </div>
                     ):
                     (
                       <div>
                         <h4 className="">No Recent Orders </h4>
                         </div>
                     )
                     }
                </div>
                );
            }
            if(this.state.orderstatusmsg === "searchdone"){
              orderlist = ( 
                <div>
                   {displayitems && displayitems.length > 0 ? (
                     <div>
                  <h1>  Orders Received </h1>
                  {displayitems.map((customerorder) => {
                        return (
                <div>
                 
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
                                <select  name="orderstatus"  value={customerorder.orderstatus} onChange={(e) => { this.handleChangenew(e, customerorder._id)}} >
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
                                <select  name="orderstatus"   value={customerorder.orderstatus} onChange={(e) => { this.handleChangenew(e, customerorder._id)}} >
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
                                <select  name="orderstatus"   value={customerorder.orderstatus} onChange={(e) => { this.handleChangenew(e, customerorder._id)}} >
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
                </div>
                )})}
                  </div>
                   ):
                   (
                     <div>
                       <h4 className="">No Recent Orders </h4>
                       </div>
                   )
                   }
              </div>
              );
            
            }
            
     
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
            <div className="pageSelect">
                Page Size :
          <select style={{width:'3rem'}} value={this.state.pageSize} onChange={this.OnChange}>
                <option>2</option>
                <option>5</option>
                <option>10</option>
          </select>
          </div>
					</form>
          </div>

          <br/><br/><br/>
          <div> {orderlist} </div> 
          
          <Pagination
                    onClick={this.onPage}
                    style={{ display: "inline-flex" }}>
                    {paginationItemsTag}
          </Pagination>
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
