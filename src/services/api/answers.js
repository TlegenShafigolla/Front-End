import {getSession} from "../GetSession";

export default function getAnswers(question_id) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://35.228.95.87:7000';
    return fetch(`${api}/quiz/answer/${question_id}`, requestOptions).then(res => {
        return res.json();
    });
}

export  function postAnswers(question_id, answers) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            Accept: 'application/json',
        },
        data: JSON.stringify({
            "answers": answers,
        }),
    };

    const api = 'http://35.228.95.87:7000';
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