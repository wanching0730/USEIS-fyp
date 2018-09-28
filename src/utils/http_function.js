export function verifyUser(data) {
    return fetch(`http://localhost:5000/api/login_user`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
}

export function getData(type, id) {
    if(type === "society") {
        return fetch(`http://localhost:5000/get/society/` + id);
    } else if(type === "event") {
        return fetch(`http://localhost:5000/get/event/` + id);
    } else if(type === "societyEvent") {
        return fetch(`http://localhost:5000/get/societyEvent/` + id);
    } else if(type === "studentEvent") {
        return fetch(`http://localhost:5000/get/studentEvent/` + id);
    } else if(type === "staffEvent") {
        return fetch(`http://localhost:5000/get/staffEvent/` + id);
    }
}

export function getAllData(type) {
    if(type === "society") {
        return fetch(`http://localhost:5000/get/societies`);
    } else if(type === "event") {
        return fetch(`http://localhost:5000/get/events`);
    } else if(type === "newsfeeds") {
        return fetch(`http://localhost:5000/get/newsfeeds`);
    } else if(type === "allSocietyEvent") {
        return fetch(`http://localhost:5000/get/societyEvent`);
    } else if(type === "societyBooth") {
        return fetch(`http://localhost:5000/get/societyBooth`);
    } else if(type === "eventBooth") {
        return fetch(`http://localhost:5000/get/eventBooth`);
    } 
}

export function createData(type, data) {
    if(type === "society") {
        return fetch(`http://localhost:5000/create/society`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "event") {
            return fetch(`http://localhost:5000/create/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "newsfeeds") {
            return fetch(`http://localhost:5000/create/newsfeeds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "registerSociety") {
            return fetch(`http://localhost:5000/register/society`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "staffRegisterEvent") {
            return fetch(`http://localhost:5000/register/staffEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "studentRegisterEvent") {
            return fetch(`http://localhost:5000/register/studentEvent`, {
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
        return fetch(`http://localhost:5000/update/society/`+ id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type === "event") {
            return fetch(`http://localhost:5000/update/event/` + id, {
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
        return fetch(`http://localhost:5000/delete/studentEvent/` + id + '/' + eventId, {
            method: 'DELETE'
        });
    } else if(type === "staffEvent") {
        return fetch(`http://localhost:5000/delete/staffEvent/` + id + '/' + eventId);
    }
}