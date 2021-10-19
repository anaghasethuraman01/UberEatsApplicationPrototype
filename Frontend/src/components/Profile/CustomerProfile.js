
import React, {Component} from 'react';
import { Button } from 'reactstrap';
import backendServer from "../../webConfig";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userProfile} from "../../actions/profileActions";
class CustomerProfile extends Component {
    
    constructor(props){
        super(props);
          this.state = {
            customerdetails:[]
          }
        // this.state = {
        //   userid: localStorage.getItem("userid"),
        //   username: localStorage.getItem("username"),
        //   email:localStorage.getItem("email"),
        //   phone: localStorage.getItem("phone"),
        //   dob:localStorage.getItem("dob"),
        //   address:localStorage.getItem("address"),
        //   state:localStorage.getItem("state"),
        //   city:localStorage.getItem("city"),
        //   country:localStorage.getItem("country"),
        //   nickname:localStorage.getItem("nickname"),
        //   about:localStorage.getItem("about"),
        //   profilepic:localStorage.getItem("profilepic"),
        //   favourites:null,
        //   loading: false,
        //   output: null,
        //   customerdetails:[]
        // }
        this.handleChange = this.handleChange.bind(this);
      }
      componentDidMount() {
        const customerid = {
          userid: localStorage.getItem("userid")
        };
        this.props.userProfile(customerid);
        
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            var { profile } = nextProps;
          
            var userData = {
                userid: profile._id || this.state.userid,
                username: profile.username || this.state.username,
                email: profile.email || this.state.email,
            };

            this.setState({customerdetails:userData});
        }
    }
    
      // componentWillReceiveProps(nextProps){
      //     if(nextProps.user){
      //       var { user } = nextProps;
      //       console.log(user);
      //     }
      // }

        // axios.post(`${backendServer}/getcustomerprofile`,customerid).then((response) => {
        //   console.log(response.data);
        //   //update the state with the response data
        //   this.setState({
        //     customerdetails: this.state.customerdetails.concat(response.data),
        //   });
        //   console.log(this.customerdetails)
        //   this.setState({
        //     username: this.state.customerdetails[0]['username'],
        //   });
        //   this.setState({
        //     nickname: this.state.customerdetails[0]['nickname'],
        //   });
        //   this.setState({
        //     about: this.state.customerdetails[0]['about'],
        //   });
        //   this.setState({
        //     address: this.state.customerdetails[0]['address'],
        //   });
        //   this.setState({
        //     phone: this.state.customerdetails[0]['phone'],
        //   });
        //   this.setState({
        //     email: this.state.customerdetails[0]['email'],
        //   });
        //   this.setState({
        //     city: this.state.customerdetails[0]['city'],
        //   });
        //   this.setState({
        //     dob: this.state.customerdetails[0]['dob'],
        //   });
        //   this.setState({
        //     state: this.state.customerdetails[0]['state'],
        //   });
        //   this.setState({
        //     country: this.state.customerdetails[0]['country'],
        //   });
         
        // });
      
     
      handleSubmit = (customerObj) => {
        localStorage.setItem("CustomerDetails",JSON.stringify(customerObj));
        const {history} = this.props;
        history.push('/customereditprofile'); 
      }
      findFood = (e) => {
        e.preventDefault();
        window.location.href='/RestDashboard';
      }
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }
        goback = (e) =>{
            e.preventDefault();
            const {history} = this.props;
            history.push('/customerhome'); 
          }
        
          saveFile = (e) => {
            e.preventDefault();
            this.setState({file:e.target.files[0]});
            this.setState({fileName:e.target.files[0].name});
            
          };
        
         
       
          
    render(){
    
        // this.setState({
        //   customerdetails: this.props.profile,
        // });
      
      //console.log(this.state.customerdetails)
      
     let username = "";
     let customerdetails = []
      const imgLink = `${backendServer}/${localStorage.getItem("profilepic")}`;
      username = this.props.profile.username;
      // console.log("Cus De")
      //  console.log(this.state.customerdetails);
    return (


      <div className="container">
      <div className="login-form">
        <div className="main-div">
          <div className="panel">
          <h1>Welcome {this.state.customerdetails.username}</h1>
          </div>
          <div className="form-group">

          <img src={imgLink} alt="No image added. Add Image." style={{ maxHeight: '180px', maxWidth: '180px' }} />
          
          </div>
          <div className="form-group">
          <h4>About : {this.state.customerdetails.about}</h4>
          </div>
          <div className="form-group">
          <h4>Call Me : {this.state.customerdetails.nickname}</h4>
          </div>
          <div className="form-group">
          <h4>Email: {this.state.customerdetails.email}</h4>
          </div>
          <div className="form-group">
            <h4> Phone: {this.state.customerdetails.phone}</h4>
          
          </div>
          <div className="form-group">
            <h4>  DoB: {this.state.customerdetails.dob}</h4>
          
          </div>
          <div className="form-group">
            <h4> Apt and Street No: {this.state.customerdetails.address}</h4>
          
          </div>
          <div className="form-group">
            <h4> City: {this.state.customerdetails.city}</h4>
          
          </div>
          <div className="form-group">
            <h4> State: {this.state.customerdetails.state}</h4>
          
          </div>
          <div className="form-group">
            <h4> Country: {this.state.customerdetails.country}</h4>
          
          </div>
         
          <Button 
          onClick={() => {
            this.handleSubmit(this.state.customerdetails);
            }}
          // onClick = {this.handleSubmit} 
          >Update Profile</Button>

          <Button onClick = {this.goback}>Back</Button>
        </div>
      </div>
    </div>
       
    )
    }
   
}
 
CustomerProfile.propTypes = {
  userProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
  };
};

export default connect(mapStateToProps, {userProfile})(CustomerProfile);