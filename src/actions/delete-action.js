import {browserHistory} from 'react-router';
import { removeData, removeParticipation } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';
import { UPDATE_DELETE_LOADINGBAR, DELETE_DATA, DELETE_PARTICIPATION } from '../constant';

export function updateDeleteLoadingBarSuccessful() {
    return {
        type: UPDATE_DELETE_LOADINGBAR,
        payload: {
            loading: true
        }
    };
}

export function deleteParticipationSuccessful() {
    return {
        type: DELETE_PARTICIPATION,
        payload: {
            loading: false
        }
    };
}


export function deleteDataSuccessful() {
    return {
        type: DELETE_DATA,
        payload: {
            loading: false
        }
    };
}

export function updateDeleteLoadingBar() {
    return function (dispatch) {
        dispatch(updateDeleteLoadingBarSuccessful());
    }
}

export function deleteData(type, id) {
    return function (dispatch) {
        return removeData(type, id).then(result => result.json()).then(reply => {
            console.log("deleted data reply: " + reply);

            if(reply != "true") {
                dispatch(deleteDataSuccessful());
                confirmAlert({
                    title: 'Message',
                    message: 'Data has been deleted successfully',
                    buttons: [
                        {
                            label: 'Close',
                            onClick: () => {
                                if(type === "sNewsfeed" || type === "eNewsfeed") {
                                    browserHistory.push('/newsFeed');
                                } 
                            }
                        }
                    ]
                  })
            }
        });
    };
}

export function deleteParticipation(type, id, eventId) {
    return function (dispatch) {
        return removeParticipation(type, id, eventId).then(result => result.json()).then(reply => {
            console.log("deleted data reply: " + reply);

            if(reply != "true") {
                dispatch(deleteParticipationSuccessful());
                confirmAlert({
                    title: 'Message',
                    message: 'Participation has been deleted successfully',
                    buttons: [
                        {
                            label: 'Close',
                            onClick: () => {
                                console.log("yes");
                                //browserHistory.push("/myEvents");
                            }
                        }
                    ]
                  })
            }
        })
    }
}