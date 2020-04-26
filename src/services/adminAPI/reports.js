import {getSession} from "../GetSession";

export default function getReportList() {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/report/0`, requestOptions).then(res => {
        return res.json();
    });
}

export function getReport(report_id) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/report/${report_id}`, requestOptions).then(res => {
        return res.json();
    });
}
export function postReport(id, correct, points) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            correct: correct,
            points: points

        })
    };
    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/report`, requestOptions).then(res => {
        return res.json();
    });
}