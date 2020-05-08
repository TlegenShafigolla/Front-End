import {session} from "../session";
import {api} from "../../../App"

export default function getQuiz() {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const json = fetch(`${api}/quiz`, requestOptions).then(res => {
        return res.json();
    });
    return json;
}

export function postQuiz(quiz) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
    };
    return fetch(`${api}/quiz`, requestOptions).then(res => {
        return res.json();
    })
}

export function putQuiz(quiz) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
    };
    return fetch(`${api}/quiz`, requestOptions).then(res => {
        return res.json();
    })
}

export function deleteQuiz(quiz_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: quiz_id
        })
    };

    return fetch(`${api}/quiz`, requestOptions).then(res => {
        return res.json();
    });
}

