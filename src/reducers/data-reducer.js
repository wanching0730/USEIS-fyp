import {
    UPDATE_RETRIEVE_LOADINGBAR,
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
    RETRIEVE_ALL_BOOTHS,
    RETRIEVE_USER_EVENTS,
    RETRIEVE_SOCIETY_MEMBERS,
    SEARCH_SOCIETY,
    SEARCH_EVENT,
    CHECK_IS_REGISTERED
} from '../constant';

const initialState = {
    loading: false,

    society: null,
    event: null,
    societyEvents: null,
    userEvents: null,
    eventCrew: null,
    comm: null,
    societyMembers: null,
    studentParticipant: null,
    staffParticipant: null,
   
    societies: null,
    events: null,
    newsfeeds: null,
    allSocietyEvents: null,
    societyBooths: null,
    eventBooths: null,
    allBooths: null,

    societiesFound: null,
    eventsFound: null,

    isRegistered: null
};

export default function dataReducer(state = initialState, { type, payload }) {
    switch(type) {
        case UPDATE_RETRIEVE_LOADINGBAR: 
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
        case RETRIEVE_ALL_BOOTHS:
            return Object.assign({}, state, {
                allBooths: payload.allBooths
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
                studentParticipant: payload.studentParticipant,
                staffParticipant: payload.staffParticipant,
                loading: payload.loading
            });
        case SEARCH_SOCIETY:
            return Object.assign({}, state, {
                societiesFound: payload.societiesFound,
                loading: payload.loading
            });
        case SEARCH_EVENT:
            return Object.assign({}, state, {
                eventsFound: payload.eventsFound,
                loading: payload.loading
            });
        case CHECK_IS_REGISTERED:
            return Object.assign({}, state, {
                isRegistered: payload.isRegistered
            });
        default: 
            return state;
    }
}