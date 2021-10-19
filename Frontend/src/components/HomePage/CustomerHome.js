import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
// import cookie from 'react-cookies';
import { Button } from 'reactstrap';
import axios from "axios";
import { Modal,Card, ListGroup, ListGroupItem} from "react-bootstrap";
import backendServer from "../../webConfig";
import {BiCartAlt} from 'react-icons/bi';
import {IoIosRestaurant} from 'react-icons/io';
import {MdFavoriteBorder} from 'react-icons/md';
import {RiPhoneFill} from 'react-icons/ri';
import {IoMail} from 'react-icons/io5';


class CustomerHome extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
            customerid : localStorage.getItem("userid"),
            username: localStorage.getItem("username"),
            email:localStorage.getItem("email"),
            phone: localStorage.getItem("phone"),
            dob:localStorage.getItem("dob"),
            address:localStorage.getItem("address"),
            state:localStorage.getItem("state"),
            city:localStorage.getItem("city"),
            country:localStorage.getItem("country"),
            nickname:localStorage.getItem("nickname"),
            about:localStorage.getItem("about"),
            favourites:null,
            loading: false,
            output: null,
            restaurants: [],
            restaurants1: [],
            favrestaurants: [],
            show:false,
            message:null,
            sideshow:false,
           
          }
      }
    componentDidMount() {
    const city = this.state.city;
    if(city!== "null" && city !== "Add" ){
      const data = {
			city: city,
		  };
      axios.post(`${backendServer}/getrestaurantwithcity`,data).then((response) => {
        //this.setState({ status: "notdone" });
        //console.log(response.data);
        //update the state with the response data
        this.setState({
          restaurants: this.state.restaurants.concat(response.data),
        });
       
      });
    } if(city === "null" || city === "Add" || this.state.restaurants.length === 0) {
      
      axios.get(`${backendServer}/getrestaurant`).then((response) => {
			//this.setState({ status: "notdone" });
			//console.log(response.data);
			//update the state with the response data
			this.setState({
				restaurants1: this.state.restaurants1.concat(response.data),
			});
		});
    }

	}
  handleModalClose(){
		this.setState({show:!this.state.show}) 
		// const {history} = this.props;
	    // history.push('/customerhome'); 
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
  addToFavourites = (restid) =>{
    this.setState({
			show : true 
		  });
		const customerid = localStorage.getItem("userid");	
		const favourites = {
			customerid : customerid,
			restid:restid	
			};
		this.addToFavouritesTable(favourites);	
    
	}
  	addToFavouritesTable = (data) => {
		axios.defaults.withCredentials = true;
		axios.post(`${backendServer}/addtofavourites`, data).then((res) => {
       this.setState({
         message:res.data.message
       })
			// console.log("Status Code : ", res.status);
			// if (res.status === 200) {
			// 	this.setState({ authFlag: true });
			// } else {
			// 	this.setState({ authFlag: false });
			// }
		});
	}
     
     
      navigatetorestaurant = (val1,val2) => {
        console.log(val1);
        console.log(val2);
        //  window.location.href='/SingleRestDashboard';
        localStorage.setItem("restid", val1);
        localStorage.setItem("restname", val2);
        const { history } = this.props;
        console.log(history);
        history.push("/singlerestdashboard");
	    };
      

    render(){
      var beforeSearch = null;
      var afterSearch = null;
      var favouriterest = null;
      var fav=null;

      if(this.state.message){
        fav =(
          <p>Already added as Favourite !</p>
        )
      }else{
        fav =(
          <p>Added to Favourites !</p>
        )
      }
      //console.log("city",this.state.city)
      if(this.state.city === "null" || this.state.city === "Add" || this.state.restaurants.length === 0){
          beforeSearch = ( 
          <div>
            <br/>
          <h1>All Restaurants</h1>
          <div className="card-list">
          
            {this.state.restaurants1.map((restaurant) => (
              <div>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    style={{ width: "18rem" ,height:'13rem'}}
                    variant="top"
                    src={`${backendServer}/${restaurant.profilepic}`}
                  />
                  <Card.Body>
                    <Card.Title className = "detailsincard">{restaurant.username}   ({restaurant.city})</Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem className = "detailsincard"><RiPhoneFill/>: {restaurant.phone} </ListGroupItem>
                      <ListGroupItem className = "detailsincard"><IoMail/>{restaurant.email}</ListGroupItem>
                      <div className="btngrp">
										<Button data-tip="Explore" className="cardbtn"
											onClick={() => {
												this.navigatetorestaurant(restaurant.restaurantid,restaurant.username);
											}}
										>
										<IoIosRestaurant/>
										</Button>
										<ReactTooltip />
										
                      <Button className="cardbtn" data-tip="Add To Favourites"
										  onClick={() => {
												this.addToFavourites(restaurant.restaurantid);
											}}
											>
											<MdFavoriteBorder/></Button>
											</div>
                    </ListGroup>
                   
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          </div>
        );
      }
      else{
        
          afterSearch = (
            <div>
            <h1> Restaurants Near You</h1>
            <div className="card-list">
            
              {this.state.restaurants.map((restaurant) => (
                <div >
                  <Card style= {{ width: "18rem" }} >
                    <Card.Img
                      style={{ width: "18rem" ,height : "13rem"}}
                      variant="top"
                      src={`${backendServer}/${restaurant.profilepic}`}
                    />
                    <Card.Body>
                    <Card.Title className = "detailsincard">{restaurant.username} ({restaurant.city})</Card.Title>
                    <ListGroup className="list-group-flush">
                       <ListGroupItem className = "detailsincard"><RiPhoneFill/>: {restaurant.phone} </ListGroupItem>
                      <ListGroupItem className = "detailsincard"><IoMail/>{restaurant.email}</ListGroupItem>
                      <div className="btngrp">
										<Button data-tip="Explore" className="cardbtn"
											onClick={() => {
												this.navigatetorestaurant(restaurant.restaurantid,restaurant.username);
											}}
										>
										<IoIosRestaurant/>
										</Button>
										<ReactTooltip />
										
                      <Button className="cardbtn" data-tip="Add To Favourites"
										  onClick={() => {
												this.addToFavourites(restaurant.restaurantid);
											}}
											>
											<MdFavoriteBorder/></Button>
											</div>
                    </ListGroup>
                   
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          </div>
        );
      }


      if(this.state.favourites === "found"){
         favouriterest = ( 
          <div>
          <h1>Your Favourites</h1>
          <div className="card-list">
          
            {this.state.favrestaurants.map((restaurant) => (
              <div>
                <Card >
                  <Card.Img
                    style={{ width: "18rem" }}
                    variant="top"
                    src={`${backendServer}/${restaurant.profilepic}`}
                  />
                  <Card.Body>
                    <Card.Title>{restaurant.username}</Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem> {restaurant.phone} </ListGroupItem>
                      <ListGroupItem> {restaurant.email}</ListGroupItem>
                      <div className ="form-buttons">
                      <Button  
                        onClick={() => {
                          this.navigatetorestaurant(restaurant.restaurantid,restaurant.username);
                        }}
                      >
                        Explore
                      </Button>
                      <Button className="cardbtn"><BiCartAlt/></Button>
                      </div>
                    </ListGroup>
                   
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          </div>
        );
      }
     
    return (
      
        <div className="container">
            
            {/* <Button className="btn-logout" onClick={this.addtocart}>Cart</Button> */}
            <form >
            <h1>Welcome {this.state.username} !</h1>
           
      
            
            <div>
              <Modal size="md-down"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={this.state.show} onHide={()=>this.handleModalClose()}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                {fav}
                </Modal.Body>
                
              </Modal>
      			</div>
            </form>
              
              {beforeSearch}
              {afterSearch}
            

              
     
       
     
        </div>
      
    )
    }
   
}
 
export default CustomerHome;