import {
    UPDATE_AUTH_LOADINGBAR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    GET_FCM_TOKEN
} from '../constant';

const initialState = {
    loading: false,
    
    token: null,
    userName: null,
    userId: null,
    id: null,
    user: null,
    societies: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    fcmToken: null,
    role: null,
    messaging: null
};

export default function authReducer(state = initialState, { type, payload }) {
    switch(type) {
        case UPDATE_AUTH_LOADINGBAR: 
            return Object.assign({}, state, {
                loading: payload.loading
            });
        case LOGIN_USER_SUCCESS: 
            return Object.assign({}, state, {
                userName: payload.userName,
                userId: payload.userId,
                id: payload.id,
                user: payload.user,
                societies: payload.societies,
                token: payload.token,
                role: payload.role,
                isAuthenticated: true,
                loading: payload.loading
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                userName: null,
                societies: null,
                token: null,
                isAuthenticated: false
            });
        case GET_FCM_TOKEN:
            return Object.assign({}, state, {
                fcmToken: payload.fcmToken,
                messaging: payload.messaging
            });
        default: 
        // return initial state
            return state;
    }
}