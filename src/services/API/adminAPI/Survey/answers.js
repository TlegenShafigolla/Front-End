import {session} from "../../session";
import {api} from "../../../../App"

export function getAnswers(question_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/survey/answer/${question_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function postAnswers(question_id, answer) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answer),
    };

    return fetch(`${api}/survey/answer/${question_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function putAnswers(question_id, answer) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answer),
    };

    return fetch(`${api}/survey/answer/${question_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function deleteAnswers(question_id, answer_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: answer_id,
        }),
    };

    return fetch(`${api}/survey/answer/${question_id}`, requestOptions).then(res => {
        return res.json();
    });
}