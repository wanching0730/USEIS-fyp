import {
    CREATE_SOCIETY,
    CREATE_EVENT
} from '../constant';

const initialState = {
    createdSocietyId: null,
    createdEventId: null
};

export default function createReducer(state = initialState, { type, payload }) {
    switch(type) {
        case CREATE_SOCIETY: 
            return Object.assign({}, state, {
                //createdSocietyId: payload.createdSocietyId
            });
        case CREATE_EVENT:
            return Object.assign({}, state, {
                //createdEventId: payload.createdEventId
            });
        default: 
        // return initial state
            return state;
    }
}