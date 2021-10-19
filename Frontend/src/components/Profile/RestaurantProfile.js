import React, {Component} from 'react';
import axios from "axios";
// import cookie from 'react-cookies';
import { Button} from 'reactstrap';
import backendServer from "../../webConfig";
class RestaurantProfile extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantid:localStorage.getItem("restaurantid"),
          username: localStorage.getItem("restaurantname"),
          foodtype:null,
          zipcode:localStorage.getItem("zipcode"),
          description:localStorage.getItem("description"),
          email:localStorage.getItem("email"),
          phone: localStorage.getItem("phone"),
          timing:localStorage.getItem("timing"),
          city:localStorage.getItem("city"),
          deliverytype: localStorage.getItem("deliverytype"),
          foodtype:localStorage.getItem("foodtype"),
          days:localStorage.getItem("days"),
          restprofilepic:localStorage.getItem("restprofilepic"),
          loading: false,
          output: null,
          file:null,
          fileName:null,
          restaurantdetails:[]
        }
      }
      // logout = e => {
      //   e.preventDefault();
      //   window.localStorage.clear();
      //   const {history} = this.props;
      //   history.push('/login'); 
      // }

      componentDidMount() {
        const restaurantid = {
          restaurantid: this.state.restaurantid
        };
        axios.post(`${backendServer}/getrestaurantprofile`,restaurantid).then((response) => {
          console.log(response.data);
          //update the state with the response data
          this.setState({
            restaurantdetails: this.state.restaurantdetails.concat(response.data),
          });
          //console.log(this.restaurantdetails)
          this.setState({
            username: this.state.restaurantdetails[0]['username'],
          });
          this.setState({
            foodtype: this.state.restaurantdetails[0]['foodtype'],
          });
          this.setState({
            city: this.state.restaurantdetails[0]['city'],
          });
          this.setState({
            phone: this.state.restaurantdetails[0]['phone'],
          });
          this.setState({
            email: this.state.restaurantdetails[0]['email'],
          });
          this.setState({
            days: this.state.restaurantdetails[0]['days'],
          });
          this.setState({
            deliverytype: this.state.restaurantdetails[0]['deliverytype'],
          });
          this.setState({
            description: this.state.restaurantdetails[0]['description'],
          });
          this.setState({
            timing: this.state.restaurantdetails[0]['timing'],
          });
          this.setState({
            zipcode: this.state.restaurantdetails[0]['zipcode'],
          });
         
        });
      }
      handleSubmit = (restaurantObj) => {
        localStorage.setItem("RestaurantDetails",JSON.stringify(restaurantObj));
        const {history} = this.props;
        history.push('/restauranteditprofile'); 
      }

      
     
      render(){
      const imgLink = `${backendServer}/${localStorage.getItem("restprofilepic")}`;
      // console.log("***"); 
      // console.log(localStorage.getItem("restprofilepic"));
    return (
      

      <div className="container">
      <div className="login-form">
        <div className="main-div">
          <div className="panel">
          <h1>Welcome to {this.state.username}</h1>
          </div>
          <div className="form-group">

          <img src={imgLink} alt="No image added. Add Image" style={{ maxHeight: '180px', maxWidth: '180px' }} />
          
          </div>
          <div className="form-group">

          <h4>Description : {this.state.description}</h4>
          
          </div>
          
          <div className="form-group">
          <h4>Email: {this.state.email}</h4>
          </div>
          <div className="form-group">
            <h4> Phone: {this.state.phone}</h4>
          
          </div>
          <div className="form-group">
            <h4>  Timings :  {this.state.timing}</h4>
          
          </div>
          <div className="form-group">
            <h4>  Days: {this.state.days}</h4>
          
          </div>
          <div className="form-group">
            <h4> Delivery Type: {this.state.deliverytype}</h4>
          
          </div>
            <div className="form-group">
            <h4> Food Type: {this.state.foodtype}</h4>
          
          </div>
          <div className="form-group">
            <h4> City: {this.state.city}</h4>
          
          </div>
          <div className="form-group">
            <h4> Location Zip Code: {this.state.zipcode}</h4>
          
          </div>
         
          <Button
          onClick={() => {
            this.handleSubmit(this.state.restaurantdetails[0]);
            }}
            >Update Profile</Button>

        </div>
      </div>
    </div>
    )
    }
   
}
 
export default RestaurantProfile;