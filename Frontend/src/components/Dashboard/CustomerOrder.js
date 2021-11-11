
import Button from '@restart/ui/esm/Button';
import React, {Component} from 'react'
import {Modal,Table,Row,Col,Pagination} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../webConfig";


class CustomerOrder extends Component {
  
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
      customerorders : [],
      customerorders1 : [],
      customerordersearch : [],
      orderstatusmsg:null,
      receiptdetails:[],
      orderstatus:null,
      ordermsg:null,
      note:null,
      totalamount:null,
      totalquantity:null,
      curPage: 1,
      pageSize: 2,
  
    }
     //this.handleCheckout = this.handleCheckout.bind(this);
  }
    goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/customerhome'); 
      }
      onPage = (e) => {
        // console.log("In pagination");
        // console.log(e.target);
        // console.log(e.target.text);
        this.setState({
          curPage: e.target.text,
        });
      };
    
      OnChange = (e) => {
        this.setState({
          pageSize: parseInt(e.target.value, 10),
        });
      };
  handleModalClose(){
      this.setState({show:!this.state.show}) 
        }
    viewreceipt= (val) =>{
      this.setState({show:true});
       this.setState({
            receiptdetails : [] 
          });
      const receiptval = {
                orderid:val
            }
            
            axios.defaults.headers.common.authorization = localStorage.getItem('token');
       axios.post(`${backendServer}/getorderreceipt`,receiptval).then((response) => {
        console.log("response")
        console.log(response.data[0])
         this.setState({
            receiptdetails : this.state.receiptdetails.concat(response.data[0].orderdetails) 
          });
          this.setState({
            note:response.data[0].note
          })
          this.setState({
            totalamount:response.data[0].totalorderprice
          })
          this.setState({
            totalquantity:response.data[0].totalorderquantity
          })
       });

    }
       
 componentDidMount() {
     
      const customerid = this.state.customerid;
	    if(customerid){
            const val = {
                customerid:customerid
            }
            axios.defaults.headers.common.authorization = localStorage.getItem('token');
          axios.post(`${backendServer}/getitemsfromorders`,val).then((response) => {
               console.log(response.data)
                if(response.data.length > 0){
                    this.setState({ orderstatusmsg: "found" });
               
                // //update the state with the response data
                this.setState({
                customerorders: this.state.customerorders.concat(response.data),
                });
              }
                // console.log(this.state.customerorders)
                // console.log(this.state.orderstatusmsg)
            });

        }
       
	}
searchOrder = (ordersearch) => {
  this.setState({curPage : 1})
  this.setState ({customerorders1 : [] })
  axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
);
    axios.post(`${backendServer}/handleordersearch`,ordersearch).then((response) => {
      console.log("here")
                    if(response.data.length > 0){
                        this.setState({ ordermsg: "searchdone" });
                        this.setState({ orderstatusmsg: "notfound" });
                    }
                    // //update the state with the response data
                     this.setState({
                      customerorders1: this.state.customerorders1.concat(response.data),
                      });
                      //console.log(this.state.customerorders)
                    
    });
}
cancelOrder = (val) => {
    console.log("Cancel order")
    console.log(val)
    const { customerorders } = this.state;
    const index = customerorders.findIndex((order) => order._id === val);
    const orders = [...customerorders];
    orders[index].orderstatus = "Cancel Order";
    this.setState({ customerorders: orders });
    const orderStatusData = {
      orderid : val,
      orderstatus : "Cancelled"
    }
    //console.log(ordertypedata)
   this.updateOrderStatus(orderStatusData);
}
cancelOrder1 = (val) => {
  console.log("Cancel order")
  console.log(val)
  const { customerorders1 } = this.state;
  const index = customerorders1.findIndex((order) => order._id === val);
  const orders = [...customerorders1];
  orders[index].orderstatus = "Cancel Order";
  this.setState({ customerorders1: orders });
  const orderStatusData = {
    orderid : val,
    orderstatus : "Cancelled"
  }
  //console.log(ordertypedata)
 this.updateOrderStatus(orderStatusData);
}
      updateOrderStatus = (orderStatusData)=>{
        axios.defaults.headers.common["authorization"] = localStorage.getItem(
          "token");
        axios.post(`${backendServer}/updateorderstatus`, orderStatusData)
                .then(res => {
                    console.log("Order type updated")
                })
                
      }
