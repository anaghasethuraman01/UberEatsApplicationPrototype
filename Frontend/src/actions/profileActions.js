import { USER_PROFILE,RESTAURANT_PROFILE } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const userProfile = (userData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/getcustomerprofile`, userData)
        .then(response => dispatch({
            type: USER_PROFILE,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_PROFILE,
                    payload: error.response.data
                });
            }
            return;
        });
}


 export const restaurantProfile = (userData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/getrestaurantprofile`, userData)
        .then(response => dispatch({
            type: RESTAURANT_PROFILE,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: RESTAURANT_PROFILE,
                    payload: error.response.data
                });
            }
            return;
        });
}

