import { FAVOURITES } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const customerFavourite = (userData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/getfavouriterestaurant`, userData)
        .then(response => dispatch({
            type: FAVOURITES,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: FAVOURITES,
                    payload: error.response.data
                });
            }
            return;
        });
}



