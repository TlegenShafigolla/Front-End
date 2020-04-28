import {api} from "../App"

export function getSession() {
    try {
        if (localStorage.getItem('access_token') === null) {
               return null;
        }
        const timeout = Date.parse(localStorage.getItem('access_time'));
        const diff = new Date() - timeout;
        if (Math.round(diff) > 3000000) {
            //refreshSession();
        }
        return localStorage.getItem('access_token');
    } catch (e) {
        return null;
    }
}

function refreshSession() {
    const authToken = `Bearer ${localStorage.getItem('refresh_token')}`;
    const requestOptions = {
        method: 'POST',
        headers: {Authorization: authToken},
    };

    fetch(`${api}/token/refresh`, requestOptions).then(
        response => response.json()
    ).then(data => {
        if (data !== null) {
            localStorage.setItem('access_time', Date());
            localStorage.setItem('access_token', data['access_token']);
        }
    })
}