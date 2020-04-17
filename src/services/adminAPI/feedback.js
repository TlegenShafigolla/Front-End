import {getSession} from "../GetSession";

export default function postFeedback(feedback) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "feedback": feedback,
        }),
    };

    const api = 'http://35.228.95.87:7000';
    return fetch(`${api}/feedback`, requestOptions).then(res => {
        return res.json();
    });
}