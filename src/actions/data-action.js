import {browserHistory} from 'react-router';
import retrieveData from '../utils/http_function';

import {
    RETRIEVE_USER_SOCIETY, 
    RETRIEVE_USER_EVENT
} from '../constant';

export function retrieveDataSuccessful() {

}

export function retrieveData(type) {
    return function (dispatch) {
        return retrieveData(type).then(result => result.json()).then(reply => {

        });
    };
}