import {browserHistory} from 'react-router';
import { getData } from '../utils/http_function';

import {
    RETRIEVE_USER_SOCIETY, 
    RETRIEVE_USER_EVENT
} from '../constant';

export function retrieveSocietySuccessful(societyName, societyCategory, societyVision, societyMission, societyDesc, societyBoothId) {
    return {
        type: RETRIEVE_USER_SOCIETY,
        payload: {
            societyName: societyName,
            societyCategory: societyCategory,
            societyVision: societyVision,
            societyMission: societyMission,
            societyDesc: societyDesc,
            societyBoothId: societyBoothId
        }
    };
}

export function retrieveEventSuccessful(eventName, eventDateTime, organiser, eventDesc, eventVenue,
    eventCategory, eventFee, eventPoints, eventChairperson, eventContact, eventBoothId) {
        return {
            type: RETRIEVE_USER_EVENT,
            payload: {
                eventName: eventName,
                eventDateTime: eventDateTime,
                organiser: organiser,
                eventDesc: eventDesc,
                eventVenue: eventVenue,
                eventCategory: eventCategory,
                eventFee: eventFee,
                eventPoints: eventPoints,
                eventChairperson: eventChairperson, 
                eventContact: eventContact, 
                eventBoothId: eventBoothId
            }
        };
}

export function retrieveData(type, id) {
    return function (dispatch) {
        return getData(type, id).then(result => result.json()).then(reply => {
            console.log("result of get society: " + JSON.stringify(reply));

            if(type == "society") {
                let societyName = reply[0]["name"];
                let societyCategory = reply[0]["category"];
                let societyVision = reply[0]["vision"];
                let societyMission = reply[0]["mission"];
                let societyDesc = reply[0]["description"];
                let societyBoothId = reply[0]["boothId"];

                dispatch(retrieveSocietySuccessful(societyName, societyCategory, societyVision, societyMission, societyDesc, societyBoothId));
            } else {
                let eventName = reply[0]["name"];
                let eventDateTime = reply[0]["eventDateTime"];
                let organiser = reply[0]["organiser"];
                let eventDesc = reply[0]["description"];
                let eventVenue = reply[0]["venue"];
                let eventCategory = reply[0]["category"];
                let eventFee = reply[0]["fee"];
                let eventPoints = reply[0]["ssPoint"];
                let eventChairperson = reply[0]["chairperson"];
                let eventContact = reply[0]["contact"];
                let eventBoothId = reply[0]["boothId"];

                dispatch(retrieveEventSuccessful(eventName, eventDateTime, organiser, eventDesc, eventVenue,
                    eventCategory, eventFee, eventPoints, eventChairperson, eventContact, eventBoothId));
            }
        });
    };
}