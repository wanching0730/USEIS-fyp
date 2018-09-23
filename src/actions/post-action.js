import {browserHistory} from 'react-router';
import { createData } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';

import {
    CREATE_SOCIETY,
    CREATE_EVENT
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
                                if(type == "society") {
                                    dispatch(createSocietySuccessful(reply));
                                    browserHistory.push('/perSociety/' + reply);
                                } else {
                                    dispatch(createEventSuccessful(reply));
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