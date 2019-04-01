import {browserHistory} from 'react-router';
import { verifyUser, updateDataDouble } from '../utils/http_function';
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { confirmAlert } from 'react-confirm-alert';
import firebase from 'firebase';

import {
    UPDATE_AUTH_LOADINGBAR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    GET_FCM_TOKEN
} from '../constant';

export function updateAuthLoadingBarSuccessful() {
    return {
        type: UPDATE_AUTH_LOADINGBAR,
        payload: {
            loading: true
        }
    };
}

export function updateEndAuthLoadingBar() {
    return {
        type: UPDATE_AUTH_LOADINGBAR,
        payload: {
            loading: false
        }
    };
}

export function getFcmTokenSuccessful(token, messaging) {
    return {
        type: GET_FCM_TOKEN,
        payload: {
            fcmToken: token,
            messaging: messaging
        }
    }
}

export function loginUserSuccessful(userName, userId, id, user, societies, token, role, snackBarShow) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            userName: userName,
            userId: userId,
            id: id,
            user: user,
            societies: societies,
            token: token,
            role: role, 
            loading: false,
            snackBarShow: snackBarShow
        }
    }
}

export function updateAuthLoadingBar() {
    return function (dispatch) {
        dispatch(updateAuthLoadingBarSuccessful());
    }
}

export function logout() {
    return {
        type: LOGOUT_USER
    };
}

export function logoutAndRedirect() {
    return (dispatch) => {
        var poolData = {
            UserPoolId : 'ap-southeast-1_4dPeZiFVv', 
            ClientId : '1nts071hctdk3kvt7kt6h6pjf' 
        };
        var userPool = new CognitoUserPool(poolData); 
        userPool.getCurrentUser().signOut();
        localStorage.removeItem('token');

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
                alert("Please Unblock Notification Request Manually");
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
            let userName = user["user"]["username"];
            let userId = user["user"]["userId"];

            var societies = [];
            var role = user["role"] ? user["role"] : ""
            
            if(userName.substring(0,2) === "00" || userName.substring(0,2) === "01") {
                let id = user["staffId"];
                if(userSociety.length > 0) {
                    for(var i = 0; i < userSociety.length; i++) {
                        societies.push({
                            societyId: userSociety[i]["societyId"],
                            name: userSociety[i]["name"],         
                            roleName: userSociety[i]["roleName"],
                            joinDate: "-"
                        })
                    }
                }
                
                localStorage.setItem('token', token);
                dispatch(loginUserSuccessful(userName, userId, id, user, societies, token, role, false));
            } else {
                let id = user["studentId"];
                if(userSociety.length > 0) {
                    for(var i = 0; i < userSociety.length; i++) {
                        societies.push(userSociety[i]);
                    }
                }

                dispatch(loginUserSuccessful(userName, userId, id, user, societies, token, role, true));
            }

            browserHistory.push("/home");
        })
        .catch(error => {
            console.log("login error: " + error);
            confirmAlert({
                title: 'Login failed',
                message: "Invalid username or password",
                buttons: [
                    {
                        label: 'Close',
                        onClick: () => {
                            dispatch(updateEndAuthLoadingBar());
                            browserHistory.push({pathname:`/`});
                        }
                    }
                ]
              })
        });
    }
}