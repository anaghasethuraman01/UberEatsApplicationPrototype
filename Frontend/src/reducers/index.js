import { combineReducers } from "redux";
// import customerProfileReducer from './customerProfileReducer'
// import ownerProfileReducer from './ownerProfileReducer'
import signupReducer from "./signupReducer";
import loginReducer from "./loginReducer";
import profileReducer from "./profileReducer";
import favouriteReducer from "./favouriteReducer";


export default combineReducers({
  
  signup: signupReducer,
  login:  loginReducer,
  profile: profileReducer,
  favourite: favouriteReducer
});