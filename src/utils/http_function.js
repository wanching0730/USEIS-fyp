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
    if(type == "society") {
        return fetch(`http://localhost:5000/society/` + id);
    } else {
        return fetch(`http://localhost:5000/event/` + id);
    }
}

export function getAllData(type) {
    if(type == "society") {
        return fetch(`http://localhost:5000/societies`);
    } else if(type == "event") {
        return fetch(`http://localhost:5000/events`);
    } else if(type == "newsfeeds") {
        return fetch(`http://localhost:5000/newsfeeds`);
    } 
}

export function createData(type, data) {
    if(type == "society") {
        return fetch(`http://localhost:5000/society/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type == "event") {
            return fetch(`http://localhost:5000/event/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type == "newsfeeds") {
            return fetch(`http://localhost:5000/newsfeeds/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type == "registerSociety") {
            return fetch(`http://localhost:5000/register/society`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type == "staffRegisterEvent") {
            return fetch(`http://localhost:5000/register/staffEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    } else if(type == "studentRegisterEvent") {
            return fetch(`http://localhost:5000/register/studentEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
    }
}