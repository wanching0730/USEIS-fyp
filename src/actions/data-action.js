//import {browserHistory} from 'react-router';
import { getData, getAllData } from '../utils/http_function';

import {
    RETRIEVE_SOCIETIES,
    RETRIEVE_EVENTS,
    RETRIEVE_ONE_SOCIETY, 
    RETRIEVE_ONE_EVENT,
    RETRIEVE_ONE_SOCIETY_EVENTS,
    RETRIEVE_NEWSFEED,
    RETRIEVE_ALL_SOCIETY_EVENTS,
    RETRIEVE_SOCIETY_BOOTHS,
    RETRIEVE_EVENT_BOOTHS,
    RETRIEVE_USER_EVENTS

} from '../constant';

export function retrieveSingleDataSuccessful(type, data) {
    if(type === "society") {
        return {
            type: RETRIEVE_ONE_SOCIETY,
            payload: {
                society: data
            }
        };
    } else if(type === "event") {
        return {
            type: RETRIEVE_ONE_EVENT,
            payload: {
                event: data
            }
        };
    } else if(type === "societyEvent") {
        return {
            type: RETRIEVE_ONE_SOCIETY_EVENTS,
            payload: {
                societyEvents: data
            }
        };
    } else if(type === "userEvent") {
        return {
            type: RETRIEVE_USER_EVENTS,
            payload: {
                userEvents: data
            }
        }
    }
}

// export function retrieveEventSuccessful(event) {
//         return {
//             type: RETRIEVE_USER_EVENT,
//             payload: {
//                 event: event
//             }
//         };
// }

export function retrieveAllDataSuccessful(type, data) {
    if(type === "society") {
        return {
            type: RETRIEVE_SOCIETIES,
            payload: {
                societies: data
            }
        }
    } else if(type === "event") {
        return {
            type: RETRIEVE_EVENTS,
            payload: {
                events: data
            }
        }
    } else if(type === "newsfeeds") {
        return {
            type: RETRIEVE_NEWSFEED,
            payload: {
                newsfeeds: data
            }
        }
    } else if(type === "allSocietyEvent") {
        return {
            type: RETRIEVE_ALL_SOCIETY_EVENTS,
            payload: {
                allSocietyEvents: data
            }
        }
    } else if(type === "societyBooth") {
        return {
            type: RETRIEVE_SOCIETY_BOOTHS,
            payload: {
                societyBooths: data
            }
        }
    } else if(type === "eventBooth") {
        return {
            type: RETRIEVE_EVENT_BOOTHS,
            payload: {
                eventBooths: data
            }
        }
    }
}

// export function retrieveSocietiesSuccessful(societies) {
//     return {
//         type: RETRIEVE_SOCIETIES,
//         payload: {
//             societies: societies
//         }
//     }
// }

// export function retrieveEventsSuccessful(events) {
//     return {
//         type: RETRIEVE_EVENTS,
//         payload: {
//             events: events
//         }
//     }
// }

// export function retrieveNewsfeedSuccessful(newsfeeds) {
//     return {
//         type: RETRIEVE_NEWSFEED,
//         payload: {
//             newsfeeds: newsfeeds
//         }
//     }
// }

