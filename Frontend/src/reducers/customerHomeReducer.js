import { USER_HOME } from "../actions/types";

const initialState = {
  userhome: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_HOME:
      return {
        ...state,
        userhome: action.payload,
      };
    default:
      return state;
  }
}