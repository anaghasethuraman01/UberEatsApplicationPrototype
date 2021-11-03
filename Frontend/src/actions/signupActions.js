import { USER_SIGNUP ,RESTAURANT_SIGNUP} from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const userSignup = (userData) => dispatch => {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/customerRegister`, userData)
        .then(response => dispatch({
            type: USER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}


export const restaurantSignup = (userData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/restaurantRegister`, userData)
        .then(response => dispatch({
            type: RESTAURANT_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: RESTAURANT_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}