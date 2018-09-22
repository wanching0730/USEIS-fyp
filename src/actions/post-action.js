import {browserHistory} from 'react-router';
import { createData } from '../utils/http_function';

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

        return createData(data).then(result => result.json()).then(reply => {
            console.log("post data reply: " + reply);

            // if(type == "society") {
            //     dispatch(createSocietySuccessful(id));
            //     browserHistory.push("/perSociety/" + id);
            // } else {
            //     dispatch(createEventSuccessful(id));
            //     browserHistory.push("/societyEvents");
            // }
        });
    };
}