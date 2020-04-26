import {getSession} from "../GetSession";

export default function getQuestions(quiz_id) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/question/${quiz_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function postQuestions(quiz_id, questions) {
    const authToken = `Bearer ${getSession()}`;
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

    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/question/${quiz_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function deleteQuestions(quiz_id, question_id) {
    const authToken = `Bearer ${getSession()}`;
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

    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/question/${quiz_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function putQuestions(quiz_id, question) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
    };

    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/question/${quiz_id}`, requestOptions).then(res => {
        return res.json();
    });
}
/*
* "questions": [
        {
            "quiz_id": 11,
            "question": "Question 1",
            "type": "MULTIPLE CHOICE",
            "image": null,
            "order_id": 2,
            "id": 12
        },
        {
            "quiz_id": 11,
            "question": "Question 2",
            "type": "MULTIPLE CHOICE",
            "image": null,
            "order_id": 1,
            "id": 13
        }
    ]
* */