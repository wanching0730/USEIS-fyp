import {browserHistory} from 'react-router';
import { verifyUser, updateDataDouble } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';
import firebase from 'firebase';

import {
    LOGIN_USER_SUCCESS,
    // LOGIN_USER_FAILURE,
    // LOGIN_USER_REQUEST,
    LOGOUT_USER,
    GET_FCM_TOKEN
} from '../constant';

export function getFcmTokenSuccessful(token, messaging) {
    return {
        type: GET_FCM_TOKEN,
        payload: {
            fcmToken: token,
            messaging: messaging
        }
    }
}

export function loginUserSuccessful(userName, userId, id, user, societies, token) {
    localStorage.setItem('token', token);

    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            userName: userName,
            userId: userId,
            id: id,
            user: user,
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

export function getFcmToken(postData) {
    return function (dispatch) {
        const messaging = firebase.messaging();
        // need credential before getting FCM token
        messaging.usePublicVapidKey("BKCWz7kE-vlcFudrN0S4M9z-RTZVp8J-ncVbYQoRgObAeDfJEO8bHNYL0dgtTlpxRclWNUci_YwvfYUtbUK9lqQ");
        messaging
        .requestPermission()
        .then(() => {
            console.log("Have Permission");
            messaging.getToken().then(token => {
                console.log("FCM Token:", token);
                postData["fcmToken"] = token;

                const data = Object.keys(postData).map((key) => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]);
                }).join('&');

                return updateDataDouble("fcmToken", data).then(result => result.json()).then(reply => {
                    console.log("messaging: " + messaging);
                    dispatch(getFcmTokenSuccessful(token, messaging));
                });
            }).catch(error => console.log("failed token: " + error));
        })
        .catch(error => {
            if (error.code === "messaging/permission-blocked") {
                console.log("Please Unblock Notification Request Manually");
            } else {
                console.log("Error Occurred", error);
            }
        });
    }
}

export function loginUser(postData) {
    return function (dispatch) {
        const data = Object.keys(postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]);
        }).join('&');
    
        return verifyUser(data).then(result => result.json()).then(reply => {

            let user = reply["user"];
            let userSociety = reply["userSociety"];
            let token = reply["token"];
            var societies = [];
            
            let userName = user[0]["username"];
            let userId = user[0]["userId"];

            if(userName.substring(0,2) === "00") {
                let id = user[0]["staffId"];
                if(userSociety.length > 0) {
                    for(var i = 0; i < userSociety.length; i++) {
                        societies.push({
                            societyId: userSociety[i]["societyId"],
                            name: userSociety[i]["name"],         
                            position: userSociety[i]["position"],
                            joinDate: "-"
                        })
                    }
                }
                
                dispatch(loginUserSuccessful(userName, userId, id, societies, token));
            } else {
                let id = user[0]["studentId"];
                if(userSociety.length > 0) {
                    for(var i = 0; i < userSociety.length; i++) {
                        societies.push(userSociety[i]);
                    }
                }

                dispatch(loginUserSuccessful(userName, userId, id, user, societies, token));
            }

            browserHistory.push("/home");

            console.log("token: " + reply["token"]);
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