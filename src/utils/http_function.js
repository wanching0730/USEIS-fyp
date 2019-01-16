const mainApiRoute = `http://localhost:5000/api/v1`;

export function verifyUser(data) {
    return fetch(mainApiRoute + `/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
}

export function getData(type, id) {
    if(type === "society") {
        return fetch(mainApiRoute + `/society/` + id);
    } else if(type === "event") {
        return fetch(mainApiRoute + `/event/` + id);
    } else if(type === "societyEvent") {
        return fetch(mainApiRoute + `/societyEvent/` + id);
    } else if(type === "studentEvent") {
        return fetch(mainApiRoute + `/studentEvent/` + id);
    } else if(type === "staffEvent") {
        return fetch(mainApiRoute + `/staffEvent/` + id);
    } else if(type === "eventCrew") {
        return fetch(mainApiRoute + `/eventCrew/` + id);
    } else if(type === "societyComm") {
        return fetch(mainApiRoute + `/societyComm/` + id);
    } else if(type === "eventComm") {
        return fetch(mainApiRoute + `/eventComm/` + id);
    } else if(type === "societyMember") {
        return fetch(mainApiRoute + `/societyMember/` + id);
    } else if(type === "eventParticipant") {
        return fetch(mainApiRoute + `/eventParticipant/` + id);
    }
}

export function getDataWithUserId(type, id, userId) {
    if(type === "studentSociety") {
        return fetch(mainApiRoute + `/studentSociety/` + id + `/` + userId);
    } else if(type === "staffSociety") {
        return fetch(mainApiRoute + `/staffSociety/` + id + `/` + userId);
    } else if(type === "studentEvent") {
        return fetch(mainApiRoute + `/studentEvent/` + id + `/` + userId);
    } else {
        return fetch(mainApiRoute + `/staffEvent/` + id + `/` + userId);
    }
}

export function getAllData(type) {
    if(type === "society") {
        return fetch(mainApiRoute + `/societies`);
    } else if(type === "event") {
        return fetch(mainApiRoute + `/events`);
    } else if(type === "newsfeeds") {
        return fetch(mainApiRoute + `/newsfeeds`);
    } else if(type === "allSocietyEvent") {
        return fetch(mainApiRoute + `/societyEvent`);
    } else if(type === "societyBooth") {
        return fetch(mainApiRoute + `/societyBooth`);
    } else if(type === "eventBooth") {
        return fetch(mainApiRoute + `/eventBooth`);
    } 
}

export function searchAllData(type, keyword) {
    if(type === "society") {
        return fetch(mainApiRoute + `/search/society/` + keyword);
    } else if(type === "event") {
        return fetch(mainApiRoute + `/search/event/` + keyword);
    } 
}

export function createData(type, data) {
    if(type === "society") {
        return fetch(mainApiRoute + `/society`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "event") {
            return fetch(mainApiRoute + `/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "newsfeeds") {
            return fetch(mainApiRoute + `/newsfeeds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "rating") {
        return fetch(mainApiRoute + `/rating`, {
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
        return fetch(mainApiRoute + `/society/`+ id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "event") {
            return fetch(mainApiRoute + `/event/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } 
}

export function updateDataDouble(type, data) {
    if(type === "crew") {
        return fetch(mainApiRoute + `/crew`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "member") {
        return fetch(mainApiRoute + `/member`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "participant") {
        return fetch(mainApiRoute + `/participant`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "fcmToken") {
        return fetch(mainApiRoute + `/token`, {
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
        return fetch(mainApiRoute + `/studentEvent/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } else if(type === "staffEvent") {
        return fetch(mainApiRoute + `/staffEvent/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } else if(type === "eventCrew") {
        return fetch(mainApiRoute + `/eventCrew/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } else if(type === "studentParticipant") {
        return fetch(mainApiRoute + `/studentParticipant/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } else if(type === "staffParticipant") {
        return fetch(mainApiRoute + `/staffParticipant/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } 
}