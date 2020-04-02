import {getSession} from "../GetSession";

export default function getQuizzes() {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://35.228.95.87:7000';
    const json = fetch(`${api}/quiz`, requestOptions).then(res => {
        return res.json();
    })
    return json;
}

export function postQuiz(quiz) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
    }
    const api = 'http://35.228.95.87:7000';
    console.log(quiz);
    return fetch(`${api}/quiz`, requestOptions).then(res => {
        return res.json();
    })
}