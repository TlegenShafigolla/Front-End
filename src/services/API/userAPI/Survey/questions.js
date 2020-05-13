import {api} from "../../../../App"

export function getQuestion(session_id) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(`${api}/survey/take/${session_id}`, requestOptions).then(res => {
        return res.json();
    });
}


