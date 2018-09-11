import {browserHistory} from 'react-router';
import { verifyUser } from '../utils/http_function';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
} from '../constant';

export function updateUser(newUser) {
    return {
        type: LOGIN_USER_REQUEST,
        payload: {
            user: newUser
        }
    }
}

export function loginUserSuccessful(user, token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            userName: user[1],
            userPosition: user[3],
            token: token
        }
    }
}

export function loginUser(postData) {
    return function (dispatch) {
        const data = Object.keys(this.postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(this.state[key]);
        }).join('&');
    
        return verifyUser(data).then(result => result.json()).then(reply => {
            
            dispatch(loginUserSuccessful(reply["user"], reply["token"]));
            browserHistory.push("/student");

            console.log("token: " + reply["token"]);
            console.log("user position: " + reply["user"][3]);
            console.log("token in local storage: " + localStorage.getItem('token'));
        });
    }
}