export function verifyUser(data) {
    return fetch(`http://localhost:5000/api/login_user`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
}