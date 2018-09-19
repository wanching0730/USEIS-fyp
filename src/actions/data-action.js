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
                let societyName = reply["name"];
                let societyCategory = reply["category"];
                let societyVision = reply["vision"];
                let societyMission = reply["mission"];
                let societyDesc = reply["description"];
                let societyBoothId = reply["boothId"];

                dispatch(retrieveSocietySuccessful(societyName, societyCategory, societyVision, societyMission, societyDesc, societyBoothId));
            } else {
                let eventName = reply["name"];
                let eventDateTime = reply["eventDateTime"];
                let organiser = reply["organiser"];
                let eventDesc = reply["description"];
                let eventVenue = reply["venue"];
                let eventCategory = reply["category"];
                let eventFee = reply["fee"];
                let eventPoints = reply["ssPoint"];
                let eventChairperson = reply["chairperson"];
                let eventContact = reply["contact"];
                let eventBoothId = reply["boothId"];

                dispatch(retrieveEventSuccessful(eventName, eventDateTime, organiser, eventDesc, eventVenue,
                    eventCategory, eventFee, eventPoints, eventChairperson, eventContact, eventBoothId));
            }
        });
    };
}