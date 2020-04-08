import {getSession} from "../GetSession";

export default function getReportList() {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://35.228.95.87:7000';
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

    const api = 'http://35.228.95.87:7000';
    return fetch(`${api}/quiz/report/${report_id}`, requestOptions).then(res => {
        return res.json();
    });
}