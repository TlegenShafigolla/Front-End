import {session} from "../../session";
import {api} from "../../../../App"

export default function getInvitations() {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/survey/invitation`, requestOptions).then(res => {
        return res.json();
    });
}

export function postInvitations(invitation) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invitation),
    };
    return fetch(`${api}/survey/invitation`, requestOptions).then(res => {
        return res.json();
    });

}

export function deleteInvitations(invitation_id) {
    const authToken = `Bearer ${session()}`;
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

    return fetch(`${api}/survey/invitation`, requestOptions).then(res => {
        return res.json();
    });
}
