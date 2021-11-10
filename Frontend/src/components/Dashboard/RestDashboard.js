import { Button } from "reactstrap";
import axios from "axios";
import React, { Component } from "react";

import {Modal, Card, ListGroup, ListGroupItem,Form,Col,Row,InputGroup,FormControl} from "react-bootstrap";
//import { Link } from 'react-router-dom';

import {MdFavoriteBorder} from 'react-icons/md';
import {IoIosRestaurant} from 'react-icons/io';
import backendServer from "../../webConfig";
import ReactTooltip from 'react-tooltip';
import {RiPhoneFill} from 'react-icons/ri';
import {IoMail} from 'react-icons/io5';


class RestDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			zipcode: null,
			restid: null,
			city: null,
			dish: null,
			foodtype: null,
			status: "notdone",
			deliverytype: null,
			restaurants: [],
			restaurants1: [],
			show:false,
			message:''
			//favourites : []
		};
		this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios.defaults.headers.common["authorization"] = localStorage.getItem(
			"token"
		);
		axios.get(`${backendServer}/getrestaurant`).then((response) => {
			this.setState({ status: "notdone" });
			//update the state with the response data
			this.setState({
				restaurants: this.state.restaurants.concat(response.data),
			});
			this.setState({
				restaurants1: this.state.restaurants1.concat(response.data),
			});
		});
	}
	handleModalClose(){
		this.setState({show:!this.state.show}) 
		// const {history} = this.props;
	    // history.push('/customerhome'); 
	}
	navigatetorestaurant = (restaurantid,restaurantname,deliverytype) => {
		localStorage.setItem("restaurantid", restaurantid);
		localStorage.setItem("restaurantname",restaurantname);
		localStorage.setItem("deliverytype",deliverytype);
		const { history } = this.props;
		history.push("/singlerestdashboard");
	};

	searchRestaurantOnSubmit = (data) => {
		axios.defaults.headers.common["authorization"] = localStorage.getItem(
			"token"
		);
		axios.defaults.withCredentials = true;
		axios.post(`${backendServer}/restsearchonsubmit`, data).then((res) => {
			//console.log(res.data);
			if(res.data !== 'No Dishes found'){
				this.setState({
					restaurants: res.data,
				});
			}else{
				this.setState({
					status:'notdone'
				});
			}
				
		});
	};

	fullSearchSubmit = (e) => {
		e.preventDefault();
		
		const city = this.state.city;
		// const foodtype = this.state.foodtype;
		const deliverytype =this.state.deliverytype;
		const dish = this.state.dish;
		const foodtype = this.state.foodtype;
		console.log("********")
		console.log(city)
		console.log(deliverytype)
		console.log(dish)
		console.log(foodtype)
		console.log("********")
		if((city === null || city === '') && (dish===null || dish === '') &&(deliverytype === '' || deliverytype === null ||deliverytype === "All") &&(foodtype === '' ||foodtype === null ||foodtype === "All") ){
			this.setState({ status: "notdone" });
			
		}
		else if(city !== null || deliverytype !== null || dish !==null || city !== '' || deliverytype !== '' ||dish !==''||foodtype !== ''||foodtype != "All" ){
			
		this.setState({ city:city });
		this.setState({ deliverytype:deliverytype });
		this.setState({ status: "done" });
		
		 if ((dish != null && dish != '') && ( foodtype === null || foodtype === '' )) {
			 console.log("here1")
			var values = {
				dish:dish,
				search:"dish"
			};
			this.searchRestaurantOnSubmit(values);
		 }
		 if (foodtype != null && foodtype != '' && foodtype !== "All" && (dish === null || dish === '')) {
			var values = {
			foodtype:foodtype,
			search:"foodtype"
		   };
		   this.searchRestaurantOnSubmit(values);
		}
		if( dish != null && dish != '' && foodtype != null && foodtype != '' && foodtype !== "All" )
		 var values = {
			foodtype:foodtype,
			dish:dish,
			search:"dishandtype"
		   };
		   this.searchRestaurantOnSubmit(values);
		}
	};
	goback = (e) => {
		e.preventDefault();
		const { history } = this.props;
		history.push("/customerhome");
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	addToFavourites = (restid) =>{
		this.setState({
			show : true 
		  });
		const customerid = localStorage.getItem("userid");	
		const favourites = {
			customerid : customerid,
			restaurantid:restid	
			};
		this.addToFavouritesTable(favourites);	
	}
	addToFavouritesTable = (data) => {
		axios.defaults.headers.common["authorization"] = localStorage.getItem(
			"token");
		axios.defaults.withCredentials = true;
		axios.post(`${backendServer}/addtofavourites`, data).then((res) => {
			this.setState({
				message:res.data.message
			  })
		});
	};
	render() {
		
		const {status,city,deliverytype} = this.state;
		let{restaurants,restaurants1} = this.state;
		
		if(status === 'done'){
			console.log("Done")	
			if (city !== null && city !== '') {
				restaurants = restaurants.filter((restaurant) => restaurant.city === city);
			}
			if (deliverytype !== null && deliverytype !== '' && deliverytype !== "All") {
				restaurants = restaurants.filter((restaurant) => restaurant.deliverytype === deliverytype);
			}
		}else if(status === 'notdone'){
			 restaurants = restaurants1;
		}
		var beforeSearch = null;
		var afterSearch = null;
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

		if (this.state.status === "done") {
			
	
			afterSearch = (
				<div className="card-list">
					{restaurants.map((restaurant) => (
						<div>
							<Card style={{ width: "18rem" }}>
							<Card.Img 
									style={{ width: "18rem",height: "13rem" }}
									variant="bottom"
									src={`${backendServer}${restaurant.profilepic}`}
								/>
								<Card.Body>
									<Card.Title className = "detailsincard">{restaurant.restaurantname} ({restaurant.city})</Card.Title>
									<ListGroup className="list-group-flush">
										  <ListGroupItem className = "detailsincard"><RiPhoneFill/>: {restaurant.phone} </ListGroupItem>
                      					  <ListGroupItem className = "detailsincard"><IoMail/>{restaurant.email}</ListGroupItem>
									</ListGroup>
									<ReactTooltip />
									<div className="btngrp">
										<Button data-tip="Explore" className="cardbtn"
											onClick={() => {
												this.navigatetorestaurant(restaurant._id,restaurant.restaurantname,restaurant.deliverytype);
											}}
										>
										<IoIosRestaurant/>
										</Button>
										<ReactTooltip />
										
                      					<Button className="cardbtn" data-tip="Add To Favourites"
										  onClick={() => {
												this.addToFavourites(restaurant._id);
											}}
											>
											<MdFavoriteBorder/></Button>
											</div>
								</Card.Body>
							</Card> 
						</div>
					))}
				</div>
			);
		} else {
			
			beforeSearch = (
				
				<div className="card-list">
					{this.state.restaurants1.map((restaurant) => (
						<div >
							
							<Card  style={{ width: "18rem" }}>
								
								<Card.Img
									style={{ width: "18rem" ,height:"13rem"}}
									variant="top"
									src={`${backendServer}${restaurant.profilepic}`}
								/>
								<Card.Body>
									<Card.Title className = "detailsincard">{restaurant.restaurantname} ({restaurant.city})</Card.Title>
									<ListGroup className="list-group-flush">
									  <ListGroupItem className = "detailsincard"><RiPhoneFill/>: {restaurant.phone} </ListGroupItem>
                      				  <ListGroupItem className = "detailsincard"><IoMail/>{restaurant.email}</ListGroupItem>
										<div className="btngrp">
										<Button data-tip="Explore" className="cardbtn"
											onClick={() => {
												this.navigatetorestaurant(restaurant._id,restaurant.restaurantname,restaurant.deliverytype);
											}}
										>
										<IoIosRestaurant/>
										</Button>
										<ReactTooltip />
										
                      					<Button className="cardbtn" data-tip="Add To Favourites"
										  onClick={() => {
												this.addToFavourites(restaurant._id);
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
			);
		}
		return (
			<div >
				{/* <AddToCart/> */}
				<h4 className="container">What are you craving ? </h4>
				<br/>
				
				<div className="container">
				<Form>
					<Row className="align-items-center">
						<Col xs="auto">
						City:
						<input className="form-group2"
							type="text"
							name="city"
							value={this.state.city}
							onChange={this.handleChange}
							required
						></input>
						</Col>
						<Col xs="auto">
						Dish Name:
						<input className="form-group2"
							type="text"
							name="dish"
							value={this.state.dish}
							onChange={this.handleChange}
							required
						></input>
						</Col>
						<Col xs="auto">
						Food Type :
						<select className="form-group1" name="foodtype" name="foodtype"  value={this.state.foodtype} onChange={this.handleChange} >
							<option value="All">All</option> 
							<option value="Veg" >Veg</option>
							<option value="Non-veg">Non-veg</option>
							<option value="Vegan" >Vegan</option>
						</select>
						</Col>
						<Col xs="auto">
						Mode of Delivery :
						<select className="form-group1" name="deliverytype" value={this.state.deliverytype} onChange={this.handleChange}>
							<option value="">All</option> 
							<option value="Pick Up">Pick Up</option>
							<option value="Delivery">Delivery</option>
						</select>
						</Col>
						<Col xs="auto">
						<Button onClick={this.fullSearchSubmit} type="submit">
							Search
						</Button>
						</Col>
					</Row>
				</Form>
				
				{beforeSearch}
				{afterSearch}
				</div>

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
			</div>
		);
	}
}

export default RestDashboard;
