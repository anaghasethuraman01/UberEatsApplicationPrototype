import { RESTAURANT_HOME } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const restaurantHome = (userData) => dispatch => {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/getrestaurantwithid`, userData)
        .then(response => dispatch({
            type: RESTAURANT_HOME,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: RESTAURANT_HOME,
                    payload: error.response.data
                });
            }
            return;
        });
}
