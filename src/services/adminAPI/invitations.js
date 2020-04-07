import {getSession} from "../GetSession";

export default function getInvitations() {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://35.228.95.87:7000';
    return fetch(`${api}/quiz/invitation`, requestOptions).then(res => {
        return res.json();
    });
}