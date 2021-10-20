import { USER_PROFILE,RESTAURANT_PROFILE } from "../actions/types";

const initialState = {
  profile: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
      case RESTAURANT_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    
    default:
      return state;
  }
}