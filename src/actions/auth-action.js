import {browserHistory} from 'react-router';
import { verifyUser } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
} from '../constant';

export function loginUserSuccessful(student, societies, token) {
    localStorage.setItem('token', token);

    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            userName: student[1],
            societies: societies,
            token: token
        }
    }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    };
}

export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
        browserHistory.push('/');
    };
}

export function loginUser(postData) {
    return function (dispatch) {
        const data = Object.keys(postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]);
        }).join('&');
    
        return verifyUser(data).then(result => result.json()).then(reply => {

            var societies = [];
            let studentSociety = reply["studentSociety"];
            for(var i = 0; i < studentSociety.length; i++) {
                societies.push({
                    societyName: studentSociety[i][8],
                    position: studentSociety[i][10]
                })
            }
            console.log("student societies: " + societies);
            
            dispatch(loginUserSuccessful(reply["student"], societies, reply["token"]));
            browserHistory.push("/home");

            console.log("reply: " + JSON.stringify(reply));
            console.log("token: " + reply["token"]);
            console.log("user position: " + reply["studentSociety"][0][10]);
            console.log("token in local storage: " + localStorage.getItem('token'));
        })
        .catch(error => {
            confirmAlert({
                title: 'Invalid Login',
                message: 'Your user name and password are not valid' + error,
                buttons: [
                    {
                        label: 'Close',
                        onClick: () => {
                            console.log('Click close');
                        }
                    }
                ]
              })
        });
    }
}