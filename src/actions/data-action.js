import { getData, getAllData, getDataWithUserId, searchAllData, downloadData } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';
import {
    UPDATE_RETRIEVE_LOADINGBAR,
    RETRIEVE_SOCIETIES,
    RETRIEVE_EVENTS,
    RETRIEVE_CALENDAR_EVENTS,
    RETRIEVE_ONE_SOCIETY, 
    RETRIEVE_ONE_EVENT,
    RETRIEVE_ONE_SOCIETY_EVENTS,
    RETRIEVE_ONE_EVENT_CREW,
    RETRIEVE_ONE_SOCIETY_CREW,
    RETRIEVE_COMM,
    RETRIEVE_PARTICIPANT,
    RETRIEVE_NEWSFEED,
    RETRIEVE_ALL_SOCIETY_EVENTS,
    RETRIEVE_SOCIETY_BOOTHS,
    RETRIEVE_EVENT_BOOTHS,
    RETRIEVE_ALL_BOOTHS,
    RETRIEVE_USER_EVENTS,
    RETRIEVE_USER_SOCIETIES,
    RETRIEVE_SOCIETY_MEMBERS,
    RETRIEVE_CREW_POSITION,
    RETRIEVE_ROLES,
    RETRIEVE_REC_SOCIETIES,
    RETRIEVE_REC_EVENTS,
    RETRIEVE_EVENT_ANALYSIS,
    RETRIEVE_EVENTS_IN_MONTHS,
    RETRIEVE_BOOTH_AMOUNT,
    SEARCH_SOCIETY,
    SEARCH_EVENT,
    CHECK_IS_REGISTERED
} from '../constant';

export function updateLoadingBarSuccessful() {
    return {
        type: UPDATE_RETRIEVE_LOADINGBAR,
        payload: {
            loading: true
        }
    };
}

export function updateEndLoadingBarSuccessful() {
    return {
        type: UPDATE_RETRIEVE_LOADINGBAR,
        payload: {
            loading: false
        }
    };
}

