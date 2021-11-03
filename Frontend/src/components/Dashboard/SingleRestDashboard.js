import React, {Component} from 'react';
import { Button } from 'reactstrap';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import backendServer from "../../webConfig";
import {BiCartAlt} from 'react-icons/bi';


class SingleRestDashboard extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          
          restaurantname:localStorage.getItem("restaurantname"),
          restaurantid : localStorage.getItem("restaurantid"),
          //restaurantname:null,
          description:null,
          //restaurantname:null,
          query : null,
          dish:null,
          status:"notdone",
          dishes :[],
          restaurants:[],
          message:null,
          newrestid:null,
          customerid : null,
          dishid:null,
          dishname:null,
          dishprice:null,
          quantity:1,
          deliverytype:null,
          quantityprice:null,
          show:false,
          showfav:false,
          
        }
      
      }
      handleModalClose(){
        this.setState({show:!this.state.show}) 
        const {history} = this.props;
        history.push('/singlerestdashboard'); 
    }

    handleModalCloseFav(){
      this.setState({showfav:!this.state.showfav}) 
      // const {history} = this.props;
      // history.push('/singlerestdashboard'); 
  }
      componentDidMount(){
        const restaurantid = {
          restaurantid: localStorage.getItem("restaurantid")
      };
      axios.defaults.headers.common.authorization = localStorage.getItem('token');
        axios.post(`${backendServer}/getrestaurantwithid`,restaurantid)
                .then((response) => { 
                  console.log(response.data)
                //update the state with the response data
                this.setState({
                  dishes : this.state.dishes.concat(response.data) 
                });
               //console.log(this.state.dishes);
            });

            axios.post(`${backendServer}/getrestaurantdetails`,restaurantid)
            .then((response) => { 
          
            this.setState({
              restaurants : this.state.restaurants.concat(response.data) 
            });
           
        //     this.setState({
        //       restaurantname : response.data[0].username
        //     });
        //     this.setState({
        //       deliverytype : response.data[0].deliverytype
        //     });
        //     localStorage.setItem("DeliveryType",this.state.deliverytype);
            
         });    

    }

  handleCheckout(){
      //console.log(this.props);
      const {history} = this.props;
		  history.push("/checkout");
   }
      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restdashboard'); 
      }

      gobackFav = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/favourites'); 
      }
    
     addtocart = (restid,dishid,dishname,dishprice) =>{
      
       const cartvalue = {
         customerid : localStorage.getItem("userid"),
         deliverytype :localStorage.getItem("deliverytype"),
         restaurantid : restid,
         dishid:dishid,
         dishname:dishname,
         dishprice:dishprice,
         quantity:this.state.quantity,
         quantityprice :(dishprice * this.state.quantity) 
        }
        
          localStorage.setItem("dishid",dishid);
          localStorage.setItem("dishname",dishname);
          localStorage.setItem("dishprice",dishprice);
          localStorage.setItem("quantity",cartvalue.quantity);
          localStorage.setItem("quantityprice",cartvalue.quantityprice);
      
       this.addToCart(cartvalue);
      //  this.setState({
      //   show : true 
      // });
     }
        handleModalClose(){
        this.setState({show:!this.state.show}) 
         }
    addToCart = (data) => {
      console.log("add to cart")
      
      axios.defaults.headers.common["authorization"] = localStorage.getItem(
        "token");
      axios.defaults.withCredentials = true;
      axios.post(`${backendServer}/addtocarttable`, data).then((res) => {
        console.log("res.data")
        console.log(res.data)
          if(res.data === "Delete previous order"){
            this.setState({show:"true"})
          }
          if(res.data === "Quantity updated"){
            this.setState({showfav:"true"})
          }
        
          // console.log("Status Code : ", res.status);
          // if (res.status === 200) {
          //   this.setState({ authFlag: true });
          // } else {
          //   this.setState({ authFlag: false });
          // }
      });
	};
  handleNewOrder = () => {
    const data = {
        customerid : localStorage.getItem("userid"),
         restaurantid : localStorage.getItem("restaurantid"),
         dishid:localStorage.getItem("dishid"),
         dishname:localStorage.getItem("dishname"),
         dishprice:localStorage.getItem("dishprice"), 
         quantity:localStorage.getItem("quantity"),
         quantityprice:localStorage.getItem("quantityprice"),
         deliverytype :localStorage.getItem("deliverytype")
    }
    console.log(data)
    //localStorage.setItem("restname",this.state.restaurantname);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token");
      axios.defaults.withCredentials = true;
      axios.post(`${backendServer}/handleneworder`, data).then((res) => {
        
          // if (res.status === 200) {
          //   this.setState({ authFlag: true });
          // } else {
          //   this.setState({ authFlag: false });
          // }
      });
      this.setState({show:!this.state.show}) 
	};
    render(){
      
      var restaurantdetails = null;
        var searchresults = null;
      var messagebox = null;
        searchresults = 
        <div className='card-list'>
        {this.state.dishes.map(dish=>
         <div >
          <Card style={{ width: '18rem' }}>
          <Card.Img style={{ width: '18rem',height:'13rem' }} variant="top" src={`${backendServer}/${dish.dishimage}`} />
          <Card.Body>
          <Card.Title>{dish.dishname}</Card.Title>
          </Card.Body>
          
          <ListGroup className="list-group-flush">
            <ListGroupItem>Contains : {dish.ingrediants} </ListGroupItem>
            <ListGroupItem>Price :  $ {dish.price}</ListGroupItem>
           	<ReactTooltip />
            <Button className="cardbtn2" data-tip="Add To Cart"
            onClick={() => {
												this.addtocart(this.state.restaurantid,dish._id,dish.dishname,dish.price);
											}}>
              <BiCartAlt/></Button>
          </ListGroup>
          </Card>                           
          </div>
       
       )
       }

     </div>
        
        restaurantdetails = 
        <div>
        {this.state.restaurants.map(restaurant=>
        <p>{restaurant.description}</p>

       )
       }
        </div>
   
    return (
      
        <div class="container">
          
            <h1>{this.state.restaurantname}</h1>
            
          {/* {messagebox} */}
            {restaurantdetails}
            <form>
            <Button onClick = {this.goback}>Search Restaurants</Button>
            <Button onClick = {this.gobackFav}>Favourites</Button>
            </form>
            {searchresults}
            <div>
            <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModalClose()} >
             <Modal.Header closeButton>Create New Order</Modal.Header>
             <Modal.Body>
             Your Order contain items from another restaurant.Create a new
             order to add items from {this.state.restaurantname}
             </Modal.Body>
             <Modal.Footer>
               <Button 
               onClick={() => {
												this.handleNewOrder();
											}}>
              New Order</Button>
             </Modal.Footer>
           </Modal>
           </div>


           <div>
            <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.showfav} onHide={()=>this.handleModalCloseFav()} >
             <Modal.Header closeButton></Modal.Header>
             <Modal.Body>
             Item added to cart!
             </Modal.Body>
             
           </Modal>
           </div>

        </div>
    )
    }
   
}
 
export default SingleRestDashboard;