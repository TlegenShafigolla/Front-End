import {session} from "../../session";
import {api} from "../../../../App";

export function getReportGroup(id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {

        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/group/quiz/report/${id}`, requestOptions).then(res => {
        return res.json();
    });
}