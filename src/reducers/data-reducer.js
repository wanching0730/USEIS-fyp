import {
    RETRIEVE_ONE_SOCIETY,
    RETRIEVE_ONE_EVENT,
    RETRIEVE_ONE_SOCIETY_EVENTS,
    RETRIEVE_ONE_EVENT_CREW,
    RETRIEVE_COMM,
    RETRIEVE_SOCIETIES,
    RETRIEVE_EVENTS,
    RETRIEVE_NEWSFEED,
    RETRIEVE_ALL_SOCIETY_EVENTS,
    RETRIEVE_SOCIETY_BOOTHS,
    RETRIEVE_EVENT_BOOTHS,
    RETRIEVE_USER_EVENTS,
    RETRIEVE_SOCIETY_MEMBERS
} from '../constant';

const initialState = {
    society: null,
    event: null,
    societyEvents: null,
    userEvents: null,
    eventCrew: null,
    comm: null,
    societyMembers: null,
   
    societies: null,
    events: null,
    newsfeeds: null,
    allSocietyEvents: null,
    societyBooths: null,
    eventBooths: null
};

export default function dataReducer(state = initialState, { type, payload }) {
    switch(type) {
        case RETRIEVE_ONE_SOCIETY: 
            return Object.assign({}, state, {
                society: payload.society
            });
        case RETRIEVE_ONE_EVENT:
            return Object.assign({}, state, {
                event: payload.event
            });
        case RETRIEVE_ONE_SOCIETY_EVENTS:
            return Object.assign({}, state, {
                societyEvents: payload.societyEvents
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
        case RETRIEVE_USER_EVENTS:
            return Object.assign({}, state, {
                userEvents: payload.userEvents
            });
        case RETRIEVE_ONE_EVENT_CREW:
            return Object.assign({}, state, {
                eventCrew: payload.eventCrew
            });
        case RETRIEVE_COMM:
            return Object.assign({}, state, {
                comm: payload.comm
            });
        case RETRIEVE_SOCIETY_MEMBERS:
            return Object.assign({}, state, {
                societyMembers: payload.societyMembers
            });
        default: 
            return state;
    }
}