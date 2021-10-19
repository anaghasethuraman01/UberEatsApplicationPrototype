import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import AddToCart from '../Dashboard/AddToCart';
import {FaShoppingCart} from 'react-icons/fa';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLogout } from "../../actions/loginActions";
import {MdViewDay} from 'react-icons/md';
import {
 
  Button,

} from 'react-bootstrap';
import LaunchCustomer from "../Dashboard/LaunchCustomer";
import LaunchRestaurant from "../Dashboard/LaunchRestaurant";
//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      openCanvas:false,
      openRestaurantCanvas:false
    };
  }
viewCart = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  }
   closeModal = () => {
     this.setState({ openModal: false });
    
  }
  closeCanvas = () =>{
    this.setState({ openCanvas: false });
  }
  closeRestaurantCanvas = () =>{
    this.setState({ openRestaurantCanvas: false });
  }
  viewCustomerLaunch = () =>{ 
    this.setState({ openCanvas: true });
  }
  viewRestaurantLaunch = () =>{
    this.setState({ openRestaurantCanvas: true });
  }
 
  checkOut = () => {
    this.setState({ openModal: false });
    const { history } = this.props;
    history.push('/checkout');
  }
  loginpage = e => {
    e.preventDefault();
    const {history} = this.props;
    history.push('/login'); 
    
  }
  registerpage = e => {
    e.preventDefault();
    const {history} = this.props;
    history.push('/register'); 
    
  }
  logout = e => {
        e.preventDefault();
        localStorage.setItem("userid","");
        window.localStorage.clear();
        //this.props.login.message = null;
        this.props.userLogout();
        const {history} = this.props;
        history.push('/register'); 
      }
      profile = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/customerprofile'); 
        this.setState({ openCanvas: false });
      }
      restaurantprofile = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/restaurantprofile'); 
        this.setState({ openRestaurantCanvas: false });
      }
      showfavourites = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/favourites'); 
        this.setState({ openCanvas: false });
      }
      findfood = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/restdashboard'); 
        this.setState({ openCanvas: false });
      }
      orders = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/customerorder'); 
        this.setState({ openCanvas: false });
      }
      restaurantorders = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/orderspage'); 
        this.setState({ openRestaurantCanvas: false });
      }
      home = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/customerhome'); 
        this.setState({ openCanvas: false });
      }
      restauranthome = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/restauranthome'); 
        this.setState({ openRestaurantCanvas: false });
      }

      addnewdish = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/addrestaurantmenu'); 
        this.setState({ openRestaurantCanvas: false });
      }
  render() {
    const {openModal} = this.state
    const {openCanvas} = this.state
    const {openRestaurantCanvas} = this.state
    //if Cookie is set render Logout Button
    
    const userNameSessionVal = localStorage.getItem('userid');
    const restaurantNameSessionVal = localStorage.getItem('restaurantid');
    let sessionAvail = null;
    if (userNameSessionVal != null && userNameSessionVal !== undefined && userNameSessionVal !== "" && (restaurantNameSessionVal === ""|| restaurantNameSessionVal ===null ||  restaurantNameSessionVal ===undefined) ) {
      sessionAvail = (
        <div className = "cartitems  ">
           <Button className="cartleft " variant="light" onClick={this.viewCart}><FaShoppingCart/>Cart</Button>
           <Button className="btn-logout " variant="light" onClick={this.logout}>Logout</Button>
            <Button className="btn-offcanvas-show"  variant="light" onClick={this.viewCustomerLaunch} >
            <MdViewDay/>
            </Button>
        </div>
      );
    } if (restaurantNameSessionVal != null && restaurantNameSessionVal !== undefined && restaurantNameSessionVal !== "" && (userNameSessionVal === ""|| userNameSessionVal ===null ||  userNameSessionVal ===undefined)) {
      sessionAvail = (
        <div className = "cartitems  ">
           <Button className="btn-logout " variant="light" onClick={this.logout}>Logout</Button>
            <Button className="btn-offcanvas-show"  variant="outline-light" onClick={this.viewRestaurantLaunch} >
            <MdViewDay/>
            </Button>
        </div>
      );
    }
    
    let redirectVar = null;
    // if (!cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/login" />;
    // }
    return (
      <div  >
        {redirectVar}
       <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
             
              <div className=" navbar-brand "><h1 className="ubereats"><span style={{ color:"white"}}>Uber</span> <span style={{ color:"green" }}>Eats</span></h1></div>
              
            {sessionAvail}
                { openModal
              ? (
                <AddToCart
                  closeModal={this.closeModal}
                  viewCart={this.viewCart}
                  handleSubmit={this.checkOut}
                 
                />
              )
              : null}
              { openCanvas
              ? (
                <LaunchCustomer
                  closeCanvas={this.closeCanvas}
                  viewCustomerLaunch={this.viewCustomerLaunch}   
                  profile ={this.profile}
                  orders={this.orders} 
                  showfavourites={this.showfavourites}
                  findfood={this.findfood}
                  home={this.home}
                />
              )
              : null}
               { openRestaurantCanvas
              ? (
                <LaunchRestaurant
                  closeRestaurantCanvas={this.closeRestaurantCanvas}
                  viewRestaurantLaunch={this.viewRestaurantLaunch}   
                  restaurantprofile ={this.restaurantprofile}
                  restaurantorders={this.restaurantorders} 
                  addnewdish={this.addnewdish}
                  restauranthome={this.restauranthome}
                />
              )
              : null}

            
            </div>
          </div>
        </nav>
      </div> 
    );
  }
}


export default connect(null, { userLogout })(Navbar);




