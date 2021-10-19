import { USER_LOGIN, RESTAURANT_LOGIN, USER_LOGOUT} from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const userLogin = (userData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/custlogin`, userData)
        .then(response => dispatch({
            type: USER_LOGIN,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_LOGIN,
                    payload: error.response.data
                });
            }
            return;
        });
}


export const restaurantLogin = (userData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/restlogin`, userData)
        .then(response => dispatch({
            type: RESTAURANT_LOGIN,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: RESTAURANT_LOGIN,
                    payload: error.response.data
                });
            }
            return;
        });
}

export const userLogout = () => dispatch => dispatch({type: USER_LOGOUT});