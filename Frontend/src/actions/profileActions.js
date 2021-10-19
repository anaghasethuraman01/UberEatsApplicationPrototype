import { USER_PROFILE } from "./types";
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


// export const restaurantLogin = (userData) => dispatch => {
//     axios.defaults.withCredentials = true;
//     axios.post(`${backendServer}/restlogin`, userData)
//         .then(response => dispatch({
//             type: RESTAURANT_LOGIN,
//             payload: response.data
//         }))
//         .catch(error => {
//             if (error.response && error.response.data) {
//                 return dispatch({
//                     type: RESTAURANT_LOGIN,
//                     payload: error.response.data
//                 });
//             }
//             return;
//         });
// }

