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