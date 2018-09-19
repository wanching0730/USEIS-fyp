import {
    RETRIEVE_USER_SOCIETY,
    RETRIEVE_USER_EVENT
} from '../constant';

const initialState = {
    societyName: null,
    societyCategory: null,
    societyVision: null,
    societyMission: null,
    societyDesc: null,
    societyBoothId: null,

    eventName: null,
    eventDateTime: null,
    organiser: null,
    eventDesc: null,
    eventVenue: null,
    eventCategory: null,
    eventFee: null,
    eventPoints: null,
    eventChairperson: null, 
    eventContact: null, 
    eventBoothId: null
};

export default function dataReducer(state = initialState, { type, payload }) {
    switch(type) {
        case RETRIEVE_USER_SOCIETY: 
            return Object.assign({}, state, {
                societyName: payload.societyName,
                societyCategory: payload.societyCategory,
                societyVision: payload.societyVision,
                societyMission: payload.societyMission,
                societyDesc: payload.societyDesc,
                societyBoothId: payload.societyBoothId,
                
            });
        case RETRIEVE_USER_EVENT:
            return Object.assign({}, state, {
                eventName: payload.eventName,
                eventDateTime: payload.eventDateTime,
                organiser: payload.organiser,
                eventDesc: payload.eventDesc,
                eventVenue: payload.eventVenue,
                eventCategory: payload.eventCategory,
                eventFee: payload.eventFee,
                eventPoints: payload.eventPoints,
                eventChairperson: payload.eventChairperson, 
                eventContact: payload.eventContact, 
                eventBoothId: payload.eventBoothId
            });
        default: 
            return state;
    }
}