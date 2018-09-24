import {browserHistory} from 'react-router';
import { getData, getAllData } from '../utils/http_function';

import {
    RETRIEVE_SOCIETIES,
    RETRIEVE_EVENTS,
    RETRIEVE_USER_SOCIETY, 
    RETRIEVE_USER_EVENT,
    RETRIEVE_NEWSFEED
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

export function retrieveSocietiesSuccessful(societies) {
    return {
        type: RETRIEVE_SOCIETIES,
        payload: {
            societies: societies
        }
    }

}

export function retrieveEventsSuccessful(events) {
    return {
        type: RETRIEVE_EVENTS,
        payload: {
            events: events
        }
    }
}

export function retrieveNewsfeedSuccessful(newsfeeds) {
    return {
        type: RETRIEVE_NEWSFEED,
        payload: {
            newsfeeds: newsfeeds
        }
    }
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
                console.log("result of get event: " + JSON.stringify(reply));

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

export function retrieveAll(type) {
    return function (dispatch) {
        return getAllData(type).then(result => result.json()).then(reply => {
            console.log("societies: " + JSON.stringify(reply));

            let societies = [];
            let events = [];
            let newsfeeds = [];
            
            if(type == "society") {
                for(var i = 0; i < reply.length; i++) {
                    societies.push ({
                        category: reply[i]["category"],
                        id: reply[i]["societyId"],
                        name: reply[i]["name"]
                    });
                }
                console.log("societies in action: " + societies);
                dispatch(retrieveSocietiesSuccessful(societies));
            } else if(type == "event") {
                for(var i = 0; i < reply.length; i++) {
                    events.push ({
                        category: reply[i]["category"],
                        id: reply[i]["eventId"],
                        name: reply[i]["name"]
                    });
                }
                dispatch(retrieveEventsSuccessful(events));
            } else if(type == "newsfeeds") {
                console.log("all newsfeeds: " + reply);

                for(var i = 0; i < reply.length; i++) {
                    newsfeeds.push({
                        ownderId: reply[i]["societyId"],
                        name: reply[i]["name"],
                        category: reply[i]["category"],
                        desc: reply[i]["description"],
                        dateCreate: reply[i]["dateCreate"],
                        type: reply[i]["type"]
                    })
                }
                console.log("all newsfeeds 2: " + newsfeeds);
                dispatch(retrieveNewsfeedSuccessful(newsfeeds));
            } 
        });
    };
}