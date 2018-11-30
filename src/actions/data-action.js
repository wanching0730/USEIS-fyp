import { getData, getAllData, getDataWithUserId, searchAllData } from '../utils/http_function';

import {
    UPDATE_RETRIEVE_LOADINGBAR,
    RETRIEVE_SOCIETIES,
    RETRIEVE_EVENTS,
    RETRIEVE_ONE_SOCIETY, 
    RETRIEVE_ONE_EVENT,
    RETRIEVE_ONE_SOCIETY_EVENTS,
    RETRIEVE_ONE_EVENT_CREW,
    RETRIEVE_COMM,
    RETRIEVE_PARTICIPANT,
    RETRIEVE_NEWSFEED,
    RETRIEVE_ALL_SOCIETY_EVENTS,
    RETRIEVE_SOCIETY_BOOTHS,
    RETRIEVE_EVENT_BOOTHS,
    RETRIEVE_USER_EVENTS,
    RETRIEVE_SOCIETY_MEMBERS,
    SEARCH_SOCIETY,
    SEARCH_EVENT
} from '../constant';

export function updateLoadingBarSuccessful() {
    return {
        type: UPDATE_RETRIEVE_LOADINGBAR,
        payload: {
            loading: true
        }
    };
}

export function searchDataSuccessful(type, data) {
    if(type === "society") {
        return {
            type: SEARCH_SOCIETY,
            payload: {
                societiesFound: data
            }
        };
    } else {
        return {
            type: SEARCH_EVENT,
            payload: {
                eventsFound: data
            }
        };
    }
}

export function retrieveSingleDataSuccessful(type, data) {
    if(type === "society") {
        return {
            type: RETRIEVE_ONE_SOCIETY,
            payload: {
                society: data,
                loading: false
            }
        };
    } else if(type === "event") {
        return {
            type: RETRIEVE_ONE_EVENT,
            payload: {
                event: data,
                loading: false
            }
        };
    } else if(type === "societyEvent") {
        return {
            type: RETRIEVE_ONE_SOCIETY_EVENTS,
            payload: {
                societyEvents: data,
                loading: false
            }
        };
    } else if(type === "userEvent") {
        return {
            type: RETRIEVE_USER_EVENTS,
            payload: {
                userEvents: data,
                loading: false
            }
        }
    } else if(type === "eventCrew") {
        return {
            type: RETRIEVE_ONE_EVENT_CREW,
            payload: {
                eventCrew: data,
                loading: false
            }
        }
    } else if(type === "comm") {
        return {
            type: RETRIEVE_COMM,
            payload: {
                comm: data,
                loading: false
            }
        }
    } else if(type === "societyMembers") {
        return {
            type: RETRIEVE_SOCIETY_MEMBERS,
            payload: {
                societyMembers: data,
                loading: false
            }
        }
    } 
}

export function retrieveSingleMultipleDataSuccessful(type, data1, data2) {
    if(type === "eventParticipant") {
        return {
            type: RETRIEVE_PARTICIPANT,
            payload: {
                studentParticipant: data1,
                staffParticipant: data2,
                loading: false
            }
        };
    }
}

export function retrieveAllDataSuccessful(type, data) {
    if(type === "society") {
        return {
            type: RETRIEVE_SOCIETIES,
            payload: {
                societies: data,
                loading: false
            }
        }
    } else if(type === "event") {
        return {
            type: RETRIEVE_EVENTS,
            payload: {
                events: data,
                loading: false
            }
        }
    } else if(type === "newsfeeds") {
        return {
            type: RETRIEVE_NEWSFEED,
            payload: {
                newsfeeds: data,
                loading: false
            }
        }
    } else if(type === "allSocietyEvent") {
        return {
            type: RETRIEVE_ALL_SOCIETY_EVENTS,
            payload: {
                allSocietyEvents: data,
                loading: false
            }
        }
    } else if(type === "societyBooth") {
        return {
            type: RETRIEVE_SOCIETY_BOOTHS,
            payload: {
                societyBooths: data,
                loading: false
            }
        }
    } else if(type === "eventBooth") {
        return {
            type: RETRIEVE_EVENT_BOOTHS,
            payload: {
                eventBooths: data,
                loading: false
            }
        }
    }
}

export function updateLoadingBar() {
    return function (dispatch) {
        dispatch(updateLoadingBarSuccessful());
    }
}

export function retrieveDataWithUserId(type, id, userId) {
    return function (dispatch) {
        return getDataWithUserId(type, id, userId).then(result => result.json()).then(reply => {

            if(type === "studentSociety" || type === "staffSociety") {
                let society = {
                    id: reply[0]["societyId"],
                    name: reply[0]["name"],
                    category: reply[0]["category"],
                    vision: reply[0]["vision"],
                    mission: reply[0]["mission"],
                    desc: reply[0]["description"],
                    boothId: reply[0]["boothId"],
                    participated: reply[0]["participated"],
                    authorized: reply[0]["authorized"]
                }

                dispatch(retrieveSingleDataSuccessful("society", society));
            } else if(type === "studentEvent" || type === "staffEvent") {
                let event = {
                    id: reply[0]["eventId"],
                    name: reply[0]["name"],
                    startDate: reply[0]["startDate"],
                    endDate: reply[0]["endDate"],
                    organiserId: reply[0]["organiserId"],
                    organiserName: reply[0]["organiserName"],
                    desc: reply[0]["description"],
                    venue: reply[0]["venue"],
                    category: reply[0]["category"],
                    fee: reply[0]["fee"],
                    ssCategory: reply[0]["ssCategory"],
                    ssPoint: reply[0]["ssPoint"],
                    chairperson: reply[0]["chairperson"],
                    contact: reply[0]["contact"],
                    boothId: reply[0]["boothId"],
                    participated: reply[0]["participated"],
                    authorized: reply[0]["authorized"]
                }
                dispatch(retrieveSingleDataSuccessful("event", event));
            }
        });
    };
}

