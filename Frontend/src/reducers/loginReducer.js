import { USER_LOGIN, RESTAURANT_LOGIN, USER_LOGOUT } from "../actions/types";

const initialState = {
  login: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
      case RESTAURANT_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
      case USER_LOGOUT:
        return {};
    default:
      return state;
  }
}