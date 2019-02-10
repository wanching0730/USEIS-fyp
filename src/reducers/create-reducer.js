import {
    UPDATE_POST_LOADINGBAR,
    // CREATE_SOCIETY,
    // CREATE_EVENT,
    // CREATE_NEWSFEED,
    // CREATE_RATING,
    CREATE,
    REGISTER,
    UPDATE
    // UPDATE_SOCIETY,
    // UPDATE_EVENT
} from '../constant';

const initialState = {
    loading: false,

    // createdSocietyId: null,
    // createdEventId: null,
    // createdNewsfeedId: null,
    // createdRatingId: null,
    // registeredSocietyId: null,
    // registeredEventId: null,
    // registeredCrewEventId: null,
    // updatedSocietyId: null,
    // updatedEventId: null,
    refresh: false
};

export default function createReducer(state = initialState, { type, payload }) {
    switch(type) {
        case UPDATE_POST_LOADINGBAR: 
            return Object.assign({}, state, {
                loading: payload.loading
            });
        // case CREATE_SOCIETY: 
        //     return Object.assign({}, state, {
        //         createdSocietyId: payload.createdSocietyId,
        //         loading: payload.loading
        //     });
        // case CREATE_EVENT:
        //     return Object.assign({}, state, {
        //         createdEventId: payload.createdEventId,
        //         loading: payload.loading
        //     });
        // case CREATE_NEWSFEED:
        //     return Object.assign({}, state, {
        //         createdNewsfeedId: payload.createdNewsfeedId,
        //         loading: payload.loading
        //     });
        // case CREATE_RATING:
        //     return Object.assign({}, state, {
        //         createdRatingId: payload.createdRatingId,
        //         loading: payload.loading
        //     });
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
        // case UPDATE_SOCIETY:
        //     return Object.assign({}, state, {
        //         updatedSocietyId: payload.updatedSocietyId,
        //         loading: payload.loading
        //     });
        // case UPDATE_EVENT:
        //     return Object.assign({}, state, {
        //         updatedEventId: payload.updatedEventId,
        //         loading: payload.loading
        //     });
        default: 
        // return initial state
            return state;
    }
}