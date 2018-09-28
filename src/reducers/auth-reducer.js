import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
} from '../constant';

const initialState = {
    token: null,
    userName: null,
    userId: null,
    id: null,
    societies: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
};

export default function authReducer(state = initialState, { type, payload }) {
    switch(type) {
        case LOGIN_USER_SUCCESS: 
            return Object.assign({}, state, {
                userName: payload.userName,
                userId: payload.userId,
                id: payload.id,
                societies: payload.societies,
                token: payload.token,
                isAuthenticated: true
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                userName: null,
                societies: null,
                token: null,
                isAuthenticated: false
            });
        default: 
        // return initial state
            return state;
    }
}