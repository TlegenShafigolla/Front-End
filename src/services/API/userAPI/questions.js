import {api} from "../../../App"

export function postTakeQuestion(session_id) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(`${api}/quiz/take/${session_id}`, requestOptions).then(res => {
        return res.json();
    });
}


