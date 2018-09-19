import {browserHistory} from 'react-router';
import { getData } from '../utils/http_function';

import {
    RETRIEVE_USER_SOCIETY, 
    RETRIEVE_USER_EVENT
} from '../constant';

export function retrieveSocietySuccessful(societyName, societyCategory, societyVision, societyMission, societyDesc) {
    return {
        type: RETRIEVE_USER_SOCIETY,
        payload: {
            societyName: societyName,
            societyCategory: societyCategory,
            societyVision: societyVision,
            societyMission: societyMission,
            societyDesc: societyDesc
        }
    }

}

export function retrieveEventSuccessful() {

}

export function retrieveData(type, id) {
    return function (dispatch) {
        return getData(type, id).then(result => result.json()).then(reply => {
            console.log("result of get society: " + JSON.stringify(reply));

            if(type == "society") {
                let societyName = reply["name"];
                let societyCategory = reply["category"];
                let societyVision = reply["vision"];
                let societyMission = reply["mission"];
                let societyDesc = reply["description"];

                dispatch(retrieveSocietySuccessful(societyName, societyCategory, societyVision, societyMission, societyDesc));
            } else {
                
            }
        });
    };
}