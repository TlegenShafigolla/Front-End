import {session} from "../../session";
import {api} from "../../../../App"

export default function getQuestions(survey_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/survey/question/${survey_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function postQuestions(survey_id, questions) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            questions: questions,
        }),
    };

    return fetch(`${api}/survey/question/${survey_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function deleteQuestions(survey_id, question_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: question_id,
        }),
    };

    return fetch(`${api}/survey/question/${survey_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function putQuestions(survey_id, question) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
    };

    return fetch(`${api}/survey/question/${survey_id}`, requestOptions).then(res => {
        return res.json();
    });
}