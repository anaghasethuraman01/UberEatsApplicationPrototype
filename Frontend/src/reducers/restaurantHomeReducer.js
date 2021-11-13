import { RESTAURANT_HOME } from "../actions/types";

const initialState = {
  resthome: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case RESTAURANT_HOME:
      return {
        ...state,
        resthome: action.payload,
      };
    default:
      return state;
  }
}