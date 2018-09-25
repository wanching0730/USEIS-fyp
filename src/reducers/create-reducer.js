import {
    CREATE_SOCIETY,
    CREATE_EVENT,
    CREATE_NEWSFEED
} from '../constant';

const initialState = {
    createdSocietyId: null,
    createdEventId: null,
    createdNewsfeedId: null,
    refresh: false
};

export default function createReducer(state = initialState, { type, payload }) {
    switch(type) {
        case CREATE_SOCIETY: 
            return Object.assign({}, state, {
                createdSocietyId: payload.createdSocietyId
            });
        case CREATE_EVENT:
            return Object.assign({}, state, {
                createdEventId: payload.createdEventId
            });
        case CREATE_NEWSFEED:
            return Object.assign({}, state, {
                createdNewsfeedId: payload.createdNewsfeedId
            });
        default: 
        // return initial state
            return state;
    }
}