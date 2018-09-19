import {browserHistory} from 'react-router';
import { getData } from '../utils/http_function';

import {
    RETRIEVE_USER_SOCIETY, 
    RETRIEVE_USER_EVENT
} from '../constant';

export function retrieveDataSuccessful() {

}

export function retrieveData(type, id) {
    return function (dispatch) {
        return getData(type, id).then(result => result.json()).then(reply => {
            console.log("result of get society: " + JSON.stringify(reply));
        });
    };
}