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
            // if(reply != "true") {
            dispatch(deleteDataSuccessful());
            confirmAlert({
                title: 'Message',
                message: reply["responseCode"] != 500 ? 'Data has been deleted successfully' : 'Data cannot be deleted: ' + reply["message"],
                buttons: [
                    {
                        label: 'Close',
                        onClick: () => {
                            if(reply["responseCode"] == 500) {
                                browserHistory.push('/home');
                            } else {
                                if(type === "sNewsfeed" || type === "eNewsfeed") {
                                    browserHistory.push('/newsFeed');
                                } else if (type === "event") {
                                    browserHistory.push('/event');
                                }
                            }
                        }
                    }
                ]})
            //}
        });
    };
}

export function deleteParticipation(type, id, eventId) {
    return function (dispatch) {
        return removeParticipation(type, id, eventId).then(result => result.json()).then(reply => {
            dispatch(deleteParticipationSuccessful());
            confirmAlert({
                title: 'Message',
                message: reply["responseCode"] != 500 ? 'Data has been deleted successfully' : 'Data cannot be deleted: ' + reply["message"],
                buttons: [
                    {
                        label: 'Close',
                        onClick: () => {
                            console.log("yes");
                        }
                    }
                ]
            })
        })
    }
}