import { USER_PROFILE } from "../actions/types";

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
    //   case RESTAURANT_LOGIN:
    //   return {
    //     ...state,
    //     login: action.payload,
    //   };
    //   case USER_LOGOUT:
    //     return {};
    default:
      return state;
  }
}