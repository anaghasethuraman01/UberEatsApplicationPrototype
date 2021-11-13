import { combineReducers } from "redux";
// import customerProfileReducer from './customerProfileReducer'
// import ownerProfileReducer from './ownerProfileReducer'
import signupReducer from "./signupReducer";
import loginReducer from "./loginReducer";
import profileReducer from "./profileReducer";
import favouriteReducer from "./favouriteReducer";
import customerHomeReducer from "./customerHomeReducer";
import restaurantHomeReducer from "./restaurantHomeReducer";


export default combineReducers({
  
  signup: signupReducer,
  login:  loginReducer,
  profile: profileReducer,
  favourite: favouriteReducer,
  userhome: customerHomeReducer,
  resthome:restaurantHomeReducer
});