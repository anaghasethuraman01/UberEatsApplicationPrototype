import { USER_HOME } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const customerHome = (userData) => dispatch => {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/getrestaurantwithcity`, userData)
        .then(response => dispatch({
            type: USER_HOME,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_HOME,
                    payload: error.response.data
                });
            }
            return;
        });
}


// export const customerHomeAll = () => dispatch => {
//     axios.defaults.headers.common.authorization = localStorage.getItem('token');
//     axios.defaults.withCredentials = true;
//     axios.get(`${backendServer}/getrestaurant`)
//         .then(response => dispatch({
//             type: USER_HOME,
//             payload: response.data
//         }))
//         .catch(error => {
//             if (error.response && error.response.data) {
//                 return dispatch({
//                     type: USER_HOME,
//                     payload: error.response.data
//                 });
//             }
//             return;
//         });
// }




