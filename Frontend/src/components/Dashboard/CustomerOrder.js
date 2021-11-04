
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
      customerordersearch : [],
      orderstatusmsg:null,
      receiptdetails:[],
      orderstatus:null,
      ordermsg:null,
      note:null,
      totalamount:null,
      totalquantity:null
  
    }
     //this.handleCheckout = this.handleCheckout.bind(this);
  }
    goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/customerhome'); 
      }
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
    axios.post(`${backendServer}/handleordersearch`,ordersearch).then((response) => {
                    if(response.data.length > 0){
                        this.setState({ ordermsg: "searchdone" });
                        this.setState({ orderstatusmsg: "notfound" });
                    }
                    // //update the state with the response data
                     this.setState({
                      customerorders: this.state.customerorders.concat(response.data),
                      });
                      console.log(this.state.customerorders)
                    
    });
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
 
 if(this.state.orderstatus === "All"){
   this.componentDidMount();
 }
  this.searchOrder(ordersearch);
}
handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
    render(){
        
       	var orderlist = null;
         
         
              if(this.state.orderstatusmsg === "found") {
                orderlist = ( 
                <div>
                    <h1> Your Orders </h1>
                <div>
                {/* <Pagination>
  <Pagination.First />
  <Pagination.Prev />
  <Pagination.Item>{1}</Pagination.Item>
  <Pagination.Ellipsis />

  <Pagination.Item>{10}</Pagination.Item>
  <Pagination.Item>{11}</Pagination.Item>
  <Pagination.Item active>{12}</Pagination.Item>
  <Pagination.Item>{13}</Pagination.Item>
  <Pagination.Item disabled>{14}</Pagination.Item>

  <Pagination.Ellipsis />
  <Pagination.Item>{20}</Pagination.Item>
  <Pagination.Next />
  <Pagination.Last />
</Pagination> */}
                    {this.state.customerorders.map((customerorder) => (
                    <div>
                      <Table>
                        <thead>
                        <tr className="form-control-order">
                          <th>{customerorder.restaurantname}  <h4>{customerorder.orderstatus}</h4>  </th>
        
                          <th>{customerorder.totalorderquantity} items for ${customerorder.totalorderprice} . {customerorder.datetime}.</th>
                          <th>{customerorder.note}</th>
                          <th><Button 
                           onClick={() => {
                                this.viewreceipt(customerorder._id);
                                }}>View Receipt</Button></th>   
                        </tr>
                      </thead>
                      </Table>
                    </div>
                    ))}
                </div>
                </div>
                );
            }
            if(this.state.ordermsg === "searchdone" ){
              console.log("here")
                orderlist = ( 
                <div>
                    <h1> Your Orders </h1>
                <div>
      
                    {this.state.customerorders.map((customerorder1) => (
                    <div>
                      <Table>
                        <thead>
                        <tr className="form-control-order">
                          <th>{customerorder1.restaurantname}  <h4>{customerorder1.orderstatus}</h4>  </th>
                          <th>{customerorder1.totalorderquantity} items for ${customerorder1.totalorderprice} . {customerorder1.datetime}.</th>
                          <th><Button 
                           onClick={() => {
                                this.viewreceipt(customerorder1.orderid);
                                }}>View Receipt</Button></th>   
                        </tr>
                      </thead>
                      </Table>
                       </div>
                    ))}
                </div>
                </div>
                )
            }
            // else{
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
            	<select  name="orderstatus"   value={this.state.orderstatus}  onChange={this.handleChange}>
              	<option value="All">All</option> 
              	<option value="Order Received" >Order Received</option>
              	<option value="Preparing"  >Preparing</option>
              	<option value="On the way" >On the way</option>
                <option value="Delivered" >Delivered</option>
                <option value="Pick up Ready" >Pick up Ready</option>
                <option value="Picked up" >Picked up</option>
            	</select>
						<Button 
             onClick={
                  this.handleordersearch
              }>
            
							Search
						</Button>
					</form>
          </div>

          <br/><br/><br/>
          <div> {orderlist} </div> 
         
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
