import {getSession} from "../GetSession";
import {api} from "../../App"

export function getAnswers(question_id) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/quiz/answer/${question_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function postAnswers(question_id, answer) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answer),
    };

    return fetch(`${api}/quiz/answer/${question_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export  function putAnswers(question_id, answer) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answer),
    };

    return fetch(`${api}/quiz/answer/${question_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export function deleteAnswers(question_id, answer_id) {
    const authToken = `Bearer ${getSession()}`;
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

    return fetch(`${api}/quiz/answer/${question_id}`, requestOptions).then(res => {
        return res.json();
    });
}

/*
* "answers": [
		{
			"id": 9,
			"question_id": 12,
			"answer": "This is the correct one",
			"correct": 1,
			"points": 0
		},
		{
			"id": 8,
			"question_id": 12,
			"answer": "This is the wrong one",
			"correct": 0,
			"points": 0
		}
	]
* */