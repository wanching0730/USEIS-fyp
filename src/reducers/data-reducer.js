import {
    UPDATE_LOADINGBAR,
    RETRIEVE_ONE_SOCIETY,
    RETRIEVE_ONE_EVENT,
    RETRIEVE_ONE_SOCIETY_EVENTS,
    RETRIEVE_ONE_EVENT_CREW,
    RETRIEVE_COMM,
    RETRIEVE_PARTICIPANT,
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
    loading: true,

    society: null,
    event: null,
    societyEvents: null,
    userEvents: null,
    eventCrew: null,
    comm: null,
    societyMembers: null,
    eventParticipant: null,
   
    societies: null,
    events: null,
    newsfeeds: null,
    allSocietyEvents: null,
    societyBooths: null,
    eventBooths: null
};

export default function dataReducer(state = initialState, { type, payload }) {
    switch(type) {
        case UPDATE_LOADINGBAR: 
            return Object.assign({}, state, {
                loading: payload.loading
            });
        case RETRIEVE_ONE_SOCIETY: 
            return Object.assign({}, state, {
                society: payload.society,
                loading: payload.loading
            });
        case RETRIEVE_ONE_EVENT:
            return Object.assign({}, state, {
                event: payload.event,
                loading: payload.loading
            });
        case RETRIEVE_ONE_SOCIETY_EVENTS:
            return Object.assign({}, state, {
                societyEvents: payload.societyEvents,
                loading: payload.loading
            });
        case RETRIEVE_SOCIETIES:
            return Object.assign({}, state, {
                societies: payload.societies,
                loading: payload.loading
            });
        case RETRIEVE_EVENTS:
            return Object.assign({}, state, {
                events: payload.events,
                loading: payload.loading
            });
        case RETRIEVE_NEWSFEED:
            return Object.assign({}, state, {
                newsfeeds: payload.newsfeeds,
                loading: payload.loading
            });
        case RETRIEVE_ALL_SOCIETY_EVENTS:
            return Object.assign({}, state, {
                allSocietyEvents: payload.allSocietyEvents,
                loading: payload.loading
            });
        case RETRIEVE_SOCIETY_BOOTHS:
            return Object.assign({}, state, {
                societyBooths: payload.societyBooths,
                loading: payload.loading
            });
        case RETRIEVE_EVENT_BOOTHS:
            return Object.assign({}, state, {
                eventBooths: payload.eventBooths,
                loading: payload.loading
            });
        case RETRIEVE_USER_EVENTS:
            return Object.assign({}, state, {
                userEvents: payload.userEvents,
                loading: payload.loading
            });
        case RETRIEVE_ONE_EVENT_CREW:
            return Object.assign({}, state, {
                eventCrew: payload.eventCrew,
                loading: payload.loading
            });
        case RETRIEVE_COMM:
            return Object.assign({}, state, {
                comm: payload.comm,
                loading: payload.loading
            });
        case RETRIEVE_SOCIETY_MEMBERS:
            return Object.assign({}, state, {
                societyMembers: payload.societyMembers,
                loading: payload.loading
            });
        case RETRIEVE_PARTICIPANT:
            return Object.assign({}, state, {
                eventParticipant: payload.eventParticipant,
                loading: payload.loading
            });
        default: 
            return state;
    }
}