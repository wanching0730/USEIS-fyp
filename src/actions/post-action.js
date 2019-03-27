import {browserHistory} from 'react-router';
import { createData, updateData, updateDataDouble } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';
import '../style/alert.css';
import {
    UPDATE_POST_LOADINGBAR,
    // CREATE_SOCIETY,
    // CREATE_EVENT,
    // CREATE_NEWSFEED,
    // CREATE_RATING,
    CREATE,
    REGISTER,
    UPDATE
    // UPDATE_SOCIETY,
    // UPDATE_EVENT
} from '../constant';

export function updatePostLoadingBarSuccessful() {
    return {
        type: UPDATE_POST_LOADINGBAR,
        payload: {
            loading: true
        }
    };
}

export function createSuccessfully() {
    return {
        type: CREATE,
        payload: {
            loading: false
        }
    }
}

// export function createSocietySuccessful(societyId) {
//     return {
//         type: CREATE_SOCIETY,
//         payload: {
//             createdSocietyId: societyId,
//             loading: false
//         }
//     }
// }

// export function createEventSuccessful(eventId) {
//     return {
//         type: CREATE_EVENT,
//         payload: {
//             createdEventId: eventId,
//             loading: false
//         }
//     }
// }

// export function createNewsfeedSuccessful(newsfeedId) {
//     return {
//         type: CREATE_NEWSFEED,
//         payload: {
//             createdNewsfeedId: newsfeedId,
//             loading: false
//         }
//     }
// }

// export function createRatingSuccessful(ratingId) {
//     return {
//         type: CREATE_RATING,
//         payload: {
//             createdRatingId: ratingId,
//             loading: false
//         }
//     }
// }

export function registerSuccessfully() {
    return {
        type: REGISTER,
        payload: {
            loading: false
        }
    }
}

export function updateSuccessfully() {
    return {
        type: UPDATE,
        payload: {
            loading: false
        }
    }
}

// export function updateSocietySuccessfully(updatedSocietyId) {
//     return {
//         type: UPDATE_SOCIETY,
//         payload: {
//             updatedSocietyId: updatedSocietyId,
//             loading: false
//         }
//     }
// }

// export function updateEventSuccessfully(updatedEventId) {
//     return {
//         type: UPDATE_EVENT,
//         payload: {
//             updatedEventId: updatedEventId,
//             loading: false
//         }
//     }
// }

export function updatePostLoadingBar() {
    return function (dispatch) {
        dispatch(updatePostLoadingBarSuccessful());
    }
}

export function create(type, postData) {
    console.log(postData)
    return function (dispatch) {
        const data = Object.keys(postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]);
        }).join('&');

        return createData(type, data).then(result => result.json()).then(reply => {
            var message;
            if(reply["responseCode"] != 500) {
                if(type == "society" || type == "event" || type == "newsfeeds" || type == "studentEventRating")
                    message = "Data has been created successfully";
                else 
                    message = "Your registration is completed. Approval is pending."
            } else {
                message = 'Data cannot be created: ' + reply["message"]
            }
                
            
            confirmAlert({
                title: 'Message',
                message: message,
                buttons: [
                    {
                        label: 'Close',
                        onClick: () => {
                            if(reply["responseCode"] == 500) {
                                dispatch(createSuccessfully());
                                //browserHistory.push('/home');
                            } else {
                                if(type === "society") {
                                    dispatch(createSuccessfully());
                                    browserHistory.push({pathname:`/perSociety/` + reply["message"], state: {societyName: postData["name"]}});
                                } else if(type === "event") {
                                    dispatch(createSuccessfully());
                                    browserHistory.push({pathname:`/perEvent/` + reply["message"], state: {eventName: postData["name"]}});
                                } else if(type === "newsfeeds") {
                                    dispatch(createSuccessfully());
                                    browserHistory.push('/newsfeeds');
                                } else if(type === "staffRegisterSociety" || type === "studentRegisterSociety") {
                                    dispatch(registerSuccessfully());
                                    browserHistory.push({pathname:`/perSociety/` + reply["message"], state: {societyName: postData["societyName"]}});
                                } else if(type === "staffRegisterEvent" || type == "studentRegisterEvent") {
                                    dispatch(registerSuccessfully());
                                    browserHistory.push({pathname:`/perEvent/` + reply["message"], state: {eventName: postData["eventName"]}});
                                } else if(type === "registerEventCrew") {
                                    dispatch(registerSuccessfully());
                                    browserHistory.push({pathname:`/perEvent/` + reply["message"], state: {eventName: postData["eventName"]}});
                                } else if(type === "studentEventRating") {
                                    dispatch(createSuccessfully());
                                    browserHistory.push("/home");
                                } 
                            }
                        }
                    }
                ]
            }) 
        });
    };
}

