export function getSession() {
    try {
        if (localStorage.getItem('access_token') === null) {
               return null;
        }
        const timeout = Date.parse(localStorage.getItem('access_time'));
        const diff = new Date() - timeout;
        alert(diff)
        if (Math.round(diff ) > 10000) {
            refreshSession();
        }
        console.log("Access token updated");
        return localStorage.getItem('access_token');
    } catch (e) {
        console.log("Session doesn't exist");
        return null;
    }
}
async function refreshSession() {
    const authToken = `Bearer ${localStorage.getItem('refresh_token')}`;
    const requestOptions = {
        method: 'POST',
        headers: {Authorization: authToken},
    };

    const api = 'http://35.228.95.87:7000';
    const json = await fetch(`${api}/token/refresh`, requestOptions).then(
        response => response.json()
    ).then(data => {
        if (data !== null) {
            localStorage.setItem('access_time', Date())
            localStorage.setItem('admin_token', data['access_token']);
        }
    })
}