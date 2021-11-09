import React, {Component} from 'react';
import { Button} from 'reactstrap';
import backendServer from "../../webConfig";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { restaurantProfile} from "../../actions/profileActions";
class RestaurantProfile extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantdetails:[]
        };
    }
      componentDidMount() {
        const restaurantid = {
          userid: localStorage.getItem("restaurantid")
        };
        
        this.props.restaurantProfile(restaurantid);
      }
      componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            var { profile } = nextProps;       
            var restaurantData = {
                restaurantid: profile._id || this.state._id,
                restaurantname: profile.restaurantname || this.state.restaurantname,
                email: profile.email || this.state.email,
                description:profile.description|| this.state.description,
                phone:profile.phone|| this.state.phone,
                city:profile.city|| this.state.city,
                address:profile.address|| this.state.address,
                state:profile.state|| this.state.state,
                country:profile.country|| this.state.country,
                days:profile.days||this.state.days,
                timing:profile.timing||this.state.timing,
                deliverytype:profile.deliverytype||this.state.deliverytype,
                zipcode:profile.zipcode||this.state.zipcode,
                foodtype:profile.foodtype|| this.state.foodtype,
                profilepic:profile.profilepic||this.state.profilepic
            };
            
            this.setState({restaurantdetails:restaurantData});
            localStorage.setItem("profilepic",profile.profilepic)
        }
    }
    goback = (e) =>{
      e.preventDefault();
      const {history} = this.props;
      history.push('/restauranthome'); 
    }
      handleSubmit = (restaurantObj) => {
        localStorage.setItem("RestaurantDetails",JSON.stringify(restaurantObj));
        const {history} = this.props;
        history.push('/restauranteditprofile'); 
      }

      render(){
      const imgLink = `${backendServer}${localStorage.getItem("profilepic")}`;
    return (
      

      <div className="container">
      <div className="login-form">
        <div className="main-div">
          <div className="panel">
          <h1>Welcome to {this.state.restaurantdetails.restaurantname}</h1>
          </div>
          <div className="form-group">
          <img src={imgLink} alt="No image added. Add Image" style={{ maxHeight: '180px', maxWidth: '180px' }} />          
          </div>
          <div className="form-group">
          <h4>Description : {this.state.restaurantdetails.description}</h4>          
          </div>          
          <div className="form-group">
          <h4>Email: {this.state.restaurantdetails.email}</h4>
          </div>
          <div className="form-group">
            <h4> Phone: {this.state.restaurantdetails.phone}</h4>          
          </div>
          <div className="form-group">
            <h4>  Timings :  {this.state.restaurantdetails.timing}</h4>          
          </div>
          <div className="form-group">
            <h4>  Days: {this.state.restaurantdetails.days}</h4>
          </div>
          <div className="form-group">
            <h4> Delivery Type: {this.state.restaurantdetails.deliverytype}</h4>
          </div>
         
            <div className="form-group">
            <h4> Food Type: {this.state.restaurantdetails.foodtype}</h4>
          </div>
          <div className="form-group">
            <h4> Building and St. No. : {this.state.restaurantdetails.address}</h4>   
          </div>
          <div className="form-group">
            <h4> City: {this.state.restaurantdetails.city}</h4>
          
          </div>
          <div className="form-group">
            <h4> State: {this.state.restaurantdetails.state}</h4>         
          </div>
          <div className="form-group">
            <h4> Country: {this.state.restaurantdetails.country}</h4>         
          </div>
          <div className="form-group">
            <h4> Location Zip Code: {this.state.restaurantdetails.zipcode}</h4>
          
          </div>
         
          <Button
          onClick={() => {
            this.handleSubmit(this.state.restaurantdetails);
            }}
            >Update Profile</Button>
              <Button onClick = {this.goback}>Cancel</Button>

        </div>
      </div>
    </div>
    )
    }
   
}
 

RestaurantProfile.propTypes = {
  restaurantProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
  };
};

export default connect(mapStateToProps, {restaurantProfile})(RestaurantProfile);