export function retrieveData(type, id) {
    return function (dispatch) {
        return getData(type, id).then(result => result.json()).then(reply => {
            console.log("result of get society: " + JSON.stringify(reply));

            if(type === "society") {
                let society = {
                    id: reply[0]["societyId"],
                    name: reply[0]["name"],
                    category: reply[0]["category"],
                    vision: reply[0]["vision"],
                    mission: reply[0]["mission"],
                    desc: reply[0]["description"],
                    boothId: reply[0]["boothId"],
                }

                dispatch(retrieveSingleDataSuccessful("society", society));
            } else if(type === "event") {
                console.log("result of get event: " + JSON.stringify(reply));

                let event = {
                    id: reply[0]["eventId"],
                    name: reply[0]["name"],
                    dateTime: reply[0]["eventDateTime"],
                    organiser: reply[0]["organiser"],
                    desc: reply[0]["description"],
                    venue: reply[0]["venue"],
                    category: reply[0]["category"],
                    fee: reply[0]["fee"],
                    ssPoint: reply[0]["ssPoint"],
                    chairperson: reply[0]["chairperson"],
                    contact: reply[0]["contact"],
                    boothId: reply[0]["boothId"],
                }

                console.log("event in action: " + JSON.stringify(event));
                dispatch(retrieveSingleDataSuccessful("event", event));
            } else if(type === "societyEvent") {
                console.log("result of get society's event: " + JSON.stringify(reply));

                var societyEvents = [];
                for(var i = 0; i < reply.length; i++) {
                    societyEvents.push({
                        id: reply[i]["eventId"],
                        name: reply[i]["name"],
                        dateTime: reply[i]["eventDateTime"],
                        venue: reply[i]["venue"],
                        fee: reply[i]["fee"],
                        chairperson: reply[i]["chairperson"],
                        contact: reply[i]["contact"],
                    });
                }

                console.log("society's event in action: " + JSON.stringify(societyEvents));
                dispatch(retrieveSingleDataSuccessful("societyEvent", societyEvents));
            } else if(type === "studentEvent" || type === "staffEvent") {
                let userEvents = [];
                for(var i = 0; i < reply.length; i++) {
                    userEvents.push({
                        eventId: reply[i]["eventId"],
                        name: reply[i]["name"],
                        category: reply[i]["category"], 
                        organiser: reply[i]["organiser"],
                        joinDate: reply[i]["joinDate"],
                        position: reply[i]["position"],
                        crewStatus: reply[i]["crewStatus"],
                        vegetarian: reply[i]["vegetarian"]
                    })
                }
                console.log("user's event in action: " + JSON.stringify(userEvents));
                dispatch(retrieveSingleDataSuccessful("userEvent", userEvents));
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
            let allSocietyEvents = [];
            let societyBooths = [];
            let eventBooths = [];
            
            if(type === "society") {
                for(var i = 0; i < reply.length; i++) {
                    societies.push ({
                        category: reply[i]["category"],
                        id: reply[i]["societyId"],
                        name: reply[i]["name"]
                    });
                }
                console.log("societies in action: " + societies);
                dispatch(retrieveAllDataSuccessful(type, societies));
            } else if(type === "event") {
                for(var i = 0; i < reply.length; i++) {
                    events.push ({
                        category: reply[i]["category"],
                        id: reply[i]["eventId"],
                        name: reply[i]["name"]
                    });
                }
                dispatch(retrieveAllDataSuccessful(type, events));
            } else if(type === "newsfeeds") {
                console.log("all newsfeeds: " + reply);

                for(var i = 0; i < reply.length; i++) {
                    newsfeeds.push({
                        ownerId: reply[i]["societyId"],
                        name: reply[i]["name"],
                        category: reply[i]["category"],
                        desc: reply[i]["description"],
                        dateCreate: reply[i]["dateCreate"],
                        type: reply[i]["type"]
                    })
                }
                console.log("all newsfeeds 2: " + newsfeeds);
                dispatch(retrieveAllDataSuccessful(type, newsfeeds));
            } else if(type === "allSocietyEvent") {
                for(var i = 0; i < reply.length; i++) {
                    allSocietyEvents.push({
                        societyId: reply[i]["societyId"],
                        eventId: reply[i]["eventId"],
                        eventName: reply[i]["name"]
                    })
                }
                console.log("all society events: " + allSocietyEvents);
                dispatch(retrieveAllDataSuccessful(type, allSocietyEvents));
            } else if(type === "societyBooth") {
                for(var i = 0; i < reply.length; i++) {
                    societyBooths.push({
                        societyId: reply[i]["societyId"],
                        name: reply[i]["name"],
                        boothId: reply[i]["boothId"],
                        location: reply[i]["location"]
                    })
                }
                console.log("all society booths: " + societyBooths);
                dispatch(retrieveAllDataSuccessful(type, societyBooths));
            } else if(type === "eventBooth") {
                for(var i = 0; i < reply.length; i++) {
                    eventBooths.push({
                        eventId: reply[i]["eventId"],
                        name: reply[i]["name"],
                        boothId: reply[i]["boothId"],
                        location: reply[i]["location"]
                    })
                }
                console.log("all event booths: " + eventBooths);
                dispatch(retrieveAllDataSuccessful(type, eventBooths));
            }
        });
    };
}
