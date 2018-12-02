import {
    UPDATE_DELETE_LOADINGBAR,
    DELETE_DATA
} from '../constant';

const initialState = {
    loading: false
};

export default function deleteReducer(state = initialState, { type, payload }) {
    switch(type) {
        case UPDATE_DELETE_LOADINGBAR:
            return Object.assign({}, state, {
                loading: payload.loading
            });
        case DELETE_DATA: 
        return Object.assign({}, state, {
            loading: payload.loading
        });
        default: 
            return state;
    }
}