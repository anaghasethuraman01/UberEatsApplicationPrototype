import { FAVOURITES } from "../actions/types";

const initialState = {
  favourite: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FAVOURITES:
      return {
        ...state,
        favourite: action.payload,
      };
    default:
      return state;
  }
}