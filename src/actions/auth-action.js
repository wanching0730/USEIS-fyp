import {browserHistory} from 'react-router';
import { verifyUser } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER
} from '../constant';

export function loginUserSuccessful(userName, userId, id, societies, events, token) {
    localStorage.setItem('token', token);

    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            userName: userName,
            userId: userId,
            id: id,
            societies: societies,
            events: events,
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

            let user = reply["user"];
            let userSociety = reply["userSociety"];
            let userEvent = reply["userEvent"];
            let token = reply["token"];
            var societies = [];
            var events = [];
            
            let userName = user[0]["name"];
            let userId = user[0]["userId"];

            if(userName.substring(0,2) == "00") {
                console.log("username substring: " + userName.substring(0,2));
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
                    console.log("user societies: " + societies);
                }

                if(userEvent.length > 0) {
                    for(var i = 0; i < userEvent.length; i++) {
                        events.push({
                            eventId: userEvent[i]["eventId"],
                            name: userEvent[i]["name"],
                            category: userEvent[i]["category"],
                            date: userEvent[i]["eventDateTime"],
                            organiser: userEvent[i]["organiser"],
                            joinDate: userEvent[i]["joinDate"],
                            position: userEvent[i]["position"],
                            crewStatus: userEvent[i]["crewStatus"],
                            vegetarian: userEvent[i]["vegetarian"]
                        })
                    }
                }
                
                dispatch(loginUserSuccessful(userName, userId, id, societies, events, token));
            } else {
                console.log("username substring: " + userName.substring(0,2));
                let id = user[0]["studentId"];
                if(userSociety.length > 0) {
                    for(var i = 0; i < userSociety.length; i++) {
                        societies.push({
                            societyId: userSociety[i]["societyId"],
                            name: userSociety[i]["name"],
                            category: userSociety[i]["category"],
                            position: userSociety[i]["position"],
                            joinDate: userSociety[i]["joinDate"]
                        })
                    }
                }

                if(userEvent.length > 0) {
                    for(var i = 0; i < userEvent.length; i++) {
                        events.push({
                            eventId: userEvent[i]["eventId"],
                            name: userEvent[i]["name"],
                            category: userEvent[i]["category"],
                            date: userEvent[i]["eventDateTime"],
                            organiser: userEvent[i]["organiser"],
                            joinDate: userEvent[i]["joinDate"],
                            position: userEvent[i]["position"],
                            crewStatus: userEvent[i]["crewStatus"],
                            vegetarian: userEvent[i]["vegetarian"]
                        })
                    }
                }

                dispatch(loginUserSuccessful(userName, userId, id, societies, events, token));
            }

            browserHistory.push("/home");

            console.log("token: " + reply["token"]);
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