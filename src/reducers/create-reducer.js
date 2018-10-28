import {
    CREATE_SOCIETY,
    CREATE_EVENT,
    CREATE_NEWSFEED,
    CREATE_RATING,
    REGISTER_SOCIETY,
    REGISTER_EVENT
} from '../constant';

const initialState = {
    createdSocietyId: null,
    createdEventId: null,
    createdNewsfeedId: null,
    createdRatingId: null,
    registeredSocietyId: null,
    registeredEventId: null,
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
        case CREATE_RATING:
            return Object.assign({}, state, {
                createdRatingId: payload.createdRatingId
            });
        case REGISTER_SOCIETY:
            return Object.assign({}, state, {
                registeredSocietyId: payload.registeredSocietyId
            });
        case REGISTER_EVENT:
            return Object.assign({}, state, {
                registeredEventId: payload.registeredEventId
            });
        default: 
        // return initial state
            return state;
    }
}