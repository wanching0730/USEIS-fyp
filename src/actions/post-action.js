import {browserHistory} from 'react-router';
import { createData, updateData, updateDataDouble } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';
import {
    CREATE_SOCIETY,
    CREATE_EVENT,
    CREATE_NEWSFEED,
    REGISTER_SOCIETY,
    REGISTER_EVENT,
    UPDATE_SOCIETY,
    UPDATE_EVENT
} from '../constant';

export function createSocietySuccessful(societyId) {
    return {
        type: CREATE_SOCIETY,
        payload: {
            createdSocietyId: societyId
        }
    }
}

export function createEventSuccessful(eventId) {
    return {
        type: CREATE_EVENT,
        payload: {
            createdEventId: eventId
        }
    }
}

export function createNewsfeedSuccessful(newsfeedId) {
    return {
        type: CREATE_NEWSFEED,
        payload: {
            createdNewsfeedId: newsfeedId
        }
    }
}

export function registerSocietySuccessfully(registeredSocietyId) {
    return {
        type: REGISTER_SOCIETY,
        payload: {
            registeredSocietyId: registeredSocietyId
        }
    }
}

export function registerEventSuccessfully(registeredEventId) {
    return {
        type: REGISTER_EVENT,
        payload: {
            registeredEventId: registeredEventId
        }
    }
}

export function create(type, postData) {
    return function (dispatch) {
        const data = Object.keys(postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]);
        }).join('&');

        return createData(type, data).then(result => result.json()).then(reply => {
            console.log("post data reply: " + reply);

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
                                } else if(type === "registerSociety") {
                                    dispatch(registerSocietySuccessfully);
                                    browserHistory.push('/perSociety/' + reply);
                                } else if(type === "staffRegisterEvent" || type == "studentRegisterEvent") {
                                    dispatch(registerEventSuccessfully);
                                    browserHistory.push('/perEvent/' + reply);
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
            console.log("updated data reply: " + reply);

            if(reply != "true") {
                confirmAlert({
                    title: 'Message',
                    message: 'Data has been updated successfully',
                    buttons: [
                        {
                            label: 'Close',
                            onClick: () => {
                                if(type === "society") {
                                    browserHistory.push({pathname:`/perSociety/` + id, state: {societyName: name}});
                                } else if(type === "event") {
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

export function updateDouble(type, postData) {
    return function (dispatch) {
        const data = Object.keys(postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]);
        }).join('&');

        return updateDataDouble(type, data).then(result => result.json()).then(reply => {
            console.log("updated double data reply: " + reply);

            if(reply != "true") {
                confirmAlert({
                    title: 'Message',
                    message: 'Data has been updated successfully',
                    buttons: [
                        {
                            label: 'Close',
                            onClick: () => {
                                if(type === "crew") {
                                    browserHistory.push('/manageCrew/' + reply);
                                } 
                            }
                        }
                    ]
                  })
            }
        });
    };
}
