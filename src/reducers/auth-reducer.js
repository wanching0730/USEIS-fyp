import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
} from '../constant';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
};

export default function authReducer(state = initialState, { type, payload }) {
    switch(type) {
        case LOGIN_USER_SUCCESS:
            return payload.user;
        default: 
        // return initial state
            return state;
    }
}