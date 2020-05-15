import {session} from "../../session";
import {api} from "../../../../App";

export function getReports() {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/survey/report/0`, requestOptions).then(res => {
        return res.json();
    });
}
export function getReportId(survey_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/survey/report/${survey_id}`, requestOptions).then(res => {
        return res.json();
    });
}