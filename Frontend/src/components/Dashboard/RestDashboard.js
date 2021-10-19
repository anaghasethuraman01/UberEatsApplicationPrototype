import { Button } from "reactstrap";
import axios from "axios";
import React, { Component } from "react";

import {Modal, Card, ListGroup, ListGroupItem} from "react-bootstrap";
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
			show:false
			//favourites : []
		};
		this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios.get(`${backendServer}/getrestaurant`).then((response) => {
			this.setState({ status: "notdone" });
			
			console.log("componentDidMount");
			//update the state with the response data
			this.setState({
				restaurants: this.state.restaurants.concat(response.data),
			});
		});
	}
	handleModalClose(){
		this.setState({show:!this.state.show}) 
		// const {history} = this.props;
	    // history.push('/customerhome'); 
	}
	navigatetorestaurant = (id,name) => {
		localStorage.setItem("restid", id);
		localStorage.setItem("restname",name);
		const { history } = this.props;
		console.log(history);
		history.push("/singlerestdashboard");
	};

	searchRestaurantOnSubmit = (data) => {
		console.log("here")
		this.setState({
			restaurants: [],
		});
		//this.setState({ status: "done" });
		axios.defaults.withCredentials = true;
		axios.post(`${backendServer}/restsearchonsubmit`, data).then((res) => {
			console.log("in rest search");
			console.log(res.data)
				this.setState({
						restaurants: res.data,
				});
				// if (res.data.message) {
				// 	this.setState({ message: res.data.message });
				// } else {
				// 	this.setState({
				// 		restaurants: res.data,
				// 	});
				// }
			

			console.log("Status Code : ", res.status);
			if (res.status === 200) {
				this.setState({ authFlag: true });
			} else {
				this.setState({ authFlag: false });
			}
		});
	};

	fullSearchSubmit = (e) => {
		e.preventDefault();
		const city = this.state.city;
		const foodtype = this.state.foodtype;
		const deliverytype =this.state.deliverytype;
		const dish = this.state.dish;
		console.log(foodtype)
		if (city != null || foodtype != null || deliverytype != null ||dish != null ) {
			const values = {
				city: city,
				foodtype:foodtype,
				deliverytype:deliverytype,
				dish:dish
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
			restid:restid	
			};
		this.addToFavouritesTable(favourites);	
	}
	addToFavouritesTable = (data) => {

		axios.defaults.withCredentials = true;
		axios.post(`${backendServer}/addtofavourites`, data).then((res) => {
			console.log("Status Code : ", res.status);
			if (res.status === 200) {
				this.setState({ authFlag: true });
			} else {
				this.setState({ authFlag: false });
			}
		});
	};
	render() {
		
		console.log(this.state.favourites)
		var beforeSearch = null;
		var afterSearch = null;

		if (this.state.status === "done") {
			afterSearch = (
				<div className="card-list">
					{this.state.restaurants1.map((restaurant) => (
						<div>
							<Card style={{ width: "18rem" }}>
							<Card.Img 
									style={{ width: "18rem",height: "13rem" }}
									variant="bottom"
									src={`${backendServer}/${restaurant.profilepic}`}
								/>
								<Card.Body>
									<Card.Title className = "detailsincard">{restaurant.username} ({restaurant.city})</Card.Title>
									<ListGroup className="list-group-flush">
										  <ListGroupItem className = "detailsincard"><RiPhoneFill/>: {restaurant.phone} </ListGroupItem>
                      					  <ListGroupItem className = "detailsincard"><IoMail/>{restaurant.email}</ListGroupItem>
									</ListGroup>
									<ReactTooltip />
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
												this.addToFavourites(restaurant.restaurantid,restaurant.username);
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
					{this.state.restaurants.map((restaurant) => (
						<div >
							
							<Card  style={{ width: "18rem" }}>
								
								<Card.Img
									style={{ width: "18rem" ,height:"13rem"}}
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
			);
		}
		return (
			<div >
				{/* <AddToCart/> */}
				<h1 className="container">List of All Restaurants</h1>
				<div className="cartitems">
					<form >
						City:
						<input className="form-group"
							type="text"
							name="city"
							value={this.state.city}
							onChange={this.handleChange}
							required
						></input>
						
					</form>
					<br/>
					<form >
						Dish Name:
						<input className="form-group"
							type="text"
							name="dish"
							value={this.state.dish}
							onChange={this.handleChange}
							required
						></input>
						{/* <Button onClick={this.handleDishSubmit} type="submit">
							Search
						</Button> */}
					</form>
				
					<br/>
					</div>
			<div className="cartitems">	
			

              Food Type :
            	<select className="form-group1" name="foodtype" name="foodtype"  value={this.state.foodtype} onChange={this.handleChange} >
              	<option value="">All</option> 
              	<option value="Veg" >Veg</option>
              	<option value="Non-veg"  >Non-veg</option>
              	<option value="Vegan" >Vegan</option>
            	</select>
         	
             Mode of Delivery :
            <select className="form-group1" name="deliverytype" value={this.state.deliverytype} onChange={this.handleChange}>
              <option value="">All</option> 
              <option value="Pick Up">Pick Up</option>
              <option value="Delivery">Delivery</option>
            </select>
         	
			  </div>
				<div>
					<form>
						<Button onClick={this.fullSearchSubmit} type="submit">
							Search
						</Button>
					</form>
					<br />
					<form>
						<Button onClick={this.goback}>Go To Home Page</Button>
					</form>
				</div>
				<div className="container">
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
					<p>Added to Favourites!</p>
					</Modal.Body>
					
				</Modal>
      			</div>
			</div>
		);
	}
}

export default RestDashboard;
