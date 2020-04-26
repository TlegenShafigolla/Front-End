import {getSession} from "../GetSession";

export default function getInvitations() {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/invitation`, requestOptions).then(res => {
        return res.json();
    });
}

export function postInvitations(invitation) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invitation),
    };
    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/invitation`, requestOptions).then(res => {
        return res.json();
    });

}

export function deleteInvitations(invitation_id) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            invitation_id: invitation_id,
        }),
    };

    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/invitation`, requestOptions).then(res => {
        return res.json();
    });
}