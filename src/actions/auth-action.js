import {browserHistory} from 'react-router';
import { verifyUser } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER
} from '../constant';

export function loginUserSuccessful(user, societies, events, token) {
    localStorage.setItem('token', token);

    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            userName: user[1],
            id: user[3],
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

            if(user[1].substring(0,2) == "00") {
                console.log("username substring: " + user[1].substring(0,2));
                for(var i = 0; i < userSociety.length; i++) {
                    societies.push({
                        societyId: userSociety[i][5],
                        position: userSociety[i][7]
                    })
                }
                console.log("user societies: " + societies);
            } else {
                console.log("username substring: " + user[1].substring(0,2));
                if(userSociety.length > 0) {
                    for(var i = 0; i < userSociety.length; i++) {
                        societies.push({
                            societyId: userSociety[i][8],
                            position: userSociety[i][10],
                            joinDate: userSociety[i][11]
                        })
                    }
                }

                if(userEvent.length > 0) {
                    for(var i = 0; i < userEvent.length; i++) {
                        events.push({
                            eventId: userEvent[i][9],
                            joinDate: userEvent[i][10],
                            position: userEvent[i][11],
                            crewStatus: userEvent[i][12],
                            vegetarian: userEvent[i][13]
                        })
                    }
                }
                
                console.log("user societies: " + societies);
                console.log("user events: " + events);
            }
        
            dispatch(loginUserSuccessful(user, societies, events, token));
            browserHistory.push("/home");

            //console.log("reply: " + JSON.stringify(reply));
            console.log("token: " + reply["token"]);
            //console.log("user position: " + reply["userSociety"][0][10]);
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