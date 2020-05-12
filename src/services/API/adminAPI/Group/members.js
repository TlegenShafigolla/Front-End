import {session} from "../../session";
import {api} from "../../../../App";

export function getMembers(group_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/group/member/${group_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function addMembers(group_id, email) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            group_id: group_id,
            email: email
        }),
    };
    return fetch(`${api}/group/member/${group_id}`, requestOptions).then(res => {
        return res.json();
    });
}
export function deleteMember(member_id,group_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: member_id
        }),
    };

    return fetch(`${api}/group/member/${group_id}`, requestOptions).then(res => {
        return res.json();
    });
}