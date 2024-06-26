import {session} from "../../session";
import {api} from "../../../../App";

export function createGroup(group_name) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            group_name: group_name
        }),
    };
    return fetch(`${api}/group`, requestOptions).then(res => {
        return res.json();
    });
}
export function getListGroup() {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {

        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/group`, requestOptions).then(res => {
        return res.json();
    });
}

export function deleteGroup(group_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: group_id
        }),
    };

    return fetch(`${api}/group`, requestOptions).then(res => {
        return res.json();
    });
}

export function putGroupName(group_id, group_name) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: group_id,
            group_name: group_name
        }),
    };

    return fetch(`${api}/group`, requestOptions).then(res => {
        return res.json();
    });
}