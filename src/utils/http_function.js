const mainApiRoute = `http://localhost:5000/api/v1`;

export function verifyUser(data) {
    return fetch(mainApiRoute + `/login_user`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
}

export function getDataWithUserId(type, id, userId) {
    if(type === "studentSociety") {
        return fetch(mainApiRoute + `/get/studentSociety/` + id + `/` + userId);
    } else if(type === "staffSociety") {
        return fetch(mainApiRoute + `/get/staffSociety/` + id + `/` + userId);
    } else if(type === "studentEvent") {
        return fetch(mainApiRoute + `/get/studentEvent/` + id + `/` + userId);
    } else {
        return fetch(mainApiRoute + `/get/staffEvent/` + id + `/` + userId);
    }
}

export function getData(type, id) {
    if(type === "society") {
        return fetch(mainApiRoute + `/get/society/` + id);
    } else if(type === "event") {
        return fetch(mainApiRoute + `/get/event/` + id);
    } else if(type === "societyEvent") {
        return fetch(mainApiRoute + `/get/societyEvent/` + id);
    } else if(type === "studentEvent") {
        return fetch(mainApiRoute + `/get/studentEvent/` + id);
    } else if(type === "staffEvent") {
        return fetch(mainApiRoute + `/get/staffEvent/` + id);
    } else if(type === "eventCrew") {
        return fetch(mainApiRoute + `/get/eventCrew/` + id);
    } else if(type === "societyComm") {
        return fetch(mainApiRoute + `/get/societyComm/` + id);
    } else if(type === "eventComm") {
        return fetch(mainApiRoute + `/get/eventComm/` + id);
    } else if(type === "societyMember") {
        return fetch(mainApiRoute + `/get/societyMember/` + id);
    } else if(type === "eventParticipant") {
        return fetch(mainApiRoute + `/get/eventParticipant/` + id);
    }
}

export function getAllData(type) {
    if(type === "society") {
        return fetch(mainApiRoute + `/get/societies`);
    } else if(type === "event") {
        return fetch(mainApiRoute + `/get/events`);
    } else if(type === "newsfeeds") {
        return fetch(mainApiRoute + `/get/newsfeeds`);
    } else if(type === "allSocietyEvent") {
        return fetch(mainApiRoute + `/get/societyEvent`);
    } else if(type === "societyBooth") {
        return fetch(mainApiRoute + `/get/societyBooth`);
    } else if(type === "eventBooth") {
        return fetch(mainApiRoute + `/get/eventBooth`);
    } 
}

export function searchAllData(type, keyword) {
    if(type === "society") {
        return fetch(mainApiRoute + `/get/search/society/` + keyword);
    } else if(type === "event") {
        return fetch(mainApiRoute + `/get/search/event/` + keyword);
    } 
}

export function createData(type, data) {
    if(type === "society") {
        return fetch(mainApiRoute + `/create/society`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "event") {
            return fetch(mainApiRoute + `/create/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "newsfeeds") {
            return fetch(mainApiRoute + `/create/newsfeeds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "rating") {
        return fetch(mainApiRoute + `/create/rating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "registerSociety") {
            return fetch(mainApiRoute + `/register/society`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "staffRegisterEvent") {
            return fetch(mainApiRoute + `/register/staffEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "studentRegisterEvent") {
            return fetch(mainApiRoute + `/register/studentEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "registerEventCrew") {
        return fetch(mainApiRoute + `/register/eventCrew`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
} 
}

export function updateData(type, id, data) {
    if(type === "society") {
        return fetch(mainApiRoute + `/update/society/`+ id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "event") {
            return fetch(mainApiRoute + `/update/event/` + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } 
}

export function updateDataDouble(type, data) {
    if(type === "crew") {
        return fetch(mainApiRoute + `/update/crew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "member") {
        return fetch(mainApiRoute + `/update/member`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "participant") {
        return fetch(mainApiRoute + `/update/participant`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "fcmToken") {
        return fetch(mainApiRoute + `/update/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    }
}

export function deleteData(type, id, eventId) {
    if(type === "studentEvent") {
        return fetch(mainApiRoute + `/delete/studentEvent/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } else if(type === "staffEvent") {
        return fetch(mainApiRoute + `/delete/staffEvent/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } else if(type === "eventCrew") {
        return fetch(mainApiRoute + `/delete/eventCrew/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } else if(type === "studentParticipant") {
        return fetch(mainApiRoute + `/delete/studentParticipant/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } else if(type === "staffParticipant") {
        return fetch(mainApiRoute + `/delete/staffParticipant/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } 
}