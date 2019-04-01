import {
    UPDATE_POST_LOADINGBAR,
    CREATE,
    REGISTER,
    UPDATE
} from '../constant';

const initialState = {
    loading: false,
    refresh: false
};

export default function createReducer(state = initialState, { type, payload }) {
    switch(type) {
        case UPDATE_POST_LOADINGBAR: 
            return Object.assign({}, state, {
                loading: payload.loading
            });
        case CREATE: 
            return Object.assign({}, state, {
                loading: payload.loading
            });
        case REGISTER:
            return Object.assign({}, state, {
                loading: payload.loading
            });
        case UPDATE:
            return Object.assign({}, state, {
                loading: payload.loading
            });
        default: 
        // return initial state
            return state;
    }
}