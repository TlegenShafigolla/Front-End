import {session} from "../../session";
import {api} from "../../../../App"

export default function getReportList() {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/quiz/report/0`, requestOptions).then(res => {
        return res.json();
    });
}

export function getReport(report_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/quiz/report/${report_id}`, requestOptions).then(res => {
        return res.json();
    });
}
export function postReport(id, correct, points, session_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: id,
            correct: correct,
            points: points,
            session_id: session_id,
        })
    };
    return fetch(`${api}/quiz/report`, requestOptions).then(res => {
        return res.json();
    });
}