import { Button } from "reactstrap";
import axios from "axios";
import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem} from "react-bootstrap";

import {IoIosRestaurant} from 'react-icons/io';
import {RiPhoneFill} from 'react-icons/ri';
import {IoMail} from 'react-icons/io5';

import backendServer from "../../webConfig";
import ReactTooltip from 'react-tooltip';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { customerFavourite } from "../../actions/favouriteActions";
class Favourites extends Component {
	constructor(props) {
		super(props);

		this.state = {
			favrestaurants : []
		};
          
	}

	componentDidMount() {
	
		
            const customerid = {
                customerid:localStorage.getItem("userid")
            }
			
			// console.log(customerid);
			// console.log("******")
			this.props.customerFavourite(customerid);
   
	}
	
	componentWillReceiveProps(nextProps) {
        if (nextProps.favourite) {
            var { favourite } = nextProps;
		}
	
		this.setState({
			favrestaurants: this.state.favrestaurants.concat(favourite)
		});
		// console.log(typeof(favourite))

	}

	navigatetorestaurant = (restaurantid,restaurantname,delivery) => {	
		console.log(restaurantid)
		//  window.location.href='/SingleRestDashboard';
		localStorage.setItem("restaurantid", restaurantid);
		localStorage.setItem("restaurantname", restaurantname);
		localStorage.setItem("deliverytype", delivery);
		const { history } = this.props;
		console.log(history);
		history.push("/singlerestdashboard");
	};


	goback = (e) => {
		e.preventDefault();

		const { history } = this.props;
		history.push("/customerhome");
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	
	render() {
		let favrestaurants = []; 
		
		var favouriterest = null;
        if(favrestaurants !== []){
                favouriterest = ( 
                <div>
                <h1>Your Favourites</h1>
                <div className="card-list">
                
                    {this.state.favrestaurants.map((restaurant) => (
                    <div>
						
                        <Card style={{ width: "18rem" }}>
                        <Card.Img
                            style={{ width: "18rem" }}
                            variant="top"
                            src={`${backendServer}${restaurant.profilepic}`}
                        />
                        <Card.Body>
                            <Card.Title className = "detailsincard">{restaurant.restaurantname}</Card.Title>
                            <ListGroup >
                            <ListGroupItem className = "detailsincard"><RiPhoneFill/> : {restaurant.phone} </ListGroupItem>
                            <ListGroupItem className = "detailsincard"><IoMail/>{restaurant.email}</ListGroupItem>
							<ListGroupItem>
                           <ReactTooltip />
                            <Button  className="cardbtn1" data-tip="Explore"
                                onClick={() => {
                                this.navigatetorestaurant(restaurant._id,restaurant.restaurantname,restaurant.deliverytype);
                                }}
                            > 
                            <IoIosRestaurant/>
                            </Button>
                           
							</ListGroupItem>
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
			<div class="container">
				
		
				<div>
					
					<form>
						<Button onClick={this.goback}>Go To Home Page</Button>
					</form>
                    {favouriterest}
				</div>
			
			</div>
		);
	}
}



Favourites.propTypes = {
	customerFavourite: PropTypes.func.isRequired,
	favourite: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
	return {
		favourite: state.favourite.favourite
	};
  };
  
  export default connect(mapStateToProps, {customerFavourite})(Favourites);