export function update(type, id, name, postData) {
    return function (dispatch) {
        const data = Object.keys(postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]);
        }).join('&');

        return updateData(type, id, data).then(result => result.json()).then(reply => {
            confirmAlert({
                title: 'Message',
                message: reply["responseCode"] != 500 ? 'Data has been updated successfully' : 'Data cannot be updated: ' + reply["message"],
                buttons: [
                    {
                        label: 'Close',
                        onClick: () => {
                            if(reply["responseCode"] == 500) {
                                dispatch(updateSuccessfully());
                                //browserHistory.push('/home');
                            } else {
                                if(type === "society") {
                                    dispatch(updateSuccessfully());
                                    browserHistory.push({pathname:`/perSociety/` + id, state: {societyName: name}});
                                } else if(type === "event") {
                                    dispatch(updateSuccessfully());
                                    browserHistory.push({pathname:`/perEvent/` + id, state: {eventName: name}});
                                } else if(type === "totalBooth") {
                                    dispatch(updateSuccessfully());
                                    browserHistory.push('/myProfile');
                                } else if(type === "studentRating" || type === "staffRating") {
                                    dispatch(updateSuccessfully());
                                    browserHistory.push('/myEvents');
                                }
                            }
                        }
                    }
                ]
            })
            
        });
    };
}

export function updateDouble(type, postData, name) {
    name = name || "";
    return function (dispatch) {
        const data = Object.keys(postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]);
        }).join('&');

        return updateDataDouble(type, data).then(result => result.json()).then(reply => {
            confirmAlert({
                title: 'Message',
                message: reply["responseCode"] != 500 ? 'Data has been updated successfully' : 'Data cannot be updated: ' + reply["message"],
                buttons: [
                    {
                        label: 'Close',
                        onClick: () => {
                            if(reply["responseCode"] == 500) {
                                console.log("click");
                                //browserHistory.push('/home');
                            } else {
                                // if(type === "crew" || type === "rejectCrew" || type === "societyCrew" || type === "societyAdvisor") {
                                if(type === "member" || type === "rejectStudentSociety") {
                                    browserHistory.push({pathname:`/manageMember/` + reply["message"], state: {societyName: name}});
                                } else if(type === "studentParticipant" || type === "staffParticipant" || type === "rejectStudentEvent" || type === "rejectStaffEvent") {
                                    browserHistory.push({pathname:`/manageParticipant/` + reply["message"], state: {eventName: name}});
                                } else if(type === "booth") {
                                    dispatch(registerSuccessfully());

                                    if(postData["type"] === "society")
                                        browserHistory.push({pathname:`/register_booth/society/` + reply["message"], state: {societyName: name}});
                                    else 
                                        browserHistory.push({pathname:`/register_booth/event/` + reply["message"], state: {eventName: name}});
                                } else if(type === "resubmitStaffParticipant" || type === "resubmitStudentParticipant" || type === "resubmitMemberRegistration" || type === "resubmitAdvisorRegistration" || type === "cancelStudentEvent" || type === "cancelStaffEvent") {
                                    browserHistory.push("/myEvent");
                                } else if(type === "removeBooth") {
                                    browserHistory.push("/recruitmentBooth");
                                }
                                 else {
                                    browserHistory.push({pathname:`/manageCrew/` + reply["message"], state: {eventName: name}});
                                }
                            }
                        }
                    }
                ]
            })
        });
    };
}
