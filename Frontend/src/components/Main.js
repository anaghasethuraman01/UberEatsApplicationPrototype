import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';

import '../App.css';
import RestaurantProfile from './Profile/RestaurantProfile';
import RestaurantEditProfile from './Profile/RestaurantEditProfile';
import CustomerProfile from './Profile/CustomerProfile';
import CustomerHome from './HomePage/CustomerHome';
import RestaurantHome from './HomePage/RestaurantHome';
import AddRestaurantMenu from './Menu/AddRestaurantMenu';
import RestDashboard from './Dashboard/RestDashboard';
import CustomerEditProfile from './Profile/CustomerEditProfile';
import AllDishMenu from './Menu/AllDishMenu';
import SingleRestDashboard from './Dashboard/SingleRestDashboard';
import AddToCart from './Dashboard/AddToCart';
import Favourites from './Dashboard/Favourites';
import CheckOut from './Dashboard/Checkout';
import OrdersPage from './Dashboard/OrdersPage';
import CustomerOrder from './Dashboard/CustomerOrder';
import EditDishPage from './Menu/EditDishPage';
import LaunchCustomer from './Dashboard/LaunchCustomer';
import Navbar1 from './Navbar/Navbar';
import LaunchRestaurant from './Dashboard/LaunchRestaurant';

//import 'bootstrap/dist/css/bootstrap.css';
class Main extends Component {
    render() {
        return (
            <Router>       
                <div >
                    <Route path="/" component={Navbar1} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/customerprofile" component={CustomerProfile} />
                    <Route path="/restaurantprofile" component={RestaurantProfile} />
                    <Route path="/customerhome" component={CustomerHome} />
                    <Route path="/addrestaurantmenu" component={AddRestaurantMenu} />
                    <Route path="/restauranthome" component={RestaurantHome} />
                    <Route path="/restdashboard" component={RestDashboard} />
                    <Route path="/restauranteditprofile" component={RestaurantEditProfile} />
                    <Route path="/customereditprofile" component={CustomerEditProfile} />
                    <Route path="/alldishmenu" component={AllDishMenu} />
                    <Route path="/singlerestdashboard" component={SingleRestDashboard} />
                    <Route path="/addtocart" component={AddToCart} />
                    <Route path="/favourites" component={Favourites} />
                    <Route path="/checkout" component={CheckOut}/>
                    <Route path="/orderspage" component={OrdersPage}/>
                    <Route path="/customerorder" component={CustomerOrder}/>
                    <Route path="/editdishpage" component={EditDishPage}/>
                    <Route path="/launchCustomer" component={LaunchCustomer}/>
                    <Route path="/launchRestaurant" component={LaunchRestaurant}/>

                    

                </div>    
            </Router>
            
        )
    }
}
   

export default Main;
