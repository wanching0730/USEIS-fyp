import {browserHistory} from 'react-router';
import { deleteData } from '../utils/http_function';
import { confirmAlert } from 'react-confirm-alert';

// export function deletes(type, id) {
//     return function (dispatch) {

//         return deleteData(type, id).then(result => result.json()).then(reply => {
//             console.log("deleted data reply: " + reply);

//             if(reply != "true") {
//                 confirmAlert({
//                     title: 'Message',
//                     message: 'Data has been deleted successfully',
//                     buttons: [
//                         {
//                             label: 'Close',
//                             onClick: () => {
//                                 if(type === "society") {
//                                     browserHistory.push('/society');
//                                 } else if(type === "event") {
//                                     browserHistory.push('/perEvent');
//                                 }
//                             }
//                         }
//                     ]
//                   })
//             }
//         });
//     };
// }

export function deleteParticipation(type, id, eventId) {
    return function (dispatch) {
        return deleteData(type, id, eventId).then(result => result.json()).then(reply => {
            console.log("deleted data reply: " + reply);

            if(reply != "true") {
                confirmAlert({
                    title: 'Message',
                    message: 'Event participation has been deleted successfully',
                    buttons: [
                        {
                            label: 'Close',
                            onClick: () => {
                                //browserHistory.push("/myEvents");
                            }
                        }
                    ]
                  })
            }
        })
    }
}