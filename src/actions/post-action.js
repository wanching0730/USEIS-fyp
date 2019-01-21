import {browserHistory} from 'react-router';
import { createData, updateData, updateDataDouble } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';
import '../style/alert.css';
import {
    UPDATE_POST_LOADINGBAR,
    CREATE_SOCIETY,
    CREATE_EVENT,
    CREATE_NEWSFEED,
    CREATE_RATING,
    REGISTER,
    UPDATE_SOCIETY,
    UPDATE_EVENT
} from '../constant';

export function updatePostLoadingBarSuccessful() {
    return {
        type: UPDATE_POST_LOADINGBAR,
        payload: {
            loading: true
        }
    };
}

export function createSocietySuccessful(societyId) {
    return {
        type: CREATE_SOCIETY,
        payload: {
            createdSocietyId: societyId,
            loading: false
        }
    }
}

export function createEventSuccessful(eventId) {
    return {
        type: CREATE_EVENT,
        payload: {
            createdEventId: eventId,
            loading: false
        }
    }
}

export function createNewsfeedSuccessful(newsfeedId) {
    return {
        type: CREATE_NEWSFEED,
        payload: {
            createdNewsfeedId: newsfeedId,
            loading: false
        }
    }
}

export function createRatingSuccessful(ratingId) {
    return {
        type: CREATE_RATING,
        payload: {
            createdRatingId: ratingId,
            loading: false
        }
    }
}

export function registerSuccessfully() {
    return {
        type: REGISTER,
        payload: {
            loading: false
        }
    }
}

export function updateSocietySuccessfully(updatedSocietyId) {
    return {
        type: UPDATE_SOCIETY,
        payload: {
            updatedSocietyId: updatedSocietyId,
            loading: false
        }
    }
}

export function updateEventSuccessfully(updatedEventId) {
    return {
        type: UPDATE_EVENT,
        payload: {
            updatedEventId: updatedEventId,
            loading: false
        }
    }
}

export function updatePostLoadingBar() {
    return function (dispatch) {
        dispatch(updatePostLoadingBarSuccessful());
    }
}

export function create(type, postData) {
    return function (dispatch) {
        const data = Object.keys(postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]);
        }).join('&');

        return createData(type, data).then(result => result.json()).then(reply => {
            if(reply != null) {
                confirmAlert({
                    title: 'Message',
                    message: 'Data has been created successfully',
                    buttons: [
                        {
                            label: 'Close',
                            onClick: () => {
                                if(type === "society") {
                                    dispatch(createSocietySuccessful(reply));
                                    browserHistory.push({pathname:`/perSociety/` + reply, state: {societyName: postData["name"]}});
                                } else if(type === "event") {
                                    dispatch(createEventSuccessful(reply));
                                    browserHistory.push({pathname:`/perEvent/` + reply, state: {eventName: postData["name"]}});
                                } else if(type === "newsfeeds") {
                                    dispatch(createNewsfeedSuccessful(reply));
                                    browserHistory.push('/newsfeeds');
                                } else if(type === "rating") {
                                    dispatch(createRatingSuccessful(reply));
                                    browserHistory.push('/myEvents');
                                } else if(type === "registerSociety") {
                                    dispatch(registerSuccessfully());
                                    browserHistory.push({pathname:`/perSociety/` + reply, state: {societyName: postData["societyName"]}});
                                } else if(type === "staffRegisterEvent" || type == "studentRegisterEvent") {
                                    dispatch(registerSuccessfully());
                                    browserHistory.push({pathname:`/perEvent/` + reply, state: {eventName: postData["eventName"]}});
                                } else if(type === "registerEventCrew") {
                                    dispatch(registerSuccessfully());
                                    browserHistory.push({pathname:`/perEvent/` + reply, state: {eventName: postData["eventName"]}});
                                }
                            }
                        }
                    ]
                  })
            }
        });
    };
}

export function update(type, id, name, postData) {
    return function (dispatch) {
        const data = Object.keys(postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]);
        }).join('&');

        return updateData(type, id, data).then(result => result.json()).then(reply => {
            if(reply != 0) {
                confirmAlert({
                    title: 'Message',
                    message: 'Data has been updated successfully',
                    buttons: [
                        {
                            label: 'Close',
                            onClick: () => {
                                if(type === "society") {
                                    dispatch(updateSocietySuccessfully(reply));
                                    browserHistory.push({pathname:`/perSociety/` + id, state: {societyName: name}});
                                } else if(type === "event") {
                                    dispatch(updateEventSuccessfully(reply));
                                    browserHistory.push({pathname:`/perEvent/` + id, state: {eventName: name}});
                                } 
                            }
                        }
                    ]
                  })
            }
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
            if(reply != 0) {
                confirmAlert({
                    title: 'Message',
                    message: 'Data has been updated successfully',
                    buttons: [
                        {
                            label: 'Close',
                            onClick: () => {
                                if(type === "crew") {
                                    browserHistory.push({pathname:`/manageCrew/` + reply, state: {eventName: name}});
                                } else if(type === "member") {
                                    browserHistory.push({pathname:`/manageMember/` + reply, state: {societyName: name}});
                                } else if(type === "participant") {
                                    browserHistory.push({pathname:`/manageParticipant/` + reply, state: {eventName: name}});
                                } else if(type === "booth") {
                                    dispatch(registerSuccessfully());

                                    if(postData["type"] === "society")
                                        browserHistory.push({pathname:`/register_booth/society/` + reply, state: {societyName: name}});
                                    else 
                                        browserHistory.push({pathname:`/register_booth/event/` + reply, state: {eventName: name}});
                                } 
                            }
                        }
                    ]
                  })
            }
        });
    };
}
