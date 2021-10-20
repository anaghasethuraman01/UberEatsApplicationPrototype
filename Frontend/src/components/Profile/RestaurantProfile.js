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
        // {
        //   restaurantid:localStorage.getItem("restaurantid"),
        //   username: localStorage.getItem("restaurantname"),
        //   foodtype:null,
        //   zipcode:localStorage.getItem("zipcode"),
        //   description:localStorage.getItem("description"),
        //   email:localStorage.getItem("email"),
        //   phone: localStorage.getItem("phone"),
        //   timing:localStorage.getItem("timing"),
        //   city:localStorage.getItem("city"),
        //   deliverytype: localStorage.getItem("deliverytype"),
        //   foodtype:localStorage.getItem("foodtype"),
        //   days:localStorage.getItem("days"),
        //   restprofilepic:localStorage.getItem("restprofilepic"),
        //   loading: false,
        //   output: null,
        //   file:null,
        //   fileName:null,
        //   restaurantdetails:[]
        // }
      
    
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
                timings:profile.timings||this.state.timings,
                deliverytype:profile.deliverytype||this.state.deliverytype,
                zipcode:profile.zipcode||this.state.zipcode,
                foodtype:profile.foodtype|| this.state.foodtype
            };
            
            this.setState({restaurantdetails:restaurantData});
        }
    }
    goback = (e) =>{
      e.preventDefault();
      const {history} = this.props;
      history.push('/restauranthome'); 
    }
      // componentDidMount() {
      //   const restaurantid = {
      //     restaurantid: this.state.restaurantid
      //   };
      //   axios.post(`${backendServer}/getrestaurantprofile`,restaurantid).then((response) => {
      //     console.log(response.data);
      //     //update the state with the response data
      //     this.setState({
      //       restaurantdetails: this.state.restaurantdetails.concat(response.data),
      //     });
      //     //console.log(this.restaurantdetails)
      //     this.setState({
      //       username: this.state.restaurantdetails[0]['username'],
      //     });
      //     this.setState({
      //       foodtype: this.state.restaurantdetails[0]['foodtype'],
      //     });
      //     this.setState({
      //       city: this.state.restaurantdetails[0]['city'],
      //     });
      //     this.setState({
      //       phone: this.state.restaurantdetails[0]['phone'],
      //     });
      //     this.setState({
      //       email: this.state.restaurantdetails[0]['email'],
      //     });
      //     this.setState({
      //       days: this.state.restaurantdetails[0]['days'],
      //     });
      //     this.setState({
      //       deliverytype: this.state.restaurantdetails[0]['deliverytype'],
      //     });
      //     this.setState({
      //       description: this.state.restaurantdetails[0]['description'],
      //     });
      //     this.setState({
      //       timing: this.state.restaurantdetails[0]['timing'],
      //     });
      //     this.setState({
      //       zipcode: this.state.restaurantdetails[0]['zipcode'],
      //     });
         
      //   });
      // }
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