import {
    RETRIEVE_USER_SOCIETY,
    RETRIEVE_USER_EVENT,
    RETRIEVE_SOCIETIES,
    RETRIEVE_EVENTS,
    RETRIEVE_NEWSFEED,
    RETRIEVE_ALL_SOCIETY_EVENTS,
    RETRIEVE_SOCIETY_BOOTHS,
    RETRIEVE_EVENT_BOOTHS
} from '../constant';

const initialState = {
    society: null,
    event: null,
   
    societies: null,
    events: null,
    newsfeeds: null,
    allSocietyEvents: null,
    societyBooths: null,
    eventBooths: null
};

export default function dataReducer(state = initialState, { type, payload }) {
    switch(type) {
        case RETRIEVE_USER_SOCIETY: 
            return Object.assign({}, state, {
                society: payload.society
            });
        case RETRIEVE_USER_EVENT:
            return Object.assign({}, state, {
                event: payload.event
            });
        case RETRIEVE_SOCIETIES:
            return Object.assign({}, state, {
                societies: payload.societies
            });
        case RETRIEVE_EVENTS:
            return Object.assign({}, state, {
                events: payload.events
            });
        case RETRIEVE_NEWSFEED:
            return Object.assign({}, state, {
                newsfeeds: payload.newsfeeds
            });
        case RETRIEVE_ALL_SOCIETY_EVENTS:
            return Object.assign({}, state, {
                allSocietyEvents: payload.allSocietyEvents
            });
        case RETRIEVE_SOCIETY_BOOTHS:
            return Object.assign({}, state, {
                societyBooths: payload.societyBooths
            });
        case RETRIEVE_EVENT_BOOTHS:
            return Object.assign({}, state, {
                eventBooths: payload.eventBooths
            });
        default: 
            return state;
    }
}