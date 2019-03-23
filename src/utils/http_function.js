// const mainApiRoute = `http://useis-env-2.mtaihhapn5.ap-southeast-1.elasticbeanstalk.com/api/v1`;
 const mainApiRoute = `http://localhost:5000/api/v1`;
//const mainApiRoute =   `https://b2auwy2dql.execute-api.ap-southeast-1.amazonaws.com/v1`;

export function verifyUser(data) {
    return fetch(mainApiRoute + `/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
}

export function downloadData(type, id) {
    return fetch(mainApiRoute + `/export/` + type + `/` + id);
}

export function getData(type, id) {
    return fetch(mainApiRoute + `/` + type + `/` + id);
}

export function getDataWithUserId(type, id, userId) {
    return fetch(mainApiRoute + `/` + type + `/` + id + `/` + userId);
}

export function getAllData(type) {
    return fetch(mainApiRoute + `/` + type);
}

export function searchAllData(type, keyword) {
    return fetch(mainApiRoute + `/search/` + type + `/` + keyword);
}

export function createData(type, data) {
    if(type === "staffRegisterSociety") {
            return fetch(mainApiRoute + `/register/staffSociety`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    }
    else if(type === "studentRegisterSociety") {
            return fetch(mainApiRoute + `/register/studentSociety`, {
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
    } else {
        return fetch(mainApiRoute + `/` + type, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    }
}

export function updateData(type, id, data) {
    return fetch(mainApiRoute + `/` + type + `/` + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
}

export function updateDataDouble(type, data) {
    if(type === "fcmToken") {
        return fetch(mainApiRoute + `/fcmToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else {
        return fetch(mainApiRoute + `/` + type, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        });
    }
}

export function removeData(type, id) {
    return fetch(mainApiRoute + `/` + type + `/` + id, {
        method: 'DELETE'
    });
}

export function removeParticipation(type, id, eventId) {
    return fetch(mainApiRoute + `/` + type + `/` + id + `/` + eventId, {
        method: 'DELETE'
    });
}