handleordersearch = (e) =>{
  e.preventDefault();
   this.setState({
        customerorders: []
    });
  
  const ordersearch = {
    orderstatus : this.state.orderstatus,
    customerid : this.state.customerid
  }
  console.log("ordersearch")
  console.log(ordersearch)
 
 if(this.state.orderstatus === "All"){
   this.componentDidMount();
 }
  this.searchOrder(ordersearch);
}
handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
    render(){
      let paginationItemsTag = []; let items = [];
      if(this.state.orderstatusmsg === "found") {
        console.log("no")
       items = this.state.customerorders;
       console.log(this.state.customerorders)
       console.log("no")
      }else if(this.state.ordermsg === "searchdone" ){
        console.log("done")
        items = this.state.customerorders1;
        console.log(this.state.customerorders1)
        console.log("done")
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
    //   console.log("count:", count);
    // console.log("items.length:", items.length);

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
       	var orderlist = null;
         
         
              if(this.state.orderstatusmsg === "found") {
                orderlist = ( 
                  <div>
                    {displayitems && displayitems.length > 0 ? (
                      
                      <div>
                        {displayitems.map((customerorder) => {
                          return (
                    <div>
                      <Table>
                        <thead>
                        <tr className="form-control-order">
                          <th>
                          <Row>
                            <Col>
                           <th>{customerorder.restaurantname}  <h4>{customerorder.orderstatus}</h4> 
                           </th>
                           </Col>
                           <Col>
                           <th> {(customerorder.orderstatus === "Order Received")?(<div>
                             <Button onClick={() => {
												      this.cancelOrder(customerorder._id);
											        }}>
                               Cancel Order 
                             </Button>
                           </div>):(<div>

                           </div>)} </th>
                           </Col>
                           </Row>
                           </th>
                          <th>{customerorder.totalorderquantity} items for ${customerorder.totalorderprice} . {customerorder.datetime}.</th>
                          <th>Special Instructions : {customerorder.note}</th>
                          <th><Button 
                           onClick={() => {
                                this.viewreceipt(customerorder._id);
                                }}>View Receipt</Button> 
                             </th>   
                        </tr>
                        </thead>
                        </Table>
                        </div>
                      
                          )
                        })}
                      </div>
                    ):
                      <div>
                  <h4 className="">No Recent Orders </h4>
                      </div>
                    }
                  </div>
                );
            }
            if(this.state.ordermsg === "searchdone" ){
                orderlist = ( 
                  <div>
                    {displayitems && displayitems.length > 0 ? (
                      
                      <div>
                        {displayitems.map((customerorder) => {
                          return (
                    <div>
                       <Table>
                        <thead>
                        <tr className="form-control-order">
                          <th>
                          <Row>
                            <Col>
                           <th>{customerorder.restaurantname}  <h4>{customerorder.orderstatus}</h4> 
                           </th>
                           </Col>
                           <Col>
                           <th> {(customerorder.orderstatus === "Order Received")?(<div>
                             <Button onClick={() => {
												      this.cancelOrder1(customerorder._id);
											        }}>
                               Cancel Order 
                             </Button>
                           </div>):(<div>

                           </div>)} </th>
                           </Col>
                           </Row>
                           </th>
                          <th>{customerorder.totalorderquantity} items for ${customerorder.totalorderprice} . {customerorder.datetime}.</th>
                          <th>Special Instructions : {customerorder.note}</th>
                          <th><Button 
                           onClick={() => {
                                this.viewreceipt(customerorder._id);
                                }}>View Receipt</Button> 
                             </th>   
                        </tr>
                        </thead>
                        </Table>
                      {/* <Table>
                        <thead>
                        <tr className="form-control-order">
                          <th>{customerorder.restaurantname}  <h4>{customerorder.orderstatus}</h4>
                          </th>
        
                          <th>{customerorder.totalorderquantity} items for ${customerorder.totalorderprice} . {customerorder.datetime}.</th>
                          <th>{customerorder.note}</th>
                          <th><Button 
                           onClick={() => {
                                this.viewreceipt(customerorder._id);
                                }}>View Receipt</Button></th>   
                        </tr>
                        </thead>
                        </Table> */}
                        </div>
                      
                          )
                        })}
                      </div>
                    ):
                      <div>
                  <h4 className="">No Recent Orders </h4>
                      </div>
                    }
                  </div>
               
          
                )
            }
           
     
    return (
        <div className="container" >
          <div>
           
           <form >
						 Order Type :
            	<select  name="orderstatus"   value={this.state.orderstatus}  onChange={this.handleChange}>
              	<option value="All">All</option> 
              	<option value="Order Received" >Order Received</option>
              	<option value="Preparing"  >Preparing</option>
              	<option value="On the way" >On the way</option>
                <option value="Delivered" >Delivered</option>
                <option value="Pick up Ready" >Pick up Ready</option>
                <option value="Picked up" >Picked up</option>
                <option value="Cancelled">Cancelled Order</option>
            	</select>
              
						<Button 
             onClick={
                  this.handleordersearch
              }>
            
							Search
						</Button>
					</form>
              <div className="pageSelect">
                Page Size :
          <select style={{width:'3rem'}} value={this.state.pageSize} onChange={this.OnChange}>
                <option>2</option>
                <option>5</option>
                <option>10</option>
          </select>
          </div>
          </div>

          <br/><br/><br/>
          <div> {orderlist} </div> 
          <Pagination
                    onClick={this.onPage}
                    style={{ display: "inline-flex" }}>
                    {paginationItemsTag}
          </Pagination>
          {/* <Button onClick={this.goback}>Home Page</Button> */}
         <div>
         <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModalClose()}>
             <Modal.Header closeButton><h4> Receipt</h4>
             
             </Modal.Header>
             <Row>
                  <Col sm><h6>Total Amount : ${this.state.totalamount}</h6></Col>
                  <Col sm><h6>Total Qty : {this.state.totalquantity}</h6></Col>
                  
              </Row>
             
             <Modal.Body>
             
               <div>
              {this.state.receiptdetails.map(receiptdetail=>
              <div >
                <Row>
                  <Col sm={1}>{receiptdetail.quantity} </Col>
                  <Col sm={6}>{receiptdetail.dishname}</Col>
                  <Col sm={1}>${receiptdetail.dishprice}</Col>
                </Row>
            
              </div>)}
              
              </div>
             
             </Modal.Body>
              <h6>Added Note : {this.state.note}</h6>
             <Modal.Footer>
             
             </Modal.Footer>
           </Modal>
          </div>
       </div>
    )
    }
}

export default CustomerOrder
