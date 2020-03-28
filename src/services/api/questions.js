import {getSession} from "../GetSession";

export default function getQuestions(quiz_id) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://35.228.95.87:7000';
    return fetch(`${api}/quiz/question/${quiz_id}`, requestOptions).then(res => {
        return res.json();
    });
}