export function searchDataSuccessful(type, data) {
    if(type === "society") {
        return {
            type: SEARCH_SOCIETY,
            payload: {
                societiesFound: data,
                loading: false
            }
        };
    } else if(type === "event") {
        return {
            type: SEARCH_EVENT,
            payload: {
                eventsFound: data,
                loading: false
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
    } else if(type === "userSociety") {
        return {
            type: RETRIEVE_USER_SOCIETIES,
            payload: {
                userSocieties: data,
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
    } else if(type === "societyCrew") {
        return {
            type: RETRIEVE_ONE_SOCIETY_CREW,
            payload: {
                societyCrew: data,
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
    } else if(type === "checkIsRegistered") {
        return {
            type: CHECK_IS_REGISTERED,
            payload: {
                isRegistered: data
            }
        }
    } else if(type === "crewPosition") {
        return {
            type: RETRIEVE_CREW_POSITION,
            payload: {
                crewPositions: data
            }
        }
    } else if(type === "totalBooth") {
        return {
            type: RETRIEVE_BOOTH_AMOUNT,
            payload: {
                overallBooth: data,
                loading: false
            }
        }
    } else if(type === "eventAnalysis") {
        return {
            type: RETRIEVE_EVENT_ANALYSIS,
            payload: {
                analyzedEvents: data,
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
    } else if(type === "calendarEvent") {
        return {
            type: RETRIEVE_CALENDAR_EVENTS,
            payload: {
                calendarEvents: data,
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
    } else if(type === "societyEvent") {
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
    } else if(type === "allBooths") {
        return {
            type: RETRIEVE_ALL_BOOTHS,
            payload: {
                allBooths: data
            }
        }
    } else if(type === "roles") {
        return {
            type: RETRIEVE_ROLES,
            payload: {
                roles: data,
                loading: false
            }
        }
    } else if(type === "recommendedSocieties") {
        return {
            type: RETRIEVE_REC_SOCIETIES,
            payload: {
                recommendedSocieties: data,
                loading: false
            }
        }
    } else if(type === "eventInMonth") {
        return {
            type: RETRIEVE_EVENTS_IN_MONTHS,
            payload: {
                eventInMonth: data,
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

export function updateEndLoadingBar() {
    return function (dispatch) {
        dispatch(updateEndLoadingBarSuccessful());
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
                    logoUrl: reply[0]["logoUrl"],
                    authorizedPosition: reply[0]["authorizedPosition"],
                    boothId: reply[0]["boothId"],
                    participated: reply[0]["participated"],
                    specificAuthorized: reply[0]["specificAuthorized"],
                    status: reply[0]["status"]      
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
                    logoUrl: reply[0]["logoUrl"],
                    totalParticipant: reply[0]["totalParticipant"],
                    totalCrew: reply[0]["totalCrew"],
                    currentParticipant: reply[0]["currentParticipant"],
                    authorizedPosition: reply[0]["authorizedPosition"],
                    currentCrew: reply[0]["currentCrew"],
                    boothId: reply[0]["boothId"],
                    participated: reply[0]["participated"],
                    authorized: reply[0]["authorized"],
                    specificAuthorized: reply[0]["specificAuthorized"],
                    roles: reply[0]["roles"],
                    status: reply[0]["status"]
                }
                dispatch(retrieveSingleDataSuccessful("event", event));
            } else if(type === "checkIsStudentRegistered" || type === "checkIsStaffRegistered" || type === "checkIsSocietyRegistered") {
                if(reply.length === 0) 
                    var isRegistered = false;
                else 
                    var isRegistered = true;

                dispatch(retrieveSingleDataSuccessful("checkIsRegistered", isRegistered));
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
                    logoUrl: reply[0]["logoUrl"],
                    roles: reply[0]["roles"],
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
                    roles: reply[0]["roles"],
                    boothId: reply[0]["boothId"],
                    logoUrl: reply[0]["logoUrl"],
                    totalParticipant: reply[0]["totalParticipant"],
                    totalCrew: reply[0]["totalCrew"]
                }

                dispatch(retrieveSingleDataSuccessful("event", event));
            } else if(type === "societyEvent") {
                var societyEvents = [];
                for(var i = 0; i < reply.length; i++) {
                    societyEvents.push({
                        id: reply[i]["eventId"],
                        name: reply[i]["name"],
                        startDate: reply[i]["startDate"],
                        endDate: reply[i]["endDate"],
                        venue: reply[i]["venue"],
                        fee: reply[i]["fee"],
                        chairperson: reply[i]["chairperson"],
                        contact: reply[i]["contact"],
                        logoUrl: reply[i]["logoUrl"]
                    });
                }

                dispatch(retrieveSingleDataSuccessful("societyEvent", societyEvents));
            } else if(type === "studentEvent" || type === "staffEvent") {
                let userEvents = [];
                
                for(var i = 0; i < reply.length; i++) {
                    userEvents.push(reply[i]);
                }
                dispatch(retrieveSingleDataSuccessful("userEvent", userEvents));
            } else if(type === "studentSociety" || type === "staffSociety") {
                let userSocieties = [];
                for(var i = 0; i < reply.length; i++) {
                    userSocieties.push(reply[i]);
                }

                dispatch(retrieveSingleDataSuccessful("userSociety", userSocieties));
            } else if(type === "eventCrew") {
                let eventCrew = [];
                for(var i = 0; i < reply.length; i++) {
                    eventCrew.push(reply[i]);
                }

                dispatch(retrieveSingleDataSuccessful("eventCrew", eventCrew));
            } else if(type === "societyCrew") {
                let societyCrew = [];
                for(var i = 0; i < reply.length; i++) {
                    societyCrew.push(reply[i]);
                }

                dispatch(retrieveSingleDataSuccessful("societyCrew", societyCrew));
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
            } else if(type === "crewPosition") {
                let crewPositions = [];
                crewPositions.push(reply[0].crewPosition);

                dispatch(retrieveSingleDataSuccessful("crewPosition", crewPositions));
            } else if(type === "totalBooth") {
                let overallBooth = reply[0];

                dispatch(retrieveSingleDataSuccessful("totalBooth", overallBooth));
            } else if(type === "eventAnalysis") {
                var analyzedEvents = [];
                if(reply.length > 0)
                    analyzedEvents = reply;

                dispatch(retrieveSingleDataSuccessful("eventAnalysis", analyzedEvents));
            } 
        });
    };
}

export function retrieveAll(type) {
    return function (dispatch) {
        return getAllData(type).then(result => result.json()).then(reply => {
            let societies = [];
            let events = [];
            let calendarEvents = [];
            let newsfeeds = [];
            let allSocietyEvents = [];
            let societyBooths = [];
            let eventBooths = [];
            let allBooths = [];
            
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
            } else if(type === "calendarEvent") {
                calendarEvents = reply;

                dispatch(retrieveAllDataSuccessful(type, calendarEvents));
            } else if(type === "newsfeeds") {
                for(var i = 0; i < reply.length; i++) {
                    newsfeeds.push({
                        newsfeedId: reply[i]["sNewsfeedId"],
                        ownerId: reply[i]["societyId"],
                        name: reply[i]["name"],
                        category: reply[i]["category"],
                        description: reply[i]["description"],
                        dateCreate: reply[i]["dateCreate"],
                        type: reply[i]["type"],
                        logoUrl: reply[i]["logoUrl"]
                    })
                }

                dispatch(retrieveAllDataSuccessful(type, newsfeeds));
            } else if(type === "societyEvent") {
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
            } else if(type === "allBooths") {
                for(var i = 0; i < reply.length; i++) {
                    allBooths.push(reply[i]);
                }

                dispatch(retrieveAllDataSuccessful(type, allBooths));
            } else if(type === "societyRole" || type === "eventRole") {
                let roles = reply;

                dispatch(retrieveAllDataSuccessful("roles", roles));
            } else if(type === "recommendedSocieties") {
                let recommendedSocieties = reply;

                dispatch(retrieveAllDataSuccessful(type, recommendedSocieties));
            } else if(type === "eventInMonth") {
                let eventInMonth = reply;

                dispatch(retrieveAllDataSuccessful(type, eventInMonth));
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