export function retrieveData(type, id) {
    return function (dispatch) {
        return getData(type, id).then(result => result.json()).then(reply => {
            if(type === "society") {
                let society = {
                    id: reply[0]["societyId"],
                    name: reply[0]["name"],
                    category: reply[0]["category"],
                    vision: reply[0]["vision"],
                    mission: reply[0]["mission"],
                    desc: reply[0]["description"],
                    boothId: reply[0]["boothId"],
                    participated: reply[0]["participated"]
                }

                dispatch(retrieveSingleDataSuccessful("society", society));
            } else if(type === "event") {
                let event = {
                    id: reply[0]["eventId"],
                    name: reply[0]["name"],
                    startDate: reply[0]["startDate"],
                    endDate: reply[0]["endDate"],
                    organiserId: reply[0]["organiserId"],
                    organiserName: reply[0]["organiserName"],
                    desc: reply[0]["description"],
                    venue: reply[0]["venue"],
                    category: reply[0]["category"],
                    fee: reply[0]["fee"],
                    ssCategory: reply[0]["ssCategory"],
                    ssPoint: reply[0]["ssPoint"],
                    chairperson: reply[0]["chairperson"],
                    contact: reply[0]["contact"],
                    boothId: reply[0]["boothId"],
                }

                dispatch(retrieveSingleDataSuccessful("event", event));
            } else if(type === "societyEvent") {
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

                dispatch(retrieveSingleDataSuccessful("societyEvent", societyEvents));
            } else if(type === "studentEvent" || type === "staffEvent") {
                let userEvents = [];
                for(var i = 0; i < reply.length; i++) {
                    userEvents.push(reply[i]);
                }

                dispatch(retrieveSingleDataSuccessful("userEvent", userEvents));
            } else if(type === "eventCrew") {
                let eventCrew = [];
                for(var i = 0; i < reply.length; i++) {
                    eventCrew.push(reply[i]);
                }

                dispatch(retrieveSingleDataSuccessful("eventCrew", eventCrew));
            } else if(type === "societyComm" || type === "eventComm") {
                let comm = [];
                for(var i = 0; i < reply.length; i++) {
                    comm.push(reply[i]);
                }

                dispatch(retrieveSingleDataSuccessful("comm", comm));
            }  else if(type === "societyMember") {
                let societyMembers = [];
                for(var i = 0; i < reply.length; i++) {
                    societyMembers.push(reply[i]);
                }

                dispatch(retrieveSingleDataSuccessful("societyMembers", societyMembers));
            }  else if(type === "eventParticipant") {
                let studentParticipants = [];
                let staffParticipants = [];
                let students = reply["students"];
                let staffs = reply["staffs"];
                for(var i = 0; i < students.length; i++) {
                    studentParticipants.push(students[i]);
                }
                for(var i = 0; i < staffs.length; i++) {
                    staffParticipants.push(staffs[i]);
                }

                dispatch(retrieveSingleMultipleDataSuccessful("eventParticipant", studentParticipants, staffParticipants));
            }  
        });
    };
}

export function retrieveAll(type) {
    return function (dispatch) {
        return getAllData(type).then(result => result.json()).then(reply => {
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

                dispatch(retrieveAllDataSuccessful(type, societies));
            } else if(type === "event") {
                for(var i = 0; i < reply.length; i++) {
                    events.push ({
                        category: reply[i]["category"],
                        id: reply[i]["eventId"],
                        name: reply[i]["name"],
                        date: reply[i]["eventDateTime"]
                    });
                }
                dispatch(retrieveAllDataSuccessful(type, events));
            } else if(type === "newsfeeds") {
                for(var i = 0; i < reply.length; i++) {
                    newsfeeds.push({
                        ownerId: reply[i]["societyId"],
                        name: reply[i]["name"],
                        category: reply[i]["category"],
                        description: reply[i]["description"],
                        dateCreate: reply[i]["dateCreate"],
                        type: reply[i]["type"]
                    })
                }

                dispatch(retrieveAllDataSuccessful(type, newsfeeds));
            } else if(type === "allSocietyEvent") {
                for(var i = 0; i < reply.length; i++) {
                    allSocietyEvents.push({
                        societyId: reply[i]["societyId"],
                        eventId: reply[i]["eventId"],
                        eventName: reply[i]["name"]
                    })
                }

                dispatch(retrieveAllDataSuccessful(type, allSocietyEvents));
            } else if(type === "societyBooth") {
                for(var i = 0; i < reply.length; i++) {
                    societyBooths.push(reply[i]);
                }

                dispatch(retrieveAllDataSuccessful(type, societyBooths));
            } else if(type === "eventBooth") {
                for(var i = 0; i < reply.length; i++) {
                    eventBooths.push(reply[i]);
                }

                dispatch(retrieveAllDataSuccessful(type, eventBooths));
            }
        });
    };
}

export function searchData(type, keyword) {
    return function (dispatch) {
        return searchAllData(type, keyword).then(result => result.json()).then(reply => {
            let societiesFound = [];
            let eventsFound = [];

            if(type === "society") {
                for(var i = 0; i < reply.length; i++) {
                    societiesFound.push(reply[i]);
                }

                dispatch(searchDataSuccessful(type, societiesFound));
            } else {
                for(var i = 0; i < reply.length; i++) {
                    eventsFound.push(reply[i]);
                }

                dispatch(searchDataSuccessful(type, eventsFound));
            }
        });
    };
}
